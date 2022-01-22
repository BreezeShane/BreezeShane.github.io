---
title: Manjaro Linux
date: 2021-1-17 11:23:18
author: Breeze Shane
top: 8
toc: true
mathjax: false
image: /images/Manjaro-logo-text-edit.png
excerpt: 本文记录了大量的关于Manjaro安装与配置问题的解决方案而且分享了一些十分实用的技巧和软件及其安装配置方法。遇到问题不妨在这里碰碰运气？
categories: 
 - Linux
 - Manjaro
keywords: Manjaro Linux
tags:
 - Linux
 - Manjaro
 - Geek
---
# Manjaro Linux

终于考完试了！在大学第一个寒假到来之际，我决定入坑Linux系统，并花了很长时间挑选系统（深度选择困难患者），终于，我选择了Manjaro Linux，希望它~不会让人失望~！

## 1.Windows10+Manjaro Linux深度指北

### 前期安装

「温馨提示」如果打算是用grub的话请提前先准备好一个额外的分区用于存放Manjaro系统，另外必须要准备的是一个能用的USB！！！
首先，在Manjaro官网上选择一个系统版本下载，一定要谨慎选择！一定要谨慎选择！一定要谨慎选择！选择很重要！选择很重要！选择很重要！
除非你知道你在干啥，强烈建议选择Manjaro KDE版本！（Xfce4版本过于原始以至于使用门槛很高，甚至不调整的话很多功能会很鸡肋）
在官网下载好iso镜像文件后，另外下载安装rufus（U深度真的很烂。。。），然后将iso镜像写入USB里。
写入完毕就重启电脑，在开机过冲中按F12进入UEFI启动选项界面，选择你的USB。
进入USB的系统后再双击Install Manjaro即可进行安装。
安装好以后就可以进入Manjaro系统了。

### 初期准备

使用初期我们需要先配置一下，按Alt+Space，输入Konsole启动终端，再输入`sudo pacman-mirrors -i -c China -m rank`更新镜像排名。
接着输入`sudo pacman -Syy`和`sudo pacman -Syu`。
另外，我们先安装好一个编辑器——Vim，输入`sudo pacman -S vim`
输入`sudo vim /etc/pacman.conf`进入编辑界面，按I键进入编辑模式，再将下面的文本加入到该文件中：

```
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

按下Esc键后输入`:wq`即可保存并退出，回到Konsole。（如果一开始你没有敲sudo，而是直接输入`vim /etc/pacman.conf`，那么保存并退出操作会提示没有权限，这时可以输入`%! sudo tee % > /dev/null`用来实现。）
然后输入`sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring`
我们再来安装yay这个强大的包管理工具
`sudo pacman -S yay`

另外，需要安装binutils，base-devel这两个包才能正常运行安装程序，否则会出现ERROR: Cannot find the strip binary required for object file stripping.等源代码出错的问题。

`sudo pacman -S binutils base-devel`

## 2.Manjaro中期配置

### Fcitx5输入法安装

> 吐槽一下，Fcitx4是真的很智障，用了这么久，它始终没能适应我的输入习惯，更别说什么词库、emoji等等的东西了，用了几个月终于也是选择了卸载。

要知道Fcitx4和Fcitx5存在文件冲突，两者不可得兼。所以我们首先要删除Fcitx4，执行：

```shell
sudo pacman -Rs $(pacman -Qsq fcitx)
或者
sudo pacman -Rsc fcitx
```

不用担心会出现什么问题，顶多就是你现在输入不了中文，我们还会再装回去的，现在我们可以安装Fcitx5了：

```
yay -S fcitx5 fcitx5-chinese-addons manjaro-asian-input-support-fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-material-color
```

> \- fcitx5: 输入法基础框架主程序
>
> \- fcitx5-configtool：输入法配置程序
>
> \- fcitx5-qt: QT5程序的支持库
>
> \- fcitx5-gtk: GTK程序的支持库
>
> \- fcitx5-chinese-addons: 简体中文输入的支持，云拼音
>
> \- fcitx5-material-color：一款使用 Material Design 配色的 fcitx5 皮肤。这是[GitHub仓库地址](https://github.com/hosxy/Fcitx5-Material-Color)，针对主题这里的讲解比较详细，可以参照他的方法配置，尤其当你喜欢单行模式的话。
>
> \- manjaro-asian-input-support-fcitx5 能让manjaro自动配置环境变量

对应的 git 版本为：

```
yay -S fcitx5-git fcitx5-chinese-addons-git manjaro-asian-input-support-fcitx5 fcitx5-gtk-git fcitx5-qt5-git fcitx5-configtool-git
```

可以添加词库：

```
yay -S fcitx5-pinyin-moegirl fcitx5-pinyin-zhwiki
```

然后重启一下就可以使用了，如果无法启动输入法，在系统设置 --> 区域设置 --> 输入法 --> 添加输入法中手动添加“拼音”。

---

如果发现这时候还不行，那么我们需要配置一下环境变量了：

```shell
sudo vim ~/.pam_environment
# 将以下这些内容粘贴即可
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=@im=fcitx
# 保存并退出后继续执行
sudo vim ~/.xprofile
# 接着需要将下面这一行代码粘贴才行
fcitx5 &
# 注意：如果你是WPS用户并且即使做了以上操作重启之后还是不能在WPS使用fcitx5的话，需要在~/.xprofile这里继续添加
export QT_IM_MODULE=fcitx5
```

然后保存并退出，重启一下就可以正常使用了！

首次如果看不到输入法图标的话，需要运行一下fcitx5。

> 有一说一，Fcitx5可真香！！！

如果希望有日语输入法，需要安装这些：

```shell
yay -S fcitx5-skk fcitx5-mozc
```

### 音乐平台安装

作为一个狂热的音乐爱好者，听音乐的事怎么能少了呢？

下面这些播放器各位需要按自己实际情况而安装

```shell
sudo pacman -S netease-cloud-music
# 常规版本
yay -S netease-cloud-music-imflacfix
# 这个版本比上面的功能更多
yay -S electron-netease-cloud-music
# 这个版本是简易版，功能比较有限，不支持滚动歌词
yay -S netease-cloud-music-gtk netease-cloud-music-gtk-bin
# 这个是和Linux平台下基于Rust+GTK开发的网易云音乐播放器，没用过，不好评判
```

### Tim安装

~~yay -S com.qq.tim.spark~~

~~用了Manjaro这么久，我才遇到能正常使用的Tim。。。~~

谁用这个啊，卡的要死，bug多，还用不好！

我直接选择了`icalingua`！

```shell
yay -S icalingua
```

### Markdown编辑器安装

如果你经常使用markdown来写文档的话，安装这个！

```shell
sudo pacman -S typora
```

### 办公软件安装

Linux下可没有Windows的Office一件套，不过还好我们有WPS！

```shell
yay -S wps-office wps-office-mui-zh-cn ttf-wps-fonts
```

### 科学上网安装与配置

想要科学上网，就用[金坷垃](jinkela.red)！

`sudo pacman -S v2ray qv2ray`

先打开qv2ray并点新建，然后复制节点链接粘贴到qv2ray里就可以了！(什么？你没氪金？那打扰了！)

**2021年5月16-17日记：**

不知为什么，可能Manjaro或者Qv2ray升级的原因，我由于其他原因重启了计算机，结果Qv2ray就无法正常启动，心里百思不得其解，于是在Konsole这里输入了qv2ray一探究竟，结果遇到了这样的报错：

<font color=" #FF0000">error while loading shared libraries : libportobuf.so.27 : cannot open shared object file : No such file or directory.</font>

四处搜索始终无果，心里一气之下，就`sudo pacman -Rs qv2ray`了。

取而代之的是V2rayA。我执行了`sudo pacman -S v2raya`来安装V2rayA，并执行了`sudo v2raya`来运行服务。然后我在浏览器输入了`https://127.0.0.1:2017`来进入V2rayA客户端界面。「当然你可以直接输入<kbd>Alt</kbd>+<kbd>Space</kbd>再输入v2raya」

然后在SUBSCRIPTION菜单栏中添加订阅链接「从你购买的服务官网获取」，我依然在用金坷拉，因此是打开`WWW.JINKELA.SITE`来查看节点信息，测试延迟，选择连接，基本就完成了，这时候去登陆外国网站就可以正常进入了。

于是我决定放弃使用Qv2ray而转用V2rayA了。

