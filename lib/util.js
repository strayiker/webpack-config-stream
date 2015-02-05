'use strict';

var MemoryFs = require('memory-fs'),
    Stats = require('webpack/lib/Stats');

module.exports = {
    isFunction: function(value) {
        return typeof value === 'function';
    },

    isUndefined: function(value) {
        return typeof value === 'undefined';
    },

    isDefined: function(value) {
        return !this.isUndefined(value);
    },

    isObject: function (value) {
        return value != null && typeof value === 'object';
    },

    pick: function(value, keys) {
        var result = {};

        Object.keys(value).forEach(function(key) {
            var contains = keys.indexOf(key) >= 0;

            if (contains) {
                result[key] = value[key];
            }
        });

        return result;
    },

    omit: function(value, keys) {
        var result = {};

        Object.keys(value).forEach(function(key) {
            var contains = keys.indexOf(key) >= 0;

            if (!contains) {
                result[key] = value[key];
            }
        });

        return result;
    },

    isMemoryFs: function(value) {
        return this.isObject(value) && value instanceof MemoryFs;
    },

    isStats: function(value) {
        return this.isObject(value) && value instanceof Stats;
    }
};
