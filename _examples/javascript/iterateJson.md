---
title: Javascript Iterate Over JSON
linktitle: Iterate Over JSON
permalink: "javascript/iterateOverJson/"
lang: "javascript"
---

JSON objects are just the same as any other object and can be iterated over
easily using a `for-in` loop.

```javascript
const jsonString = `{
  "lastUpdate": 1596749224800,
  "users": [
    {
      "id": 1,
      "email": "fred@example.com"
    },
    {
      "id": 2,
      "email": "dave@example.com"
    }
  ]
}`;

// Convert the JSON string into a normal object as usual.
const jsonObject = JSON.parse(jsonString);

iterateObject(jsonObject);

function iterateObject(parent) {
  for (const child in parent) {
    if (typeof parent[child] === "object") {
      // N.B. this is a recursive call
      iterateObject(parent[child]);
    } else {
      // Do whatever you want to do with each item.
      console.log(parent[child]);
    }
  }
}

// logs  1596749224800
//       1
//       "fred@example.com"
//       2
//       "dave@example.com"
```

Note that `iterateObject` calls itself recursively in order to get down to all
levels of nesting in the object.
