const DosWeb = require("../index").default;

test("first", async (done) => {
  const browser = new DosWeb("chrome");
  await browser.init();

  await browser.move("https://www.google.com/");

  const qbox = await browser.querySelector('[name="q"]');
  await qbox.setValueWithEnter("検索語");

  await browser.sleep(1000);
  const body = await browser.getBody();
  expect(body).not.toBe("");
  // await qbox.inputEnter();
  await browser.quit();
  done();
  return;

  // const logImage = await browser.querySelector("img.lnXdpd");
  // logImage.areaClick();

  // const search = await browser.querySelector('[name="btnK"]');
  // console.log(search);
  // search.areaClick();

  // await browser.quit();

  // expect([].first()).toBe(null);
  // expect([].first(null)).toBe(null);
  // expect([].first(1)).toBe(1);
  // expect(["aaa", "bbb"].first()).toBe("aaa");
});
