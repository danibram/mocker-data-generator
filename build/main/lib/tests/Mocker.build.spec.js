"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
ava_1.default('Should build with callback', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [
                {
                    hello: 'world'
                }
            ]
        };
        mock = new __1.Mocker();
        mock.schema('users', { hello: { static: 'world' } }, 1);
        mock.build(function (e, db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
ava_1.default('Should produce an error', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
                mock = new __1.Mocker();
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
ava_1.default('Should produce an error when pass an string as options', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var throwedErr, mock, error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                throwedErr = 'Schema: "users" An string "hey" is not recognized as a parameter.';
                mock = new __1.Mocker();
                mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 'hey');
                error = t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                });
                t.is(error.message, throwedErr);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, throwedErr);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should produce an error when uniqueField is not an array', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var throwedErr, model, mock, error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                throwedErr = 'Schema: "users" The posible values value is not an Array';
                model = {
                    name: {
                        values: 'a'
                    }
                };
                mock = new __1.Mocker();
                mock.schema('users', model, { uniqueField: 'name' });
                error = t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                });
                t.is(error.message, throwedErr);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, throwedErr);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should produce an error when uniqueField not exists', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var throwedErr, model, mock, error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                throwedErr = 'Schema: "users" The field "test" not exists.';
                model = {
                    name: {
                        values: ['a', 'b']
                    }
                };
                mock = new __1.Mocker();
                mock.schema('users', model, { uniqueField: 'test' });
                error = t.throws(function () {
                    return mock.build(function (error) {
                        throw error;
                    });
                });
                t.is(error.message, throwedErr);
                return [4 /*yield*/, mock.build().then(function (data) { return data; }, function (e) {
                        t.deepEqual(e.message, throwedErr);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should build with await (Promised)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
                mock = new __1.Mocker();
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
ava_1.default('Should build with Promised old style', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [
                {
                    hello: 'world'
                }
            ]
        };
        mock = new __1.Mocker();
        mock.schema('users', { hello: { static: 'world' } }, 1)
            .build()
            .then(function (db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
ava_1.default('Should build synchronously', function (t) {
    var result = {
        users: [
            {
                hello: 'world'
            }
        ]
    };
    var mock = new __1.Mocker();
    var db = mock.schema('users', { hello: { static: 'world' } }, 1).buildSync();
    t.deepEqual(db, result);
});
ava_1.default('Should throw synchronously', function (t) {
    var result = {
        users: [
            {
                hello: 'world'
            }
        ]
    };
    var mock = new __1.Mocker();
    var error = t.throws(function () {
        return mock
            .schema('users', { hello: { faker: 'worldrqwerqw' } }, 1)
            .buildSync();
    });
    t.is(error.message, 'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.');
});
//# sourceMappingURL=Mocker.build.spec.js.map