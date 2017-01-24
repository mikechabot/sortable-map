function SortableMap (sortProperty) {
    this.store = [];
    this.sortProperty = null;

    if (sortProperty !== null && sortProperty !== undefined) {
        if (typeof sortProperty !== 'string') throw new Error('sortProperty must be a String literal');
        if (sortProperty.length === 0) throw new Error('sortProperty cannot be an empty String');
        this.sortProperty = sortProperty;
    }
}

SortableMap.prototype.add = function (key, value) {
    if (!key) throw new Error('key is required');
    if (typeof key !== 'string') throw new Error('key must be a String');
    this.store[key] = value;
};

SortableMap.prototype.find = function (key) {
    if (!key) return;
    if (typeof key !== 'string') return;
    return this.store[key];
};

SortableMap.prototype.delete = function (key) {
    if (!key) return;
    if (typeof key !== 'string') return;
    const temp = this.store[key];
    delete this.store[key];
    return temp;
};

SortableMap.prototype.count = function () {
    let count = 0;
    Object.keys(this.store).forEach(() => {
        count++;
    });
    return count;
};

SortableMap.prototype.clear = function () {
    Object.keys(this.store).forEach((key) => {
        delete this.store[key];
    });
};

module.exports = SortableMap;
