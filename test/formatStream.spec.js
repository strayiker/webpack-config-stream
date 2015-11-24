'use strict';

var _ = require('lodash'),
    fs = require('vinyl-fs'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream'),
    formatStream = require('../lib/formatStream');

describe('formatStream', function () {
    beforeEach(function() {
        spyOn(gutil, 'log');
    });

    it('should call `stats.toString()`', function(done) {
        var entry = fs.src('test/fixtures/formatStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            run = runStream(),
            format = formatStream({
                verbose: true
            });

        entry.pipe(init).pipe(run).pipe(format).on('end', function() {
            var args = _.flatten(gutil.log.calls.allArgs());

            expect(args).toEqual(jasmine.arrayContaining([formatStream.MESSAGE]));

            done();
        }).resume();
    });
});
