"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var schema = new __1.Schema('test', {}, {});
var arrayGenerationFixed = function (arrayModel, result) {
    var length = 10;
    var arrResult = Array.from(new Array(10)).map(function (_, index) { return result; });
    var arr = [];
    for (var i = 0; i < arrayModel.length; i++) {
        arr.push(result);
    }
    var situation = {
        test: [tslib_1.__assign(tslib_1.__assign({}, arrayModel), { length: 10, fixedLength: true })]
    };
    return {
        model: situation,
        expectedResult: {
            test: arrResult
        }
    };
};
ava_1.default('Array: It should recognise static field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ static: 'hello' }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should recognise arrow function field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ function: function () { return 'hello'; } }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should recognise normal function field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({
            function: function () {
                return 'hello';
            }
        }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: Should generate fixed length', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_) { return 'test'; })
        };
        model = {
            test: [
                {
                    static: 'test',
                    length: 10,
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: Should generate function length', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [
                {
                    static: 'test',
                    length: function () { return 10; }
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length === 10);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: Should generate dynamic length', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [
                {
                    static: 'test',
                    length: 10
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length <= 10);
        t.true(data[0].test.length > 0);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should recognise index param in normal function field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return index; })
        };
        model = {
            test: [
                {
                    function: function (i) {
                        return i;
                    },
                    length: 10,
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should recognise index param in arrow function field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return index; })
        };
        model = {
            test: [
                {
                    function: function (i) { return i; },
                    length: 10,
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should recognise context in function field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [
                {
                    function: function () {
                        return tslib_1.__assign({}, this);
                    },
                    length: 10,
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        data[0].test.forEach(function (d) {
            var keys = Object.keys(d);
            t.deepEqual(keys, [
                'object',
                'db',
                'faker',
                'chance',
                'casual',
                'randexp'
            ]);
        });
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: Function generator should include index and length', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return ({
                index: index,
                length: 10
            }); })
        };
        model = {
            test: [
                {
                    function: function (index, length, self) {
                        return {
                            index: index,
                            length: length
                        };
                    },
                    fixedLength: true,
                    length: 10
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: Function generator should include self too', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return 'hello'; })
        };
        model = {
            test: [
                {
                    function: function (index, length, self) {
                        // index is provided
                        t.deepEqual(self, Array.from(new Array(index)).map(function (_, index) { return 'hello'; }));
                        return 'hello';
                    },
                    fixedLength: true,
                    length: 10
                }
            ]
        };
        schema = new __1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should concat elements', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [
                {
                    faker: 'lorem.words()[0]',
                    length: 10,
                    concat: '[object.name, object.name]'
                }
            ]
        };
        schema = new __1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length < 13);
        t.true(data[0].emails.length > 2);
        return [2 /*return*/];
    });
}); });
/*
// TODO: check this behaviour
test('Should generate correctly with 2 ways of Array specification', async t => {
    let values = ['txuri', 'pitxi', 'kitty']
    let model = {
        name: {
            values,
        },
        name2: values
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()
    console.log(data[0])
    t.true(values.indexOf(data[0].name) > -1)
    t.true(values.indexOf(data[0].name2) > -1)
})*/
ava_1.default('Array: It should concatenated strings but not repeat same element itself (concatStrict)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data, appeared;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [
                {
                    faker: 'lorem.words()[0]',
                    length: 4,
                    concat: '[object.name, object.name]',
                    concatStrict: true,
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length === 4);
        appeared = 0;
        data[0].emails.forEach(function (d) {
            appeared = d === data[0].name ? appeared + 1 : appeared;
        });
        t.true(appeared === 1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Array: It should concatenated strings but increase the length if it is fixed', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, schema, data, appeared;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [
                {
                    faker: 'lorem.words()[0]',
                    length: 10,
                    concat: '[object.name, object.name]',
                    fixedLength: true
                }
            ]
        };
        schema = new __1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length === 10);
        appeared = 0;
        data[0].emails.forEach(function (d) {
            appeared = d === data[0].name ? appeared + 1 : appeared;
        });
        t.true(appeared === 2);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Schema.Array.spec.js.map