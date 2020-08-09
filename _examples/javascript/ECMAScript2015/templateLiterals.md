---
title: ECMAScript 2015 Template Literals
linktitle: Template Literals
permalink: "javascript/ECMAScript2015/templateLiterals/"
lang: "javascript"
version: "ECMAScript2015"
---

Before the introduction of template literals to Javscript, if we wanted to
generate a string in Javascript we had to rely on clunky string concatenation
code where we were joining multiple string literalsand variables together with
`+` operators, for example `const greeting = 'Hello ' + name + '!';`. This got
even worse when we were doing multiline strings as we needed to add a lot of
`\n` concatenations into the code to break things up. This made our code
difficult to read and quite verbose in places.

Luckily in ECMAScript 2015 the concept of template literals (sometimes also
referred to as template strings) was introduced - this is string interpolation
for Javascript and means that we can include variables into our string literals
in a much cleaner and more easily read way, making our code clean and easier
to maintain.

Unlike normal string literals in Javascript that are surrounded by single or
double quotes (i.e. `'` or `"`) template literals can be identified by the fact
that they are surrounded by backticks (i.e. `\``). If you try to use the
string literal syntax (`${...}`) inside a normal string literal, the
substitution of the variable's value will not happen.

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

A great example of this can be seen on the
[Iterating over JSON](/javascript/iterateOverJson/) example where we've defined
a hard-coded piece of sample JSON that is spread out across many lines, but does
not have any `\n` characters or awkward multi-line string concatenations.

## Tagged Template Literals
Tagged template literals allow you to do manual processing of the template.

For example you can "tag" the literal with a function that converts HTTP calls to HTTPS:

```javascript
console.log(makeHttps`http://example.com/api/v2/getWidget`);
// logs "https://example.com/api/v2/getWidget"

function makeHttps(templateStringParts) {
  return templateStringParts[0].replace('http://', 'https://')
}
```

You can also process the expression values too. This contrived example uses a
tagged literal to specify an API version based on a boolean variable `useLegacyApi` in
the string literal:

```javascript

const useLegacyApi = false;
console.log(apiVersion`http://example.com/api/${useLegacyApi}/getWidget`);
// logs "http://example.com/api/v2/getWidget" when useLegacyApi is false.

function apiVersion(templateStringParts, expr) {
  // `templateStringParts` is an array containing "http://example.com/api/" and "/getWidget" in this example
  let version = 'v2';
  if (expr === true) {
      version = 'v1';
  }
  return `${templateStringParts[0]}${version}${templateStringParts[1]}`;
}
```

Note that the tag function needs to manually "reconstruct" the whole string by
assembling the parts from the array of strings.
