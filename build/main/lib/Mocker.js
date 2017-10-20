"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = require("./Schema");
var utils_1 = require("./utils");
var Mocker = /** @class */ (function () {
    function Mocker(options) {
        if (options === void 0) { options = {}; }
        this.schemas = [];
        this.DB = {};
        this.options = {};
        this.options = options;
        this.DB = {};
    }
    Mocker.prototype.schema = function (name, schema, options) {
        this.schemas.push(new Schema_1.Schema(name, schema, options));
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
    Mocker.prototype.build = function (cb) {
        this.schemas.reduce(function (acc, schema) {
            var instances;
            try {
                instances = schema.build(acc);
            }
            catch (e) {
                console.error(new Error(' Schema: "' + schema.name + '" ' + e));
            }
            // Clean virtuals
            if (schema.virtualPaths.length > 0) {
                instances.forEach(function (x) {
                    return utils_1.cleanVirtuals(schema.virtualPaths, x, {
                        strict: true,
                        symbol: ','
                    });
                });
            }
            // Add to db
            acc[schema.name] = instances;
            return acc;
        }, this.DB);
        if (cb) {
            return cb(this.DB);
        }
        else {
            return Promise.resolve(this.DB);
        }
    };
    return Mocker;
}());
exports.Mocker = Mocker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Nb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsaUNBQXVDO0FBTXZDO0lBS0ksZ0JBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUp4QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ3RCLE9BQUUsR0FBUSxFQUFFLENBQUE7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFBO1FBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUlELHNCQUFLLEdBQUwsVUFBTSxFQUF1QjtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzVCLElBQUksU0FBUyxDQUFBO1lBRWIsSUFBSSxDQUFDO2dCQUNELFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2pDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkUsQ0FBQztZQUVELGlCQUFpQjtZQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDZixPQUFBLHFCQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUU7d0JBQ2xDLE1BQU0sRUFBRSxJQUFJO3dCQUNaLE1BQU0sRUFBRSxHQUFHO3FCQUNkLENBQUM7Z0JBSEYsQ0FHRSxDQUNMLENBQUE7WUFDTCxDQUFDO1lBRUQsWUFBWTtZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFBO1lBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUE7UUFDZCxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRVgsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNMLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBNURELElBNERDO0FBNURZLHdCQUFNIn0=