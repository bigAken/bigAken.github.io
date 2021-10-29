# VUE 项目 DEMO

### 项目架构

**vue + vuex + vue-router + element + axios + vue-i18n**

### 介绍

{**以下是码云平台说明，您可以替换此简介**
码云是 OSCHINA 推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用码云实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

### 安装教程

1.  npm install 或者 yarn 安装项目依赖
2.  npm run serve 本地运行项目
3.  npm run build 打包项目

### 目录

    ├─src
    │   ├─api                       # api接口管理
    │   ├─assets                    # 项目运行时使用到的图片和静态资源
    │   ├─style                     # 全局样式
    │   ├─theme                     # 项目主体
    │   ├─components                # 组件
    │   ├─filters                   # 全局过滤器
    │   ├─plugins                   # 插件管理目录
    │   ├─directives                # 自定义指令
    │   ├─icons                     # 全局图标组件
    │   ├─layout                    #  全局 layout
    │   ├─router                    # vue-router
    │   ├─mixins                    # 公共的方法或者计算属性或者组件,混入到各个组件,方便管理与统一修改
    │   ├─store                     # vuex
    │   │  ├─modules
    │   │  └─index.js
    │   ├──utils                    # 全局公用方法
    │   ├─ request    			    # axios 请求方法的封装
    │   ├──pages                    # 所有页面
    │   ├──App.vue                  # 入口页面
    │   ├──main.js                  # 入口文件 加载组件 初始化等
    ├─.gitignore                    # 忽略配置文件
    ├─.prettierrc                   # 美化代码格式
    ├─.eslintrc.js                  # 代码规范限制
    |——babel.config.js              # 代码编译babel 配置
    |——package.json                 # npm包配置文件，依赖包信息
    ├─.vetur.config                 # vscode插件 vetur配置
    ├─README.md                     # 项目介绍

### VueCli3 查看项目 vue.config.js 的默认配置信息

1. 运行命令，在终端输出
   npx vue-cli-service inspect
2. 运行命令，将输出导入到文件：vue.config.detail.js
   npx vue-cli-service inspect >> vue.config.detail.js

### JavaScript 代码书写规范 安装 Eslint 插件

- 变量命名使用驼峰命名
- 调试信息 console.log() debugger 使用完及时删除。
- 使用 ES6 风格编码源码,定义变量使用 let,定义常量使用 const,使用 export,import 模块化。
- 函数中统一使用 \_this=this 来解决全局指向问题。
- 能用单引号不用双引号。
- 尽量使用===。
- 声明变量必须赋值。
- 配置全局工作区 setting.json 文件，在文件中加入下面配置

```json
// 设置全部语言在保存时自动格式化
"editor.formatOnSave": ture,
// 设置特定语言在保存时自动格式化
"[javascript]": {
    "editor.formatOnSave": true
}
```

- prettier 配置

```json
{
	// 设置全部语言的默认格式化程序为prettier
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	// 设置特定语言的默认格式化程序为prettier
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	}
}
```

- ESLint 配置

```json
{
	// 保存时自动修复
	"editor.codeActionsOnSave": {
		// For ESLint
		"source.fixAll.eslint": true
	}
}
```
### component
  mdcomponent命名：所在文件夹名字+真实名字.md
### vue 相关

- 组件名称：必须以大写字母开头驼峰法命名。
- Props 定义：提供默认值，使用 type 属性校验类型，使用 props 之前先检查 prop 是否存在
- 为 v-for 设置 Key 值，尽量避免使用 index 作为 key。
- 使用计算 规避 v-if 和 v-for 用在一起。
- 无特殊情况不允许使用原生 API 操作 dom,谨慎使用 this.\$refs 直接操作 dom。
- 指令缩写：都用指令缩写 (用 : 表示 v-bind: 和用 @ 表示 v-on:)。
- 使用 data 里的变量时请先在 data 里面初始化。
- 组件文件中必须包含 name，name 可以是由多个单词组成，命名规范为驼峰形式

### css 规范

- 项目样式编写采用的 sass
- class id 命名规范是采用"中划线法命名法" 例：list-item
- 单个组件样式一般可直接写到组件下 style 标签下，为了防止样式污染，可添加 scoped 属性
- CSS 属性编写顺序 一般遵循显示属性 -> 自身属性 -> 文本属性 -> 其他属性
  - 显示属性：display/list-style/position/float/clear
  - 自身属性（盒模型）：width/height/margin/padding/border
  - 背景：background
  - 行高：line-height
  - 文本属性：color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content
  - 其他：cursor/z-index/zoom/overflow
  - CSS3 属性：transform/transition/animation/box-shadow/border-radius
  - 如果使用 CSS3 的属性，如果有必要加入浏览器前缀，则按照-webkit-/-moz-/-ms-/-o-/std 的顺序进行添加，标准属性写在最后

### vue-router

- 所有的页面，统一使用路由懒加载 例如

```javascript
const promiseToUse = () => import(/* webpackChunkName: "jsRoute" */ '@/pages/jsPage/promiseToUse.vue')
```

### vuex

状态管理模块化
文件名就是模块名，例如 user.js,user 就是对应模块的名字，所以文件命名必须规范如：[模块名字].js

### 主题生成

- #### 方法一 命令生成 et -c src/theme/element-variables.scss -o src/theme/style
  1.  安装工具：
      npm i element-theme -g
  2.  安装白垩主题，可以从 npm 安装或者从 GitHub 拉取最新代码
  ```
   # 从 npm
   npm i element-theme-chalk -D
   # 从 GitHub
   npm i https://github.com/ElementUI/theme-chalk -D
  ```
  3.  初始化变量文件 ，会生成 element-variables.scss 文件， 内部包含了主题所用到的所有变量，它们使用 SCSS 的格式定义
  ```
  # 初始化 默认会在根目录生成一个element-variables.scss文件
  et -i
  # 可以手动指定文件名和位置
  et -i src/theme/element-variables.scss
  ```
  4.  修改 element-variables.scss 变量改变颜色
  ```
  $--color-primary: pink;
  ```
  5.  执行 et 编译主题
  ```
  # 默认
  et
  # 如果手动指定了变量文件，则需要使用-c来指定，-o可以指定输出样式文件的目录
  et -c src/theme/element-variables.scss -o src/theme/style
  ```
  6.  修改 babel.config.js
  ```
  module.exports = {
   presets: [
     "@vue/cli-plugin-babel/preset",
     ["@babel/preset-env", { modules: false }],
   ],
   plugins: [
     [
       "component",
       {
         libraryName: "element-ui",
         styleLibraryName: "~src/theme/style",
       },
     ],
   ],
  };
  ```
- #### 方法二 使用的在主题生成（推荐） https://element.eleme.cn/#/zh-CN/theme/preview

  1.  下载已经设置好的主题
  2.  解压下载的文件，将 theme 文件夹放到项目目录下
  3.  将 index.css 引入到 main.js 中
  4.  babel.config.js

  ```
  module.exports = {
   presets: [
     "@vue/cli-plugin-babel/preset",
     ["@babel/preset-env", { modules: false }],
   ],
   plugins: [
     [
       "component",
       {
         libraryName: "element-ui",
         styleLibraryName: "~theme-chalk",
       },
     ],
   ],
  };
  ```

### 文件夹、组件命名规范，组件结构规范

- 文件夹：
  文件夹名称应统一格式，小写开头，见名思意，page 页面下的文件夹名称统一以 page 结尾，例如：homePage,loginPage。其余文件夹名称统一按照项目结构目录命名规范统一命名。
- 组件：
  组件名以单词大写开头，当多个单词拼写成的组件时，采用驼峰式命名规则。一般是多个单词全拼，减少简写的情况，这样增加可读性。组件应该都放到 components 文件夹下，单个页面独立一个文件夹，用来放相对应的 vue 文件以及页面相关的样式文件，样式少可直接写到页面组件里边，这样更符合组件化的思想。
- 组件结构：
  组件结构遵循从上往下 template，script，style 的结构;

### 补充说明

1. 删除多余的空行 所有代码块之间空不允许多行
2. 删除多余的注释
   - 删除注释掉的代码
   - 删除没有意义的注释
3. 删除多余的方法 如果方法没有使用到，请删除它
4. 删除未被使用的资源文件
5. 添加必要的注释
   - 所有自定义的方法需要给出注释
   - 比较大的代码块需要给出注释
   - 程序中出现加密／解密 逻辑的操作地方，需要给出注释说明过程（无论是系统还是自定义）
   - 整体代码风格需要统一

### 项目格式化使用 Prettier 插件

> 根目录下.prettierrc 文件配置如下

```
  {
    "tabWidth": 2,
    "useTabs": true, // 使用tab（制表符）缩进而非空格
    "singleQuote": true,// 单引号
    "printWidth": 175,// 一行超过175个字符就换行
    "semi": false,// 是否在行尾加分号
    "trailingComma": "none",// 数组、对象最后一个元素的尾逗号
    "bracketSpacing": true,// 花括号前后空格
    "jsxBracketSameLine": false, // 使多行JSX元素最后一行末尾的 > 单独一行
    "arrowParens": "avoid",//只有一个参数的箭头函数的参数是否带圆括号（默认avoid不带）
    "htmlWhitespaceSensitivity": "ignore"//  HTML 文件空格敏感度
  }
```

### 提交说说明

> type(scope):subject

- type：用于说明 commit 的类别，规定为如下几种 ：
  - feat：新增功能；
  - fix：修复 bug；
  - docs：修改文档；
  - refactor：代码重构，未新增任何功能和修复任何 bug；
  - build：改变构建流程，新增依赖库、工具等（例如 webpack 修改）；
  - content：仅仅修改了空格、缩进等，不改变代码逻辑；
  - perf：改善性能和体现的修改；
  - chore：非 src 和 test 的修改；
  - test：测试用例的修改；
  - ci：自动化流程配置修改；
  - revert：回滚到上一个版本；
- scope：【可选】用于说明 commit 的影响范围
- subject：commit 的简要说明，尽量简短


