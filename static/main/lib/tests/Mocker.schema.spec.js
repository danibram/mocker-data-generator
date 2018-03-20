"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var mock = new _1.Mocker();
ava_1.test('Should load 1 schema', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 0);
        mock.schema('users', {});
        t.true(utils_1.isArray(mock.schemas));
        t.true(mock.schemas.length === 1);
        t.true(mock.schemas[0] instanceof _1.Schema);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLnNjaGVtYS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9Nb2NrZXIuc2NoZW1hLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQWNBOzs7QUFkQSwyQkFBMEI7QUFDMUIsMkJBQXVDO0FBQ3ZDLGtDQUE0QztBQUU1QyxJQUFNLElBQUksR0FBRyxJQUFJLFNBQU0sRUFBRSxDQUFBO0FBRXpCLFVBQUksQ0FBQyxzQkFBc0IsRUFBRSxVQUFNLENBQUM7O1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksU0FBTSxDQUFDLENBQUE7OztLQUM1QyxDQUFDLENBQUEifQ==