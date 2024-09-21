'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var hash = require('gulp-hash-filename');
var wiredep = require('wiredep').stream;

gulp.task('partials', function () {
    return gulp.src([
        paths.src + '/src/**/*.html',
        paths.tmp + '/src/**/*.html'
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'selfService',
            root: 'src/'
        }))
        .pipe(hash({
            "format": "{name}.{hash:8}{ext}"
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('html', gulp.series('partials', function () {
    return gulp.src(paths.src + '/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({ title: paths.dist + '/', showFiles: true }));
}));

gulp.task('vendor', function () {
    var jsFilter = $.filter('**/*.js', { restore: true });
    var cssFilter = $.filter('**/*.css', { restore: true });

    return gulp.src($.mainBowerFiles())
        .pipe(jsFilter)
        .pipe($.angularFilesort())
        .pipe(gulp.dest(paths.dist + '/vendor'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest(paths.dist + '/vendor'))
        .pipe(cssFilter.restore);
});

gulp.task('app-js', function () {
    return gulp.src(paths.src + '/*.js')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('js', gulp.series('vendor', 'partials', 'app-js', function () {
    return gulp.src([
        paths.src + '/src/**/*.js',
        '!' + paths.src + '/src/**/*.spec.js',
        '!' + paths.src + '/src/**/*.mock.js'
    ])
        .pipe($.angularFilesort())
        .pipe($.concat('app.js'))
        .pipe(hash({
            "format": "{name}.{hash:8}{ext}"
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
}));

gulp.task('images', function () {
    return gulp.src(paths.src + '/assets/images/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function () {
    return gulp.src([
        paths.src + '/**/*.ico',
        paths.src + '/**/locale-*.json'
    ])
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function () {
    return $.del([paths.dist + '/', paths.tmp + '/']);
});

// The build task now uses gulp.series to run tasks in sequence
gulp.task('build', gulp.series('clean', 'js', 'images', 'fonts', 'misc', function (done) {
    done(); // Ensure callback is called after the build sequence finishes
}));
