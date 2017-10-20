"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
ava_1.test('Should build with callback', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [
                {
                    hello: 'world'
                }
            ]
        };
        mock = new _1.Mocker();
        mock.schema('users', { hello: { static: 'world' } }, 1);
        mock.build(function (db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
ava_1.test('Should build with await (Promised)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {
                    users: [
                        {
                            hello: 'world'
                        }
                    ]
                };
                mock = new _1.Mocker();
                return [4 /*yield*/, mock
                        .schema('users', { hello: { static: 'world' } }, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, result);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should build with Promised old style', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [
                {
                    hello: 'world'
                }
            ]
        };
        mock = new _1.Mocker();
        mock
            .schema('users', { hello: { static: 'world' } }, 1)
            .build()
            .then(function (db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmJ1aWxkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL01vY2tlci5idWlsZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFnREE7OztBQWhEQSwyQkFBMEI7QUFDMUIsMkJBQXVDO0FBR3ZDLFVBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFNLENBQUM7OztRQUNsQyxNQUFNLEdBQUc7WUFDVCxLQUFLLEVBQUU7Z0JBQ0g7b0JBQ0ksS0FBSyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0o7U0FDSixDQUFBO1FBQ0csSUFBSSxHQUFHLElBQUksU0FBTSxFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQTs7O0tBQzVDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxvQ0FBb0MsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUMxQyxNQUFNLEdBQUc7b0JBQ1QsS0FBSyxFQUFFO3dCQUNIOzRCQUNJLEtBQUssRUFBRSxPQUFPO3lCQUNqQjtxQkFDSjtpQkFDSixDQUFBO2dCQUNHLElBQUksR0FBRyxJQUFJLFNBQU0sRUFBRSxDQUFBO2dCQUNkLHFCQUFNLElBQUk7eUJBQ2QsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDbEQsS0FBSyxFQUFFLEVBQUE7O2dCQUZSLEVBQUUsR0FBRyxTQUVHO2dCQUVaLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBOzs7O0tBQzFCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxzQ0FBc0MsRUFBRSxVQUFNLENBQUM7OztRQUM1QyxNQUFNLEdBQUc7WUFDVCxLQUFLLEVBQUU7Z0JBQ0g7b0JBQ0ksS0FBSyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0o7U0FDSixDQUFBO1FBQ0csSUFBSSxHQUFHLElBQUksU0FBTSxFQUFFLENBQUE7UUFFdkIsSUFBSTthQUNDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEQsS0FBSyxFQUFFO2FBQ1AsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQTs7O0tBQzNDLENBQUMsQ0FBQSJ9