'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Schema = require('./Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mocker = function () {
    function Mocker(options) {
        _classCallCheck(this, Mocker);

        this.schemas = [];

        this.options = options ? options : {};
        this.db = {};
    }

    _createClass(Mocker, [{
        key: 'schema',
        value: function schema(name, _schema, options) {
            this.schemas.push(new _Schema2.default(name, _schema, options));
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.db = {};
            return this;
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.db = {};
            this.schemas = [];
            return this;
        }
    }, {
        key: 'build',
        value: function build(cb) {
            this.schemas.reduce(function (acc, schema) {

                var instances = schema.build(acc);

                // Clean virtuals
                if (schema.virtualPaths.length > 0) {
                    instances.forEach(function (x) {
                        return (0, _utils.cleanVirtuals)(schema.virtualPaths, x, { strict: true, symbol: ',' });
                    });
                }

                // Add to db
                acc[schema.name] = instances;

                return acc;
            }, this.db);
            return cb(this.db);
        }

        //proccessLeaf test

    }, {
        key: 'proccessLeaf',
        value: function proccessLeaf(schema) {
            var s = new _Schema2.default();
            return s.proccessLeaf(schema);
        }
    }, {
        key: 'proccessNode',
        value: function proccessNode(schema) {
            var s = new _Schema2.default();
            s.buildSingle(schema);
            return s.result;
        }
    }]);

    return Mocker;
}();

exports.default = Mocker;
//# sourceMappingURL=Mocker.js.map