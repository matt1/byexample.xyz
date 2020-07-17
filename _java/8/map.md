---
title: Java 8 Streams Map & FlatMap Examples
linktitle: Streams Map & FlatMap
permalink: "java/8/map/"
version: "8"
---

## Map Examples
We can use `map()` to execute a function on every element of a stream.  The
classic example for this one is applying `toUpperCase()` on every element.

```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Map {
    public static void main(String[] args) {
        List<String> letters = Arrays.asList("a", "b", "c");

        List<String> upperCase = letters.stream()
                .map((String element) -> element.toUpperCase())
                .collect(Collectors.toList());

        System.out.println(upperCase);
    }
}
```
Output
```
[A, B, C]
```
If we want to make the code more compact, we can change this to use a
*method reference* that references `String`'s `toUpperCase()` method and apply
that directly to each element of the stream.

```java
List<String> upperCase = letters.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
System.out.println(upperCase);
```
Output
```
[A, B, C]
```

For more on method references (like what does this syntax *actually do*) make
sure you take a look at our guide on [method references](/java/8/methodReference/).

## FlatMap Examples
`flatMap()` converts a stream of collections into a single "flat" stream.  For
example if I have a list of lists, `flatMap()` will "flatten" it out into a
single-dimension .

```java
List<String> letters1 = Arrays.asList("a", "b");
List<String> letters2 = Arrays.asList("b", "c", "d");
List<String> letters3 = Arrays.asList("e", "f");
List<List<String>> listOfLetters = Arrays.asList(letters1, letters2, letters3);

List<String> flatList = listOfLetters.stream()
        .flatMap(List::stream)
        .collect(Collectors.toList());
System.out.println(flatList);
```
Output
```
[a, b, b, c, d, e, f]
```
Note that the output has not removed the duplicated `b` element of the stream,
instead it has effectively "concatenated" the lists together.

The same can be done for plain old arrays:

```java
String[] animals = new String[]{"cat", "dog", "rabbit"};
String[] birds = new String[]{"sparrow", "crow", "eagle"};
String[] fish = new String[]{"cod", "tuna", "salmon"};

String[][] creatures = new String[][]{animals, birds, fish};

String[] flatCreatures = Arrays.stream(creatures)
        .flatMap(Arrays::stream)
        .toArray(String[]::new);
for (int i=0; i<flatCreatures.length; i++) {
    System.out.print(flatCreatures[i] + ", ");
}
```
Output
```
cat, dog, rabbit, sparrow, crow, eagle, cod, tuna, salmon, 
```