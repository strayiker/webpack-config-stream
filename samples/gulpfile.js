'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src/**/' + webpack.config.CONFIG_FILENAME,
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map'
    };

gulp.task('webpack', [], function() {
    return gulp.src(src)
        .pipe(webpack.compile(webpackOptions))
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(src).on('change', function(event) {
        if (event.type === 'changed') {
            webpack.watch(event.path, webpackOptions, { base: path.resolve(event.path) }, function(err, stats) {
                gulp.src(event.path)
                    .pipe(webpack.proxy(err, stats))
                    .pipe(webpack.format({
                        verbose: true,
                        version: false
                    }))
                    .pipe(gulp.dest(dest));
            });
        }
    });
});
