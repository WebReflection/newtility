
var New = require('../build/new.npm');

[
  function noArguments(assert) {
    if (typeof Uint32Array === 'function') {
      var a = New(Uint32Array);
      assert(a instanceof Uint32Array, 'a should be instanceof Uint32Array');
    } else {
      var a = New(Array);
      assert(a instanceof Array, 'a should be instanceof Array');
    }
    assert(a.length === 0, 'a should have 0 values, it has instead ' + a.length);
    assert([].join.call(a) === [].join(), 'a should be like an empty array');
  },
  function mandatoryNew(assert) {
    if (typeof Uint32Array === 'function') {
      var a = New(Uint32Array, [[1,2,3]]);
      assert(a instanceof Uint32Array, 'a should be instanceof Uint32Array');
    } else {
      var a = New(Array, [[1,2,3]]);
      assert(a instanceof Array, 'a should be instanceof Array');
    }
    assert(a.length === 3, 'a should have 3 values, it has instead ' + a.length);
    assert([].join.call(a) === [1,2,3].join(), 'a should be like [1,2,3]');
  },
  function shallowArrayCopy(assert) {
    var a = [1, 2, 3];
    var b = New(a);
    assert(b instanceof Array, 'b should have been an instanceof Array');
    assert({}.toString.call(b) === '[object Array]', 'b [[class]] is Array');
    assert(b.join() === a.join(), 'b is a copy of a');
    assert(JSON.stringify(b) === '[1,2,3]', 'b can be serialized');
  },
  function shallowObjectCopy(assert) {
    var a = {a: 1};
    var b = New(a);
    assert(b.hasOwnProperty('a'), 'b should have an "a" property');
    assert(b.a === 1, 'b.a should be 1, instead it is ' + b.a);
    assert(b !== a, 'b should not be a');
  }
].forEach(
  function (fn, i, tests) {
    fn(this);
    if (i + 1 === tests.length) {
      var info = (i + 1) + ' tests passed';
      try { console.info(info); }
      catch(o_O) { print(info); }
    }
  },
  typeof console === 'undefined' || !console.assert ?
    function (expression, failure) {
      if (!expression) throw new Error(failure);
    } :
    console.assert.bind(console)
);