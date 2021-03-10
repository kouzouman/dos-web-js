"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dosCommonJs = _interopRequireDefault(require("dos-common-js"));

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
  /**
   * コンストラクタ
   * @param {*} browserType
   * @param {*} conf
   */
  constructor(browserType, conf) {
    this.capabilities = _switch(browserType.toLowerCase()).case("chrome").then(() => {
      console.log("chrome ------------------------");
      const cap = webdriver.Capabilities.chrome();
      cap.set("chromeOptions", !!conf ? conf : {
        args: ["--headless", "--no-sandbox", "--disable-gpu", "--incognito", `--window-size=1980,1200` // other chrome options
        ]
      });
      return cap;
    }).default(() => {
      console.log("default ------------------------");
    });
  }
  /**
   * 初期化
   */


  async init() {
    //  ブラウザの初期化
    this.driver = await new Builder().withCapabilities(this.capabilities).build();
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
  /**
   * CSSクエリセレクタで要素を取得
   * @param {*} selector
   */


  async querySelector(selector) {
    const element = await this.driver.findElement(By.css(selector));
    return this._elementWrapper(element);
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


  async getBody() {
    return await this.driver.getPageSource();
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
    const base64 = this.getScreenShot();
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
      this.driver.wait(element.sendKeys(value));
    };
    /**
     * Enterキーを押下
     */


    element.setValueWithEnter = async value => {
      // console.log(webdriver.Key);
      this.driver.wait(element.sendKeys(value, Key.ENTER));
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

    return element;
  }

}

exports.default = DosWeb;
