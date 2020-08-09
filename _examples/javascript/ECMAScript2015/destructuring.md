---
title: ECMAScript 2015 Destructuring
linktitle: Destructuring
permalink: "javascript/ECMAScript2015/destructuring/"
lang: "javascript"
version: "ECMAScript2015"
---

Destructuring is basically a way of assigning local variables from the contents 
of an object or array in a simple way.

You may have already used destructuring without even realising if you have ever
used an `import` statement when using
[Javascript's module system](/javascript/ECMAScript2015/modules/), for example
`import {someName} from './myModule.js` is actually using destructuring to get
the value of `someName` from the module.

Lets take a look at the most basic examples - lets consider a simple object with
some properties:

```javascript
const myAnimal = {
    species: 'dogs',
    legs: 4,
    colour: 'brown',
};
```

Without destructuring if you wanted to assign the values from your object to
new variables, you would need to do this separately, e.g.:

```javascript
// Without destructuring
const colour = myAnimal.colour;
const species = myAnimal.species;
const legs = myAnimal.legs;
```

With destructuring you can do this in a shorter & more concise way by simply
naming the properties you'd like to extract inside of a pair of `{...}`:

```javascript
// With destructuring
const {colour, species, legs} = myAnimal;
```

You don't have to take everything either - you can pick only what you want.

```javascript
// With destructuring
const {legs} = myAnimal;
```

## Order doesn't matter, but names do

The properties are matched on names, not order.

```javascript
let {legs, species} = myAnimal;
console.log(`${species} have ${legs} legs`) // logs "dogs have 4 legs"
```

```javascript
const {species, legs} = myAnimal;
console.log(`${species} have ${legs} legs`) // logs "dogs have 4 legs"
```

If the names are not matched, then the variables you are destructuring to are
`undefined`.

```javascript
const {l, s} = myAnimal;
console.log(`${s} have ${l} legs`) // logs "undefined have undefined legs"
```

## Renaming variables during destructuring

As we have seen, the name of the properties is the important part for
destructuring as it allows Javascript to identify which properties you want to
use.

If you need to change the name of these properties though when doing the
destructuring by using providing instructions in the format of
`<original name>:<new name>`, e.g. here we are asking for the `species` and
`legs` properties from the `myAnimal` object to be unpacked into local
variables called `speciesName` and `numLegs` respectively:

```javascript
// Add your code here
const myAnimal = {
    species: 'dogs',
    legs: 4,
    colour: 'brown',
};

const {species:speciesName, legs:numLegs} = myAnimal;
console.log(`${speciesName} have ${numLegs} legs`) // logs "dogs have 4 legs"
```

## Function Arguments & Destructuring

You can use destructuring when defining a function's arguments. This has the
benefit that you can write a function that accepts any object, but will unpack
only the properties it needs from that object.

```javascript
const myAnimal = {
    species: 'dogs',
    legs: 4,
    colour: 'brown',
};

function describeAnimal({species, legs}) {
  console.log(`${species} have ${legs} legs`);
}

describeAnimal(myAnimal);   // logs "dogs have 4 legs"
```

Here the `describeAnimal(...)` function only takes the `species` and `legs`
properties from the argument, and totally ignores the `colour` property.

If you have multiple objects, you can have multiple destructuring arguments:

```javascript
const myAnimal = {
    species: 'dogs',
    legs: 4,
    colour: 'brown',
};

const myPetShop = {
  name: 'Best-4-Pets',
  city: 'London',
};

function describeAnimal({species}, {name:petShopName}) {
  console.log(`I got my ${species} from ${petShopName}`);
}

describeAnimal(myAnimal, myPetShop); // logs "I got my dog from Best-4-pets"
```

Note there that we have also renamed the `name` property from the `myPetShop`
object to `petShopName`. This helps make the function code clearer and easier
to understand (there is no confusion about the name of the animal vs the
pet shop.

### `arguments` an function argument destructuring

You may been wondering what the `arguments` object looks like when using
destructuring and function arguments.

The simple answer is that `arguments` contains the object(s) that were provided
in the function call, and not the destructured properties.
