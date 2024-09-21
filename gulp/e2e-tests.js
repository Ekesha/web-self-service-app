'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var paths = gulp.paths;

// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);
gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

function runProtractor(done) {
  gulp.src(paths.e2e + '/**/*.js')
    .pipe($.protractor.protractor({
      configFile: 'protractor.conf.js',
    }))
    .on('error', function (err) {
      throw err;
    })
    .on('end', function () {
      browserSync.exit();
      done();
    });
}

// Define the tasks properly
gulp.task('serve:e2e', function (done) {
  // Add the implementation for serving e2e here
  done();
});

gulp.task('serve:e2e-dist', function (done) {
  // Add the implementation for serving e2e dist here
  done();
});

// Define `protractor:src` task before referencing it
gulp.task('protractor:src', gulp.series('serve:e2e', 'webdriver-update', runProtractor));

gulp.task('protractor:dist', gulp.series('serve:e2e-dist', 'webdriver-update', runProtractor));

// Now you can reference it properly
gulp.task('protractor', gulp.series('protractor:src'));
