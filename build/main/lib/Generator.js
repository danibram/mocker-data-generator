"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
var tslib_1 = require("tslib");
// import * as c from 'casual-browserify'
var chance_1 = require("chance");
var f = require("faker");
var R = require("randexp");
var utils_1 = require("./utils");
var c = require('casual-browserify');
var ch = new chance_1.Chance();
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.faker = function (cfg) {
        var faker = f;
        var db = this.DB;
        var object = this.object;
        var re;
        var matches;
        var strFn;
        if (cfg.locale === '') {
            throw "Locale is empty \"" + cfg.locale + "\".";
        }
        if (cfg.locale) {
            var supportedLocales = Object.keys(faker.locales);
            if (supportedLocales.indexOf(cfg.locale) === -1) {
                throw "Locale \"" + cfg.locale + "\" is not supported by faker.";
            }
            faker = require('faker/locale/' + cfg.locale);
        }
        if (cfg.eval) {
            re = /(^[a-zA-Z.]*)/; // aZ.aZ
            matches = re.exec(cfg.faker);
            if (matches && matches.length === 2) {
                strFn = 'faker.' + cfg.faker;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.faker);
            if (!matches) {
                strFn = 'faker.' + cfg.faker + '()';
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser('faker', faker, cfg.faker);
        }
    };
    Generator.prototype.chance = function (cfg) {
        var chance = ch;
        if (cfg.eval) {
            var db = this.DB;
            var object = this.object;
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.chance);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'chance.' + cfg.chance;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.chance);
            if (!matches) {
                strFn = 'chance.' + cfg.chance + '()';
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser.call(chance, 'chance', chance, cfg.chance);
        }
    };
    Generator.prototype.casual = function (cfg) {
        var casual = c;
        if (cfg.eval) {
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.casual);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'casual.' + cfg.casual;
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser.call(casual, 'casual', casual, cfg.casual);
        }
    };
    Generator.prototype.randexp = function (cfg) {
        return new R(cfg.randexp).gen();
    };
    Generator.prototype.self = function (cfg) {
        var object = this.object;
        return cfg.eval
            ? eval('object.' + cfg.self)
            : utils_1.loopInside(this.object, cfg.self);
    };
    Generator.prototype.db = function (cfg) {
        var db = this.DB;
        if (cfg.eval) {
            return eval('db.' + cfg.db);
        }
        else {
            return utils_1.loopInside(this.DB, cfg.db);
        }
    };
    Generator.prototype.eval = function (cfg) {
        var db = this.DB;
        var object = this.object;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return eval(cfg.eval);
    };
    Generator.prototype.values = function (cfg) {
        var i = Math.floor(cfg.values.length * Math.random());
        return cfg.values[i];
    };
    Generator.prototype.function = function (cfg) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var object = this.object;
        var db = this.DB;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return (_a = cfg.function).call.apply(_a, tslib_1.__spreadArrays([{ object: object, db: db, faker: faker, chance: chance, casual: casual, randexp: randexp }], args));
    };
    Generator.prototype.static = function (cfg) {
        return cfg.static;
    };
    Generator.prototype.incrementalId = function (cfg) {
        var n = 0;
        var db = this.DB;
        if (db[this.name] && db[this.name].length) {
            n = db[this.name].length;
        }
        if (cfg.incrementalId === true) {
            cfg.incrementalId = '0';
        }
        return n + parseInt(cfg.incrementalId, 10);
    };
    Generator.prototype.hasOne = function (cfg) {
        var db = this.DB;
        var entity = null;
        if (cfg.uniqueDB) {
            var dbString = JSON.stringify(cfg.uniqueDB);
            for (var i = 0; i < db[cfg.hasOne].length; i++) {
                var element = db[cfg.hasOne][i];
                element = cfg.get
                    ? cfg.eval
                        ? eval('element.' + cfg.get)
                        : utils_1.loopInside(element, cfg.get)
                    : element;
                if (cfg.uniqueDB.length === 0 ||
                    dbString.indexOf(JSON.stringify(element)) < 0) {
                    entity = element;
                    break;
                }
            }
            if (entity === null) {
                throw "Can\u00B4t get unique data. Source \"" + cfg.hasOne + "\" has not enough data";
            }
        }
        else {
            var i = Math.floor(db[cfg.hasOne].length * Math.random());
            entity = db[cfg.hasOne][i];
            entity = cfg.get
                ? cfg.eval
                    ? eval('entity.' + cfg.get)
                    : utils_1.loopInside(entity, cfg.get)
                : entity;
        }
        return entity;
    };
    Generator.prototype.hasMany = function (cfg) {
        var _this = this;
        var amount = 1;
        var db = this.DB;
        var min = cfg.min || cfg.min === 0 ? cfg.min : 1;
        var max = cfg.max ? cfg.max : cfg.hasMany ? db[cfg.hasMany].length : 1;
        if (cfg.amount) {
            amount = cfg.amount;
        }
        else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var newCfg = {
            hasOne: cfg.hasMany,
            get: cfg.get ? cfg.get : undefined,
            eval: cfg.eval ? true : false
        };
        return cfg.unique
            ? Array.from(new Array(amount)).reduce(function (acc, val) { return tslib_1.__spreadArrays(acc, [
                _this.hasOne(tslib_1.__assign(tslib_1.__assign({}, newCfg), { uniqueDB: acc }))
            ]); }, [])
            : Array.from(new Array(amount)).map(function () { return _this.hasOne(newCfg); });
    };
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=Generator.js.map