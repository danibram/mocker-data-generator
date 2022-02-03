import { Schema } from './Schema';
import { cleanVirtuals } from './utils';
var Mocker = /** @class */ (function () {
    function Mocker(options) {
        if (options === void 0) { options = {}; }
        this.schemas = [];
        this.DB = {};
        this.options = {};
        this.options = options;
        this.DB = {};
    }
    Mocker.prototype.seed = function (name, data) {
        this.DB[name] = data;
        return this;
    };
    Mocker.prototype.schema = function (name, schema, options) {
        this.schemas.push(new Schema(name, schema, options));
        return this;
    };
    Mocker.prototype.reset = function () {
        this.DB = {};
        return this;
    };
    Mocker.prototype.restart = function () {
        this.DB = {};
        this.schemas = [];
        return this;
    };
    Mocker.prototype._buildSync = function () {
        this.schemas.reduce(function (acc, schema) {
            var instances;
            try {
                instances = schema.build(acc);
            }
            catch (e) {
                throw new Error('Schema: "' + schema.name + '" ' + e);
            }
            // Clean virtuals
            if (schema.virtualPaths.length > 0) {
                instances.forEach(function (x) {
                    return cleanVirtuals(schema.virtualPaths, x, {
                        strict: true,
                        symbol: ','
                    });
                });
            }
            // Add to db
            acc[schema.name] = instances;
            return acc;
        }, this.DB);
    };
    Mocker.prototype.buildSync = function () {
        this._buildSync();
        return this.DB;
    };
    Mocker.prototype.build = function (cb) {
        try {
            this._buildSync();
        }
        catch (e) {
            return cb ? cb(e) : Promise.reject(e);
        }
        return cb ? cb(null, this.DB) : Promise.resolve(this.DB);
    };
    return Mocker;
}());
export { Mocker };
//# sourceMappingURL=Mocker.js.map