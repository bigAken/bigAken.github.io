# javascript 相关知识碎片

## stage 0，1，2，3 这些阶段代表什么

代表 JavaScript新增的语法的每个阶段的提案啊，es 是一个广泛公开的标准，不是谁一个人说了算的，因此要往语言里添加新特性，需要像委员会提交提案，并在社区讨论，提交提案的一方一般会自己根据提案来实现一个初级版本并通过转译来进行试用新特性。提案分阶段，越往后表示提案被接受的程度越高，受众越广，并且在通过最后一个阶段之后采纳为语言的自身特性，并由引擎自己来实现支持。并不是所有提案多会被通过，也有很多被废弃或者修改的，只有社区广泛认可的提案才会被最终采纳

stage0 (https://babeljs.io/docs/en/babel-preset-stage-0) 只是一个美好激进的想法，一些 Babel 插件实现了对这些特性的支持 ，但是不确定是否会被定为标准.

stage1 (https://babeljs.io/docs/en/babel-preset-stage-1) 值得被纳入标准的特性.

stage2 (https://babeljs.io/docs/en/babel-preset-stage-2) 该特性规范己经被起草，将会被纳入标准里.

stage3 (https://babeljs.io/docs/en/babel-preset-stage-3) 该特性规范已经定稿，大浏览器厂商和 Node.js 社区己开始着手实现.
