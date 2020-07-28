---
title: Java 10 Local Type Inference
linktitle: Local Type Inference
permalink: "java/10/localInference/"
lang: "java"
version: "10"
---

## Local Type Inference Example

In the past, we needed to repeat ourselves a lot when doing obvious things, for example here we have to declare the type of `variable`, even though it is obvious to both us and java:

```java
List<String> variable = List.of("A", "B", "C");
```

We can save a lot of boilerplate using local type inference to let java work out the type automatically:

```java
package xyz.byexample.java10;

public class Inference {
    public static void main(String[] args) {
        var variable = List.of("A", "B", "C");
        System.out.println(variable.getClass().getName());
    }
}
```
Output
```
java.util.ImmutableCollections$ListN
```
 Note that `variable` still has a static type.  Using `var` does not turn java into a dynamic language where anything can go in any variable.

For example if we use var to infer a `string` type, and then trying to assign an `int` type value to it, we get an error.
 ```java
 var variable = "Hello";
 variable = 123;
```
 Output
```
Error:(6, 14) java: incompatible types: int cannot be converted to java.lang.String
```

## Streams Example

We can save a lot of typing using local type inference with streams.

For example consider our (Java 8 examples for filtering a stream)[/java/8/filters/]:

```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5);

List<Integer> lessThanThree = numbers.stream()
        .filter((Integer number) -> {
            return number < 3;
        })
        .collect(Collectors.toList());

System.out.println(lessThanThree);
```

If we convert this to use local type inference we can reduce a load of boiler plate to make our code clearer and easier to read and maintain:

```java
var numbers = Arrays.asList(1,2,3,4,5);

var lessThanThree = numbers.stream()
        .filter(number -> {
            return number < 3;
        })
        .collect(Collectors.toList());

System.out.println(lessThanThree);
```
Obviously a very simple example - I am sure you all will have seen some hideous examples.
