'use strict';

var path = require('path'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromCwd().extend({
    output: {
        path: path.resolve(__dirname, '../output-path-custom')
    },
    entry: {
        index: path.join(__dirname, 'index.js')
    }
});
