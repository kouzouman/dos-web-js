"use strict";

var _dosCommonJs = _interopRequireDefault(require("dos-common-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 引数のアイテムを削除
 */
_dosCommonJs.default.extendMethod(Array, "removeAt", function (item) {
  return this.filter(v => {
    return item !== v;
  });
});
/**
 * 配列の戦闘を取得
 */


_dosCommonJs.default.extendMethod(Array, "first", function (defaultVal = null) {
  if (this.length == 0) return defaultVal;
  return this[0];
});
/**
 * arrayを複数登録
 */


_dosCommonJs.default.extendMethod(Array, "pushAll", function (arr) {
  arr.forEach(v => this.push(v));
});
/**
 * key、valueの配列をMapに変更
 */


_dosCommonJs.default.extendMethod(Array, "toMapFromKeyMapArray", function () {
  let result = {};
  this.forEach(v => {
    result[v.key] = v.value;
  });
  return result;
});
/**
 * key、valueの配列をMapに変更
 */


_dosCommonJs.default.extendMethod(Array, "asyncMap", async function (mapFunc) {
  return Promise.all(this.map(v => mapFunc(v)));
});
/**
 * 配列をチャンク分けする
 */


_dosCommonJs.default.extendMethod(Array, "chunk", function (length) {
  if (length <= 0) return this;
  let result = [];
  let current = [];
  this.forEach((v, i) => {
    current.push(v);

    if (i % length === 0) {
      result.push(current);
      current = [];
    }
  });

  if (current.length == 0) {
    result.push(current);
  }

  return result;
});
