"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should be "/hello+ (world|to you)/"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.randexp({ randexp: /hello+ (world|to you)/ });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnJhbmRleHAuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLnJhbmRleHAuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBU0E7OztBQVRBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFFbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUUzQixVQUFJLENBQUMscUNBQXFDLEVBQUUsVUFBTSxDQUFDOzs7UUFDM0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFBO1FBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7OztLQUNsQyxDQUFDLENBQUEifQ==