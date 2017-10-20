import * as tslib_1 from "tslib";
import { isObject, isArray, iamLastParent, fieldArrayCalcLength, evalWithContextData, isConditional } from './utils';
import { Generator } from './Generator';
var iterate = function (obj, res, currentPath) {
    var _this = this;
    if (!currentPath) {
        currentPath = [];
    }
    Object.keys(obj).map(function (k) {
        var value = obj[k];
        var path = currentPath.slice(0);
        path.push(k);
        if (iamLastParent(value)) {
            if (path) {
                if (isArray(value)) {
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
            if (!isConditional(k)) {
                res[k] = fieldCalculated;
            }
            else {
                var key = k.split(',');
                if (evalWithContextData(key[0], _this.object)) {
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
        if (isArray(field)) {
            var fieldConfig_1 = field[0];
            var na = Array();
            if (fieldConfig_1.concat) {
                na = evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = fieldConfig_1.concatStrict
                    ? Array.from(new Set(na)).slice() : na;
            }
            var length_1 = fieldArrayCalcLength(fieldConfig_1, na.length, this);
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
        if (iamLastParent(schema)) {
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
        else if (isObject(this.options) && this.options.max) {
            var max = this.options.max;
            var min = this.options.min ? this.options.min : 0;
            var length = Math.floor(Math.random() * (max - min + 1) + min);
            Array.from(new Array(length)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (isObject(this.options) && this.options.uniqueField) {
            var f_1 = this.options.uniqueField;
            var entityConfig_1 = this.schema;
            var possibleValues = void 0;
            if (f_1 === '.') {
                possibleValues = this.schema.values;
            }
            else {
                if (this.schema[f_1]) {
                    if (isArray(this.schema[f_1].values)) {
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
            if (!isArray(possibleValues)) {
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
}(Generator));
export { Schema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxRQUFRLEVBQ1IsT0FBTyxFQUNQLGFBQWEsRUFFYixvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGFBQWEsRUFDaEIsTUFBTSxTQUFTLENBQUE7QUFFaEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUV2QyxJQUFJLE9BQU8sR0FBRyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVztJQUE5QixpQkFzQ2I7SUFyQ0csRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2YsV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVsQixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFWixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFF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