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
        try {
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
        }
        catch (e) {
            return cb ? cb(e) : Promise.reject(e);
        }
        return cb ? cb(null, this.DB) : Promise.resolve(this.DB);
    };
    return Mocker;
}());
exports.Mocker = Mocker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Nb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsaUNBQXVDO0FBTXZDO0lBS0ksZ0JBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUp4QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ3RCLE9BQUUsR0FBUSxFQUFFLENBQUE7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFBO1FBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUlELHNCQUFLLEdBQUwsVUFBTSxFQUE2QztRQUMvQyxJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUM1QixJQUFJLFNBQVMsQ0FBQTtnQkFFYixJQUFJLENBQUM7b0JBQ0QsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2pDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDekQsQ0FBQztnQkFFRCxpQkFBaUI7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3dCQUNmLE9BQUEscUJBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRTs0QkFDbEMsTUFBTSxFQUFFLElBQUk7NEJBQ1osTUFBTSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQztvQkFIRixDQUdFLENBQ0wsQ0FBQTtnQkFDTCxDQUFDO2dCQUVELFlBQVk7Z0JBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUE7Z0JBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUE7WUFDZCxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2YsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekMsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksd0JBQU0ifQ==