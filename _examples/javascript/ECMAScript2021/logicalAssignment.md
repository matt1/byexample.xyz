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

A real world example of this might be in a situation where you want to provide
an alternative value if something is already set, e.g. providing a more
user-friendly error message.

```javascript
let errorResponse = doAPICall(); 

// doAPICall might return a user-hostile error code (e.g. just '500' etc), so
// if it does provide a more friendly one for users.
errorResponse &&= 'There was an error - please try again later.';
alert(errorResponse);
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

A real world example might be used where a value might legitimately be an empty
string and you'd like to provide a default.

```javascript
const userName = '';

username = ...; // some function that might or might not set userName.

userName ||= 'Unknown';

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

Be careful when using this operator: just like with the [Null Coalescing Operator](/javascript/ECMAScript2020/nullCoalescing/), this only understands *nullish* values,
and will not work for values that are *falsy*. If you are checking a string that
might be `''` then this is *falsy* and not *nullish* - you should use [Logical
OR assignment `||=`](#logical-or-assignment---) instead .

A real-world example for this might be where you want to provide some default
values when something is nullish.

```javascript
function printAnimalDetails(animalConfig) {
  animalConfig.type ??= 'mammal';
  console.log(animalConfig);
}

// logs "{{ color: 'silver', type: 'fish' }}"
printAnimalDetails({ color: "silver", type: 'fish' }); 

 // logs "{{ color: "brown", type: 'mammal' }}"
printAnimalDetails({ color: "brown" });
```
