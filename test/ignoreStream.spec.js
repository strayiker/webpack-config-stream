'use strict';

var expect = require('expect.js'),
    path = require('path'),
    fs = require('vinyl-fs'),
    ignoreStream = require('../lib/ignoreStream');

describe('ignoreStream', function () {
    var files;

    beforeEach(function() {
        files = [];
    });

    it('should ignore "webpack.config.js"', function(done) {
        var entry = fs.src('test/fixtures/ignoreStream/webpack.config.js'),
            ignore = ignoreStream();

        ignore.on('data', function(chunk) {
            files.push(chunk.path);
        });

        entry.pipe(ignore).on('end', function() {
            expect(files).to.be.empty();

            done();
        }).resume();
    });

    it('should ignore "webpack*config.js"', function(done) {
        var entry = fs.src(['test/fixtures/ignoreStream/index.js', 'test/fixtures/ignoreStream/webpack*config.js']),
            ignore = ignoreStream('webpack*config.js');

        ignore.on('data', function(chunk) {
            files.push(chunk.path);
        });

        entry.pipe(ignore).on('end', function() {
            expect(files).to.eql([
                path.resolve('test/fixtures/ignoreStream/index.js')
            ]);

            done();
        }).resume();
    });
});
