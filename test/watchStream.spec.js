'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    initStream = require('../lib/initStream'),
    watchStream = require('../lib/watchStream');

describe('watchStream', function () {
    it('should compile config successfully', function(done) {
        var entry = fs.src('test/fixtures/watchStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            watch = watchStream(function(err, stats) {
                expect(err).to.be(null);
                expect(stats).to.be.an(Object);

                done();
            });

        entry.pipe(init).pipe(watch);
    });
});
