import cf from "dos-common-js";

/**
 * 引数のアイテムを削除
 */
cf.extendMethod(Array, "removeAt", function (item) {
  return this.filter((v) => {
    return item !== v;
  });
});

/**
 * 配列の先頭を取得
 */
cf.extendMethod(Array, "first", function (defaultVal = null) {
  if (this.length == 0) return defaultVal;
  return this[0];
});

/**
 * 配列の最後尾を取得
 */
cf.extendMethod(Array, "last", function (defaultVal = null) {
  if (this.length == 0) return defaultVal;
  return this[this.length - 1];
});

/**
 * arrayを複数登録
 */
cf.extendMethod(Array, "pushAll", function (arr) {
  arr.forEach((v) => this.push(v));
});

/**
 * key、valueの配列をMapに変更
 */
cf.extendMethod(Array, "toMapFromKeyMapArray", function () {
  let result = {};
  this.forEach((v) => {
    result[v.key] = v.value;
  });
  return result;
});

/**
 * key、valueの配列をMapに変更
 */
cf.extendMethod(Array, "asyncMap", async function (mapFunc) {
  return Promise.all(this.map((v, i, arr) => mapFunc(v, i, arr)));
});

/**
 * 配列をチャンク分けする
 */
cf.extendMethod(Array, "chunk", function (length) {
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
cf.extendMethod(Array, "unique", function (getKeyFunc) {
  //  デフォルトはこっち
  if (!getKeyFunc) {
    // return this.filter(function (x, i, self) {
    //   return self.indexOf(x) === i;
    // });
    let res = {};
    this.forEach((v) => (res[v] = v));
    return Object.keys(res).map((v) => res[v]);
  }

  //  フィルター用のキーを取得する関数が指定されている場合
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
});

// /**
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
