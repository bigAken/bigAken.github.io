## 利用 GitHub 持续集成

### 文档

[官方文档](https://docs.github.com/cn/actions/learn-github-actions)

[GitHub Actions 的元数据语法](https://docs.github.com/cn/actions/creating-actions/metadata-syntax-for-github-actions)

[关于持续集成](https://docs.github.com/cn/actions/guides/about-continuous-integration)

[GitHubAction](https://docs.github.com/cn/actions/learn-github-actions/workflow-syntax-for-github-actions)

[Node 使用 GitHubAction](https://docs.github.com/cn/actions/automating-builds-and-tests/building-and-testing-nodejs)

[Javascript 配置 GitHubAction](https://docs.github.com/cn/actions/creating-actions/creating-a-javascript-action)

> 在根目录创建.github 文件夹然后在创建 workflows 文件夹然后在创建 action.yml 文件

### 方法一 使用社区 vue 的 GitHub action

[参考 action](https://github.com/xRealNeon/VuePagesAction/blob/main/action.yml)
[Vue to Github Pages](https://github.com/marketplace/actions/vue-to-github-pages)

```yml
name: CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  build_vue:
    runs-on: ubuntu-latest
    name: Build Vue
    steps:
      - uses: actions/checkout@v2
      - id: Build-Vue
        uses: xRealNeon/VuePagesAction@1.0.1
        with:
          username: 'bigAken'
          reponame: 'bigAken.github.io'
          token: ${{ secrets.GITHUB_TOKEN }} # Leave this line unchanged
```

### 方法二 个人自定义配置

```yml
name: CI
on:
push:
  branches: [master]
jobs:
build_vue:
  runs-on: ubuntu-latest
  name: Build Vue
  steps:
    - uses: actions/checkout@v2
    - name: Build Vue
      run: |
        npm ci; 
        npm run build; 
        cd dist
        ln -s index.html 404.html
        git config --global user.email "827094438@qq.com"
        git config --global user.name "bigAken"
        git init
        git add -A
        git commit -m '发版'
        git push -f https://bigAken:${{ secrets.GITHUB_TOKEN }}@github.com/bigAken/bigAken.github.io.git master:gh-pages
      shell: bash
      env:
        CI: true
```
