"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var mock = new _1.Mocker();
ava_1.test('Should restart schemas and DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        mock.DB = { users: [] };
        t.true(Object.keys(mock.DB).length === 1);
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        mock.schema('users', {});
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 1);
        mock.restart();
        t.true(utils_1.isObject(mock.DB));
        t.true(Object.keys(mock.DB).length === 0);
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLnJlc3RhcnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvTW9ja2VyLnJlc3RhcnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBdUJBOzs7QUF2QkEsMkJBQTBCO0FBQzFCLDJCQUF1QztBQUN2QyxrQ0FBNEM7QUFFNUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFNLEVBQUUsQ0FBQTtBQUV6QixVQUFJLENBQUMsK0JBQStCLEVBQUUsVUFBTSxDQUFDOztRQUN6QyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBRXpDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFZCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFFekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQTs7O0tBQ3BDLENBQUMsQ0FBQSJ9