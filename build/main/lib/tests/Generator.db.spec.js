"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should have access to db', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: 'world' };
        res = gen.db({ db: 'hello' });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.default('[eval] Should have access to db', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: 'world' };
        res = gen.db({ db: 'hello', eval: true });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should have access to db (.0 syntax)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: ['hello', 'world'] };
        res = gen.db({ db: 'hello.0' });
        t.true(res === 'hello');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.db.spec.js.map