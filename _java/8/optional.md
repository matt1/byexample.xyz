---
title: Java 8 Optional Examples
linktitle: Optional
date: 2018-01-01
publishdate: 2000-01-01
toc: true
categories: ["java8", "optional",]
tags: ["optional", "findFirst", "findAny"]
permalink: "java/8/optional/"
---

`Optional<T>` is useful in avoiding the unchecked `NullPointerException` 
as it provides a type-safe object that may or may not
contain a value, and so it is up to the calling code to specifically check if
there is a value or not.  The idea is to *force* us to think about what to do
when we're writing code, rather than accidentally hitting a `NullPointerException` if a function returns `null`.

For example, `Optional<T>` is used a lot with the `Stream` API to force us to
thoughtfully handle the situation where there might be an empty stream.

## Basic Usage

```java
import xyz.byexample.Person;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OptionalValues {

    private static List<Person> people = new ArrayList<>();

    public static void main(String[] args) {
        Optional<Person> maybePerson = getPersonByName("Bill");

        if (maybePerson.isPresent()) {
            System.out.println("Person was found");
        } else {
            System.out.println("Person was not found");
        }
    }

    public static Optional<Person> getPersonByName(String name) {
        for (Person p : people) {
            if (p.getName().equals(name)) {
                return Optional.of(p);
            }
        }
        return Optional.empty();
    }
}
```
Output
```
Person was not found
```

If you are using a collection that supports streams, this is even easier since
functions like `findFirst()` and `findAny()` already return an `Optional<T>`
while keeping your code shorter and clearer - here we can change the implementation
of `getPersonByName` to use streams and `findFirst`:

```java
    public static void main(String[] args) {
        Optional<Person> maybePerson = getPersonByName("Bill");

        if (maybePerson.isPresent()) {
            System.out.println("Person was found");
        } else {
            System.out.println("Person was not found");
        }
    }

    public static Optional<Person> getPersonByName(String name) {
        // Much shorter implementation of getPersonByName
        return people.stream().filter(p -> name.equals(p.getName())).findFirst();
    }
```