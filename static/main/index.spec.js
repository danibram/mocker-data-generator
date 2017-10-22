"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("./");
var lib = require("./");
ava_1.test('functions can be used without es imports', function (t) {
    t.true(typeof _1.default === 'function');
    t.true(typeof lib.mocker === 'function');
    t.true(typeof lib.Mocker === 'function');
    t.true(typeof lib.Generator === 'function');
    t.true(typeof lib.Schema === 'function');
});
ava_1.test('Mocker: exists all methods', function (t) {
    var m = _1.default();
    var methods = ['schema', 'build', 'reset', 'restart'];
    methods.forEach(function (method) { return t.true(typeof m[method] === 'function'); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTBCO0FBQzFCLHVCQUF1QjtBQUN2Qix3QkFBeUI7QUFFekIsVUFBSSxDQUFDLDBDQUEwQyxFQUFFLFVBQUEsQ0FBQztJQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sVUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQUEsQ0FBQztJQUNoQyxJQUFJLENBQUMsR0FBRyxVQUFNLEVBQUUsQ0FBQTtJQUVoQixJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3JELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUE7QUFDdEUsQ0FBQyxDQUFDLENBQUEifQ==