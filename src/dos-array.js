import cf from "dos-common-js";

/**
 * 引数のアイテムを削除
 */
cf.extendMethod(Array, "removeAt", function(item) {
  return this.filter(v => {
    return item !== v;
  });
});

/**
 * 配列の戦闘を取得
 */
cf.extendMethod(Array, "first", function(defaultVal = null) {
  if (this.length == 0) return defaultVal;
  return this[0];
});

/**
 * arrayを複数登録
 */
cf.extendMethod(Array, "pushAll", function(arr) {
  arr.forEach(v => this.push(v));
});

/**
 * key、valueの配列をMapに変更
 */
cf.extendMethod(Array, "toMapFromKeyMapArray", function() {
  let result = {};
  this.forEach(v => {
    result[v.key] = v.value;
  });
  return result;
});

/**
 * key、valueの配列をMapに変更
 */
cf.extendMethod(Array, "asyncMap", async function(mapFunc) {
  return Promise.all(this.map(v => mapFunc(v)));
});

/**
 * 配列をチャンク分けする
 */
cf.extendMethod(Array, "chunk", function(length) {
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



  /**
   * Array拡張
   * 配列のユニーク処理を実施する
   * @return {Array}
   */
cf.extendMethod(Array, "unique", function(getKeyFunc) {

    //  デフォルトはこっち
    if (!getKeyFunc) {
      return this.filter(function(x, i, self) {
        return self.indexOf(x) === i;
      });
    }

    //  フィルター用のキーを取得する関数が指定されている場合
    var result = [];
    for (var i = 0; i < this.length; i++) {
      var add = true;
      for (var h = 0; h < result.length; h++) {
        if (result[h][getKeyFunc]() === this[i][getKeyFunc]()) {
          add = false;
          break;
        }
      }
      if (add) result.push(this[i]);
    }
    return result;
});
