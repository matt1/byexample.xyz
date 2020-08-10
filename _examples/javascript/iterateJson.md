---
title: Javascript Iterate Over JSON
linktitle: Iterate Over JSON
permalink: "javascript/iterateOverJson/"
short-description: "Learn and understand how to iterate over a JSON object - even with nested fields - in Javascript."
lang: "javascript"
---

JSON objects are just the same as any other javascript object and can be iterated
over easily using a `for-in` loop.

In this example we have just created a simple hard-coded string for the JSON
(using the awesome
[string template literal](/javascript/ECMAScript2015/templateLiterals/) syntax
introduced in ECMAScript 2015), but this JSON could alternatively come from an
API call, a database, or some other source.

```javascript
const jsonString = `{
  "lastUpdate": 1596749224800,
  "status": {
    "activeCount": 5123,
    "permissions": {
      "read": true,
      "write": false
    }
  },
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

const jsonObject = JSON.parse(jsonString);

iterateObject(jsonObject);

function iterateObject(parent) {
  for (const child in parent) {
    if (typeof parent[child] === "object") {
      iterateObject(parent[child]);
    } else {
      console.log(`${child}: ${parent[child]}`);
    }
  }
}

// Logs:
// "lastUpdate: 1596749224800"
// "activeCount: 5123"
// "read: true"
// "write: false"
// "id: 1"
// "email: fred@example.com"
// "id: 2"
// "email: dave@example.com"

```

Note that `iterateObject` calls itself recursively in order to get down to all
levels of nesting in the object.
