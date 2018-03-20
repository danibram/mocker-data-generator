"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.static({ static: 'test' });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnN0YXRpYy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3Iuc3RhdGljLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQVdBOzs7QUFYQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBR2xDLElBQU0sR0FBRyxHQUFHLElBQUksWUFBUyxFQUFFLENBQUE7QUFFM0IsVUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7OztRQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUE7OztLQUN6QixDQUFDLENBQUEifQ==