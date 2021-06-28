---
title: Javascript Immutability
linktitle: Immutability
permalink: "javascript/immutability/"
short-description: "Learn about why immutability is useful in Javascript, and how to make objects immutable."
lang: "javascript"
---

Making objects immutable in Javascript can be useful for a few basic reasons:
 * **All modifications are explicit** For example if you are passing an object to various functions, can you be *sure* that one of the functions did not change something within your object? An immutable object *cannot be modified* so you cabn be entirely sure that it was not modified.
 * **Change Detection** and/or **Equality Checks** If you need to check to see if an immutable object has changed, then it is just a simple matter of doing a strict equality check (i.e. `===`), but for a mutable object you need to check every property. This is what is used by Angular, React, Redux and others to check for changes.
 * **Easier testing** If all modifications to an object happen via an assignment, or via a [Pure Functions](#pure-function) then your code is usually significantly easier to test.

So in summary immutability itself does not offer any intrinsic benefits on it own - it is just how you structure your code to use immutability to avoid common sources of bugs, confusion, or difficult to debug weirdness (... or you simply use a framework that relies on immutability).

# Making Objects Immutable

You can make any old Javascript object immutable by using `Object.freeze`:

```javascript

const myMutableObject = {
  myProperty: 'foo',
};

// Make the object immutable
const myImmutableObject = Object.freeze(myMutableObject);

// Fails with a `TypeError` when in `strict mode`, otherwise silently fails.
myImmutableObject.myProperty = 'qux';
```

> Javascript's primitive types - `bigint`, `boolean`, `null`, `number`, `string`, `symbol`, and `undefined` - are already immutable and require no special treatment. Besure you are using the actual primitive, and not the wrapper objects (e.g. `string` is the primitive, and `String` is the wrapper object).

Note that there is a similar function `Object.seal` which is often confused but is slightly different - `Object.seal` does not make the Object's existing properties immutable (i.e. you can change their values) - it only prevents new properties from being added to the object. Unless there is a good reason to do otherwise, it is best practice to always use `Object.freeze`.

# Pure Functions

You can use Javascript's `spread` operator to trivially create Pure Functions - i.e. functions which do not modify the input but return a new copy with the modified values.

```javascript
const myObj1 = {
  propertyOne: 10,
  propertyTwo: 'foo'
};

function doublePropertyOne(obj) {
  return {
    ...obj,
    propertyOne: obj.propertyOne * 2,
  };
}

const myObj2 = doublePropertyOne(myObj1);

console.log(myObj1 === myObj2) // false - myObj1 is unchanged
console.log(myObj2);
/*
{
  propertyOne: 20,
  propertyTwo: "foo"
}
*/
```
A pure function like `doublePropertyOne` does not modify the values in `myObj1`, instead it returns a *new* object with the modified values. Using pure functions can help to prevent unexpected changes to object state, and make things significantly easier to test.



