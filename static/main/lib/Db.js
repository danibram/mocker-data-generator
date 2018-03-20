"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseSymbol = Symbol('database');
var Database = /** @class */ (function () {
    function Database() {
        this.db = new Map();
    }
    Database.prototype.get = function (Model) {
        var s = this[databaseSymbol];
        return Model ? s.get(Model) : s;
    };
    Database.prototype.add = function (Model, data) {
        this.get().set(Model, data);
    };
    return Database;
}());
exports.default = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRXZDO0lBR0k7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUVELHNCQUFHLEdBQUgsVUFBSSxLQUFNO1FBQ04sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsc0JBQUcsR0FBSCxVQUFJLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQyJ9