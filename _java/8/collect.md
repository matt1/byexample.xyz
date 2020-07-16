---
title: Java 8 Streams Collect Examples
linktitle: Streams Collect
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "streams", "lambda"]
tags: ["collect", "collectors", "averagingInt", "maxBy", "minBy", "partitioningBy", "toList"]
permalink: "java/8/collect/"
---

## Collecting to a list

```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Collect {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(numbers.stream().collect(Collectors.toList()));
    }
}
```
Output
```
[1, 2, 3, 4, 5]
```

## Collecting Average of Integers
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
System.out.println( numbers.stream().collect(Collectors.averagingInt(Integer::intValue)));
```
Output
```
3.0
```

## Collecting Sum of Integers
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
System.out.println(numbers.stream().collect(Collectors.summingInt(Integer::intValue)));
```
Output
```
15
```

## Collecting Maximum of Integers
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
System.out.println(numbers.stream().collect(Collectors.maxBy(Integer::compare)));
```
Output
```
Optional[5]
```

Note that here we're just using `Integer`'s `compare()` function as our
comparator.  If you'd like you could define your own `Comparator<? super T>`
instead.

Another point worth noting is that we get an `Optional<Integer>` as a response.
If the stream had been empty, we'd have got a result of `Optional.empty` here
since there is no maximum value if there are no values (for the summing and
average operators, we would get `0` or `0.0` respectively since those are the
sums and averages of an empty list, so no `Optional` needed there).

Make sure you check out our [examples on`Optional`](/java/8/optional/) if you'd
like to see some more examples of `Optional` in Java 8.

# Collecting into two partitions
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<String> letters = Arrays.asList("a", "b", "c", "d", "e");
System.out.println(numbers.stream().collect(Collectors.partitioningBy(number -> number < 3)));
System.out.println(letters.stream().collect(Collectors.partitioningBy(letter -> letter.matches("(a|e|i|o|u)"))));
```
Output
```
{false=[3, 4, 5], true=[1, 2]}
{false=[b, c, d], true=[a, e]}
```

Note that this is different from a basic `filter()` operation - `filter()` will
return only those elements that match the filter, where `partitioningBy` will
return two partitions: one containing those elements that do meet the requirement
and one that does not.

# Joining Strings
```java
List<String> letters = Arrays.asList("a", "b", "c", "d", "e");
System.out.println(letters.stream().collect(Collectors.joining("!")));
```
Output
```
a!b!c!d!e
```
