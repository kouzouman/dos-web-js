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
