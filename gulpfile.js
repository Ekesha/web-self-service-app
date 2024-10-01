'use strict';

var gulp = require('gulp');
var del = require('del');

// Paths
gulp.paths = {
  src: 'app',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e-tests'
};

// Automatically require tasks from the gulp directory
require('require-dir')('./gulp');

// Clean task to delete dist and tmp directories
gulp.task('clean', function () {
  return del([gulp.paths.dist, gulp.paths.tmp]);
});

// Placeholder for your build task
gulp.task('build', function (done) {
  // Add your actual build process here
  // Example: returning a stream or using the done callback if synchronous
  console.log('Building...');
  done();
});

// Default task: clean and then build
gulp.task('default', gulp.series('clean', 'build'));
