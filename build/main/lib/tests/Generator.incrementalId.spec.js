"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
gen.name = 'user';
gen.DB = { user: [{ id: 0 }, { id: 1 }, { id: 2 }] };
ava_1.default('Incremental Id true', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.incrementalId({ incrementalId: true });
        t.true(res === 3);
        return [2 /*return*/];
    });
}); });
ava_1.default('Incremental Id default value', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.incrementalId({ incrementalId: '2' });
        t.true(res === 5);
        res = gen.incrementalId({ incrementalId: '9' });
        t.true(res === 12);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.incrementalId.spec.js.map