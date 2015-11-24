'use strict';

var path = require('path'),
    fs = require('vinyl-fs'),
    ignoreStream = require('../lib/ignoreStream');

describe('ignoreStream', function () {
    var files;

    beforeEach(function() {
        files = [];
    });

    it('should ignore `webpack.config.js`', function(done) {
        var entry = fs.src('test/fixtures/ignoreStream/webpack.config.js'),
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
        var entry = fs.src(['test/fixtures/ignoreStream/index.js', 'test/fixtures/ignoreStream/webpack*config.js']),
            ignore = ignoreStream('webpack*config.js');

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
