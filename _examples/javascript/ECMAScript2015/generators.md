---
title: ECMAScript 2015 Generators
linktitle: Generators
permalink: "javascript/ECMAScript2015/generators/"
short-description: "See examples of how to use Javascript's generator functions and the yield keyword."
lang: "javascript"
version: "ECMAScript2015"
---

Generators are functions that can "yeild" (i.e. return) multiple values each
time they are called. They run until they reach a `yield` statement, and will
carry on from there when they are next iterated.

Note that generator functions have a `*` after `function`.

```javascript
function* myABCsGeneratorFunction() {
  yield 'A';
  yield 'B';
  yield 'C';
}

const myABCsGenerator = myABCsGeneratorFunction();

// logs "{value: 'A', done: false}"
console.log(myABCsGenerator.next());

// logs "{value: 'B', done: false}"
console.log(myABCsGenerator.next());

// logs "{value: 'C', done: false}"
console.log(myABCsGenerator.next());

// logs "{value: undefined, done: true}"
console.log(myABCsGenerator.next());
```
Technically speaking `myABCsGeneratorFunction` - the "Generator Function" - returns the "Generator" itself when called.

## Looping until generator is done

```javascript
function* myABCsGeneratorFunction() {
  yield 'A';
  yield 'B';
  yield 'C';
}

const myABCsGenerator = myABCsGeneratorFunction();

let value = myABCsGenerator.next();
while (!value.done) {
  console.log(value.value);
  value = myABCsGenerator.next();
}
```

## Stopping a generator early

You can make a generator "stop" early by calling `return()`. Further calls to the generator will return an undefined `value` and `done` will be `true`.

```javascript
function* myABCsGeneratorFunction() {
  yield 'A';
  yield 'B';
  yield 'C';
}

const myABCsGenerator = myABCsGeneratorFunction();

// logs "{value: 'A', done: false}"
console.log(myABCsGenerator.next());

// logs "{value: 'Z', done: true}"
console.log(myABCsGenerator.return('Z'));

// logs "{value: undefined done: true}"
console.log(myABCsGenerator.next());
```
