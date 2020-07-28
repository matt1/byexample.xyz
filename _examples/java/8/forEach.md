---
title: Java 8 Streams forEach Examples
linktitle: Streams forEach
permalink: "java/8/forEach/"
lang: "java"
version: "8"
---

## forEach on an Array
Since an array in Java is not an `Iterable`, you cant directly use `forEach()`
with it like you can with `List`, `Map` and other classes that implement the
`Iterable` interface.

The workaround to this is to simply convert the array to a `Stream` first using
the built-in `Arrays.stream()` function - see
[Converting from Streams to Arrays](/java/8/streamToAndFromArray/) for more
details on converting between arrays and streams.

```java
package xyz.byexample.java8;

import java.util.Arrays;

public class forEach {
    public static void main(String[] args) {
        String[] letters = new String[]{"a", "b", "c"};
        Arrays.stream(letters).forEach((String letter) -> {
            System.out.println(letter);
        });
    }
}

```
Output
```
a
b
c
```

Alternatively we can use [method references](/java/8/methodReference/) to
simplify out code and cut out the entire anonymous function we passed in.

```java
    String[] letters = new String[]{"a", "b", "c"};
    Arrays.stream(letters).forEach(System.out::println);
```
Output
```
a
b
c
```

## forEach on a List
Using `forEach` on a `List` is just as simple as using it on a `Stream` in the
above array example:
```java
List<Integer> numbers = Arrays.asList(1,2,3);
numbers.forEach((Integer number) -> {
    System.out.println(number);
});
```
Output
```
1
2
3
```
Here we used a anonymous function, but we could have used a method reference
had we wanted to, just like with arrays.

## forEach on a Map
When using `forEach` on a `Map`, things are slightly different than with
arrays or a `List` since we have both a key and a value so we need to use
an anonymous function that implements the `BiConsumer` interface rather than
just a simple `Consumer` as before:

```java
Map<String, String> countries = new HashMap<>();
countries.put("fr", "France");
countries.put("us", "United States");
countries.put("nz", "New Zealand");

countries.forEach((String key, String value) -> {
    System.out.println("Key: " + key + " Value: " + value);
});
```
Output
```
Key: fr Value: France
Key: nz Value: New Zealand
Key: us Value: United States
```
