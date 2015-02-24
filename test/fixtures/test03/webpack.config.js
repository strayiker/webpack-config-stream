'use strict';

var path = require('path'),
    webpackConfig = require('webpack-config');

module.exports = [
    webpackConfig.fromCwd().extend({}),
    webpackConfig.fromCwd().extend({
        entry: {
            test3: path.join(__dirname, 'index.js')
        }
    })
];
