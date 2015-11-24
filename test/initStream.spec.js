'use strict';

var fs = require('vinyl-fs'),
    initStream = require('../lib/initStream'),
    progressCallback = require('../lib/progressCallback');

describe('initStream', function () {
    it('should init options', function(done) {
        var options = {
                useMemoryFs: true,
                progress: true
            },
            entry = fs.src('test/fixtures/initStream/webpack.config.js'),
            init = initStream(options);

        init.on('data', function(chunk) {
            expect(chunk[initStream.FIELD_NAME]).toEqual({
                useMemoryFs: true,
                progress: progressCallback
            });

            done();
        });

        entry.pipe(init).resume();
    });

    it('should init empty options', function(done) {
        var entry = fs.src('test/fixtures/initStream/webpack.config.js'),
            init = initStream();

        init.on('data', function(chunk) {
            expect(chunk[initStream.FIELD_NAME]).toEqual({});

            done();
        });

        entry.pipe(init).resume();
    });
});
