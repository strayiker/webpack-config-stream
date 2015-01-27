'use strict';

var path = require('path'),
    WebpackConfig = require('webpack-config');

module.exports = WebpackConfig.load().extend({
    gulp: false,
    entry: {
        test3: path.join(__dirname, 'index.js')
    }
});
