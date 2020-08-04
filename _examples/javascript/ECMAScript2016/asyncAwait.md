---
title: ECMAScript 2017 Async & Await
linktitle: Async & Await
permalink: "javascript/ECMAScript2017/asyncAwait/"
lang: "javascript"
version: "ECMAScript2017"
---

To understand `async` and `await` you need to first be familiar with
Javascript's `promise` concept.

The summary is that an `async` function can contain `await` expression, and
`await` expressions simply wait for a promise to resolve. This means that you
do not need to deal with all the the `Promise` boilerplate, leading to cleaner
code.

```javascript
function doSomethingWithAPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Promise is done.');
    }, 1000);
  });
}

async function myAsyncFunction() {
  const valueFromPromise = await doSomethingWithAPromise();
  console.log(valueFromPromise);
}

console.log('Before async function.');
myAsyncFunction(); // will not log anything until the promise resolves.
console.log('After async function.');

// logs "Before async function."
//      "After async function."
//      "Promise is done."
```

Here the `async` function yields control (while it is waiting for the promise to
resolve - in this case it is just waiting for a `setTimeout` but it could be an
API call etc), and will resume when the promise resolves - this is why the log
statements are not in a sequential order (because the `"done"` statement is only
executed after the promise resolves).

## Breaking the `async` chain

An `async` function always returns a `promise` - either explicitly or implicitly.

```javascript
async function myAsyncFunction() {
  return 'banana';
}
console.log(myAsyncFunction()); // Does *not* log "banana" - logs a promise object.
```

Since you are returning a `promise` from your `async` function, you will also
need to do something to handle waiting for your original `async` function's
`promise` to resolve too!  You can't use `await` unless you are in an `async`
function, and sooner or later you'll need to break out of that.

The solution here is just to go back to the old annoying `Promise` syntax of `.then(result => {...})` to
perform some action after your `await` function returns.

```javascript
function doSomethingWithAPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Promise is done.');
    }, 1000);
  });
}

async function myAsyncFunction() {
  const valueFromPromise = await doSomethingWithAPromise();
  console.log(valueFromPromise);
}

function mySyncFunction() {
  myAsyncFunction().then(() => {
    console.log('Async function has returned.');
  })
}

console.log('Before async function.');
mySyncFunction();
console.log('After async function.');

// logs "Before async function."
//      "After async function."
//      "Promise is done."
//      "Async function has returned."
```

## Blocking/Waiting for an async function to complete

As far as I am aware, there is no built-in way to "break out" of the async chain and block
execution of synchronous code while waiting for async code to complete.
