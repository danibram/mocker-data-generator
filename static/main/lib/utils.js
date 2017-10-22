"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
exports.isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
exports.evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
exports.fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
    var length;
    if (typeof config.length === 'function') {
        length = config.length.call(schema);
    }
    else if (config.fixedLength) {
        length = config.length - fixedArrayLength;
    }
    else {
        length = Math.floor(Math.random() * config.length + 1);
    }
    return length;
};
exports.iamLastChild = function (parent, k) {
    if (exports.isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !exports.isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !exports.isObject(parent[k]);
    }
};
exports.iamLastParent = function (obj) {
    var last = false;
    if (exports.isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = exports.iamLastChild(obj, k);
            if (!last) {
                break;
            }
        }
    }
    else {
        last = true;
    }
    return last;
};
exports.isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
exports.cleanVirtuals = function (paths, object, options) {
    // clean specific paths
    var objectCleaner = function (path, obj, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = obj;
                    if (!lvls || lvls.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!obj) {
                        return [2 /*return*/];
                    }
                    for (i = 0; i < lvls.length; i++) {
                        field = lvls[i];
                        if (i === lvls.length - 1 && dest[field]) {
                            if (Object.getOwnPropertyNames(dest[field]).length < 1) {
                                delete dest[field];
                                break;
                            }
                        }
                        else {
                            dest = dest[field];
                        }
                    }
                    lvls.pop();
                    if (!(lvls.length > 0)) return [3 /*break*/, 2];
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(lvls.join(options.symbol), obj, options))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    };
    var forEachPath = function (path, object, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = object;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < lvls.length)) return [3 /*break*/, 5];
                    field = lvls[i];
                    if (!(i === lvls.length - 1)) return [3 /*break*/, 3];
                    // delete specific path
                    delete dest[field];
                    // clean specific path
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(path, object, options))];
                case 2:
                    // clean specific path
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    dest = dest[field];
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    var forPaths = function (paths, object, options) {
        var i, path;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < paths.length)) return [3 /*break*/, 4];
                    path = paths[i];
                    return [5 /*yield**/, tslib_1.__values(Array.from(forEachPath(path, object, options)))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    for (var _i = 0, _a = Array.from(forPaths(paths, object, options)); _i < _a.length; _i++) {
        var res = _a[_i];
    }
    return object;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsT0FBTyxHQUFHLFVBQVMsR0FBUTtJQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFBO0FBQ25FLENBQUMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLFVBQVMsR0FBUTtJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFBO0FBQ3BFLENBQUMsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUcsVUFBUyxHQUFXLEVBQUUsTUFBVSxFQUFFLEVBQUc7SUFDcEUsa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxvQkFBb0IsR0FBRyxVQUFTLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNO0lBQ3pFLElBQUksTUFBTSxDQUFBO0lBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUE7SUFDN0MsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxH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