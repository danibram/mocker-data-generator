"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should be "country"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer' });
        t.true(typeof res === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "integer()"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer()' });
        t.true(typeof res === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "integer({"min": 1, "max": 10})"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'integer({"min": 1, "max": 10})' });
        t.true(typeof res === 'number');
        t.true(res <= 10);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "street_suffixes()[0]["name"]"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.chance({ chance: 'street_suffixes()[0]["name"]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmNoYW5jZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuY2hhbmNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQTJCQTs7O0FBM0JBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFHbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUUzQixVQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBTSxDQUFDOzs7UUFDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHVCQUF1QixFQUFFLFVBQU0sQ0FBQzs7O1FBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTs7O0tBQ2xDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyw0Q0FBNEMsRUFBRSxVQUFNLENBQUM7OztRQUNsRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUE7UUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTs7O0tBQ25CLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQywwQ0FBMEMsRUFBRSxVQUFNLENBQUM7OztRQUNoRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7UUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTs7O0tBQ2xDLENBQUMsQ0FBQSJ9