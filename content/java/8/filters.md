---
title: Java 8 Streams Filter Examples
linktitle: Java 8 Streams Filter Examples
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "streams", "lambda"]
tags: ["filter", "collect"]
---

## Basic Filtering
Filters allow you to easily remove elements from a stream that you're not
interested in.

For example if we had a list of numbers, we can filter out
any that are less than 3.

```java
package xyz.byexample.java8;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Filter {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1,2,3,4,5);

        List<Integer> lessThanThree = numbers.stream()
                .filter((Integer number) -> {
                    return number < 3;
                })
                .collect(Collectors.toList());

        System.out.println(lessThanThree);
    }
}
```
Output
```
[1, 2]
```
Breaking that down:

* `numbers.stream()` creates a new Stream that we're going to
 operate on
* `filter(...)` contains the Predicate that does the actual work of
 the filter (a Predicate here is just a fancy name for a function that returns
 true or false)
* finally we use `collect()` to turn the Stream back into a
 collection and stores it in our list of `lessThanThree`.

This code is a much shorter than what we're used to using without streams which
is great news.  Since this logic is so simple though, we can replace the
`filter(...)` *statement* with an *expression*.

```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5);

List<Integer> lessThanThreeLambda = numbers.stream()
.filter(number -> number < 3)
.collect(Collectors.toList());

System.out.println(lessThanThree);
```
Output
```
[1, 2]
```
The output is identical, but we've made our code even shorter by using a simple
lambda expression `number -> number < 3`:

* Java uses *type inference* to work out that `number` is an `Integer` (because
 we're operating on an `Stream<Integer>` object)
* We can entirely remove the `return` statement
* We dont need to use `{` and `}` braces/brackets.

## Filters on Objects
As well as filtering on simple types, we can also filter on an object's
properties.

For example, imagine we had a simple `Person` class that stores the name and age
of individuals.  We can easily use `filter()` to get only those who are ages
18 years or over.

```java
private static class Person {
    private Integer age;
    private String name;

    public Person(Integer age, String name) {
        this.age = age;
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
```
```java
List<Person> people = Arrays.asList(
        new Person(12, "Adam"),
        new Person(18, "Bob"),
        new Person(27, "Alice"),
        new Person(9, "Beth")
);

List<Person> adults = people.stream()
        .filter(person -> person.getAge() >= 18)
        .collect(Collectors.toList());

adults.forEach(adult -> System.out.println(adult.getName()));
```
Output
```
Bob
Alice
```

Since Adam and Beth are under 18, we've filtered them out of the `adults`
collection.

## Removing nulls from a stream
If you have nulls in your stream it is trivial to remove those using a filter.
```java
List<Person> people = Arrays.asList(
        new Person(12, "Adam"),
        new Person(18, "Bob"),
        null,
        new Person(27, "Alice"),
        new Person(9, "Beth"),
        null
);

List<Person> people = people.stream()
        .filter(person -> person != null)
        .collect(Collectors.toList());

people.forEach(adult -> System.out.println(adult.name));
```
Output
```
Adam
Bob
Alice
Beth
```

You can then easily chain that with extra filters - for example to filter out
nulls, then filter on a property of the object, such as age in our example:

```java
List<Person> people = Arrays.asList(
        new Person(12, "Adam"),
        new Person(18, "Bob"),
        null,
        new Person(27, "Alice"),
        new Person(9, "Beth"),
        null
);

List<Person> children = people.stream()
        .filter(person -> person != null)
        .filter(person -> person.getAge() < 18)
        .collect(Collectors.toList());

children.forEach(child -> System.out.println(child.getName()));
```
Output
```
Adam
Beth
```

