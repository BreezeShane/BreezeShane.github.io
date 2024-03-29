---
title: 科协网盘数据迁移记录
date: 2022-05-15 23:18:17
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - Linux
tag: 
 - Linux
 - Btrfs
 - Nextcloud
 - Docker
 - Docker-compose
 - Caddy
---

::: details 参考资料

1. [docker/.examples/docker-compose/insecure/postgres/apache/docker-compose.yml - GitHub](https://github.com/nextcloud/docker/blob/master/.examples/docker-compose/insecure/postgres/apache/docker-compose.yml)
2. [使用docker-compose搭建Nextcloud个人云盘并开启https教程](https://blog.csdn.net/shangyexin/article/details/106306680)
3. [Setup Nextcloud with Redis using Docker](https://markontech.com/docker/setup-nextcloud-with-redis-using-docker/)
4. [nextcloud-pgsql-redis-traefikv2-docker-compose.yml - GitHub Gist](https://gist.github.com/ismailyenigul/f03b4f5f15e5e61ac5b80905c5d2890a)
5. [Redis™ packaged by Bitnami - GitHub](https://github.com/bitnami/bitnami-docker-redis/blob/master/README.md)
6. [docker-compose:数据卷volumes挂载规则](https://codeantenna.com/a/OuBKy0EvjI)
7. [Caddy - 方便够用的 HTTPS server 新手教程](https://www.zybuluo.com/zwh8800/note/844776)
8. [Cannot start Caddy as a systemd service](https://caddy.community/t/cannot-start-caddy-as-a-systemd-service/1332)

:::

## 背景

科协是有一台专门用来做网盘的服务器的，它使用了如下四块硬盘：一块SanDisk X600 128GB、两块Seagate ST1000DM003 1000GB和一块Western Digital WD10EZEX 1.0TB，它们长这个样子：

<img src="/images/KeXieNetDisk/s-l500.jpg" alt="SanDisk X600 128GB" />
<img src="/images/KeXieNetDisk/ST1000DM003.jpg" alt="Seagate ST1000DM003 1000GB" />
<img src="/images/KeXieNetDisk/WD10EZEX.jpg" alt="Western Digital WD10EZEX 1.0TB" />

现在这些盘都确实很老了，跑过测试发现已经持续通电两年了，所以必须要将里面的数据迁移出来，否则容易丢失数据。

现在的主机是Lenovo IQ270MS，机箱很小，只能装下两个硬盘：一块SanDisk X600和一块Western Digital WD10EZEX 1.0TB，剩下两块其实是机箱拆卸下光驱后硬塞进空腔的，相当于在机箱内吊着，有一说一这实在是危。

当时我就是在这样的设备条件下做的网盘数据迁移。

## 硬件升级部分

在完成这部分的时候我想的方案比较多：
1. 仅更换机箱和电源
2. 走VPS途径
3. 更换整台机器
4. 格外找几个机箱做集群
5. 购置外置硬盘架，从机箱内拉出来线连接

对于方案一，想出这个方案的原因背景也提及了，机箱太小，第一想法就是更换机箱，但研讨较长时间之后发现联想的主板虽然写的是ATX规格，可实际上和通用机箱的ATX规格并不一样，螺丝孔是对不上的，因此更换机箱简直是天方夜谭。而如果去买定制机箱，这个价钱明显不合适了。在硬件界有个笑话：“科技以换壳为本”，讽刺的就是这类问题。到此为止，第一方案作废。

对于方案二，这个是同学和我说有这个途径可以尝试。所谓VPS途径，其实就是把硬盘交到学校的网络中心进行托管，然后我们在这边可以使用虚拟机进行访问使用。但问题在于，硬盘状态我们不能第一时间了解到健康状态，而且校方也不可能及时反馈这个事情，直到出现问题才能发现。这个方案一来是设备不在身边，不放心，二来也是出现问题无法第一时间得知，不能采取应对措施进行急救，因此第二方案作废。

对于方案三，这个其实是最无脑的选择了，不需要有任何知识，想都能想得到的，设备旧了就换新的。但是问题是，一是科协内部经费是不太充足的，没有这个经济实力能够自掏腰包承包NAS服务器的购置；二是如果打算走公账的话，不能在咸鱼等二手平台上购买物品，平台和卖家都是一定要是官方的；三是就算选择了走公账，我们也不能自主决定选择哪一个服务器，按学校流程走是这样：我们先上报该需求给指导老师，指导老师再到学院内部反映这个事情，如果院里同意，才到院内采购部去招标，直到有企业愿意投标，才能下发设备到我们这里。更何况，我们要购买的设备仅仅是供科协内部使用的，学院首先对这类需求就是有一定的排斥的，因为这不是为全院整体考虑的。因此显然第三方案也是行不通的。

对于方案四，考虑这个方案是因为想到科协内有很多闲置的主机，的确是有这个条件来组集群的，并且也能够解决机箱空间不足的问题。但问题在于，组分布式网络首先技术门槛过高，后期维护也非常难以管理，更别提在换届交接工作的时候了，一定会被骂死的。

对于方案五，当时是发现机箱上正好有个缺口，可以从这里把线引出来，这样多个硬盘就不用放在机箱里面了，在外面放在一个专门用的柜子或者架子就好，而且也是最经济的选择，的确非常值得考虑，于是最后选择采用了这个方案。

## 数据迁移部分

因为原有的盘总和也只有3000GB大小，实际上使用量也不大，只有600GB+，而换的新的硬盘是Western Digital WD40EZAZ 4TB，它长这个样：

![Western Digital WD40EZAZ 4TB](/images/KeXieNetDisk/WD40EZAZ.jpg)

因此完全可以直接把所有数据拷贝进去。当时三个HDD盘都是使用了Butter File System(Btrfs)，并且都挂载到同一个目录下了。这一特性在后面也造成了一定的问题。

我在硬件设备桥接问题上想了比较长的时间，考虑了几个方案之后，还是选择了用外置硬盘盒来接入新硬盘完成数据迁移，无非也就是因为操作简单方便。

接着就是使用什么方式来完成数据迁移了，通过和上届讨论，并结合一下自己所知，有如下几种方式可以使用：
1. cp命令
2. dd命令
3. btrfs send,receive命令
4. rsync命令

最无脑的选择其实就是直接cp，但是想了一下其实效率不是很高，还可能因为外界干扰而意外终止，就不考虑使用了。

然后就是dd命令，我查看了有关该命令的使用文档，它实际上是直接将硬盘设备进行块复制，这意味着文件系统也可以一并复制过去。不过，上面提到了一个特性：多设备挂载到同一目录下，我直接使用dd实际上只能将一个设备内的数据复制到新硬盘中，这直接导致新硬盘无法挂载到计算机上，会给出报错：损坏的文件系统。也就是说，就算能够将三个盘的所有数据拷入进去，也不能整合成一个有效的可识别的文件系统，因此放弃使用了dd命令。

注意到导致dd命令无法正常执行的原因关键在于btrfs的特性，于是我去查了一下它的文档，发现可以考虑使用增量备份来完成这一操作：把源数据增量备份到一个空盘内即可。但不幸的是，开始执行这条命令之后的十二天后，我在别人的电脑上尝试了一种实验，发现操作有误，于是马上停止了运行。

> 那天我自闭了一晚上……

虽然我再操作或许可以正常完成这个工作，不过我当时是不想再耽误时间了，直接速战速决就好，在这种事上就不应该卡太久。于是我转去使用我平日里最熟悉的rsync命令了，使用异步算法直接大批量对拷数据。

**后日谈**：其实回想了一下，利用btrfs其实也没法做到，因为当时整个盘其实没做过任何快照，而且我也无法为它创建一个subvolume(因为不是空目录，btrfs要求必须是空目录)，这样我就不能通过`btrfs send`产生数据流到目标位置使用`btrfs receive`来进行增量备份了。所以其实还是只能挑有用的直接复制过去就好。

至于那个128GB的SSD，因为是Manjaro系统，我个人是不信任Manjaro维护团队的，加上本身盘已经比较老了，于是决定直接换掉整个盘，做了一个新系统，当时只是随便选了自己在用的系统，打算看看后面作为NAS服务系统使用合不合适，不合适再换，考虑的下一个系统应该是CentOS或者其他现有开源的NAS系统。

搭建好系统之后，有一个环节比较重要，就是给服务器连上网络。通过后面的工作我也了解到，服务器如果不连上网络，其他主机是ping不通的。因为是在使用校园网，而服务器又是终端平台，无图形化界面，因此需要借助curl工具来实现连接校园网。下面给出校园网的登录模板：
```shell
#!/bin/bash
curl --noproxy "*" -d "DDDDD=1502303021&upass=121137&R1=0&R2=00&R3=0&R6=0&0MKKey=123456&buttonClicked=&redirect_url=&err_flag=&username=&password=&user=&cmd=&Login=" http://10.0.1.5/
```

> 其实后面我用Zerotier-One做了一个虚拟内网穿透，这样我就可以在其他地方方便直接管理服务器了。

## 网盘搭建部分

科协网盘用的开源网盘软件是nextcloud，虽然是php应用程序，而且也比较老，但它一直都有人在维护，所以继续沿用这个软件也没什么问题。为了快速部署，我就直接使用docker来完成部署。

结合之前所学，其实与其使用`docker run`命令来调整各种各样的参数，还不如直接写好配置文件，然后执行命令一次性解决为好。

根据我对nextcloud的了解和三次部署经验，认为选择nextcloud+redis结合使用合适一些，又和上一届讨论数据库选择问题之后，数据库也选择使用了postgres数据库，不使用marriaDB。

redis是一个基于内存的数据库系统，使用redis可以提高数据的读写性能，加之服务器有32GB的内存，抱着不用白不用的心态，就给加上了redis。

选定使用什么之后，接下来就是写配置文件的事情了。
```dockerfile
version: "3.2"

services:
  db:
    image: postgres:alpine
    container_name: nextcloud_db
    restart: always
    volumes:
      - ./db:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB_FILE=/run/secrets/postgres_db
      - POSTGRES_USER_FILE=/run/secrets/postgres_user
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
    secrets:
      - postgres_db
      - postgres_password
      - postgres_user

  redis:
    image: redis
    restart: always
    environment: 
      - REDIS_MASTER_PASSWORD_FILE=/run/secrets/redis_password
    secrets:
      - redis_password

  app:
    image: nextcloud
    container_name: nextcloud
    restart: always
    ports:
      - 19937:80
    volumes:
      - ./app:/var/www/html
      - ./data:/data
    environment:
      - POSTGRES_HOST=db
      - REDIS_HOST=redis
      - POSTGRES_DB_FILE=/run/secrets/postgres_db
      - POSTGRES_USER_FILE=/run/secrets/postgres_user
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
      - NEXTCLOUD_ADMIN_PASSWORD_FILE=/run/secrets/nextcloud_admin_password
      - NEXTCLOUD_ADMIN_USER_FILE=/run/secrets/nextcloud_admin_user
    depends_on:
      - db
      - redis
    secrets:
      - nextcloud_admin_password
      - nextcloud_admin_user
      - postgres_db
      - postgres_password
      - postgres_user
      - redis_password

secrets:
  nextcloud_admin_password:
    file: ./init_secrets/nextcloud_admin_password.txt # put admin password to this file
  nextcloud_admin_user:
    file: ./init_secrets/nextcloud_admin_user.txt # put admin username to this file
  postgres_db:
    file: ./init_secrets/postgres_db.txt # put postgresql db name to this file
  postgres_password:
    file: ./init_secrets/postgres_password.txt # put postgresql password to this file
  postgres_user:
    file: ./init_secrets/postgres_user.txt # put postgresql username to this file
  redis_password:
    file: ./init_secrets/redis_password.txt # put redis password to this file
```

配置文件写的具体内容其实也没什么，就是设置了三个应用：postgres、redis、nextcloud，并且分别设置了环境变量，用于设定管理员用户名、密码。

初始文件结构应该如下：
```
KeXieNetDisk/
├── Caddyfile
├── data
├── docker-compose.yml
└── init_secrets
    ├── nextcloud_admin_password.txt
    ├── nextcloud_admin_user.txt
    ├── postgres_db.txt
    ├── postgres_password.txt
    ├── postgres_user.txt
    └── redis_password.txt
```

在这里可以先忽略掉Caddyfile，这个文件是下一部分要讲的。

data文件夹则是我要挂载的物理硬盘，但是写这篇博客的时候我不知道必须要多设备挂载同一个目录的（上一届也忘了为啥要这么做），当时是想着分开挂载的，就挂载到data_part_one文件夹下了。

必须多设备挂载到同一目录的理由是，看过下一部分的配置文件就明白，`datadirectory`一项只能写一个目录，但你想把后面要接上的硬盘都用起来，那只能给挂载到同一个目录下才行。

另外，为了方便，你也必须要修改`/etc/fstab`来实现开机自动挂载硬盘。

写好上述配置文件之后，执行`docker-compose up -d`即可一次性完成部署了。

## 网络配置部分

配置起来之后，我们还需要修改一下nextcloud的配置文件，它位于config/config.php。为了便于维护，我给配置文件做了一下备份。就是KeXieNetDisk目录下的config.php文件。到时候直接复制到docker nextcloud容器内即可。

关于这个配置文件你应该改的部分是：
```php
'trusted_domains' => array(
	  0 => 'localhost',
	  1 => 'XXX.XXX.XXX.X',
	  2 => 'XXX.XXX.XX.XXX',
	  3 => 'XXX.XXXXX.XXXXX',
  ),
'datadirectory' => '/data',
```
> 出于隐私考虑，我已经使用`X`来抹掉重要信息了。

最后一行这里我当时是忘记了修改，等后面我改一下就好。这个配置文件的这两部分是修改信任访问域名入口的配置和数据存放目录的配置。

接着就是要配置Caddy反向代理了。实际上我们需要做的也没什么，就是需要写一下Caddyfile，配置一下转发就好，ssl之类的caddy都会自动配置。

当时我的Caddyfile是这样写的：
```
{
	auto_https disable_redirects
}

http://XXX.XXXXX.XXXXX {
	redir https://XXX.XXXXX.XXXXX{uri}
}

https://XXX.XXXXX.XXXXX {
  tls /etc/caddy/XXX.XXXXX.XXXXX.pem /etc/caddy/XXX.XXXXX.XXXXX.key
	reverse_proxy http://127.0.0.1:XXXXX
}
```
> 出于隐私考虑，我已经使用`X`来抹掉重要信息了。

tls那一行其实可以不用写，caddy应该会自动配置的。这个配置文件这样写的意思是，当我尝试访问`http://XXX.XXXXX.XXXXX`的时候，会被重定向到`https://XXX.XXXXX.XXXXX`，然后根据后面所写，我会获取到tls后面的两个安全证书，再转发到localhost的`XXXXX`端口中，从而完成HTTPS的访问流程。

但当时不幸遇到了caddy的报错，排查了很久，最后找到了解决方案：需要手动启动网络服务`systemd-networkd`，并且设置允许随开机自动启动。

> **闲谈**：当时遇到caddy的报错的时候连学长们都傻眼了，表示第一次知道这玩意还能报错。只能说，我不愧是Bug本体。

这时候网盘可以正常访问了，之后我给启用了外部存储的插件，并且给他勾选了启用共享，这时候网盘就可以正式使用了。

## 组RAID阵列部分

*现在还没有开工，等我先考完试再做……*