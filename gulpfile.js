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
  console.log('Cleaning up dist and tmp directories...');
  return del([gulp.paths.dist, gulp.paths.tmp]);
});

// Build task to copy files from src to dist
gulp.task('build', function () {
  return gulp.src(gulp.paths.src + '/**/*') // Adjust source path as needed
    .pipe(gulp.dest(gulp.paths.dist)) // Output to dist
    .on('end', function () {
      console.log('Build completed!');
    });
});

// Default task: clean and then build
gulp.task('default', gulp.series('clean', 'build'));
