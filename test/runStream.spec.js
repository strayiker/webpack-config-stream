'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream');

describe('runStream', function () {
    var log = gutil.log;

    beforeEach(function() {
        gutil.log = function() {};
    });

    afterEach(function() {
        gutil.log = log;
    });

    it('should compile config successfully', function(done) {
        var entry = fs.src('test/fixtures/runStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: true
            }),
            run = runStream(function(err, stats) {
                expect(err).to.be(null);
                expect(stats).to.be.an(Object);

                done();
            });

        entry.pipe(init).pipe(run).resume();
    });
});
