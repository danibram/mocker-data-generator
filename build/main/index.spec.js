"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("./"), lib = _1;
ava_1.default('functions can be used without es imports', function (t) {
    t.true(typeof _1.default === 'function');
    t.true(typeof lib.mocker === 'function');
    t.true(typeof lib.Mocker === 'function');
    t.true(typeof lib.Generator === 'function');
    t.true(typeof lib.Schema === 'function');
});
ava_1.default('Mocker: exists all methods', function (t) {
    var m = _1.default();
    var methods = ['schema', 'build', 'reset', 'restart'];
    methods.forEach(function (method) { return t.true(typeof m[method] === 'function'); });
});
//# sourceMappingURL=index.spec.js.map