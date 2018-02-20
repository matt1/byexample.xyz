---
title: Java 8 Convert Streams to & from Arrays Examples
linktitle: Java 8 Convert Streams to & from Arrays Examples
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "streams", "lambda"]
tags: ["array", "collectors", "toArray"]
---

## Converting from Streams to Arrays
Converting a stream to an array is a simple task of using `Stream`'s 
`toArray()` method combined with a
<a href="{{< ref "methodReference.md" >}}">method references</a> to the new
array's type.

For example here we want an array of type `String[]` so we use a method reference
to `String[]::new`:
```java
package xyz.byexample.java8;

import java.util.stream.Stream;

public class StreamsArrays {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("a", "b", "c");
        String[] array = stream.toArray(String[]::new);

        for (int i=0; i<array.length; i++) {
            System.out.println(array[i]);
        }
    }
}
```
Output
```
a
b
c
```
If we were using some other type, we'd use an appropriate reference to the
correct type, e.g. to convert a `Stream<Integer>` to an array we'd need to use
`Integer[]::new` instead.

## Converting from Arrays to Streams
To convert an array to a stream we can use the built-in functions in the `Arrays` class that makes our task incredibly easy:

```java
Integer[] integers = new Integer[]{1,2,3,4,5};
Stream<Integer> streamOfIntegers = Arrays.stream(integers);
```