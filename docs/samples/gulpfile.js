'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('webpack-config-stream'),
    DefaultCacheStrategy = require('webpack-config-stream/lib/defaultCacheStrategy');

var src = './src',
    dest = './dist',
    configOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    compilerOptions = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.Config.FILENAME,
    CACHE_DEPENDS_ON = [
        './package.json'
    ],
    RUN_CACHE_STRATEGY = new DefaultCacheStrategy({
        dependsOn: [
            '[dirname]/**/*.*'
        ].concat(CACHE_DEPENDS_ON)
    }),
    WATCH_CACHE_STRATEGY = new DefaultCacheStrategy({
        dependsOn: [
            '[filename]'
        ].concat(CACHE_DEPENDS_ON)
    });

gulp.task('webpack', [], function() {
    return gulp.src(path.join(src, '**', CONFIG_FILENAME), { base: path.resolve(src) })
        .pipe(webpack.cache(RUN_CACHE_STRATEGY))
        .pipe(webpack.init(compilerOptions))
        .pipe(webpack.props(configOptions))
        .pipe(webpack.run())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(webpack.ignore())
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest())
                .pipe(webpack.cache(WATCH_CACHE_STRATEGY))
                .pipe(webpack.init(compilerOptions))
                .pipe(webpack.props(configOptions))
                .pipe(webpack.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(webpack.ignore())
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});
