'use strict';

var expect = require('expect.js'),
    fs = require('vinyl-fs'),
    propsStream = require('../lib/propsStream');

describe('propsStream', function () {
    it('should set options', function(done) {
        var options = {
                debug: true,
                devtool: '#source-map',
                watchDelay: 200
            },
            entry = fs.src('test/fixtures/propsStream/webpack.config.js'),
            props = propsStream(options);

        props.on('data', function(chunk) {
            expect(chunk[propsStream.FIELD_NAME]).to.eql(options);

            done();
        });

        entry.pipe(props).resume();
    });
});
