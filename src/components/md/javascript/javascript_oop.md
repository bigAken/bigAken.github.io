# Javascript 面向对象七大原则

七大原则：
1：单一责任原则：一个类只对一个功能负责

2：里氏代换原则(LSP)： 子类型必须能够替换掉它们的父类型。

3：开闭原则：对扩展开放，对修改封闭。

4：接口隔离原则：客户端不应该依赖它不需要的接口，一个类对另一个类的依赖应该建立在最小的接口上

5：依赖倒转原则：高层模块不应该依赖低层模块，二者都应该依赖其抽象；

6：迪米特原则：最少知道原则

7: 组合聚合复用原则:在软件复用时，要尽量先使用组合或者聚合等关联关系来实现，其次才考虑使用继承关系来实现。

## 单一责任原则

含义：对于一个类，只有一个引起该类变化的原因；该类的职责是唯一的，所谓职责是指类变化的原因。如果一个类有多于一个的动机被改变，那么这个类就具有多于一个的职责。而单一职责原则就是指一个类或者模块应该有且只有一个改变的原因。（来自百度百科）

通俗一点来说，一个类应该只做一类事情；一个类应该只负责一个功能。

目的：降低代码复杂度、系统解耦合、提高可读性

举个例子：

单一原则就记住一句话就好了，就是'一个类只对一个功能负责'。比如说现在有拍照和播放音乐两个功能要实现。错误的做法就是把这两个功能都封装到一个类里面，正确的做法是，封装两个类，一个实现拍照功能，一个实现播放音乐的功能。

代码如下：

```js
// 定义拍照类
class Photograph {
	constructor(name) {
		this.name = name
	}
	photograph() {
		console.log(`给${this.name}拍照`)
	}
}
// 定义播放音乐类
class PlayMusic {
	constructor(musicName) {
		this.musicName = musicName
	}
	outMusicName() {
		console.log(`播放音乐${this.musicName}`)
	}
}

var photograph1 = new Photograph('小明')
var playMusic1 = new PlayMusic('爱我中华')
photograph1.photograph() // 给小明拍照
playMusic1.outMusicName() // 播放音乐爱我中华
```

## 开闭原则

含义：在面向对象编程领域中，开闭原则规定“软件中的对象（类，模块，函数等等）应该对于扩展是开放的，但是对于修改是封闭的”，这意味着一个实体是允许在不改变它的源代码的前提下变更它的行为。（来自百度百科）

解释：白话意思就是我们改变一个软件时（比如扩展其他功能），应该通过扩展的方式来达到软件的改变，而不应该修改原有代码来实现变化。坚持开闭原则有利于用最少的代码进行项目维护。我觉得开闭原则就是对多态的一种体现。（个人理解，不对可喷。）

举个栗子：

```js
// 定义大鱼类
class BigFish {
	constructor(name) {
		this.name = name
	}
	eat() {
		console.log(`我是大鱼我吃小鱼`)
	}
}
// 定义小鱼类继承大鱼类
class SmallFish extends BigFish {
	constructor(name) {
		super(name)
	}
	// 重写吃方法，小鱼类只能吃虾米
	eat() {
		console.log(`我是小鱼我吃虾米`)
	}
}
```

## 里氏代换原则(LSP)

定义：里氏代换原则(Liskov Substitution Principle LSP)面向对象设计的基本原则之一。 里氏代换原则中说，任何基类(父类)可以出现的地方，子类一定可以出现。 LSP 是继承复用的基石，只有当衍生类可以替换掉基类（父类），软件单位的功能不受到影响时，基类（父类）才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。里氏代换原则是对“开-闭”原则的补充。（来自百度百科）
这个原则就是说你实例化了一个父类的实例，通过这个实例实现了一个功能，要保证这个功能，通过继承过这个父类的子类所实例化的实例，同样能实现这个功能。

举个例子：

已经定义鸟类具有一个飞的方法，现在通过鸟类实例化了一个小鸟 1 实例，调用飞方法，实现了让小鸟 1 飞（这是一个功能）。

定义一个鸵鸟类，和一个老鹰类都继承自鸟类。这样的写法就违反了我们的里氏替换原则。因为此时你通过鸵鸟类来例化一个鸵鸟 1 的实例，是不能用鸵鸟 1 实例去替换掉，上面通过鸟类实例化的小鸟 1 实例的，因为鸵鸟 1 实例并没有办法实现飞的功能，这就违背了里氏替换功能。

