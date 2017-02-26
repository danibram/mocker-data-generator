'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randexp = require('randexp');

var _randexp2 = _interopRequireDefault(_randexp);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ch = new _chance2.default();

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: 'faker',
        value: function faker(cfg) {
            var faker = _faker2.default;
            var db = this.DB;
            var object = this.object;

            var re = /(^[a-zA-Z.]*)/; //aZ.aZ
            var matches = re.exec(cfg.faker);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'faker.' + cfg.faker;
            }

            re = /\((.*?)\)/; //Match ()
            matches = re.exec(cfg.faker);
            if (!matches) {
                strFn = 'faker.' + cfg.faker + '()';
            }

            return eval(strFn);
        }
    }, {
        key: 'chance',
        value: function chance(cfg) {
            var chance = ch;
            var db = this.DB;
            var object = this.object;

            var re = /(^[a-zA-Z.]*)/; //aZ.aZ
            var matches = re.exec(cfg.chance);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'chance.' + cfg.chance;
            }

            re = /\((.*?)\)/; //Match ()
            matches = re.exec(cfg.chance);
            if (!matches) {
                strFn = 'chance.' + cfg.chance + '()';
            }

            return eval(strFn);
        }
    }, {
        key: 'casual',
        value: function casual(cfg) {
            var casual = _casual2.default;
            var re = /(^[a-zA-Z.]*)/; //aZ.aZ
            var matches = re.exec(cfg.casual);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'casual.' + cfg.casual;
            }

            return eval(strFn);
        }
    }, {
        key: 'randexp',
        value: function randexp(cfg) {
            return new _randexp2.default(cfg.randexp).gen();
        }
    }, {
        key: 'self',
        value: function self(cfg) {
            var object = this.object;
            return eval('object.' + cfg.self);
        }
    }, {
        key: 'db',
        value: function db(cfg) {
            var db = this.DB;
            return eval('db.' + cfg.db);
        }
    }, {
        key: 'eval',
        value: function _eval(cfg) {
            var db = this.DB;
            var object = this.object;
            var faker = _faker2.default;
            var chance = ch;
            var casual = _casual2.default;
            var randexp = _randexp2.default;

            return eval(cfg.eval);
        }
    }, {
        key: 'values',
        value: function values(cfg) {
            var i = Math.floor(cfg.values.length * Math.random());
            return cfg.values[i];
        }
    }, {
        key: 'function',
        value: function _function(cfg) {
            var _cfg$function;

            var object = this.object;
            var db = this.DB;
            var faker = _faker2.default;
            var chance = ch;
            var casual = _casual2.default;
            var randexp = _randexp2.default;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return (_cfg$function = cfg.function).call.apply(_cfg$function, [{ object: object, db: db, faker: faker, chance: chance, casual: casual, randexp: randexp }].concat(args));
        }
    }, {
        key: 'static',
        value: function _static(cfg) {
            return cfg.static;
        }
    }, {
        key: 'incrementalId',
        value: function incrementalId(cfg) {
            var n = 0;
            var db = this.DB;

            if (db[this.name] && db[this.name].length) {
                n = db[this.name].length;
            }
            if (cfg.incrementalId === true) {
                cfg.incrementalId = 0;
            }
            return n + parseInt(cfg.incrementalId);
        }
    }, {
        key: 'hasOne',
        value: function hasOne(cfg) {
            var db = this.DB;
            var i = Math.floor(db[cfg.hasOne].length * Math.random());
            var entity = db[cfg.hasOne][i];

            if (cfg.get) {
                return eval('entity.' + cfg.get);
            } else {
                return entity;
            }
        }
    }, {
        key: 'hasMany',
        value: function hasMany(cfg) {
            var _this = this;

            var amount = 1;
            var db = this.DB;

            var min = cfg.min ? cfg.min : 1;
            var max = cfg.max ? cfg.max : db[cfg.hasMany].length;

            if (cfg.amount) {
                amount = cfg.amount;
            } else {
                amount = Math.floor(Math.random() * (max - min + 1)) + min;
            }

            return Array.from(new Array(amount)).map(function () {
                return _this.hasOne({ hasOne: cfg.hasMany });
            });
        }
    }]);

    return Generator;
}();

exports.default = Generator;
//# sourceMappingURL=Generator.js.map