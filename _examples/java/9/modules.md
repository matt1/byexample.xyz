---
title: Java 9 Modules
linktitle: Modules
permalink: "java/9/modules/"
lang: "java"
version: "9"
---

Modules are a layer of abstraction above packages that allows you to
group related packages together.

Since the entire JDK has been split into modules, and because you have to explicitly state which modules your own modules need, your own distributable will only contain the code it needs to by using modules.

> In the old pre-JDK9 days, your distributable would contain the entire Java Platform, which meant a lot of code you probably weren't using (e.g. classes to deal with XML or Swing UIs)

A good guide can be found at [https://www.oracle.com/corporate/features/understanding-java-9-modules.html](https://www.oracle.com/corporate/features/understanding-java-9-modules.html)

## View All Modules
You can list all available modules in the JDK:
```bash
java --list-modules
```
Output
```bash
java.activation@10
java.base@10
java.compiler@10
java.corba@10
java.datatransfer@10
java.desktop@10
java.instrument@10
java.jnlp@10
java.logging@10
# ...
# ... and loads more
```

## Directory Structure and module-info
Each module must be in its own *root* directory and contain a `module-info.java` file that is the *module declaration*.

```java
module xyz.byexample.java9.examplemodule {
    // Declare the packages we are exporting.
    exports xyz.byexample.java.examplemodule;

    // Delcare the modules that this module depends on
    requires java.base;
}
```
The *root* directory is by convention the name of the module (including the full stops/periods), and you then have your traditional java package directory structure (i.e. a directory for `xyz` then a sub directory for `byexample` under that and so on) where you put your classes.

```
xyz.byexample.java9.examplemodule/
├ xyz/
│  └ byexample/
│       └ java9/
│           └ examplemodule/
│               └ ExampleClass.java
└ module-info.java
```