正确的做法是，应该创建并列的两种鸟的父类，会飞与不会飞的，会飞的鸟类继承会飞的鸟的父类，不会飞的鸟类继承不会飞的鸟的父类。
通过例子我们可以看出，老鹰 1 和老鹰 2 并不是通过一个类实例出来的，而是通过一个父类实例化和一个子类实例化出来的，但是都可以实现飞的功能，这个就是里氏替换原则。

```js
// 定义会飞的鸟类
class CanFly {
	constructor(name) {
		this.name = name
	}
	canFly() {
		console.log(`我是${this.name} I can fly`)
	}
}
// 定义不会飞的鸟类
class NotCanFly {
	constructor(name) {
		this.name = name
	}
	notCanFly() {
		console.log(`我是${this.name} I not can fly`)
	}
}
// 定义老鹰类
class LaoYing extends CanFly {
	constructor(name, color) {
		super(name)
		this.color = color
	}
	color() {
		console.log(this.color)
	}
}
// 定义鸵鸟类
class TuoNiao extends NotCanFly {
	constructor(name, color) {
		super(name)
		this.color = color
	}
	color() {
		console.log(this.color)
	}
}

var laoYing1 = new LaoYing('老鹰一', '白色') // 通过LaoYing类实例化老鹰1实例
var laoYing2 = new CanFly('老鹰二') // 通过会飞的鸟类实例化老鹰2实例

laoYing1.canFly() // 我是老鹰一 I can fly
laoYing2.canFly() // 我是老鹰二 I can fly
```

## 接口隔离原则

含义：客户端不应该依赖它不需要的接口，一个类对另一个类的依赖应该建立在最小的接口上。（来自百度百科）

举个栗子：

现在有一个考试类，上面有考试接口，分别是考语数外、理化生、政史地等接口。现在有文科学生类和理科学生类分别继承考试类，实现考试类的接口进行考试。这里就有些违反接口隔离原则了，因为文科学生并不需要考物理化，理科学生也并不需要考政史地。

解决：

对考试接口进行细化，文科考试接口和理科考试接口；文科生、理科生另外各自实现文科考试接口、理科考试接口。

```js
// 文科考试接口
class ArtsExam {
	constructor(name) {
		this.name = name
	}
	exam() {
		console.log(`我是${this.name}我要参加考语数外历史地理政治`)
	}
}
// 理科考试接口
class ScienceExam {
	constructor(name) {
		this.name = name
	}
	exam() {
		console.log(`我是${this.name}我要参加考语数外物理化学生物`)
	}
}
// 文科学生
class Arts extends ArtsExam {
	constructor(name) {
		super(name)
	}
}
// 理科学生
class Science extends ScienceExam {
	constructor(name) {
		super(name)
	}
}

student1 = new Arts('文科生小红')
student1.exam() // 我是文科生小红我要参加考语数外历史地理政治

student2 = new Science('理科生小明')
student2.exam() // 我是理科生小明我要参加考语数外物理化学生物
```

## 依赖倒转原则

含义：依赖倒置原则（Dependence Inversion Principle）是程序要依赖于抽象接口，不要依赖于具体实现。简单的说就是要求对抽象进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。（来自百度百科）
关键：

高层模块不应该依赖低层模块，两者都应该依赖其抽象
抽象不应该依赖细节
细节应该依赖抽象
目的：避免需求变化导致过多的维护工作

解释：简单来说就是程序要依赖于抽象接口，不要依赖于具体实现。要求对抽象进行编程，不要对实现进行编程。

举个栗子：
现有一个人类，人类有一个读书的接口，因为是读书，所以要定义一个 Person 的类和要定义一个读书类。

```js
class Book {
	constructor(content) {
		this.content = content
	}
	outPutContent() {
		console.log(`书的内容是${this.content}`)
	}
}
// 人类
class People {
	constructor(name) {
		this.name = name
	}
	// 读抽象方法的具体实现
	reader(what) {
		console.log(`${this.name}读的`, what.outPutContent())
	}
}
```

