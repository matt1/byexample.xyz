---
title: ECMAScript 2015 Modules
linktitle: Modules
permalink: "javascript/ECMAScript2015/modules/"
lang: "javascript"
version: "ECMAScript2015"
---

Javascript modules are simply files that use the `export` keyword to mark what
elements of that file are available to be consumed by other Javascript files
via the `import` keyword. These are called "named exports" - see
[Default Exports](#default-exports) for an alternative approach.

> Using modules is a great way to split your code up into more easily managed
> components. This makes it easier to maintain and re-use your code.

For example if we have two files - `main.js` and `utils.js` - we might export
some code from the `utils.js` module to be available for use in our `main.js`
file like so:

`utils.js`:
```javascript
export let myVariable = 'hello';

export function doSomething() {
  console.log('Function in module');
}

// Alternatively you could remove the `export` keyword from the variable and
// function above, and export everything in one line like so:
export {myVariable, doSomething};
```

`main.js`:
```javascript
import {doSomething, myVariable} from './utils.js';

doSomething();  // logs "Function in module"
console.log(myVariable);  // logs "hello"
```

> You need to include the file extension (`.js`) for standard Javascript
> modules. Other older legacy systems might be different.

Note that the paths for the module source files in the import statements are
bare file names such as `util.js` this will not work and you will see errors
like:

  * `Uncaught TypeError: Error resolving module specifier “utils.js”. Relative
    module specifiers must start with “./”, “../” or “/”.` from Firefox
  * `Uncaught TypeError: Failed to resolve module specifier "user.js". Relative
    references must start with either "/", "./", or "../".` from Chrome

To fix these errors you need to make sure that the module source file is either
an absolute URL (i.e. one that starts with `http://` or `https://`) or a
relative path (i.e. one that starts with `/`, `./` or `../` - for example here
we used `./utils.js` which is a relative path).

## Directly using modules in HTML

Usually when using modules to build something in Javascript you'll use a build
tool such as Webpack or Parcel to automatically combine your javascript sources
into a single file (also sometimes referred to as a "bundle") to make your page
load faster.

If you try and use javascript code that uses modules directly in a HTML page by
using simple `<script>` tags, you'll see errors:
 * `Uncaught SyntaxError: import declarations may only appear at top level of a
   module` from Firefox
 * `Uncaught SyntaxError: Cannot use import statement outside a module` from
   Chrome

This is because the browser needs to be instructed to treat the `script` tag as
a module by providing the `type="module"` attribute:

```html
<script type="module" src="main.js"></script>
```

The same `type="module"` attribute also works for inline scripts:

```html
<script type="module">
  import {doSomething, myVariable} from './utils.js';

  doSomething();  // logs "Function in module"
  console.log(myVariable);  // logs "hello"
</script>
```

When this executes, the browser will automatically try and retrieve the imported
files (`./utils.js` in this example) and execute them. These module script files
are loaded as if they were `defer` script tags - i.e. they will not block
rendering. If you have a lot of module source files or have tight performance
requirements, you may benefit from using a build tool to combine your modules
into a single file.

> Note that if you are running this code locally from your filesystem (i.e.
`file://` URLs) and not a local web server, then the browser will reject the
`import` and `export` features.

## Import exports into a module object

In the above examples we have imported each individual exported member of a
module into a local variable - we're actually using
[destructuring](/javascript/ECMAScript2015/destructuring/) here in case you
didn't notice. Cool!

We can import everything that a module exports into a module object - this
effectively puts all of our imported variables, functions, and classes into a
namespace.

```javascript
import * as Utils from './utils.js';

Utils.doSomething();  // logs "Function in module"
console.log(Utils.myVariable);  // logs "hello"
```

This makes you code clearer to understand since it is now more obvious to people
reading this code that the `doSomething` and `myVariable` members come from the
`Utils` object, and are not local.

## Module Barrels

In what can only be a sign that we *really are* running out of names to give to
things, "barrels" are the idea of grouping module `export`s together in another
module file so that importing code only needs to `import` from a single module.

```javascript
// In ./myModules/module1.js
export let somethingFromModuleOne = '...';

// In ./myModules/module2.js
export let somethingFromModuleTwo = '...';

// In ./myModules/module3.js
export let somethingFromModuleThree = '...';

// In ./myModules/index.js
export {somethingFromModuleOne} from './module1.js';
export {somethingFromModuleTwo} from './module2.js';
export {somethingFromModuleThree} from './module3.js';

// In main.js
import {somethingFromModuleOne, somethingFromModuleTwo, somethingFromModuleThree} from './myModules/index.js';
// or
import * as MyModule from './myModules/index.js';
```

This tidies up the `import` statements and groups together related imports.
Without this, each imported member (e.g. `somethingFromModuleOne`) would be on
a separate line, and may be re-ordered by code formatters so that related
imports are no-longer near each other.