---
title: ArchLinux with AwesomeWM
date: 2022-10-01 18:45:37
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
 - ArchLinux
 - AwesomeWM
tags: 
 - Linux
 - Arch Linux
 - Awesome Window Manager
---

## 前言

这几次使用Linux系统的经历让我明白了一件事：用这用那别人帮你配好的系统，基本上都是刚用的时候好好的，到后面就直接G掉了，还远不如从一开始就自己配置自己搞起来。

所以现在我正式进军Arch Linux了！

因为绝大多数操作，在[Manjaro](https://breezeshane.github.io/Linux/Manjaro%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/)、[ArcoLinux](https://breezeshane.github.io/Linux/ArcolinuxAndAwesomeWM/)这两个系统上其实大同小异，所以这篇就略去许多细节了，发现有什么缺的去前面的记录找找罢。

安装系统（按照[Wiki](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))的安装就好，这里不再赘述），之后直接安装Awesome桌面环境和SDDM即可。

刚开始的Awesome相当精简，这时候可以开始进行配置了。

## 修改默认应用程序

> 参考资料：
> [ArchLinux如何设值文件的默认打开程序](https://blog.csdn.net/iteye_6393/article/details/82231282)

随着使用时间增长，有些文件可以由许多应用打开，这难免会发生冲突，尤其在习惯以某个应用打开之后在近期装了新软件把默认配置覆盖掉的时候，就会直接高血压。但还好有办法解决这个问题。

首先要知道系统依靠什么来设定文件到应用的映射：通过`/usr/share/applications`下的`desktop`文件来设定关联。可以通过`ls /usr/share/applications`来查看当前可以设定的关联。

因此修改的流程应该是：
1. 先通过`ls /usr/share/applications`找到要找的关联desktop文件
2. 执行命令`xdg-mime query filetype <你要查看文件的文件名>`，比如当前目录有`file.md`，我就可以执行`xdg-mime query filetype file.md`，这样就可以查询这个文件类型当前设置的默认应用程序是什么
3. （可以不做）也可以执行命令`xdg-mime query default application/<文件后缀>`来查看这个文件类型当前设置的默认应用程序。
4. 执行命令`xdg-mime default <第一步你选择的结果> application/<文件后缀>`来设定应用与文件类型的关联。

修改是立即生效的，因此不用重启计算机。


## 调节屏幕亮度问题

> 参考资料：
> 1. [键盘键码对照 - 51CTO](https://blog.51cto.com/u_15065851/4581547)
> 2. [Keyboard input - Archlinux Wiki](https://wiki.archlinux.org/title/Keyboard_input#Identifying_scancodes)
> 3. [Linux通用键位修改（中）-实际操作](https://www.bilibili.com/read/cv5156572)
> 4. [what to name the hwdb file - CoreELEC](https://discourse.coreelec.org/t/what-to-name-the-hwdb-file/8341)

我的笔记本内嵌键盘上有一些功能键不能正常响应，本节以屏幕亮度调节功能键为例，当我通过journalctl查询发现是系统不认识这两个键是什么，于是我根据所学想：键盘在按下按键的时候会产生扫描码(Scan Code)，然后发送给系统内核根据映射表得到按键码(Key Code)，最后做相应的响应。系统既然是不认识，那就说明是中间的映射有些问题，少了这两个功能键的映射。于是解决这个问题的第一步就是要先创建起来这个映射。

首先需要知道这两个按键的扫描码是多少，所以需要先使用root权限运行`showkey -s`来看：
```shell
Arknights% sudo showkey -s
kb mode was ?UNKNOWN?
[ if you are trying this under X, it might not work
since the X server is also reading /dev/console ]

press any key (program terminates 10s after last keypress)...
0x9c
0xe0 0x4c 0xe0 0xcc
0xe0 0x54 0xe0 0xd4
```

要知道，这里输出的十六进制码是一个事件对应两段的，因此按下按键是`0xe0 0x4c`和`0xe0 0x54`，松开按键是`0xe0 0xcc`和`0xe0 0xd4`，我们只需要关心按下按键这里。

虽然我参照了[Linux通用键位修改（中）-实际操作](https://www.bilibili.com/read/cv5156572)这个教程，但是我发现不能完全按照他的步骤来执行，但是依旧可以参考他的思路：找出按键的扫描码，找出按键的键位码，然后自己编写扫描码-键位码的映射文件，再做一次更新。

::: details 参照失败的部分

搞清楚扫描码之后，我们需要关注设备的event文件，执行`sudo evtest`来列出系统目前在使用的输入设备，如下是我执行之后的结果：

```shell
(base) Arknights% evtest
No device specified, trying to scan all of /dev/input/event*
Not running as root, no devices may be available.
Available devices:
Select the device event number [0-0]: ^C
(base) Arknights% sudo evtest
[sudo] password for breezeshane:
No device specified, trying to scan all of /dev/input/event*
Available devices:
/dev/input/event0:	Power Button
/dev/input/event1:	Lid Switch
/dev/input/event10:	HDA Intel PCH Headphone
/dev/input/event11:	PC Speaker
/dev/input/event12:	Video Bus
/dev/input/event13:	Video Bus
/dev/input/event14:	HDA Intel PCH HDMI/DP,pcm=3
/dev/input/event15:	HDA Intel PCH HDMI/DP,pcm=8
/dev/input/event16:	Logitech MX Master 3
/dev/input/event17:	EDFIER EDIFIER W820NB
/dev/input/event2:	Power Button
/dev/input/event3:	AT Translated Set 2 keyboard
/dev/input/event4:	ov9734_azurewave_camera: ov9734
/dev/input/event5:	HDA Intel PCH HDMI/DP,pcm=7
/dev/input/event6:	ELAN2204:00 04F3:30F5 Mouse
/dev/input/event7:	ELAN2204:00 04F3:30F5 Touchpad
/dev/input/event8:	IQUNIX OG80 BT1
/dev/input/event9:	Huawei WMI hotkeys
Select the device event number [0-17]:
```

因为我要修改的是笔记本键盘，所以应该找`AT Translated Set 2 keyboard`，因此可以直接响应这个`Select the device event number [0-17]:`的请求，输入3，也可以直接执行命令`sudo evtest /dev/input/event3`，从此进入了这个键盘的test mode。

接下来会看到这里的输出信息：
```shell
(base) Arknights% sudo evtest /dev/input/event3
Input driver version is 1.0.1
Input device ID: bus 0x11 vendor 0x1 product 0x1 version 0xab83
Input device name: "AT Translated Set 2 keyboard"
Supported events:
  Event type 0 (EV_SYN)
  Event type 1 (EV_KEY)
    Event code 1 (KEY_ESC)
    # ......
  Event type 4 (EV_MSC)
    Event code 4 (MSC_SCAN)
  Event type 17 (EV_LED)
    Event code 0 (LED_NUML) state 0
    Event code 1 (LED_CAPSL) state 0
    Event code 2 (LED_SCROLLL) state 0
Key repeat handling:
  Repeat type 20 (EV_REP)
    Repeat code 0 (REP_DELAY)
      Value    250
    Repeat code 1 (REP_PERIOD)
      Value     33
Properties:
Testing ... (interrupt to exit)
Event: time 1673126309.355515, type 4 (EV_MSC), code 4 (MSC_SCAN), value f8
Event: time 1673126309.355515, -------------- SYN_REPORT ------------
Event: time 1673126309.471303, type 4 (EV_MSC), code 4 (MSC_SCAN), value f8
Event: time 1673126309.471303, -------------- SYN_REPORT ------------
Event: time 1673126310.343339, type 4 (EV_MSC), code 4 (MSC_SCAN), value f8
Event: time 1673126310.343339, -------------- SYN_REPORT ------------
Event: time 1673126310.428278, type 4 (EV_MSC), code 4 (MSC_SCAN), value f8
Event: time 1673126310.428278, -------------- SYN_REPORT ------------
```

这里我们通常关心`Properties: Testing ... (interrupt to exit)`之后的部分，但是如果有兴趣，可以看这个[文档](https://www.kernel.org/doc/Documentation/input/event-codes.txt)来了解`Event types`的具体作用。

但是，我发现，这两个按键其实都被置成同一个值f8了，显然这个不应该是我们要找的，可能教程没有错误而是我的设备并不适合这个情景，但是教程给出的思路依旧是正确的，很有参考价值，考虑到这部分内容对实际我要解决的问题相关度不高，因此将这部分折叠掉了。

:::

根据Archwiki的对应文档`Keyboard input`我们可以在`/usr/include/linux/input-event-codes.h`中找到我们要找的屏幕亮度对应的键位码：
```c
#define KEY_BRIGHTNESSDOWN	224
#define KEY_BRIGHTNESSUP	225
```

接下来就应该去写规则了，需要注意的是，根据[Linux通用键位修改（中）-实际操作](https://www.bilibili.com/read/cv5156572)这个教程所说，`/usr/lib/udev/hwdb.d/`这个目录是硬件厂商和操作系统共同维护的硬件数据库，一般不修改这下面的文件；而本机管理员维护的自定义硬件数据库位于`/etc/udev/hwdb.d/`目录，显然我们做的自定义规则就要写在这里。

::: tip 重要

`/usr/lib/udev/hwdb.d/`目录下规则为默认规则，`/etc/udev/hwdb.d/`目录下对设备定义的规则如果和默认规则有冲突，会覆盖默认规则。这两个目录下的文件都遵守同一个命名规则`<num>-<word>.hwdb`，而且这两个目录在加载的时候都会按照数字从小到大的顺序进行加载。

:::

我们在`/etc/udev/hwdb.d/`下创建一个新文件`99-custom-kbd.hwdb`，在里面填写如下内容：
```
evdev:atkdb:dim:*
# KEYBOARD_KEY_4C=brightnessdown
# KEYBOARD_KEY_54=brightnessup
 KEYBOARD_KEY_4C=224
 KEYBOARD_KEY_54=225
```

因为这里面遵循写法是按照这个规则写的`KEYBOARD_KEY_<Scan Code>=<Key Code>`，这就是我们前面要花时间确定扫描码与键位码的原因。`4C`和`54`哪里来的？回到前面我们用`showkey -s`的部分，我们找出的按下的扫描码是`0xe0 0x4c`和`0xe0 0x54`，其中`0xe0`是固定前缀，后面的才是我们真正需要的扫描码。

最后我们再更新一下配置，执行：
```shell
sudo udevadm hwdb --update # 重新编译二进制的数据库内容
sudo udevadm trigger # 立刻重新触发所有输入设备，让更改立刻生效
```

::: tip 注意

如果删除其中某个规则，直到重启计算机之前，原有规则都会依然保留在内核中，该规则仍会生效。

:::

以上一切都完成之后，我们就可以安装相应工具来实现屏幕亮度调节功能了：

首先我们不使用原生的`xorg-xbacklight`，因为这个要直接操作设备文件才能实现，往往会遇到缺少权限，因此我们使用替代品`acpilight`（运行`sudo pacman -S acpilight`即可安装），安装之后我们还需要将当前用户组加入`video`组内，执行`sudo gpasswd video -a <YOUR_USER_NAME>`即可，如要确认该用户是否在组内，可以执行`groups <YOUR_USER_NAME>`，最后重启计算机即可。

::: tip 知识补充

要精准匹配键盘设备，应按照如下规则完整填写：

根据id精确匹配：`evdev:input:b<bus_id>v<vendor_id>p<product_id>v<version_id>`

根据设备名匹配：`evdev:name:<input_device_name>:dmi:bvn*:bvr*:bd*:svn<vendor>:pn*`

其中的`<bus_id>`、`<vendor_id>`、`<product_id>`、`<vension_id>`需要替换成刚刚记录的设备信息。`<vendor>`需要另一个软件包`evemu`提供的工具`evemu-describe`得到。

**填写时应该注意不够4位的数需要在前补0到4位，16进制数的a～f需要小写。**

:::

## Minecraft

我没想到Archlinux系也能直接下载安装Minecraft，但也不意外。下载安装`hmcl`和`jre8-openjdk`这两个包即可。

如果提示报错，请注意查看报错信息提示的版本号，然后用这个版本号将`jre8-openjdk`的`8`替换掉即可。


## 启用时间同步

执行这一条命令即可：`sudo timedatectl set-ntp true`

## Authenticate Agent

在linux使用过程中，难免会遇到一些软件，不能直接用`sudo`运行，但需要root权限，比如`via-bin`、`gparted`，然后我在具体运行中遇到的错误信息如下：
```shell
UnhandledPromiseRejectionWarning: Error: No polkit authentication agent found.
```
于是我就明白这里是缺少了一个专用的助手来安全地授予我们权限，于是我花了一些时间查找，最后从[Polkit - ArchWiki](https://wiki.archlinux.org/title/Polkit)里的1.1节Authentication agents中选了比较合适的[lxqt-policykit](https://github.com/lxqt/lxqt-policykit)，这个可以直接用pacman安装。安装好之后我们只需要让它随系统启动即可，我是通过写入rc.lua配置文件启动列表来完成的，具体做法转到[这里](http://blog.brz.ink/Linux/ArcolinuxAndAwesomeWM/#%E5%AE%89%E8%A3%85fcitx5%E8%BE%93%E5%85%A5%E6%B3%95%E4%BB%A5%E5%8F%8A%E8%AE%BE%E7%BD%AE%E8%BD%AF%E4%BB%B6%E5%BC%80%E6%9C%BA%E8%87%AA%E5%8A%A8%E5%90%AF%E5%8A%A8)。

这样就可以开始使用了，如果未见效请重启再尝试。
