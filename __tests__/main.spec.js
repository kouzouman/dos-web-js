require("../index");

test("first", () => {
  expect([].first()).toBe(null);
  expect(["aaa"].first()).toBe("aaa");
});

test("unique", () => {
  const arr = [1, 2, 3, 5, 5, 6, 6];

  expect(JSON.stringify(arr.unique())).toBe(JSON.stringify([1, 2, 3, 5, 6]));

  const arrObj = [
    { key: "test1", z: true },
    { key: "test1", z: false },
    { key: "test2" },
    { key: "test3" },
  ];
  expect(JSON.stringify(arrObj.unique((v) => v.key))).toBe(
    JSON.stringify([
      { key: "test1", z: true },
      { key: "test2" },
      { key: "test3" },
    ])
  );
});
