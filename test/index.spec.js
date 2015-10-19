'use strict';

var expect = require('expect.js'),
    WebpackConfig = require('webpack-config'),
    Index = require('../index');

describe('index', function () {
    it('should have static properties', function() {
        ['run', 'format', 'failAfter', 'closest', 'watch', 'proxy', 'props', 'init', 'webpack'].forEach(function(name) {
            expect(Index[name]).to.be.an(Function);
        });

        expect(Index.Config).to.eql(WebpackConfig);
    });
});
