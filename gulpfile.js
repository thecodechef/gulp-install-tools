'use-strict';

const gulp = require('gulp'),
      util = require('gulp-util'),
      $    = require('./index.js')(gulp, [
        'concat',
        'rename',
        'replace'
      ]);

gulp.task('default',() => {
	util.log($.util.colors.bold.red('to Install or to Uninstall?'));
});