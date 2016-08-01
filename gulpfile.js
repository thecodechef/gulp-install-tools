'use-strict';

const gulp = require('gulp'),
      util = require('gulp-util'),
      argv = require('yargs').argv,
      fs   = require('fs'),
      $    = require('./index.js')(gulp, [
        'concat',
        'rename',
        'replace',
        'bump',
        'if',
        'git'
      ]);

gulp.task('default',() => {
	gulp.src('./test/package.json')
	.pipe($.if((Object.keys(argv).length === 2), $.bump()))
	.pipe($.if(argv.patch, $.bump({type: 'patch'})))
	.pipe($.if(argv.minor, $.bump({type: 'minor'})))
	.pipe($.if(argv.major, $.bump({type: 'major'})))
	.pipe(gulp.dest('./test'));
});