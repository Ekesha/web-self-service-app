'use strict';

var gulp = require('gulp');
var util = require('util');
var browserSync = require('browser-sync');
var middleware = require('./proxy'); // Ensure this module is correctly implemented
var paths = gulp.paths; // Assuming this is defined elsewhere

// Function to initialize browser-sync
function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    ghostMode: false,
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });
}

// Define the watch task
gulp.task('watch', function () {
  gulp.watch([paths.src + '/src/**/*.js'], gulp.series('inject')); // Adjust paths and tasks accordingly
});

// Serve task for development
gulp.task('serve', gulp.series('watch', function () {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src
  ], [
    paths.src + '/src/**/*.js',
    paths.src + '/src/**/*.html',
    paths.src + '/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/**/*.html',
    paths.tmp + '/serve/**/*.css'
  ]);
}));

// Serve task for production
gulp.task('serve:dist', gulp.series('build', function () {
  browserSyncInit(paths.dist);
}));

// Serve task for end-to-end testing
gulp.task('serve:e2e', gulp.series('inject', function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
}));

// Serve task for end-to-end testing in dist mode
gulp.task('serve:e2e-dist', gulp.series('build', function () {
  browserSyncInit(paths.dist, null, []);
}));
