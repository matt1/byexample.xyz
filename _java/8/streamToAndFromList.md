---
title: Java 8 Convert Streams to & from Lists Examples
linktitle: Convert Streams to & from Lists
permalink: "java/8/streamToAndFromList/"
version: "8"
---

## Converting from Streams to Lists

Converting a `Stream` to a `List` is extremely simple since we can use the
stream's `collect()` function with the `Collectors.toList()` built-in function
like in the example below:

```java
package xyz.byexample.java8;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamToList {
    public static void main(String[] args) {
        Stream<Integer> numbersStream = Stream.of(1, 2, 3, 4, 5);
        List<Integer> numbersList = numbersStream.collect(Collectors.toList());
        numbersList.forEach(number -> System.out.println(number));
    }
}
```
Output
```
1
2
3
4
5
```

## Converting from Lists to Streams
Again, converting a `List` to a `Stream` is extremely simple thanks to the
built-in functions `stream()` and `parallelStream()` on the `List` type.

```java
List<String> lettersList = Arrays.asList("a", "b", "c", "d", "e");
Stream<String> lettersStream = lettersList.stream();
Stream<String> lettersParallelStream = lettersList.parallelStream();
```