---
title: Java 8 Streams Collect Examples
linktitle: Java 8 Streams Collect Examples
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "streams", "lambda"]
tags: ["collect", "collectors", "averagingInt", "maxBy", "minBy", "partitioningBy", "toList"]
---

## Converting a Stream to a List
this is a long bit of text to see what happens when we type something really rather long that should overflow on a wide monotor
```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Collect {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<String> letters = Arrays.asList("a", "b", "c", "d", "e");

        System.out.println("As a list: " + numbers.stream().collect(Collectors.toList()));
        System.out.println("Averaged: " + numbers.stream().collect(Collectors.averagingInt(Integer::intValue)));
        System.out.println("Summed: " + numbers.stream().collect(Collectors.summingInt(Integer::intValue)));
        System.out.println("Maximum: " + numbers.stream().collect(Collectors.maxBy(Integer::compare)));
        System.out.println("Partitioned (number < 3) " + numbers.stream().collect(Collectors.partitioningBy(number -> number < 3)));

        System.out.println("Joined: " + letters.stream().collect(Collectors.joining("!")));
        System.out.println("Partitioned (vowels): " + letters.stream().collect(Collectors.partitioningBy(letter -> letter.matches("(a|e|i|o|u)"))));
    }
}
```