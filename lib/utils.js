'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.conditionalField = exports.calculateKey = exports.cleanVirtuals = exports.isConditional = exports.iamLastChild = exports.iamLastParent = exports.stringToFn = exports.randexpWrapper = exports.fieldArrayCalcLength = exports.fnCallWithContext = exports.evalWithContextData = exports.isObject = exports.isArray = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

var _randexp = require('randexp');

var _randexp2 = _interopRequireDefault(_randexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var casual = _casual2.default;
var faker = _faker2.default;
var chance = new _chance2.default();

var isArray = exports.isArray = function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

var isObject = exports.isObject = function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};

var evalWithContextData = exports.evalWithContextData = function evalWithContextData(key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};

var fnCallWithContext = exports.fnCallWithContext = function fnCallWithContext(fn, object, db) {
    return fn.call({ object: object, db: db, faker: faker, chance: chance, casual: casual });
};

var fieldArrayCalcLength = exports.fieldArrayCalcLength = function fieldArrayCalcLength(config, fixedArrayLength) {
    var length = undefined;
    if (config.fixedLength) {
        length = config.length - fixedArrayLength;
    } else {
        length = Math.floor(Math.random() * config.length + 1);
    }
    return length;
};

var randexpWrapper = exports.randexpWrapper = function randexpWrapper(randexpString) {
    return new _randexp2.default(randexpString).gen();
};

var stringToFn = exports.stringToFn = function stringToFn(moduleName, string, object, db) {

    var re = /(^[a-zA-Z.]*)/; //aZ.aZ
    var matches = re.exec(string);
    var strFn = undefined;
    if (matches && matches.length === 2) {
        strFn = moduleName + '.' + string;
    }

    re = /\((.*?)\)/; //Match ()
    matches = re.exec(string);
    if (!matches && ['casual', 'db', 'object'].indexOf(moduleName) < 0) {
        strFn = moduleName + '.' + string + '()';
    }

    return eval(strFn);
};

var iamLastParent = exports.iamLastParent = function iamLastParent(obj) {
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
    } else {
        last = true;
    }
    return last;
};

var iamLastChild = exports.iamLastChild = function iamLastChild(parent, k) {
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
    } else {
        return !isObject(parent[k]);
    }
};

var isConditional = exports.isConditional = function isConditional(str) {
    var arr = str.split(',');
    return arr.length > 1;
};

var cleanVirtuals = exports.cleanVirtuals = function cleanVirtuals(paths, object, options) {

    //clean specific paths
    var objectCleaner = regeneratorRuntime.mark(function objectCleaner(path, obj, options) {
        var lvls, dest, i, field;
        return regeneratorRuntime.wrap(function objectCleaner$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        lvls = path.split(options.symbol);
                        dest = obj;

                        if (!(!lvls || lvls.length === 0)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return');

                    case 4:
                        if (obj) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return');

                    case 6:
                        i = 0;

                    case 7:
                        if (!(i < lvls.length)) {
                            _context.next = 19;
                            break;
                        }

                        field = lvls[i];

                        if (!(i === lvls.length - 1 && dest[field])) {
                            _context.next = 15;
                            break;
                        }

                        if (!(Object.getOwnPropertyNames(dest[field]).length < 1)) {
                            _context.next = 13;
                            break;
                        }

                        delete dest[field];
                        return _context.abrupt('break', 19);

                    case 13:
                        _context.next = 16;
                        break;

                    case 15:
                        dest = dest[field];

                    case 16:
                        i++;
                        _context.next = 7;
                        break;

                    case 19:
                        lvls.pop();

                        if (!(lvls.length > 0)) {
                            _context.next = 24;
                            break;
                        }

                        return _context.delegateYield(objectCleaner(lvls.join(options.symbol), obj, options), 't0', 22);

                    case 22:
                        _context.next = 25;
                        break;

                    case 24:
                        return _context.abrupt('return');

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, objectCleaner, this);
    });

    var forEachPath = regeneratorRuntime.mark(function forEachPath(path, object, options) {
        var lvls, dest, i, _field;

        return regeneratorRuntime.wrap(function forEachPath$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        lvls = path.split(options.symbol);
                        dest = object;
                        i = 0;

                    case 3:
                        if (!(i < lvls.length)) {
                            _context2.next = 14;
                            break;
                        }

                        _field = lvls[i];

                        if (!(i === lvls.length - 1)) {
                            _context2.next = 10;
                            break;
                        }

                        // delete specific path
                        delete dest[_field];
                        //clean specific path
                        return _context2.delegateYield(objectCleaner(path, object, options), 't0', 8);

                    case 8:
                        _context2.next = 11;
                        break;

                    case 10:
                        dest = dest[_field];

                    case 11:
                        i++;
                        _context2.next = 3;
                        break;

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, forEachPath, this);
    });

    var forPaths = regeneratorRuntime.mark(function forPaths(paths, object, options) {
        var i, path;
        return regeneratorRuntime.wrap(function forPaths$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        i = 0;

                    case 1:
                        if (!(i < paths.length)) {
                            _context3.next = 7;
                            break;
                        }

                        path = paths[i];
                        return _context3.delegateYield(forEachPath(path, object, options), 't0', 4);

                    case 4:
                        i++;
                        _context3.next = 1;
                        break;

                    case 7:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, forPaths, this);
    });

    var it = forPaths(paths, object, options);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = it[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var res = _step.value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return object;
};

var calculateKey = exports.calculateKey = function calculateKey(k) {
    if (!isConditional(k)) {
        return k;
    } else {
        var key = k.split(',');
        return key[0];
    }
};

var conditionalField = exports.conditionalField = function conditionalField(acc, k, result, object) {
    if (!isConditional(k)) {
        acc[k] = result;
    } else {
        var key = k.split(',');
        if (evalWithContextData(key[0], object)) {
            acc[key[1]] = result;
        }
    }
    return;
};
//# sourceMappingURL=utils.js.map