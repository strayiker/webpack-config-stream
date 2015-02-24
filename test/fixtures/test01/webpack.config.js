'use strict';

var path = require('path'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromCwd().extend({
    entry: {
        test1: path.join(__dirname, 'index.js')
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
});
