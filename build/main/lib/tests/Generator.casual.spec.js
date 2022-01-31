"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var gen = new __1.Generator();
ava_1.default('Should be "country"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'country' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('[eval] Should be "country"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'country', eval: true });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "array_of_digits()"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'array_of_digits()' });
        t.true(utils_1.isArray(res));
        res.forEach(function (d) { return t.true(typeof d === 'number'); });
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "array_of_digits(3)"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'array_of_digits(3)' });
        t.true(utils_1.isArray(res));
        t.true(res.length === 3);
        res.forEach(function (d) { return t.true(typeof d === 'number'); });
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "integer(1,2)"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'integer(1,2)' });
        t.true(typeof res === 'number');
        t.true(res <= 2);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.casual.spec.js.map