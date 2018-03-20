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
        mock.build(function (e, db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
ava_1.test('Should produce an error', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock;
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
                mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 1);
                return [4 /*yield*/, mock.build(function (error) {
                        t.deepEqual(error.message, 'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.');
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, 'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.');
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should produce an error when pass an string as options', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var err, mock;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                err = 'Schema: "users" An string "hey" is not recognized as a parameter.';
                mock = new _1.Mocker();
                mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 'hey');
                t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                }, err);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should produce an error when uniqueField is not an array', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var err, model, mock;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                err = 'Schema: "users" The posible values value is not an Array';
                model = {
                    name: {
                        values: 'a'
                    }
                };
                mock = new _1.Mocker();
                mock.schema('users', model, { uniqueField: 'name' });
                t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                }, err);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should produce an error when uniqueField not exists', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var err, model, mock;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                err = 'Schema: "users" The field "test" not exists.';
                model = {
                    name: {
                        values: ['a', 'b']
                    }
                };
                mock = new _1.Mocker();
                mock.schema('users', model, { uniqueField: 'test' });
                t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                }, err);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmJ1aWxkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL01vY2tlci5idWlsZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkEySkE7OztBQTNKQSwyQkFBMEI7QUFDMUIsMkJBQXVDO0FBR3ZDLFVBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFNLENBQUM7OztRQUNsQyxNQUFNLEdBQUc7WUFDVCxLQUFLLEVBQUU7Z0JBQ0g7b0JBQ0ksS0FBSyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0o7U0FDSixDQUFBO1FBQ0csSUFBSSxHQUFHLElBQUksU0FBTSxFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUE7OztLQUNqRCxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMseUJBQXlCLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDL0IsTUFBTSxHQUFHO29CQUNULEtBQUssRUFBRTt3QkFDSDs0QkFDSSxLQUFLLEVBQUUsT0FBTzt5QkFDakI7cUJBQ0o7aUJBQ0osQ0FBQTtnQkFDRyxJQUFJLEdBQUcsSUFBSSxTQUFNLEVBQUUsQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0QscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7d0JBQ2xCLENBQUMsQ0FBQyxT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