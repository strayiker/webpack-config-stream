<!--
This file has been generated using Gitdown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for Gitdown markup file under ./.gitdown/ path.
-->
[![NPM version](http://img.shields.io/npm/v/gulp-webpack-build.svg?style=flat)](https://www.npmjs.org/package/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build/dev-status.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build#info=devDependencies)

[![NPM](https://nodei.co/npm/gulp-webpack-build.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-webpack-build/)

[gulp](https://github.com/gulpjs/gulp)-[webpack](https://github.com/webpack/webpack)-build
==========================================================================================

Helps to build bundles based on webpack configs

<h2 id="documentation">Documentation</h2>

For API docs please see the [documentation page](https://github.com/mdreizin/gulp-webpack-build/blob/master/docs/API.md)!

<h2 id="sample">Sample</h2>

Here is a quick sample of what `gulp-webpack-build` does

`gulpfile.js`

``` javascript
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src/**/',
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        isConfigFile: function(file) {
            return file && file.path.indexOf(webpack.config.CONFIG_FILENAME) >= 0;
        },
        isConfigObject: function(config) {
            return config && !config.ignore;
        }
    };

gulp.task('webpack', [], function() {
    return gulp.src(src + webpack.config.CONFIG_FILENAME)
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
    gulp.watch(src + '*.js').on('change', function(event) {
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