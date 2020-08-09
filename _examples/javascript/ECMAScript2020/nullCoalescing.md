---
title: ECMAScript 2020 Null Coalescing Operator
linktitle: Null Coalescing Operator
permalink: "javascript/ECMAScript2020/nullCoalescing/"
lang: "javascript"
version: "ECMAScript2020"
---

A classic problem with older javascript code was that values could often be
`null` or `undefined`, and so you'd need to write code to check for that and
provide a default value if that was the case. The null coalescing operator
(sometimes also called the nullish coalescing operator) is a fancy name for what
is basically just a simple operator that removes the need for manual
`null` or `undefined` checks, and gives us a simple, clean, and compact syntax
instead. This is very handy since these are the sort of checks that happen
*a lot* in Javascript code.

The null coalescing operator is simply just two question marks back-to-back:
`??`. If the left-hand side is not `null` or `undefined` it will be used,
otherwise the right-hand side will be used as the "default"

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
