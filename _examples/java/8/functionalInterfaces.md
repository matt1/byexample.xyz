---
title: Java 8 Functional Interfaces Examples
linktitle: Functional Interfaces
permalink: "java/8/functionalInterface/"
lang: "java"
version: "8"
---

Functional Interfaces in Java 8 are the key to unlocking the power of the new
lambda expressions and method references.

Whenever we use a lambda expression (e.g. when creating an anonymous function
when we're working with streams), our expression has to satisfy one of these
*functional interfaces* to be accepted - to think of it another way, our
function has to match the "pattern" or "shape" that Java is expecting.

Often in the official Java API docs for stream processing you'll see a lot of
references to `Consumer`, `Predicate`, `BiConsumer` etc - these are simply just
ways of saying "You need a create an anonymous function that satisfies this 
functional interface".

There are *a lot* of functional interfaces in Java 8, but this page covers
examples for the most common interfaces you'll encounter when working with
lambda expressions.

## Consumer
A `Consumer` takes a *single* parameter by calling the `accept`method, and does
not return a result (i.e. it "consumes" the value).

It is the simplest example so if you're struggling to understand functional interfaces then
this is a good place to start.

A classic example of a `Consumer` - and one that we use in a lot of our examples
on this site - is a simple lambda expression that takes some value and prints it
out to the console

```java
package xyz.byexample.java8;

import java.util.function.Consumer;

public class functionalInterfaces {
    public static void main(String[] args) {
        Consumer c = (Object obj) -> {
            System.out.println(obj);
        };
        c.accept("Hello World");
    }
}
```
Output
```
Hello World
```
So we're using a lambda expression (i.e. the  `... -> {...}` part) to create a `Consumer` called `c` - this `Consumer`
simply takes an Object and prints it out to the console when it is called via
the `Consumer`'s `accept()`.

We could simplify this code a bit more to make it even more streamlined:

```java
Consumer c = obj -> System.out.println(obj);
c.accept("Hello World");
```

So to reiterate we've created a lambda expression `obj -> System.out.println(obj)` that
satisfies the `Consumer` functional interface.

What if you need to use more than one parameter in your `Consumer`?  Well then you
cam try a `BiConsumer`.

## BiConsumer

A `BiConsumer` takes two parameters and does not return a result - it is basically
identical to a `Consumer` in every sense except it takes more than one parameter!

Need to use more than two parameters?  There is no `TriConsumer` or `QuadConsumer`
 in the standard library so we'll need to create our own <a href="#custom-functional-interfaces">custom `FunctionalInterface`</a>
 to handle those.

## Function

A `Function` takes a single parameter and returns a result by calling the
`apply` method.

Here we're declaring our `Function` with type parameters so that we can let
the compiler know that we're expecting to deal with `Integer` - had we not
done this the compiler would have assumed we were working with `Object`
which would have caused an error since you cant apply the `*` operator to
`Object`.

```java
Function<Integer, Integer> double = i -> i * 2;
System.out.println(double.apply(5));
```
Output
```
10
```

Note also that although a `Function` accepts a single parameter, we have provided
two types (`Function<Integer, Integer> double = ...`).  This is because we are
specifying the type for both the single input parameter, as well as the type of
the output of the function.


If we have a different function that does something else, then we'd need to
change out type parameters to reflect that.  E.g. if we want to accept an
`Integer` and return a `String`:

```java
Function<Integer, String> toString = i -> i.toString();
System.out.println(toString.apply(5));
```
Output
```
5
```

## BiFunction

A `BiFunction` takes two parameters and returns a result.  Exactly the same
as `Function`, except it takes two parameters.

```java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(1, 2));
```
Output
```
3
```

## Predicate

A `Predicate` takes a single parameter and returns a true or false result by
calling the `test` method.

```java
Predicate<Integer> isEven = i -> i % 2 == 0;
System.out.println(isEven.test(3));
```
Output
```
false
```
Note that with `Predicate` you do not need to specify the return type like we
did with `Function` and `BiFunction`.  This is because the result is always a
`Boolean`.

## Custom Functional Interfaces
As noted above, there are a lot of functional interfaces in the standard library,
but there is not complete coverage - for example if you need to pass 1 or 2
parameters then you can use `Consumer` or `BiConsumer`, but if you need to pass 3 parameters there is no such thing as a `TriConsumer` in the standard library! 

If you need to use a functional interface that does not exist in the standard
library then we can very easily create our own, e.g. here is an implementation
of a `TriConsumer` that accepts 3 parameters:

```java
package xyz.byexample.java8;

@FunctionalInterface
interface TriConsumer<P1, P2, P3> {
    void accept(P1 p1, P2 p2, P3 p3);
}

public class functionalInterfaces {
    public static void main(String[] args) {
        TriConsumer tc = (a, b, c) -> System.out.println("Param 1: " + a + "\nParam 2: " + b + "\nParam 3: " + c);
        tc.accept("One", "Two", "Three");

    }
}
```
Output
```
Param 1: One
Param 2: Two
Param 3: Three
```

So we've created a new & very simple `FunctionalInterface` that accepts three 
parameters, and in our `main` method we've provided a lambda expression that
satisfies that interface.

Since functional interfaces can only contain a single abstract method (i.e.
`accept` in this example), we do not need to name it when we implement it so we
can use our lambda expression even though it never mentions that it is
implementing the `accept` method in the interface

> In the old days we would have had to provide an anonymous class with an `accept`
method signature that matches the interface's, and put our logic (i.e. our `System.out.println(...)` code) in the body of that method like so:
>
```java
public class functionalInterfaces {
    public static void main(String[] args) {
        // Dont do this!  This is an example of the old pre-java8 way!
        TriConsumer tc = new TriConsumer() {
            @Override
            public void accept(Object p1, Object p2, Object p3) {
                System.out.println("Param 1: " + p1 + "\nParam 2: " +p2 + "\nParam 3: " + p3);
            }
        };
        tc.accept("One", "Two", "Three");
    }
}
```
As you can see, this is a lot of extra code which makes things less-clear and
harder to read.  Java 8's functional interfaces and lambda expressions means
we can pass a single lambda expression instead.  This helps to keep our code
smaller, clearer and easier to read (which means less bugs too!).

Although this works as-is, it is not consistent with the `Consumer` and `BiConsumer`
in the standard library since it does not provide a default `andThen` implementation
but that is trivial to add - take a look at the <a href="http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/util/function/BiConsumer.java">source code for `BiConsumer`</a> in the JDK to see
how they've done it.  You may want to consider adding default implementations
in your customer functional interfaces to remain consistent and provide the
greatest flexibility when interacting with other code.

