"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should have access to object', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.object = { hello: 'world' };
        res = gen.self({ self: 'hello' });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.default('[eval] Should have access to object', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.object = { hello: 'world' };
        res = gen.self({ self: 'hello', eval: true });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.self.spec.js.map