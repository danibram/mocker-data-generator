"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should works', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.static({ static: 'test' });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.static.spec.js.map