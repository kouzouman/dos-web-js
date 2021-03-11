const DosWeb = require("../index").default;

test("first", async (done) => {
  // console.log(process.cwd());

  const browser = new DosWeb("chrome", {
    download: {
      prompt_for_download: false,
      directory_upgrade: true,
      default_directory: __dirname + "\\..\\data",
    },
  });
  await browser.init();

  // await browser.move(
  //   "http://www.nomadworks.co.jp/htmlsample/archive/win/sec2/info01.zip"
  // );
  // const body = await browser.getRecentDownText(
  //   `C:\\Users\\kou\\Downloads`,
  //   true
  // );
  // console.log(body);
  // await browser.quit();
  // done();
  // return;

  await browser.move("https://www.google.com/");

  const qbox = await browser.querySelector('[name="q"]');
  await qbox.setValueWithEnter("検索語");

  await browser.sleep(1000);
  // const body = await browser.getInnerText();
  // expect(body).not.toBe("");
  // await qbox.inputEnter();
  await browser.quit();
  done();
  return;
});
