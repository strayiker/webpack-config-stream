'use strict';

var path = require('path'),
    _ = require('lodash'),
    WebpackConfig = require('webpack-config'),
    configFactory = require('../lib/configFactory');

var SIMPLE_FILENAME = 'test/fixtures/configFactory/webpack.1.config.js',
    ARRAY_FILENAME = 'test/fixtures/configFactory/webpack.2.config.js';

var SIMPLE_CONFIG = {
    filename: path.resolve(SIMPLE_FILENAME),
    output: {
        path: path.dirname(SIMPLE_FILENAME)
    }
};

describe('ConfigFactory', function () {
    it('should load `Config`', function() {
        var config = configFactory(SIMPLE_FILENAME);

        expect(config).toEqual(jasmine.any(WebpackConfig));
        expect(config.toObject()).toEqual(SIMPLE_CONFIG);
    });

    it('should load `Config` and override existing properties', function() {
        var config = configFactory(SIMPLE_FILENAME, {
            foo: 'bar'
        });

        expect(config).toEqual(jasmine.any(WebpackConfig));
        expect(config.toObject()).toEqual(_.extend({}, SIMPLE_CONFIG, {
            foo: 'bar'
        }));
    });

    it('should load `Config[]`', function() {
        var configs = configFactory(ARRAY_FILENAME),
            config = configs[0];

        expect(configs).toEqual(jasmine.any(Array));
        expect(config).toEqual(jasmine.any(WebpackConfig));
        expect(config.toObject()).toEqual(SIMPLE_CONFIG);
    });

    it('should load `Config[]` and override existing properties', function() {
        var configs = configFactory(ARRAY_FILENAME, {
                foo: 'bar'
            }),
            config = configs[0];

        expect(configs).toEqual(jasmine.any(Array));
        expect(config).toEqual(jasmine.any(WebpackConfig));
        expect(config.toObject()).toEqual(_.extend({}, SIMPLE_CONFIG, {
            foo: 'bar'
        }));
    });
});
