---
title: Javascript ES6 Template Literals
linktitle: Template Literals
permalink: "javascript/es6/templateLiterals/"
lang: "javascript"
version: "es6"
---

Removes the need for clunky string concatenation by allowing for strings with embedded expressions. Also referred to as "Template Strings".

Template literals need to be surrounded by backticks.

```javascript
const thing = 'world';
console.log(`Hello ${thing}`); // logs "Hello world"
```

Since you can use any expression, you are not limited to just variables:

```javascript
console.log(`The answer is ${21 * 2}.`); // logs "The answer is 42."
```

## Escaping backticks
```javascript
console.log(`This backtick is escaped: ``); // logs "This backtick is escaped: `"
```

## Newlines/linefeeds

You can spread a template literal across multiple lines without issue - no need to close the backticks or add `\n`.

```javascript
console.log(`line 1
 line 2`);
```

