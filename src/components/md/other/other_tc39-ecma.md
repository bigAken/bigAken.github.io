# 关于 JavaScript TC39 与 ECMAScript 提案

参考[TC39 规范制定流程 ](https://www.cnblogs.com/ayqy/p/tc39-workflow.html)

## JavaScript 的诞生

1995 年 5 月，一个叫 [Brendan Eich(布兰登·艾奇)](https://baike.baidu.com/item/%E5%B8%83%E5%85%B0%E7%99%BB%C2%B7%E8%89%BE%E5%A5%87/58101949?fromtitle=Brendan%20Eich&fromid=561441&fr=aladdin) 的人花 10 天创造了 JavaScript

## JavaScript 语言的标准化

最初 JavaScript 语言有 2 份标准：

- ECMA-262：主标准，由 ECMA 国际组织（Ecma International）负责管理
- ISO/IEC 16262：第二标准，由国际标准化组织（ISO，International Organization for Standardization）和国际电子技术委员会（IEC，International Electrotechnical Commission）负责管理

出于商标版权的原因，规范标准中将这门语言称为 ECMAScript，所以原则上 JavaScript 与 ECMAScript 指的是同一个东西，但有时也会加以区分：

- JavaScript：指语言及其实现
- ECMAScript：指语言标准及语言版本，比如 ES6 表示语言（标准）的第 6 版

> ECMAScript 中的 ECMA 取自负责管理主标准的 ECMA 国际组织，这个组织最初叫欧洲计算机制造商协会（European Computer Manufacturers Association），后来影响范围不限于欧洲，遂更名为 ECMA 国际组织（Ecma International）

## ES 规范版本历史

- ECMAScript 1（1997 年 6 月）：规范第一版
- ECMAScript 2（1998 年 6 月）：为了同步 ISO 标准，引入了一些小更新
- ECMAScript 3（1999 年 12 月）：增加了正则表达式、字符串处理、控制语句（do-while、switch）、异常处理（try-catch）等众多核心特性
- ECMAScript 4（2008 年 7 月废除)：本来是一次大规模升级（静态类型、模块、命名空间等），但跨度过大，出现了分歧，最终没能推广使用
- ECMAScript 5（2009 年 12 月）：变化不大，加了一些标准库特性和严格模式
- ECMAScript 5.1（2011 年 6 月）：又一次小更新，为了同步 ISO 标准
- ECMAScript 6（2015 年 6 月）：一大波更新，实现了当年 ES4 的许多设想，并正式改为按年份命名规范版本（以后不叫 es7 叫 es2016）
- ECMAScript 2016（2016 年 6 月）：第一个年度版本，与 ES6 相比，发布周期较短，新特性也相对少些
- ECMAScript 2017（2017 年 6 月）：第二个年度版本
- 以后的 ECMAScript 版本（ES2018、ES2019、ES2020 等）都在 6 月正式获准生效

## TC39

> ECMA 国际组织设有众多技术委员会，除 TC39 ECMAScript 外，还有 TC43 Universal 3D (U3D)、TC45 Office Open XML Formats 等等，具体见[Ecma template for minutes - Ecma International]()

### TC39 是什么？包括哪些人？

一个推动 JavaScript 发展的委员会，由各个主流浏览器厂商的代表构成

### 为什么会出现这样一个组织

制定 ECMAScript 标准，标准生成的流程，并实现

## TC39 标准制定流程

从 ES6 来看，发版周期过长存在 2 个问题:

- 版本之间的时间跨度太长，提早定稿的特性要等待非常长的时间，一直等到规范正式发布（才能被实现和使用），而靠后的特性往往赶在最后发版期限之前才定稿，存在风险
- 语言特性的设计与实现和使用相隔太久，在实现和使用阶段才发现设计缺陷为时已晚
  为此，[TC39](https://www.ecma-international.org/technical-committees/tc39/)（ECMA 国际组织第 39 号技术委员会）启动了新的流程：

主要变化在于：

- ECMAScript 各项特性独立设计，历经 5 个阶段，从 Stage 0（Strawman，初稿）开始，经 Stage 1（提案）、Stage 2（草案）、Stage 3（候选提案），最后到 Stage 4（Finished，过审提案）结束
- 要求在后几个阶段进行原型实现和实际测试（[由 Test 262 负责](https://github.com/tc39/test262)），以便在设计和实现之间形成反馈循环
- ECMAScript 每年发布一版，囊括截止最后发版日期之前所有已经进入第 4 阶段的特性

所以，从 ES2016 开始（新 TC39 流程施行以来），ES 版本的概念被大大弱化了，需要关心的是特性提案处于第几阶段，只要进入第 4 阶段就已经算是标准特性了，会在下一个 6 月正式纳入标准

> 按照[TC39 流程文档](https://tc39.es/process-document/)，应该是每年 7 月发版
> July: Approval of new standard by the ECMA General Assembly
> 但实际发版时间是每年 6 月，可能是为了纪念历史上那些 6 月发布的元老版本

### 制定流程的 5 个阶段

[TC39 标准的进程](https://github.com/tc39/proposals)

- **stage0 strawman** 任何讨论、想法、改变或者还没加到提案的特性都在这个阶段。只有 TC39 成员可以提交
- **stage1 proposal**
  1. 产出一个正式的提案。
  2. 发现潜在的问题，例如与其他特性的关系，实现难题。
  3. 提案包括详细的 API 描述，使用例子，以及关于相关的语义和算法。
- **stage2 draft**

1.  提供一个初始的草案规范，与最终标准中包含的特性不会有太大差别。草案之后，原则上只接受增量修改。
2.  开始实验如何实现，实现形式包括 polyfill, 实现引擎（提供草案执行本地支持），或者编译转换（例如 babel）

- **stage3 candidate** 候选阶段，获得具体实现和用户的反馈。此后，只有在实现和使用过程中出现了重大问题才会修改

1.  规范文档必须是完整的，评审人和 ECMAScript 的编辑要在规范上签字
2.  至少要在一个浏览器中实现，提供 polyfill 或者 babel 插件

- **stage4 finished** 已经准备就绪，该特性会出现在下个版本的 ECMAScript 规范之中，需要通过有 2 个独立的实现并通过验收测试，以获取使用过程中的重要实践经验

## 向后兼容原则

我们发现 ES 规范每一版始终完全兼容先前的所有特性，比如 ES6 提出了 let、const 但并没有干掉 var，这是因为如果推出了不兼容的新版本，会造成一些问题：

- JavaScript 引擎、IDE、构建工具都会变得臃肿，因为要支持新旧两版规范
- 开发者需要知道版本之间的差异
- 要么把现有的代码全都迁移到新版本，要么（不同项目）混用多个版本，重构会变得很麻烦
- 甚至要标注每段代码的所属版本，就像 ES5 手动开启严格模式一样，当时没有流行起来的一个原因是在文件或函数开头添加指令也很麻烦
  为了避免这些问题，ES6 采用了一种策略叫 One JavaScript：
- 新版本始终完全向后兼容（但偶尔可能会有轻微、不明显的清理）
- 旧特性不删除也不修复，而是引入更好的版本，比如 let 就是 var 的改进版
- 如果语言的某些方面有变化，只在新的语法结构内生效，即隐式选用，例如，yield 只在 generator 中才是关键字、模块和类中的所有代码都默认开启严格模式
