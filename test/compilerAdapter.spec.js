'use strict';

var expect = require('expect.js'),
    fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    CompilerAdapter = require('../lib/compilerAdapter');

var FILENAME = path.resolve('test/fixtures/compilerAdapter/webpack.config.js');

describe('CompilerAdapter', function () {
    var compilerAdapter,
        file;

    beforeEach(function() {
        compilerAdapter = new CompilerAdapter({
            useMemoryFs: true,
            progress: false
        });

        file = new gutil.File({
            base: path.basename(FILENAME),
            path: FILENAME,
            contents: fs.readFileSync(FILENAME)
        });
    });

    context('#run()', function() {
        it('should compile config successfully', function(done) {
            compilerAdapter.run(file, function(err, stats) {
                expect(err).to.be(null);
                expect(stats).to.be.an(Object);

                done();
            });
        });

        it('should throw error when `callback` is not `Function`', function() {
            expect(compilerAdapter.run).withArgs(file).to.throwError();
        });
    });

    context('#watch()', function() {
        it('should compile config successfully', function(done) {
            compilerAdapter.watch(file, done);
        });

        it('should recompile config successfully', function(done) {
            compilerAdapter.watch(file, function() {
                compilerAdapter.watch(file, function(err, stats) {
                    expect(err).to.be(null);
                    expect(stats).to.be.an(Object);

                    done();
                });
            });
        });

        it('should throw error when `callback` is not `Function`', function() {
            expect(compilerAdapter.watch).withArgs(file).to.throwError();
        });
    });
});
