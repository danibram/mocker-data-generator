'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var iterate = function iterate(obj, res, currentPath) {
    var _this = this;

    if (!currentPath) {
        currentPath = [];
    }
    Object.keys(obj).map(function (k) {
        var value = obj[k];

        var path = currentPath.slice(0);
        path.push(k);

        if ((0, _utils.iamLastParent)(value)) {

            if (path) {
                if ((0, _utils.isArray)(value)) {
                    if (value[0] && value[0].virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                } else {
                    if (value.virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
            }

            var fieldCalculated = _this.proccessLeaf(value);

            if (!(0, _utils.isConditional)(k)) {
                res[k] = fieldCalculated;
            } else {
                var key = k.split(',');
                if ((0, _utils.evalWithContextData)(key[0], _this.result)) {
                    res[key[1]] = fieldCalculated;
                }
            }
        } else {
            res[k] = {};
            iterate.call(_this, value, res[k], path);
        }
    });
};

var Schema = function () {
    function Schema(name, cfg, options) {
        _classCallCheck(this, Schema);

        this.schema = cfg;
        this.name = name;
        this.options = options;

        // Temp fields
        this.db = {};
        this.result = {};
        this.virtualPaths = [];
    }

    _createClass(Schema, [{
        key: 'proccessLeaf',
        value: function proccessLeaf(field) {
            if ((0, _utils.isArray)(field)) {
                var fieldConfig = field[0];
                var array = [];
                var length = (0, _utils.fieldArrayCalcLength)(fieldConfig);
                for (var i = 0; i < length; i++) {
                    array.push(this.generateField(fieldConfig));
                }
                return array;
            } else {
                return this.generateField(field);
            }
        }
    }, {
        key: 'generateField',
        value: function generateField(config) {
            var object = this.result;
            var db = this.db;

            if (config.faker) {
                return (0, _utils.stringToFn)('faker', config.faker, db, object);
            } else if (config.chance) {
                return (0, _utils.stringToFn)('chance', config.chance, db, object);
            } else if (config.values) {
                var i = Math.floor(config.values.length * Math.random());
                return config.values[i];
            } else if (config.function) {
                return config.function.call({ object: object, faker: _faker2.default, chance: chance, db: db });
            } else if (config.static) {
                return config.static;
            } else if (config.hasOwnProperty('incrementalId')) {
                var n = 0;

                if (db[this.name] && db[this.name].length) {
                    n = db[this.name].length;
                }
                if (config.incrementalId === true) {
                    config.incrementalId = 0;
                }
                return n + parseInt(config.incrementalId);
            } else {
                return null;
            }
        }
    }, {
        key: 'buildSingle',
        value: function buildSingle(schema) {
            if ((0, _utils.iamLastParent)(schema)) {
                this.result = this.proccessLeaf(schema);
            } else {
                iterate.call(this, schema, this.result);
            }
        }
    }, {
        key: 'build',
        value: function build(db) {
            var _this2 = this;

            this.result = {};
            this.db = db ? db : {};
            this.db[this.name] = [];

            if (Number.isInteger(this.options)) {

                Array.apply(null, Array(this.options)).map(function () {
                    _this2.buildSingle(_this2.schema);
                    _this2.db[_this2.name].push(_this2.result);
                    _this2.result = {};
                });
            } else {
                (function () {
                    var f = _this2.options.uniqueField;
                    var entityConfig = _this2.schema;
                    var possibleValues = undefined;
                    if (f === '.') {
                        possibleValues = _this2.schema.values;
                    } else {
                        possibleValues = _this2.schema[f].values;
                    }

                    possibleValues.map(function (value) {

                        if (f === '.') {
                            return;
                        }

                        entityConfig[f] = { static: value };

                        _this2.buildSingle(entityConfig);
                        _this2.db[_this2.name].push(_this2.result);
                        _this2.result = {};
                    });
                })();
            }

            return this.db[this.name];
        }
    }]);

    return Schema;
}();

exports.default = Schema;
//# sourceMappingURL=Schema.js.map