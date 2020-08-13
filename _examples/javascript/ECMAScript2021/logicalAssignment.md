---
title: Javascript Logical Assignment Operators
linktitle: Logical Assignment Operators
permalink: "javascript/ECMAScript2021/logicalAssignment/"
short-description: "Learn and understand how to use the logical assignment operators (??=, ||= and &&=) in javascript."
lang: "javascript"
version: "ECMAScript2021"
---

The Logical Assignment Operators are a group of operators that have been added
to Javascript to streamline various common code patterns where previously we'd
have needed to use conditional `if` statements to check the value of a variable
before potentially assigning a new value.

Now we can conditionally assign a variable based on a logical operation, and we
skip the need to call any `set` setters - this is the short-circuit
functionality that we're familiar with when we're using the logical operators
in a normal conditional statement (e.g. `(var1 && var2 && var3)` will
short-circuit and not consider `var2` and `var3` if `var1` is false).

While these logical assignment operators may feel weird and alien to you at
first glance, consider them as part of a similar family of operators
to`+=` or `*=` where you are modifying the value of a variable without an
explicit assignment.

# Logical AND Assignment - `&&=`
The logical AND assignment operator will only assign if the left operand is
**truthy**.

```javascript
a &&= b;
```
* If `a` is **truthy**, then assign `b` to `a` (i.e. `a = b;`)
* If `a` ia not truthy, do nothing.

The equivalent code with conditional `if` statements might be:

```javascript
if (a) {
    a = b;
}
```

# Logical OR Assignment - `||=`

Also known as the "Javascript mallet operator", the logical OR assignment
operator only assigns if the left operand is **falsy**.

```javascript
a ||= b
```

* If `a` is **falsy**, then assign `b` to `a` (i.e. `a = b;`)
* If `a` is not falsy, do nothing.

The equivalent code with conditional `if` statements might be:

```javascript
if (!a) {
    a = b;
}
```

# Logical Nullish Assignment - `??=`

The logical nullish assignment operator will only assign if the left operand is
**nullish**.

```javascript
a ??= b;
```
* If `a` is **nullish**, then assign `b` to `a` (i.e. `a = b;`)
* If `a` ia not nullish, do nothing.

The equivalent code with conditional `if` statements might be:

```javascript
if (a == null) {
    a = b;
}
```
