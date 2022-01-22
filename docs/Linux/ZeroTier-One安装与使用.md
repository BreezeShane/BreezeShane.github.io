---
title: 从Zerotier One安装与配置到Android & Manjaro连接共享控制的一条龙服务问题
date: 2021-4-25 01:25:14
update: 2021-5-7 12:51:20
author: Breeze Shane
image: /images/ZeroTier.png
toc: true
mathjax: false
excerpt: 本文介绍了如何安装和配置ZeroTier One并利用内网穿透来实现跨局域网连接的方法。
categories: 
  - Linux
  - Manjaro
  - ZerotierOne
tags:
  - Linux
  - Manjaro
  - Zerotier One
  - Remote Control
---

# 从Zerotier One安装与配置到Android & Manjaro连接共享控制的一条龙服务问题

## Zerotier One安装与配置

ZerotierOne是一种内网穿透工具，它的基本原理是通过搭建虚拟内网来连接各设备。为什么会提到连接共享控制的问题？此类的连接共享以及控制，多都是在内网上实现的，这样说你多少该懂了。。。

>  「注」：网上与此相关的资料太少了，我觉得很有必要详细记录下来，因此本文看起来繁琐了一些。

首先在[Zerotier-One官网](https://www.zerotier.com/)上注册一个帐号，我选择了使用GitHub登陆。登陆之后会出现这个界面：

![2021-04-28_19-13](/images/2021-04-28_19-13.png)

点击创建网络按钮，即可自动生成新的一栏，这时候你需要点击进去即可

![2021-04-28_19-21](/images/2021-04-28_19-21.png)

**IPv4 Auto-Assign**那一栏选什么地址不用我说，随君喜好！Zerotier One就是可以自己定IP地址！

**IPv6 Auto-Assign**那一栏选中第二项即可。

往下翻页你会看到这个：

![2021-04-28_22-49](/images/2021-04-28_22-49.png)

这里提示可以添加网络成员，但是需要相应设备安装对应的客户端。

![2021-04-28_22-52](/images/2021-04-28_22-52.png)

由于我使用的是基于Archlinux的系统，因此从AUR安装即可：

```shell
yay -S zerotier-one
```

安装之后，需要启动服务，执行：

```shell
sudo systemctl start zerotier-one.service
sudo systemctl enable zerotier-one.service
```

我见网上很多博客写的这个指令：`curl -s https://install.zerotier.com | sudo bash`，但至少在Manjaro里是不能正常执行的，会提示如下的报错信息——找不到与系统版本匹配的客户端。

![](/images/2021-04-28_22-58.png)

根据`sudo zerotier-one -h`的返回结果可知，需要接着输入如下指令：

```shell
sudo zerotier-one -pdiq
# 如果等了半天没有反应，就终止一下吧。。。我当初就这样做的，实质上执行
# 这个只是为了生成相应的配置文件来解决先前执行下一个指令报的错误——找不到配置文件。
sudo zerotier-cli status
# 返回200 info *** 1.6.4 ONLINE则正常。
sudo zerotier-listpeers
# 用于获取当前的连接情况，不执行也可
sudo zerotier-cli join ******
# 这里的******就是前面特意强调的虚拟内网ID
sudo zerotier-listpeers
# 确认一下确实成功了，你会看到比原先多出来一行内容，而且最后一个单词是LEAF，其它
# 行最后的单词都是PLANET。
sudo systemctl start zerotier-one.service
# 启用zerotier-one服务
sudo systemctl enable zerotier-one.service
# 开机自启动zerotier-one服务
######
sudo zerotier-cli set 12ac4a1e7101bb86 allowManaged=1
# 注意，关于这条指令网上有两种声音，有主张授权为1的，但没见到谁有给理由，而主张授
# 权为0的理由如下：
# 这样就不会导致勾选Authorized后，zerotier自动将路由下发到ubuntu，如果
# zerotier设置的路由为10.0.1.0/24,会导致本来10.0.1.0/24 dev br-lan
# 变成10.0.1.0/24 dev ztxxxxxxxxx,然后你就不能连接路由器了
# 作者：fc790 https://www.bilibili.com/read/cv7586063/ 出处： bilibili
## 这种就看着弄，出了问题再改回来就好了。
sudo systemctl restart zerotier-one
# 如果你做了刚才那个做法，需要重启一下服务。
```

到此为止，电脑上的ZeroTier One就已经配置得差不多了，我们需要在Android设备上安装客户端了。

如果你有Google Play并且你还能使用，你可以直接在Google商店上下载。但不幸的是，如果你没有，你可以选择去安装，而更不幸的是，你使用的是华为产品，那恭喜恭喜，您跟我一样，没什么可能走这条路了（毕竟国际形势如此紧张。。。也没办法。。。）

走的另一条路在此-->[ApkPure](https://apkpure.com/)，在这家网站上你可以下载到许许多多好用实用的外国软件，干净、安全、可靠，我是被吸引着主动下载了他们的客户端，真香了。。。

装好Zerotier One之后，需要新建一个连接配置，点击ADD NETWORK，然后输入虚拟内网ID，完成后点击下方的Add Network，并开启连接，这时候你需要回到电脑上的Zerotier Central，翻到Members这一栏刷新一下，你会发现多出来一个成员，这里需要你点前面的复选框来授权连接（你也可以选择删除或者断开连接并忽略）。然后就可以自己给设备设定名字以及备注了。

![](/images/2021-04-29_00-25.png)

然而如果你希望这台设备能被内网的其它设备发现，需要先后点击这两处：

![](/images/2021-04-29_00-28.png)

大致上如此，这时候你已经搭建好这个虚拟内网了！

如果希望某设备（已知Node ID，在客户端下方一栏出现）也能加入这个虚拟内网，需要在Zerotier Central找到![](/images/2021-04-28_21-21.png)这里并输入对应设备的Node ID。

另外特意说一下如果希望本机也加入的话，获取Node ID这个问题折磨我好久，最后查到官方文档给的：

![](/images/2021-04-29_00-37.png)

我才到终端输入`cat /var/lib/zerotier-one/identity.public`，来查看节点信息的（写这篇报告之前是这样做的）然而当我写到刚刚那个安装指令的时候，我才发现，有个最简单的方法：

```shell
sudo zerotier-cli status
```

返回的200 info后面那个就是本机Node ID。。。谁叫我当时不知道呢。。。

> 不过不算白费努力，咱该明白遇到问题相对要好的解决办法其实是去翻一翻官方文档，尤其是当你发现相关资料特别少的时候。这会让你节省不少力气和时间。

## Android & Arch Linux连接共享控制

### VNC远程控制

安装好虚拟内网了，我们要开始Android & Manjaro连接共享控制了，经过我长时间的搜索与实践，最终选择的还是VNC Viewer。安装网址：[VNC Server](https://www.realvnc.com/en/connect/download/vnc/)	[VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/)

注意两个我是都选了Generic script x64版本，如果你非常清楚应该如何做的话请自行选择。

下载来的这两个压缩包可以解压到指定文件夹，然后从终端这里分别cd到这两个目录。

首先说VNC Server：到这个目录下之后执行

```shell
sudo ./vncinstall
sudo vnclicense -add 3TH6P-DV5AE-BLHY6-PNENS-B3AQA
vncserver :1
ps -ef | grep vnc # 查看进程，如果能正常显示vnc进程的话即是安装成功。
```

接下来再说VNC Viewer：

```shell
sudo ./vncinstall
cd /usr/bin
./vncviewer
```

这时候弹出窗口，按照要求安装即可正常使用。

***不过得先有账号。。。***注册并登录账号之后就可以添加网络配置了，填入的IP地址应该是你要连接的设备所在的Zerotier One这里的IP地址（不是物理IP地址）。输入主机的用户名和密码，保存后就可以正常连接主机咯。
