'use strict';

var path = require('path'),
    WebpackConfig = require('webpack-config');

module.exports = WebpackConfig.fromCwd().extend({
    entry: {
        test1: path.join(__dirname, 'index.js')
    }
});
