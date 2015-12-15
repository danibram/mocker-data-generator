(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("faker"), require("chance"), require("immutable"), require("babel-polyfill"));
	else if(typeof define === 'function' && define.amd)
		define(["faker", "chance", "immutable", "babel-polyfill"], factory);
	else if(typeof exports === 'object')
		exports["MockerData"] = factory(require("faker"), require("chance"), require("immutable"), require("babel-polyfill"));
	else
		root["MockerData"] = factory(root["faker"], root["chance"], root["immutable"], root["babel-polyfill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(9);

	var mocker = function mocker(config) {
	    return new _index2.default(config);
	};

	module.exports = mocker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(2);

	var utils = _interopRequireWildcard(_index);

	var _pluralizator = __webpack_require__(5);

	var _pluralizator2 = _interopRequireDefault(_pluralizator);

	var _cleanObject = __webpack_require__(6);

	var _cleanObject2 = _interopRequireDefault(_cleanObject);

	var _iterator = __webpack_require__(7);

	var iterator = _interopRequireWildcard(_iterator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import * as Chance from 'chance'
	var Immutable = __webpack_require__(8);
	var faker = __webpack_require__(3);
	var Chance = __webpack_require__(4);
	var chance = new Chance();

	var Mocker = (function () {
	    function Mocker(config) {
	        _classCallCheck(this, Mocker);

	        this.data = {};
	        this.entity = {};
	        this.initialData = null;
	        this.path = [];
	        this.virtual = false;
	        this.virtualPaths = [];
	        this.entityOutputName = '';
	        this.entityName = '';
	        this.config = Immutable.fromJS(config);
	    }

	    _createClass(Mocker, [{
	        key: 'generate',
	        value: function generate(entity, options) {
	            var _this = this;

	            var entityPlural = (0, _pluralizator2.default)(entity);
	            this.entityOutputName = entityPlural;
	            this.entityName = entity;
	            this.data[entityPlural] = [];
	            this.initialData = {};
	            return new Promise(function (resolve, reject) {
	                var finalCb = function finalCb() {
	                    resolve(_this.data);
	                };
	                try {
	                    if (Number.isInteger(options)) {
	                        utils.repeatFN(options, function (nxt) {
	                            var cfg = _this.config.toJS();
	                            if (utils.iamLastParent(cfg[entity])) {
	                                _this.generator(cfg[entity], function (data) {
	                                    _this.data[_this.entityOutputName].push(data);
	                                    nxt();
	                                });
	                            } else {
	                                _this.generateEntity(cfg[entity], function (data) {
	                                    _this.data[_this.entityOutputName].push(data);
	                                    nxt();
	                                });
	                            }
	                        }, finalCb);
	                    } else {
	                        (function () {
	                            var cfg = _this.config.toJS();
	                            var f = options.uniqueField;
	                            var possibleValues = undefined;
	                            if (f === '.') {
	                                possibleValues = cfg[entity].values;
	                            } else {
	                                possibleValues = cfg[entity][f].values;
	                            }
	                            var length = possibleValues.length;
	                            utils.eachSeries(possibleValues, function (k, nxt) {
	                                var cfg = _this.config.toJS();
	                                if (f === '.') {
	                                    _this.data[_this.entityOutputName].push(k);
	                                    return nxt();
	                                }
	                                cfg[entity][f] = { static: k };
	                                _this.generateEntity(cfg[entity], function (data) {
	                                    _this.data[_this.entityOutputName].push(data);
	                                    nxt();
	                                });
	                            }, finalCb);
	                        })();
	                    }
	                } catch (e) {
	                    console.log('Exception: mocker-data-generator');
	                    console.log('Error generating ' + entityPlural + ' : ' + e);
	                    console.log(e.stack);
	                    reject(e);
	                }
	            });
	        }
	    }, {
	        key: 'generateEntity',
	        value: function generateEntity(entityConfig, cb) {
	            var _this2 = this;

	            this.entity = Object.assign({}, entityConfig);
	            var proccessNode = function proccessNode(obj, k, value, path) {
	                if (path) {
	                    if (utils.isArray(value)) {
	                        if (value[1].virtual) {
	                            _this2.virtualPaths.push(path.toString());
	                        }
	                    } else {
	                        if (value.virtual) {
	                            _this2.virtualPaths.push(path.toString());
	                        }
	                    }
	                }
	                return new Promise(function (resolve, reject) {
	                    _this2.generator(value, function (fieldCalculated) {
	                        if (!utils.isConditional(k)) {
	                            obj[k] = fieldCalculated;
	                        } else {
	                            var key = k.split(',');
	                            if (utils.evalWithContextData(key[0], _this2.entity)) {
	                                obj[key[1]] = fieldCalculated;
	                                delete obj[k];
	                            } else {
	                                delete obj[k];
	                            }
	                        }
	                        resolve(fieldCalculated);
	                    });
	                });
	            };
	            var it = iterator.it(this.entity);
	            var res = {
	                done: false,
	                value: {
	                    obj: {},
	                    k: '',
	                    value: '',
	                    path: []
	                }
	            };
	            while (res.value) {
	                res = it.next();
	                if (!res.value) break;
	                var _res$value = res.value;
	                var obj = _res$value.obj;
	                var k = _res$value.k;
	                var value = _res$value.value;
	                var path = _res$value.path;

	                proccessNode(obj, k, value, path).then();
	            }
	            if (this.virtualPaths.length > 0) {
	                (0, _cleanObject2.default)(this.virtualPaths, this.entity, { strict: true, symbol: ',' }).then(cb);
	            } else {
	                cb(this.entity);
	            }
	        }
	    }, {
	        key: 'generator',
	        value: function generator(field, cb) {
	            if (utils.isArray(field)) {
	                var fieldConfig = field[0];
	                var arrayConfig = field[1];
	                var array = [];
	                var length = utils.fieldArrayCalcLength(arrayConfig);
	                for (var i = 0; i < length; i++) {
	                    array.push(this.generateNormalField(fieldConfig));
	                }
	                cb(array);
	            } else {
	                cb(this.generateNormalField(field));
	            }
	        }
	    }, {
	        key: 'generateNormalField',
	        value: function generateNormalField(config) {
	            var object = this.entity;
	            var db = this.data;
	            if (config.faker) {
	                return utils.stringToFn('faker', config.faker, db, object);
	            } else if (config.chance) {
	                return utils.stringToFn('chance', config.chance, db, object);
	            } else if (config.values) {
	                return faker.random.arrayElement(config.values);
	            } else if (config.function) {
	                return config.function.call({ object: object, faker: faker, chance: chance, db: db });
	            } else if (config.static) {
	                return config.static;
	            } else if (config.hasOwnProperty('incrementalId')) {
	                var n = 0;
	                if (db[this.entityOutputName] && db[this.entityOutputName].length) {
	                    n = db[this.entityOutputName].length;
	                }
	                if (config.incrementalId === true) {
	                    config.incrementalId = 0;
	                }
	                return n + parseInt(config.incrementalId);
	            } else {
	                return null;
	            }
	        }
	    }]);

	    return Mocker;
	})();

	exports.default = Mocker;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var faker = __webpack_require__(3);
	var Chance = __webpack_require__(4);
	var chance = new Chance();
	var _Math = Math;
	var floor = _Math.floor;
	var _Object = Object;
	var keys = _Object.keys;
	var evalWithContextData = exports.evalWithContextData = function evalWithContextData(key, object) {
	    return eval(key);
	};
	var fieldArrayCalcLength = exports.fieldArrayCalcLength = function fieldArrayCalcLength(config) {
	    var length = undefined;
	    if (config.fixedLength) {
	        length = config.length;
	    } else {
	        length = Math.floor(Math.random() * config.length + 1);
	    }
	    return length;
	};
	var stringToFn = exports.stringToFn = function stringToFn(moduleName, string, db, object) {
	    var re = /(^[a-zA-Z.]*)/;
	    var matches = re.exec(string);
	    var strFn = undefined;
	    if (matches && matches.length === 2) {
	        strFn = moduleName + '.' + string;
	    }
	    re = /\((.*?)\)/;
	    matches = re.exec(string);
	    if (!matches) {
	        strFn = moduleName + '.' + string + '()';
	    }
	    return eval(strFn);
	};
	var iamLastParent = exports.iamLastParent = function iamLastParent(obj) {
	    var last = false;
	    if (this.isObject(obj)) {
	        var ks = Object.keys(obj);
	        for (var i = 0; i < ks.length; i++) {
	            var k = ks[i];
	            last = this.iamLastChild(obj, k);
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
	    if (this.isObject(parent[k])) {
	        return false;
	    } else {
	        return true;
	    }
	};
	var isConditional = exports.isConditional = function isConditional(str) {
	    var arr = str.split(',');
	    if (arr.length > 1) {
	        return true;
	    } else {
	        return false;
	    }
	};
	var repeatFN = exports.repeatFN = function repeatFN(times, fn, callback) {
	    var completed = 0;
	    var iterate = function iterate() {
	        fn(function () {
	            completed += 1;
	            if (completed >= times) {
	                callback();
	            } else {
	                if (completed % 2000 == 0) {
	                    setTimeout(iterate, 0);
	                } else {
	                    iterate();
	                }
	            }
	        });
	    };
	    iterate();
	};
	var eachSeries = exports.eachSeries = function eachSeries(arr, iterator, callback) {
	    callback = callback || function () {};
	    if (!arr.length) {
	        return callback();
	    }
	    var completed = 0;
	    var iterate = function iterate() {
	        iterator(arr[completed], function (err) {
	            if (err) {
	                callback(err);
	                callback = function () {};
	            } else {
	                completed += 1;
	                if (completed >= arr.length) {
	                    callback();
	                } else {
	                    iterate();
	                }
	            }
	        });
	    };
	    iterate();
	};
	var isArray = exports.isArray = function isArray(x) {
	    if (Object.prototype.toString.call(x) === '[object Array]') {
	        return true;
	    }
	    return false;
	};
	var isObject = exports.isObject = function isObject(x) {
	    if (Object.prototype.toString.call(x) === '[object Object]') {
	        return true;
	    }
	    return false;
	};
	var getKeys = exports.getKeys = function getKeys(object) {
	    var keys_ = keys(object);
	    if (this.isArray(object)) {} else if (this.isArrayLike(object)) {
	        keys_ = keys_.filter(function (key) {
	            return floor(Number(key)) == key;
	        });
	    } else {
	        keys_ = keys_.sort();
	    }
	    return keys_;
	};
	var isArrayLike = exports.isArrayLike = function isArrayLike(any) {
	    if (!this.isObject(any)) return false;
	    if (this.isGlobalObject(any)) return false;
	    if (!('length' in any)) return false;
	    var length = any.length;
	    if (length === 0) return true;
	    return length - 1 in any;
	};
	var GLOBAL_OBJECT = new Function('return this')();
	var isGlobalObject = exports.isGlobalObject = function isGlobalObject(any) {
	    return any === GLOBAL_OBJECT;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("faker");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("chance");

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (str) {
	    var plural = {
	        '(quiz)$': "$1zes",
	        '^(ox)$': "$1en",
	        '([m|l])ouse$': "$1ice",
	        '(matr|vert|ind)ix|ex$': "$1ices",
	        '(x|ch|ss|sh)$': "$1es",
	        '([^aeiouy]|qu)y$': "$1ies",
	        '(hive)$': "$1s",
	        '(?:([^f])fe|([lr])f)$': "$1$2ves",
	        '(shea|lea|loa|thie)f$': "$1ves",
	        'sis$': "ses",
	        '([ti])um$': "$1a",
	        '(tomat|potat|ech|her|vet)o$': "$1oes",
	        '(bu)s$': "$1ses",
	        '(alias)$': "$1es",
	        '(octop)us$': "$1i",
	        '(ax|test)is$': "$1es",
	        '(us)$': "$1es",
	        's$': "s"
	    };
	    var singular = {
	        '(quiz)zes$': "$1",
	        '(matr)ices$': "$1ix",
	        '(vert|ind)ices$': "$1ex",
	        '^(ox)en$': "$1",
	        '(alias)es$': "$1",
	        '(octop|vir)i$': "$1us",
	        '(cris|ax|test)es$': "$1is",
	        '(shoe)s$': "$1",
	        '(o)es$': "$1",
	        '(bus)es$': "$1",
	        '([m|l])ice$': "$1ouse",
	        '(x|ch|ss|sh)es$': "$1",
	        '(m)ovies$': "$1ovie",
	        '(s)eries$': "$1eries",
	        '([^aeiouy]|qu)ies$': "$1y",
	        '([lr])ves$': "$1f",
	        '(tive)s$': "$1",
	        '(hive)s$': "$1",
	        '(li|wi|kni)ves$': "$1fe",
	        '(shea|loa|lea|thie)ves$': "$1f",
	        '(^analy)ses$': "$1sis",
	        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
	        '([ti])a$': "$1um",
	        '(n)ews$': "$1ews",
	        '(h|bl)ouses$': "$1ouse",
	        '(corpse)s$': "$1",
	        '(us)es$': "$1",
	        's$': ""
	    };
	    var irregular = {
	        'move': 'moves',
	        'foot': 'feet',
	        'goose': 'geese',
	        'sex': 'sexes',
	        'child': 'children',
	        'man': 'men',
	        'tooth': 'teeth',
	        'person': 'people'
	    };
	    var uncountable = ['sheep', 'fish', 'deer', 'series', 'species', 'money', 'rice', 'information', 'equipment'];
	    if (uncountable.indexOf(str.toLowerCase()) >= 0) return str;
	    for (var word in irregular) {
	        var pattern = new RegExp(word + '$', 'i');
	        var replace = irregular[word];
	        if (pattern.test(str)) return str.replace(pattern, replace);
	    }
	    var array = plural;
	    for (var reg in array) {
	        var pattern = new RegExp(reg, 'i');
	        if (pattern.test(str)) return str.replace(pattern, array[reg]);
	    }
	    return str + 's';
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (paths, object, options) {
	    return new Promise(function (resolve) {
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

	                            return _context.abrupt("return");

	                        case 4:
	                            if (obj) {
	                                _context.next = 6;
	                                break;
	                            }

	                            return _context.abrupt("return");

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
	                            return _context.abrupt("break", 19);

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

	                            return _context.delegateYield(objectCleaner(lvls.join(options.symbol), obj, options), "t0", 22);

	                        case 22:
	                            _context.next = 25;
	                            break;

	                        case 24:
	                            return _context.abrupt("return");

	                        case 25:
	                        case "end":
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

	                            delete dest[_field];
	                            return _context2.delegateYield(objectCleaner(path, object, options), "t0", 8);

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
	                        case "end":
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
	                            return _context3.delegateYield(forEachPath(path, object, options), "t0", 4);

	                        case 4:
	                            i++;
	                            _context3.next = 1;
	                            break;

	                        case 7:
	                        case "end":
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

	        resolve(object);
	    });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.it = undefined;

	var _index = __webpack_require__(2);

	var utils = _interopRequireWildcard(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var it = exports.it = regeneratorRuntime.mark(function it(obj, currentPath) {
	    var fields, i, k, value, path, _path;

	    return regeneratorRuntime.wrap(function it$(_context) {
	        while (1) {
	            switch (_context.prev = _context.next) {
	                case 0:
	                    if (obj) {
	                        _context.next = 2;
	                        break;
	                    }

	                    return _context.abrupt('return');

	                case 2:
	                    if (!currentPath) {
	                        currentPath = [];
	                    }
	                    fields = Object.keys(obj);
	                    i = 0;

	                case 5:
	                    if (!(i < fields.length)) {
	                        _context.next = 21;
	                        break;
	                    }

	                    k = fields[i];
	                    value = obj[k];
	                    path = currentPath.slice(0);

	                    path.push(k);

	                    if (!utils.iamLastParent(value)) {
	                        _context.next = 15;
	                        break;
	                    }

	                    _context.next = 13;
	                    return { obj: obj, k: k, value: value, path: path };

	                case 13:
	                    _context.next = 18;
	                    break;

	                case 15:
	                    _path = currentPath.slice(0);

	                    _path.push(k);
	                    return _context.delegateYield(it(value, _path), 't0', 18);

	                case 18:
	                    i++;
	                    _context.next = 5;
	                    break;

	                case 21:
	                case 'end':
	                    return _context.stop();
	            }
	        }
	    }, it, this);
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }
/******/ ])
});
;