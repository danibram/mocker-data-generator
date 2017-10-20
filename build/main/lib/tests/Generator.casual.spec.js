"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var gen = new _1.Generator();
ava_1.test('Should be "country"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'country' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "array_of_digits()"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'array_of_digits()' });
        t.true(utils_1.isArray(res));
        res.forEach(function (d) { return t.true(typeof d === 'number'); });
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "array_of_digits(3)"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'array_of_digits(3)' });
        t.true(utils_1.isArray(res));
        t.true(res.length === 3);
        res.forEach(function (d) { return t.true(typeof d === 'number'); });
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "integer(1,2)"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.casual({ casual: 'integer(1,2)' });
        t.true(typeof res === 'number');
        t.true(res <= 2);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmNhc3VhbC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuY2FzdWFsLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQThCQTs7O0FBOUJBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFDbEMsa0NBQTRDO0FBRTVDLElBQU0sR0FBRyxHQUFHLElBQUksWUFBUyxFQUFFLENBQUE7QUFFM0IsVUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQU0sQ0FBQzs7O1FBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTs7O0tBQ2xDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQywrQkFBK0IsRUFBRSxVQUFNLENBQUM7OztRQUNyQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNwQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFBOzs7S0FDbEQsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLGdDQUFnQyxFQUFFLFVBQU0sQ0FBQzs7O1FBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtRQUN0RCxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUN4QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFBOzs7S0FDbEQsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLDBCQUEwQixFQUFFLFVBQU0sQ0FBQzs7O1FBQ2hDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTs7O0tBQ25CLENBQUMsQ0FBQSJ9