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
export default Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUV2QztJQUdJO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksS0FBTTtRQUNOLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELHNCQUFHLEdBQUgsVUFBSSxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQWZELElBZUMifQ==