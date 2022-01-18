---
title: 记将旧电脑改建成服务器的过程
date: 2022-01-04 12:27:10
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
tags: 
 - Linux
 - Server
article: false
---
## 背景

因为家和学校距离非常远，而我希望到我回到学校的时候还能继续使用家里的电脑，再加之电脑家里人几乎不用，电脑一年到头就是闲置，于是很自然的想法就是将这台电脑做成一个服务器，在这上面部署一些常用工具，存放一些我需要存放的数据，将它用作我的生产力工具。

## 启动时遇到拦截
```
The system found unauthorized changes on the firmware, operating system of UEFI drivers .

Press [N] to run the next boot device,or enter directly to BIOS Setup if there are no other boot devices installed .

Go to BIOS Setup > Advanced > Boot and change the current boot device into other secured boot devices .
_
```
它在告诉我系统发现使用了未经授权的变更，要求我使用其他启动盘启动。个人经验推断认为是安全启动是开启状态，因而它会针对授权问题进行检查，于是我把它关掉了，果然就可以启动了。

进入BIOS后按下<kbd>F7</kbd>进入高级模式，然后切换到启动选项卡(Boot)，下选安全启动选项(Secure Boot)，有密钥管理(Key Management)的子选项，将安全启动密钥(Secure Boot keys)删除掉即可，删除后你会发现安全启动已经关闭了。出来后把系统启动类型修改为其他操作系统。这时重启一下系统就好。这样U盘的启动就能进去了。

因为我打算将这台机器用作服务器，因此我就应该选择安装ArcoLinuxD版本。正如官网介绍的ArcoLinuxD，没有桌面，没有服务，仅有内核，这正合我的意愿。

其实是我尝试过安装带桌面版的ArcoLinuxB，但遇到了TLP Startup/shutdown死机问题，多半是显卡驱动问题，但为了绕开这种难解决的问题，我才直接安装ArcoLinuxD。但是奇怪的是，虽然官方介绍的ArcoLinuxD没有桌面系统也没有服务，就是命令行，但是安装的时候却是使用图形界面的，在这里我也同样遇到了TLP卡死问题，于是我就去一查究竟，到底TLP是啥，为什么会卡死？

后来查询才知道，TLP是Linux下优秀的高级电源管理功能，之所以会卡死，确实是因为硬件设备太过老旧，如今的系统已经不能很好地支持了，准确说是Arch系对老机器的兼容性差。不过，仅仅知道这些，问题还是不能解决，但我最后成功绕开了这个问题，只需要使用Safe Graphics即可正常进入。而后一如既往地，设定系统所在的分区挂载到`/`下，系统引导分区挂载到`/boot/efi`下，然后开始安装即可。

## 终端无线连接

等过许久之后，当我尝试进行初始配置，换pacman镜像源、调整yay镜像源之后尝试系统更新，发现无论如何都是失败，最后我才想起来，ArcoLinuxD并没有网络连接服务，因此我需要先连接上网络，于是我开始花费将近48小时去尝试连接WIFI……

经过我相当长的时间去查询资料、文档，浏览相关网站后，最后才知道，原来是这样：

因为系统刚开始是什么都没有的，因此使用的连接方式非常原始，我们采用`wpa_supplicant`来完成连接。

