# sortable-map

[![npm version](https://badge.fury.io/js/sortable-map.svg)](https://badge.fury.io/js/sortable-map)
[![Build Status](https://travis-ci.org/mikechabot/sortable-map.svg?branch=master)](https://travis-ci.org/mikechabot/sortable-map)
[![Dependency Status](https://david-dm.org/mikechabot/sortable-map.svg)](https://david-dm.org/mikechabot/sortable-map)
[![devDependencies Status](https://david-dm.org/mikechabot/sortable-map/dev-status.svg)](https://david-dm.org/mikechabot/sortable-map?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/mikechabot/sortable-map/badge.svg?branch=master&cacheBuster=1)](https://coveralls.io/github/mikechabot/sortable-map?branch=master)

Dictionary data structure with flexible sort capabilities

## Installation
`npm i -S sortable-map`

#### Usage
* `import SortableMap from 'sortable-map';`
* `const SortableMap = require('sortable-map');`


## Example

    const map = new SortableMap();
    map.add('foo', 'bar');

    map.has('foo');         // true
    map.find('foo');        // 'bar'
    map.findAll();          // [{ key: 'foo', value: 'bar' }]
    map.isEmpty();          // false
    map.count();            // 1
    may.keys();             // [ 'foo' ]
    may.values();           // [ 'bar' ]
    
    map.has('baz');         // false
    map.find('baz');        // undefined

    map.delete('foo');      // 'bar'
    map.count()             // 0

    map.add('foo', 'bar');
    map.add('ham', 'egg');
    map.clear();
    map.count();            // 0

## Iterators

    const map = new SortableMap();
    map.add('foo', 'bar');

### `forEach(cb)`

    map.forEach(entry => {
        entry.key;      // 'foo'
        entry.value;    // 'bar'
    ));

### `forEachKey(cb)`

    map.forEachKey(key => {
        key;             // 'foo'
    ));

### `forEachKey(cb)`

    map.forEachValue(value => {
        value;           // 'bar'
    ));


