"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
gen.name = 'user';
gen.DB = { user: [{ id: 0 }, { id: 1 }, { id: 2 }] };
ava_1.test('Incremental Id true', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.incrementalId({ incrementalId: true });
        t.true(res === 3);
        return [2 /*return*/];
    });
}); });
ava_1.test('Incremental Id default value', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.incrementalId({ incrementalId: '2' });
        t.true(res === 5);
        res = gen.incrementalId({ incrementalId: '9' });
        t.true(res === 12);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmluY3JlbWVudGFsSWQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmluY3JlbWVudGFsSWQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBMEJBOzs7QUExQkEsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUdsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBO0FBQ2pCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7QUFFcEQsVUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQU0sQ0FBQzs7O1FBTzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7OztLQUNwQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsOEJBQThCLEVBQUUsVUFBTSxDQUFDOzs7UUFDcEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFBOzs7S0FDckIsQ0FBQyxDQUFBIn0=