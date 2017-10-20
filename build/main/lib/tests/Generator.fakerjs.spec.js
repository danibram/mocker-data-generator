"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var fakerJS = require("faker");
var gen = new _1.Generator();
var mocker = new _1.Mocker();
ava_1.test('Should be "lorem.words"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words()"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words(1)"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "random.number({"max": 1})"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"max": 1})' });
        t.true(typeof res === 'number');
        t.true(res <= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "random.number({"min": 1, "max": 2})"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"min": 1, "max": 2})' });
        t.true(typeof res === 'number');
        t.true(res <= 2);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words()[0]"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words(1)[0]""', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should use locale "address.streetAddress"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'address.streetAddress', locale: 'de_CH' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should use locale "address.streetAddress"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'address.streetAddress', locale: 'zh_CN' });
        t.true(typeof res === 'string');
        t.true(res.match(/[\u3400-\u9FBF]/) && res.match(/[\u3400-\u9FBF]/).length > 0);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should use locale "address.streetAddress"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.faker({ faker: 'address.streetAddress', locale: 'zh_CN' });
        res = gen.faker({ faker: 'address.streetAddress' });
        t.true(typeof res === 'string');
        t.true(res.match(/[\u3400-\u9FBF]/) === null);
        return [2 /*return*/];
    });
}); });
ava_1.test('Faker lang not affect others', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var street, schema, data, res;
    return tslib_1.__generator(this, function (_a) {
        street = {
            str1: { faker: 'address.streetAddress', locale: 'zh_CN' },
            str2: { faker: 'address.streetAddress' }
        };
        schema = new _1.Schema('street', street, 1);
        data = schema.build();
        res = data[0];
        t.true(typeof res.str1 === 'string');
        t.true(typeof res.str2 === 'string');
        t.true(res.str1.match(/[\u3400-\u9FBF]/).length > 0);
        t.true(res.str2.match(/[\u3400-\u9FBF]/) === null);
        return [2 /*return*/];
    });
}); });
ava_1.test('Test all fakerJS locales', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var supportedLocales;
    return tslib_1.__generator(this, function (_a) {
        supportedLocales = Object.keys(fakerJS.locales);
        supportedLocales.forEach(function (locale) {
            var res = gen.faker({ faker: 'address.streetAddress', locale: locale });
            t.true(typeof res === 'string');
        });
        return [2 /*return*/];
    });
}); });
ava_1.test('Not supported locale @', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var noLocaleSupported, street, schema;
    return tslib_1.__generator(this, function (_a) {
        noLocaleSupported = '@';
        street = {
            str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
        };
        schema = new _1.Schema('street', street, 1);
        t.throws(function () { return schema.build(); }, "Error: \"faker\" Locale '" + noLocaleSupported + "' is not supported by faker.");
        return [2 /*return*/];
    });
}); });
ava_1.test('Not supported locale empty "" ', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var noLocaleSupported, street, schema;
    return tslib_1.__generator(this, function (_a) {
        noLocaleSupported = '';
        street = {
            str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
        };
        schema = new _1.Schema('street', street, 1);
        t.throws(function () { return schema.build(); }, "Error: \"faker\" Locale is empty '" + noLocaleSupported + "'.");
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmZha2VyanMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmZha2VyanMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBbUhBOzs7QUFuSEEsMkJBQTBCO0FBQzFCLDJCQUFrRDtBQUNsRCwrQkFBZ0M7QUFFaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUMzQixJQUFNLE1BQU0sR0FBRyxJQUFJLFNBQU0sRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7OztRQUMvQixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7OztLQUNsQyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsMkJBQTJCLEVBQUUsVUFBTSxDQUFDOzs7UUFDakMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQU0sQ0FBQzs7O1FBQ2xDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHVDQUF1QyxFQUFFLFVBQU0sQ0FBQzs7O1FBQzdDLEdBQUcsR0FBRyxH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