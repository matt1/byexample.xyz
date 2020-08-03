---
title: ECMAScript 2020 Null Coalescing Operator
linktitle: Null Coalescing Operator
permalink: "javascript/ECMAScript2020/nullCoalescing/"
lang: "javascript"
version: "ECMAScript2020"
---

Also known a "nullish coalescing operator".

Returns the right-hand if the left-hand is `null` or `undefined`. This can be
used to neatly provide a default value for variables if they are null or undefined.

```javascript
const myValOne = 7 ?? "a default for myValOne";
const myValTwo = null ?? "a default for myValTwo";
const myValThree = undefined ?? "a default for myValThree";

console.log(myValOne);  // logs 7
console.log(myValTwo);  // logs "a default for myValTwo"
console.log(myValThree); // logs "a default for myValThree"
```

Note that this only works for "nullish" values - falsy values do not return the
default.

```javascript
const myValOne = false ?? "a default for myValOne";
const myValTwo = '' ?? "a default for myValTwo";
const myValThree = NaN ?? "a default for myValThree";

console.log(myValOne);  // logs false
console.log(myValTwo);  // logs ''
console.log(myValThree);  // logs NaN
```
