'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    proxyStream = require('../lib/proxyStream');

describe('proxyStream', function () {
    it('should throw exception', function(done) {
        var entry = fs.src(__filename),
            error = new Error('test'),
            proxy = proxyStream(error);

        entry.pipe(proxy).on('error', function(err) {
            expect(err.message).to.eql(error.message);

            done();
        });
    });

    it('should call "end()" when "err" and "stats" are not defined', function(done) {
        var entry = fs.src(__filename),
            proxy = proxyStream();

        entry.pipe(proxy).on('end', function() {
            done();
        }).resume();
    });
});
