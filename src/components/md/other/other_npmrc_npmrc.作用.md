### .npmrc 文件的作用

有些项目根目录下可能有个.npmrc 的文件，点开一看只有一句话
registry=http://registry.npm.xxxx.com
就是 npm 仓库镜像地址

在 npm i 的时候，如果项目根目录下有这个文件，会自动从这个镜像地址下安装 node_modules，不需要手动设置镜像地址

#### 常用配置

```txt
home=https://npm.taobao.org
registry=https://registry.npm.taobao.org/
sass_binary_site="https://npm.taobao.org/mirrors/node-sass/"
phantomjs_cdnurl="http://cnpmjs.org/downloads"
electron_mirror="https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror="https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror="https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl="https://cdn.npm.taobao.org/dist/chromedriver"
```
