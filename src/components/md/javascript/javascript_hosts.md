# hosts 文件详解

## 什么是 hosts

hosts —— the static table lookup for host name（主机名查询静态表）。

hosts 文件是一个用于储存计算机网络中各节点信息的计算机文件。这个文件负责将主机名映射到相应的 IP 地址。hosts 文件通常用于补充或取代网络中 DNS 的功能。和 DNS 不同的是，计算机的用户可以直接对 hosts 文件进行控制。

Hosts 是一个没有扩展名的系统文件，其作用就是将一些常用的网址域名与其对应的 IP 地址建立一个关联“数据库”，当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从 Hosts 文件中寻找对应的 IP 地址，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交 DNS 域名解析服务器进行 IP 地址的解析。

优先级 ： dns 缓存 > hosts > dns 服务

## hosts 的位置

hosts 在各个系统中所在的文件夹：

- Windows 系统 hosts 位于 C:\Windows\System32\drivers\etc\hosts
- Android（安卓）系统 hosts 位于 /etc/hosts
- Mac（苹果电脑）系统 hosts 位于 /etc/hosts
- iPhone（iOS）系统 hosts 位于 /etc/hosts
- Linux 系统 hosts 位于 /etc/hosts
- 绝大多数 Unix 系统都是在 /etc/hosts

## hosts 的内容

Windows 版本的 hosts 文件内容如下：

```txt
# Copyright (c) 1993-2009 Microsoft Corp.
# # This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
 # This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
 # 102.54.94.97 rhino.acme.com # source server
 # 38.25.63.10 x.acme.com # x client host
# localhost name resolution is handled within DNS itself.
 # 127.0.0.1 localhost
# ::1 localhost

```

#后都是注释，所以清空 hosts 文件对系统正常运行并没有什么影响。

在一个局域网中，每台机器都有一个主机名，用于区分主机，便于相互访问。
一般/etc/hosts 的内容一般有如下类似内容：
127.0.0.1 localhost.localdomain localhost
192.168.1.100 linumu100.com linumu100
192.168.1.120 ftpserver ftp120

一般情况下 hosts 文件的每行尾一个主机，每行由三部分组成，每个部分由空格隔开

第一部分：网络 IP 地址；
第二部分：主机名或域名；
第三部分：主机名别名；
当然每行也可以是两部分，即主机 IP 地址和主机名。

主机名（hostname)和域名（domain)的区别：主机名通常在局域网内使用，通过 hosts 文件，主机名就被解析到对应 IP;域名通常在 INTERNET 上使用，但如果本机不想使用 internet 上的域名解析，这时就可以更改 hosts 文件，加入自己的域名解析。

## hosts 的作用

### 加快域名解析

对于要经常访问的网站，我们可以通过在 Hosts 中配置域名和 IP 的映射关系，提高域名解析速度。由于有了映射关系，当我们输入域名计算机就能很快解析出 IP，而不用请求网络上的 DNS 服务器。

### 方便局域网用户

在很多单位的局域网中，会有服务器提供给用户使用。但由于局域网中一般很少架设 DNS 服务器，访问这些服务器时，要输入难记的 IP 地址。这对不少人来说相当麻烦。可以分别给这些服务器取个容易记住的名字，然后在 Hosts 中建立 IP 映射，这样以后访问的时候，只要输入这个服务器的名字就行了。

### 屏蔽网站（域名重定向）

有很多网站不经过用户同意就将各种各样的插件安装到你的计算机中，其中有些说不定就是木马或病毒。对于这些网站我们可以利用 Hosts 把该网站的域名映射到错误的 IP 或本地计算机的 IP，这样就不用访问了。

### 顺利连接系统

对于 Lotus 的服务器和一些数据库服务器，在访问时如果直接输入 IP 地址那是不能访问的，只能输入服务器名才能访问。那么我们配置好 Hosts 文件，这样输入服务器名就能顺利连接了。

### 虚拟域名

很多时候，网站建设者需要把”软环境“搭建好，再进行上传调试。但类似于邮件服务，则需要使用域名来辅助调试，这时就可以将本地 IP 地址与一个”虚拟域名“做地址指向，就可以达到要求的效果，且无需花费。如：
**127.0.0.1 网站域名**
之后在浏览器地址栏中输入对应的网站域名即可。

## 如何修改 hosts

### 屏蔽网站（域名重定向）

在 WINDOWS 系统中，约定 127.0.0.1 为本地计算机的 IP 地址, 0.0.0.0 是错误的 IP 地址。
如果，我们在 hosts 中，写入以下内容：

127.0.0.1 要屏蔽的网站 A 的域名
0.0.0.0 要屏蔽的网站 B 的域名

这样，计算机解析域名 A 和 B 时，就解析到本机 IP 或错误的 IP，达到了屏蔽网站 A 和 B 的目的。

在修改 hosts 文件时候，还常常遇到修改保存后无效的情况，这里要提醒大家注意的一点：很多人是写在最后行，写完最后一行后在没有回车的情况下，这一行是不生效的。一定要记得回车。建议大家遵循这样的习惯：“ip 地址+Tab+域名+换行” 添加记录。

### 局域网用户访问

如果，我们在 A 主机的 hosts 中，写入以下内容：

**B 主机的 ip** **B 主机名**

这样我们就可以通过 B 主机名找到 B 主机及其服务。

### 通过修改 hosts 上 google

第一步：下载可以正常使用的 hosts 文件
可以在百度搜索类似“Google hosts”等相关关键词或者老 D，找到最新可用的 host 文件。

第二步：修改本地 hosts 文件
在电脑系统中找到 hosts，路径基本上是 C:\Windows\System32\drivers\etc，然后将下载的 hosts 文件将本地 hosts 文件替换，或者在本地 hosts 文件中直接在地址栏修改即可！

第三步：刷新本地 dns

第二步完成本地 hosts 文件的修改之后，可以使用 dos 命令完成最后的操作。

（1）使用 WIN+R 键，启动运行，键入 cmd
（2）在 dos 界面输入“ipcong /flushdns”
（3）dos 命令窗提示“已成功刷新 DNS 解析缓存”，就完成了。

## 其他

### 怎么获取域名所对应的 IP 地址

打开“开始――运行”，输入“cmd”，在命令行界面输入“ping www.baidu.com”，回车。显示结果类似：Reply from 220.181.6.18:bytes=32 time=24msTTL=55。其中的 220.181.6.18 就是域名所对应 IP 地址（百度的）。呵呵！

### 修改 hosts 后生效方法

#### Windows

开始 -> 运行 -> 输入 cmd -> 在 CMD 窗口输入
ipconfig /flushdns

#### Linux

打开终端
重启网络：
sudo /etc/init.d/networking restart

desktop 版可以这样重启：
sudo service network-manager restart

如果只是修改了某个网卡(例如 eth0)的信息，也可以通过重启网卡的方式使其修改生效。
sudo ifdown eth0 sudo ifup eth0

如果不懂请都尝试下

#### Mac OS X 终端输入

sudo killall -HUP mDNSResponder

#### Android

开启飞行模式 -> 关闭飞行模式

#### 通用方法

拔网线(断网) -> 插网线(重新连接网络)
如不行请清空浏览器缓存（建议不要使用国产浏览器，请使用谷歌 Chrome 浏览器）
