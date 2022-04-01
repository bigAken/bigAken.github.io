# vue-router 两种模式的区别

[转载于掘金](https://juejin.cn/post/6867875626611654663)

## hash 模式

### 原理

#后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。每次 hash 值的变化，会触发 hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听 hashchange 来实现更新页面部分内容的操作：

### 优点

1. hash 值会出现在 URL 中, 但是不会被包含在 Http 请求中, 因此 hash 值改变不会重新加载页面
2. hash 改变会触发 hashchange 事件, 能控制浏览器的前进后退
3. 兼容性好

### 缺点

1. 地址栏中携带#，不美观
2. 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL
3. hash 有体积限制，故只可添加短字符串
4. 设置的新值必须与原来不一样才会触发 hashchange 事件，并将记录添加到栈中
5. 每次 URL 的改变不属于一次 http 请求，所以不利于 SEO 优化

### 代码实现

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>hash</title>
  </head>
  <body>
    <div class="main">
      <a href="#/a">a页面</a>
      <a href="#/b">b页面</a>
      <a href="#/c">c页面</a>
      <div id="content"></div>
    </div>

    <script>
      // Router 构造函数
      class Router {
        constructor(routers) {
          this.routers = {};
          routers.forEach((item) => {
            // 每个hash值 匹配对应component
            this.route(item.path, () => {
              document.getElementById("content").innerHTML = item.compontent;
            });
          });
          this.init();
        }
        route(path, cb) {
          this.routers[path] = cb;
        }
        init() {
          window.addEventListener("load", this.updateView.bind(this));
          // hash模式 路由修改时 浏览器会触发hashchange事件 调用更新视图函数
          window.addEventListener("hashchange", this.updateView.bind(this));
        }
        updateView(e) {
          // console.log("hash window.location", window.location);
          // 获取页面hash值 通过hash值更新对应的组件内容
          const hashTag = window.location.hash.slice(1) || "/";
          this.routers[hashTag] && this.routers[hashTag]();
        }
      }
      const routers = [
        {
          path: "/a",
          compontent: `<div>我是a页面</div>`,
        },
        {
          path: "/b",
          compontent: `<div>我是b页面</div>`,
        },
        {
          path: "/c",
          compontent: `<div>我是c页面</div>`,
        },
      ];
      new Router(routers);
    </script>
  </body>
</html>

```

## history 模式

### 原理

基于 HTML5 新增的 pushState()和 replaceState()两个 api，以及浏览器的 popstate 事件，地址变化时，通过 window.location.pathname 找到对应的组件

### 优点

1. 没有#，更加美观
2. pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL
3. pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中
4. pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中
5. pushState() 可额外设置 title 属性供后续使用
6. 浏览器的进后退能触发浏览器的 popstate 事件，获取 window.location.pathname 来控制页面的变化

### 缺点

1. URL 的改变属于 http 请求，借助 history.pushState 实现页面的无刷新跳转，因此会重新请求服务器。所以前端的 URL 必须和实际向后端发起请求的 URL 一致。如果用户输入的 URL 回车或者浏览器刷新或者分享出去某个页面路径，用户点击后，URL 与后端配置的页面请求 URL 不一致，则匹配不到任何静态资源，就会返回 404 页面。所以需要后台配置支持，覆盖所有情况的候选资源，如果 URL 匹配不到任何静态资源，则应该返回 app 依赖的页面或者应用首页。
2. 兼容性差，特定浏览器支持

### 代码实现

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>history</title>
  </head>
  <body>
    <div class="main">
      <a href="javascript:;" path="/a">a页面</a>
      <a href="javascript:;" path="/b">b页面</a>
      <a href="javascript:;" path="/c">c页面</a>
      <div id="content"></div>
    </div>

    <script>
      class Router {
        constructor(routers) {
          this.routers = {};
          routers.forEach((item) => {
            this.route(item.path, () => {
              document.getElementById("content").innerHTML = item.compontent;
            });
          });
          this.bindClick();
          this.init();
        }
        route(path, cb) {
          this.routers[path] = cb;
        }
        bindClick() {
          // history模式需要手动添加路由 通过 history的pushState事件
          const links = document.getElementsByTagName("a");
          // [].forEach.call() => Array.prototype.forEach()
          [].forEach.call(links, (link) => {
            link.addEventListener("click", () => {
              const path = link.getAttribute("path");
              this.pushRoute(path);
            });
          });
        }
        pushRoute(path) {
          window.history.pushState({}, null, path);
          this.updateView();
        }
        init() {
          window.addEventListener("load", this.updateView.bind(this));
          // history模式 路由修改 浏览器会触发popstate事件
          window.addEventListener("popstate", this.updateView.bind(this));
        }
        updateView(e) {
          // console.log("history window.location", window.location);
          // console.log("history window.history", window.history);
          const currentUrl = window.location.pathname || "/";
          this.routers[currentUrl] && this.routers[currentUrl]();
        }
      }
      const routers = [
        {
          path: "/a",
          compontent: `<div>我是a页面</div>`,
        },
        {
          path: "/b",
          compontent: `<div>我是b页面</div>`,
        },
        {
          path: "/c",
          compontent: `<div>我是c页面</div>`,
        },
      ];
      new Router(routers);
    </script>
  </body>
</html>

```

### 修改历史状态

包括了 pushState,replaceState 两个方法,这两个方法接收三个参数:stateObj,title,url

```js
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```

### 切换历史状态

包括 back,forward,go 三个方法，对应浏览器的前进 forward，后退 back，跳转 go 操作。 有同学说了，(谷歌)浏览器只有前进和后退，没有跳转，嗯，在前进后退上长按鼠标，会出来所有当前窗口的历史记录，从而可以跳转(也许叫跳更合适)：

```js
history.go(-2) //后退两次
history.go(2) //前进两次
history.back() //后退
hsitory.forward() //前进
```
