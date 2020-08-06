---
title: Javascript DOMContentLoaded
linktitle: DOMContentLoaded
permalink: "javascript/DOMContentLoaded/"
lang: "javascript"
---

`DOMContentLoaded` waits for the entire document to be loaded, but does not
include stylesheets, images, or iframes (you can use the `load` event if you
care about that).

Generally `DOMContentLoaded` is most useful when you just need to wait for the
Document Object Model (i.e. th structure of the document itself, rather than its
content) to be ready.

## Running a function on `DOMContentLoaded`

```javascript
addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM Loaded and ready to go.');
});
```
