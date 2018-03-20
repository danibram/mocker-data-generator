"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var mock = new _1.Mocker();
ava_1.test('Should reset DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        mock.DB = { users: [] };
        t.true(Object.keys(mock.DB).length === 1);
        mock.reset();
        t.true(utils_1.isObject(mock.DB));
        t.true(Object.keys(mock.DB).length === 0);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLnJlc2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL01vY2tlci5yZXNldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFhQTs7O0FBYkEsMkJBQTBCO0FBQzFCLDJCQUF1QztBQUN2QyxrQ0FBNEM7QUFFNUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFNLEVBQUUsQ0FBQTtBQUV6QixVQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBTSxDQUFDOztRQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQTs7O0tBQzVDLENBQUMsQ0FBQSJ9