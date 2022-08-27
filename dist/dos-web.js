"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = require("assert");

var _dosCommonJs = _interopRequireDefault(require("dos-common-js"));

var _dosFilesystemJs = _interopRequireDefault(require("dos-filesystem-js"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const webdriver = require("selenium-webdriver");

const {
  Builder,
  By,
  Key,
  until
} = webdriver;
/**
 * DosWeb
 */

class DosWeb {
  getKeys() {
    return Key;
  }
  /**
   * chromeのデフォルト設定
   * @param {*} conf
   */


  getChromeConf(conf = {}) {
    const defaultConf = {
      args: ["--headless", "--no-sandbox", "--disable-gpu", "--incognito", `--window-size=1980,1200`]
    };
    return { ...defaultConf,
      ...conf
    };
  }
  /**
   * コンストラクタ
   * @param {*} browserType
   * @param {*} conf
   */


  constructor(browserType, conf) {
    this.browserType = browserType.toLowerCase();
    this.conf = conf;
  }
  /**
   * 初期化
   */


  async init(option) {
    this.capabilities = _switch(this.browserType).case("chrome").then(() => {
      console.log("chrome ------------------------");
      const cap = webdriver.Capabilities.chrome();
      this.conf = this.getChromeConf(this.conf);
      cap.set("chromeOptions", this.conf);
      return cap;
    }).default(() => {
      console.log("default ------------------------");
    }); //  ブラウザの初期化

    const cap = new Builder().withCapabilities(this.capabilities);

    try {
      this.driver = await cap.build();
    } catch (e) {
      await this.versionUpDriver();
      this.driver = await cap.build();
    } // this.driver.setWindowSize(100, 200);

  }
  /**
   * ブラウザの終了
   */


  async quit() {
    return Promise.resolve(this.driver.quit());
  }
  /**
   * 指定のurlに移動する
   */


  async move(url) {
    return await this.driver.get(url);
  }

  getManager() {
    return this.driver.manage();
  }

  getWindow() {
    return this.driver.manage().window();
  }
  /**
   * CSSクエリセレクタで要素を取得
   * @param {*} selector
   */


  async querySelector(selector) {
    const element = await this.driver.findElement(By.css(selector));
    return this._elementWrapper(element);
  }
  /**
   * CSSクエリセレクタで要素を取得
   * @param {*} selector
   */


  async querySelectorAll(selector) {
    const element = await this.driver.findElements(By.css(selector));
    return element.map(v => this._elementWrapper(v));
  }
  /**
   * CSSクエリセレクタで要素の出現を待ってから取得
   * @param {*} selector
   */


  async querySelectorWithWait(selector, millisecond = 10000) {
    const wait = await this.driver.wait(until.elementLocated(By.css(selector)), millisecond);
    return await this.querySelector(selector);
  }
  /**
   * BodyのHTML情報を取得
   */


  async getOuterHtml() {
    return await this.driver.getPageSource();
  }
  /**
   * innerTextを取得
   */


  async getInnerText() {
    const bodyElement = await this.querySelectorWithWait("body");
    const bodyText = await bodyElement.getText();
    console.log(bodyText);
    const chromeXmlBody = await this.querySelector("#webkit-xml-viewer-source-xml");

    if (!!chromeXmlBody.getText) {
      console.log("要素あり");
      const body = await chromeXmlBody.getText();
      console.log(body);
      console.log("========================");
      return body;
    } // console.log("chromeXmlBody----------" + chromeXmlBody);


    return bodyText;
  }
  /**
   * 最近ダウンロードしたテキストを解析
   */


  async getRecentDownText(downDir = "", withDelete = false) {
    if (!downDir) downDir = this.conf.download.default_directory;
    const flist = await _dosFilesystemJs.default.getFileList(downDir); // console.log(flist[0]);

    const sorted = flist.sort((a, b) => (0, _moment.default)(a.stats.mtime) > (0, _moment.default)(b.stats.mtime) ? 1 : -1).reverse();
    if (sorted.length == 0) return "";
    const lastFile = sorted[0];
    const fData = await _dosFilesystemJs.default.readText(lastFile.item); // console.log(fData);

    if (withDelete) {
      await _dosFilesystemJs.default.delete(lastFile.item);
    }

    return fData;
  } //  その他  --------------------------

  /**
   * スリープ
   */


  async sleep(millisecond) {
    return await _dosCommonJs.default.sleep(millisecond / 1000);
  }
  /**
   * スクリーンショットのBase64を取得
   * @returns
   */


  async getScreenShot() {
    return await this.driver.takeScreenshot();
  }
  /**
   * ファイルパスを指定してスクリーンショットを保存
   * @param {*} filePath
   */


  async saveScreenShot(filePath) {
    const base64 = await this.getScreenShot();
    const buf = Buffer.from(base64, "base64");

    const {
      promisify
    } = require("util");

    const fs = require("fs");

    await promisify(fs.writeFile)(filePath, buf);
  }
  /**
   * エレメントに追加メソッドを付与した状態で再構築する
   * @param {*} element
   */


  _elementWrapper(element) {
    /**
     * 値を設定する
     */
    element.setValue = async value => {
      return Promise.resolve(this.driver.wait(element.sendKeys(value)));
    };
    /**
     * Enterキーを押下
     */


    element.setValueWithEnter = async value => {
      // console.log(webdriver.Key);
      return Promise.resolve(this.driver.wait(element.sendKeys(value, Key.ENTER)));
    };
    /**
     * エレメントではなくエレメントの領域をクリックする
     */


    element.areaClick = async () => {
      action = webdriver.common.actionChains.ActionChains(this.driver);
      action.move_to_element_with_offset(element, 5, 5);
      action.click();
      action.perform();
    };

    element.getInnerText = async () => {
      const res = await this.driver.executeScript("return arguments[0].innerText", element);
      return res;
    }; // /**
    //  * innerTextを取得
    //  */
    // element.getInnerText = async () => {
    //   const body =
    // }


    return element;
  }
  /**
   * ブラウザドライバのバージョンチェック
   */


  async versionUpDriver() {
    switch (this.browserType) {
      case "chrome":
        await this.versionUpChromeDriver();
        break;
    }
  }
  /**
   * Chromeドライバのバージョンを上げる
   */


  async versionUpChromeDriver() {
    return new Promise((resolve, reject) => {
      const seleniumDownloader = require("selenium-download");

      seleniumDownloader.ensure(process.cwd(), error => {
        if (error) {
          return reject(error);
        } else {
          return resolve(true);
        }
      });
    });
  }

}

exports.default = DosWeb;
