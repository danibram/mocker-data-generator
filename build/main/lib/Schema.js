"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var Generator_1 = require("./Generator");
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
            var fieldCalculated = _this.proccessLeaf(value);
            if (!utils_1.isConditional(k)) {
                res[k] = fieldCalculated;
            }
            else {
                var key = k.split(',');
                if (utils_1.evalWithContextData(key[0], _this.object)) {
                    res[key[1]] = fieldCalculated;
                }
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
            var na = Array();
            if (fieldConfig_1.concat) {
                na = utils_1.evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = fieldConfig_1.concatStrict
                    ? Array.from(new Set(na)).slice() : na;
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
        var _this = this;
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
            'eval',
            'hasOne',
            'hasMany',
            'static',
            'function',
            'values',
            'incrementalId'
        ];
        generators.forEach(function (key) {
            try {
                if (cfg.hasOwnProperty(key)) {
                    result = _this[key].apply(_this, [cfg].concat(args));
                }
            }
            catch (e) {
                throw new Error('Error: "' + key + '" ' + e);
            }
        });
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
        this.DB[this.name] = [];
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
                    console.error('The field ' +
                        f_1 +
                        ', on the scheema ' +
                        this.name +
                        ' not exists.');
                    return this.DB[this.name];
                }
            }
            if (!utils_1.isArray(possibleValues)) {
                console.error('The field ' +
                    f_1 +
                    ', on the scheema ' +
                    this.name +
                    ' is not an array.');
                return this.DB[this.name];
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
            console.error('An string ' +
                this.options +
                ', is not recognized as a parameter.');
        }
        return this.DB[this.name];
    };
    return Schema;
}(Generator_1.Generator));
exports.Schema = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBUWdCO0FBRWhCLHlDQUF1QztBQUV2QyxJQUFJLE9BQU8sR0FBRyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVztJQUE5QixpQkFzQ2I7SUFyQ0csRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2YsV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVsQixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFWixFQUFFLENBQUMsQ0FBQyxxQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7b0JBQzNDLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFD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