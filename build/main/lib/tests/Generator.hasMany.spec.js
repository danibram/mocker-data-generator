"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.default('Should get many from the DB with max', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 2
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 2);
        t.true(res.length >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get many from the DB with min', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 10,
            min: 4
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 10);
        t.true(res.length >= 4);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get many from the DB with min = 0', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 1,
            min: 0
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 1);
        t.true(res.length >= 0);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get many from the DB with fixed amount', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            amount: 5
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length === 5);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get many from the DB, and one field of each entity', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 1
        });
        t.true(typeof res[0] === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should get many from the DB, unique', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(2)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 2,
            unique: true
        });
        t.deepEqual(res, [0, 1]);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should throw an error, not enough unique data', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(2)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        try {
            res = gen.hasMany({
                hasMany: 'hello',
                get: 'id',
                amount: 3,
                unique: true
            });
        }
        catch (e) {
            t.deepEqual(e, 'Can´t get unique data. Source "hello" has not enough data');
        }
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.hasMany.spec.js.map