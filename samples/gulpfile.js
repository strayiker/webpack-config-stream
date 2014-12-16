'use strict';

var gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

gulp.task('webpack', [], function() {
    return gulp.src('./src/**')
        .pipe(webpack({
            debug: true,
            verbose: false,
            stats: {
                colors: true,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: true,
                version: false,
                cached: false,
                cachedAssets: false,
                reasons: false,
                source: false,
                errorDetails: false
            },
            processIf: function(file) {
                return file.path.indexOf(webpack.CONFIG_FILENAME) >= 0;
            },
            compileIf: function(config) {
                return config.gulp === true;
            }
        }))
        .pipe(gulp.dest('./dist'));
});
