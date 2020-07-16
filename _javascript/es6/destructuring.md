---
title: Javascript ES6 Destructuring
linktitle: Destructuring
permalink: "javascript/es6/destructuring/"


version: "es6"
---

## Intro
Destructuring is basically a way of assigning variables from an object or array in a simple way.

Consider a simple object with some properties:

```javascript
const myAnimal = {
    species: 'dog',
    legs: 4,
    colour: 'brown',
};
```

Without destructuring if you wanted to assign the values from your object to new variables, you would need to do this separately, e.g.:

```javascript
// Without destructuring
const colour = myAnimal.colour;
const species = myAnimal.species;
```

With destructuring you can do this in a shorter & more concise way:

```javascript
// With destructuring
const {colour, species} = myAnimal;
```

## Object Destructuring


## Array Destructuring