不过这还没完，若就此为止，那么每次开机你都要启动一个终端窗口在后台运行`sudo v2raya`然后再启动V2rayA，很明显这又繁琐又麻烦，因此我们需要执行下面两个语句：

`sudo systemctl enable v2ray`

`sudo systemctl enable v2raya`

这样就可以开机自启动这些服务，还不用特意执行上面说的这些。

**2021年10月23日记：**

虽然之前说放弃使用Qv2ray，但这段时间一直在用，一直都出问题，直到今天终于完美解决了问题！详细解决方案可以查看下面的标题——**Manjaro Qv2ray滚挂的彻底解决方案**

<table><tr><td bgcolor=#FF6347><center><font color="#000000" size=5><strong>作为过来人送你的忠告</strong><br>如果你经常使用VPN服务的话，请记得一定要准备好两个稳定好用可用的VPN客户端，这样即使在其中一个出了问题的时候你不至于没法用，在一些情况比较紧急的时候很有用！</font></center></td></tr></table>

## 3.Manjaro深度使用

### 设置非静默启动

如果希望在系统启动的时候能看到系统消息「以备及时发现问题所在」的话，应该修改grub配置来满足这一需求，键入`sudo vim /etc/default/grub`来编辑配置文件：

```shell
/CMDLINE # 在命令模式下输入这些字符来查找关键字，要找的是GRUB_CMDLINE_LINUX_DEFAULT这一字段
yy
p
# 上面两步建议做一下，目的是为了备份，保留原有的参数，复制粘贴完后就可以注释掉了
```

然后就可以把未注释的一行中的quiet删掉了。

最后执行`sudo update-grub`来更新grub配置，现在你可以`reboot`看一下情况了。

### 清除多余的Grub启动项

因为本人已经一年多没有使用Windows系统了，由因为磁盘空间比较紧缺，就直接卸载掉Windows系统了。但每次开机都会出现多余的Windows启动项，虽然不影响我使用Manjaro，但看着也是心烦，于是决定捣鼓掉它。

可以尝试使用已有的工具`efibootmgr`来进行管理：

```shell
sudo pacman -S efibootmgr
sudo efibootmgr # 查看当前EFI的各启动项
sudo efibootmgr -b 3 -B
sudo update-grub # 更新grub配置
sudo mkdir /mnt/tmp/ # 建立临时的挂载点
sudo mount /dev/******* /mnt/tmp/ # 挂载你的EFI引导盘
sudo su # 以Root身份运行终端
cd /mnt/tmp/EFI
rm -rf Microsoft # 删除掉多余的系统引导
```

第三行可能你看得一头雾水，但别急：

```shell
❯ efibootmgr -h
efibootmgr version 17
usage: efibootmgr [options]
		......
        -b | --bootnum XXXX   modify BootXXXX (hex)
        -B | --delete-bootnum delete bootnum
        ......
```

在终端查看帮助信息就很容易明白这个到底是做什么用的了——删除boot启动项3号。

### Logid使用

本人购置了`Logid MX Master 3`鼠标，它支持Linux系统，但要想正常使用，安装配置还是少不了折腾的。

```shell
yay -S logiops
sudo systemctl enable --now logid
sudo systemctl start logid
# 安装并配置好系统服务
```

配置好这个之后我们需要设定具体的选项，执行：

```shell
sudo vim /etc/logid.cfg
```

