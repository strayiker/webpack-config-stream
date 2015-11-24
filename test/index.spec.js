'use strict';

var WebpackConfig = require('webpack-config'),
    Index = require('../index');

describe('index', function () {
    it('should have static properties', function() {
        ['run', 'format', 'failAfter', 'closest', 'watch', 'proxy', 'props', 'init', 'webpack'].forEach(function(name) {
            expect(Index[name]).toEqual(jasmine.any(Function));
        });

        expect(Index.Config).toEqual(WebpackConfig);
    });
});
