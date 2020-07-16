---
title: Java 8 Default Method Examples
linktitle: Default Method
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8"]
tags: ["default", "default method"]
permalink: "java/8/default/"
---

Default Methods provide a way to provide a default implementation for a method
in an interface.  By providing a default implementation, you can add new methods
to your interface without breaking backwards compatibility for existing code
that already implements your interfaces.

> In the old-days, if you changed an interface then *all* code that implemented
that interface would need to be updated to implement the new method.
>
In a project you were working on this might have required changing code all over
your project which could have been be a real pain if your project was large.  If
the interface that changed was one from a commonly-used library then that would 
have been a really huge impact on all of the projects that used that particular
library!  What a nightmare!

Lets take a look at a simple example of how default methods can be used:

```java
package xyz.byexample.java8;

interface Person {
    String getName();
    default void greet() {
       System.out.println("Hello");
    }
}

class John implements Person {
    public String getName() {
        return "John";
    }
}

class Mary implements Person {
    public String getName() {
        return "Mary";
    }
    public void greet() {
        System.out.println("Hi");
    }
}

public class Default {
      public static void main(String[] args) {
          John john = new John();
          Mary mary = new Mary();
          System.out.print(john.getName() + " says: ");
          john.greet();
          System.out.print(mary.getName() + " says: ");
          mary.greet();
    }
}

```
Output
```
John says: Hello
Mary says: Hi
```
Here the `John` class is using the default implementation of `greet` taken from
the interface `Person`, but the `Mary` class is overriding that with its own
implementation.  Just like always, both `John` and `Mary` have to implement the
`getName` method since no default was provided in the interface.

## Multiple Inheritance
Since classes can implement multiple interfaces, default methods allows Java to
get some basic multiple inheritance capabilities.

```java
package xyz.byexample.java8;

interface One {
    default void sayHello() {
        System.out.println("Hello");
    }
}

interface Two {
    default void sayWorld() {
        System.out.println("World");
    }
}
class MultipleInterfaces implements One, Two {
    // Nothing implemented
}

public class Default {
    public static void main(String[] args) {
        MultipleInterfaces mi = new MultipleInterfaces();
        mi.sayHello();
        mi.sayWorld();
    }
}
```
Output
```
Hello
World
```

If there is a clash where two interfaces declare the same method signature, the
compiler will throw an error that the class inherits unrelated defaults from the
interfaces.  To solve this, you need to implement the method in your class and
either call the code directly or do something entirely different.

```java
package xyz.byexample.java8;

interface One {
    default void print() {
        System.out.println("Hello");
    }
}

interface Two {
    default void print() {
        System.out.println("World");
    }
}

class MultipleInterfaces implements One, Two {
    @Override
    public void print() {
        One.super.print();
        Two.super.print();
    }
}

public class Default {
    public static void main(String[] args) {
        MultipleInterfaces mi = new MultipleInterfaces();
        mi.print();
    }
}
```
Output
```
Hello
World
```

Here we override the `print` method in the class that is implementing more
than one interface and manually call the `print` method in each interface - we
could have of course done something entirely different here if we wanted.

## Interfaces vs abstract classes

Both abstract classes and interfaces both offer a mix of methods declared with
and without an implementation without the ability to be instantiated on their own,
so which should you use?

It really comes down to what you're trying to do:

 - **Abstract Classes** can declare public, protected and private methods and fields.
 - **Interfaces** can only declare public default methods, and public or static fields.
 - Classes can only inherit from one class, but can implement many interfaces.

If you expect that your code will be needed by a wide range of unrelated code
then use an interface.  If you expect that your code will be used by a limited
set of closely-related code and/or need private or protected access modifiers
then use an abstract class.