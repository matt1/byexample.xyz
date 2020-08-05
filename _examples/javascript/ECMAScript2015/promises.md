---
title: ECMAScript 2015 Promises
linktitle: Promises
permalink: "javascript/ECMAScript2015/promises/"
lang: "javascript"
version: "ECMAScript2015"
---

Promises provide a way to escape nested callbacks and provide a neater way to write and reason about asynchronous code.

The syntax was streamlined even further with [`async` and `await`](/javascript/ECMAScript2017/asyncAwait/).

## Creating & Writing a `Promise`

New `Promise` instances require two callbacks - one for resolution, and
one for rejection.

```javascript
const myPromise = new Promise((resolveCallback, rejectCallback) => {
  // Doesn't do anything, so returns immediately
   resolveCallback('Promise resolved ok.');
})

myPromise.then(resolved => {
  console.log(resolved);
});
```

Normally the body of the `Promise` (aka the `executor` of the `Promise`) will do something that takes a long time - e.g. an API call.

## Using Promises

A `Promise` is a `thenable` - i.e. you can use the `then` syntax - i.e. you call `then()` with two functions as arguments: the first one handles the success condition, and the second optional one handles the error condition.

```javascript
const myPromise = new Promise((resolveCallback, rejectCallback) => {
   resolveCallback('Promise resolved ok.');
})

myPromise.then(
  // Promise resolved ok
  success => console.log(success),
  // Promise was rejected
  error => console.log(error)
);
```

Note that the error handler function is optional. If you *only care about errors*, you can pass `null` for the success handler, or you can use the much clearler `catch()` approach - both of these approaches are identical

Using `catch(fn)`:
```javascript
const myPromise = new Promise((resolveCallback, rejectCallback) => {
   rejectCallback('Promise was rejected');
})

myPromise.catch(
  // Promise was rejected
  error => console.log(error)
);
```

Using `then(null, fn)`:

```javascript
const myPromise = new Promise((resolveCallback, rejectCallback) => {
   rejectCallback('Promise was rejected');
})

myPromise.then(
  null,
  // Promise was rejected
  error => console.log(error)
);
```

If you need to do any clean-up, you can use the `finally()` function to do that:

```javascript
const myPromise = new Promise((resolveCallback, rejectCallback) => {
   resolveCallback('Promise resolved ok.');
})

myPromise.then(
  // Promise resolved ok
  success => console.log(success),
  // Promise was rejected
  error => console.log(error)
).finally (
  () => console.log('All done')
);
```

Note that `finally` still expects a callback function, but this one has no arguments.

## Chaining

If a `Promise` returns another `Promise`, then you can chain them together **sequentially** one after the other with just additional `then()` handlers.

> If you need parallel and not sequential execution, see the ['Calling `Promises` in parallel`](#calling-promises-in-parallel) section in this page.

For example imagine a function that loads files from the internet, and you want to load several images

```javascript
function loadResource(url) {
   return new Promise((resolveCallback, rejectCallback) => {
     let resource = '...';
     // ... do something to retrieve a resource over a slow network connection
     // then resolve the promise when it loaded ok
     resolveCallback(resource);
   });
}

loadResource('http://example.com/image1.png').then(success => {
  // Return a new promise to load the second
  return loadResource('http://example.com/image2.png')
}).then(success => {
  // Return a new promise to load the third
  return loadResource('http://example.com/image3.png')
}).then(success => {
  console.log('All images loaded ok');
}).catch(error => {
  console.error('Error loading our files!');
});
```

Note that this is synchronous - i.e. you load `image1.png` then `image2.png` then `image3.png` one after the other.

## Calling `Promises` in parallel

To avoid the pitfals of sequential chaining of promises, you can easily just call all of your promises in parallell and wait for them to complete using `Promise.all`:

```javascript
function loadResource(url) {
   return new Promise((resolveCallback, rejectCallback) => {
     let resource = '...';
     // ... do something to retrieve a resource over a slow network connection
     // then resolve the promise when it loaded ok
     resolveCallback(resource);
   });
}

Promise.all([
  loadResource('http://example.com/image1.png'),
  loadResource('http://example.com/image2.png'),
  loadResource('http://example.com/image3.png'),
]).then(success => {
  console.log('All images loaded ok');
}).catch(error => {
  console.error('Error loading our files!');
});
```

This executes all of the promises in parallel, and returns its own `Promise` that will resolve when all child `Promises` resolve - however it is "all or nothing" in that if a single `Promise` rejects, then the outer `Promise` also *immediately* rejects too and the other child `Promises` are simply forgotten about and their responses ignored.  I.e. we need *all* of the `Promises` to succeed.

There are some other nifty `Promise` APIs that can help with parallel execution:

* `Promise.allSettled([...])` - similar to `Promise.all`, but instead of requiring every `Promise` to be successful, this just waits for all `Promises` to settle (regardless of success or failure) and returns an array of objects of either:
  * `{status:"fulfilled", value:result}` for successes.
  * `{status:"rejected", reason:error}` for failures.
* `Promise.race([...])` - deliberately creates a race condition between two or more `Promises` and resolves with the result or error of the first (and only first) `Promise` to settle.