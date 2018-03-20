"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should have access to db', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: 'world' };
        res = gen.db({ db: 'hello' });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.test('[eval] Should have access to db', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: 'world' };
        res = gen.db({ db: 'hello', eval: true });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should have access to db', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: ['hello', 'world'] };
        res = gen.db({ db: 'hello.0' });
        t.true(res === 'hello');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmRiLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL0dlbmVyYXRvci5kYi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkEwQkE7OztBQTFCQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBR2xDLElBQU0sR0FBRyxHQUFHLElBQUksWUFBUyxFQUFFLENBQUE7QUFFM0IsVUFBSSxDQUFDLDBCQUEwQixFQUFFLFVBQU0sQ0FBQzs7O1FBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUE7UUFFdkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsQ0FBQTs7O0tBQzFCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxpQ0FBaUMsRUFBRSxVQUFNLENBQUM7OztRQUMzQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBRXZCLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsQ0FBQTs7O0tBQzFCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQywwQkFBMEIsRUFBRSxVQUFNLENBQUM7OztRQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFFbEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsQ0FBQTs7O0tBQzFCLENBQUMsQ0FBQSJ9