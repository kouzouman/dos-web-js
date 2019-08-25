require("../index");

test("first", () => {
  expect([].first()).toBe(null);
  expect(["aaa"].first()).toBe("aaa");
});