这就违反了依赖倒置原则，因为你此时人类是高层模块，书是低层模块，高层模块人类依赖了低层模块书类。因为写死了读书类，此时如果要让人类去读报纸，原有的读书方法很难做到。应该把阅读类抽出来，交由子类（书类 报纸类）去实现

解决：

```js
// 阅读类
class Reader {
	constructor(content) {
		this.content = content
	}
	// 获取内容的抽象方法
	outPutContent() {
		throw 'Abstract methods require concrete implementation'
	}
}

// 书类
class Book extends Reader {
	constructor(content) {
		super(content)
	}
	// 获取内容的抽象方法的实现
	outPutContent() {
		console.log(`书的内容是${this.content}`)
	}
}
// 报纸类
class NewsPaper extends Reader {
	constructor(content) {
		super(content)
	}
	// 获取内容的抽象方法的实现
	outPutContent() {
		console.log(`报纸的内容是${this.content}`)
	}
}

// 人类
class People {
	constructor(name) {
		this.name = name
	}
	// 读抽象方法的具体实现
	reader(what) {
		console.log(`${this.name}读的`, what.outPutContent())
	}
}

let xiaoMing = new People('小明')
let xiaoHong = new People('小红')
let anTuSheng = new Book('安徒生故事')
let wanBao = new NewsPaper('今日晚报')

xiaoMing.reader(anTuSheng) // 书的内容是安徒生故事 小明读的
xiaoMing.reader(wanBao) // 报纸的内容是今日晚报 小明读的

xiaoHong.reader(anTuSheng) // 书的内容是安徒生故事 小红读的
xiaoHong.reader(wanBao) // 报纸的内容是今日晚报 小红读的
```

## 迪米特原则

含义：迪米特法则（Law of Demeter）又叫作最少知识原则（Least Knowledge Principle 简写 LKP），就是说一个对象应当对其他对象有尽可能少的了解,不和陌生人说话。英文简写为: LoD.（来自百度百科）

迪米特法则的做法观念就是类间解耦，弱耦合。如果类与类之间的耦合度太高，当一个类发生改变时，和他有关系的类也会发生变化。这样很不利于扩展和维护，当我们后期加需求或者改需求的时候，代码很难进行编写。

举个栗子：
现在又一个客人的类，客人点了一道西红柿炒鸡蛋。这个西红柿炒鸡蛋需要厨师类去做。比如厨师类要切西红柿，打鸡蛋，炒，放盐好几个方法完成这道菜，然后把菜给客人。迪米特原则在这里的体现就是，客人点了菜，然后初厨师给客人菜，期间厨师咋做的这道菜客人完全不需要知道。

```js
// 客人类
class Guest {
	constructor(name) {
		this.name = name
	}
	// 点菜方法
	orderDishes(val) {
		console.log(val.outPutDishes())
	}
}
// 厨师类
class Chef {
	// 切西红柿
	cutTomatoes() {
		console.log('切西红柿')
	}
	// 打鸡蛋
	hitEgg() {
		console.log('打鸡蛋')
	}
	// 放盐
	putSalt() {
		console.log('放盐')
	}
	// 给客人菜方法
	outPutDishes() {
		this.cutTomatoes()
		this.hitEgg()
		this.putSalt()
		console.log()
		return '西红柿炒鸡蛋'
	}
}
let xiaoMing = new Guest('小明')
let chef1 = new Chef()
xiaoMing.orderDishes(chef1)
```

## 组合聚合复用原则

聚合（Aggregation）表示一种弱的‘拥有’关系，是整体和个体之间的关系,即 has-a 的关系，此时整体与部分之间是可分离的，他们可以具有各自的生命周期。

合成（Composition）则是一种强的'拥有'关系，他体现的是一种 contains-a 的关系，这种关系比聚合更强，也称为强聚合。体现了严格的部分和整体关系，部分和整体的生命周期一样。

组合聚合复用原则又叫合成复用原则，就是在一个新的对象里通过关联关系（组合关系、聚合关系）来使用一些已有的对象，使之成为新对象的一部分；新对象通过委派调用已有对象的方法达到复用功能的目的。简而言之，尽量使用 组合/聚合 的方式，而不是使用继承。

来源[js 面向对象七大原则](https://www.cnblogs.com/zhengyufeng/p/11058046.html)
