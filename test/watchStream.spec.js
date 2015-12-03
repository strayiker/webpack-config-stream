'use strict';

var vfs = require('vinyl-fs'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    watchStream = require('../lib/watchStream');

describe('watchStream', function () {
    beforeEach(function() {
        spyOn(gutil, 'log');
    });

    it('should compile config successfully', function(done) {
        var entry = vfs.src('test/fixtures/watchStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            watch = watchStream(function(err, stats) {
                expect(err).toEqual(null);
                expect(stats).toEqual(jasmine.any(Object));

                done();
            });

        entry.pipe(init).pipe(watch).resume();
    });
});
