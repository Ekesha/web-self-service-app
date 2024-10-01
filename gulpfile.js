'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'app',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e-tests'
};

// Automatically require tasks from the gulp directory
require('require-dir')('./gulp');

// Define the default task for Gulp 4
gulp.task('default', gulp.series('clean', 'build'));
