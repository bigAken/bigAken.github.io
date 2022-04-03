# 常用的 http 请求头以及响应头

请求头 3A2CHRU

## 常用的 http 请求头

### Accept

浏览器可以接受服务器返回的数据类型

### Accept-Encoding

浏览器申明自己接收的编码方法，通常指定压缩方法，支持什么压缩方法（例如 gzip，deflate）

### Accept-Language

Accept-Language:zh-CN,zh;q=0.9 浏览器申明自己接收的语言

### Cache-Control

缓存控制，当 Cache-Control:no-cache 响应不会被缓存,而是实时向服务器端请求资源

### Cookie

Cookie 是用来存储一些用户信息以便让服务器辨别用户身份的

### Host

Host:www.baidu.com **指定请求资源的主机和端口号**，它通常从 HTTP URL 中提取出来的。

### Referer

比如在一个网页里面插入一个超链接到其他的页面,那么当点击这个超链接从而链接到另外一个页面的时候，相当于浏览器向 web 服务器发送了一个 http 请求，发送请求时的请求头的 referer 就是上一个页面的 URL，而对于从地址栏里面直接输入 URL 或者是刷新网页的方式，则 referer = null，通过设置这个 referer 可以防止盗链的问题

### User-Agent

客户端使用的操作系统和浏览器的名称和版本

## 常用的 http 响应头

### Cache-Control

Cache-Control:no-cache 浏览器和缓存服务器都不应该缓存页面信息。

### Content-Type

用与约定请求和响应的 Http **body**内容类型和编码

### Content-Encoding

编码类型 Content-Encoding:gzip 告诉客户端，服务端发送的资源是采用 gzip 编码的

### Expires

缓存时间

### Last-Modified

所请求的对象的最后修改日期，缓存相关

### Date

服务端发送资源时的服务器时间

### Connection

回应客户端的 Connection：keep-alive，告诉客户端服务器的 tcp 连接也是一个长连接，客户端可以继续使用这个 tcp 连接发送 http 请求。

### Etag

缓存相关，主要供 WEB 服务器判断一个对象是否改变了，比如前一次请求某个 html 文件时，获得了其 ETag，当这次又请求这个文件时，浏览器就会把先前获得 ETag 值发送给 WEB 服务器，然后 WEB 服务器会把这个 ETag 跟该文件的当前 ETag 进行对比，然后就知道这个文件有没有改变了。
