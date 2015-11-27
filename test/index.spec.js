'use strict';

var WebpackConfig = require('webpack-config'),
    _ = require('lodash'),
    Index = require('../index');

describe('index', function () {
    it('should have static properties', function() {
        _.each({
            run: Function,
            format: Function,
            failAfter: Function,
            closest: Function,
            watch: Function,
            proxy: Function,
            props: Function,
            init: Function,
            webpack: Function
        }, function(value, key) {
            expect(_.get(Index, key)).toEqual(jasmine.any(value));
        });

        expect(Index.Config).toEqual(WebpackConfig);
    });
});
