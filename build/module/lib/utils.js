import * as tslib_1 from "tslib";
export var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
export var isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
export var evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
export var fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
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
export var iamLastChild = function (parent, k) {
    if (isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !isObject(parent[k]);
    }
};
export var iamLastParent = function (obj) {
    var last = false;
    if (isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = iamLastChild(obj, k);
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
export var isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
export var cleanVirtuals = function (paths, object, options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsVUFBUyxHQUFRO0lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFHLFVBQVMsR0FBUTtJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFBO0FBQ3BFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLFVBQVMsR0FBVyxFQUFFLE1BQVUsRUFBRSxFQUFHO0lBQ3BFLGtFQUFrRTtJQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQVMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU07SUFDekUsSUFBSSxNQUFNLENBQUE7SUFDVixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQTtJQUM3QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLEdBQUcsSUFB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