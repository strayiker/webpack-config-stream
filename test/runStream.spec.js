'use strict';

var vfs = require('vinyl-fs'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream');

describe('runStream', function () {
    beforeEach(function() {
        spyOn(gutil, 'log');
        spyOn(process.stdout, 'write');
    });

    it('should compile config successfully', function(done) {
        var entry = vfs.src('test/fixtures/runStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: true
            }),
            run = runStream(function(err, stats) {
                expect(err).toEqual(null);
                expect(stats).toEqual(jasmine.any(Object));

                done();
            });

        entry.pipe(init).pipe(run).resume();
    });
});
