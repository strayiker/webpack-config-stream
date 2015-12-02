'use strict';

var path = require('path'),
    _ = require('lodash'),
    fs = require('vinyl-fs'),
    WebpackConfig = require('webpack-config'),
    closestStream = require('../lib/closestStream'),
    ClosestStrategy = require('../lib/closestStrategy');

describe('closestStream', function () {
    it('should find closest config by default name', function(done) {
        var entry = fs.src('test/fixtures/closestStream/dir1/dir2/dir3/index.js'),
            closest = closestStream();

        closest.on('data', function(chunk) {
            var filename = path.resolve(path.join('test/fixtures/closestStream', WebpackConfig.FILENAME));

            expect(chunk.history).toContain(filename);

            done();
        });

        entry.pipe(closest).resume();
    });

    it('should find closest config by custom name', function(done) {
        var basename = 'webpack.1.config.js',
            entry = fs.src('test/fixtures/closestStream/dir1/dir2/dir3/index.js'),
            closest = closestStream(new ClosestStrategy({ basename: basename }));

        closest.on('data', function(chunk) {
            var filename = path.resolve(path.join('test/fixtures/closestStream/dir1', basename));

            expect(chunk.history).toContain(filename);

            done();
        });

        entry.pipe(closest).resume();
    });

    it('should not find closest config when it does not exist', function(done) {
        var entry = fs.src('test/fixtures/closestStream/dir1/dir2/dir3/index.js'),
            closest = closestStream(new ClosestStrategy({ basename: 'webpack.not-found.config.js' })),
            filename;

        closest.on('data', function(chunk) {
            filename = _.last(chunk.history || []);
        });

        entry.on('end', function() {
            expect(filename).toEqual(undefined);

            done();
        });

        entry.pipe(closest).resume();
    });
});
