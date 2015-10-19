'use strict';

var path = require('path'),
    WebpackConfig = require('webpack-config');

module.exports = new WebpackConfig().merge({
    entry: path.join(__dirname, 'index.js'),
    filename: __filename
});
