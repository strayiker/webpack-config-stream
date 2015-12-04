'use strict';

var _ = require('lodash'),
    path = require('path'),
    vfs = require('vinyl-fs'),
    fse = require('fs-extra'),
    gutil = require('gulp-util'),
    initStream = require('../lib/initStream'),
    runStream = require('../lib/runStream'),
    cacheStream = require('../lib/cacheStream'),
    CacheStore = require('../lib/cacheStore');

var CACHE = CacheStore.INSTANCE;

describe('cacheStream', function () {
    beforeEach(function() {
        spyOn(gutil, 'log');
        spyOn(process.stdout, 'write');
    });

    afterAll(function(done) {
        fse.remove(CACHE.filename, done);
    });

    it('should compile first time', function(done) {
        var entry = vfs.src('test/fixtures/cacheStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            run = runStream(),
            cache = cacheStream();

        run.on('data', function(file) {
            console.log(path.basename(file.path));
        });

        cache.on('end', function() {
            var args = _.flatten(gutil.log.calls.allArgs());

            expect(args).toEqual(jasmine.arrayContaining([cacheStream.OBSOLETE_MESSAGE]));

            done();
        });

        entry.pipe(cache).pipe(init).pipe(run).resume();
    });

    it('should not compile second time', function(done) {
        var entry = vfs.src('test/fixtures/cacheStream/webpack.config.js'),
            init = initStream({
                useMemoryFs: true,
                progress: false
            }),
            run = runStream(),
            cache = cacheStream();

        cache.on('end', function() {
            var args = _.flatten(gutil.log.calls.allArgs());

            expect(args).toEqual(jasmine.arrayContaining([cacheStream.UP_TO_DATE_MESSAGE]));

            done();
        });

        entry.pipe(cache).pipe(init).pipe(run).resume();
    });
});
