'use strict';

var path = require('path'),
    WebpackConfig = require('webpack-config');

module.exports = WebpackConfig.fromCwd().extend({
    output: {
        path: path.join(__dirname, '[hash]')
    },
    entry: {
        test4: path.join(__dirname, 'index.js')
    }
});
