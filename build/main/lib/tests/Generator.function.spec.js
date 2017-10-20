"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var gen = new _1.Generator();
ava_1.test('Normal Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return 'test';
            }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('ES6 Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () { return 'test'; }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should call function with context', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res, ctx;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return this;
            }
        });
        t.true(utils_1.isObject(res));
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        t.true(utils_1.isObject(res));
        ctx.forEach(function (c) { return t.true(res.hasOwnProperty(c)); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmZ1bmN0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL0dlbmVyYXRvci5mdW5jdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFzQ0E7OztBQXRDQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBQ2xDLGtDQUE0QztBQUU1QyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUM7OztRQUN2QixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNuQixRQUFRLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUNqQixDQUFDO1NBQ0osQ0FBQyxDQUFBO1FBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQTs7O0tBQ3pCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7UUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDbkIsUUFBUSxFQUFFLGNBQU0sT0FBQSxNQUFNLEVBQU4sQ0FBTTtTQUN6QixDQUFDLENBQUE7UUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFBOzs7S0FDekIsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLG1DQUFtQyxFQUFFLFVBQU0sQ0FBQzs7O1FBQ3pDLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ25CLFFBQVEsRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFBO1lBQ2YsQ0FBQztTQUNKLENBQUMsQ0FBQTtRQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUE7OztLQUNsRCxDQUFDLENBQUEifQ==