1. 首先我们要查看无线网卡的相关信息，需要执行`iwconfig`来查看，注意，从输出信息中找到你的网卡ID，记好它，后面要经常用，如果实在觉得很难记，你可以临时创建一个变量来保存，例：`wireless_id=<你的网卡ID>`，这样你后面使用的时候就用`$wireless_id`来代替即可，为了便于描述，后面我都这样写了。
2. 通常情况下刚刚使用的系统是没有启动无线网卡的，因此我们要手动启动无线网卡：`ip link set $wireless_id up`。
3. 接下来我们需要扫描当前地点所有的WIFI连接点，执行`iwlist $wireless_id scan`。
4. 确定你要连接的WIFI点后，这时候就需要着手开始连接了。当下我们绝大多数使用的WIFI都是使用WPA/WPA2加密的，少数是开放的，另外一小部分才是使用WEP加密的。由于我要连接的WIFI是使用WPA/WPA2加密的，因此我们使用`wpa_supplicant`来创建连接。
   
   *如果是开放WIFI，只需要使用`iwconfig $wireless_id essid <要连接的开放WIFI的SSID>`即可；*

   *而若是使用WEP加密的，则需要使用`iwconfig essid <要连接的WIFI的SSID> key <该WIFI对应的密码>`即可；*

   如果是使用WPA/WPA2加密方式，我们常常能看到这样的教程：
   ```shell
   wpa_passphrase <SSID> "<SSID-PASSWORD>" > /etc/wpa_supplicant.conf
   wpa_supplicant -B -i $wireless_id -c /etc/wpa_supplicant.conf
   ```
   当时我还什么都不懂的时候，就是简单照做一下，结果发现，我根本就无法完成这些，因为我没有这种权限，甚至是我加了sudo，也依然无法完成，报错的原因都是`Permission denied`。于是我再去四处搜索，看到有人是这样写的：
   ```shell
   wpa_supplicant -B -i $wireless_id -c<(wpa_passphrase <SSID> "<SSID-PASSWORD>")
   ```
   联系我之前所学的shell编程基础知识就发现，其实我不必非要创建那个wpa_supplicant.conf文件，我只是需要传给wpa_supplicant即可，所以才会使用`<(..)`来实现。`<(..)`实际上就是将括号内的命令执行结果输出到`/dev/fd/63`后再传送给箭头指向的前一个命令。
   当我执行这个命令的时候发现，还是报错，这回的报错是
   ```shell
    Successfully initialized wpa_supplicant
    Failed to open config file '/dev/fd/63', error: No such file or directory
    Failed to read or parse configuration '/dev/fd/63'
   ```
   [查询](https://unix.stackexchange.com/questions/279545/failed-to-open-config-file-dev-fd-63-error-no-such-file-or-directory-for-wp)之后才知道：
    > Process substitution <(…) creates a pipe, uses /dev/fd to give a path that's equivalent to the file descriptor where the pipe is, and passes the file name as an argument to the program. Here the program is sudo, and it passes that argument (which is just a string, as far as it's concerned) to wpa_supplicant, which treats it as a file name.
    >
    > The problem is that sudo closes all file descriptors except for the standard ones (stdin=0, stdout=1 and stderr=2). The pipe of the process substitution is on another descriptor, which gets closed, so when wpa_supplicant tries to open it, it finds a file that doesn't exist.
    >
    >If your sudo policy allows it (closefrom_override option enabled), you can tell it not to close file descriptors. But this is usually not the case.
    其实就是我并没有这个权限去读取那个文件，因此才会认为没有这样的文件，不过他也给出了其他的取代方案，亲自使用行之有效后我做了整合：
    > ```shell
    > wpa_passphrase <SSID> <SSID-PASSWORD> | sudo wpa_supplicant -B -i $wireless_id -c /dev/stdin
    > ```
    >
    > **不过我没有试过他给的最后的方案**：
    > ```shell
    > sudo bash -c 'wpa_supplicant -B -i $wireless_id -c<(wpa_passphrase <SSID> "<SSID-PASSWORD>")'
    > ```
    > 凭经验判断这个应该也是可行的。
    
    但事情还没有完，执行过我做的整合后出现了新的问题：
    ```shell
    Successfully initialized wpa_supplicant
    nl80211: Driver does not support authentication/association or connect commands
    nl80211: deinit ifname=wlp0s29u1u3 disabled_11b_rates=0
    wlp0s29u1u3: Failed to initialize driver interface
    ```

    经过查询发现，是我的硬件设施不支持`nl80211`扩展驱动，而我不做更改的情况下，默认是使用该扩展驱动的，因此我要做出的事必须是更换扩展驱动。后来我上网看到有人说用这个就能行：
    ```shell
    wpa_passphrase <SSID> <SSID-PASSWORD> | sudo wpa_supplicant -D wext -B -i $wireless_id -c /dev/stdin
    ```
    还有说用`-Dwext`，和上一行命令的区别就在于D和wext之间没有空格，但是明显，都失败了，得到的最终报错是：
    ```shell
    Successfully initialized wpa_supplicant
    rfkill: Cannot get wiphy information
    ```
    百思不得其解，在网上四处搜索无果，最终我只能去Linux交流群内向高人请教了，经过较长的一段时间错误复现，有高人和我说起了这个[资料](http://manpages.ubuntu.com/manpages/trusty/man8/wpa_supplicant.8.html#available%20drivers)，他建议我挨个试试，终于，当我使用Wired扩展驱动后一切都好了起来！

    最终的执行命令是：
    ```shell
    wpa_passphrase <SSID> <SSID-PASSWORD> | sudo wpa_supplicant -D wired -B -i $wireless_id -c /dev/stdin
    ```

    思考总结：其实扩展驱动不是瞎试的，出现这一系列的报错原因就是在于驱动和硬件设施不匹配，而我正在使用的是无线网卡`MERCURY MW300TV`，一款非常老的无线网卡。
    在Google上搜索到的结果如图：

    ![](/images/BuildingServer/2022-01-06_14-59.png) 

    ![](/images/BuildingServer/2022-01-06_15-01.png)

    有关它的名称是这样的：**Mercury USB Wifi MW300TV USB Network Card 2.0 Thunderbolt Ethernet Wifi Router 300Mbps Wifi Adapter USB Wi-fi Video Card WIFI**

    显然可知这个无线网卡是以太网连接设备，再参考前面我提到的那个资料：

    ![](/images/BuildingServer/photo_2022-01-06_15-07-15.jpg)

    里面写着：
    > **wired**  wpa_supplicant wired Ethernet driver

    我这才明白，原来需要以Ethernet Connection方式连接的设备扩展驱动应该选择使用Wired扩展驱动！
5. 最后可以考虑可哪瞎ping，试试看你的网络是否正常连接。

## 虚拟内网穿透

接下来就是需要完成远程连接的问题。能够满足我的需求自然就是使用内网穿透工具Zerotier One，其实之前我都有写过，因此重复的部分这里不再赘述，详情可到[这里](https://breezeshane.github.io/Linux/ZeroTier-One%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8/)看。

我写这部分是因为我遇到了问题：即使我能够通过ping在两台机器之间彼此通信，但我依旧不能使用SSH连接，总是被提示Connection refused.

但经过我一晚上的排查与修复之后，当我看到这个[资料](https://wiki.archlinux.org/title/OpenSSH_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E7%AE%A1%E7%90%86_sshd_%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B)时，我才发现问题的根源就在于，我没有启动SSH服务……

嗯，这很离谱，但正事我们还是要做的，执行：
```shell
sudo systemctl start sshd
sudo systemctl enable sshd
```

不过我还是适当做了一下简单的安全设置，编辑`/etc/ssh/sshd_config`文件，将其中的`PermitRootLogin`后面的`yes`修改为`no`，这样我就可以保证不能以Root身份登录这台服务器了。

## 部署NextCloud

详情照做[这个](https://breezeshane.github.io/Linux/PrivateNetdiskBuilding/)就好。

## 部署Hedgedoc



## 部署思源笔记



## 改建为局域网DNS服务器


