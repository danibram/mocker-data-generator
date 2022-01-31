"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocker = void 0;
var tslib_1 = require("tslib");
require("./array-includes");
var Mocker_1 = require("./lib/Mocker");
tslib_1.__exportStar(require("./lib/Mocker"), exports);
tslib_1.__exportStar(require("./lib/Schema"), exports);
tslib_1.__exportStar(require("./lib/Generator"), exports);
var mocker = function (opts) { return new Mocker_1.Mocker(opts); };
exports.mocker = mocker;
exports.default = exports.mocker;
//# sourceMappingURL=index.js.map