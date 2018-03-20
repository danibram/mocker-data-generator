"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should have access to object', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.object = { hello: 'world' };
        res = gen.self({ self: 'hello' });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should have access to object', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.object = { hello: 'world' };
        res = gen.self({ self: 'hello', eval: true });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnNlbGYuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLnNlbGYuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBbUJBOzs7QUFuQkEsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUdsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyw4QkFBOEIsRUFBRSxVQUFNLENBQUM7OztRQUN4QyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBRTNCLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsOEJBQThCLEVBQUUsVUFBTSxDQUFDOzs7UUFDeEMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUUzQixHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUE7OztLQUMxQixDQUFDLENBQUEifQ==