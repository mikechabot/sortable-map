'use strict';

function SortableMap (sortProperty) {
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

SortableMap.prototype.has = function (key) {
    if (!key) return false;
    if (typeof key !== 'string') return false;
    return this.__keys().indexOf(key) !== -1;
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
    const sorted = [];
    if (!this.sortProperty) {
        this.__forEachSortedKey(key => {
            sorted.push({key, value: this.store[key] });
        });
        return sorted;
    }
    this.__forEachKey(key => {
        sorted.push({key, value: this.store[key] });
    });
    return sorted.sort((a, b) => a.value[this.sortProperty] - b.value[this.sortProperty]);
};

/**
 * Delete an entry from the store
 * @param key
 * @returns {*}
 */
SortableMap.prototype.delete = function (key) {
    if (!key) return;
    if (typeof key !== 'string') return;
    const temp = this.store[key];
    delete this.store[key];
    return temp;
};

/**
 * Return the number of entries in the store
 * @returns {number}
 */
SortableMap.prototype.count = function () {
    let count = 0;
    this.__forEachKey(() => { count++; });
    return count;
};

/**
 * Clear the store
 */
SortableMap.prototype.clear = function () {
    this.__forEachKey((key) => { delete this.store[key]; });
};

/**
 * Get store keys
 * @returns {Array}
 * @private
 */
SortableMap.prototype.__keys = function() {
    return Object.keys(this.store);
};

/**
 * For each store key
 * @param callback
 * @private
 */
SortableMap.prototype.__forEachKey = function(callback) {
    this.__keys().forEach(callback);
};

/**
 * Get sorted store keys
 * @returns {Array.<*>}
 * @private
 */
SortableMap.prototype.__sortedKeys = function() {
    return this.__keys().sort();
};

/**
 * For each sorted store key
 * @param callback
 * @private
 */
SortableMap.prototype.__forEachSortedKey = function(callback) {
    this.__sortedKeys().forEach(callback);
};

module.exports = SortableMap;
