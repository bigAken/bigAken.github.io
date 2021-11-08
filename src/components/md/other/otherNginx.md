### 本地搭建 Nginx 服务器启动 web 项目

安装 widnow.s 版本的 nginx，首先下载 nginx 最新的版[nginx](https://nginx.org/en/download.html)
下载之后，解压到一个目录下面切换到 nginx-1.15.3 目录下，然后运行 nginx.exe(双击)
也可以使用命令行工具

nginx 默认的端口是 80 端口，修改端口可在 conf\nginx.conf 中修改

```bash
#keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80//8090;//侦听80端口，可修改为任意没有占用的端口，比如8090
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
默认主页目录在nginx安装目录的html子目录
        location / {
            root   html;
            index  index.html index.htm;
        }
```

在 nginx 目录下的 html 目录下面，删除改目录下的 html 文件。添加自己的 html 文件
或者修改 root 的为打包好的文件路径
