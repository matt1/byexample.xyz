---
title: ECMAScript 2015 Spread Operator
linktitle: Spread
permalink: "javascript/ECMAScript2015/spread/"
short-description: "See examples of how to use Javascript's spread operator (also known as spread syntax)"
lang: "javascript"
version: "ECMAScript2015"
---

The spread operator `...` - sometimes called spread syntax - allows us to easily
expand an array (or any `iterable`) or object into their component
elements/properties.

```javascript
const myArray = [1, 2, 3, 4, 5];
const myObject = {
  foo: 'bar',
  example: true,
};

console.log([...myArray]);  // [1, 2, 3, 4, 5]
console.log({...myObject}); // {foo: 'bar', example: true}
```

# Adding elements to Arrays

If you need to add elements to an array, you can easily use the spread operator
to either prepend or append the elements to the existing array.

```javascript
const myArray = [1, 2, 3];

// Prepend elements to an array
console.log([-1, 0, ...myArray]); // [-1, 0, 1, 2, 3]

// Append elements to an array
console.log([...myArray, 4, 5]);  // [1, 2, 3, 4, 5]
```

# Concatenating Arrays

Just like with adding elements to an array with the spread operator, you can
also use it to concatenate arrays.

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

console.log([...array1, ...array2]) // [1, 2, 3, 4, 5, 6]
console.log([...array2, ...array1]) // [4, 5, 6, 1, 2, 3]
```

Note that if you have duplicate elements in your array, these *will not be
de-duplicated* - they'll be added in just like any other elements.

```javascript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];

console.log([...array1, ...array2]) // [1, 2, 3, 3, 4, 5]
```

A simple way to de-duplicate your arrays you are concating is to create a new
`Set` object using our concatenated array as a parameter, and we can then use
the spread operator on the `Set` (since it too is an `iterable`) to generate
a new array.

```javascript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];

// Create a new Set from our concatenated array. Sets are like arrays, but
// they by defiition do not contain duplicates.
const mySet = new Set([...array1, ...array2]);

// Now use the spread operator on the set to generate a new array from the
// content of the Set (which does not contain duplicates)
console.log([...mySet]) // [1, 2, 3, 4, 5]
```

# Copying objects

You can trivially create a copy of an object by using the spread operator to
copy all of its properties into a new object.

```javascript
const myObject = {
  foo: 'bar',
  example: true,
};

const myNewObject = {...myObject};

console.log(myNewObject); // {foo: 'bar', example: true}
```

This approach is particuarly useful when you are working with
[Immutibility](/javascript/immutability/).

# Overriding properties in objects
If you are copying an object using the spread operator but want to change the
value of a property (known as 'blatting' or 'overriding' an objects property),
then you can simply specify the new property value when creating the new object.

```javascript
const myObject = {
  foo: 'bar',
  example: true,
};

const myNewObject1 = {
  ...myObject,
  foo: 'qux',
};

console.log(myNewObject1); // {foo: 'qux', example: true}
```

Be careful to use the spread operator *before* setting a new property value
though! If you don't do this then the new value will be lost as the spread
operator will overwrite you new value.

```javascript
const myObject = {
  foo: 'bar',
  example: true,
};

// You must specify the new property values *after* using the spread operator.
// Here we set a new value for `foo` before we use the spread operator.
const myNewObject2 = {
  foo: 'qux',
  ...myObject,  // this overwrites foo:'qux' with the foo from ...myObject
};
// New value for foo was overwritten by the spread operator.
console.log(myNewObject2); // {foo: 'bar', example: true}
```
