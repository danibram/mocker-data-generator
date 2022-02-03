"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should be "country"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer' });
        t.true(typeof res === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.default('[eval] Should be "country"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer', eval: true });
        t.true(typeof res === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "integer()"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer()' });
        t.true(typeof res === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "integer({"min": 1, "max": 10})"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer({"min": 1, "max": 10})' });
        t.true(typeof res === 'number');
        t.true(res <= 10);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "street_suffixes()[0]["name"]"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'street_suffixes()[0]["name"]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.chance.spec.js.map