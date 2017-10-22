"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var values, res;
    return tslib_1.__generator(this, function (_a) {
        values = ['test', 'this', 'awesome', 'module'];
        res = gen.values({ values: values });
        t.true(typeof res === 'string');
        t.true(values.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnZhbHVlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IudmFsdWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQVlBOzs7QUFaQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBR2xDLElBQU0sR0FBRyxHQUFHLElBQUksWUFBUyxFQUFFLENBQUE7QUFFM0IsVUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7OztRQUNwQixNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM5QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQTtRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBOzs7S0FDbkMsQ0FBQyxDQUFBIn0=