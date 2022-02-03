"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var schema = new __1.Schema('test', {}, {});
ava_1.default('Array: It should recognise static field', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        schema.buildSingle({ static: 'hello' });
        t.true(schema.object === 'hello');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Schema.BuildSingle.spec.js.map