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
  return Promise.all(this.map((v, i, arr) => mapFunc(v, i, arr)));
});
/**
 * 配列をチャンク分けする
 */


_dosCommonJs.default.extendMethod(Array, "chunk", function (length) {
  // return this.length >= length
  //   ? this
  //   : [this.slice(0, length), this.slice(length).chunk(length)];
  if (length <= 0) return this;
  let result = [];
  let current = [];
  this.forEach((v, i) => {
    current.push(v);

    if ((i + 1) % length === 0) {
      result.push(current);
      current = [];
    }
  });

  if (current.length != 0) {
    result.push(current);
  }

  return result;
});
/**
 * Array拡張
 * 配列のユニーク処理を実施する
 * @return {Array}
 */


_dosCommonJs.default.extendMethod(Array, "unique", function (getKeyFunc) {
  //  デフォルトはこっち
  if (!getKeyFunc) {
    return this.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
  } //  フィルター用のキーを取得する関数が指定されている場合


  var result = [];

  for (var i = 0; i < this.length; i++) {
    var add = true;
    const currentKey = getKeyFunc(this[i]);

    for (var h = 0; h < result.length; h++) {
      if (getKeyFunc(result[h]) === currentKey) {
        add = false;
        break;
      }
    }

    if (add) result.push(this[i]);
  }

  return result;
}); // /**
//  * Array拡張
//  * 配列から一部を抜き出す
//  * @return {Array}
//  */
// cf.extendMethod(Array, "slice", function (start = 0, length = 0) {
//   const endIndex = !length ? this.length - start + 1 : length;
//   console.log(endIndex);
//   let res = [];
//   for (let i = start; i < endIndex; i++) {
//     res.push(this[i]);
//   }
//   return res;
// });
