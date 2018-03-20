"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should have context {object, db, faker, chance, casual, randexp}', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var ctx;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {};
        gen.object = {};
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        ctx.forEach(function (c) {
            var res = gen.eval({ eval: c });
            t.true(res !== undefined);
            t.true(res !== null);
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmV2YWwuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmV2YWwuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBaUJBOzs7QUFqQkEsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUdsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxrRUFBa0UsRUFBRSxVQUFNLENBQUM7OztRQUM1RSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNYLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBRVgsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUNsRSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNULElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQTtZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtRQUN4QixDQUFDLENBQUMsQ0FBQTs7O0tBQ0wsQ0FBQyxDQUFBIn0=