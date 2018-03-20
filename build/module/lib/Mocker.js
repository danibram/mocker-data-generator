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
        }
        catch (e) {
            return cb ? cb(e) : Promise.reject(e);
        }
        return cb ? cb(null, this.DB) : Promise.resolve(this.DB);
    };
    return Mocker;
}());
export { Mocker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Nb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBTXZDO0lBS0ksZ0JBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUp4QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ3RCLE9BQUUsR0FBUSxFQUFFLENBQUE7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFBO1FBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUlELHNCQUFLLEdBQUwsVUFBTSxFQUE2QztRQUMvQyxJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUM1QixJQUFJLFNBQVMsQ0FBQTtnQkFFYixJQUFJLENBQUM7b0JBQ0QsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2pDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDekQsQ0FBQztnQkFFRCxpQkFBaUI7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3dCQUNmLE9BQUEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFOzRCQUNsQyxNQUFNLEVBQUUsSUFBSTs0QkFDWixNQUFNLEVBQUUsR0FBRzt5QkFDZCxDQUFDO29CQUhGLENBR0UsQ0FDTCxDQUFBO2dCQUNMLENBQUM7Z0JBRUQsWUFBWTtnQkFDWixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQTtnQkFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQTtZQUNkLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDZixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6QyxDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQTVERCxJQTREQyJ9