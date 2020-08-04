---
title: ECMAScript 2015 Classes
linktitle: Classes
permalink: "javascript/ECMAScript2015/classes/"
lang: "javascript"
version: "ECMAScript2015"
---

While only syntactic sugar over the existing prototype-based inheritance, the
support added in ECMAScript 2015 made creating classes in Javascript simple
and intuitive, even if the inheritance model itself was not changed.


```javascript
class MyClass {
  // Empty constructors are not needed.
}

const myClassInstance = new MyClass();
console.log(myClassInstance); // logs "MyClass {}"
```
Note that a `constructor()` function is not required.

## Class Instance Properties

Class instance properties are properties that are present on each instance of
the class - e.g. `this.myValue` in this example.

```javascript
class MyClass {
  constructor(myValue) {
    this.myValue = myValue; // Assigns a class instance property.
  }
}
const myClassInstance = new MyClass("hello");
console.log(myClassInstance); // logs "MyClass {myValue: "hello"}"
```

You do not *need* to declare the class instance properties, but you can if you
want - this could be handy to define default values and you are not initialising in a constructor.

```javascript
class MyClass {
  myValue;  // Do not need to provide a value!
  notSetInConstructor = "banana";

  constructor(myValue) {
    this.myValue = myValue; // Assigns a class instance property.
  }
}
const myClassInstance = new MyClass();
console.log(myClassInstance); // logs "MyClass {myValue: undefined, notSetInConstructor: "banana"}"
```

## Methods & Static Methods

Simply just add a method as you'd expect - no `function` prefixes required:

```javascript
class MyClass {
  myFunction() {
    console.log('Hi');
  }
}
const myClassInstance = new MyClass();
myClassInstance.myFunction(); // logs "Hi"
```

Static methods obviously do not need an instance - just add the `static` keyword:

```javascript
class MyClass {
  static myFunction() {
    console.log('Hi');
  }
}
MyClass.myFunction(); // logs "Hi"
```

## Getters & Setters

You can use normal object `get` and `set` in classes too. This is handy when you
need to do some processing before returning a value (e.g. here working out a
total amount based on price, quantity and discount), or before setting a value
(e.g. here making sure the discount is between 0% and 100%):

```javascript
class MyClass {
  price = 24.99;
  qty = 5;
  priceDiscount = 0.05;

  get totalPrice() {
    return this.price * this.qty * (1 - this.priceDiscount);
  }

  set discount(amount) {
    if (amount < 0) {
      this.priceDiscount = 0;
    } else if (amount > 1) {
      this.priceDiscount = 1;
    } else {
      this.priceDiscount = amount;
    }
  }
}
const myClassInstance = new MyClass();
myClassInstance.discount = 0.10;
myClassInstance.totalPrice; // logs 112.455 (10% discount applied)
```

## Inheritance
When subclassing you can `extend` an existing class - just make sure if you have
a constructor in the extending class that you remember to call `super`.

```javascript
class Mammal {
  constructor(legs) {
    this.legs = legs;
  }

  howManyLegs() {
    console.log(this.legs);
  }
}

class Cat extends Mammal {
  constructor() {
    super(4); // calls parent class's constructor
  }
}

class Human extends Mammal {
  constructor() {
    super(2); // calls parent class's constructor
  }
}

const cat = new Cat();
const human = new Human();

cat.howManyLegs(); // logs 4
human.howManyLegs(); // logs 2

```

