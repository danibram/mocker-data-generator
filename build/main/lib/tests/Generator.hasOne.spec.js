"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
var set1 = [
    {
        id: 0
    },
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },
    {
        id: 7
    },
    {
        id: 8
    },
    {
        id: 9
    }
];
var set2 = [
    {
        id: {
            id: 0
        }
    },
    {
        id: {
            id: 1
        }
    },
    {
        id: {
            id: 2
        }
    },
    {
        id: {
            id: 3
        }
    },
    {
        id: {
            id: 4
        }
    },
    {
        id: {
            id: 5
        }
    },
    {
        id: {
            id: 6
        }
    },
    {
        id: {
            id: 7
        }
    },
    {
        id: {
            id: 8
        }
    },
    {
        id: {
            id: 9
        }
    }
];
ava_1.default('Should get one of the DB', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: set1 };
        res = gen.hasOne({ hasOne: 'hello' });
        t.true(set1.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get one of the DB, and one field of that entity (eval)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {
            hello: set1
        };
        res = gen.hasOne({ hasOne: 'hello', get: 'id', eval: true });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res === 0 || (res && res <= 10));
        t.true(res === 0 || (res && res >= 0));
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get one of the DB, and one field of that entity (no-eval)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {
            hello: set1
        };
        res = gen.hasOne({ hasOne: 'hello', get: 'id' });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res === 0 || (res && res <= 10));
        t.true(res === 0 || (res && res >= 0));
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get one of the DB, and one field of that entity, more deep', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gen.DB = {
                    hello: set2
                };
                return [4 /*yield*/, gen.hasOne({ hasOne: 'hello', get: 'id.id' })];
            case 1:
                res = _a.sent();
                t.true(res !== undefined);
                t.true(res !== null);
                t.true(res === 0 || (res && res <= 10));
                t.true(res === 0 || (res && res >= 0));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=Generator.hasOne.spec.js.map