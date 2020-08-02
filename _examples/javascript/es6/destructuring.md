---
title: Javascript ES6 Destructuring
linktitle: Destructuring
permalink: "javascript/es6/destructuring/"
lang: "javascript"
version: "es6"
---

Destructuring is basically a way of assigning variables from an object or array in a simple way.

Consider a simple object with some properties:

```javascript
const myAnimal = {
    species: 'dogs',
    legs: 4,
    colour: 'brown',
};
```

Without destructuring if you wanted to assign the values from your object to new variables, you would need to do this separately, e.g.:

```javascript
// Without destructuring
const colour = myAnimal.colour;
const species = myAnimal.species;
const legs = myAnimal.legs;
```

With destructuring you can do this in a shorter & more concise way:

```javascript
// With destructuring
const {colour, species, legs} = myAnimal;
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

If the names are not matched, then the variables you are destructuring to are `undefined`.

```javascript
const {l, s} = myAnimal;
console.log(`${s} have ${l} legs`) // logs "undefined have undefined legs"
```
