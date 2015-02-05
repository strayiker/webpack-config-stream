'use strict';

var path = require('path'),
    WebpackConfig = require('webpack-config');

module.exports = WebpackConfig.load().extend({
    entry: {
        test4: path.join(__dirname, 'index.js')
    }
});
