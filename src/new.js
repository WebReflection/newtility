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
