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
const myValue = 21;
console.log(`The answer is ${myValue * 2}.`); // logs "The answer is 42."
```

## Escaping backticks
```javascript
console.log(`This backtick is escaped: \``); // logs "This backtick is escaped: `"
```

## Newlines/linefeeds

You can spread a template literal across multiple lines without issue - no need to close the backticks or add `\n`.

```javascript
console.log(`line 1
 line 2`);
```

## Tagged Template Literals
Tagged template literals allow you to do manual processing of the template.

This contrived example uses a tagged literal to specify an API version based
on a boolean `useLegacyApi` in the string literal:

```javascript

const useLegacyApi = false;
console.log(apiVersion`http://example.com/api/${useLegacyApi}/getWidget`);
// logs "http://example.com/api/v2/getWidget" when useLegacyApi is false.

function apiVersion(strings, expr) {
  // `strings` is an array containing "http://example.com/api/" and "/getWidget" in this example
  let version = 'v2';
  if (expr === true) {
      version = 'v1';
  }
  return `${strings[0]}${version}${strings[1]}`;
}
```

Note that the tag function needs to manually "reconstruct" the whole string by
assembling the parts from the array of strings.
