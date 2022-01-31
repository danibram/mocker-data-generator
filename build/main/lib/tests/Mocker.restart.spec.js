"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var mock = new __1.Mocker();
ava_1.default('Should restart schemas and DB', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        mock.DB = { users: [] };
        t.true(Object.keys(mock.DB).length === 1);
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        mock.schema('users', {});
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 1);
        mock.restart();
        t.true(utils_1.isObject(mock.DB));
        t.true(Object.keys(mock.DB).length === 0);
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Mocker.restart.spec.js.map