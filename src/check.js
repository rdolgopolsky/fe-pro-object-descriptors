import {
  assignLockedValues,
  freezeAllInObject,
  getKeysByDescriptor,
  isObjectAnyFrozen,
} from './index.js';

const object = {};

Object.defineProperties(object, {
  firstName: {
    value: 'Test',
    writable: false,
    enumerable: false,
    configurable: false,
  },
  lastName: {
    value: 'Test',
    writable: true,
    enumerable: false,
    configurable: false,
  },
  age: {
    value: 80,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  checker: {
    value: 80,
    writable: false,
    enumerable: false,
    configurable: true,
  },
});

console.log(getKeysByDescriptor(object, 'writable')); // ['lastName']
console.log(getKeysByDescriptor(object, 'enumerable')); // ['age']
console.log(getKeysByDescriptor(object, 'configurable')); // ['checker']

const ob = {};

Object.freeze(ob);

console.log(isObjectAnyFrozen(ob)); // true

console.log(isObjectAnyFrozen({})); // false

const obj = {
  // name: "valera"
};

const res = assignLockedValues(obj, 'name');

console.log(res !== obj); // true
console.log(res.name); // null

const objWithProp = {
  name: 'test',
};

const resNext = assignLockedValues(obj, 'name');

console.log(resNext !== objWithProp); // true
console.log(objWithProp.name); // test

const freezeCheck = { name: 'test' };
const freezeRes = freezeAllInObject(freezeCheck);

freezeCheck.test = 'test';
delete freezeCheck.name;

console.log(freezeRes); // { name: 'test' }