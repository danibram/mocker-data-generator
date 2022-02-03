"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var gen = new __1.Generator();
ava_1.default('Normal Function', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return 'test';
            }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.default('ES6 Function', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () { return 'test'; }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should call function with context', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res, ctx;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return this;
            }
        });
        t.true(utils_1.isObject(res));
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        t.true(utils_1.isObject(res));
        ctx.forEach(function (c) { return t.true(res.hasOwnProperty(c)); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.function.spec.js.map