'use strict';

/**
 * Dictionary data structure with flexible sort capabilities
 *  - https://github.com/mikechabot/sortable-map
 *  - https://www.npmjs.com/package/sortable-map
 * @author Mike Chabot
 * @param sortProperty
 * @constructor
 */

function SortableMap(sortProperty) {
    this.store = [];
    this.sortProperty = null;

    if (sortProperty !== null && sortProperty !== undefined) {
        if (typeof sortProperty !== 'string') throw new Error('sortProperty must be a String literal');
        if (sortProperty.length === 0) throw new Error('sortProperty cannot be an empty String');
        this.sortProperty = sortProperty;
    }
}

/**
 * Add an entry to the store
 * @param key
 * @param value
 */
SortableMap.prototype.add = function (key, value) {
    if (!key) throw new Error('key is required');
    if (typeof key !== 'string') throw new Error('key must be a String');
    this.store[key] = value;
};

/**
 * Determine whether a key exists in the store
 * @param key
 * @returns {boolean}
 */
SortableMap.prototype.has = function (key) {
    if (!key) return false;
    if (typeof key !== 'string') return false;
    return this.keys().indexOf(key) !== -1;
};

/**
 * Find a single entry in the store
 * @param key
 * @returns {*}
 */
SortableMap.prototype.find = function (key) {
    if (!key) return;
    if (typeof key !== 'string') return;
    return this.store[key];
};

/**
 * Get all entries in the store
 * @returns {*}
 */
SortableMap.prototype.findAll = function () {
    var _this = this;

    var sorted = [];
    if (!this.sortProperty) {
        this.keys().sort().forEach(function (key) {
            sorted.push({ key: key, value: _this.store[key] });
        });
    } else {
        sorted = this.__toKeyValue();
        sorted.sort(function (a, b) {
            return a.value[_this.sortProperty] - b.value[_this.sortProperty];
        });
    }
    return sorted;
};

/**
 * Delete an entry from the store
 * @param key
 * @returns {*}
 */
SortableMap.prototype.delete = function (key) {
    if (!key) return;
    if (typeof key !== 'string') return;
    var temp = this.store[key];
    delete this.store[key];
    return temp;
};

/**
 * Return the number of entries in the store
 * @returns {number}
 */
SortableMap.prototype.count = function () {
    var count = 0;
    this.forEachKey(function () {
        count++;
    });
    return count;
};

/**
 * Clear the store
 */
SortableMap.prototype.clear = function () {
    var _this2 = this;

    this.forEachKey(function (key) {
        delete _this2.store[key];
    });
};

/**
 * Get store keys
 * @returns {Array}
 */
SortableMap.prototype.keys = function () {
    return Object.keys(this.store);
};

/**
 * Get store keys
 * @returns {Array}
 */
SortableMap.prototype.values = function () {
    var _this3 = this;

    var values = [];
    this.forEachKey(function (key) {
        values.push(_this3.store[key]);
    });
    return values;
};

/**
 * For each store key
 * @param callback
 */
SortableMap.prototype.forEachKey = function (callback) {
    this.keys().forEach(callback);
};

/**
 * For each entry in the store. Object provided to callback
 * contains key and value property.
 * @param callback
 */
SortableMap.prototype.forEach = function (callback) {
    return this.__toKeyValue().forEach(callback);
};

/**
 * Helper method that converts the store into an array
 * of key-value objects
 * @returns {Array}
 * @private
 */
SortableMap.prototype.__toKeyValue = function () {
    var _this4 = this;

    var array = [];
    this.forEachKey(function (key) {
        array.push({ key: key, value: _this4.store[key] });
    });
    return array;
};

module.exports = SortableMap;