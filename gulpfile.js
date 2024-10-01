'use strict';

const gulp = require('gulp'); // Import Gulp

const { src, dest, watch, series } = require('gulp');

gulp.paths = {
  src: 'app',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e-tests'
};

require('require-dir')('./gulp');

function clean(cb) {
    // Clean task logic
    cb();
}

function build(cb) {
    // Build task logic
    cb();
}

function watchFiles() {
    watch('src/**/*.js', build); // Adjust the path and task as needed
}

exports.clean = clean;
exports.build = build;
exports.watch = watchFiles; // Define the watch task
exports.default = series(clean, build); // Default task
