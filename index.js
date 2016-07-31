/* jshint node: true */
module.exports = (gulp, packages) => {
  'use-strict';

  var me = "gulp-install-tools"
  var util = require('gulp-util');
  var _pkgs = { notInstalled: [], loaded: {} };
  var camel = (str) => {return str.replace(/-(\w)/g,(match, char) => { return char.toUpperCase(); });};
  var cwd = process.cwd();
  
  for (var i = 0; i < packages.length; i++) {
    var pkg = packages[i].split(/\sas\s/, 2);
    pkg[1] = camel(pkg[pkg.length === 2 ? 1 : 0]);
    pkg[0] = pkg[0].replace(/([A-Z])/g, '-$1').toLowerCase();
    packages[i] = pkg[0];
    var m = 'gulp-' + pkg[0];
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
  
  gulp.task('publish',(cb) => {
    return npmPublishCommand(cb);
  });

  return _pkgs.loaded;
};