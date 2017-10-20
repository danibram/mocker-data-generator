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
        if (cb) {
            return cb(this.DB);
        }
        else {
            return Promise.resolve(this.DB);
        }
    };
    return Mocker;
}());
export { Mocker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Nb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBTXZDO0lBS0ksZ0JBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUp4QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ3RCLE9BQUUsR0FBUSxFQUFFLENBQUE7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFBO1FBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUlELHNCQUFLLEdBQUwsVUFBTSxFQUF1QjtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzVCLElBQUksU0FBUyxDQUFBO1lBRWIsSUFBSSxDQUFDO2dCQUNELFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2pDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkUsQ0FBQztZQUVELGlCQUFpQjtZQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDZixPQUFBLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRTt3QkFDbEMsTUFBTSxFQUFFLElBQUk7d0JBQ1osTUFBTSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQztnQkFIRixDQUdFLENBQ0wsQ0FBQTtZQUNMLENBQUM7WUFFRCxZQUFZO1lBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUE7WUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNkLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFWCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUE1REQsSUE0REMifQ==