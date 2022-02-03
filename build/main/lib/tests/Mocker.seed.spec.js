"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var cats = [
    {
        name: 'Luke'
    },
    {
        name: 'Leia'
    }
];
var mock = new __1.Mocker();
ava_1.default('Should seed data', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(Object.keys(mock.DB).length === 0);
        mock.seed('cats', cats);
        t.true(Object.keys(mock.DB).length > 0);
        t.deepEqual(mock.DB.cats, cats);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should merge data from seed', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var mock;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, __1.default()
                    .seed('cats', cats)
                    .schema('cats', {
                    name: {
                        values: ['txuri', 'pitxi', 'kitty']
                    }
                }, 1)
                    .build()];
            case 1:
                mock = _a.sent();
                t.true(mock.cats.length === 3);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=Mocker.seed.spec.js.map