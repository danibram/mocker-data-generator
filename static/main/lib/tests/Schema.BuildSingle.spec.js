"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var schema = new _1.Schema('test', {}, {});
ava_1.test('Array: It should recognise static field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        schema.buildSingle({ static: 'hello' });
        t.true(schema.object === 'hello');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLkJ1aWxkU2luZ2xlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL1NjaGVtYS5CdWlsZFNpbmdsZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFVQTs7O0FBVkEsMkJBQTBCO0FBQzFCLDJCQUErQjtBQUcvQixJQUFJLE1BQU0sR0FBRyxJQUFJLFNBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRXZDLFVBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFNLENBQUM7O1FBQ25ELE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUE7OztLQUNwQyxDQUFDLENBQUEifQ==