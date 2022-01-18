---
title: Manjaro Linux
date: 2021-1-17 11:23:18
author: Breeze Shane
top: 8
toc: true
mathjax: false
image: /images/Manjaro-logo-text-edit.png
categories: 
 - Linux
 - Manjaro
 - Computer Network
keywords: Manjaro Linux netdisk
tags:
 - Linux
 - Manjaro
 - Docker
 - NextCloud
article: false
---
## 记一次局域网搭建私人云盘的过程

> **参考连接**：[Docker 部署 Nextcloud，快速搭建私有云盘](https://www.wo66.cc/archives/docker%E9%83%A8%E7%BD%B2nextcloud%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E7%A7%81%E6%9C%89%E4%BA%91%E7%9B%98) 

### 过程

在搭建之前应该已经准备好了虚拟内网的相关配置，并且能够保证正常使用。「如果还没有的话请看[这篇](./ZeroTier-One安装与使用.md)」另外，本篇搭建私人云需要使用Docker来进行。

搭建基于NextCloud的私人云需要使用docker安装NextCloud、MySQL以及Redis。因此需要在下面执行命令：`docker pull nextcloud mysql redis`来从官方获取镜像。

这时你要**定好网盘主体的存放位置在哪**，为了便于表述，我们使用`$MAIN`来表示这个地址。

```shell
cd $MAIN
mkdir MySQL-Database
mkdir Redis
mkdir NextCloud

docker run -d -p 33306:3306 \                                                                          
--privileged=true --name mysql \
-v $MAIN/MySQL-Database:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=XXXXXXX \
mysql

wget -P $MAIN/Redis http://download.redis.io/redis-stable/redis.conf

docker run -d -p 65379:6379 \                                                                    
--privileged=true --name redis \
-v $MAIN/Redis/redis.conf:/etc/redis/redis.conf \
-v $MAIN/Redis/data:/data  \                       
redis redis-server /etc/redis/redis.conf --appendonly yes
# --requirepass 'redis637 ## 这行代码是用来设定密码的

docker run -d -p 8088:80 \                                                                       
--name nextcloud \              
--restart=always \
-v $MAIN/NextCloud/html:/var/www/html \          
-v $MAIN/NextCloud/apps:/var/www/html/custom_apps \
-v $MAIN/NextCloud/config:/var/www/html/config \
-v $MAIN/NextCloud/data:/var/www/html/data \
-v $MAIN/NextCloud/theme:/var/www/html/themes \
--link mysql:mysql \
--link redis:redis \
nextcloud
```

执行完以上步骤之后就可以正常使用NextCloud了，通过`http://localhost:8088`来访问即可。

应该注意的是，第一次使用的时候会提示创建管理员帐号以及配置数据库连接，管理员用户名和密码还好说，数据库连接的话，**第一空**写的是数据库内用户名，在本次安装配置中数据库内用户名是用户root。**第三空**写的是数据库名称，在本次安装配置中应该是nextcloud，这和你设置的参数name有关。**第四空**写的是mysql，因为docker创建nextcloud时已经执行了命令`--link mysql:mysql`，和`:`后面的`mysql`有关。

### 还没结束

仅仅到这里你的设备是无法登录的，因为设备的ip都没有被信任，因而不能直接连接。由于本次配置目的是在局域网中能自由使用。那么可以直接开放访问，因为在家庭中没必要特意部署安全攻防工具。要做的是：

```shell
cd $MAIN
sudo vim ./NextCloud/config/config.php
```

然后在这里需要修改`trusted_domains`这一项，添加：

```php
XXX => preg_match('/cli/i',php_sapi_name())?'127.0.0.1':$_SERVER['SERVER_NAME'],
```

其中XXX表示代号。添加的这一行也是表示接受任何访问，这个在家里使用是完全够用的。

当然如果不希望这样做，你也可以直接手动添加IP地址，即：

```php
XXX => 'xxx.xxx.xxx.xxx',
```

### 「注意」

上面的docker命令中各参数的含义如下：

> 1. run：创建一个容器并运行。
> 2. -d：后台挂起，返回容器ID。
> 3. -p：端口映射，从宿主机映射到容器机，`:`左为宿主机，右为容器机。
> 4. --privileged：true/false决定容器内root有无宿主机root权限。
> 5. --name：为容器指定名称。
> 6. -v：目录映射，格式与参数`-p`相似，通过该参数可以将数据持久化到指定的宿主机目录下，容器重启时数据不会丢失。
> 7. -e：设置环境变量
> 8. --link：连接到已安装的容器，使用后可将mysql和redis用作主机名了。
