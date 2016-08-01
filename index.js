/* jshint node: true */
module.exports = (gulp, packages) => {
  'use-strict';

  var me      = "gulp-install-tools"
  var util    = require('gulp-util');
  var _if     = require('gulp-if');
  var bump    = require('gulp-bump');
  var git     = require('gulp-git');
  var fs      = require('fs');
  var argv    = require('yargs').argv;
  var _pkgs   = { notInstalled: [], loaded: {} };
  var camel   = (str) => {return str.replace(/-(\w)/g,(match, char) => { return char.toUpperCase(); });};
  var cwd     = process.cwd();
  
  for (var i = 0; i < packages.length; i++) {
    var pkg      = packages[i].split(/\sas\s/, 2);
    pkg[1]       = camel(pkg[pkg.length === 2 ? 1 : 0]);
    pkg[0]       = pkg[0].replace(/([A-Z])/g, '-$1').toLowerCase();
    packages[i]  = pkg[0];
    var m        = 'gulp-' + pkg[0];
    try {
      if (_pkgs.loaded[pkg[1]]) {
        console.warn('[' + util.colors.green(me) + '] ' + util.colors.red('Duplicate package: ' + pkg[1]));
      } else {
        _pkgs.loaded[pkg[1]] = require(cwd + '/node_modules/' + m);
      }
    } catch (e) {
      _pkgs.notInstalled.push(m);
    }
  }
  
  var npmCommand = (cmd, pkgs, cb) => {
    if (pkgs.length === 0) {
      console.info('\n' + util.colors.blue('no package to ' + cmd) + '\n');
      return cb();
    }
    var npm = require('npm');
    npm.load((e) => {
      if (e) {
        console.error('\n' + util.colors.red(e.message) + '\n');
        return cb();
      }
      var saveDev = npm.config.get('save-dev');
      npm.config.set('save-dev', true);
      npm.commands[cmd](pkgs,(e) => {
        npm.config.set('save-dev', saveDev);
        if (e) {
          console.error('\n' + util.colors.red(e.message) + '\n');
        } else {
          var u = ' package' + ((pkgs.length > 1) ? 's ' : ' ');
          console.info('\n' + util.colors.green(pkgs.length + u + cmd + 'ed') + '\n');
        }
        cb();
      });
    });
  };

  var npmPublishCommand = (cb) => {
    var npm = require('npm');
    npm.load((e)=> {
      if (e) {
        console.error('\n' + util.colors.red(e.message) + '\n');
        return cb();
      }
      npm.commands['publish']((e) => {
        if (e) {
          console.error('\n' + util.colors.red(e.message) + '\n');
        } else {
          var pkg = require(cwd + '/package.json');
          var u = pkg.name + ' ';
          console.info('\n' + util.colors.green(u +'published' + ' on https://npmjs.com with tag v' + pkg.version) + '\n');
        }
      })
    });
  };
  
  gulp.task('install',(cb) => {
    return npmCommand('install', _pkgs.notInstalled, cb);
  });
  
  gulp.task('uninstall',(cb) => {
    var installed = Object.keys(require(cwd + '/package.json').devDependencies || {});
    var toUninstall = [];
    for (var i = 0; i < installed.length; i++) {
      if (! /^gulp-/.test(installed[i])) { continue; }
      if (installed[i] === me) { continue; }
      if (packages.indexOf(installed[i].substr(5)) === -1) { toUninstall.push(installed[i]); }
    }
    npmCommand('uninstall', toUninstall, cb);
  });
  
  gulp.task('bump',() => {
    var version = JSON.parse(fs.readFileSync(cwd+'/package.json','utf-8')).version;
    return gulp.src(cwd + '/package.json')
      .pipe(_if(Object.keys(argv).length === 2, bump()))
      .pipe(_if(argv.patch, bump()))
      .pipe(_if(argv.minor, bump({type: 'minor'})))
      .pipe(_if(argv.major, bump({type: 'major'})))
      .pipe(_if(argv.pre, bump({type: 'prerelease'})))
      .pipe(gulp.dest(cwd));
  });
  
  gulp.task('init',(cb) => {
    if (fs.readdirSync(cwd + '/.git')) {
      util.log(util.colors.bold.yellow('\n\nGit Repo Already Intialized.\n'));
      return cb();
    }
    git.init((err) => {
      if (err) {
        return cb(err);
      } else {
        util.log(util.colors.bold.green('\nEmpty Git Repo Intialized.\n'));
      }
    }, cb);
  });

  gulp.task('tag',['init','bump'], (cb) => {
    var version = JSON.parse(fs.readFileSync(cwd+'/package.json','utf-8')).version;
    git.tag('v'+version,'v'+version, (error) => {
      if (error) {
        return cb(error);
      }
      git.push('origin','master',{args:'--tags'},cb);
    });
  });

  gulp.task('commit',['init'],() => {
    var version = JSON.parse(fs.readFileSync(cwd+'/package.json','utf-8')).version;
    var message = argv.message || 'Version Bumped to v'+version;
    return gulp.src(cwd)
      .pipe(git.add())
      .pipe(git.commit(message,{args: '-a'}))
      .pipe(gulp.dest(cwd));
  });
  
  gulp.task('publish',['tag','commit'], (cb) => {
    return npmPublishCommand(cb);
  })

  return _pkgs.loaded;
};