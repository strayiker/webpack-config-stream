'use strict';

var path = require('path'),
    vfs = require('vinyl-fs'),
    ignoreStream = require('../lib/ignoreStream'),
    IgnoreStrategy = require('../lib/ignoreStrategy');

describe('ignoreStream', function () {
    var files;

    beforeEach(function() {
        files = [];
    });

    it('should ignore `webpack.config.js`', function(done) {
        var entry = vfs.src('test/fixtures/ignoreStream/webpack.config.js'),
            ignore = ignoreStream();

        ignore.on('data', function(chunk) {
            files.push(path.resolve(chunk.path));
        });

        entry.pipe(ignore).on('end', function() {
            expect(files.length).toEqual(0);

            done();
        }).resume();
    });

    it('should ignore `webpack*config.js`', function(done) {
        var entry = vfs.src(['test/fixtures/ignoreStream/index.js', 'test/fixtures/ignoreStream/webpack*config.js']),
            ignore = ignoreStream(new IgnoreStrategy({ pattern: 'webpack*config.js' }));

        ignore.on('data', function(chunk) {
            files.push(path.resolve(chunk.path));
        });

        entry.pipe(ignore).on('end', function() {
            expect(files).toEqual([
                path.resolve('test/fixtures/ignoreStream/index.js')
            ]);

            done();
        }).resume();
    });
});
