module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    //1.添加parser
    'parser': "babel-eslint",
    "sourceType": "module",
    //2.添加allowImportExportEverywhere
    'allowImportExportEverywhere': true
  },
  "plugins": [
    "vue"
  ],
  rules: {
  /*这里是eslint规则*/
  //3.添加global-require
 "global-require": 0//这里应该0代表off
  }
}
