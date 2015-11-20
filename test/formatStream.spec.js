'use strict';

var expect = require('expect.js'),
    _ = require('lodash'),
    fs = require('vinyl-fs'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream'),
    formatStream = require('../lib/formatStream');

describe('formatStream', function () {
    var log = gutil.log,
        buffer = [];

    beforeEach(function() {
        gutil.log = function() {
            buffer = _.union(buffer, _.toArray(arguments));
        };
    });

    afterEach(function() {
        buffer = [];

        gutil.log = log;
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
            expect(buffer).to.contain(formatStream.MESSAGE);
            expect(buffer).to.match(/Hash/);
            expect(buffer).to.match(/Time/);

            done();
        }).resume();
    });
});
