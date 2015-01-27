'use strict';

var path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    runSequence = require('run-sequence'),
    webpack = require('./'),
    gitdown = require('gitdown');

var src = './test/fixtures/**',
    dest = './test/expected',
    paths = {
        scripts: [
            path.join(src, '**/*.js'),
            path.join('./samples', '**/*.js'),
            'gulpfile.js'
        ]
    },
    webpackOptions = {
        debug: true,
        devtool: '#source-map'
    };

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

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

gulp.task('watch', [], function() {
    gulp.watch(src).on('change', function(event) {
        if (event.type === 'changed') {
            webpack.watch(event.path, webpackOptions, { base: path.dirname(event.path) }, function(err, stats) {
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

gulp.task('clean', function(callback) {
    del(path.join(dest, '**'), callback);
});

gulp.task('docs', ['gitdown']);

gulp.task('gitdown', function() {
    return gitdown.read('.gitdown/README.md').write('README.md');
});

gulp.task('default', [], function(callback) {
    runSequence('clean', 'lint', 'docs', 'webpack', callback);
});
