<!--
This file has been generated using Gitdown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for Gitdown markup file under ./.gitdown/ path.
-->
[![NPM version](http://img.shields.io/npm/v/gulp-webpack-build.svg?style=flat)](https://www.npmjs.org/package/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build/dev-status.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build#info=devDependencies)

[gulp](https://github.com/gulpjs/gulp)-[webpack](https://github.com/webpack/webpack)-build
==========================================================================================

Helps to build bundles based on webpack configs

[![NPM](https://nodei.co/npm/gulp-webpack-build.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-webpack-build/)

<h2 id="usage">Usage</h2>

``` javascript
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

```