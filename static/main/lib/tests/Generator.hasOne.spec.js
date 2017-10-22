"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should get one of the DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasOne({ hasOne: 'hello' });
        t.true(data.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasOne({ hasOne: 'hello', get: 'id' });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res <= 10);
        t.true(res >= 0);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc09uZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuaGFzT25lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQXdCQTs7O0FBeEJBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFHbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUUzQixVQUFJLENBQUMsMEJBQTBCLEVBQUUsVUFBTSxDQUFDOzs7UUFDaEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFBO1FBQ2hFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFFcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7O0tBQ2pDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyx3REFBd0QsRUFBRSxVQUFNLENBQUM7OztRQUM5RCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUE7UUFDaEUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUVwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7OztLQUNuQixDQUFDLENBQUEifQ==