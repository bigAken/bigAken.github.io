# PostCss

PostCSS 是一个允许使用 JS 插件转换样式的工具。

> 可以直观的理解为：它就是 css 平台,这个平台上有许多插件，可以使用这些插件来处理 css

这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins，
编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。

PostCSS 在工业界被广泛地应用，其中不乏很多有名的行业领导者，如：维基百科，Twitter，阿里巴巴，JetBrains。

PostCSS 的 [Autoprefixer] 插件是最流行的 CSS 处理工具之一。

## 插件

截止到目前，PostCSS 有 200 多个插件。你可以在 插件列表 或 搜索目录 找到它们。
下方的列表是我们最喜欢的插件 - 它们很好地演示了我们可以用 PostCSS 做些什么。

如果你有任何新的想法，开发 PostCSS 插件 非常简单易上手。

### 解决全局 CSS 的问题

- postcss-use 允许你在 CSS 里明确地设置 PostCSS 插件，并且只在当前文件执行它们。
- postcss-modules 和 react-css-modules 可以自动以组件为单位隔绝 CSS 选择器。
- postcss-autoreset 是全局样式重置的又一个选择，它更适用于分离的组件。
- postcss-initial 添加了 all: initial 的支持，重置了所有继承的样式。
- cq-prolyfill 添加了容器查询的支持，允许添加响应于父元素宽度的样式.

### 提前使用先进的 CSS 特性

- autoprefixer 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。
- postcss-cssnext 允许你使用未来的 CSS 特性（包括 autoprefixer）。
- postcss-image-set-polyfill 为所有浏览器模拟了 image-set 函数逻辑。

### 更佳的 CSS 可读性

- precss 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。
- postcss-sorting 给规则的内容以及@规则排序。
- postcss-utilities 囊括了最常用的简写方式和书写帮助。
- short 添加并拓展了大量的缩写属性。

### 图片和字体

- postcss-assets 可以插入图片尺寸和内联文件。
- postcss-sprites 能生成雪碧图。
- font-magician 生成所有在 CSS 里需要的 @font-face 规则。
- postcss-inline-svg 允许你内联 SVG 并定制它的样式。
- postcss-write-svg 允许你在 CSS 里写简单的 SVG。

### 提示器（Linters）

- postcss-rtl 在单个 CSS 文件里组合了两个方向（左到右，右到左）的样式。
- cssnano 是一个模块化的 CSS 压缩器。
- lost 是一个功能强大的 calc() 栅格系统。
- rtlcss 镜像翻转 CSS 样式，适用于 right-to-left 的应用场景。

### 其它

postcss-rtl 在单个 CSS 文件里组合了两个方向（左到右，右到左）的样式。
cssnano 是一个模块化的 CSS 压缩器。
lost 是一个功能强大的 calc() 栅格系统。
rtlcss 镜像翻转 CSS 样式，适用于 right-to-left 的应用场景。

### 语法

PostCSS 可以转化样式到任意语法，不仅仅是 CSS。
如果还没有支持你最喜欢的语法，你可以编写一个解释器以及（或者）一个 stringifier 来拓展 PostCSS。

- sugarss 是一个以缩进为基础的语法，类似于 Sass 和 Stylus。
- postcss-html 允许你在 HTML / Markdown / Vue component 里编写样式。
- postcss-scss 允许你使用 SCSS (但并没有将 SCSS 编译到 CSS)。
- postcss-sass 允许你使用 Sass (但并没有将 Sass 编译到 CSS)。
- postcss-less 允许你使用 Less (但并没有将 LESS 编译到 CSS)。
- postcss-less-engine 允许你使用 Less (并且使用真正的 Less.js 把 LESS 编译到 CSS)。
- postcss-js 允许你在 JS 里编写样式，或者转换成 React 的内联样式／Radium／JSS。
- postcss-safe-parser 查找并修复 CSS 语法错误。
- midas 将 CSS 字符串转化成高亮的 HTML。

## 实践

使用`npm init -y`初始化一个项目

```bash
npm i -D postcss postcss-cli
```

```bash
npm i -save autoprefixer postcss-pxtorem
```

package.json

```json
  "scripts": {
    "postcss": "npx postcss src -d dist --watch"
  },
```

在根目录下新建 src 文件夹，新建 demo.css

```css
.test {
	transform: rotate(30deg);
}
.hello {
	display: flex;
}
.h {
	width: 300px;
	user-select: none;
}
```

新建`postcss.config.js`

```js
module.exports = {
	plugins: {
		autoprefixer: {},
		// flexible配置
		'postcss-pxtorem': {
			rootValue: 75, // 设计稿宽度的1/10
			propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
		}
	}
}
```

新建`.browserslistrc`

```text
> 0.001%, last 20 versions,Firefox > 10,ie > 6,iOS > 1,dead
```

然后 yarn run postcss,可以看到根目录下有个 demo.css 这个就是 postCss 编译得到的文件

### 在webpack配置
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```
发散思考使用sass，less是否可以在less-loader或者sass-loader处理后配置postCss？如下有待进一步验证

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```