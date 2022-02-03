"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var fakerJS = require("faker");
var __1 = require("../../");
var gen = new __1.Generator();
var mocker = new __1.Mocker();
ava_1.default('Should be "lorem.words"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('[eval] Should be "lorem.words"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words', eval: true });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "lorem.words()"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "lorem.words(1)"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "random.number({"max": 1})"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"max": 1})' });
        t.true(typeof res === 'number');
        t.true(res <= 1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "random.number({"min": 1, "max": 2})"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"min": 1, "max": 2})' });
        t.true(typeof res === 'number');
        t.true(res <= 2);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "lorem.words()[0]"', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should be "lorem.words(1)[0]""', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should use locale "address.streetAddress" (de_CH)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'address.streetAddress', locale: 'de_CH' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.default('Should use locale "address.streetAddress" (zh_CN)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'address.streetAddress', locale: 'zh_CN' });
        t.true(typeof res === 'string');
        t.true(res.match(/[\u3400-\u9FBF]/) && res.match(/[\u3400-\u9FBF]/).length > 0);
        return [2 /*return*/];
    });
}); });
ava_1.default('Faker lang not affect others', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var street, schema, data, res;
    return tslib_1.__generator(this, function (_a) {
        street = {
            str1: { faker: 'address.streetAddress', locale: 'zh_CN' },
            str2: { faker: 'address.streetAddress' }
        };
        schema = new __1.Schema('street', street, 1);
        data = schema.build();
        res = data[0];
        t.true(typeof res.str1 === 'string');
        t.true(typeof res.str2 === 'string');
        t.true(res.str1.match(/[\u3400-\u9FBF]/).length > 0);
        t.true(res.str2.match(/[\u3400-\u9FBF]/) === null);
        return [2 /*return*/];
    });
}); });
ava_1.default('Test all fakerJS locales', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var supportedLocales, loc;
    return tslib_1.__generator(this, function (_a) {
        supportedLocales = Object.keys(fakerJS.locales);
        try {
            supportedLocales.forEach(function (locale) {
                loc = locale;
                var res = gen.faker({
                    faker: 'address.streetAddress',
                    locale: locale
                });
                t.true(typeof res === 'string');
            });
        }
        catch (e) {
            console.log(e);
            console.log("Locale \"" + loc + "\" doesnt have address...");
        }
        return [2 /*return*/];
    });
}); });
ava_1.default('Not supported locale @', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var noLocaleSupported, street, schema;
    return tslib_1.__generator(this, function (_a) {
        noLocaleSupported = '@';
        street = {
            str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
        };
        schema = new __1.Schema('street', street, 1);
        try {
            schema.build();
        }
        catch (e) {
            t.deepEqual(e, 'Error: "faker" Locale "@" is not supported by faker.');
        }
        return [2 /*return*/];
    });
}); });
ava_1.default('Not supported locale empty "" ', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var noLocaleSupported, street, schema;
    return tslib_1.__generator(this, function (_a) {
        noLocaleSupported = '';
        street = {
            str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
        };
        schema = new __1.Schema('street', street, 1);
        try {
            schema.build();
        }
        catch (e) {
            t.deepEqual(e, "Error: \"faker\" Locale is empty \"" + noLocaleSupported + "\".");
        }
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Generator.fakerjs.spec.js.map