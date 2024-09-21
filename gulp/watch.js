'use strict';

var gulp = require('gulp');

var paths = {
  src: 'src', // Define your source directory
  tmp: 'tmp', // Define your temporary directory
  dist: 'dist' // Define your distribution directory
};

// Example of your inject task
gulp.task('inject', function () {
  // Your inject logic here
});

// Updated watch task
gulp.task('watch', gulp.series('inject', function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/{app,components}/**/*.scss',
    paths.src + '/{app,components}/**/*.js',
    'bower.json'
  ], gulp.series('inject'));
}));
