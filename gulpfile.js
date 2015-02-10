'use strict';

var path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    runSequence = require('run-sequence'),
    webpack = require('./'),
    Gitdown = require('gitdown');

var src = './test/fixtures',
    dest = './test/expected',
    paths = {
        scripts: [
            path.join(src, '*.js'),
            path.join('./samples', '**/*.js'),
            'gulpfile.js'
        ]
    },
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200,
        isConfigFile: function(file) {
            return file && file.path.indexOf(webpack.config.CONFIG_FILENAME) >= 0;
        },
        isConfigObject: function(config) {
            return config && !config.ignore;
        },
        useMemoryFs: true,
        progress: true
    };

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('webpack', [], function() {
    return gulp.src(path.join(path.join(src, '**', webpack.config.CONFIG_FILENAME)), { base: path.resolve(src) })
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
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest())
                .pipe(webpack.watch(webpackOptions, function(stream, err, stats) {
                    stream
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});

gulp.task('clean', function(callback) {
    del(path.join(dest, '**'), callback);
});

gulp.task('gitdown:readme', function() {
    return Gitdown.read('.gitdown/README.md').write('README.md');
});

gulp.task('gitdown:api', function() {
    var gitdown = Gitdown.read('.gitdown/docs/API.md');

    gitdown.config.headingNesting.enabled = false;

    return gitdown.write('docs/API.md');
});

gulp.task('gitdown', function(callback) {
    runSequence('gitdown:readme', 'gitdown:api', callback);
});

gulp.task('docs', ['gitdown']);

gulp.task('default', [], function(callback) {
    runSequence('clean', 'lint', 'docs', 'webpack', callback);
});
