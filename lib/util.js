'use strict';

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
    }
};
