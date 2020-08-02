---
title: ECMAScript 2015 Maps
linktitle: Maps
permalink: "javascript/ECMAScript2015/maps/"
lang: "javascript"
version: "ECMAScript2015"
---

Maps can be created iteratively by just calling `set()` as required:

```javascript
const emails = new Map()
emails.set('Fred', 'fred@examle.com');
emails.set('Dave', 'dave@examle.com');
```

Alternatively you can pass the data in as an array of 2-item arrays during construction of the `Map` object.

```javascript
const emails = new Map([
  ['Fred', 'fred@examle.com'],
  ['Dave', 'dave@examle.com'],
]);
```

Both approaches generate the same output.

## Iterating over Maps
You can use a simple `for-of` loop to iterate over the keys and values.

```javascript
const emails = new Map([
  ['Fred', 'fred@examle.com'],
  ['Dave', 'dave@examle.com'],
]);

for (let [key, value] of emails) {
  console.log(`The email address for ${key} is ${value}`);
}

// logs "The email address for Fred is fred@examle.com"
// logs "The email address for Dave is dave@examle.com"
```