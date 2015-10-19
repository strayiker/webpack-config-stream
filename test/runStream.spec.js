'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream');

describe('runStream', function () {
    it('should compile config successfully', function(done) {
        var entry = fs.src('test/fixtures/runStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            run = runStream(function(err, stats) {
                expect(err).to.be(null);
                expect(stats).to.be.an(Object);

                done();
            });

        entry.pipe(init).pipe(run);
    });
});
