"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should be "/hello+ (world|to you)/"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.randexp({ randexp: /hello+ (world|to you)/ });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.randexp.spec.js.map