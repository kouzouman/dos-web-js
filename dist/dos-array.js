"use strict";

var _dosCommonJs = require("dos-common-js");

var _dosCommonJs2 = _interopRequireDefault(_dosCommonJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 引数のアイテムを削除
 */
_dosCommonJs2.default.extendMethod(Array, "removeAt", function (item) {
  return this.filter(function (v) {
    return item !== v;
  });
});

/**
 * 配列の戦闘を取得
 */
_dosCommonJs2.default.extendMethod(Array, "first", function () {
  var defaultVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (this.length == 0) return defaultVal;
  return this[0];
});

/**
 * arrayを複数登録
 */
_dosCommonJs2.default.extendMethod(Array, "pushAll", function (arr) {
  var _this = this;

  arr.forEach(function (v) {
    return _this.push(v);
  });
});

/**
 * key、valueの配列をMapに変更
 */
_dosCommonJs2.default.extendMethod(Array, "toMapFromKeyMapArray", function () {
  var result = {};
  this.forEach(function (v) {
    result[v.key] = v.value;
  });
  return result;
});