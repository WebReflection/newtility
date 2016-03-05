/*!
Copyright (c) 2016 - Andrea Giammarchi @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var New = (function (Object) {

  var
    bind = Function.prototype.bind,
    create = Object.create,
    defineProperties = Object.defineProperties,
    defineProperty = Object.defineProperty,
    empty = Array.prototype,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getOwnPropertyDescriptors =
      Object.getOwnPropertyDescriptors ||
      function (target) {
        var descriptors = {};
        getProperties(target).forEach(function (key) {
          defineProperty(descriptors, key, {
            enumerable: true,
            value: getOwnPropertyDescriptor(target, key)
          });
        });
        return descriptors;
      },
    getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertySymbols = Object.getOwnPropertySymbols,
    getProperties = getOwnPropertySymbols ?
      function (target) {
        return empty.concat(
          getOwnPropertyNames(target),
          getOwnPropertySymbols(target)
        );
      } :
      getOwnPropertyNames,
    getPrototypeOf = Object.getPrototypeOf,
    toString = Object.prototype.toString
  ;

  return function New(source, args) {
    switch (typeof source) {
      case 'object':
        if (!source) return create(null);
        var
          p = getPrototypeOf(source),
          d = getOwnPropertyDescriptors(source)
        ;
        switch (toString.call(source)) {
          case '[object Object]': return create(p, d);
          default: return defineProperties(new p.constructor, d);
        }
      case 'function':
        var a = [null], i = 0;
        while (i++ < (args || empty).length) a[i] = args[i-1];
        return new(bind.apply(source, a));
    }
  };

}(Object));
(module.exports=New).New=New;
