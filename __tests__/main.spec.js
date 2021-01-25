require("../index");

test("first", () => {
  expect([].first()).toBe(null);
  expect([].first(null)).toBe(null);
  expect([].first(1)).toBe(1);
  expect(["aaa", "bbb"].first()).toBe("aaa");
});

test("last", () => {
  expect([].last()).toBe(null);
  expect([].last(null)).toBe(null);
  expect([].last(1)).toBe(1);
  expect(["aaa", "bbb"].last()).toBe("bbb");
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

test("array_stds", () => {
  let targets = [];
  for (let i = 0; i < 1000000; i++) {
    targets.push(
      Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
    );
  }

  const timeChecker = (func) => {
    const startTime = new Date();
    func();
    const endTime = new Date();
    return endTime - startTime;
  };

  let resMes = [];

  for (let i = 0; i < 10; i++) {
    //  map
    resMes.push(`map: ${timeChecker(() => targets.map((v) => v * 2))}`);
    resMes.push(`_map: ${timeChecker(() => targets._map((v) => v * 2))}`);
    //  filter
    resMes.push(`filter: ${timeChecker(() => targets.filter((v) => v % 2))}`);
    resMes.push(`_filter: ${timeChecker(() => targets._filter((v) => v % 2))}`);
    //  some
    resMes.push(
      `some: ${timeChecker(() =>
        targets.some((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
    resMes.push(
      `_some: ${timeChecker(() =>
        targets._some((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
    //  forEach
    resMes.push(`forEach: ${timeChecker(() => targets.forEach((v) => v * 2))}`);
    resMes.push(
      `_forEach: ${timeChecker(() => targets._forEach((v) => v * 2))}`
    );
    //  find
    resMes.push(
      `find: ${timeChecker(() =>
        targets.find((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
    resMes.push(
      `_find: ${timeChecker(() =>
        targets._find((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
    //  every
    resMes.push(
      `every: ${timeChecker(() =>
        targets.every((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
    resMes.push(
      `_every: ${timeChecker(() =>
        targets._every((v) => v == targets[(i + 1) * 1000 - 1])
      )}`
    );
  }
  console.log(resMes.join("\r\n"));
});
