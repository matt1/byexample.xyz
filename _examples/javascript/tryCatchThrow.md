---
title: Javascript Try-Catch and Throw
linktitle: Try-Catch and Throw
permalink: "javascript/tryCatchThrow/"
short-description: "Learn and understand how to use try-catch and throw when handling errors in Javascript."
lang: "javascript"
---

# Catching Errors

A `try catch` block allows you to gracefully handle errors or exceptions in your
code.

```javascript
try {
  // Do something that might trigger an error
} catch (error) {
  // Only runs when there is an error/exception
} finally {
  // Code here always runs. Doesn't matter if there was an error or not.
}
```

# Throwing Errors
You can simply just throw a new `Error` object:

```javascript
function doSomething() {
  // ... stuff
  throw new Error('something terrible happened');
}
try {
  doSomething();
} catch (e) {
  console.log(e); // Logs the error
}
```

You don't have to `throw` an `Error` though - you could return a simple string,
a number, an object ... it can be any valid *expression* so that gives a lot of
flexibility!

```javascript
// Throw a string...
throw 'Error';

// Throw a number...
throw 12345;

// Throw an object...
throw {myProperty: 'banana'};
```

We could if we wanted to even `throw` a function that could then be called by
the `catch` block:

```javascript
function doSomething() {
  // ... stuff
  throw () => {
    // do something complex here, e.g. API call, database update.
  }
}
try {
  doSomething();
} catch (e) {  
  e();  // Execute the function that was thrown.
}
```

# Errors vs Exceptions

People often use `'Error'` and 'Exception' interchangeably - e.g. "throw an
error" or "throw an exception".

These are basically the same thing, except of course `Error` is an actual type
in javascript, but there is no such type for an exception. In the ECMAScript
docs, they actually use terms like *"Throw a TypeError exception"*, i.e. that
the exception is just the thing you throw, be that an error or any other
expression.
