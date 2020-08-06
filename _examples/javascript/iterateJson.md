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
