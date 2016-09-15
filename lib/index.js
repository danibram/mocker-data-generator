'use strict';

var _Mocker = require('./Mocker');

var _Mocker2 = _interopRequireDefault(_Mocker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global._babelPolyfill) {
   require('babel-polyfill');
}

var initMocker = function initMocker(opts) {
   return new _Mocker2.default(opts);
};

module.exports = initMocker;
//# sourceMappingURL=index.js.map