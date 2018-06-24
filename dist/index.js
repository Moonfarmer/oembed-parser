'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = require('./main');

var main = _interopRequireWildcard(_main);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Starting app
 * @ndaidong
**/

main.version = _package2.default.version;

exports.default = main;