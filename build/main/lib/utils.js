"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopInside = exports.fnParser = exports.cleanVirtuals = exports.isConditional = exports.iamLastParent = exports.iamLastChild = exports.fieldArrayCalcLength = exports.evalWithContextData = exports.isObject = exports.isArray = void 0;
var tslib_1 = require("tslib");
var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
exports.isArray = isArray;
var isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
exports.isObject = isObject;
var evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
exports.evalWithContextData = evalWithContextData;
var fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
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
exports.fieldArrayCalcLength = fieldArrayCalcLength;
var iamLastChild = function (parent, k) {
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
exports.iamLastChild = iamLastChild;
var iamLastParent = function (obj) {
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
exports.iamLastParent = iamLastParent;
var isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
exports.isConditional = isConditional;
var cleanVirtuals = function (paths, object, options) {
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
exports.cleanVirtuals = cleanVirtuals;
var fnParser = function (name, fn, cfg) {
    var _a = cfg.split('('), body = _a[0], args = _a[1];
    body = body.split('.');
    var func = body.reduce(function (acc, val) {
        if (!acc[val]) {
            throw "This " + name + " method doesnt exists '" + cfg + "'.";
        }
        return acc[val];
    }, fn);
    if (!args) {
        if (typeof func === 'function') {
            return func.call(this);
        }
        else {
            return func;
        }
    }
    var _b = args.split(')'), args2 = _b[0], mods = _b[1];
    args = args2
        ? args2[0] === '{'
            ? [JSON.parse(args2)]
            : args2.split(',')
        : [];
    var result = func.call.apply(func, tslib_1.__spreadArrays([this], args));
    if (!mods || mods === '') {
        return result;
    }
    mods = mods
        .split('[')
        .filter(function (i) { return i !== ''; })
        .map(function (i) { return i.slice(0, -1); })
        .map(function (i) { return (i[0] === '"' ? i.slice(1, -1) : parseInt(i, 10)); });
    return mods.reduce(function (acc, val) {
        if (!acc[val]) {
            throw "'" + acc + "' doesnt have key '" + val + "'.";
        }
        return acc[val];
    }, result);
};
exports.fnParser = fnParser;
var loopInside = function (object, path) {
    var p = path.split('.');
    return p.reduce(function (acc, val) {
        if (acc[val] === null) {
            throw "'" + acc + "' doesnt have key '" + val + "'.";
        }
        return acc[val];
    }, object);
};
exports.loopInside = loopInside;
//# sourceMappingURL=utils.js.map