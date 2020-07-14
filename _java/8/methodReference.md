---
title: Java 8 Method References Examples
linktitle: Method References
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8"]
tags: ["method reference", "map", "constructor"]
---

## Basic Example
Method references are probably most useful when used with the `Stream` API to
apply a function to every element of a stream.  For example we can use `map()`
to make each element of a `Stream<String>` to upper case:

```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Map {
    public static void main(String[] args) {
        List<String> letters = Arrays.asList("a", "b", "c");

        List<String> upperCase = letters.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(upperCase);
    }
}
```
Output
```
[A, B, C]
```

`map()` requires a function that fits the `Function<T, R>` interface (i.e. a
function that accepts an argument and returns a result).

The `String::toUpperCase` is a *method reference* to the String.toUpperCase()
method that happens fits the interface `Function<T, R>` so we can use it here.

## Constructor Example
You can use method references for an objects constructor too.  A good example of
where you'd need to use this would be when you need to return an array from a
stream:

```java
List<String> letters = Arrays.asList("a", "b", "c");

String[] lettersArray = letters.stream().toArray(String[]::new);
for (int i=0; i<lettersArray.length; i++) {
    System.out.print(lettersArray[i] + ", ");
}
```
Output
```
a, b, c, 
```

If the constructor takes two arguments, we'd need to use the `BiFunction`
interface - if you need more than two arguments you'll need to create your own
functional interface for that.

## Examples of how Method references actually work
You can think of method references as a simple shorthand for a lambda expression.

For example, in the case of a static method, we could use a lambda expression
like this to get a `Consumer<String>` function that prints to the console:

```java
Consumer<String> printToConsole = s -> System.out.println(s);
```

This can be simplified to the following method reference to get the same 
`Consumer<String>` function that prints to the console as well:

```java
Consumer<String> printToConsole = System.out::println;
```

Both of these snippets are equivalent and produce the same output when
executed.

```java
printToConsole.accept("hello world");
```
Output
```
hello world
```

With the method reference approach the `s` argument is no-longer required as
java will automatically pass the arguments to the method we're referencing.

This also works in a similar way for *instance methods* as well - for example
the classic example of <a href="{{< ref "map.md" >}}">changing the case of a
stream of strings</a> uses a method reference of `String::toUpperCase()`.

Conceptually you can think of `String::toUpperCase()` as equivalent to the
following lambda expression that calls the `toUpperCase()` method on the
instance `str`:

```java
Function<String, String> toUpper = (str) -> str.toUpperCase();
System.out.println(toUpper.apply("a"));
```
Output
```
A
```

Method references allow us to replace the instance with the *type* of the
instance we're dealing with, and again java will automatically pass the
arguments to the method.

```java
Function<String, String> toUpper = String::toUpperCase;
System.out.println(toUpper.apply("a"));
```
Output
```
A
```

So going back to our `map()` example of changing all elements of the stream to
upper case we can now see that the `String::toUpperCase` satisfies the function
interface for `map()` (i.e. it is a `Function<T, R>`), and we now know that we
can use a method reference for the *type* of the instance and java will
automatically pass the  arguments (i.e. each `String` in the `Stream<String>`)
to the method we're referencing.

The same is true for constructors too:
```java
Function<Integer, List> newList = (Integer s) -> new ArrayList(s);
System.out.println(newList.apply(10));
```
Output
```
[]
```
This is equivalent to
```java
Function<Integer, List> newList = ArrayList::new;
System.out.println(newList.apply(10));
```
Output
```
[]
```