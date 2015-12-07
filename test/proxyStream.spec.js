'use strict';

var vfs = require('vinyl-fs'),
    proxyStream = require('../lib/proxyStream');

describe('proxyStream', function () {
    it('should throw exception', function(done) {
        var entry = vfs.src(__filename),
            error = new Error('test'),
            proxy = proxyStream(error);

        entry.pipe(proxy).on('error', function(err) {
            expect(err.message).toEqual(error.message);

            done();
        }).resume();
    });

    it('should call `end()` when `err` and `stats` are not defined', function(done) {
        var entry = vfs.src(__filename),
            proxy = proxyStream();

        entry.pipe(proxy).on('end', done).resume();
    });
});
