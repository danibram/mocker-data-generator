"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should have context {object, db, faker, chance, casual, randexp}', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ctx;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {};
        gen.object = {};
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        ctx.forEach(function (c) {
            var res = gen.eval({ eval: c });
            t.true(res !== undefined);
            t.true(res !== null);
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.eval.spec.js.map