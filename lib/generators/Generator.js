"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function Plugin(db) {
  _classCallCheck(this, Plugin);

  this.db = db;

  if (typeof this.run != "function") throw Error("Plugin does not implement run function");
};

exports.default = Plugin;
//# sourceMappingURL=Generator.js.map