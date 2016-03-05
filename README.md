# newtility ![build status](https://travis-ci.org/WebReflection/newtility.svg?branch=master)
Utility for generic shallow copies and instances creation.

Available in `npm` through `npm install newtility`.

**node example**
```js
var New = require('newtility');
```

### `var object = New(Constructor[, args])`
Create an instance of `Constructor` using the optional Array object `args` as list of arguments.
```js
// simulating new Array(1, 2, 3)
var ott = New(Array, [1, 2, 3]);

// simulating new Uint32Array([4, 5, 6]);
var ui32 = New(Uint32Array, [ [4, 5, 6] ]);
```


### `var copy = New(object);`
Create a shallow copy of a generic object.
```js
var a = [1, 2, 3];
var b = New(a);

a !== b;                // true
a.join() === b.join();  // true
```
