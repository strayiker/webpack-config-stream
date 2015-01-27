<!--
This file has been generated using Gitdown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for Gitdown markup file under ./.gitdown/ path.
-->
[![NPM version](http://img.shields.io/npm/v/gulp-webpack-build.svg?style=flat)](https://www.npmjs.org/package/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build/dev-status.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build#info=devDependencies)

[![NPM](https://nodei.co/npm/gulp-webpack-build.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-webpack-build/)

[gulp](https://github.com/gulpjs/gulp)-[webpack](https://github.com/webpack/webpack)-build
==========================================================================================

Helps to build bundles based on webpack configs

<h2 id="usage">Usage</h2>

``` javascript
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src/**',
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

```