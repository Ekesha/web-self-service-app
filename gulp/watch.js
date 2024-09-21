'use strict';

var gulp = require('gulp');

var paths = {
  src: 'src', // Define your source directory
  tmp: 'tmp', // Define your temporary directory
  dist: 'dist' // Define your distribution directory
};

// Example of inject task
gulp.task('inject', function () {
  // Your inject logic here
});

// Watch task
gulp.task('watch', gulp.series('inject', function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/{app,components}/**/*.scss',
    paths.src + '/{app,components}/**/*.js',
    'bower.json'
  ], gulp.series('inject')); // Call inject when files change
}));

// Serve task, which calls watch
gulp.task('serve', gulp.series('watch', function () {
  // Your serve logic here
}));

// Default task or other tasks
gulp.task('default', gulp.series('serve'));