然后在里面输入以下内容：「具体详细教程[在此](https://wiki.archlinux.org/title/Logitech_MX_Master)，开发方给出的配置说明[在此](https://github.com/PixlOne/logiops/wiki/Configuration)」

```json
devices: (
{
    name: "Wireless Mouse MX Master 3"; //要和设备名称匹配，否则无效。
    smartshift:
    {
        on: true; //设定是否使用自动无极滚动
        threshold: 30; //可根据需要调节该阈值，区间为[1, 255]，超过该值时将触发无极滚轮
    };
    hiresscroll:
    {
        hires: true; //是否启用高分辨率模式
        invert: false; //设置鼠标滚轮是否倒置
        target: false; //设定无线通讯协议，False时采用HID协议，True时采用HID++协议
    };
    dpi: 4000;//调节DPI, 最大值为4000

    buttons: (
        {
            cid: 0xc3; //拇指键
            action =
            {
                type: "Gestures";
                gestures: (
                    {
                        direction: "Up"; //向上平移
                        mode: "OnRelease";
                        action =
                        {
                            type: "Keypress";
                            keys: ["KEY_UP"];
                        };
                    },
                    {
                        direction: "Down"; //向下平移
                        mode: "OnRelease";
                        action =
                        {
                            type: "Keypress";
                            keys: ["KEY_DOWN"];
                        };
                    },
                    {
                        direction: "Left"; //向左平移
                        mode: "OnRelease";
                        action =
                        {
			     			type = "ToggleSmartshift";
                        };
                    },
                    {
                        direction: "Right"; //向右平移
                        mode: "OnRelease";
                        action =
                        {
                            type = "ToggleSmartshift";
                        };
                    },
                    {
                        direction: "None"; //不移动
                        mode: "OnRelease";
						action =
						{
						    type: "Keypress";
			    			keys: ["KEY_LEFTMETA","KEY_LEFTALT","KEY_Z"];
						};
                    }
                );
            };
        },
        {
            cid: 0xc4; //滚轮下的按钮
	    	mode: "OnRelease";
            action =
            {
                 type: "CycleDPI"; //可循环切换dip列表
                 dpis: [200, 600, 800, 1000, 2000, 3000, 4000]; //设定七档dpi
	    	};
        }
    );
}
);

```

> 观察配置信息可以注意到，实质上是采用了类似json的语法来写，定义各键的功能，并且在keys项定义单键或组合键，具体的键值可以参考这个：[input-event-codes.h](https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h)。

修改之后就需要输入指令`sudo systemctl restart logid`来重新加载配置文件。

如果希望配置滚轮功能，其实可以通过安装`xbindkeys`和`xautomation`来修改。

```shell
sudo pacman -S xbindkeys xautomation xorg-xev
sudo systemctl enable xbindkeys
sudo systemctl start xbindkeys
```

然后同样也需要修改相关的配置文件`sudo vim ~/.xbindkeysrc`：「详细教程[在此](https://wiki.archlinux.org/title/Xbindkeys)」

```yaml
# thumb wheel down => lower volume
"xte 'key XF86AudioLowerVolume'"
   b:6

# thumb wheel up => increase volume
"xte 'key XF86AudioRaiseVolume'"
   b:7

# backward button => mute
"xte 'key XF86AudioMute'"
   b:9

# backward button => win+0
"xte 'keydown Super_L' 'keydown 0' 'keyup Super_L' 'keyup 0'"
   b:8
```

Button Name | Button Id
:---: | :---:
左键| 1
按下滚轮| 2
右键| 3
滚轮上滚| 4
滚轮下滚| 5
拇指滚轮右（上）滚| 6
拇指滚轮左（下）滚| 7
后退按钮| 8
前进按钮| 9

对于映射的按键名则需要在终端输入`xev`来查看名称和事件。「ArchWiki已给出了[教程](https://wiki.archlinux.org/title/Extra_keyboard_keys_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))」

如感觉难以筛选其中的内容，也可使用这个命令：

```shell
xev | grep -A2 --line-buffered '^KeyRelease' | sed -n '/keycode /s/^.*keycode \([0-9]*\).* (.*, \(.*\)).*$/\1 \2/p'
```

修改完毕保存并退出后，需要执行`pkill xbindkeys && xbindkeys`来重新加载配置文件。

如果想看鼠标剩余电量应该如何做？

可以通过`sudo pacman -S solaar`安装`solaar`来查看，并且这个软件不局限于Logid产品，也同样支持其他使用无线接收器的设备。

### VS Code安装

安装VS Code的话，首先要到官网[VS Code官网](https://code.visualstudio.com/docs?dv=linux64)进行下载

下载后将压缩包解压到你希望存放的目录下，解压好以后就可以运行code文件开始写bug了！！！

### 切换系统的等待时间更改

经常错过5秒然后无奈进入自己并不想进的系统又只能重启吗？不妨让它再稍微等等！

```shell
sudo vim /etc/default/grub
# 再修改TIMEOUT那一行的数据既可了，想改多久改多久！
sudo update-grub
```

### 添加程序到开始菜单

你有想添加到开始菜单的程序却不知怎么办吗？

在Konsole输入

```shell
sudo vim /usr/share/applications/<app_name>.desktop
# 其中<app_name>是你要指定的应用程序
```

然后把下面这个模板输入进去，再填一下空就可以了！

```
[Desktop Entry]
Version=
Type=Application
Name=
Icon=
Exec="" %f
Comment=
Categories=
Terminal=false
StartupWMClass=
```

下面是VS Code的样例

```
[Desktop Entry]
Version=1.0
Type=Application
Name=VS Code
Icon=/home/breezeshane/VSCode-linux-x64/resources/app/resources/linux/code.png
Exec="/home/breezeshane/VSCode-linux-x64/code" %f
Comment=Visual Studio Code
Categories=Development;IDE;
Terminal=false
StartupWMClass=vs-code
```

### PyCharm & Anaconda安装

Python Developer必备的神器！输入下列代码即可安装IDE PyCharm

```shell
yay -S pycharm-professional
```

光有PyCharm还不行，我们还需要有Python解释器，我选择Anaconda！不过不要以为yay能找到正确的anaconda，其实它下载来的anaconda是windows平台下才能用的，我们只能去[官网](https://www.anaconda.com/products/individual)下载。

选Linux版本！选Linux版本！选Linux版本！

下载后把脚本文件放在你想放的位置（我有点懒，就直接放在/home/brezeshane/下了），然后进入Konsole输入下行代码即可

```shell
bash Anaconda3-2020.11-Linux-x86_64.sh
# 后面的脚本文件名以下载的为准！
```

接着一路enter就行。

```
Do you wish the installer to initialize Anaconda3
by running conda init? [yes|no]
```

如果看到这段话，推荐输入yes。

然后进入最后一步

```shell
sudo vim ~/.bashrc
# 在文本末尾添加
export PATH="/home/<USER_NAME>/anaconda3/bin:$PATH"
# 其中<USER_NAME>是你的Linux系统用户名，完成后保存退出。
source ~/.bashrc
# 我们来测试一下Anaconda是否正常安装
conda list
```

这时如果输入`python`会看到这个

```
Python 3.8.5 (default, Sep  4 2020, 07:30:14) 
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### Clion安装

由于JetBrains的个性，C语言IDE的运行环境也要有JDK支持，且版本不低于11。。。执行下行代码即可安装Clion以及一些必备的依赖。

```shell
sudo pacman -S clion clion-cmake make clion-lldb clion-jre
```

#### Clion如何调试子进程？

我有幸做过多进程编程问题，也遇到了这个难办的问题，不过还好有解决方案：

1. 在创建子进程的代码前设置好断点。

2. ![](/images/Manjaro安装与配置.assets/image-20211129235732279.png)

   点击GDB选项卡来做适配。

3. 分别输入下面两行代码：

   ```shell
   set detach-on-fork off
   set follow-fork-mode child
   ```

这样你就可以开始追踪你的子进程了。

### R & RStudio安装

执行下行代码即可安装R语言环境：

```shell
sudo pacman -S base-devel
# 安装依赖需要
yay -S r r-devel rstudio-desktop-bin
```

### IntelliJ Idea安装

执行下行代码即可安装：

```shell
sudo pacman -S intellij-idea-ultimate-edition intellij-idea-ultimate-edition-jre
```

### Windows 10 / Manjaro下的Anaconda配置

依次输入下列语句：

```shell
conda update --all
conda create --name ANYNAMEYOULIKE python=3.8
```

接着你面临二选一的抉择：

**法一：**

```shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
```

**法二：**

打开`~/.condarc`文件，修改为以下内容

> 【注】 Windows下的文件路径是C:\Users\USERNAME\\.condarc

```
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
show_channel_urls: true
```

保存退出然后继续......

```shell
conda install pip
```

pip我们在这里换一下源，首先要创建目录`~/.pip/pip.conf`并输入以下内容：

> 【注】 Windows下的文件路径是C:\Users\USERNAME\pip\pip.ini

```
[global]
timeout = 6000
index-url = http://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com
```

这样我们就单独更换好pip源了！

如果嫌编辑文件太过麻烦，也可直接执行：

```shell
pip config set global.index-url http://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
```

接着我们安装一下比较常用的包：

```shell
conda activate ANYNAMEYOULIKE
pip install opencv-python
pip install pillow
pip install tensorflow-gpu
pip install torch
pip install torchvision
pip install keras
pip install scikit-learn
pip install pandas
```

当然你使用conda install也没什么问题，只是我写这个帮助文档的时候正好清华源不稳定，因此用不了清华源。

接着我们确认一下tensorflow和pytorch都安装成功了：

### 深度学习框架测试代码

<CodeGroup>
<CodeGroupItem title="PyTorch" active>
```python
import torch    # 如正常则静默
a = torch.Tensor([1.])    # 如正常则静默
a.cuda()    # 如正常则返回"tensor([ 1.], device='cuda:0')"
from torch.backends import cudnn # 如正常则静默
cudnn.is_acceptable(a.cuda())    # 如正常则返回 "True"
```

</CodeGroupItem>

<CodeGroupItem title="TensorFlow Simple">
```python
print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))
# 输出的结果代表当前tensorflow可以使用的GPU数量，如果把len去掉的话会得到对应的设备名。
```

</CodeGroupItem>

<CodeGroupItem title="TensorFlow Normal">

```python
import tensorflow as tf
mnist = tf.keras.datasets.mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)

model.evaluate(x_test,  y_test, verbose=2)

# 得到如下结果即为正常：
# 
# Epoch 1/5
# 1875/1875 [==============================] - 3s 2ms/step - loss: 0.2962 - accuracy: 0.9155
# Epoch 2/5
# 1875/1875 [==============================] - 3s 2ms/step - loss: 0.1420 - accuracy: 0.9581
# Epoch 3/5
# 1875/1875 [==============================] - 3s 2ms/step - loss: 0.1064 - accuracy: 0.9672
# Epoch 4/5
# 1875/1875 [==============================] - 3s 2ms/step - loss: 0.0885 - accuracy: 0.9730
# Epoch 5/5
# 1875/1875 [==============================] - 3s 2ms/step - loss: 0.0749 - accuracy: 0.9765
# 313/313 - 0s - loss: 0.0748 - accuracy: 0.9778
# 
# [0.07484959065914154, 0.9778000116348267]
```

</CodeGroupItem>
</CodeGroup>

### Jupyter NoteBook安装与配置

1. 首先需要运行指令：`pip install jupyter`

2. 然后需要配置目录信息，执行`jupyter notebook--generate-config`

3. 然后需要打开该目录下的文件：/home/USERNAME/.jupyter/jupyter_notebook_config.py
4. 在该文件中查找c.NotebookApp.notebook_dir的关键字，把该行第一个字符‘#‘去掉，再接着指定你以后要存放文件的目录
5. 然后为了能在Jupyter NoteBook下使用pytorch，需要先执行下面这些指令

```shell
conda activate ANYNAMEYOULIKE	//这个是要激活你的包含pytorch的虚拟环境
conda install ipython
conda install jupyter
conda install nb_conda
```

6. 到此为止，你可以在Konsole下输入`jupyter notebook`来运行了。

   附：如果发现import torch仍然出问题，显示kernel error，则需要先关闭jupyter notebook和Konsole再执行下面这个语句

   `python -m ipykernel install --user  -i http://pypi.douban.com/simple --trusted-host=pypi.douban.com`

   然后再重新启动Jupyter NoteBook。

### 开机挂载NTFS硬盘

前期准备：请安装ntfs-3g这个包，`sudo pacman -S ntfs-3g`

首先在Konsole输入`sudo fdisk -l`指令查看列表，找到你要挂载的硬盘，再找设备一列下的那个你要找的硬盘分区

然后输入`ls -l /dev/disk/by-uuid/`来查看你的目标分区的UUID并记录下来

```shell
cd /home/用户名
mkdir ANYNAMEYOULIKE
sudo vim /etc/fstab
```

「温馨提示」在这里你一定要保证修改正确，否则容易导致开不了机。。。虽然到时候你还可以启动其他系统修改一下这个配置文件就可以解决，但是会很麻烦的啊。。。

并在末尾新添加一行：

```
UUID=你查到的UUID	/home/用户名/ANYNAMEYOULIKE ntfs defaults 0 0
```

保存后reboot一下就可以了！

另外可以输入`df -h`来查看挂载情况。

### **XDM安装**

XDM的[下载链接](https://subhra74.github.io/xdm/)

下载好这个文件后就开始安装，首先要找到刚下载的压缩包，这里我的压缩包文件名为`xdm-setup-7.2.11.tar.xz`，它的子压缩包是`xdm-setup-7.2.11.tar`

在Konsole下输入如下指令

```shell
cd ~/data				//进入所在的目录
xz -d xdm-setup-7.2.11.tar.xz && tar -xvf xdm-setup-7.2.11.tar
sudo su
cd /home/USERNAME/data
chmod +x install.sh && bash install.sh
```

这样就可以安装完成了。不过要注意的是，这个程序是没有快捷方式的，所以要搜索才能找到。

如果要卸载，运行如下指令即可

```shell
bash /opt/xdman/uninstall.sh
```

权限不够的话请在首处加`sudo`，或者先执行`sudo su`再尝试上行指令。

运行XDM后要在如下菜单里做好配置

```
[Tools]–[Languages] //设定语言
[Tools]–[Network optimization]–[High speed]–[OK] //选择高速模式
[Tools]–[Options]–[Browser monitoring]–[View settings] //选择安装浏览器监视插件
[Tools]–[Options] //可调整下载路径、线程数和代理设置
```

### 解决Windows 10和Manjaro存在时间差的问题

一般修改Manjaro的时间设置是最省事的，输入指令：

```shell
sudo timedatectl set-local-rtc true
```

### Manjaro sudo 免密问题

首先修改，并清除`%sudo ALL=(ALL) ALL`前的“#”，然后进入root模式再修改`/etc/sudoers.d/10-installer`，在其中的``下面添加

```shell
sudo vim /etc/sudoers
# 找到%sudo ALL=(ALL) ALL这一行并去掉前面的‘#’。
sudo vim /etc/sudoers.d/10-installer
# 找到%wheel ALL=(ALL) ALL这一行并在下面添加下列内容：
USERNAME ALL=(ALL) NOPASSWD: ALL
%USERNAME ALL=(ALL) NOPASSWD: ALL
```

### JupyterLab安装指北

执行下列各指令即可：

```shell
pip install jupyterlab
# 可以采用下行指令安装，二选一。
conda install -c conda-forge jupyterlab
sudo pacman -S nodejs npm
```

结束后即可执行`jupyter lab`运行。

### Manjaro-JupyterLab配置

如果希望修改工作区路径，那么你需要做如下的做法：`jupyter lab --generate-config`, 然后需要复制一下terminal输出的路径信息，接着你再打开该目录下的jupyter_lab_config.py文件，查找notebook_dir关键字，然后在单引号里设定你的目标路径即可。

如果希望添加密码，需要做：

```shell
ipython
from notebook.auth import passwd
passwd()
```

接着你就设定你的密码即可，然后复制一下terminal输出的乱码，再次打开刚才的jupyter_lab_config.py文件，

```python
c.ServerApp.allow_root = True
c.ServerApp.open_browser = False
c.ServerApp.password = '刚才复制的乱码粘贴到这里来'
```

重启一下jupyter lab就可以了！

如果想安装插件的话，我们需要运行以下指令：

```shell
jupyter labextension install @jupyterlab/toc
# 用于安装生成目录的插件
jupyter labextension list
# 用于查看已安装的插件
```

然后我们需要进入JupyterLab，点击 Settings --> Advanced Settings Editor ，将Extension Manager 里的enabled**（位于User Overrides选项卡里） **的 false 改成 true，如果想设置主题的话，可以点击Setting --> Jupyter Lab Theme。

>  此处的参考博客为：[手把手教你配置JupyterLab 环境](https://www.163.com/dy/article/FVLE7H1Q0519EA27.html) [Jupyter Lab 简单配置](https://blog.csdn.net/weixin_41571493/article/details/88830458) 
>
> **「注」：这两篇博客都是基于Windows平台的，与本文使用的系统有所区别。**

### Manjaro系统备份与还原

>本部分参考了两篇博客：[利用tar备份linux系统详解](https://blog.csdn.net/xiongyangg/article/details/23693803) [安装Manjaro之后首先要做的是...](https://zhuanlan.zhihu.com/p/90634218) [Ubuntu学习笔记之BackupYourSystem使用tar命令](https://blog.csdn.net/mmh19891113/article/details/81698453)
>
>虽然最后一篇是Ubuntu的，但是直到我看到这里才发现，斜杠是要放在exclude后面的……

经过他们的详细讲解，我写了两个shell脚本，用于系统备份与还原。源码如下：

**备份**

```shell
sudo tar -cvpjf /home/breeze_shane/LinuxBackup/Manjaro-Backup.tar.bz2 --exclude=/proc --exclude=/tmp --exclude=/sys --exclude=/lost+found --exclude=/media --exclude=/home/YOUR_USER_NAME/YOU_DISK /
# /前面的路径是你要设定好的压缩包路径的位置
# 最后一个如果你不希望备份整个home文件的话就只写/home就可以了
# 「注意」最后的斜杠是和前面的压缩包配成一套的，但不要放在一起，会导致exclude失效的，所以要放在最后。就这个问题折磨了我一下午(ToT)
```

「注」：备份之前需要先执行`sudo su`来获取权限以免因无法读取而备份失败

**还原**

```shell
sudo tar -xvpzf /home/breeze_shane/LinuxBackup/Manjaro-Backup.tar.bz2 -C / # -C前面的路径是自定义的，就是你原来压缩好的包的路径
cd /
mkdir proc
mkdir lost+found
mkdir sys
mkdir tmp
mkdir media
```

「注」：还原之前请先格式化目标分区

**上面是很多人都在使用的备份方式，反倒是我这里就不知道为什么运行不起来了，四下求助才知道，有更为稳妥的办法就是先把系统盘挂载到指定目录下然后再备份那个目录下的文件，会回避很多卡死、broken pipe报错等问题。于是我执行了以下的代码并重新完善了shell：** 

> 另外，我了解到了pigz，意外的比tar好用（其实pigz就相当于tar的多进程版），可能，tar真的不如猪了。。。。

```shell
sudo mount /dev/nvme0n1p5 /mnt
# 第一个路径是你的块设备，这个信息你可以去dolphin那里右键你的系统盘查看属性就可以获得到的。 第二个路径是你要挂载到的目录。
```

**新备份**

```shell
sudo tar --use-compress-program=pigz -g snapshot -cvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackup.tgz --exclude={'/mnt/proc','/mnt/tmp','/mnt/sys','/mnt/lost+found','/mnt/media','/mnt/home/breeze_shane/Mydata','/mnt/home/breeze_shane/.cache'} /mnt # 这一整行就是这么长。。。
sudo tar --use-compress-program=pigz -g snapshot -cvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackupDev.tgz /dev
sudo tar --use-compress-program=pigz -g snapshot -cvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackupRun.tgz /run
# 之所以分开包是因为我发现第一次打包并不能把dev和run文件夹下的文件打包进去,要注意的是第三个指令会报错，但是我去查看了一下，没有压缩进来的是socket文件（套接字文件），是服务器与客户端的缓存，pigz会忽略也是因为这一点，因此我认为这不影响正常备份。
# 「注」这里使用了增量备份的方案，tar会生成snapshot时间戳文件，以便用于校验文件是否发生改变。第一次使用不会报错影响备份。
```



> 参考博客：[Linux mount 命令](https://www.cnblogs.com/sparkdev/p/9015312.html) [zstd安装_Arch Linux 系统迁移](https://blog.csdn.net/weixin_35363322/article/details/112042405) 
>
> 另外我还发现了[rsync 用法教程](https://www.ruanyifeng.com/blog/2020/08/rsync.html)，就是一直没能成功。。。
>
> 如果不确定自己究竟要备份哪些的话，不妨看看[Linux系统各种目录的作用](https://zhuanlan.zhihu.com/p/30617845) 

**新还原**

```shell
sudo tar --use-compress-program=pigz -xvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackup.tgz -C /
sudo tar --use-compress-program=pigz -xvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackupDev.tgz -C /
sudo tar --use-compress-program=pigz -xvpf /home/breeze_shane/Mydata/LinuxBackup/ManjaroBackupRun.tgz -C /
cd /
mkdir proc
mkdir lost+found
mkdir sys
mkdir tmp
mkdir media
# -C前面的路径是压缩包的位置，而后面的路径则是你要解压到的路径
```

> 参考博客：[pigz打包、解压](https://www.jianshu.com/p/b3ca4e0a9bff) [多线程压缩工具pigz使用](https://www.jianshu.com/p/455ffef0a3c8) [[Linux下Rsync和Tar增量备份梳理](https://www.cnblogs.com/kevingrace/p/6601088.html)] [Linux使用 tar命令-g参数进行增量+差异备份、还原文件](https://www.shuzhiduo.com/A/A7zgwAmnz4/) 

### Manjaro定时服务

> 参考：[crontab 定时任务](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html) 

要想使用自动定时服务，我们需要cronie软件，执行`sudo pacman -S cronie`即可安装，在使用之前我们需要执行下面这两条语句：

```shell
sudo systemctl enable cronie.service
sudo systemctl start cronie.service
```

然后我们需要输入`crontab -e`进入编辑时间计划的界面

我们要记下crontab特有的语法：***分 时  日 月 周***，指令格式是这样：

```
* *  * * * "这里写下你要执行的指令"
```

### Manjaro Nvidia Driver驱动安装

> 参考博客：[在 Manjaro 上手动安装官网的 NVIDIA 显卡驱动](https://yeyaowei.github.io/2019/01/16/install-nvidia-driver-manually/) 

安装Nvidia驱动之前，请先了解自己的Manjaro系统内核版本，输入`uname -r`即可查看。这里我返回的是`5.9.16-1-MANJARO`，记住你的版本号，接下来我们安装一下头文件：`sudo pacman -S linux59-headers`，如果不确定自己应该装什么，可以先搜索一下：`sudo pacman -Ss linux-headers`，查看详细信息之后，我相信你能自己选出正确合适的版本！

接着上[官网](https://www.nvidia.cn/Download/index.aspx?lang=cn)去下载驱动，选择好你的显卡型号，系统我们选择Linux 64-bit，然后下载来的文件要存在你的英文目录下（以免如果后面出意外而不能输入中文），这里我是直接存放在`/home/USERNAME/`这里了。

然后需要安装一下工具，执行：`sudo pacman -S base-devel dkms`

为了我们能正常使用Nvidia驱动，我们需要禁用原来的Nouveau驱动，我们需要编辑`/etc/default/grub`，在其中把`GRUB_CMDLINE_LINUX` 开头的那一行改为 `GRUB_CMDLINE_LINUX="nouveau.modeset=0"`，保存之后更新一下grub：`sudo update-grub`

然后需要重启一下，执行`sudo reboot`

> 「注」在文中博主提到：重启之后，由于没有显卡驱动的支持，可能会卡在 BIOS Logo 界面或者是黑屏。这个时候你需要按下 ALT + CTRL + F2 进入到 TTY 文本模式。
>
> 然而我并没遇到这个问题，直接登录进入系统了，没什么问题的。

接着执行下面的指令：

```shell
chmod +777 NVIDIA-Linux-x86_64-410.93.run
# 后面的文件和你的文件名保持一致。
sudo ./NVIDIA-Linux-x86_64-410.93.run
# 路径和你之前下载的驱动文件的位置保持一致。
sudo reboot
# 最后需要重启一下电脑
inxi -G
#执行这一条，你就可以看到你的显卡驱动是nvidia了，这就说明你的系统成功安装了nvidia驱动，恭喜你！
nvidia-smi
# 执行这一条你会看到如下的输出信息，这时候你可以完全确信，驱动成功安装了！
```

```
Wed Mar 31 22:23:11 2021       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 460.67       Driver Version: 460.67       CUDA Version: 11.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  GeForce MX350       Off  | 00000000:06:00.0 Off |                  N/A |
| N/A   44C    P0    N/A /  N/A |      0MiB /  2002MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
```

### Manjaro Cuda & Cudnn安装指南

首先在相应官网下载好你的cuda和cudnn，一定要注意版本问题，去tensorflow官网查一下看看他们能支持哪个版本。下载好之后存放到你的指定目录（路径后面要用）。

输入`sudo pacman -U PATH/cuda-11.0.3-1-x86_64.pkg.tar.zst`这里我选的是cuda 11.0，PATH是你存放cuda的路径。

>  「注」：如果系统提示系统文件已存在或者提示存在文件冲突，那么你只需要删掉那些就可以了

安装好以后，我们执行一下`sudo ark`来给Ark赋予root权限，它会弹出Ark应用窗口，我们就在那个窗口内打开你的cudnn压缩包，然后将该压缩包下的cuda文件夹（其实总共也就这一个大文件夹）解压缩到/usr/local/这里，然后用vim编辑一下~/.bashrc，在最后一行输入：

```
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

退出后输入`source ~/.bashrc`就可以了，为了确定他们能正常运作，我们接下来测试一下：

```shell
conda activate ANYNAMEYOULIKE
python
```

```python
import torch
torch.cuda.is_available()
# 这里会返回True
import tensorflow as tf
import tensorflow as tf
tf.__version__
tf.test.is_gpu_available()
# 这里会返回True
```

以上，cuda和cudnn的安装就到此结束了！

### Zsh找不到Anaconda的问题

这样的情况一般应该是没用Anaconda初始化过Zsh，应该执行一下

```shell
～/anaconda3/bin/conda init zsh
```

然后你再编辑一下～/.zshrc并添加入anaconda的环境变量即可。

```shell
export PATH="/home/<USER_NAME>/anaconda3/bin:$PATH"
```

「注」：其实这个解决方法可以通用到fish、powershell、tcsh、xonsh等等。

### pacman 和 yay 添加多线程下载

执行下面的命令下载 axel

```
 yay -S axel
```

编辑 `/etc/pacman.conf` 文件：

```
XferCommand = /usr/bin/axel -n 10 -o %o %u
```

编辑 `/etc/makepkg.conf` 文件：

```
DLAGENTS=('file::/usr/bin/curl -gqC - -o %o %u'
      'ftp::/usr/bin/axel -n 10 -o %o %u'
      'http::/usr/bin/axel -n 10 -o %o %u'
      'https::/usr/bin/axel -n 10 -o %o %u'
      'rsync::/usr/bin/rsync --no-motd -z %u %o'
      'scp::/usr/bin/scp -C %u %o')
```

其实上面两步做的改动就是将原来的curl换成了axel。

「注」：如果发现yay有些软件安装不了，请改回这个配置文件再继续！

### Yakuake后台连接学校VPN（可能没什么用。。。）

如题，按下F12打开Yakuake并执行这个代码：

```
sudo openconnect --protocol=nc --user (学号) https://学校的VPN地址
```

### 安装visdom

visdom是torch的一种可视化工具，安装使用方式相对特殊，特此一记，以期不备：

```
conda activate YOURENVNAME
pip install visdom
python -m visdom.server
```

这样接下来你就可以访问`localhost:8097`来查看了。

### 安装数学绘图软件

这类软件我推荐安装Geogebra，用了好多年了，一直很经典实用！

```
sudo pacman -S geogebra
```

安装完即可运行。

### 截图工具：FlameShot

Linux中有个非常强大的截图工具——FlameShot。

它可支持铅笔涂鸦、添加文字、箭头绘制、直线绘制等等非常多的涂鸦标记功能，最重要的是还可以支持贴图，贴图啊！！！还可以自定义一切操作的快捷键，自由度非常高！就是唯一缺点是，每次截图都要单击状态栏上的图标才行。

```
sudo pacman -S flameshot
```

安装完即可投入使用。

但是，每次截图总要状态栏图标也忒让人不爽了。。。就没有解决办法吗？

还真有！根据我对KRunner程序的理解，我认为我可以在终端输入指令直接打开这个工具，于是尝试了一下：

```
flameshot
# 没反应
flameshot --help
# 给出了帮助信息，终于我找到一个方式可以直接开启截图了
flameshot gui
```

于是，打开`系统设置`，点击`快捷键`，选中`自定义快捷键`，点击`编辑`，`新建`，`全局快捷键`，你会看到右边出现了注释等三个选项卡，点击触发器你就可以设定快捷键，点击动作你就可以设定命令/URL，到这里你就明白了，你可以直接设定快捷键向系统输入`flameshot gui`指令啊～

于是地球人再也阻拦不了我截图了！！！（悄悄地说，其实这个你想拿去干啥都行:wink::joy::laughing:）

### GNU图像处理程序安装

Linux下并没有PhotoShop软件，但还好这不会意味着我们无法在Linux下正常编辑处理图像，我们有这个强大的软件：`GIMP`。

```shell
sudo pacman -S gimp
```

### Docker安装与配置

> [Docker官方网址（含文档）](https://docs.docker.com/)

```shell
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl start docker
sudo systemctl enable docker
sudo docker version
sudo usermod -aG docker $USER
reboot # 这里需要重启一下
sudo vim /etc/docker/daemon.json
# 进入编辑状态，输入一下配置信息：
```

```javascript
{
    "registry-mirrors": [
        "https://registry.docker-cn.com",
        "https://dockerhub.azk8s.cn",
        "https://docker.mirrors.ustc.edu.cn",
        "https://reg-mirror.qiniu.com",
        "https://hub-mirror.c.163.com",
        "https://mirror.ccs.tencentyun.com"
    ]
}
```

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### 安装某镜像总是找不到Host

我在安装HedgeDoc时遇到了这样的问题，不论怎么下载都遇到这样的报错：

```shell
❯ proxychains docker-compose up -d
[proxychains] config file found: /etc/proxychains.conf
[proxychains] preloading /usr/lib/libproxychains4.so
[proxychains] DLL init: proxychains-ng 4.15
Pulling database (postgres:13.4-alpine)...
ERROR: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io: no such host
❯ docker-compose up -d
Pulling database (postgres:13.4-alpine)...
ERROR: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io: no such host
```

后来经过搜索后发现这个解决方案可行：

```shell
❯ sudo vim /etc/resolv.conf
```

然后在已经存在的nameserver后面添加这两行：

```yaml
nameserver 8.8.8.8
nameserver 8.8.4.4
```

这个做法其实就是把Google提供的免费DNS解析服务添加到其中了，这样就可以解析大部分的Host了，这也意味着提示的No Such Host就被解决了。

然后执行

```shell
❯ sudo systemctl daemon-reload
❯ sudo systemctl restart docker
```

这时候再`docker pull xxx`或者`docker-compose up -d`就可以正常进行了！

```shell
❯ docker-compose up -d
Pulling database (postgres:13.4-alpine)...
13.4-alpine: Pulling from library/postgres
a0d0a0d46f8b: Pull complete
5034a66b99e6: Pull complete
82e9eb77798b: Pull complete
314b9347faf5: Pull complete
2625be9fae82: Pull complete
5ec8358e2a99: Pull complete
2e9ccfc29d86: Pull complete
4b103693500d: Pull complete
Digest: sha256:c170270dc9ba94f491375e366fa2cf46d0bc0027e4a69d70e6e9d1454ba748dc
Status: Downloaded newer image for postgres:13.4-alpine
Pulling app (quay.io/hedgedoc/hedgedoc:1.9.0)...
1.9.0: Pulling from hedgedoc/hedgedoc
a10c77af2613: Already exists
e66c53b2d7ce: Pull complete
887271eba921: Pull complete
bd64410d021c: Pull complete
178df5d78e0b: Pull complete
49f06fa43df5: Pull complete
be60483fa707: Pull complete
d4e04c69e5cf: Pull complete
4af62a08d678: Pull complete
602afb950097: Pull complete
75a01eb7283b: Pull complete
52f31ab40d91: Pull complete
50251e857e49: Pull complete
Digest: sha256:48231b330905c9fe0c72df5b4f67262c97f55314660f3587150fecea0f64aa37
Status: Downloaded newer image for quay.io/hedgedoc/hedgedoc:1.9.0
Creating hedgedoc-container_database_1 ... done
Creating hedgedoc-container_app_1      ... done
```

### 在Linux下使用虚拟机

不要使用VirtualBox，不要使用VirtualBox，不要使用VirtualBox！

曾经我还是使用VirtualBox的，但后来系统更新时gcc等比较多的底层都有变动，系统内核也随之发生了些许微妙的变化，结果，VirtualBox就无法启动了原有的虚拟机，总在提示大致是UUID not match这样的问题，但修复了许久都没能解决，实验数据全在里面根本无法提取出来，损失巨大，决定从此不使用VirtualBox了。

这里有两个朋友推荐虚拟机软件：`Virtual Machine Manager `和`Boxes`。

我目前在使用的是`Virtual Machine Manager`，它需要安装的内容并不多，只需要执行`sudo pacman -S virt-manager`即可。

> 不过看到有人是装了一系列软件，不太了解是什么情况，可能是出于一些需求而做。
>
> `sudo pacman -S virt-manager qemu vde2 ebtables dnsmasq bridge-utils openbsd-netcat`
>
> 然后在启动的时候会遇到`错误“ adduser：组 'libvirtd'不存在”！`这样的错误信息，但至少我在安装的时候未遇到这种问题，或许是因为配置过VirtualBox吧。
>
> 解决这个报错的方法是：
>
> ```shell
> sudo systemctl enable libvirtd.service
> sudo systemctl start libvirtd.service
> ```

> **没有对比就没有伤害**：
>
> 如果是安装VirtualBox的话，要这样安装：
>
> ```shell
> screenfetch # 这里是为了查看系统内核版本
> yay -S virtualbox virtualbox-host-dkms
> yay -S linux*-virtualbox-host-modules # 这里的*就是前面你查看的系统内核版本号
> ```
>
> 如果不巧的是你电脑上有很多个不同版本的系统内核，在安装`virtualbox-host-dkms`的时候还会自动遍历你当前所有的系统内核并分别为其安装相应的dkms，占用空间还确实不小。

安装好`Virtual Machine Manager`之后就可以新建一个虚拟机了。

**「注意」**：在新建虚拟机的时候会出现一个问题，就是在建立连接虚拟网时会提示因未激活而创建失败。解决办法是：

```shell
# 请先关闭掉Virtual Machine Manager

sudo virsh net-list --all # 执行完这一步你就会发现它问题在哪

sudo pacman -S iptables dnsmasq ebtables # 安装必要的组件
sudo systemctl restart libvirtd # 如果不做这一步而执行下一句的话会提示无法初始化防火墙后端
sudo virsh net-start default # 激活
sudo virsh net-autostart default # 设置自动启动
```

这样就可以顺利进行使用了。

> 或许后续我会补充Boxes的安装和使用教程。

### Ark打开Zip压缩包出现中文乱码的解决方案

执行如下指令即可：

```shell
yay -S p7zip-natspec
# 中间会提示你是否要删除P7zip，选择是。
```

然后打开Ark，点击菜单栏中的设置，单击配置Ark，然后取消勾选Libzip，并且要选中P7zip，保存设置并重启Ark即可。

### 设置个性化开机自启动服务

> 参考：[Manjaro开机自启动脚本实现](https://github.com/MregXN/blogs/issues/2) [systemd](https://wiki.archlinux.org/title/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BF%AE%E6%94%B9%E7%8E%B0%E5%AD%98%E5%8D%95%E5%85%83%E6%96%87%E4%BB%B6) [systemd /User](https://wiki.archlinux.org/title/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/User_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%9A%8F%E7%B3%BB%E7%BB%9F%E8%87%AA%E5%8A%A8%E5%90%AF%E5%8A%A8_systemd_%E7%94%A8%E6%88%B7%E5%AE%9E%E4%BE%8B) [Systemd 入门教程：实战篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html) 

> `systemd` [单元文件](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)的语法来源于 XDG 桌面项配置文件`.desktop`文件，最初的源头则是Microsoft Windows的`.ini`文件。单元文件可以从多个地方加载，`systemctl show --property=UnitPath` 可以按优先级从低到高显示加载目录：
>
> - `/usr/lib/systemd/system/` ：软件包安装的单元
>
> - `/etc/systemd/system/` ：系统管理员安装的单元
>
> <p align="right">——ArchWiki</p>
>
> systemd的文件主要存放在/usr/lib/systemd 目录中,有系统（system）和用户（user）之分
>
> > /usr/lib/systemd/system/ #开机不登陆就能运行
> > /usr/lib/systemd/user/ #登陆后运行
>
> 每一个服务以.service结尾，文件内一般会分为3部分：[Unit]、[Service]、[Install]
>
> [Unit] 主要是对这个服务的说明，内容包括Description和After，Description用于描述服务，After用于描述服务类别
>
> [Service] 是服务的关键，是服务的一些具体运行参数的设置，
>
> > Type=forking是后台运行的形式，
> >
> > PIDFile为存放PID的文件路径，
> >
> > ExecStart为服务的具体运行命令，
> >
> > ExecReload为重启命令，
> >
> > ExecStop为停止命令，
> >
> > PrivateTmp=True表示给服务分配独立的临时空间
> >
> > 注意：[Service]部分的启动、重启、停止命令全部要求使用绝对路径，使用相对路径则会报错！
>
> [Install] 是服务安装的相关设置，可设置为多用户的
>
> <p align="right">——MregXN</p>

对于语法问题，完全可以先看看该目录下的其他systemd单元文件，参照它们来写。

首先要准备好你希望每次开机都要启动的脚本，我姑且假设这个脚本名字叫做`supsys.sh`

然后需要给这个脚本授予权限，执行`sudo chmod 0755 /path/supsys.sh`

接着创建service文件，执行`sudo vim /usr/lib/systemd/system/supsys.service`

输入如下样例：

```
[Unit]
Description=run shell script

[Service]
ExecStart= /path/supsys.sh
Type = simple

[Install]
WantedBy=multi-user.target
```

其他具体操作请查看ArchWiki。

保存退出后，就可以直接执行`sudo systemctl enable supsys.service`来达到你的开机自启动的目的。

### 关于解决Linux无法在某磁盘分区中创建写入修改删除文件，提示：只读文件系统的问题

> 参考：[Q&A](https://qastack.cn/ubuntu/47538/how-to-make-read-only-file-system-writable)

#### 怎么了？

![](/images/Screenshot_20210525_230846.png)

不知道做了什么，我在Windows系统下做了一些工作，回到主打Linux系统之后，偶然的一次我正要创建一个新项目，结果我发现我既删不掉一些无用的文件，也创建不了新的文件，当时我就很奇怪，怎么删不掉？结果用rm命令操作，提示：只读文件系统。我当时直接震惊。。。然后执行了`mount`命令来查看一下情况，结果发现：

![](/images/2021-05-25_23-44.png)

怎么本来应该是rw的结果变成了ro？

![](/images/image_2021-05-25_23-38-33.png)

#### 咋弄的？

首先要说明一下，chmod命令实际上是不行的，chmod实际上是写的操作，在这样的问题下是行不通的。

**方案一**：先卸载掉硬盘再重新挂载。

执行了`sudo umount /dev/nvme0n1p4`和`sudo mount -o remount,rw /dev/nvme0n1p4`两个命令发现

![](/images/2021-05-25_23-46.png)

**方案二**：由于某些文件系统驱动程序也可能不支持写操作，Linux支持的较旧的NTFS模块就是这种情况。对于NTFS文件系统，应当使用`ntfs-3g`当今应自动选择的驱动程序。如果没有，可以执行`sudo mount -t ntfs-3g -o uid=$(id -u) /dev/nvme0n1p4 ~/Mydata`来强制驱动程序。

然而我执行后出现了如此情况：

![](/images/2021-05-25_23-43.png)

**方案三**：最后我执行了这个方案，成功了。

执行`sudo ntfsfix /dev/nvme0n1p4`后出现如下提示：

![](/images/2021-05-25_23-48.png)

这说明执行成功，现在重启一下，你就会发现一切恢复正常。

#### 为啥啊？

经过查询资料发现，是NTFS文件系统未正确卸载而导致文件系统被标记为已锁定，具体为何未正确卸载有可能是未正常关机。因此执行上面的指令重新修复该文件系统，即可达到解锁的目的，这时候就可以正常写入修改文件了。

### Manjaro Qv2ray软件滚挂的解决方案

从2021年5月开始，qv2ray就总是出现滚挂的问题，动辄提示缺少某一组件，经过我长时间的搜索以及思考，终于确认，问题的根源在于Manjaro更新和Qv2ray更新步调不一致，Qv2ray明显要更超前一些。而6月5日的今天又滚挂了，我一气之下就直接解决这个头痛的问题：

```shell
sudo pacman -S downgrade
# 一般情况下各位的电脑上是没有这个工具的
sudo downgrade qv2ray
```

执行完毕就reboot一下，我们就可以看到熟悉的Qv2ray又回来了！

这个指令执行完之后会向你询问是否要忽略更新该软件？我直接一刀解千愁，输入了y。

### Manjaro Qv2ray滚挂的彻底解决方案

2021年10月22日22:47，我最终向大佬寻求了援助，终于学到了为何它会滚挂的原因了，并且问题也顺利解决了！

#### 原因？

其实原因并不复杂，在安装软件的时候系统会自动安装它所需的运行依赖库。软件在安装运行依赖库有两个行为，一种是刚刚提到的——由系统在固定的依赖库目录里安装好相关依赖库并写入环境变量，后在安装的软件这里建立且仅建立一次软链接来连接依赖库；另外一种行为则是——直接将依赖库安装到软件目录内，然后由软件内部直接通过相对路径访问。似乎两种方式看起来没什么问题，但实际上问题就会出现在这里。按理说软件都会直接访问相对路径里设置好的软链接，借此连接到所需的依赖库这里，然后再执行后续操作。

为了解释方便，我暂且称某软件A安装时是采用第一种行为安装依赖库的，某软件B是采用第二种行为安装依赖库的，两者都同样需要同一个依赖库C。如果不巧的是你先安装了软件B，包管理器就会循规蹈矩地将依赖库直接安装到软件目录里，并且认为该依赖库C已经完成安装。当你再安装软件A的时候，包管理器进行检测环节（检测是否已经安装相关依赖）时就会跳过安装依赖库C，自然也跳过了软链接的建立，就直接安装了软件A。

看到了吗？这时软件A必出问题，因为软件A没有软链接，而且依赖库也不在系统固定的依赖库内！

#### 解决！

弄明白原因，自然知道应该如何去解决了～

做法其实非常简单，就是先把它需要的且你已经安装好的依赖库都先卸载掉，然后再安装这个出问题的软件，一切自然就会完整解决。如果不巧的是这个依赖好多软件都在用，你可以尝试先记下来这些软件后一个个卸载掉，再尝试安装出问题的软件，最后再装回来那些卸载掉的软件。

### Manjaro 清理

系统用久了总是会产生特别多的垃圾，上周我尝试装DataSpell的时候失败了，原因就是磁盘空间不足，接着我在Filelight里看到`~/.cache`文件夹占据空间特别大，30G+！又联系到我在计组学到的cache区域的相关知识，我就脑抽了一下，既然cache是那个作用，那我删掉应该是没事的吧？于是我直接执行了

```shell
sudo rm -rf ~/.cache
```

然后就悲剧了……

> .cache目录存放的不止是缓存文件，它还会包含你设置的个性化页面配置和一些软件内你设定好的配置，删掉这个文件夹意味着这些东西你都要重新再配置一次……

经过与大佬交流，我再搜索了一些资料，最后整理出了Manjaro的正确清理方案：

```shell
sudo pacman -Scc # 清除掉pacman的无用安装包
yay -Scc # 清除掉yay的无用安装包
sudo pacman -R $(pacman -Qdtq) # 清除掉无用的依赖
sudo journalctl --vacuum-size=50M # 只保留50M大小的日志。
# 当然你也可以使用 sudo journalctl --vacuum-time=1w，这样就是只保留最近一周的日志。
sudo rm /var/lib/systemd/coredump/* # 清除掉崩溃日志内容
```

当然如果你经常清理且你很不喜欢每一次都要写这么多指令，你完全可以写一个半自动甚至全自动清理的脚本！

<table><tr><td bgcolor=#FF6347><center><font color="#000000" size=5><strong>注意：</strong>你不应该在确认系统完全稳定不会出现任何问题之前进行清理，<br>否则当你尝试回退版本的时候你会发现事情会变得特别麻烦，<br>甚至有时候似乎就已经<font size=7>无  路  可  走</font>…………</font></center></td></tr></table>

## Proxychains无法正常代理

不知什么时候开始，我就已经无法使用proxychains来给终端走代理，结果yay也好，pacman也罢，都无法正常安装一些软件，搞人心态爆炸。

最终解决方案是编辑/etc/proxychains.conf文件的配置，将`proxy_dns`这一行直接注释掉，然后一切使用正常，因此可以确定是DNS污染导致的问题。

## 最近突然发现你的网卡了很多

我目前是一直在使用移动的网，当我和大佬调侃的时候吐槽过移动的网速和华为笔记本的网卡质量，但他在使用我的电脑时居然很惊讶为什么移动网会这么慢，就马上给我看看是怎么回事，然后……就真的发现了问题，是我错怪了移动和华为…………

<table><tr><td bgcolor=#FF6347><center><font color="#000000" size=5>原来问题是出现在镜像源这里的！</font></center></td></tr></table>

于是我们开始进入了修复……

> 因为前面已经确认过滚挂不是archlinuxcn的过，我就又把它安装回来了。

首先查看pacman的配置文件`sudo vim /etc/pacman.conf`后：

```yaml
[core]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

[extra]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

[community]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

# If you want to run 32 bit applications on your x86_64 system,
# enable the multilib repositories as required here.

[multilib]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

# An example of a custom package repository.  See the pacman manpage for
# tips on creating your own repositories.
#[custom]
#SigLevel = Optional TrustAll
#Server = file:///home/custompkgs

#[archlinuxcn]
#SigLevel = Optional TrustAll
#Server = https://mirrors.aliyun.com/archlinuxcn/$arch

#[archlinuxfr]
#SigLevel = Never
#Server = http://repo.archlinux.fr/$arch

[archlinuxcn]
SigLevel = Optional TrustedOnly
#阿里源
Server = https://mirrors.aliyun.com/archlinuxcn/$arch
#清华源
Server = http://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
#中科大源
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
#163
Server = http://mirrors.163.com/archlinux-cn/$arch
```

因为我们关注的是pacman源的问题，所以我们又执行`sudo vim /etc/pacman.d/mirrorlist`来查看内容：

```yaml
##
## Manjaro Linux custom mirrorlist
## Generated on 2021-10-21 14:28
##
## Please use 'pacman-mirrors -id' To reset custom mirrorlist
## Please use 'pacman-mirrors -c all' To reset custom mirrorlist
## To remove custom config run  'pacman-mirrors -c all'
##

## Country : China
Server = https://mirrors.huaweicloud.com/manjaro/stable/$repo/$arch
## Country : China
Server = https://mirrors.aliyun.com/manjaro/stable/$repo/$arch
```

于是我们发现，是这里运行的网速太差，于是注释掉了第一个Sever「没注释掉第二个Sever是因为注释掉的话后续进行更新会导致无法找到源」，后面我自己又做了一次整理，最终得到如下的配置信息：

```yaml
##
## Manjaro Linux custom mirrorlist
## Generated on 2021-10-21 14:28
##
## Please use 'pacman-mirrors -id' To reset custom mirrorlist
## Please use 'pacman-mirrors -c all' To reset custom mirrorlist
## To remove custom config run  'pacman-mirrors -c all'
##

## Country : China
#Server = https://mirrors.huaweicloud.com/manjaro/stable/$repo/$arch
## Country : China
Server = https://mirrors.aliyun.com/manjaro/stable/$repo/$arch
## 中科大
Server = https://mirrors.ustc.edu.cn/manjaro/stable/$repo/$arch
##  清华大学
Server = https://mirrors.tuna.tsinghua.edu.cn/manjaro/stable/$repo/$arch
## 上海交通大学
Server = https://mirrors.sjtug.sjtu.edu.cn/manjaro/stable/$repo/$arch
## 浙江大学
Server = https://mirrors.zju.edu.cn/manjaro/stable/$repo/$arch
```

再接着更换一下yay的aur源，执行`yay --aururl "https://aur.tuna.tsinghua.edu.cn" --save`。

### 这里发生了小插曲

当我尝试使用`yay -Ss xxx`的时候提示了如下的报错：

```shell
 -> error during AUR search: failed to create request: parse "“https://aur.tuna.tsinghua.edu.cn”/rpc.php?arg=icalingua&by=name-desc&type=search&v=5": first path segment in URL cannot contain colon
 -> Showing repo packages only
```

我百思不得其解，于是觉得有必要看看文件配置是怎么回事，执行了`yay -P -g`来查看具体的配置信息：

```json
{
        "aururl": "“https://aur.tuna.tsinghua.edu.cn”",
        "buildDir": "/home/breeze_shane/.cache/yay",
        "editor": "",
        "editorflags": "",
        "makepkgbin": "makepkg",
        "makepkgconf": "",
        "pacmanbin": "pacman",
        "pacmanconf": "/etc/pacman.conf",
        "redownload": "no",
        "rebuild": "no",
        "answerclean": "",
        "answerdiff": "",
        "answeredit": "",
        "answerupgrade": "",
        "gitbin": "git",
        "gpgbin": "gpg",
        "gpgflags": "",
        "mflags": "",
        "sortby": "votes",
        "searchby": "name-desc",
        "gitflags": "",
        "removemake": "ask",
        "sudobin": "sudo",
        "sudoflags": "",
        "requestsplitn": 150,
        "sortmode": 0,
        "completionrefreshtime": 7,
        "sudoloop": false,
        "timeupdate": false,
        "devel": false,
        "cleanAfter": false,
        "provides": true,
        "pgpfetch": true,
        "upgrademenu": true,
        "cleanmenu": true,
        "diffmenu": true,
        "editmenu": false,
        "combinedupgrade": false,
        "useask": false,
        "batchinstall": false
}
```

然后……我看到，第二行这里怪怪的，写的是`"“https://aur.tuna.tsinghua.edu.cn”"`，我立即去查询历史执行命令了，执行`history | grep aur`，果不其然，我看到了这个历史指令，笑掉大牙：

```shell
yay --aururl “https://aur.tuna.tsinghua.edu.cn” --save
```

原来是中文引号混进里面去了……重新修改一下命令执行就好了：

```shell
yay --aururl "https://aur.tuna.tsinghua.edu.cn" --save
```

这回yay就可以正常访问AUR源了。

如今我又重回巅峰，由原来的50KB/s左右的速度一下子飙升到10MB/s的速度！在这里非常感谢大佬！

## 偶尔看到的一些骚操作

看见有人针对JB全家桶收费问题提出了一个方案：采用无限期试用

```shell
sudo rm -rf ~/.PhpStorm2019.3/config/eval
sudo rm -rf ~/.WebStorm2019.3/config/eval
# 此处以phpstorm为例
```

## 近期有感

从2021年10月份开始，我就发现原先很好的Manjaro现在感觉变得不好了，近期遇到的问题特别多，基本上每次更新必然滚挂，而且各种各样的奇怪问题都发生了。

第一大问题是**Qv2ray风波**，这个问题目前已基本解决。今年4月份Qv2ray内部就已经产生了矛盾，持续了四个月，到8月份的时候该项目已经停止维护了。我也多少受到了影响，每一次系统更新Qv2ray都必然滚挂一回，具体的解决办法已在前面的**Manjaro Qv2ray滚挂的彻底解决方案**这一章节写过了，此处就不再赘述。如今我已经设置忽略Qv2ray更新了。

第二大问题是**显示器扩展问题**，这个问题我已经忍了很久，到现在一直没办法彻底修复，甚至连问题出现在哪里都没能真正了解清楚。经过我花较长时间使用各种方式排查，已经排除掉硬件问题， 问题已经可以确定是出现在系统配置这里的。每一次的短暂修复都只是治标不治本，我也发现，其中修复的方式多是通过回退系统内核来完成，因此很难不怀疑问题就出现在系统内核这里。个人分析认为和GCC更新有比较大的关系：更新GCC导致重新编译后的系统内核较之前的兼容性要差一些，其他项目软件还未来得及做好适配。其中NVIDIA驱动的问题最突出，经过`sudo journalctl -f`和`nvidia-smi stats`这两个命令检查之后发现，有几次是插入HDMI后显卡有一点相应但后来索性没有反应，又有几次是完全无响应，表现的问题很奇怪，但大概率是驱动和内核没有做好兼容性适配。修复的方法也很玄学，是使用一个外来的正常系统接入电脑启动后就表现正常，即使后来再回到本机系统也是如此。无独有偶，VirtualBox也遇到了问题，经过系统更新后无法启动原有的虚拟机，也正是因为内核发生了某种变化导致设备UUID发生了变动，从而导致VirtualBox不能通过权限检查，久久修复无果，只好`/remake`......

出现的这些问题很耽误工作，也很影响心情，它现在令我很不满，因此我也很快就要弃掉Manjaro转到其它的Linux发行版了。

我是喜欢折腾，但是我不喜欢在有事要忙的时候还不得不为这些问题折腾，我需要的是一个稳定高效的Linux。
