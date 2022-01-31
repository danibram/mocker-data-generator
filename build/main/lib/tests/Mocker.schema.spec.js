"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var mock = new __1.Mocker();
ava_1.default('Should load 1 schema', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        mock.schema('users', {});
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 1);
        t.true(mock.schemas[0] instanceof __1.Schema);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Mocker.schema.spec.js.map