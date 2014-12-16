'use strict';

var path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    runSequence = require('run-sequence'),
    webpack = require('./'),
    gitdown = require('gitdown');

var src = path.resolve('./test/fixtures'),
    dest = path.resolve('./test/expected'),
    paths = {
        scripts: [
            path.join(src, '**/*.js'),
            path.join('./samples', '**/*.js'),
            'gulpfile.js'
        ]
    };

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('webpack', [], function() {
    return gulp.src(path.join(src, '**'))
        .pipe(webpack({
            debug: true,
            verbose: false,
            stats: {
                version: false
            },
            accept: function(config) {
                return config.gulp === true;
            }
        }))
        .pipe(gulp.dest(dest));
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
