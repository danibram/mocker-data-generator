'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _Generator2 = require('./Generator');

var _Generator3 = _interopRequireDefault(_Generator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                if ((0, _utils.evalWithContextData)(key[0], _this.object)) {
                    res[key[1]] = fieldCalculated;
                }
            }
        } else {
            res[k] = {};
            iterate.call(_this, value, res[k], path);
        }
    });
};

var Schema = function (_Generator) {
    _inherits(Schema, _Generator);

    function Schema(name, cfg, options) {
        _classCallCheck(this, Schema);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Schema).call(this));

        _this2.schema = cfg;
        _this2.name = name;
        _this2.options = options;

        // Temp fields
        _this2.DB = {};
        _this2.object = {};
        _this2.virtualPaths = [];
        return _this2;
    }

    _createClass(Schema, [{
        key: 'proccessLeaf',
        value: function proccessLeaf(field) {
            var _this3 = this;

            if ((0, _utils.isArray)(field)) {
                var _ret = function () {
                    var fieldConfig = field[0];
                    var na = [];
                    var array = [];
                    if (fieldConfig.concat) {
                        na = (0, _utils.evalWithContextData)(fieldConfig.concat, _this3.object, _this3.DB);
                        //Strict Mode
                        na = fieldConfig.concatStrict ? [].concat(_toConsumableArray(new Set(na))) : na;
                    }

                    var length = (0, _utils.fieldArrayCalcLength)(fieldConfig, na.length);

                    Array.from(new Array(length)).map(function () {
                        array.push(_this3.generateField(fieldConfig));
                    });

                    return {
                        v: array.concat(na)
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return this.generateField(field);
            }
        }
    }, {
        key: 'generateField',
        value: function generateField(cfg) {
            var _this4 = this;

            var result = null;
            var generators = ['faker', 'chance', 'casual', 'randexp', 'self', 'db', 'hasOne', 'hasMany', 'static', 'function', 'values', 'incrementalId'];

            generators.map(function (key) {
                if (cfg.hasOwnProperty(key)) {
                    result = _this4[key](cfg);
                }
            });

            return result;
        }
    }, {
        key: 'buildSingle',
        value: function buildSingle(schema) {
            if ((0, _utils.iamLastParent)(schema)) {
                this.object = this.proccessLeaf(schema);
            } else {
                iterate.call(this, schema, this.object);
            }
        }
    }, {
        key: 'build',
        value: function build(db) {
            var _this5 = this;

            this.object = {};
            this.DB = db ? db : {};
            this.DB[this.name] = [];
            if (Number.isInteger(this.options)) {

                Array.from(new Array(this.options)).map(function () {
                    _this5.buildSingle(_this5.schema);
                    _this5.DB[_this5.name].push(_this5.object);
                    _this5.object = {};
                });
            } else if ((0, _utils.isObject)(this.options)) {
                var _ret2 = function () {
                    var f = _this5.options.uniqueField;
                    var entityConfig = _this5.schema;
                    var possibleValues = undefined;
                    if (f === '.') {
                        possibleValues = _this5.schema.values;
                    } else {
                        if (_this5.schema[f]) {
                            if ((0, _utils.isArray)(_this5.schema[f].values)) {
                                possibleValues = _this5.schema[f].values;
                            } else {
                                possibleValues = _this5.schema[f];
                            }
                        } else {
                            console.error('The field ' + f + ', on the scheema ' + _this5.name + ' not exists.');
                            return {
                                v: _this5.DB[_this5.name]
                            };
                        }
                    }

                    if (!(0, _utils.isArray)(possibleValues)) {
                        console.error('The field ' + f + ', on the scheema ' + _this5.name + ' is not an array.');
                        return {
                            v: _this5.DB[_this5.name]
                        };
                    }

                    possibleValues.map(function (value) {

                        if (f === '.') {
                            return;
                        }

                        entityConfig[f] = { static: value };

                        _this5.buildSingle(entityConfig);
                        _this5.DB[_this5.name].push(_this5.object);
                        _this5.object = {};
                    });
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            } else {
                console.error('An string ' + this.options + ', is not recognized as a parameter.');
            }
            return this.DB[this.name];
        }
    }]);

    return Schema;
}(_Generator3.default);

exports.default = Schema;
//# sourceMappingURL=Schema.js.map