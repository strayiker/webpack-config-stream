'use strict';

var expect = require('expect.js'),
    _ = require('lodash'),
    fs = require('vinyl-fs'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream'),
    formatStream = require('../lib/formatStream');

describe('formatStream', function () {
    var log = console.log,
        buffer = [];

    beforeEach(function() {
        console.log = function() {
            buffer = _.union(buffer, _.toArray(arguments));

            return log.apply(console, arguments);
        };
    });

    afterEach(function() {
        buffer = [];

        console.log = log;
    });

    it('should call "stats.toString()"', function(done) {
        var entry = fs.src('test/fixtures/formatStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            run = runStream(function() {
                expect(buffer).to.contain(formatStream.MESSAGE);
                expect(buffer).to.match(/Hash/);
                expect(buffer).to.match(/Time/);

                done();
            }),
            format = formatStream({
                verbose: true
            });

        entry.pipe(init).pipe(run).pipe(format);
    });
});
