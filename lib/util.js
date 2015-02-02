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
    }
};
