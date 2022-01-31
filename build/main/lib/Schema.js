"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var tslib_1 = require("tslib");
var Generator_1 = require("./Generator");
var utils_1 = require("./utils");
var iterate = function (obj, res, currentPath) {
    var _this = this;
    if (!currentPath) {
        currentPath = [];
    }
    Object.keys(obj).map(function (k) {
        var value = obj[k];
        var path = currentPath.slice(0);
        path.push(k);
        if (utils_1.iamLastParent(value)) {
            if (path) {
                if (utils_1.isArray(value)) {
                    if (value[0] && value[0].virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
                else {
                    if (value.virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
            }
            var key = '';
            if (!utils_1.isConditional(k)) {
                key = k;
            }
            else {
                var keykey = k.split(',');
                if (utils_1.evalWithContextData(keykey[0], _this.object)) {
                    key = keykey[1];
                }
            }
            if (key !== '') {
                res[key] = _this.proccessLeaf(value);
            }
        }
        else {
            res[k] = {};
            iterate.call(_this, value, res[k], path);
        }
    });
};
var Schema = /** @class */ (function (_super) {
    tslib_1.__extends(Schema, _super);
    function Schema(name, cfg, options) {
        var _this = _super.call(this) || this;
        _this.schema = cfg;
        _this.name = name;
        _this.options = options;
        // Temp fields
        _this.DB = {};
        _this.object = {};
        _this.virtualPaths = [];
        return _this;
    }
    Schema.prototype.proccessLeaf = function (field) {
        var _this = this;
        if (utils_1.isArray(field)) {
            var fieldConfig_1 = field[0];
            if (field.length > 1) {
                fieldConfig_1 = { values: field };
            }
            var na = Array();
            if (fieldConfig_1.concat) {
                na = utils_1.evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = fieldConfig_1.concatStrict
                    ? tslib_1.__spreadArrays(Array.from(new Set(na))) : na;
            }
            var length_1 = utils_1.fieldArrayCalcLength(fieldConfig_1, na.length, this);
            var array = Array.from(new Array(length_1)).reduce(function (acc, el, index) {
                var self = acc.slice(0);
                acc.push(_this.generateField(fieldConfig_1, index, length_1, self));
                return acc;
            }, []);
            return array.concat(na);
        }
        else {
            return this.generateField(field);
        }
    };
    Schema.prototype.generateField = function (cfg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = {};
        var generators = [
            'faker',
            'chance',
            'casual',
            'randexp',
            'self',
            'db',
            'hasOne',
            'hasMany',
            'static',
            'function',
            'values',
            'incrementalId'
        ];
        var keys = Object.keys(cfg);
        var key = keys.reduce(function (acc, val) {
            if (generators.includes(val)) {
                acc = val;
            }
            return acc;
        }, 'noKey');
        if (key === 'noKey' && !keys.includes('eval')) {
            throw "Error: Cant find key, please check model and use one of this [" + generators.join(',') + "]";
        }
        if (keys.includes('eval') && keys.length === 1) {
            key = 'eval';
        }
        try {
            result = this[key].apply(this, tslib_1.__spreadArrays([cfg], args));
        }
        catch (e) {
            throw 'Error: "' + key + '" ' + e;
        }
        return result;
    };
    Schema.prototype.buildSingle = function (schema) {
        if (utils_1.iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema);
        }
        else {
            iterate.call(this, schema, this.object);
        }
    };
    Schema.prototype.build = function (db) {
        var _this = this;
        if (db === void 0) { db = {}; }
        this.object = {};
        this.DB = db ? db : {};
        this.DB[this.name] = this.DB[this.name] ? this.DB[this.name] : [];
        if (Number.isInteger(this.options)) {
            Array.from(new Array(this.options)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (utils_1.isObject(this.options) && this.options.max) {
            var max = this.options.max;
            var min = this.options.min ? this.options.min : 0;
            var length = Math.floor(Math.random() * (max - min + 1) + min);
            Array.from(new Array(length)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (utils_1.isObject(this.options) && this.options.uniqueField) {
            var f_1 = this.options.uniqueField;
            var entityConfig_1 = this.schema;
            var possibleValues = void 0;
            if (f_1 === '.') {
                possibleValues = this.schema.values;
            }
            else {
                if (this.schema[f_1]) {
                    if (utils_1.isArray(this.schema[f_1].values)) {
                        possibleValues = this.schema[f_1].values;
                    }
                    else {
                        possibleValues = this.schema[f_1];
                    }
                }
                else {
                    throw "The field \"" + f_1 + "\" not exists.";
                }
            }
            if (!utils_1.isArray(possibleValues)) {
                throw "The posible values value is not an Array";
            }
            possibleValues.map(function (value) {
                if (f_1 === '.') {
                    return;
                }
                entityConfig_1[f_1] = { static: value };
                _this.buildSingle(entityConfig_1);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else {
            throw "An string \"" + this.options + "\" is not recognized as a parameter.";
        }
        return this.DB[this.name];
    };
    return Schema;
}(Generator_1.Generator));
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map