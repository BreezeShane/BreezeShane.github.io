---
title: ArchLinux 安装与配置
category:
 - Diverse Essays
tag:
 - Eclectic
 - Linux
 - Journal
article: true
timeline: true
sticky: false
star: true
---

## 梦前要备床

::: info 参考资料

[nvme硬盘的断电保护是否有用，是噱头、智商税还是真的有需要？购买DOCKCASE智能M2固态硬盘盒10秒保护](https://www.cnblogs.com/devilmaycry812839668/p/17070158.html)

:::

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

::: info 参考资料 [Arch Linux 基础安装 / 0.禁用 reflector](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_0%e7%a6%81%e7%94%a8-reflector)、[Arch Linux 基础安装 / 1.再次确保是否为 UEFI 模式](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_1%e5%86%8d%e6%ac%a1%e7%a1%ae%e4%bf%9d%e6%98%af%e5%90%a6%e4%b8%ba-uefi-%e6%a8%a1%e5%bc%8f)
:::

提前准备好 ArchLinux 的镜像之后，通过 Ventoy 把 TF 卡做成启动盘，将镜像放入之后, 用户可在此时考虑直接给盘划好分区，不管怎么说，图形化分区还是比命令行分区更友好方便。在保证 Secure Boot 【安全启动】处于关闭, 且启动方式为 UEFI 的情况下, 通过 BIOS 启动【Portable PC 一般按`F12`即可自行选择启动项】镜像系统。一般安装镜像系统是无图形化界面的，会以终端的形式出现。

::: tip

【可选】执行`sudo systemctl stop reflector.service`来禁用 reflector ，以避免镜像源筛选不准确的可能性，该事件存在一定的概率会发生。

【可选】如已遗忘 BIOS 启动方式是否为 UEFI 时，可执行`ls /sys/firmware/efi/efivars`来查看，如若输出大量文字(EFI 变量)，说明当前已在 UEFI 模式。

:::

### 有线或无线联网

::: info 参考资料 [ArchLinux安装教程 / 连接到互联网](https://zhuanlan.zhihu.com/p/571764449)、[Arch Linux 基础安装 / 2.连接网络](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_2%e8%bf%9e%e6%8e%a5%e7%bd%91%e7%bb%9c)
:::

装机第一事，先连互联网。有线网络下插入网线即可【Portable PC可接入扩展坞后再接入网线】；无线网络下可使用 iwctl 接入，按照以下顺序依行键入命令：

```shell
iwctl                           # 执行iwctl命令，进入交互式命令行
device list                     # 列出设备名，一般无线网卡中会看到 wlan0
station wlan0 scan              # 扫描可连接的所有无线网络
station wlan0 get-networks      # 列出当前扫描到的所有无线网络
station wlan0 connect <YOUR-WIRELESS-NAME> # 进行连接，后面会提示键入密码
exit                            # 也可直接按 Ctrl + D 的热键退出 iwctl 程序，退出后可使用 ping 命令确认网络连接状态
```

::: tip

如果提示没有 iwctl 命令请先安装`iwd`，并通过`systemctl enable iwd`和`systemctl start iwd`来启动。

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

::: info 参考资料 [Linux 中 Swap 交换分区设置教程，以及 Swap 大小与内存的关系 / 一、Swap 分区是什么](https://zhuanlan.zhihu.com/p/399986218)
:::

如果用户忘记在前面分区，这时还是可以直接进行分区的，首先执行`lsblk`查看所有硬盘的分区情况，找出需要分区的盘【类似`/dev/sdX`或者`/dev/nvme0n1pX`，以实际情况为准】，然后执行`parted /dev/xxxxxxx`进入程序。

一般情况下我们使用GPT分区表，进入程序后执行`mktable`，这时会询问使用什么类型的分区表，键入`gpt`即可，然后输入`quit`退出。

接着执行`cfdisk /dev/xxxxxxx`来为硬盘分区，划分好区并确认没问题之后，记得最后执行写入`[w]`，cfdisk下面有提示。

【可选】键入`fdisk -l`查看分区情况。

::: tip 请留意一下分区类别

在使用`fdisk -l`时请留意一下第一分区的 Type 是不是`EFI System`，如果不是可以在`cfdisk`中选中第一分区后在下方选择`[Type]`，调整为`EFI System`即可。

:::

顺便给出我的分区情况：

```shell
Disk /dev/sda: 953.87 GiB, 1024209543168 bytes, 2000409264 sectors
Disk model: DSWC1P
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 33553920 bytes
Disklabel type: gpt
Disk identifier: C09E473C-91BF-49CF-A6E8-371D67B13335

Device          Start        End    Sectors   Size Type
/dev/sda1        4096    1052671    1048576   512M EFI System
/dev/sda2     1052672  630198271  629145600   300G Linux filesystem
/dev/sda3   630198272 1967132671 1336934400 629.5G Linux filesystem
/dev/sda4  1967132672 2000408575   33275904  23.9G Linux filesystem
```

::: info 说明

我另外分了约24G大小的分区，这个分区将被做成 Swap 分区。这种分区是用来缓解内存不足的问题，类似 Windows 的虚拟内存。事实上 Btrfs 文件系统允许使用 Swap 文件来代替 Swap 分区，不过仅能当作虚拟内存使用。而我划分成分区是为了支持系统休眠（Systemctl hibernate）的。

:::

分好区后，就该接着进行格式化了，我个人倾向这样安排文件系统: EFI 分区使用 FAT32 文件系统，系统和数据要做物理隔离，系统分区和数据分区均使用 Btrfs 文件系统，最后剩下的这个分区则是 Swap 分区。

```shell
mkfs.vfat -L EFISYS /dev/xxxx1
mkfs.btrfs -m dup -d single -L SYSTEM /dev/xxxx2
mkfs.btrfs -m dup -d single -L DATA /dev/xxxx3
mkswap -L SWAP /dev/xxxx4
```

### Btrfs

::: info 参考资料 [archlinux 基础安装 / 7-2-3. 创建 Btrfs 子卷](https://arch.icekylin.online/guide/rookie/basic-install#_7-2-3-%E5%88%9B%E5%BB%BA-btrfs-%E5%AD%90%E5%8D%B7) [archlinux调整分区及btrfs文件系统大小](https://www.cnblogs.com/lookfeel/p/17975517)
:::

为了利用 Btrfs 的特性，需要先挂载一下然后创建子卷。挂载时可以开启透明压缩，执行命令`mount -t btrfs -o compress=zstd /dev/xxxx2 /mnt`。

::: tip 可以使用`df -h`来确认挂载情况。
:::

然后创建 Btrfs 子卷，执行：

```shell
btrfs subvolume create /mnt/@ # 创建 / 目录子卷
btrfs subvolume create /mnt/@home # 创建 /home 目录子卷
```

::: info 这样布局是因为 TimeShift 仅支持这种布局。
:::

::: tip 可以使用`btrfs subvolume list -p /mnt`来确认子卷情况
:::

创建好之后先卸载掉该分区，执行`umount /mnt`

::: caution

如果未来需要调整 Btrfs 分区，请严格按照以下执行顺序来做：

1. 挂载 Btrfs 分区
2. 通过 Btrfs 的工具缩小分区，执行`btrfs filesystem resize <TARGET_PARTITION_SIZE> <MOUNT_POINT>`
3. 使用`cfdisk`调整分区

如果不按照该顺序执行，将会导致 Btrfs 分区无法正常挂载，这是由 Btrfs 的基本原理决定的。

若不幸先使用了`cfdisk`调整分区，如果这时还未执行额外操作，只是简单地缩小了 Btrfs 分区，对于出现的空闲空间没有做进一步操作，那么还可以使用`cfdisk`调整回原有大小，这时 Btrfs 分区就可以正常挂载了。

若对空闲空间做了创建分区、格式化等操作，不保证删除该分区后通过`cfdisk`调整回原有大小是否还能正常挂载 Btrfs 分区，这取决于进一步的操作是否影响 Btrfs 的 BTree 索引。

:::

### 硬盘挂载

::: info 参考资料 [archlinux 基础安装 / 8. 挂载](https://arch.icekylin.online/guide/rookie/basic-install#_8-%E6%8C%82%E8%BD%BD)
:::

格式化完成之后，需要按照如下顺序进行挂载

```shell
mount -t btrfs -o subvol=/@,compress=zstd /dev/xxxx2 /mnt

mkdir /mnt/home
mount -t btrfs -o subvol=/@home,compress=zstd /dev/xxxx2 /mnt/home

mkdir /mnt/home/MyData
mount -t btrfs -o compress=zstd /dev/xxxx3 /mnt/home/MyData

mkdir -p /mnt/boot/efi
mount /dev/xxxx1 /mnt/boot/efi

swapon /dev/xxxx4
```

挂载完请使用`df -h`确认一次挂载情况，确保没有挂载错误。对于 Swap 分区的挂载情况可以使用`free -h`查看。

### 系统安装

::: details 参考资料

1. [archlinux 基础安装 / 安装系统](https://arch.icekylin.online/guide/rookie/basic-install#_9-%E5%AE%89%E8%A3%85%E7%B3%BB%E7%BB%9F)
2. [Does linux or linux-lts depend on specific version of linux-firmware?](https://bbs.archlinux.org/viewtopic.php?id=250535)
3. [linux-lts-headers 6.12.23-1 - Arch Linux](https://archlinux.org/packages/core/x86_64/linux-lts-headers/)
4. [Arch Linux 基础安装 / 7.镜像源的选择](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_7%e9%95%9c%e5%83%8f%e6%ba%90%e7%9a%84%e9%80%89%e6%8b%a9)
5. [archlinux 基础安装 / 6. 更换国内软件仓库镜像源加快下载速度](https://arch.icekylin.online/guide/rookie/basic-install#_6-%E6%9B%B4%E6%8D%A2%E5%9B%BD%E5%86%85%E8%BD%AF%E4%BB%B6%E4%BB%93%E5%BA%93%E9%95%9C%E5%83%8F%E6%BA%90%E5%8A%A0%E5%BF%AB%E4%B8%8B%E8%BD%BD%E9%80%9F%E5%BA%A6)
6. [Arch Linux 基础安装 / 9.生成 fstab 文件](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_9%e7%94%9f%e6%88%90-fstab-%e6%96%87%e4%bb%b6)
7. [Arch Linux 基础安装 / 10.change root](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_10change-root)

:::

接下来要安装系统了，在此之前先选择好镜像源，执行`vim /etc/pacman.d/mirrorlist`来查看当前所有镜像，并将中科大镜像源写到第一行中：

```shell
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
```

接下来执行该命令安装系统【先确保等待 `pacman-init.service` 服务启动后，才能执行，可通过`systemctl status pacman-init`查看】：

```shell
pacstrap /mnt base base-devel linux linux-headers linux-firmware btrfs-progs
pacstrap /mnt dhcpcd vim bash-completion iwd
```

::: tip

如果你希望使用 linux-lts 内核，应执行以下这些命令：

```shell
pacstrap /mnt base base-devel linux-lts linux-lts-headers linux-firmware btrfs-progs
pacstrap /mnt dhcpcd vim bash-completion iwd
```

:::

安装完毕后，执行`genfstab -U /mnt >> /mnt/etc/fstab`来写入`fstab`文件，可通过`cat /mnt/etc/fstab`进一步查看是否有误。

一切都没有问题之后，就可以 chroot 了，执行`arch-chroot /mnt`进入刚刚安装的系统。

## 初梦

### 设置系统时区、语言以及字符编码

::: details 参考资料

1. [Arch Linux 基础安装 / 11.时区设置](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_11%e6%97%b6%e5%8c%ba%e8%ae%be%e7%bd%ae)
2. [archlinux 基础安装 / 12. 设置主机名与时区](https://arch.icekylin.online/guide/rookie/basic-install#_12-%E8%AE%BE%E7%BD%AE%E4%B8%BB%E6%9C%BA%E5%90%8D%E4%B8%8E%E6%97%B6%E5%8C%BA)
3. [Arch Linux 基础安装 / 12.设置 Locale 进行本地化](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_12%e8%ae%be%e7%bd%ae-locale-%e8%bf%9b%e8%a1%8c%e6%9c%ac%e5%9c%b0%e5%8c%96)
4. [archlinux 基础安装 / 14. 设置 Locale](https://arch.icekylin.online/guide/rookie/basic-install#_14-%E8%AE%BE%E7%BD%AE-locale)
5. [archlinux 基础安装 / 13. 硬件时间设置](https://arch.icekylin.online/guide/rookie/basic-install#_13-%E7%A1%AC%E4%BB%B6%E6%97%B6%E9%97%B4%E8%AE%BE%E7%BD%AE)

:::

设置系统时区，并更新硬件时间：

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

选择系统语言及编码：执行`vim /etc/locale.gen`，寻找文件中`en_US.UTF-8`和`zh_CN.UTF-8`，取消其注释后保存，执行`locale-gen`生成 Locale, 最后执行`echo 'LANG=en_US.UTF-8' > /etc/locale.conf`完成系统语言及编码的选择。

### 设置 Hostname 与其解析

::: details 参考资料

1. [archlinux 基础安装 / 12. 设置主机名与时区](https://arch.icekylin.online/guide/rookie/basic-install#_12-%E8%AE%BE%E7%BD%AE%E4%B8%BB%E6%9C%BA%E5%90%8D%E4%B8%8E%E6%97%B6%E5%8C%BA)
2. [Arch Linux 基础安装 / 13.设置主机名](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_13%e8%ae%be%e7%bd%ae%e4%b8%bb%e6%9c%ba%e5%90%8d)
3. [0.0.0.0 和 127.0.0.1、127.0.1.1、localhost](https://blog.csdn.net/wys578/article/details/80984467)

:::

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

::: details 参考资料

1. [Arch Linux 基础安装 / 15.安装微码](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_15%e5%ae%89%e8%a3%85%e5%be%ae%e7%a0%81)
2. [archlinux 基础安装 / 16. 安装微码](https://arch.icekylin.online/guide/rookie/basic-install#_16-%E5%AE%89%E8%A3%85%E5%BE%AE%E7%A0%81)
3. [微码 - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/%E5%BE%AE%E7%A0%81)
4. [Microcode - ArchWiki](https://wiki.archlinux.org/title/Microcode)
5. [微程序 - 维基百科](https://zh.wikipedia.org/wiki/%E5%BE%AE%E7%A8%8B%E5%BA%8F)
6. [Arch Linux 基础安装 / 16.安装引导程序](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=_16%e5%ae%89%e8%a3%85%e5%bc%95%e5%af%bc%e7%a8%8b%e5%ba%8f)
7. [archlinux 基础安装 / 17. 安装引导程序](https://arch.icekylin.online/guide/rookie/basic-install#_17-%E5%AE%89%E8%A3%85%E5%BC%95%E5%AF%BC%E7%A8%8B%E5%BA%8F)

:::

之后安装微码：

```shell
pacman -S intel-ucode # For Intel
pacman -S amd-ucode # For AMD
```

::: info 为什么要安装微码？
**微指令**（英语：microcode），又称**微码**，是在 CISC 结构下，执行一些功能复杂的指令时，所分解一系列相对简单的指令。
处理器制造商会发布对处理器微码的稳定性和安全性更新。**这些更新提供了对系统稳定性至关重要的错误修复。如果没有这些更新，则可能会遇到不明原因的崩溃或难以跟踪的意外停机。**
使用 AMD 或 Intel CPU 的用户都应该安装微码更新以确保系统稳定性。在虚拟机或容器中，微码更新应在主机上实施，而不是在客户机系统中。
::: right
——摘自 Arch Linux 中文维基
:::

最后要安装引导程序：

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ARCH # --removable 如果要装入移动硬盘内，一般要加上这个参数
```

> 有关 removable 参数有资料这样解释：
> 某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件
> 因此使用`--removable`参数解决一些主板 NVRAM 的兼容性问题。

紧接着`vim /etc/default/grub`，去掉`GRUB_CMDLINE_LINUX_DEFAULT`一行中最后的`quiet`参数，并将`log level`的值改到`5`。

【可选】可以考虑再给`GRUB_CMDLINE_LINUX_DEFAULT`加上`nowatchdog`参数，但这有可能会引发未知问题，如果watchdog没有导致极严重的问题一般不建议添加，仅当非常清楚可能导致的后果后再做决定。

接着执行`grub-mkconfig -o /boot/grub/grub.cfg`来生成grub配置后，至此系统安装就算正式完成了，执行以下命令即可进入新系统【记得拔掉系统镜像盘，修改启动项】：

```shell
exit                # 退回系统镜像
umount -R /mnt     # 递归卸载新系统分区
reboot              # 重启
```

## 浅梦

### 开启网络服务

启动新系统之后，记得开启网络服务：

```shell
systemctl enable iwd
systemctl start iwd
```

之后可以执行`iwctl`管理无线网络，方法已在[**前面**](#有线或无线联网)给出。

### 添加 Archlinuxcn 软件镜像源

::: info 参考资料 [Arch Linux 启用 archlinuxcn 源](https://www.expoli.tech/articles%2F2020%2F02%2F12%2F1581513647899)
:::

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

::: info 参考资料 [Arch Linux 安装 Xorg](https://razonyang.com/zh-hans/archlinux-guide/xorg/)
:::

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

### 安装 i3 桌面管理器及其常用的基础系统软件

::: info 参考资料 [ArchLinux下i3wm安装和简单配置美化](https://mindview.top/pages/be527f/)、[Arch Linux install i3-wm](https://www.cnblogs.com/shadow-/p/17572589.html)
:::

个人偏好使用`Tiling Window Manager`，先前尝试使用过`Awesome Window Manager`，因此这次想尝试一些不一样的，于是选择了`i3 Window Manager`，安装：

```shell
sudo pacman -S i3-wm
```

为了开机能以图形界面登陆，安装了 Sddm 程序：

```shell
sudo pacman -S sddm
sudo systemctl enable sddm
```

#### 个人偏好

```shell
sudo pacman -S picom # 窗口透明化
sudo pacman -S rofi # 快速启动工具
sudo pacman -S feh # 壁纸设置工具，支持指定目录下随机，同时也是轻量的图片查看器
sudo pacman -S alacritty # 个人偏好的终端模拟器
sudo pacman -S zsh # 个人偏好的终端
sudo pacman -S polybar # 系统状态栏，可自定制
sudo pacman -S tree # 文件树展开，项目结构可一目了然
sudo pacman -S autorandr # 屏幕扩展的自动管理工具
sudo pacman -S rofimoji # rofi界面的Emoji表情输入
sudo pacman -S less # 功能强大的查看文件内容的工具
sudo pacman -S timeshift # 快照备份工具，BTRFS文件系统备份常用
sudo pacman -S qbittorrent # BT下载器
sudo pacman -S ark # 开源压缩软件
sudo pacman -S flameshot # 截屏工具，对多屏幕支持友好
sudo pacman -S vlc # 开源视频播放器
sudo pacman -S thunar # 资源管理器
sudo pacman -S ranger # 终端资源管理器

sudo pacman -S xsel # 操作剪贴板的终端工具
sudo pacman -S xdotool # 可以模拟鼠标和按键操作的工具

sudo pacman -S telegram-desktop # Telegram聊天工具软件
yay -S i3lock-color # i3常用的屏幕锁定工具
yay -S wechat-appimage # 微信官方客户端
```

#### 系统字体

对个人来说安装 Noto fonts 已经够用了：

```shell
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra
```

::: info Noto fonts 各字体包内容说明

- `noto-fonts`: 基础包，覆盖拉丁字母、希腊字母、西里尔字母、阿拉伯语、希伯来语等绝大多数非 CJK 字符。

- `noto-fonts-cjk`: 专门覆盖**简体中文**、**繁体中文**、**日文**、**韩文**（CJK 统一表意文字），包含 Noto Sans CJK 和 Noto Serif CJK。

- `noto-fonts-emoji`: 支持彩色 Emoji 符号（如 😊⭐🌍）。

- `noto-fonts-extra`: 提供补充字体（如粗体、斜体变体及部分小众语言支持）。

:::

### 安装 yay

::: info 参考资料

- [在 Arch Linux 上安装和使用 Yay | Linux 中国](https://zhuanlan.zhihu.com/p/661351588)
- [PKGBUILD Source Code](https://github.com/Jguer/yay-PKGBUILD/blob/master/yay/PKGBUILD)
- [GitHub yay Makefile Source Code](https://github.com/Jguer/yay/blob/next/Makefile)

:::

依次执行以下命令来安装`yay`：

::: important 请确保 base-devel 和 git 有正确安装，因为以下命令将会用到`git`和`makepkg`等工具。
:::

```shell
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

::: tip

如果无法通过`https://aur.archlinux.org/yay.git`来获取`yay`，可考虑拉取 GitHub 源码后进行编译安装：

```shell
git clone https://github.com/Jguer/yay
cd yay
make install
# make uninstall # 如果需要卸载，可执行该命令进行卸载。
```

如果仍然无法正常访问`https://github.com/Jguer/yay`，可使用 GitHub 镜像站，如`https://githubfast.com/Jguer/yay`。

更多镜像站可参考[MirrorSite - GitHub](https://github.com/runningcheese/MirrorSite)。

:::

### 安装 Bluetooth

::: info 参考资料 [蓝牙#安装 - ArchWiki](https://wiki.archlinuxcn.org/wiki/%E8%93%9D%E7%89%99#%E5%AE%89%E8%A3%85) [内核模块#获取信息](https://wiki.archlinuxcn.org/wiki/%E5%86%85%E6%A0%B8%E6%A8%A1%E5%9D%97#%E8%8E%B7%E5%8F%96%E4%BF%A1%E6%81%AF) [蓝牙工具 bluetoothctl 用法简介](https://blog.csdn.net/weixin_42396877/article/details/86772153) [[BlueZ] 2、使用bluetoothctl搜索、连接、配对、读写、使能notify蓝牙低功耗设备](https://www.cnblogs.com/zjutlitao/p/9589661.html)
:::

执行`sudo pacman -S bluez bluez-utils`来安装蓝牙协议栈以及相关的工具，然后执行以下命令来启动蓝牙服务：

```shell
sudo systemctl enable bluetooth.service
sudo systemctl start bluetooth.service
```

::: important 请确保通用蓝牙驱动有正常加载，执行`lsmod | grep btusb`或者`modinfo btusb`，正常情况是有输出内容。
:::

此时蓝牙已经可以正常使用了，可通过`bluetoothctl`来管理蓝牙设备配对和连接。

```shell
bluetoothctl
# 进入控制界面
devices # 查看可连接的设备
scan on # 扫描等待连接的设备
pair <MAC_ADDRESS> # 通过 MAC 地址与设备进行配对
connect <MAC_ADDRESS> # 通过 MAC 地址与设备进行连接
disconnect <MAC_ADDRESS> # 取消连接设备
scan off # 停止扫描
```

::: tip 如果希望使用图形化界面来管理蓝牙连接，可以执行`sudo pacman -S blueman`来安装图形管理工具。
:::

### 屏幕亮度调节

执行`sudo pacman -S acpilight`，安装之后我们还需要将当前用户组加入`video`组内，执行`sudo gpasswd video -a <YOUR_USER_NAME>`即可，如要确认该用户是否在组内，可以执行`groups <YOUR_USER_NAME>`，在 i3 中就需要写入`bindsym XF86MonBrightnessUp exec xbacklight -inc 10`和`bindsym XF86MonBrightnessDown exec xbacklight -dec 10`

::: tip 类似的多媒体按键名称

- `XF86AudioRaiseVolume`
- `XF86AudioLowerVolume`
- `XF86AudioMute`
- `XF86AudioPlay`
- `XF86AudioNext`
- `XF86AudioPrev`
- `XF86AudioStop`

:::

### 系统音频控制

::: info 参考资料

- [[SOLVED] pactl: pa_context_connect() failed: Connection refused](https://bbs.archlinux.org/viewtopic.php?id=296995)
- [PipeWire - ArchWiki](https://wiki.archlinux.org/title/PipeWire)
- [ALSA#键盘控制音量 - ArchWiki](https://wiki.archlinuxcn.org/wiki/ALSA#%E9%94%AE%E7%9B%98%E6%8E%A7%E5%88%B6%E9%9F%B3%E9%87%8F)
- [[SOLVED] Using ALSA for i3status bar volume indicator not working](https://bbs.archlinux.org/viewtopic.php?id=257103)
- [i3status manpage](https://i3wm.org/i3status/manpage.html#_volume)
- [speaker-test - Arch manual pages](https://man.archlinux.org/man/extra/alsa-utils/speaker-test.1.en)

:::

Linux 如今内核已经内置`alsa`了，一般不需要额外安装软件，但如果希望使用`alsa-utils`来控制音频，可以执行`sudo pacman -S alsa-utils`，然后通过`amixer`或`alsamixer`来控制即可。但由于 i3 桌面管理器一般自带`pipewire`（可执行`pacman -Qs pipewire`来确认是否已安装），所以打算继续沿用`pipewire`。

::: tip

安装好`alsa-utils`后可在 i3 配置文件中去掉`XF86AudioRaiseVolume`、`XF86AudioLowerVolume`、`XF86AudioMute`的相关事件，并添加以下内容来控制音量：

```yaml
bindsym XF86AudioRaiseVolume exec amixer set Master 5%+
bindsym XF86AudioLowerVolume exec amixer set Master 5%-
bindsym XF86AudioMute exec amixer set Master toggle
```

---

如果希望使用`pulseaudio`来替代`pipewire`，则需要装以下这些软件：

```shell
sudo pacman -S pulseaudio-utils pulseaudio pavucontrol playerctl # Alsa系的音频控制工具，含pavucontrol图形控制界面工具
```

:::

使用`pipewire`需要额外安装以下软件：

```shell
sudo pacman -S pipewire-alsa pipewire-pulse
```

由于 i3 配置中包含了以下内容：

```yaml
# Use pactl to adjust volume in PulseAudio.
set $refresh_i3status killall -SIGUSR1 i3status
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +10% && $refresh_i3status
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -10% && $refresh_i3status
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle && $refresh_i3status
bindsym XF86AudioMicMute exec --no-startup-id pactl set-source-mute @DEFAULT_SOURCE@ toggle && $refresh_i3status
```

要想这些配置生效，需要依次执行以下命令来启用：

```shell
systemctl --user enable pipewire pipewire-pulse
systemctl --user start pipewire pipewire-pulse
```

::: important

`--user`参数不可省略，因为`systemctl`默认通过 System Manager 到系统空间下寻找`service`和`socket`，而对于`pipewire`它应当通过 User Service Manager 在用户空间下寻找`service`和`socket`。

:::

::: tip Optional for i3bar(with i3status) user

如果希望在 i3bar 状态栏上显示音量控制，在`~/.config/i3status/config`文件中按以下内容编辑：

在`order +=`块中添加一行：`order += "volume master"`并在文件最后部分添加以下代码块：

```config
volume master {
        format = "Vol: %volume"
        format_muted = "Vol: MUTED (%volume)"
        device = "default"
}
```

然后重启 i3 即可。

:::

最后如果想测试声音，可以执行`speaker-test -c 2`来测试。

### Authentication Agent 配置

::: info 参考资料 [Polkit - ArchWiki](https://wiki.archlinux.org/title/Polkit)
:::

在linux使用过程中，难免会遇到一些软件，不能直接用`sudo`运行，但需要root权限，比如`via-bin`、`gparted`，然后我在具体运行中遇到的错误信息如下：

```shell
UnhandledPromiseRejectionWarning: Error: No polkit authentication agent found.
```

于是我就明白这里是缺少了一个专用的助手来安全地授予我们权限，于是我花了一些时间查找，最后从[Polkit - ArchWiki](https://wiki.archlinux.org/title/Polkit)里的 1.1 节 Authentication agents 中选了比较合适的[lxqt-policykit](https://github.com/lxqt/lxqt-policykit)，这个可以直接用pacman安装。安装好之后我们只需要让它随系统启动即可，在 i3 config 中写入`exec --no-startup-id lxqt-policykit`，重启 i3 即可。

## 梦魇

### Efibootmgr 使用

::: details 参考资料: Efibootmgr help doc

```shell
(base) ➜  ~ efibootmgr -h
efibootmgr version 18
usage: efibootmgr [options]
  -a | --active         Set bootnum active.
  -A | --inactive       Set bootnum inactive.
  -b | --bootnum XXXX   Modify BootXXXX (hex).
  -B | --delete-bootnum Delete bootnum.
  -c | --create         Create new variable bootnum and add to bootorder at index (-I).
  -C | --create-only    Create new variable bootnum and do not add to bootorder.
  -d | --disk disk      Disk containing boot loader (defaults to /dev/sda).
  -D | --remove-dups    Remove duplicate values from BootOrder.
  -e | --edd [1|3]      Force boot entries to be created using EDD 1.0 or 3.0 info.
  -E | --device num     EDD 1.0 device number (defaults to 0x80).
        --full-dev-path  Use a full device path.
        --file-dev-path  Use an abbreviated File() device path.
  -f | --reconnect      Re-connect devices after driver is loaded.
  -F | --no-reconnect   Do not re-connect devices after driver is loaded.
  -g | --gpt            Force disk with invalid PMBR to be treated as GPT.
  -i | --iface name     Create a netboot entry for the named interface.
  -I | --index number   When creating an entry, insert it in bootorder at specified position (default: 0).
  -l | --loader name     (Defaults to "\EFI\arch\grub.efi").
  -L | --label label     Boot manager display label (defaults to "Linux").
  -m | --mirror-below-4G t|f Mirror memory below 4GB.
  -M | --mirror-above-4G X Percentage memory to mirror above 4GB.
  -n | --bootnext XXXX   Set BootNext to XXXX (hex).
  -N | --delete-bootnext Delete BootNext.
  -o | --bootorder XXXX,YYYY,ZZZZ,...     Explicitly set BootOrder (hex).
  -O | --delete-bootorder Delete BootOrder.
  -p | --part part        Partition containing loader (defaults to 1 on partitioned devices).
  -q | --quiet            Be quiet.
  -r | --driver           Operate on Driver variables, not Boot Variables.
  -t | --timeout seconds  Set boot manager timeout waiting for user input.
  -T | --delete-timeout   Delete Timeout.
  -u | --unicode | --UCS-2  Handle extra args as UCS-2 (default is ASCII).
  -v | --verbose          Print additional information.
  -V | --version          Return version and exit.
  -w | --write-signature  Write unique sig to MBR if needed.
  -y | --sysprep          Operate on SysPrep variables, not Boot Variables.
  -@ | --append-binary-args file  Append extra args from file (use "-" for stdin).
  -h | --help             Show help/usage.
```

:::

由于 Windows 的安装或修复机制，它总会自动修改 EFI 启动项，甚至会直接删除其它系统的启动项。对于这种情况，Linux 一般需要自行使用 LiveCD 或其它方式来添加/修复启动项。但对于启动顺序，比较稳妥的做法是使用 Efibootmgr 来调整。

::: tip

如果希望使用同一个界面来决定启动 Windows 或 Linux 等多个操作系统，首先需要启用 `os-prober`。编辑`/etc/default/grub`文件，找到如下内容并取消注释`GRUB_DISABLE_OS_PROBER=false`：

```conf
# Probing for other operating systems is disabled for security reasons. Read
# documentation on GRUB_DISABLE_OS_PROBER, if still want to enable this
# functionality install os-prober and uncomment to detect and include other
# operating systems.
GRUB_DISABLE_OS_PROBER=false
```

这样在生成启动项时会自动检测是否存在其它操作系统的启动项，并将这些启动项加入到启动项界面。

:::

可以通过执行`efibootmgr -v`来查看当前 EFI 启动信息，将会得到类似如下的输出：

```shell
(base) ➜  ~ efibootmgr -v
BootCurrent: 0002
Timeout: 0 seconds
BootOrder: 0002,2001,0001,2002,2003
Boot0001* Windows Boot Manager  HD(1,GPT,59685006-d751-438d-845a-8594ddf09c5c,0x800,0xf4000)/\EFI\Microsoft\Boot\bootmgfw.efi57494e444f5753000100000088000000780000004200430044004f0042004a004500430054003d007b00390064006500610038003600320063002d0035006300640064002d0034006500370030002d0061006300630031002d006600330032006200330034003400640034003700390035007d00000061000100000010000000040000007fff0400
      dp: 04 01 2a 00 01 00 00 00 00 08 00 00 00 00 00 00 00 40 0f 00 00 00 00 00 06 50 68 59 51 d7 8d 43 84 5a 85 94 dd f0 9c 5c 02 02 / 04 04 46 00 5c 00 45 00 46 00 49 00 5c 00 4d 00 69 00 63 00 72 00 6f 00 73 00 6f 00 66 00 74 00 5c 00 42 00 6f 00 6f 00 74 00 5c 00 62 00 6f 00 6f 00 74 00 6d 00 67 00 66 00 77 00 2e 00 65 00 66 00 69 00 00 00 / 7f ff 04 00
    data: 57 49 4e 44 4f 57 53 00 01 00 00 00 88 00 00 00 78 00 00 00 42 00 43 00 44 00 4f 00 42 00 4a 00 45 00 43 00 54 00 3d 00 7b 00 39 00 64 00 65 00 61 00 38 00 36 00 32 00 63 00 2d 00 35 00 63 00 64 00 64 00 2d 00 34 00 65 00 37 00 30 00 2d 00 61 00 63 00 63 00 31 00 2d 00 66 00 33 00 32 00 62 00 33 00 34 00 34 00 64 00 34 00 37 00 39 00 35 00 7d 00 00 00 61 00 01 00 00 00 10 00 00 00 04 00 00 00 7f ff 04 00
Boot0002* ARCH  HD(1,GPT,59685006-d751-438d-845a-8594ddf09c5c,0x800,0xf4000)/\EFI\ARCH\grubx64.efi
      dp: 04 01 2a 00 01 00 00 00 00 08 00 00 00 00 00 00 00 40 0f 00 00 00 00 00 06 50 68 59 51 d7 8d 43 84 5a 85 94 dd f0 9c 5c 02 02 / 04 04 30 00 5c 00 45 00 46 00 49 00 5c 00 41 00 52 00 43 00 48 00 5c 00 67 00 72 00 75 00 62 00 78 00 36 00 34 00 2e 00 65 00 66 00 69 00 00 00 / 7f ff 04 00
Boot2001* EFI USB Device  RC
      dp: 7f ff 04 00
    data: 52 43
Boot2002* EFI DVD/CDROM RC
      dp: 7f ff 04 00
    data: 52 43
Boot2003* EFI Network RC
      dp: 7f ff 04 00
    data: 52 43
```

从中可以注意到每个启动项都是以`Boot<ID> <Device Name>`为开头的，找到其中的 Windows Boot Manager 和 Linux Grub 启动项即可。

::: tip Linux Grub 启动项的名称取决于当初创建 Grub启动项时传递参数`--bootloader-id`的值。
:::

可以通过使用`efibootmgr -o <Ordered Boot List>`（需要 Root 权限）来控制 EFI 启动顺序，其中`<Ordered Boot List>`是各 ID 之间用`,`隔开，如`efibootmgr -o 2001,0001,0002`。

::: important 如果`<Ordered Boot List>`没有包括全部的 ID，实际启动时将只会看到`<Ordered Boot List>`内的所有启动项。
:::

最后记得执行`grub-mkconfig -o /boot/grub/grub.cfg`（需要 Root 权限）重新生成 Grub 配置，然后重启即可。

### 设置 Swap 文件或分区

设置交换文件/分区的做法如下，设置交换文件的话应当使用`dd`工具创建特殊文件，设置好权限之后将其格式化

```shell
dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress #创建4G的交换空间 大小根据需要自定
chmod 600 /swapfile #设置正确的权限
mkswap /swapfile #格式化swap文件
swapon /swapfile #启用swap文件
sudo echo '/swapfile none swap defaults 0 0' >> /etc/fstab
```

类似的，也可以自行裁出一块分区后，依次使用`mkswap`和`swapon`制作 Swap 分区，并在`/etc/fstab`最后添加`UUID=<YOUR_DISK_UUID>   /swap   swap    swap,defaults   0 0`，不过这种做法一般在前面[系统分区](#硬盘分区)的章节里就可以做了。

### Magic SysRq Keybinding

::: info On building...
:::

### Linux 与 Windows 时间同步

::: info 参考资料

- [Linux Windows 双系统时间不一致](https://sspai.com/post/55983)
- [UTC、RTC、UNIX时间戳、localtime 理解](https://blog.csdn.net/qq_37698947/article/details/115772329)
- [使用注册表文件（REG）添加、修改或删除Windows注册表项和值](https://www.cnblogs.com/fczjuever/archive/2013/04/09/3010711.html)
:::

Linux 和 Windows 的时间总会存在“时差”，一般这种问题有两个解决办法：

- 其一，直接修改 Linux 系统

  ```shell
  sudo timedatectl set-local-rtc true --adjust-system-clock
  ```

- 其二，修改 Windows 系统

  可以打开 PowerShell 运行以下的命令：

  ```powershell
  Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
  ```

  也可以自己新建一个文本文件，并修改后缀为`.reg`，在该文件中写入如下内容：

  ```reg
  Windows Registry Editor Version 5.00

  [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
  "RealTimeIsUniversal" = dword:00000001
  ```

  然后运行该脚本，即可解决时间不同步的问题。

  ::: tip 如果想移除该键，可以将`"RealTimeIsUniversal" = dword:00000001`改成`"RealTimeIsUniversal"=-`。
  :::

::: info 原因分析

Windows 和 Linux 两个系统看待硬件时钟的方式不同：Windows 会将硬件时钟（RTC）看作本地时间；Linux 则会将 RTC 看作 UTC 时间，故 Windows 时钟 = UTC + Time Zone，即两系统之间的时差刚好就是时区。在中国（UTC+8），Linux 总是比 Windows 快 8 小时。

:::

### 关于Linux系统下键盘的F1～F12键无法响应的问题

::: info 参考资料 [Keychron Linux Function Keys](https://mikeshade.com/posts/keychron-linux-function-keys/)
:::

先说一下解决方案：

```shell
echo 0 | sudo tee s/module/hid_apple/parameters/fnmode
```

这个方案是临时解决方案，如果想永久生效的话，需要执行：

```shell
echo "options hid_apple fnmode=0" | sudo tee -a /etc/modprobe.d/hid_apple.conf
```

最后重启`reboot`或者执行

```shell
sudo update-initramfs -u # For Ubuntu
mkinitcpio -P # For Arch Linux
```

这样每次重新启动计算机也能正常使用F1～F12了。

::: info 为什么能解决？

首先要知道Linux系统下一切皆是文件，设备也不是例外。而我们这个操作实际上在做的就是调整设备参数。`fnmode`文件内存放的内容是一位二进制码，`0`表示默认不按下`Fn`，而`1`自然表示默认按下`Fn`了。这样问题自然很容易复现了：我们在尝试按下`F1`～`F12`的时候，`Fn`键已经处于激活状态，这样自然是输入了其对应的多媒体功能键，那么就算我再按下`Fn`也无济于事了，因此这个文件我们需要置零。

:::

::: details **扩展知识** Linux伪文件

> 参考资料 [linux伪文件与proc文件](https://www.cnblogs.com/rusking/p/3766633.html)、[Linux学习-伪文件（设备文件，命名管道，proc文件）](https://blog.csdn.net/qq_31730735/article/details/80527449)

Linux/Unix系统的文件类型大致可分为三类：普通文件、目录文件和伪文件。

伪文件不用来存储数据，本身不占用任何空间。它是文件系统的一部分，并按目录进行组织。伪文件设置的目的在于提供一种服务，采取与常规文件相同的访问方式进行访问，而且在多数情况下，伪文件用来访问内核（操作系统的核心部分）提供的服务。

常见的伪文件分别有设备文件、命名管道及proc文件。

- **设备文件**：又称特殊文件，是物理设备的内部表示，包括计算机和网络中的每个设备都可以当作特殊文件来访问，如键盘、显示器、打印机、磁盘驱动器等等，它们都存放在/dev目录中。
- **命名管道**：管道功能的一个扩展，将一个进程的输出连接到另一个进程的输入。
- **proc文件**：提供一种简单的途径来检查多种类型的系统文件的伪文件，它直接从内核获取信息，而不是使用复杂的程序搜出数据。这些文件都存放在/proc目录中。

这里只是做一个简单介绍，想了解详情还是点开[这里](https://blog.csdn.net/qq_31730735/article/details/80527449)比较好，这位作者写的是相当详细的。

:::

### 安装 Oh-my-zsh 并切换默认终端并安装插件

前面安装好 Zsh 之后，就可以安装 Oh-my-zsh 了，并且加入其中的一些插件：

::: info On building...
:::

### i3 WM 配置

::: info On building...
:::

### 安装 Terminal Simulator

#### Alacritty

::: info On building...
:::

#### URxvt

##### 给URxvt添加多标签功能

修改 `~/.Xresources`文件，搜索其中的 `URxvt.perl-ext-common`字样，在后面添加 `,tabbed`后执行 `xrdb -merge ~/.Xresources`即可。

##### 让URxvt支持组合键

如果你喜欢使用`Ctrl`+`Arrow`类的组合键，但是你发现它在URxvt这里并不生效，其实是需要修改 `~/.Xresources`配置文件的：

在该文件下任意一个比较合适的地方添加如下的配置：

```ini
! enable some control keymap.
URxvt.keysym.Control-Up:     \033[1;5A
URxvt.keysym.Control-Down:   \033[1;5B
URxvt.keysym.Control-Left:   \033[1;5D
URxvt.keysym.Control-Right:  \033[1;5C
```

##### 更改URxvt字体

安装好字体后，需要编辑 `～/.Xresources`文件，找到其中的段落：

```text
! fonts
URxvt.letterSpace:          -1
URxvt.font:                 xft:Monospace:regular:size=11
URxvt.imFont:               xft:Monospace:regular:size=11
URxvt.italicFont:           xft:Monospace:italic:size=11
URxvt.boldFont:             xft:Monospace:bold:size=11
URxvt.boldItalicFont:       xft:Monospace:regular:size=11
! run :.!fc-list | grep <font-name>
```

改成如下即可：

```text
! fonts
URxvt.letterSpace:          -1
URxvt.font:                 xft:MesloLGS NF-20
URxvt.imFont:               xft:MesloLGS NF-20
URxvt.italicFont:           xft:MesloLGS NF-20
URxvt.boldFont:             xft:MesloLGS NF-20
URxvt.boldItalicFont:       xft:MesloLGS NF-20
! run :.!fc-list | grep <font-name>
```

保存退出后还需要执行 `xrdb -m ~/.Xresources`

重启一下终端，你就可以看到字体已被启用了。

然后执行 `xrdb -merge ~/.Xresources`，重启一下，即可生效。

### 安装 Fcitx5 Rime 中文输入法

::: info On building...
:::

::: info 参考资料 [Archlinux 下 fcitx5-rime 的使用](https://blog.ccjp.top/index.php/archives/3/)、[fkxxyz/rime-cloverpinyin - GitHub](https://github.com/fkxxyz/rime-cloverpinyin)、[四叶草拼音输入方案 / 从本仓库源码构建](https://github.com/fkxxyz/rime-cloverpinyin?tab=readme-ov-file#%E4%BB%8E%E6%9C%AC%E4%BB%93%E5%BA%93%E6%BA%90%E7%A0%81%E6%9E%84%E5%BB%BA)
:::

中文输入法折腾起来挺麻烦，当初我也是翻了好些个资料，现在我直接整合到一起了，首先应当安装以下这些软件

```shell
sudo pacman -S fcitx5-configtool fcitx5 fcitx5-gtk fcitx5-qt fcitx5-rime librime librime-prelude # 输入法及其可扩展的工具依赖
yay -S rime-cloverpinyin
sudo pacman -S python-jieba pypinyin opencc python-requests
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

### 安装 LaTeX & LaTeX Workshop in VS Code

要想在本地使用 LaTeX，安装这些后在 VS Code 上安装插件 LaTeX Workshop，

```shell
sudo pacman -S texlive-core texlive-langchinese texlive-latexextra texlive-fontsextra texlive-science texlive-xetex
```

打开其配置文件(`Ctrl`+`Shift`+`P`后输入`settings.json`, 打开 User Settings), 在`{}`内加入如下内容：

::: details User Settings.json 文件内容

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

:::

### 使用 Daed 科学上网

::: info 参考资料 [archlinux 透明代理 / dae](https://arch.icekylin.online/guide/rookie/transparent#dae)
:::

科学上网，就用 Daed 保驾护航，首先需要安装并运行：

```shell
sudo pacman -S daed
sudo systemctl enable daed
sudo systemctl start daed
```

之后就可以通过访问[localhost:2023](localhost:2023)来配置代理。**注意，订阅链接需要从机场的订阅链接获取。**

::: info On building...
DNS, Router configure
:::

### Linux 屏幕扩展

使用`xrandr`就要记很多参数，而且一般要花很长时间才能调整好参数，往往调整好后又几乎不需要做修改，因此每次都查询`xrandr`文档来调整屏幕扩张是麻烦且不必要的，因此使用`arandr`和`autorandr`可更方便快捷地配置屏幕扩展方案。

::: tip

`autorandr`可以将当前屏幕方案保存下来，方便下次使用时直接调用。故可以在系统检测到接口插入时触发`autorandr`加载对应屏幕方案。

:::

### Linux & Windows 共用蓝牙设备

::: caution On building...
:::

::: info 参考资料 [双系统共用一个蓝牙鼠标 - 知乎](https://zhuanlan.zhihu.com/p/466962255) [在Windows与Linux双系统下共享蓝牙鼠标](https://zhul.in/2021/05/30/share-xiaomi-bluetooth-mouse-on-both-windows-and-linux/)
:::

::: warning 这种做法只能对
:::

### Linux 查找软件安装目录

::: info 参考资料

1. [Linux查看软件安装目录及位置4种方法（Linux）](https://www.linuxjiaocheng.com/2232.html)
2. [linux查看软件的安装位置简单方法](https://cloud.tencent.com/developer/article/1726016)
3. [pacman常用命令](https://hustlei.github.io/2018/11/msys2-pacman.html)

:::

Linux 一般安装的软件位置会在以下几个目录中，如有需要届时可以自行查找：

1. `/usr/share`
2. `/usr/local`
3. `/opt`

如果已知可执行程序，也可直接使用`whereis`, `which`等查看位置

### Ark打开Zip压缩包出现中文乱码的解决方案

执行如下指令即可：

```shell
yay -S p7zip-natspec
# 中间会提示你是否要删除P7zip，选择是。
```

然后打开Ark，点击菜单栏中的设置，单击配置Ark，然后取消勾选Libzip，并且要选中P7zip，保存设置并重启Ark即可。

### 修改默认应用程序

::: info 参考资料 [ArchLinux如何设值文件的默认打开程序](https://blog.csdn.net/iteye_6393/article/details/82231282)
:::

随着使用时间增长，有些文件可以由许多应用打开，这难免会发生冲突，尤其在习惯以某个应用打开之后在近期装了新软件把默认配置覆盖掉的时候，就会直接高血压。但还好有办法解决这个问题。

首先要知道系统依靠什么来设定文件到应用的映射：通过`/usr/share/applications`下的`desktop`文件来设定关联。可以通过`ls /usr/share/applications`来查看当前可以设定的关联。

因此修改的流程应该是：

1. 先通过`ls /usr/share/applications`找到要找的关联desktop文件
2. 执行命令`xdg-mime query filetype <你要查看文件的文件名>`，比如当前目录有`file.md`，我就可以执行`xdg-mime query filetype file.md`，这样就可以查询这个文件类型当前设置的默认应用程序是什么
3. （可以不做）也可以执行命令`xdg-mime query default application/<文件后缀>`来查看这个文件类型当前设置的默认应用程序。
4. 执行命令`xdg-mime default <第一步你选择的结果> application/<文件后缀>`来设定应用与文件类型的关联。

修改是立即生效的，因此不用重启计算机。

### Virtual Machine Manager 安装与使用方法

首先要确保你的系统是支持虚拟化的，执行下列命令来查看：

```shell
LC_ALL=C lscpu | grep Virtualization
```

如果是使用Intel CPU的话，会看到 `VT-x`，如果是使用AMD的话会看到 `AMD-V`。

接下来我们要安装相关组件：

```shell
sudo pacman -S qemu libvirt ovmf virt-manager virt-viewer dnsmasq vde2 bridge-utils openbsd-netcat ebtables iptables libguestfs
```

之前确实是搞错了，不是只安装virt-manager就可以的，它只是一个GUI管理器，真正做虚拟服务的是qemu，它只是替我们去调用了qemu的API罢。安装好这些后需要继续进行配置：

首先我们需要启动服务：

```shell
sudo systemctl enable libvirtd.service
sudo systemctl start libvirtd.service
```

然后将我们的用户账户添加到libvirt组内：

```shell
sudo usermod -aG libvirt $(whoami)
newgrp libvirt
```

然后我们重启一下服务：

```shell
sudo systemctl restart libvirtd.service
```

之后我们打开 `virt-manager`，新建连接。选择 `QEMU/KVM`后保持默认就可以开始新建虚拟机了！

### 桌面壁纸配置

i3 窗口管理器下可以直接使用`feh`来设置壁纸。

```shell
feh --bg-fill --no-fehbg --randomize "Path/to/your/Wallpaper/Folder"
```

对于 Awesome 窗口管理器，我推荐使用 Nitrogen。

```shell
nitrogen --head=<Your-Monitor-ID> --random --set-zoom-fill /path/to/your/wallpaper/directory > /dev/null 2>&1
```

### 将平板作为扩展屏幕使用

家里的显示器数量有限，但又不能因此就再买一个显示器。又考虑到我手中还有一个平板，那么我就有办法让平板作为我的第三个屏幕。

基本原理其实就是在电脑上自己手动添加一个视频信号输出，然后由服务端软件开放端口投出，最后由平板连接这个开放端口，达到显示第三屏幕的效果。

::: warning 注意

这种操作并非不受限制：

1. 你首先要知道你的计算机最多能扩展多少个屏幕，在这里我的电脑能支持同时输出3个显示器设备。
2. 你还要知道你的每一个显卡的输出信号能力，即它最大的分辨率输出能力，比如我的显卡性能并不是特别强，最大只能输出1080P「1920✕1080」，那么如果我尝试让它输出2560✕1600的分辨率，这个肯定会失败的。
3. 服务端软件一般系统并不自带，因此需要用户自行安装，可以执行 `sudo pacman -S x11vnc`来直接安装。

:::

了解了这些限制后我们就可以开始了：

1. 首先我们应该确定要输出的分辨率，并获取相关参数，执行

   ```shell
   cvt <X> <Y> <Z>
   ```

   ::: tip

   这里的 `<X>`、`<Y>`、`<Z>`分别表示分辨率宽、高和屏幕刷新率参数。如 `cvt 1920 1080 60`表示分辨率为1920✕1080，屏幕刷新率为60Hz。

   你会得到类似这个的输出：

   ```shell
    ❯ cvt 1920 1080 60
    # 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
    Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
   ```

   :::

2. 获取到这些参数后我们还要复制好这些参数，并执行下面这个命令：

   ```shell
   xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
   ```

3. 新建好这个输出模式后再执行下面这个命令：

   ```shell
   xrandr --addmode <API> 1920x1080_60.00
   ```

   ::: tip

   这里的 `<API>`是指你输出的视频信号端口名称，如果觉得这里不清晰的话可以先执行 `xrandr`来看看，执行完上面指令的时候就可以看到你新添加的输出模式了。

   另外，如果是希望扩展屏幕，建议 `<API>`选取未连接状态的端口。不过如果只是希望复制屏幕的话，大可不必用这种方法。

   :::
4. 接下来你还要开启输出模式，做屏幕扩展，执行

   ```shell
   xrandr --output <API> --mode 1920x1080_60.00 --right-of <Other API>
   ```

   ::: tip

   当然也可以使用其它参数，详细可以执行 `xrandr --help`后关注 `--output`下的其它参数。

   :::
5. 最后你就需要使用 `x11vnc`来开放端口，将这个新添加的屏幕输出出去，执行

   ```shell
   x11vnc -clip 1920x1080+X+Y
   ```

   ::: tip

   这里的X表示扩展屏幕的起点横坐标，Y表示扩展屏幕的起点纵坐标。比如我现在在使用两个显示器，且分辨率都是1920✕1080，那么我在扩展第三个屏幕的时候就可以选择起点横坐标为3840，纵坐标为0。
   当然如果你希望它在后台运行，可以添加 `-bg`来后台启动。

   如果希望设置密码，添加 `-usepw`就可以了。使用这个参数时它会在 `~/.vnc/passwd`中或 `~/.vnc/passwdfile`第一行里找到密码，如果这些文件都不存在，则它会提示你输入密码，并保存在 `~/.vnc/passwd`中。

   如果想指定端口的话需要添加参数 `-rfbport PORT`，其中 `PORT`要换为你想使用的端口号。

   :::

现在你可以在平板上连接电脑开放的端口来查看了。

### 通过 Systemctl 设置开机自启动服务

::: info 参考资料 [Manjaro开机自启动脚本实现](https://github.com/MregXN/blogs/issues/2) [systemd](https://wiki.archlinux.org/title/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BF%AE%E6%94%B9%E7%8E%B0%E5%AD%98%E5%8D%95%E5%85%83%E6%96%87%E4%BB%B6) [systemd /User](https://wiki.archlinux.org/title/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/User_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%9A%8F%E7%B3%BB%E7%BB%9F%E8%87%AA%E5%8A%A8%E5%90%AF%E5%8A%A8_systemd_%E7%94%A8%E6%88%B7%E5%AE%9E%E4%BE%8B) [Systemd 入门教程：实战篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)

:::

> `systemd` [单元文件](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)的语法来源于 XDG 桌面项配置文件`.desktop`文件，最初的源头则是Microsoft Windows的`.ini`文件。单元文件可以从多个地方加载，`systemctl show --property=UnitPath` 可以按优先级从低到高显示加载目录：
>
> - `/usr/lib/systemd/system/` ：软件包安装的单元
>
> - `/etc/systemd/system/` ：系统管理员安装的单元
>
> ::: right
> ——ArchWiki
> :::
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
> ::: right
> ——MregXN
> :::

对于语法问题，完全可以先看看该目录下的其他systemd单元文件，参照它们来写。

首先要准备好你希望每次开机都要启动的脚本，我姑且假设这个脚本名字叫做`supsys.sh`

然后需要给这个脚本授予权限，执行`sudo chmod 0755 /path/supsys.sh`

接着创建service文件，执行`sudo vim /usr/lib/systemd/system/supsys.service`

输入如下样例：

```yaml
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

### 常用的 Linux 清理命令

```shell
sudo pacman -Scc # 清除掉pacman的无用安装包
yay -Scc # 清除掉yay的无用安装包
sudo pacman -R $(pacman -Qdtq) # 清除掉无用的依赖
sudo journalctl --vacuum-size=50M # 只保留50M大小的日志。
# 当然你也可以使用 sudo journalctl --vacuum-time=1w，这样就是只保留最近一周的日志。
sudo rm /var/lib/systemd/coredump/* # 清除掉崩溃日志内容
```

## 醒不过来了
