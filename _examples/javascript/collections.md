---
title: Javascript Collections
linktitle: Collections
permalink: "javascript/collections/"
short-description: "Learn and understand how to use various collections - for example Arrays and Maps - in Javascript."
lang: "javascript"
---

# Arrays

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
