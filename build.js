const babel = require("babel-core");
const fs = require("fs");

const srcFile = "src/dos-array.js";
const distFile = "dist/dos-array.js";
const options = { presets: ["env"] };

const code = fs.readFileSync(srcFile, "utf-8");
const newCode = babel.transform(code, options).code;
fs.writeFileSync(distFile, newCode);

console.log("babel build finished!");
