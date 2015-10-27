(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("faker"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["faker", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["MockerData"] = factory(require("faker"), require("immutable"));
	else
		root["MockerData"] = factory(root["faker"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _srcIndexTs = __webpack_require__(1);

	var _srcIndexTs2 = _interopRequireDefault(_srcIndexTs);

	var mocker = function mocker(config) {
	    return new _srcIndexTs2['default'](config);
	};

	exports['default'] = mocker;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var faker = __webpack_require__(2);
	var Immutable = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var Mocker = (function () {
	    function Mocker(config) {
	        this.data = {};
	        this.entity = {};
	        this.initialData = null;
	        this.path = [];
	        this.config = Immutable.fromJS(config);
	    }
	    Mocker.prototype.generate = function (entity, options) {
	        var _this = this;
	        var d = [];
	        var entityPlural = utils.pluralize(entity);
	        this.data[entityPlural] = [];
	        this.initialData = {};
	        return new Promise(function (resolve, reject) {
	            var finalCb = function () {
	                _this.data[entityPlural] = d;
	                resolve(_this.data);
	            };
	            if (Number.isInteger(options)) {
	                utils.repeatFN(options, function (nxt) {
	                    var cfg = _this.config.toJS();
	                    if (utils.iamLastParent(cfg[entity])) {
	                        _this.generateField(cfg[entity], function (data) {
	                            d.push(data);
	                            nxt();
	                        });
	                    }
	                    else {
	                        _this.generateEntity(cfg[entity], function (data) {
	                            d.push(data);
	                            nxt();
	                        });
	                    }
	                }, finalCb);
	            }
	            else {
	                var cfg = _this.config.toJS();
	                var f = options.uniqueField;
	                var possibleValues;
	                if (f === '.') {
	                    possibleValues = cfg[entity].values;
	                }
	                else {
	                    possibleValues = cfg[entity][f].values;
	                }
	                var length_1 = possibleValues.length;
	                utils.eachSeries(possibleValues, function (k, nxt) {
	                    var cfg = _this.config.toJS();
	                    if (f === '.') {
	                        d.push(k);
	                        return nxt();
	                    }
	                    _this.initialData[f] = k;
	                    _this.generateEntity(cfg[entity], function (data) {
	                        d.push(data);
	                        nxt();
	                    });
	                }, finalCb);
	            }
	        });
	    };
	    Mocker.prototype.generateEntity = function (entityConfig, cb) {
	        this.entity = Object.assign({}, entityConfig);
	        if (this.initialData) {
	            this.entity = Object.assign({}, this.initialData, entityConfig);
	        }
	        this.iterator(this.entity, function (object) {
	            cb(object);
	        });
	    };
	    Mocker.prototype.iterator = function (object, cb) {
	        var _this = this;
	        utils.overObject(object, function (k, parent, nxt) {
	            var fieldCalculated;
	            var child = parent[k];
	            if (utils.iamLastParent(child)) {
	                _this.generateField(child, function (fieldCalculated) {
	                    if (!utils.isConditional(k)) {
	                        parent[k] = fieldCalculated;
	                    }
	                    else {
	                        var key = k.split(',');
	                        if (utils.evalWithContextData(key[0], _this.entity)) {
	                            parent[key[1]] = fieldCalculated;
	                            delete parent[key];
	                        }
	                        else {
	                            delete parent[key];
	                        }
	                    }
	                    nxt();
	                });
	            }
	            else {
	                _this.iterator(child, nxt);
	            }
	        }, function () {
	            cb(object);
	        });
	    };
	    Mocker.prototype.generateField = function (field, cb) {
	        if (utils.isArray(field)) {
	            cb(this.generateArrayField(field[0], field[1]));
	        }
	        else {
	            cb(this.generateNormalField(field));
	        }
	    };
	    Mocker.prototype.generateArrayField = function (fieldConfig, arrayConfig) {
	        var array = [];
	        var length = utils.fieldArrayCalcLength(arrayConfig);
	        for (var i = 0; i < length; i++) {
	            array.push(this.generateNormalField(fieldConfig));
	        }
	        return array;
	    };
	    Mocker.prototype.generateNormalField = function (config) {
	        var object = this.entity;
	        var db = this.data;
	        if (config.faker) {
	            var split = config.faker.split('.');
	            return faker[split[0]][split[1]].call();
	        }
	        else if (config.values) {
	            return faker.random.arrayElement(config.values);
	        }
	        else if (config.function) {
	            return config.function.call({ object: object, faker: faker, db: db });
	        }
	        else if (config.static) {
	            return config.static;
	        }
	        else {
	            return null;
	        }
	    };
	    return Mocker;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Mocker;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("faker");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 4 */
/***/ function(module, exports) {

	exports.each = function (arr, fn) {
	    for (var i = 0; i < arr.length; ++i) {
	        fn(arr[i]);
	    }
	};
	exports.iamLastParent = function (obj) {
	    var _this = this;
	    if (this.isObject(obj)) {
	        var ks = Object.keys(obj);
	        var last = null;
	        ks.map(function (k) {
	            last = _this.iamLastChild(obj, k);
	            if (!last) {
	                return;
	            }
	        });
	        return last;
	    }
	    else {
	        return true;
	    }
	};
	exports.iamLastChild = function (parent, k) {
	    if (this.isObject(parent[k])) {
	        return false;
	    }
	    else {
	        return true;
	    }
	};
	exports.isConditional = function (str) {
	    var arr = str.split(',');
	    if (arr.length > 1) {
	        return true;
	    }
	    else {
	        return false;
	    }
	};
	exports.evalWithContextData = function (key, object) {
	    return eval(key);
	};
	exports.fieldArrayCalcLength = function (config) {
	    if (config.fixedLength) {
	        return config.length;
	    }
	    else {
	        return Math.floor((Math.random() * config.length) + 1);
	    }
	};
	exports.isArray = function (x) {
	    if (Object.prototype.toString.call(x) === '[object Array]') {
	        return true;
	    }
	    return false;
	};
	exports.isObject = function (x) {
	    if (Object.prototype.toString.call(x) === '[object Object]') {
	        return true;
	    }
	    return false;
	};
	exports.repeatFN = function (times, fn, callback) {
	    var completed = 0;
	    var iterate = function () {
	        fn(function () {
	            completed += 1;
	            if (completed >= times) {
	                callback();
	            }
	            else {
	                iterate();
	            }
	        });
	    };
	    iterate();
	};
	exports.eachSeries = function (arr, iterator, callback) {
	    callback = callback || function () { };
	    if (!arr.length) {
	        return callback();
	    }
	    var completed = 0;
	    var iterate = function () {
	        iterator(arr[completed], function (err) {
	            if (err) {
	                callback(err);
	                callback = function () { };
	            }
	            else {
	                completed += 1;
	                if (completed >= arr.length) {
	                    callback();
	                }
	                else {
	                    iterate();
	                }
	            }
	        });
	    };
	    iterate();
	};
	exports.overObject = function (obj, iterator, callback) {
	    callback = callback || function () { };
	    var arr = Object.keys(obj);
	    if (!arr.length) {
	        return callback();
	    }
	    var completed = 0;
	    var iterate = function () {
	        var k = arr[completed];
	        iterator(k, obj, function (err) {
	            if (err) {
	                callback(err);
	                callback = function () { };
	            }
	            else {
	                completed += 1;
	                if (completed >= arr.length) {
	                    callback();
	                }
	                else {
	                    iterate();
	                }
	            }
	        });
	    };
	    iterate();
	};
	exports.pluralize = function (str) {
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
	    var uncountable = [
	        'sheep',
	        'fish',
	        'deer',
	        'series',
	        'species',
	        'money',
	        'rice',
	        'information',
	        'equipment'
	    ];
	    if (uncountable.indexOf(str.toLowerCase()) >= 0)
	        return str;
	    for (var word in irregular) {
	        var pattern = new RegExp(word + '$', 'i');
	        var replace = irregular[word];
	        if (pattern.test(str))
	            return str.replace(pattern, replace);
	    }
	    var array = plural;
	    for (var reg in array) {
	        var pattern = new RegExp(reg, 'i');
	        if (pattern.test(str))
	            return str.replace(pattern, array[reg]);
	    }
	    return str + 's';
	};


/***/ }
/******/ ])
});
;