"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var schema = new _1.Schema('test', {}, {});
var arrayGenerationFixed = function (arrayModel, result) {
    var length = 10;
    var arrResult = Array.from(new Array(10)).map(function (_, index) { return result; });
    var arr = [];
    for (var i = 0; i < arrayModel.length; i++) {
        arr.push(result);
    }
    var situation = {
        test: [tslib_1.__assign({}, arrayModel, { length: 10, fixedLength: true })]
    };
    return {
        model: situation,
        expectedResult: {
            test: arrResult
        }
    };
};
ava_1.test('Array: It should recognise static field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ static: 'hello' }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise arrow function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ function: function () { return 'hello'; } }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise normal function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({
            function: function () {
                return 'hello';
            }
        }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate fixed length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate function length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length === 10);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate dynamic length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length <= 10);
        t.true(data[0].test.length > 0);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise index param in normal function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise index param in arrow function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise context in function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
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
ava_1.test('Array: Function generator should include index and length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Function generator should include self too', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should concat elements', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('test', model, 1);
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
ava_1.test('Array: It should concatenated strings but not repeat same element itself (concatStrict)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('test', model, 1);
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
ava_1.test('Array: It should concatenated strings but increase the length if it is fixed', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        schema = new _1.Schema('test', model, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLkFycmF5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL1NjaGVtYS5BcnJheS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkE0VkE7OztBQTVWQSwyQkFBMEI7QUFDMUIsMkJBQStCO0FBQy9CLGtDQUE0QztBQUU1QyxJQUFJLE1BQU0sR0FBRyxJQUFJLFNBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRXZDLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxVQUFVLEVBQUUsTUFBTTtJQUM1QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSyxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUMsQ0FBQTtJQUVuRSxJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUE7SUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRUQsSUFBSSxTQUFTLEdBQUc7UUFDWixJQUFJLEVBQUUsc0JBQU0sVUFBVSxJQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBRztLQUMzRCxDQUFBO0lBRUQsTUFBTSxDQUFDO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFDaEIsY0FBYyxFQUFFO1lBQ1osSUFBSSxFQUFFLFNBQVM7U0FDbEI7S0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsVUFBSSxDQUFDLHlDQUF5QyxFQUFFLFVBQU0sQ0FB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