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
	        this.data[entity + 's'] = [];
	        this.initialData = {};
	        return new Promise(function (resolve, reject) {
	            if (Number.isInteger(options)) {
	                utils.repeatFN(options, function (nxt) {
	                    var cfg = _this.config.toJS();
	                    _this.generateEntity(cfg[entity], function (data) {
	                        d.push(data);
	                        nxt();
	                    });
	                }, function () {
	                    _this.data[entity + 's'] = d;
	                    resolve(_this.data);
	                });
	            }
	            else {
	                var cfg = _this.config.toJS();
	                var f = options.uniqueField;
	                var possibleValues = cfg[entity][f].values;
	                var length_1 = possibleValues.length;
	                utils.eachSeries(possibleValues, function (k, nxt) {
	                    var cfg = _this.config.toJS();
	                    _this.initialData[f] = { static: k };
	                    _this.generateEntity(cfg[entity], function (data) {
	                        d.push(data);
	                        nxt();
	                    });
	                }, function () {
	                    _this.data[entity + 's'] = d;
	                    resolve(_this.data);
	                });
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
	        utils.overObject(object, function (k, obj, nxt) {
	            var fieldCalculated;
	            var lvl = obj[k];
	            if (utils.iamLastChild(lvl)) {
	                _this.generateField(lvl, function (fieldCalculated) {
	                    if (!utils.isConditional(k)) {
	                        obj[k] = fieldCalculated;
	                    }
	                    else {
	                        var key = k.split(',');
	                        if (utils.evalWithContextData(key[0], _this.entity)) {
	                            obj[key[1]] = fieldCalculated;
	                            delete _this.entity[key];
	                        }
	                        else {
	                            delete _this.entity[key];
	                        }
	                    }
	                    nxt();
	                });
	            }
	            else {
	                _this.iterator(lvl, function () {
	                    nxt();
	                });
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
	exports.iamLastChild = function (obj) {
	    var _this = this;
	    if (this.isObject(obj)) {
	        var ks = Object.keys(obj);
	        var last = null;
	        ks.map(function (k) {
	            if (_this.isObject(obj[k])) {
	                last = false;
	                return;
	            }
	            else {
	                last = true;
	            }
	        });
	        return last;
	    }
	    else {
	        return true;
	    }
	};
	exports.iamLastParent = function (obj) {
	    var ks = Object.keys(obj);
	    var last = null;
	    for (var i = 0; i < ks.length; i++) {
	        var key = ks[i];
	        if (obj[key] && this.iamLastChild(obj[key])) {
	            last = true;
	            break;
	        }
	        else {
	            last = false;
	            break;
	        }
	    }
	    return last;
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


/***/ }
/******/ ])
});
;