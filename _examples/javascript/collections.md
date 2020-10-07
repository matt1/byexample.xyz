---
title: Javascript Collections
linktitle: Collections
permalink: "javascript/collections/"
short-description: "Learn and understand how to use various collections - for example Arrays and Maps - in Javascript."
lang: "javascript"
---

# Arrays

## Sorting an Array of Objects

While arrays have a simple `sort()` method to do an in-place sort on an array of
simple values like numbers or strings, this is not useful for arrays of objects
since there is nothing to easily sort on (e.g. should it use `myObject.value1`
or `myObject.value2` fto sort using?)

In order to sort on a property of the object, we need to provide a customised
comparison function that can be passed to `sort()` in order to do a customised
sort of the object we are storing:

```javascript
const myArray = [
  {
    name: 'Object 1',
    value: 7,
  },
  {
    name: 'Object 2',
    value: 4,
  },
  {
    name: 'Object 3',
    value: 27,
  }
];

// Used to sort instances of `myObject` based on the `value` property.
const myObjectCompareFunction = (objA, objB) => {
  if (objA.value > objB.value) return 1;		// objA goes above objB
  if (objA.value < objB.value) return -1;		// objB goes above objA
  return 0;
};

// Sort the array of my objects using a custom compare function.
myArray.sort(myObjectCompareFunction);

console.log(myArray);	// Sorted: Object 2 (4), Object 1 (7), Object 3 (27)
```

When writing custom compare functions, remember that if we pass in parameters
`a` & `b`:
 * Returning 1 means `a` should be above `b`.
 * Returning 0 means leave `a` & `b` as they are (compared to each other)
 * Returning -1 means `b` should be below `a`


## Getting the Min & Max from an Array of Objects

The `Math.min` and `Math.max` functions are great for getting the minimum or
maximum values from the provided arguments, but the arguments cannot be a simple
array of values.

And even then if you have an array of *objects*, there is no way to specify
which of the properties of the object should be used for the min & max values
(e.g. should it use `myObject.value1` or `myObject.value2` for min & max
values?)

The solution is to use the `Array.map()` function to return the value of a specific
property of your choosing for object, and then combine the output of that with
the  `...` spread syntax so that the values of the array are passed to the
`Math.min` and `Math.max` functions individually:

```javascript
const myArray = [
  {
    name: 'Object 1',
    value: 7,
  },
  {
    name: 'Object 2',
    value: 4,
  },
  {
    name: 'Object 3',
    value: 27,
  }
];

const myArrayValues = myArray.map(obj => obj.value);  // [7, 4, 27]

console.log(Math.min(...myArrayValues));  // logs '4'
console.log(Math.max(...myArrayValues));  // logs '27'
```
