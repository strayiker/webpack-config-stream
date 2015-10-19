'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    initStream = require('../lib/initStream'),
    progressCallback = require('../lib/progressCallback');

describe('initStream', function () {
    it('should set options', function(done) {
        var options = {
                useMemoryFs: true,
                progress: true
            },
            entry = fs.src('test/fixtures/initStream/webpack.config.js'),
            init = initStream(options);

        init.on('data', function(chunk) {
            expect(chunk[initStream.FIELD_NAME]).to.eql({
                useMemoryFs: true,
                progress: progressCallback
            });

            done();
        });

        entry.pipe(init);
    });
});
