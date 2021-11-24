# 配置 eslint

[从零开始 eslint](https://www.cnblogs.com/kingsm/p/14129035.html)

[Eslint 中 plugins 和 extends 的区别](https://juejin.cn/post/6859291468138774535)

[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js)

它的目标是提供一个插件化的 javascript**代码检测工具**

使用方法：

1. Configuration Comments(注释配置) - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。
2. Configuration Files(文件配置) - 使用 JavaScript、JSON 或者 YAML 文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的，可以配置一个独立的 .eslintrc.\* 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

如果项目目录下有多个配置文件，ESLint 只会使用一个，优先级为：.eslintrc.js > .eslintrc > package.json，一般我们都是在 .eslintrc.js 配置。

同时，如果配置文件里没有"root": true 这个属性，ESLint 就会继续向外寻找配置文件，直到找到有"root": true 的为止，所有这些配置文件的规则都会被层叠应用。若有重复的属性配置，则离文件更近的配置文件具有更高的优先级。

当想要所有项目都遵循一个特定的约定时会很有用，但还是建议给项目根目录的.eslintrc.js 加上 root: true

> 在 vscode 扩展程序中安装 eslint 扩展，并且启用扩展

## Specifying Parser Options（指定解释器选项）

ESLint 允许你指定你想要支持的 JavaScript **语言选项**。默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。

请注意，支持 JSX 语法并不等同于支持 React。React 对 ESLint 无法识别的 JSX 语法应用特定的语义。如果你正在使用 React 并且想要 React 语义支持，我们建议你使用 eslint-plugin-react。

同样的，支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型）。对于 ES6 语法，使用 { "parserOptions": { "ecmaVersion": 6 } }；对于新的 ES6 全局变量，使用 { "env":{ "es6": true } }. { "env": { "es6": true } } 自动启用 es6 语法，但 { "parserOptions": { "ecmaVersion": 6 } } 不自动启用 es6 全局变量。

解析器选项可以在 .eslintrc.\* 文件使用 parserOptions 属性设置。可用的选项有：

- ecmaVersion - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
- sourceType - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
- ecmaFeatures - 这是个对象，表示你想使用的额外的语言特性:

  - globalReturn - 允许在全局作用域下使用 return 语句
  - impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
  - jsx - 启用 JSX
  - experimentalObjectRestSpread - 启用实验性的 object rest/spread properties 支持。(重要：这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。)

  .eslintrc.json 文件示例：

```json
{
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"rules": {
		"semi": "error"
	}
}
```

## Specifying Parser （指定解释器）

ESLint 默认使用 Espree 作为其解析器，你可以在配置文件中指定一个不同的解析器，只要该解析器符合下列要求：

- 它必须是一个 Node 模块，可以从它出现的配置文件中加载。通常，这意味着应该使用 npm 单独安装解析器包。
- 它必须符合 parser interface。
  注意，即使满足这些兼容性要求，也不能保证一个外部解析器可以与 ESLint 正常配合工作，ESLint 也不会修复与其它解析器不兼容的相关 bug。

为了表明使用该 npm 模块作为你的解析器，你需要在你的 .eslintrc 文件里指定 parser 选项。例如，下面的配置指定了 Esprima 作为解析器：

```json
{
	"parser": "esprima",
	"rules": {
		"semi": "error"
	}
}
```

以下解析器与 ESLint 兼容：

- Esprima
- Babel-ESLint - 一个对 Babel 解析器的包装，使其能够与 ESLint 兼容。
- @typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint 中使用。

> 注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关。

## Specifying Processor (指定处理器)

插件可以提供处理器。处理器可以从另一种文件中提取 JavaScript 代码，然后让 ESLint 检测 JavaScript 代码。或者处理器可以在预处理中转换 JavaScript 代码。

当我们需要为一些非 js 文件类型执行 eslint 规则的检查时，需要为这些文件类型指定一个解析器，解析器可以用来将非 js 类型的文件转换成为可以被 eslint parser 所识别的语法，但是 processor 不能作为独立的配置项在使用，必须放在 plugins 中。例如想要对 json 文件像 js 文件一样使用 eslint 规则检查，需要使用一个 plugin，plugin 中需要导出固定的内容。看一下 eslint-plugin-json-processor 的实现。

```js
module.exports = {
	processors: {
		'.json': {
			preprocess: function (text, filename) {
				return [{ text: `(${text})`, filename: filename }]
			},

			supportsAutofix: false
		}
	}
}
```

eslint 在执行的过程中会根据 processors 的 key 进行匹配，如果跟所要检查的文件后缀相同，则会执行对应的解析器。

如果需要使用 eslint-plugin-json-processor 需要按照如下的方式:

```js
module.exports = {
	plugins: ['eslint-plugin-json-processor'],
	rules: {
		quotes: ['error', 'single']
	}
}
```

这样就会对 json 文件中的引号起到检查作用。

## Specifying Globals (指定全局变量)

当访问当前源文件内未定义的变量时（例如 window），no-undef 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。如下：

```js
// 如果我们在文件中使用了 window
window.appName = 'myApp'
```

此时 eslint 会报出如下错误
`error 'window' is not defined no-undef`
如果在这种场景下需要绕过 eslint 检查，可以在 globals 配置中允许使用 window

```js
// .eslintrc.js
module.exports = {
	globals: {
		window: true
	}
}
```

这样就可以绕过对 window 的检查

## Specifying Environments (指定环境 env)

有时候在文件中可能需要针对某一类的全局变量绕过检查，例如我们编写的代码时运行在浏览器环境中，常常会使用 window、document 这一类的全局变量，除了可以一个一个在 globals 中进行允许之外，还可以在 env 配置中设置某一个或某几个环境变量。下面列出一些常用的的环境类型，更多完整的可以在官方文档中查看，常用的有如下：
|env|说明|
|---|---|
|browser|允许使用浏览器环境中的全局变量，如：window、document|
|node|允许使用 node 环境中的全局变量，如：global、module|
|jquery|允许使用 jquery 全局变量，如：$、jQuery|

可以在源文件里、在配置文件中或使用 命令行 的 --env 选项来指定环境。

要在你的 JavaScript 文件中使用注释来指定环境，格式如下：

```js
/* eslint-env node, mocha */
```

该设置启用了 Node.js 和 Mocha 环境。

在配置文件里指定环境

```json
{
	"env": {
		"browser": true,
		"node": true
	}
}
```

## rules

通过 rules 可以灵活地控制 eslint 的检查内容，在完成 eslint 安装之后，eslint 已经提供了很多内置的规则，可以根据实际项目的需要自定义是否选用这些规则。规则的设置有三个级别：

- error or 2: 开启指定规则，检查会抛出错误，并且会打断检查进程的继续执行
- warn or 1: 开启指定规则，检查会抛出警告，不会打断检查进程的继续执行
- off or 0: 关闭指定规则

对于规则除了可以设置错误级别之外，还能通过一些额外配置对规则进行自定义的控制

例如 eslint 内置对引号检查的规则可以设置不同的值：

```js
// .eslintrc.js
module.exports = {
	rules: {
		// quotes: ['error', 'signle', {avoidEscape: true}]
		quotes: ['error', 'signle']
	}
}
```

从上面的实例中可以看到 quotes 这个规则可以除了设置错误级别 error 之外，还有两个配置项，第一个配置项是一个 string，可选值如下：

- single: 单引号 'single'
- double: 双引号 "double"
- backtick: 反引号 \`backtick`

第二个配置项是一个对象，一共有两个属性:

- avoidEscape：布尔值，true 表示如果存在字符串嵌套的情况下最外层的引号允许使用单引号或者双引号，默认值为 false
- allowTemplateLiterals：布尔值，true 表示允许使用反引号

[在这里你可以查找到所有的 eslint 内置规则](https://eslint.org/docs/rules/)

## plugins

plugin 插件主要是为 eslint 新增一些检查规则，包含一组 rules 规则，plugin内部可能包含 config 配置，config 配置主要是用来配置 extends 例如

```js
module.export = {
	extends: ['eslint-plugin-react/recommended']
}
```

eslint-plugin-react [源文件](https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js)大概如下，可以看到其中就包括了 rules:allRules 和 configs

```js
// eslint-plugin-react
const allRules = {
  'boolean-prop-naming': require('./lib/rules/boolean-prop-naming'),
  'button-has-type': require('./lib/rules/button-has-type'),
  // 等等
}
module.exports = {
  deprecatedRules,
  // rules 规则
  rules: allRules,
  // config 配置
  configs: {
    recommended: {
      plugins: [
        'react',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react/display-name': 2,
        'react/jsx-key': 2,
        'react/jsx-no-comment-textnodes': 2,
        // 等等
      },
    },
    all: {
      plugins: [
        'react',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: activeRulesConfig,
    },
    'jsx-runtime': {
      plugins: [
        'react',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null, // for @typescript/eslint-parser
      },
      rules: {
        'react/react-in-jsx-scope': 0,
        'react/jsx-uses-react': 0,
      },
    },
  },
};
```

若要选择 eslint-plugin-react 中的一条配置到.eslintrc.js 的 rules 中则可以如下处理才生效

```js
//	.eslintrc.js
module.exports = {
	plugins: ['eslint-plugin-react'],
	rules: {
		// eslint-plugin-react/boolean-prop-naming 加载的是module.exports对象下面的rules
		// 跟config里面rules没有任何关系
		'eslint-plugin-react/boolean-prop-naming': 2
	}
}
```

## extends

extends 主要是一个配置对象，相当于一个已经配置好的.eslintrc.js
例如使用 eslint-plugin-react 中config下面的 recommended 配置下，写法如下：

```js
module.export = {
	extends: ['eslint-plugin-react/recommended']
}
```

可以同时使用 eslint-plugin-react 中的 config 和 module.exports 对象下面的 rules，
如下：

```js
module.export = {
	// 配置插件
	plugins: ['eslint-plugin-react'],
	// 使用插件eslint-plugin-react中的recommended 配置
	extends: ['eslint-plugin-react/recommended'],
	rules: {
		// 使用插件eslint-plugin-react中的一条规则
		'eslint-plugin-react/boolean-prop-naming': 2
	}
}
```
