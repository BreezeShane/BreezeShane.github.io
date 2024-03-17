---
title: ArchLinux with i3wm
date: 2024-03-15 16:27:48
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
tags: 
 - ArchLinux
---

::: 参考资料

1. [Arch Linux 基础安装](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=arch-linux-%E5%9F%BA%E7%A1%80%E5%AE%89%E8%A3%85)
2. [Arch Linux 启用 archlinuxcn 源](https://www.expoli.tech/articles%2F2020%2F02%2F12%2F1581513647899)
3. [Arch Linux 安装 Xorg](https://razonyang.com/zh-hans/archlinux-guide/xorg/)
4. [ArchLinux下i3wm安装和简单配置美化](https://mindview.top/pages/be527f/)
5. [Arch Linux install i3-wm](https://www.cnblogs.com/shadow-/p/17572589.html)
6. [Archlinux 下 fcitx5-rime 的使用](https://blog.ccjp.top/index.php/archives/3/)
7. [fkxxyz/rime-cloverpinyin - GitHub](https://github.com/fkxxyz/rime-cloverpinyin)
8. [Arch Linux Clash 安装配置记录](https://blog.linioi.com/posts/clash-on-arch/)
9. [mkinitcpio - Archwiki](https://wiki.archlinuxcn.org/wiki/Mkinitcpio)
10. [ArchLinux安装教程](https://zhuanlan.zhihu.com/p/571764449)
11. [2024年最好用的12款 Linux Terminal Emulator (终端模拟器)](https://juejin.cn/post/7317832600810160191)
12. [Linux 下使用 Clash 科学上网](https://little-star.love/posts/f2114751/)
13. [Linux查看软件安装目录及位置4种方法（Linux）](https://www.linuxjiaocheng.com/2232.html)
14. [linux查看软件的安装位置简单方法](https://cloud.tencent.com/developer/article/1726016)
15. [pacman常用命令](https://hustlei.github.io/2018/11/msys2-pacman.html)
16. [nvme硬盘的断电保护是否有用，是噱头、智商税还是真的有需要？购买DOCKCASE智能M2固态硬盘盒10秒保护](https://www.cnblogs.com/devilmaycry812839668/p/17070158.html)
17. [0.0.0.0和127.0.0.1、127.0.1.1、localhost](https://blog.csdn.net/wys578/article/details/80984467)
18. [linux下部署Clash+dashboard](https://parrotsec-cn.org/t/linux-clash-dashboard/5169)

:::

## 梦前要备床

在今年1月初，正逢固态价格较低的时候，我用￥578.98的价格买下了 SOLIDIGM P44 PRO 海力士固态硬盘，并另外购置了一个高端硬盘盒 DOCKCASE Type-C 3.2, 该硬盘盒附带屏幕，还具备断电保护，实际测试大约有5s的断电保护。

::: warning 注意事项

含断电保护的硬盘盒一般在断电保护时会发生如下事情：

1. 检测到断电，此时电容放电，然后为当前硬盘写入读写保护标志
2. 在电容放电时间内更新FTL映射表
3. 更新完成后在不到10%的电量下进行弹出硬盘操作（移除读写保护标志等）
4. 电容放电完毕，停止一切操作

读写保护标志写入后，该盘会既无法读取，也无法写入任何数据，这意味着，当你关闭计算机时，PC断电后会立即触发硬盘盒断电保护的机制，如果在它未释放完所有电时启动计算机，此时硬盘仍处于读写保护状态，因此当计算机启动结束时用户会发现该盘无法读取/系统不识别该盘等类似问题。

:::

## 入梦的开始

提前准备好 ArchLinux 的镜像之后，通过 Ventoy 把 TF 卡做成启动盘，将镜像放入之后, 用户可在此时考虑直接给盘划好分区，不管怎么说，图形化分区还是比命令行分区更友好方便。在保证 Secure Boot 【安全启动】处于关闭, 且启动方式为 UEFI 的情况下, 通过 BIOS 启动【Portable PC一般按F12即可自行选择启动项】镜像系统。

> 一般安装镜像系统是无图形化界面的，会以终端的形式出现。

::: info

【可选】执行`sudo systemctl stop reflector.service`来禁用 reflector ，以避免镜像源筛选不准确的可能性，该事件存在一定的概率会发生。

【可选】如已遗忘 BIOS 启动方式是否为 UEFI 时，可执行`ls /sys/firmware/efi/efivars`来查看，如若输出大量文字(EFI 变量)，说明当前已在 UEFI 模式。

:::

### 有线/无线联网

装机第一事，先连互联网。有线网络下插入网线即可【Portable PC可接入扩展坞后再接入网线】；无线网络下可使用 iwctl 接入，按照以下顺序依行键入命令：

```shell
iwctl                           # 执行iwctl命令，进入交互式命令行
device list                     # 列出设备名，一般无线网卡中会看到 wlan0
station wlan0 scan              # 扫描可连接的所有无线网络
station wlan0 get-networks      # 列出当前扫描到的所有无线网络
station wlan0 connect <YOUR-WIRELESS-NAME> # 进行连接，后面会提示键入密码
exit                            # 也可直接按 Ctrl + D 的热键退出 iwctl 程序，退出后可使用 ping 命令确认网络连接状态
```

::: info

如果你不能正常连接网络，首先确认系统已经启用网络接口:

```shell
ip link
ip link set wlan0 up
```

:::

为保证网络正常连接，需要进行一次时间同步：

```shell
timedatectl set-ntp true    # 将系统时间与网络时间进行同步
timedatectl status          # 检查服务状态
```

### 硬盘分区

如果用户忘记在前面分区，这时还是可以直接进行分区的，首先执行`lsblk`查看所有硬盘的分区情况，找出需要分区的盘【类似`/dev/sdX`或者`/dev/nvme0n1pX`，以实际情况为准】，然后执行`parted /dev/xxxxxxx`进入程序。

一般情况下我们使用GPT分区表，进入程序后执行`mktable`，这时会询问使用什么类型的分区表，键入`gpt`即可，然后输入`quit`退出。

接着执行`cfdisk /dev/xxxxxxx`来为硬盘分区，划分好区并确认没问题之后，记得最后执行写入`[w]`，cfdisk下面有提示。

【可选】键入`fdisk -l`查看分区情况。

顺便给出我的分区情况：

```shell
Disk /dev/nvme0n1: 953.87 GiB, 1024209543168 bytes, 2000409264 sectors
Disk model: SAMSUNG MZVL21T0HCLR-00B00
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: D5071BE2-6738-4B6C-AED6-12BF1F9A131E

Device              Start        End   Sectors   Size Type
/dev/nvme0n1p1       2048    1050623   1048576   512M EFI System
/dev/nvme0n1p2    1050624    1083391     32768    16M Microsoft reserved
/dev/nvme0n1p3    1083392  315656191 314572800   150G Microsoft basic data
/dev/nvme0n1p4  315656192 1154516991 838860800   400G Microsoft basic data
/dev/nvme0n1p5 1154516992 2000408575 845891584 403.4G Microsoft basic data


Disk /dev/sda: 953.87 GiB, 1024209543168 bytes, 2000409264 sectors
Disk model: DSWC1P
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 33553920 bytes
Disklabel type: gpt
Disk identifier: C09E473C-91BF-49CF-A6E8-371D67B13335

Device          Start        End    Sectors   Size Type
/dev/sda1        4096    1052671    1048576   512M Linux filesystem
/dev/sda2     1052672  630198271  629145600   300G Linux filesystem
/dev/sda3   630198272 1967132671 1336934400 637.5G Microsoft basic data
/dev/sda4  1967132672 2000408575   33275904  15.9G Linux filesystem
```

分好区后，就该接着进行格式化了，我个人倾向这样安排文件系统: EFI 分区使用 FAT32 文件系统，系统分区使用 BTRFS 文件系统，数据分区使用 NTFS 文件系统。

```shell
mkfs.vfat /dev/xxxx1
mkfs.btrfs /dev/xxxx2
mkfs.ntfs /dev/xxxx3
```

格式化完成之后，需要按照如下顺序进行挂载

```shell
mount /dev/xxxx2 /mnt
mkdir /mnt/efi
mount /dev/xxxx1 /mnt/efi
```

数据分区并不是系统运行必须，因此不必着急在此完成挂载，安装好系统后再做自动挂载也来得及。

### 系统安装

接下来要安装系统了，在此之前先选择好镜像源，执行`vim /etc/pacman.d/mirrorlist`来查看当前所有镜像，并将中科大镜像源写到第一行中：`Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch`。

接下来执行该命令安装系统【先确保等待 `pacman-init.service` 服务启动后，才能执行，可通过`systemctl status pacman-init`查看】：

```shell
pacstrap /mnt base base-devel linux linux-headers linux-firmware 
pacstrap /mnt dhcpcd vim bash-completion networkmanager
```

安装完毕后，执行`genfstab -U /mnt >> /mnt/etc/fstab`来写入`fstab`文件，可通过`cat /mnt/etc/fstab`进一步查看是否有误。

一切都没有问题之后，就可以 chroot 了，执行`arch-chroot /mnt`进入刚刚安装的系统。

## 初梦

### 设置系统时区、语言以及字符编码

设置系统时区，并更新硬件时间：

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

选择系统语言及编码：执行`vim /etc/locale.gen`，寻找文件中`en_US.UTF-8`和`zh_CN.UTF-8`，取消其注释后保存，执行`locale-gen`生成 Locale, 最后执行`echo 'LANG=en_US.UTF-8' > /etc/locale.conf`完成系统语言及编码的选择。

### 设置 Hostname 与其解析

这时还需要设置主机名：执行`echo 'YOUR_HOST_NAME' > /etc/hostname`，并将`YOUR_HOST_NAME`换成自己的主机名即可，不建议使用中文。之后打开`/etc/hosts`，执行`vim /etc/hosts`，写入如下内容：

```shell
127.0.0.1   localhost
::1         localhost
127.0.1.1   YOUR_HOST_NAME
```

::: info 常见IP

- 127.0.0.1: 本机地址，主要用于测试
- 127.0.1.1: 127.0.0.0/8段下面的一个IP，可用来解析自己的主机名。
- 0.0.0.0: 非真正意义上的IP，表示所有在 本机的路由表里没有特定条目指明如何到达 的主机和目的网络。
- 255.255.255.255:  限制广播地址，对本机来说指本网段内(同一广播域)的所有主机，该地址不能被路由器转发。

:::

### 创建用户与设置密码

记得为 root 用户设置密码，这是保障系统安全的重要一环，执行`passwd root`即可。

应该注意到, 一般不以 root 用户登入系统，所以现在创建非 root 用户`useradd -m -G wheel -s /bin/bash YOUR_USER_NAME`, 并为其设置密码`passwd YOUR_USER_NAME`，之后编辑`/etc/sudoers`, 找到`#%wheel ALL=(ALL:ALL) ALL`, 取消其注释。

### 安装微码与引导程序

之后安装微码：`pacman -S intel-ucode # amd-ucode for AMD CPU`

最后要安装引导程序：

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB # --removable 如果要装入移动硬盘内，一般要加上这个参数
```

> 有关 removable 参数有资料这样解释：
> 某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件
> 因此使用`--removable`参数解决一些主板 NVRAM 的兼容性问题。

紧接着`vim /etc/default/grub`，去掉`GRUB_CMDLINE_LINUX_DEFAULT`一行中最后的`quiet`参数，并将`log level`的值改到`5`。

【可选】可以考虑再给`GRUB_CMDLINE_LINUX_DEFAULT`加上`nowatchdog`参数，但这有可能会引发未知问题，如果watchdog没有导致极严重的问题一般不建议添加，仅当非常清楚可能导致的后果后再做决定。

接着执行`grub-mkconfig -o /boot/grub/grub.cfg`来生成grub配置后，至此系统安装就算正式完成了，执行以下命令即可进入新系统【记得拔掉系统镜像盘，修改启动项】：

```shell
exit                # 退回系统镜像
umount -R  /mnt     # 卸载新系统分区
reboot              # 重启
```

## 浅梦

### 开启网络服务

启动新系统之后，记得开启网络服务：

```shell
systemctl enable NetworkManager
systemctl start NetworkManager
```

之后可以执行`nmtui`进入管理界面，自行连接网络，当然也可以考虑使用`nmcli`命令，具体可使用`man nmcli`查看使用方式。

### 添加 Archlinuxcn 软件镜像源

除了官方extra软件源以及其它软件源外，还有一个比较常见常用的软件源是 archlinuxcn 源，我们可以这样添加软件源【编辑`/etc/pacman.conf`】：

```shell
[archlinuxcn]
SigLevel = Required DatabaseOptional TrustedOnly
Include = /etc/pacman.d/archlinuxcn-mirrorlist
```

与此同时，再创建文件`/etc/pacman.d/archlinuxcn-mirrorlist`并写入以下内容：

```shell
#
# Arch Linux CN community repository mirrorlist
# Generated on 2019-12-03
#

# Our main server (ipv4, ipv6, http, https)
#Server = <https://repo.archlinuxcn.org/$arch>

# 中国科学技术大学 (ipv4, ipv6, http, https)
Server = <https://mirrors.ustc.edu.cn/archlinuxcn/$arch>

# 上海科技大学 (上海) (ipv4, http, https)
#Server = <https://mirrors-wan.geekpie.club/archlinuxcn/$arch>

# 网易 (ipv4, http, https)
Server = <https://mirrors.163.com/archlinux-cn/$arch>

# 腾讯云 (ipv4, https)
Server = <https://mirrors.cloud.tencent.com/archlinuxcn/$arch>

# 重庆大学 (ipv4, http, https)
Server = <https://mirrors.cqu.edu.cn/archlinuxcn/$arch>

# SJTUG 软件源镜像服务 (ipv4, https)
#Server = <https://mirrors.sjtug.sjtu.edu.cn/archlinux-cn/$arch>

# 莞工 GNU/Linux 协会 开源软件镜像站 (ipv4, http, https)
#Server = <https://mirrors.dgut.edu.cn/archlinuxcn/$arch>

# 清华大学 (ipv4, ipv6, http, https)
Server = <https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch>

# 浙江大学 (浙江杭州) (ipv4, ipv6, http, https)
Server = <https://mirrors.zju.edu.cn/archlinuxcn/$arch>

# xTom (Hong Kong server) (Hong Kong) (ipv4, ipv6, http, https)
#Server = <https://mirror.xtom.com.hk/archlinuxcn/$arch>

# xTom (US server) (US) (ipv4, ipv6, http, https)
#Server = <https://mirror.xtom.com/archlinuxcn/$arch>

# xTom (Netherlands server) (Netherlands) (ipv4, ipv6, http, https)
#Server = <https://mirror.xtom.nl/archlinuxcn/$arch>

# Open Computing Facility, UC Berkeley (Berkeley, CA, United States) (ipv4, ipv6, http, https)
#Server = <https://mirrors.ocf.berkeley.edu/archlinuxcn/$arch>
```

配置写好之后，还需要安装 Archlinuxcn 镜像源的 Keys ，执行：

```shell
pacman-key --init
pacman -Syy
pacman -S archlinuxcn-keyring
pacman-key --populate archlinuxcn
```

只有 Keys 安装正确后才能正常安装 Archlinuxcn 镜像源上的软件。

### 安装 Xorg 图形桌面服务

图形桌面服务有两个可选项：`Xorg`和`WayLand`。一般都使用`Xorg`，我们以这样的方式安装`Xorg`：

```shell
sudo pacman -S xorg-server # 安装 Xorg 服务, 另外 xorg-xinit 以及 xorg-apps 两者都是可选的
lspci -v | grep -A1 -e VGA -e 3D # 检查系统的显卡信息
sudo pacman -S xf86-video-intel nvidia nvidia-utils # 对于 Intel CPU 和 Nvidia GPU 则需要安装这三个
sudo pacman -Ss xf86-video # 自然可以考虑使用开源驱动程序
reboot # 建议重启机器保证驱动等安装正确，没出现其它问题
sudo pacman -S xorg-xinit xorg-twm xterm xorg-xclock # 重启后安装测试工具(可后删除)
cp /etc/X11/xinit/xinitrc ~/.xinitrc # 复制 .xinitrc 配置文件模板
startx # 启动 Xorg 进行图形桌面服务测试
```

## 深梦

### 安装桌面管理器 i3 WM 及其常用系统软件

个人偏好使用`Tiling Window Manager`，先前尝试使用过`Awesome Window Manager`，因此这次想尝试一些不一样的，于是选择了`i3 Window Manager`，安装：

```shell
sudo pacman -S i3-wm
```

为了开机能以图形界面登陆，安装了 Sddm 程序：

```shell
sudo pacman -S sddm
sudo systemctl enable sddm
```

系统音频控制需要安装好以下软件：

```shell
sudo pacman -S alsa alsa-utils pulseaudio-utils pulseaudio pavucontrol playerctl # Alsa系的音频控制工具，含pavucontrol图形控制界面工具
```

个人偏好的软件如下：

```shell
sudo pacman -S compton # 窗口透明化
sudo pacman -S rofi # 快速启动工具
sudo pacman -S feh # 壁纸设置工具，支持指定目录下随机，同时也是轻量的图片查看器
sudo pacman -S terminology # 个人偏好的终端模拟器
sudo pacman -S zsh # 个人偏好的终端
sudo pacman -S polybar # 系统状态栏，可自定制
sudo pacman -S tree # 文件树展开，项目结构可一目了然
sudo pacman -S i3lock-color # i3常用的屏幕锁定工具
sudo pacman -S autorandr # 屏幕扩展的自动管理工具
sudo pacman -S rofimoji # rofi界面的Emoji表情输入
sudo pacman -S telegram-desktop # Telegram聊天工具软件
sudo pacman -S xsel # 操作剪贴板的终端工具
sudo pacman -S xdotool # 可以模拟鼠标和按键操作的工具
sudo pacman -S less # 功能强大的查看文件内容的工具
sudo pacman -S timeshift # 快照备份工具，BTRFS文件系统备份常用
sudo pacman -S qbittorrent # BT下载器
sudo pacman -S ark # 开源压缩软件
sudo pacman -S flameshot # 截屏工具，对多屏幕支持友好
sudo pacman -S netease-cloud-music-gtk4 # 网易云音乐，不推荐使用Electron-Netease-Cloud-Music，会导致系统死机
sudo pacman -S linuxqq # 官方QQ程序，非官方程序现在基本不好用
sudo pacman -S vlc # 开源视频播放器
```

系统字体对个人来说这些已经够用了，但可能确实有冗余：

```shell
sudo pacman -S noto-fonts-emoji noto-fonts-extra nerd-fonts ttf-font-awesome adobe-source-code-pro-fonts awesome-terminal-fonts adobe-source-sans-fonts ttf-freefont
```

## 梦魇

### 安装 Oh-my-zsh 并切换默认终端

前面安装好 Zsh 之后，就可以安装 Oh-my-zsh Theme 了，并且加入其中的一些插件：

```shell
# Oh-my-zsh ， Powerlevel10k 主题 以及 常用插件
git clone https://github.com/romkatv/powerlevel10k.git .oh-my-zsh/themes/powerlevel10k
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

一般进入 Zsh 后会自动进入配置环节，如果没进入的话需要手动执行`p10k configure`来进行主题配置，一般像前面装好字体之后就可以正常看到图标字符了。

配置好之后一般会自动帮你写好`.zshrc`文件，除去下面的alias，剩下的便是正常写好的样子：

```shell
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  z
  cp
  sudo
  extract
  autojump
  alias-finder
  zsh-completions
  colored-man-pages
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-history-substring-search
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

alias ls="colorls"
alias ll="colorls -l"
alias la="colorls -a"
alias cat="bat"
alias wpe="fantascene-dynamic-wallpaper"
```

记得执行`chsh -s zsh <YOUR_USERNAME>`来修改默认 Shell 。

### 安装 Fcitx5 Rime 中文输入法

中文输入法折腾起来挺麻烦，当初我也是翻了好些个资料，现在我直接整合到一起了，首先应当安装以下这些软件

```shell
sudo pacman -S fcitx5-configtool fcitx5 fcitx5-gtk fcitx5-qt fcitx5-rime librime librime-prelude # 输入法及其可扩展的工具依赖
yay -S rime-cloverpinyin
sudo pacman -S python-jieba pypinyin opencc python-requests # 来源：https://github.com/fkxxyz/rime-cloverpinyin?tab=readme-ov-file#%E4%BB%8E%E6%9C%AC%E4%BB%93%E5%BA%93%E6%BA%90%E7%A0%81%E6%9E%84%E5%BB%BA
```

接着编辑`/etc/environment`文件, 写入以下这些内容：

```shell
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
fcitx5 &
```

接着编辑文件`~/.local/share/fcitx5/rime/default.custom.yaml`, 写入以下配置，设置使用四叶草输入法，并设定候选词个数

```shell
patch:
  "menu/page_size": 10
  schema_list:
    - schema: clover
```

接着先推荐一个主题，是我个人比较喜欢使用的一个主题：[https://github.com/hosxy/Fcitx5-Material-Color](https://github.com/hosxy/Fcitx5-Material-Color)

一般手动安装主题都是安装以下命令安装的：

```shell
git clone <link.to.github.repo>
cd <repo.name>
cp -r <theme.name> ~/.local/share/fcitx5/themes
```

安装好主题之后在这里编辑文件`~/.config/fcitx5/conf/classicui.conf`，写入：

```shell
# 垂直候选列表
Vertical Candidate List=False
# 按屏幕 DPI 使用
PerScreenDPI=True
# Font (设置成你喜欢的字体)
#Font="思源黑体 CN Medium 13"
Font="Noto Sans CJK SC Bold 20"
# 主题
Theme=Material-Color-Indigo
```

接着安装一些常用词库，重启后就可以开始体验舒适的中文输入了：

```shell
yay -S rime-pinyin-zhwiki fcitx5-pinyin-moegirl-rime # 安装词库
```

### 设置 Swap

设置交换文件/分区的做法如下，设置交换文件的话应当使用`dd`工具创建特殊文件，设置好权限之后将其格式化

```shell
dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress #创建4G的交换空间 大小根据需要自定
chmod 600 /swapfile #设置正确的权限
mkswap /swapfile #格式化swap文件
swapon /swapfile #启用swap文件
sudo echo '/swapfile none swap defaults 0 0' >> /etc/fstab
```

类似的，也可以自行裁出一块分区后，依次使用`mkswap`和`swapon`制作 Swap 分区，并在`/etc/fstab`最后添加`UUID=<YOUR_DISK_UUID>   /swap   swap    swap,defaults   0 0`

### Android Debug 工具

如果有对安卓机调试/挂载的需要，则安装如下工具即可：

```shell
sudo pacman -S scrcpy android-tools # 安卓机挂载/调试用的工具
```

### 安装 LaTeX and LaTeX Workshop in VS Code

要想在本地使用 LaTeX，安装这些后在 VS Code 上安装插件 LaTeX Workshop，

```shell
sudo pacman -S texlive-core texlive-langchinese texlive-latexextra texlive-fontsextra texlive-science texlive-xetex
```

打开其配置文件(`Ctrl`+`Shift`+`P`后输入`settings.json`, 打开 User Settings), 在`{}`内加入如下内容：

```json
    "latex-workshop.latex.tools": [
        {
          "name": "latexmk",
          "command": "latexmk",
          "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "-pdf",
            "%DOC%"
          ]
        },
        {
          "name": "xelatex",
          "command": "xelatex",
          "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "%DOC%"
          ]
        },
        {
          "name": "pdflatex",
          "command": "pdflatex",
          "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "%DOC%"
          ]
        },
        {
          "name": "bibtex",
          "command": "bibtex",
          "args": [
            "%DOCFILE%"
          ]
        }
      ],
      "latex-workshop.latex.recipes": [
        {
          "name": "latexmk",
          "tools": [
            "latexmk"
          ]
        },
        {
          "name": "xelatex",
          "tools": [
            "xelatex"
          ]
        },
        {
          "name": "pdflatex -> bibtex",
          "tools": [
            "pdflatex",
            "bibtex"
          ]
        },
        {
          "name": "pdflatex -> bibtex -> pdflatex*2",
          "tools": [
            "pdflatex",
            "bibtex",
            "pdflatex",
            "pdflatex"
          ]
        },
        {
          "name": "xelatex -> bibtex -> xelatex*2",
          "tools": [
            "xelatex",
            "bibtex",
            "xelatex",
            "xelatex"
          ]
        }
      ],
      "latex-workshop.view.pdf.viewer": "tab",
      "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
      ],
      "latex-workshop.bibtex-format.tab": "4 spaces",
      "latex-workshop.latex.autoBuild.run": "onSave",
      "latex-workshop.latex.recipe.default": "lastUsed",   
```

这次的配置文件较以前在 ArcoLinux 中多了按照上次使用的编译方式进行编译，并且可以修改是否在保存时编译的设置。

### 使用 Clash Premium and Dashboard 科学上网

科学上网，就用Clash保驾护航，首先需要安装：

```shell
sudo pacman -S archlinuxcn/clash-premium-bin # 安装该软件的Premium版本才能使用Rules规则
sudo pacman -S archlinuxcn/clash-dashboard-git # Dashboard 是有必要安装的，便于手动切换节点
```

之后需要从机场的订阅链接获取 Clash 配置文件，可考虑使用 wget 将其下载过来，一般下载过来的配置文件都会给你写好里面的规则等必须信息。

接着需要设置开机自启以及启动服务，但应注意，服务名是这样的格式：`clash@<YOUR_USERNAME>.service`

```shell
sudo systemctl enable clash@<YOUR_USERNAME>
sudo systemctl start clash@<YOUR_USERNAME>
```

接着需要配置全局代理，编辑`/etc/environment`文件：

```shell
# Clash Proxy
http_proxy=http://127.0.0.1:7890
https_proxy=http://127.0.0.1:7890
socks_proxy=http://127.0.0.1:7891
```

接着配置 dashboard, 将安装来的`clash-dashboard-git`下的所有文件复制到`.config/clash/dashboard`里：

```shell
mkdir ~/.config/clash/dashboard
cp -r /usr/share/clash-dashboard-git/* ~/.config/clash/dashboard
```

之后编辑clash配置文件`~/.config/clash/config.yaml`, 一般文件头部的样子是这样的：

```yaml
port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info
```

为使用 Dashboard， 需要添加如下两行：

```yaml
secert: '' // 设置 Dashboard 登入密码，如不设置可像这样置空
external-ui: dashboard // 增加这一行以启用 Dashboard 界面，名字与 ~/.config/clash/ 下的文件夹名保持一致
```

至此，执行`sudo systemctl restart clash@<YOUR_USERNAME>`后就可以正常科学上网了，另外，如需要进入 Dashboard 界面，应点击这里的链接：[localhost:9090/ui/clash-dashboard-git/](localhost:9090/ui/clash-dashboard-git/), 如果你不确定 Dashboard 的具体名字，可点该链接查看：[localhost:9090/ui/](localhost:9090/ui/)。

### Linux 查找软件安装目录

Linux 一般安装的软件位置会在以下几个目录中，如有需要届时可以自行查找：

1. `/usr/share`
2. `/usr/local`
3. `/opt`

如果已知可执行程序，也可直接使用`whereis`, `which`等查看位置

## 醒不过来了
