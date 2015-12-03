'use strict';

var vfs = require('vinyl-fs'),
    propsStream = require('../lib/propsStream');

describe('propsStream', function () {
    it('should init options', function(done) {
        var options = {
                debug: true,
                devtool: '#source-map',
                watchDelay: 200
            },
            entry = vfs.src('test/fixtures/propsStream/webpack.config.js'),
            props = propsStream(options);

        props.on('data', function(chunk) {
            expect(chunk[propsStream.FIELD_NAME]).toEqual(options);

            done();
        });

        entry.pipe(props).resume();
    });
});
