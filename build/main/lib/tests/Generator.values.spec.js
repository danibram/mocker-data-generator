"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should works', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var values, res;
    return tslib_1.__generator(this, function (_a) {
        values = ['test', 'this', 'awesome', 'module'];
        res = gen.values({ values: values });
        t.true(typeof res === 'string');
        t.true(values.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.values.spec.js.map