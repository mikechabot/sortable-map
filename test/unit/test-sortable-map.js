'use strict';

const expect = require('chai').expect;
const SortableMap = require('../../src');

const falsyValues = [ false, null, undefined, 0, NaN, '', '' ];
const nonStrings = [ false, null, undefined, 123, Math.PI, NaN, {}, [], () => {} ];
const testObjects = { obj: {}, str: 'bar', num: Math.PI, func: () => {} };

describe('SortableMap', () => {
    let map;
    beforeEach(() => {
        map = new SortableMap();
    });

    describe('constructor with no arguments', () => {
        it('Should have a store property', () => {
            expect(map.hasOwnProperty('store')).to.equal(true);
        });
        it('Should create store as an empty Array', () => {
            expect(map.store).to.be.a('array');
            expect(map.store).to.empty;
        });
    });
    describe('add', () => {
        it('Should throw an error if the key is falsy', () => {
            falsyValues.forEach(falsy => {
                expect(() => { map.add(falsy); }).to.throw('key is required');
            });
        });
        it('Should throw an error if the key is not a String', () => {
            nonStrings.forEach(nonString => {
                expect(() => { map.add(nonString); }).to.throw(/key (is required|must be a String)$/);
            });
        });
        it('Should add the value at the key', () => {
            // Under test
            for (let prop in testObjects) {
                map.add(prop, testObjects[prop]);
            }
            for (let prop in testObjects) {
                expect(map.store[prop]).to.equal(testObjects[prop]);
            }
        });
        it('Should overwrite the value at an existing key', () => {
            // Under test
            for (let prop in testObjects) {
                map.add(prop, testObjects[prop]);
            }
            // Under test
            for (let prop in testObjects) {
                map.add(prop, 123);
            }
            for (let prop in testObjects) {
                expect(map.store[prop]).to.equal(123);
            }
        });
    });
    describe('has', () => {
        it('Should return false if key is falsy', () => {
            falsyValues.forEach(falsy => {
                expect(map.has(falsy)).to.equal(false);
            });
        });
        it('Should return false if key is not a String', () => {
            nonStrings.forEach(nonString => {
                expect(map.has(nonString)).to.equal(false);
            });
        });
        it('Should return false if the key does not exist', () => {
            for (let prop in testObjects) {
                expect(map.has(prop)).to.equal(false);
            }
        });
        it('Should return true if the store contains the key', () => {
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            for (let prop in testObjects) {
                expect(map.has(prop)).to.equal(true);
            }
        });
    });
    describe('find', () => {
        it('Should return undefined if key is falsy', () => {
            falsyValues.forEach(falsy => {
                expect(map.find(falsy)).to.equal(undefined);
            });
        });
        it('Should return undefined if key is not a String', () => {
            nonStrings.forEach(nonString => {
                expect(map.find(nonString)).to.equal(undefined);
            });
        });
        it('Should return undefined if the key does not exist', () => {
            for (let prop in testObjects) {
                expect(map.find(prop)).to.equal(undefined);
            }
        });
        it('Should return the value at the String key', () => {
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            for (let prop in testObjects) {
                expect(map.find(prop)).to.equal(testObjects[prop]);
            }
        });
    });
    describe('findAll', () => {
        describe('Invalid Parameters', () => {
            it('Should throw an error if sortProperty is a non-String', () => {
                expect(() => { map.findAll(Math.PI); }).to.throw(/sortProperty (must be a String literal|cannot be an empty String)$/);
                expect(() => { map.findAll({}); }).to.throw(/sortProperty (must be a String literal|cannot be an empty String)$/);
                expect(() => { map.findAll([]); }).to.throw(/sortProperty (must be a String literal|cannot be an empty String)$/);
                expect(() => { map.findAll(true); }).to.throw(/sortProperty (must be a String literal|cannot be an empty String)$/);
            });
        });
        describe('Valid Parameters', () => {
            it('Should return an empty array if the store is empty', () => {
                expect(map.findAll()).to.be.a('array');
                expect(map.findAll()).to.be.empty;
            });
            describe('no sortProperty', () => {
                it('Should return an array of store objects sorted by key', () => {
                    const expectedObjects = [];
                    Object.keys(testObjects).sort().forEach(key => {
                        expectedObjects.push({ key, value: testObjects[key] });
                    });
                    for (let prop in testObjects) {
                        map.store[prop] = testObjects[prop];
                    }
                    expect(map.findAll()).to.eql(expectedObjects);
                });
            });
        });
        describe('with sortProperty', () => {
            let map;
            let sortProperty;
            beforeEach(() => {
                sortProperty = 'foo';
                map = new SortableMap();
            });
            it('Should return an empty array if the store is empty', () => {
                expect(map.findAll()).to.eql([]);
            });
            it('Should return an array of store object sorted by sortProperty', () => {
                map.store['baz'] = { [sortProperty]: 3 };
                map.store['foo'] = { [sortProperty]: 1 };
                map.store['bar'] = { [sortProperty]: 2 };
                const expectedList = [
                    { key: 'foo', value: { [sortProperty]: 1 } },
                    { key: 'bar', value: { [sortProperty]: 2 } },
                    { key: 'baz', value: { [sortProperty]: 3 } }
                ];
                expect(map.findAll(sortProperty)).to.eql(expectedList);
            });
        });
    });
    describe('delete', () => {
        it('Should return undefined if key is falsy', () => {
            falsyValues.forEach(falsy => {
                expect(map.delete(falsy)).to.equal(undefined);
            });
        });
        it('Should return undefined if key is not a String', () => {
            nonStrings.forEach(nonString => {
                expect(map.delete(nonString)).to.equal(undefined);
            });
        });
        it('Should return undefined if the key does not exist', () => {
            for (let prop in testObjects) {
                expect(map.delete(prop)).to.equal(undefined);
            }
        });
        it('Should delete the value at the given key', () => {
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            // Under test
            for (let prop in testObjects) {
                map.delete(prop);
                expect(map.store[prop]).to.equal(undefined);
            }
        });
        it('Should return the value at the deleted key', () => {
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            for (let prop in testObjects) {
                expect(map.delete(prop)).to.equal(testObjects[prop]);
            }
        });
    });
    describe('count', () => {
        it('Should return 0 if the store is empty', () => {
            expect(map.count()).to.equal(0);
        });
        it('Should return the number of objects in the store', () => {
            const expectedCount = Object.keys(testObjects).length;
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            expect(map.count()).to.equal(expectedCount);
        });
        it('Should return the correct number of object after deletions', () => {
            const expectedCount = 0;
            // Add here
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            // Delete here
            for (let prop in testObjects) {
                delete map.store[prop];
            }
            expect(map.count()).to.equal(expectedCount);
        });
    });
    describe('forEach', () => {
        it('Should should iterate over the store with an object containing key and value', () => {
            map.store['foo'] = 'bar';
            map.store['baz'] = Math.PI;
            map.forEach((entry, index) => {
                if (index === 0) {
                    expect(entry.key).equal('foo');
                    expect(entry.value).equal('bar');
                } else {
                    expect(entry.key).equal('baz');
                    expect(entry.value).equal(Math.PI);
                }
            });
        });
    });
    describe('values', () => {
        it('Should returns only the values in the store', () => {
            map.store['foo'] = 'bar';
            map.store['baz'] = Math.PI;
            expect(map.values()).to.eql(['bar', Math.PI]);
        });
    });
    describe('clear', () => {
        it('Should empty the store', () => {
            // Under test;
            map.clear();
            expect(Object.keys(map.store).length).to.equal(0);
        });
        it('Should return number of objects in the store', () => {
            for (let prop in testObjects) {
                map.store[prop] = testObjects[prop];
            }
            // Under test;
            map.clear();
            expect(Object.keys(map.store).length).to.equal(0);
        });
    });
});
