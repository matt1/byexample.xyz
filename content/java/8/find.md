---
title: Java 8 Streams findFirst & findAny Examples
linktitle: Java 8 Streams findFirst & findAny Examples
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "streams", "lambda"]
tags: ["find", "findAny", "findFirst", "collect", "optional"]
---


## Getting the first element from a stream
We can use `findFirst()` and `findAny()` to retrieve the first - or any - element
from the stream.  These return an `Optional<T>` object.

> `findFirst()` returns the first element in the stream, but `findAny()` does
> not guarantee any ordering and could return any element in the stream.  This
> allows for maximum performance when using `parallelStream()` and if you dont
> care about ordering.

Lets start with a simple example of getting the first element of the stream
using `findFirst()`:

```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Find {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        Optional<Integer> first = numbers.stream().findFirst();
        if (first.isPresent()) {
            System.out.println(first.get());
        } else {
            System.out.println("Stream empty");
        }
    }
}

```
Output
```
1
```
Note that before we do anything with the `Optional<Integer>` we need to check
that there is a value present or not - if there is no value present then we can
infer that the stream was empty.

```java
List<Integer> numbers = new ArrayList<>();
Optional<Integer> first = numbers.stream().findFirst();
if (first.isPresent()) {
    System.out.println(first.get());
} else {
    System.out.println("Stream empty");
}
```
Output
```
Stream empty
```
So this time the `Optional<Integer>` returned does not have a value present as
the stream was empty.

## Getting any element from a parallel stream
Getting any element from a parallel stream is useful if you have a large stream
and don't care about the ordering.  It is very similar to how we use `findFirst()`
on a normal stream:

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
Optional<Integer> first = numbers.parallelStream().findAny();
if (first.isPresent()) {
    System.out.println(first.get());
} else {
    System.out.println("Stream empty");
}
}
```
Output
```
3
```
Note that we got `3` this time - this was not the first element in the stream - 
the ordering is not guaranteed!