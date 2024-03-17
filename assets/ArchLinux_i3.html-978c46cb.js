import{_ as c,W as p,X as r,Y as n,Z as s,$ as a,a2 as o,a1 as t,C as l}from"./framework-68a75bb9.js";const d={},u=n("p",null,"::: 参考资料",-1),m={href:"https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/basic_install?id=arch-linux-%E5%9F%BA%E7%A1%80%E5%AE%89%E8%A3%85",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.expoli.tech/articles%2F2020%2F02%2F12%2F1581513647899",target:"_blank",rel:"noopener noreferrer"},b={href:"https://razonyang.com/zh-hans/archlinux-guide/xorg/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mindview.top/pages/be527f/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.cnblogs.com/shadow-/p/17572589.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://blog.ccjp.top/index.php/archives/3/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/fkxxyz/rime-cloverpinyin",target:"_blank",rel:"noopener noreferrer"},x={href:"https://blog.linioi.com/posts/clash-on-arch/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://wiki.archlinuxcn.org/wiki/Mkinitcpio",target:"_blank",rel:"noopener noreferrer"},y={href:"https://zhuanlan.zhihu.com/p/571764449",target:"_blank",rel:"noopener noreferrer"},S={href:"https://juejin.cn/post/7317832600810160191",target:"_blank",rel:"noopener noreferrer"},_={href:"https://little-star.love/posts/f2114751/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.linuxjiaocheng.com/2232.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://cloud.tencent.com/developer/article/1726016",target:"_blank",rel:"noopener noreferrer"},A={href:"https://hustlei.github.io/2018/11/msys2-pacman.html",target:"_blank",rel:"noopener noreferrer"},U={href:"https://www.cnblogs.com/devilmaycry812839668/p/17070158.html",target:"_blank",rel:"noopener noreferrer"},T={href:"https://blog.csdn.net/wys578/article/details/80984467",target:"_blank",rel:"noopener noreferrer"},C={href:"https://parrotsec-cn.org/t/linux-clash-dashboard/5169",target:"_blank",rel:"noopener noreferrer"},L=t(`<p>:::</p><h2 id="梦前要备床" tabindex="-1"><a class="header-anchor" href="#梦前要备床" aria-hidden="true">#</a> 梦前要备床</h2><p>在今年1月初，正逢固态价格较低的时候，我用￥578.98的价格买下了 SOLIDIGM P44 PRO 海力士固态硬盘，并另外购置了一个高端硬盘盒 DOCKCASE Type-C 3.2, 该硬盘盒附带屏幕，还具备断电保护，实际测试大约有5s的断电保护。</p><div class="hint-container warning"><p class="hint-container-title">注意事项</p><p>含断电保护的硬盘盒一般在断电保护时会发生如下事情：</p><ol><li>检测到断电，此时电容放电，然后为当前硬盘写入读写保护标志</li><li>在电容放电时间内更新FTL映射表</li><li>更新完成后在不到10%的电量下进行弹出硬盘操作（移除读写保护标志等）</li><li>电容放电完毕，停止一切操作</li></ol><p>读写保护标志写入后，该盘会既无法读取，也无法写入任何数据，这意味着，当你关闭计算机时，PC断电后会立即触发硬盘盒断电保护的机制，如果在它未释放完所有电时启动计算机，此时硬盘仍处于读写保护状态，因此当计算机启动结束时用户会发现该盘无法读取/系统不识别该盘等类似问题。</p></div><h2 id="入梦的开始" tabindex="-1"><a class="header-anchor" href="#入梦的开始" aria-hidden="true">#</a> 入梦的开始</h2><p>提前准备好 ArchLinux 的镜像之后，通过 Ventoy 把 TF 卡做成启动盘，将镜像放入之后, 用户可在此时考虑直接给盘划好分区，不管怎么说，图形化分区还是比命令行分区更友好方便。在保证 Secure Boot 【安全启动】处于关闭, 且启动方式为 UEFI 的情况下, 通过 BIOS 启动【Portable PC一般按F12即可自行选择启动项】镜像系统。</p><blockquote><p>一般安装镜像系统是无图形化界面的，会以终端的形式出现。</p></blockquote><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>【可选】执行<code>sudo systemctl stop reflector.service</code>来禁用 reflector ，以避免镜像源筛选不准确的可能性，该事件存在一定的概率会发生。</p><p>【可选】如已遗忘 BIOS 启动方式是否为 UEFI 时，可执行<code>ls /sys/firmware/efi/efivars</code>来查看，如若输出大量文字(EFI 变量)，说明当前已在 UEFI 模式。</p></div><h3 id="有线-无线联网" tabindex="-1"><a class="header-anchor" href="#有线-无线联网" aria-hidden="true">#</a> 有线/无线联网</h3><p>装机第一事，先连互联网。有线网络下插入网线即可【Portable PC可接入扩展坞后再接入网线】；无线网络下可使用 iwctl 接入，按照以下顺序依行键入命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iwctl                           <span class="token comment"># 执行iwctl命令，进入交互式命令行</span>
device list                     <span class="token comment"># 列出设备名，一般无线网卡中会看到 wlan0</span>
station wlan0 scan              <span class="token comment"># 扫描可连接的所有无线网络</span>
station wlan0 get-networks      <span class="token comment"># 列出当前扫描到的所有无线网络</span>
station wlan0 connect <span class="token operator">&lt;</span>YOUR-WIRELESS-NAME<span class="token operator">&gt;</span> <span class="token comment"># 进行连接，后面会提示键入密码</span>
<span class="token builtin class-name">exit</span>                            <span class="token comment"># 也可直接按 Ctrl + D 的热键退出 iwctl 程序，退出后可使用 ping 命令确认网络连接状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>如果你不能正常连接网络，首先确认系统已经启用网络接口:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ip</span> <span class="token function">link</span>
<span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> wlan0 up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><p>为保证网络正常连接，需要进行一次时间同步：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>timedatectl set-ntp <span class="token boolean">true</span>    <span class="token comment"># 将系统时间与网络时间进行同步</span>
timedatectl status          <span class="token comment"># 检查服务状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="硬盘分区" tabindex="-1"><a class="header-anchor" href="#硬盘分区" aria-hidden="true">#</a> 硬盘分区</h3><p>如果用户忘记在前面分区，这时还是可以直接进行分区的，首先执行<code>lsblk</code>查看所有硬盘的分区情况，找出需要分区的盘【类似<code>/dev/sdX</code>或者<code>/dev/nvme0n1pX</code>，以实际情况为准】，然后执行<code>parted /dev/xxxxxxx</code>进入程序。</p><p>一般情况下我们使用GPT分区表，进入程序后执行<code>mktable</code>，这时会询问使用什么类型的分区表，键入<code>gpt</code>即可，然后输入<code>quit</code>退出。</p><p>接着执行<code>cfdisk /dev/xxxxxxx</code>来为硬盘分区，划分好区并确认没问题之后，记得最后执行写入<code>[w]</code>，cfdisk下面有提示。</p><p>【可选】键入<code>fdisk -l</code>查看分区情况。</p><p>顺便给出我的分区情况：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Disk /dev/nvme0n1: <span class="token number">953.87</span> GiB, <span class="token number">1024209543168</span> bytes, <span class="token number">2000409264</span> sectors
Disk model: SAMSUNG MZVL21T0HCLR-00B00
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
Disklabel type: gpt
Disk identifier: D5071BE2-6738-4B6C-AED6-12BF1F9A131E

Device              Start        End   Sectors   Size Type
/dev/nvme0n1p1       <span class="token number">2048</span>    <span class="token number">1050623</span>   <span class="token number">1048576</span>   512M EFI System
/dev/nvme0n1p2    <span class="token number">1050624</span>    <span class="token number">1083391</span>     <span class="token number">32768</span>    16M Microsoft reserved
/dev/nvme0n1p3    <span class="token number">1083392</span>  <span class="token number">315656191</span> <span class="token number">314572800</span>   150G Microsoft basic data
/dev/nvme0n1p4  <span class="token number">315656192</span> <span class="token number">1154516991</span> <span class="token number">838860800</span>   400G Microsoft basic data
/dev/nvme0n1p5 <span class="token number">1154516992</span> <span class="token number">2000408575</span> <span class="token number">845891584</span> <span class="token number">403</span>.4G Microsoft basic data


Disk /dev/sda: <span class="token number">953.87</span> GiB, <span class="token number">1024209543168</span> bytes, <span class="token number">2000409264</span> sectors
Disk model: DSWC1P
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">33553920</span> bytes
Disklabel type: gpt
Disk identifier: C09E473C-91BF-49CF-A6E8-371D67B13335

Device          Start        End    Sectors   Size Type
/dev/sda1        <span class="token number">4096</span>    <span class="token number">1052671</span>    <span class="token number">1048576</span>   512M Linux filesystem
/dev/sda2     <span class="token number">1052672</span>  <span class="token number">630198271</span>  <span class="token number">629145600</span>   300G Linux filesystem
/dev/sda3   <span class="token number">630198272</span> <span class="token number">1967132671</span> <span class="token number">1336934400</span> <span class="token number">637</span>.5G Microsoft basic data
/dev/sda4  <span class="token number">1967132672</span> <span class="token number">2000408575</span>   <span class="token number">33275904</span>  <span class="token number">15</span>.9G Linux filesystem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分好区后，就该接着进行格式化了，我个人倾向这样安排文件系统: EFI 分区使用 FAT32 文件系统，系统分区使用 BTRFS 文件系统，数据分区使用 NTFS 文件系统。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkfs.vfat /dev/xxxx1
mkfs.btrfs /dev/xxxx2
mkfs.ntfs /dev/xxxx3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>格式化完成之后，需要按照如下顺序进行挂载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mount</span> /dev/xxxx2 /mnt
<span class="token function">mkdir</span> /mnt/efi
<span class="token function">mount</span> /dev/xxxx1 /mnt/efi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据分区并不是系统运行必须，因此不必着急在此完成挂载，安装好系统后再做自动挂载也来得及。</p><h3 id="系统安装" tabindex="-1"><a class="header-anchor" href="#系统安装" aria-hidden="true">#</a> 系统安装</h3><p>接下来要安装系统了，在此之前先选择好镜像源，执行<code>vim /etc/pacman.d/mirrorlist</code>来查看当前所有镜像，并将中科大镜像源写到第一行中：<code>Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch</code>。</p><p>接下来执行该命令安装系统【先确保等待 <code>pacman-init.service</code> 服务启动后，才能执行，可通过<code>systemctl status pacman-init</code>查看】：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pacstrap /mnt base base-devel linux linux-headers linux-firmware 
pacstrap /mnt dhcpcd <span class="token function">vim</span> bash-completion networkmanager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完毕后，执行<code>genfstab -U /mnt &gt;&gt; /mnt/etc/fstab</code>来写入<code>fstab</code>文件，可通过<code>cat /mnt/etc/fstab</code>进一步查看是否有误。</p><p>一切都没有问题之后，就可以 chroot 了，执行<code>arch-chroot /mnt</code>进入刚刚安装的系统。</p><h2 id="初梦" tabindex="-1"><a class="header-anchor" href="#初梦" aria-hidden="true">#</a> 初梦</h2><h3 id="设置系统时区、语言以及字符编码" tabindex="-1"><a class="header-anchor" href="#设置系统时区、语言以及字符编码" aria-hidden="true">#</a> 设置系统时区、语言以及字符编码</h3><p>设置系统时区，并更新硬件时间：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock <span class="token parameter variable">--systohc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选择系统语言及编码：执行<code>vim /etc/locale.gen</code>，寻找文件中<code>en_US.UTF-8</code>和<code>zh_CN.UTF-8</code>，取消其注释后保存，执行<code>locale-gen</code>生成 Locale, 最后执行<code>echo &#39;LANG=en_US.UTF-8&#39; &gt; /etc/locale.conf</code>完成系统语言及编码的选择。</p><h3 id="设置-hostname-与其解析" tabindex="-1"><a class="header-anchor" href="#设置-hostname-与其解析" aria-hidden="true">#</a> 设置 Hostname 与其解析</h3><p>这时还需要设置主机名：执行<code>echo &#39;YOUR_HOST_NAME&#39; &gt; /etc/hostname</code>，并将<code>YOUR_HOST_NAME</code>换成自己的主机名即可，不建议使用中文。之后打开<code>/etc/hosts</code>，执行<code>vim /etc/hosts</code>，写入如下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1   localhost
::1         localhost
<span class="token number">127.0</span>.1.1   YOUR_HOST_NAME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">常见IP</p><ul><li>127.0.0.1: 本机地址，主要用于测试</li><li>127.0.1.1: 127.0.0.0/8段下面的一个IP，可用来解析自己的主机名。</li><li>0.0.0.0: 非真正意义上的IP，表示所有在 本机的路由表里没有特定条目指明如何到达 的主机和目的网络。</li><li>255.255.255.255: 限制广播地址，对本机来说指本网段内(同一广播域)的所有主机，该地址不能被路由器转发。</li></ul></div><h3 id="创建用户与设置密码" tabindex="-1"><a class="header-anchor" href="#创建用户与设置密码" aria-hidden="true">#</a> 创建用户与设置密码</h3><p>记得为 root 用户设置密码，这是保障系统安全的重要一环，执行<code>passwd root</code>即可。</p><p>应该注意到, 一般不以 root 用户登入系统，所以现在创建非 root 用户<code>useradd -m -G wheel -s /bin/bash YOUR_USER_NAME</code>, 并为其设置密码<code>passwd YOUR_USER_NAME</code>，之后编辑<code>/etc/sudoers</code>, 找到<code>#%wheel ALL=(ALL:ALL) ALL</code>, 取消其注释。</p><h3 id="安装微码与引导程序" tabindex="-1"><a class="header-anchor" href="#安装微码与引导程序" aria-hidden="true">#</a> 安装微码与引导程序</h3><p>之后安装微码：<code>pacman -S intel-ucode # amd-ucode for AMD CPU</code></p><p>最后要安装引导程序：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pacman <span class="token parameter variable">-S</span> grub efibootmgr
grub-install <span class="token parameter variable">--target</span><span class="token operator">=</span>x86_64-efi --efi-directory<span class="token operator">=</span>/efi --bootloader-id<span class="token operator">=</span>GRUB <span class="token comment"># --removable 如果要装入移动硬盘内，一般要加上这个参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>有关 removable 参数有资料这样解释： 某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件 因此使用<code>--removable</code>参数解决一些主板 NVRAM 的兼容性问题。</p></blockquote><p>紧接着<code>vim /etc/default/grub</code>，去掉<code>GRUB_CMDLINE_LINUX_DEFAULT</code>一行中最后的<code>quiet</code>参数，并将<code>log level</code>的值改到<code>5</code>。</p><p>【可选】可以考虑再给<code>GRUB_CMDLINE_LINUX_DEFAULT</code>加上<code>nowatchdog</code>参数，但这有可能会引发未知问题，如果watchdog没有导致极严重的问题一般不建议添加，仅当非常清楚可能导致的后果后再做决定。</p><p>接着执行<code>grub-mkconfig -o /boot/grub/grub.cfg</code>来生成grub配置后，至此系统安装就算正式完成了，执行以下命令即可进入新系统【记得拔掉系统镜像盘，修改启动项】：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">exit</span>                <span class="token comment"># 退回系统镜像</span>
<span class="token function">umount</span> <span class="token parameter variable">-R</span>  /mnt     <span class="token comment"># 卸载新系统分区</span>
<span class="token function">reboot</span>              <span class="token comment"># 重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="浅梦" tabindex="-1"><a class="header-anchor" href="#浅梦" aria-hidden="true">#</a> 浅梦</h2><h3 id="开启网络服务" tabindex="-1"><a class="header-anchor" href="#开启网络服务" aria-hidden="true">#</a> 开启网络服务</h3><p>启动新系统之后，记得开启网络服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> NetworkManager
systemctl start NetworkManager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后可以执行<code>nmtui</code>进入管理界面，自行连接网络，当然也可以考虑使用<code>nmcli</code>命令，具体可使用<code>man nmcli</code>查看使用方式。</p><h3 id="添加-archlinuxcn-软件镜像源" tabindex="-1"><a class="header-anchor" href="#添加-archlinuxcn-软件镜像源" aria-hidden="true">#</a> 添加 Archlinuxcn 软件镜像源</h3><p>除了官方extra软件源以及其它软件源外，还有一个比较常见常用的软件源是 archlinuxcn 源，我们可以这样添加软件源【编辑<code>/etc/pacman.conf</code>】：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>archlinuxcn<span class="token punctuation">]</span>
SigLevel <span class="token operator">=</span> Required DatabaseOptional TrustedOnly
Include <span class="token operator">=</span> /etc/pacman.d/archlinuxcn-mirrorlist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与此同时，再创建文件<code>/etc/pacman.d/archlinuxcn-mirrorlist</code>并写入以下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#</span>
<span class="token comment"># Arch Linux CN community repository mirrorlist</span>
<span class="token comment"># Generated on 2019-12-03</span>
<span class="token comment">#</span>

<span class="token comment"># Our main server (ipv4, ipv6, http, https)</span>
<span class="token comment">#Server = &lt;https://repo.archlinuxcn.org/$arch&gt;</span>

<span class="token comment"># 中国科学技术大学 (ipv4, ipv6, http, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.ustc.edu.cn/archlinuxcn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># 上海科技大学 (上海) (ipv4, http, https)</span>
<span class="token comment">#Server = &lt;https://mirrors-wan.geekpie.club/archlinuxcn/$arch&gt;</span>

<span class="token comment"># 网易 (ipv4, http, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.163.com/archlinux-cn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># 腾讯云 (ipv4, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.cloud.tencent.com/archlinuxcn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># 重庆大学 (ipv4, http, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.cqu.edu.cn/archlinuxcn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># SJTUG 软件源镜像服务 (ipv4, https)</span>
<span class="token comment">#Server = &lt;https://mirrors.sjtug.sjtu.edu.cn/archlinux-cn/$arch&gt;</span>

<span class="token comment"># 莞工 GNU/Linux 协会 开源软件镜像站 (ipv4, http, https)</span>
<span class="token comment">#Server = &lt;https://mirrors.dgut.edu.cn/archlinuxcn/$arch&gt;</span>

<span class="token comment"># 清华大学 (ipv4, ipv6, http, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># 浙江大学 (浙江杭州) (ipv4, ipv6, http, https)</span>
Server <span class="token operator">=</span> <span class="token operator">&lt;</span>https://mirrors.zju.edu.cn/archlinuxcn/<span class="token variable">$arch</span><span class="token operator">&gt;</span>

<span class="token comment"># xTom (Hong Kong server) (Hong Kong) (ipv4, ipv6, http, https)</span>
<span class="token comment">#Server = &lt;https://mirror.xtom.com.hk/archlinuxcn/$arch&gt;</span>

<span class="token comment"># xTom (US server) (US) (ipv4, ipv6, http, https)</span>
<span class="token comment">#Server = &lt;https://mirror.xtom.com/archlinuxcn/$arch&gt;</span>

<span class="token comment"># xTom (Netherlands server) (Netherlands) (ipv4, ipv6, http, https)</span>
<span class="token comment">#Server = &lt;https://mirror.xtom.nl/archlinuxcn/$arch&gt;</span>

<span class="token comment"># Open Computing Facility, UC Berkeley (Berkeley, CA, United States) (ipv4, ipv6, http, https)</span>
<span class="token comment">#Server = &lt;https://mirrors.ocf.berkeley.edu/archlinuxcn/$arch&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置写好之后，还需要安装 Archlinuxcn 镜像源的 Keys ，执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pacman-key <span class="token parameter variable">--init</span>
pacman <span class="token parameter variable">-Syy</span>
pacman <span class="token parameter variable">-S</span> archlinuxcn-keyring
pacman-key <span class="token parameter variable">--populate</span> archlinuxcn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有 Keys 安装正确后才能正常安装 Archlinuxcn 镜像源上的软件。</p><h3 id="安装-xorg-图形桌面服务" tabindex="-1"><a class="header-anchor" href="#安装-xorg-图形桌面服务" aria-hidden="true">#</a> 安装 Xorg 图形桌面服务</h3><p>图形桌面服务有两个可选项：<code>Xorg</code>和<code>WayLand</code>。一般都使用<code>Xorg</code>，我们以这样的方式安装<code>Xorg</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> xorg-server <span class="token comment"># 安装 Xorg 服务, 另外 xorg-xinit 以及 xorg-apps 两者都是可选的</span>
lspci <span class="token parameter variable">-v</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A1</span> <span class="token parameter variable">-e</span> VGA <span class="token parameter variable">-e</span> 3D <span class="token comment"># 检查系统的显卡信息</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> xf86-video-intel nvidia nvidia-utils <span class="token comment"># 对于 Intel CPU 和 Nvidia GPU 则需要安装这三个</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-Ss</span> xf86-video <span class="token comment"># 自然可以考虑使用开源驱动程序</span>
<span class="token function">reboot</span> <span class="token comment"># 建议重启机器保证驱动等安装正确，没出现其它问题</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> xorg-xinit xorg-twm xterm xorg-xclock <span class="token comment"># 重启后安装测试工具(可后删除)</span>
<span class="token function">cp</span> /etc/X11/xinit/xinitrc ~/.xinitrc <span class="token comment"># 复制 .xinitrc 配置文件模板</span>
startx <span class="token comment"># 启动 Xorg 进行图形桌面服务测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="深梦" tabindex="-1"><a class="header-anchor" href="#深梦" aria-hidden="true">#</a> 深梦</h2><h3 id="安装桌面管理器-i3-wm-及其常用系统软件" tabindex="-1"><a class="header-anchor" href="#安装桌面管理器-i3-wm-及其常用系统软件" aria-hidden="true">#</a> 安装桌面管理器 i3 WM 及其常用系统软件</h3><p>个人偏好使用<code>Tiling Window Manager</code>，先前尝试使用过<code>Awesome Window Manager</code>，因此这次想尝试一些不一样的，于是选择了<code>i3 Window Manager</code>，安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> i3-wm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了开机能以图形界面登陆，安装了 Sddm 程序：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> sddm
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> sddm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>系统音频控制需要安装好以下软件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> alsa alsa-utils pulseaudio-utils pulseaudio pavucontrol playerctl <span class="token comment"># Alsa系的音频控制工具，含pavucontrol图形控制界面工具</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>个人偏好的软件如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> compton <span class="token comment"># 窗口透明化</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> rofi <span class="token comment"># 快速启动工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> feh <span class="token comment"># 壁纸设置工具，支持指定目录下随机，同时也是轻量的图片查看器</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> terminology <span class="token comment"># 个人偏好的终端模拟器</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> <span class="token function">zsh</span> <span class="token comment"># 个人偏好的终端</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> polybar <span class="token comment"># 系统状态栏，可自定制</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> tree <span class="token comment"># 文件树展开，项目结构可一目了然</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> i3lock-color <span class="token comment"># i3常用的屏幕锁定工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> autorandr <span class="token comment"># 屏幕扩展的自动管理工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> rofimoji <span class="token comment"># rofi界面的Emoji表情输入</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> telegram-desktop <span class="token comment"># Telegram聊天工具软件</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> xsel <span class="token comment"># 操作剪贴板的终端工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> xdotool <span class="token comment"># 可以模拟鼠标和按键操作的工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> <span class="token function">less</span> <span class="token comment"># 功能强大的查看文件内容的工具</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> timeshift <span class="token comment"># 快照备份工具，BTRFS文件系统备份常用</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> qbittorrent <span class="token comment"># BT下载器</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> ark <span class="token comment"># 开源压缩软件</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> flameshot <span class="token comment"># 截屏工具，对多屏幕支持友好</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> netease-cloud-music-gtk4 <span class="token comment"># 网易云音乐，不推荐使用Electron-Netease-Cloud-Music，会导致系统死机</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> linuxqq <span class="token comment"># 官方QQ程序，非官方程序现在基本不好用</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> vlc <span class="token comment"># 开源视频播放器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>系统字体对个人来说这些已经够用了，但可能确实有冗余：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> noto-fonts-emoji noto-fonts-extra nerd-fonts ttf-font-awesome adobe-source-code-pro-fonts awesome-terminal-fonts adobe-source-sans-fonts ttf-freefont
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="梦魇" tabindex="-1"><a class="header-anchor" href="#梦魇" aria-hidden="true">#</a> 梦魇</h2><h3 id="安装-oh-my-zsh-并切换默认终端" tabindex="-1"><a class="header-anchor" href="#安装-oh-my-zsh-并切换默认终端" aria-hidden="true">#</a> 安装 Oh-my-zsh 并切换默认终端</h3><p>前面安装好 Zsh 之后，就可以安装 Oh-my-zsh Theme 了，并且加入其中的一些插件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Oh-my-zsh ， Powerlevel10k 主题 以及 常用插件</span>
<span class="token function">git</span> clone https://github.com/romkatv/powerlevel10k.git .oh-my-zsh/themes/powerlevel10k
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-syntax-highlighting
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-autosuggestions
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般进入 Zsh 后会自动进入配置环节，如果没进入的话需要手动执行<code>p10k configure</code>来进行主题配置，一般像前面装好字体之后就可以正常看到图标字符了。</p><p>配置好之后一般会自动帮你写好<code>.zshrc</code>文件，除去下面的alias，剩下的便是正常写好的样子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.</span>
<span class="token comment"># Initialization code that may require console input (password prompts, [y/n]</span>
<span class="token comment"># confirmations, etc.) must go above this block; everything else may go below.</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-r</span> <span class="token string">&quot;<span class="token variable">\${XDG_CACHE_HOME<span class="token operator">:-</span>$HOME<span class="token operator">/</span>.cache}</span>/p10k-instant-prompt-<span class="token variable">\${(<span class="token operator">%</span>)<span class="token operator">:-</span><span class="token operator">%</span>n}</span>.zsh&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">source</span> <span class="token string">&quot;<span class="token variable">\${XDG_CACHE_HOME<span class="token operator">:-</span>$HOME<span class="token operator">/</span>.cache}</span>/p10k-instant-prompt-<span class="token variable">\${(<span class="token operator">%</span>)<span class="token operator">:-</span><span class="token operator">%</span>n}</span>.zsh&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment"># If you come from bash you might have to change your $PATH.</span>
<span class="token comment"># export PATH=$HOME/bin:/usr/local/bin:$PATH</span>

<span class="token comment"># Path to your oh-my-zsh installation.</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ZSH</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/.oh-my-zsh

<span class="token comment"># Set name of the theme to load --- if set to &quot;random&quot;, it will</span>
<span class="token comment"># load a random theme each time oh-my-zsh is loaded, in which case,</span>
<span class="token comment"># to know which specific one was loaded, run: echo $RANDOM_THEME</span>
<span class="token comment"># See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes</span>
<span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;powerlevel10k/powerlevel10k&quot;</span>

<span class="token comment"># Set list of themes to pick from when loading at random</span>
<span class="token comment"># Setting this variable when ZSH_THEME=random will cause zsh to load</span>
<span class="token comment"># a theme from this variable instead of looking in $ZSH/themes/</span>
<span class="token comment"># If set to an empty array, this variable will have no effect.</span>
<span class="token comment"># ZSH_THEME_RANDOM_CANDIDATES=( &quot;robbyrussell&quot; &quot;agnoster&quot; )</span>

<span class="token comment"># Uncomment the following line to use case-sensitive completion.</span>
<span class="token comment"># CASE_SENSITIVE=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line to use hyphen-insensitive completion.</span>
<span class="token comment"># Case-sensitive completion must be off. _ and - will be interchangeable.</span>
<span class="token comment"># HYPHEN_INSENSITIVE=&quot;true&quot;</span>

<span class="token comment"># Uncomment one of the following lines to change the auto-update behavior</span>
<span class="token comment"># zstyle &#39;:omz:update&#39; mode disabled  # disable automatic updates</span>
<span class="token comment"># zstyle &#39;:omz:update&#39; mode auto      # update automatically without asking</span>
<span class="token comment"># zstyle &#39;:omz:update&#39; mode reminder  # just remind me to update when it&#39;s time</span>

<span class="token comment"># Uncomment the following line to change how often to auto-update (in days).</span>
<span class="token comment"># zstyle &#39;:omz:update&#39; frequency 13</span>

<span class="token comment"># Uncomment the following line if pasting URLs and other text is messed up.</span>
<span class="token comment"># DISABLE_MAGIC_FUNCTIONS=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line to disable colors in ls.</span>
<span class="token comment"># DISABLE_LS_COLORS=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line to disable auto-setting terminal title.</span>
<span class="token comment"># DISABLE_AUTO_TITLE=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line to enable command auto-correction.</span>
<span class="token comment"># ENABLE_CORRECTION=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line to display red dots whilst waiting for completion.</span>
<span class="token comment"># You can also set it to another string to have that shown instead of the default red dots.</span>
<span class="token comment"># e.g. COMPLETION_WAITING_DOTS=&quot;%F{yellow}waiting...%f&quot;</span>
<span class="token comment"># Caution: this setting can cause issues with multiline prompts in zsh &lt; 5.7.1 (see #5765)</span>
<span class="token comment"># COMPLETION_WAITING_DOTS=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line if you want to disable marking untracked files</span>
<span class="token comment"># under VCS as dirty. This makes repository status check for large repositories</span>
<span class="token comment"># much, much faster.</span>
<span class="token comment"># DISABLE_UNTRACKED_FILES_DIRTY=&quot;true&quot;</span>

<span class="token comment"># Uncomment the following line if you want to change the command execution time</span>
<span class="token comment"># stamp shown in the history command output.</span>
<span class="token comment"># You can set one of the optional three formats:</span>
<span class="token comment"># &quot;mm/dd/yyyy&quot;|&quot;dd.mm.yyyy&quot;|&quot;yyyy-mm-dd&quot;</span>
<span class="token comment"># or set a custom format using the strftime function format specifications,</span>
<span class="token comment"># see &#39;man strftime&#39; for details.</span>
<span class="token comment"># HIST_STAMPS=&quot;mm/dd/yyyy&quot;</span>

<span class="token comment"># Would you like to use another custom folder than $ZSH/custom?</span>
<span class="token comment"># ZSH_CUSTOM=/path/to/new-custom-folder</span>

<span class="token comment"># Which plugins would you like to load?</span>
<span class="token comment"># Standard plugins can be found in $ZSH/plugins/</span>
<span class="token comment"># Custom plugins may be added to $ZSH_CUSTOM/plugins/</span>
<span class="token comment"># Example format: plugins=(rails git textmate ruby lighthouse)</span>
<span class="token comment"># Add wisely, as too many plugins slow down shell startup.</span>
<span class="token assign-left variable">plugins</span><span class="token operator">=</span><span class="token punctuation">(</span>
  z
  <span class="token function">cp</span>
  <span class="token function">sudo</span>
  extract
  autojump
  alias-finder
  zsh-completions
  colored-man-pages
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-history-substring-search
<span class="token punctuation">)</span>

<span class="token builtin class-name">source</span> <span class="token variable">$ZSH</span>/oh-my-zsh.sh

<span class="token comment"># User configuration</span>

<span class="token comment"># export MANPATH=&quot;/usr/local/man:$MANPATH&quot;</span>

<span class="token comment"># You may need to manually set your language environment</span>
<span class="token comment"># export LANG=en_US.UTF-8</span>

<span class="token comment"># Preferred editor for local and remote sessions</span>
<span class="token comment"># if [[ -n $SSH_CONNECTION ]]; then</span>
<span class="token comment">#   export EDITOR=&#39;vim&#39;</span>
<span class="token comment"># else</span>
<span class="token comment">#   export EDITOR=&#39;mvim&#39;</span>
<span class="token comment"># fi</span>

<span class="token comment"># Compilation flags</span>
<span class="token comment"># export ARCHFLAGS=&quot;-arch x86_64&quot;</span>

<span class="token comment"># Set personal aliases, overriding those provided by oh-my-zsh libs,</span>
<span class="token comment"># plugins, and themes. Aliases can be placed here, though oh-my-zsh</span>
<span class="token comment"># users are encouraged to define aliases within the ZSH_CUSTOM folder.</span>
<span class="token comment"># For a full list of active aliases, run \`alias\`.</span>
<span class="token comment">#</span>
<span class="token comment"># Example aliases</span>
<span class="token comment"># alias zshconfig=&quot;mate ~/.zshrc&quot;</span>
<span class="token comment"># alias ohmyzsh=&quot;mate ~/.oh-my-zsh&quot;</span>

<span class="token comment"># To customize prompt, run \`p10k configure\` or edit ~/.p10k.zsh.</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> ~/.p10k.zsh <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">source</span> ~/.p10k.zsh

<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ls</span><span class="token operator">=</span><span class="token string">&quot;colorls&quot;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">&quot;colorls -l&quot;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">la</span><span class="token operator">=</span><span class="token string">&quot;colorls -a&quot;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">cat</span><span class="token operator">=</span><span class="token string">&quot;bat&quot;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">wpe</span><span class="token operator">=</span><span class="token string">&quot;fantascene-dynamic-wallpaper&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记得执行<code>chsh -s zsh &lt;YOUR_USERNAME&gt;</code>来修改默认 Shell 。</p><h3 id="安装-fcitx5-rime-中文输入法" tabindex="-1"><a class="header-anchor" href="#安装-fcitx5-rime-中文输入法" aria-hidden="true">#</a> 安装 Fcitx5 Rime 中文输入法</h3><p>中文输入法折腾起来挺麻烦，当初我也是翻了好些个资料，现在我直接整合到一起了，首先应当安装以下这些软件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> fcitx5-configtool fcitx5 fcitx5-gtk fcitx5-qt fcitx5-rime librime librime-prelude <span class="token comment"># 输入法及其可扩展的工具依赖</span>
yay <span class="token parameter variable">-S</span> rime-cloverpinyin
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> python-jieba pypinyin opencc python-requests <span class="token comment"># 来源：https://github.com/fkxxyz/rime-cloverpinyin?tab=readme-ov-file#%E4%BB%8E%E6%9C%AC%E4%BB%93%E5%BA%93%E6%BA%90%E7%A0%81%E6%9E%84%E5%BB%BA</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着编辑<code>/etc/environment</code>文件, 写入以下这些内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GTK_IM_MODULE</span><span class="token operator">=</span>fcitx
<span class="token builtin class-name">export</span> <span class="token assign-left variable">QT_IM_MODULE</span><span class="token operator">=</span>fcitx
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">XMODIFIERS</span></span><span class="token operator">=</span><span class="token string">&quot;@im=fcitx&quot;</span>
fcitx5 <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着编辑文件<code>~/.local/share/fcitx5/rime/default.custom.yaml</code>, 写入以下配置，设置使用四叶草输入法，并设定候选词个数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>patch:
  <span class="token string">&quot;menu/page_size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>
  schema_list:
    - schema: clover
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,96),z={href:"https://github.com/hosxy/Fcitx5-Material-Color",target:"_blank",rel:"noopener noreferrer"},M=t(`<p>一般手动安装主题都是安装以下命令安装的：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token operator">&lt;</span>link.to.github.repo<span class="token operator">&gt;</span>
<span class="token builtin class-name">cd</span> <span class="token operator">&lt;</span>repo.name<span class="token operator">&gt;</span>
<span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>theme.name<span class="token operator">&gt;</span> ~/.local/share/fcitx5/themes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装好主题之后在这里编辑文件<code>~/.config/fcitx5/conf/classicui.conf</code>，写入：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 垂直候选列表</span>
Vertical Candidate <span class="token assign-left variable">List</span><span class="token operator">=</span>False
<span class="token comment"># 按屏幕 DPI 使用</span>
<span class="token assign-left variable">PerScreenDPI</span><span class="token operator">=</span>True
<span class="token comment"># Font (设置成你喜欢的字体)</span>
<span class="token comment">#Font=&quot;思源黑体 CN Medium 13&quot;</span>
<span class="token assign-left variable">Font</span><span class="token operator">=</span><span class="token string">&quot;Noto Sans CJK SC Bold 20&quot;</span>
<span class="token comment"># 主题</span>
<span class="token assign-left variable">Theme</span><span class="token operator">=</span>Material-Color-Indigo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着安装一些常用词库，重启后就可以开始体验舒适的中文输入了：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yay <span class="token parameter variable">-S</span> rime-pinyin-zhwiki fcitx5-pinyin-moegirl-rime <span class="token comment"># 安装词库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="设置-swap" tabindex="-1"><a class="header-anchor" href="#设置-swap" aria-hidden="true">#</a> 设置 Swap</h3><p>设置交换文件/分区的做法如下，设置交换文件的话应当使用<code>dd</code>工具创建特殊文件，设置好权限之后将其格式化</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/swapfile <span class="token assign-left variable">bs</span><span class="token operator">=</span>1M <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">4096</span> <span class="token assign-left variable">status</span><span class="token operator">=</span>progress <span class="token comment">#创建4G的交换空间 大小根据需要自定</span>
<span class="token function">chmod</span> <span class="token number">600</span> /swapfile <span class="token comment">#设置正确的权限</span>
<span class="token function">mkswap</span> /swapfile <span class="token comment">#格式化swap文件</span>
<span class="token function">swapon</span> /swapfile <span class="token comment">#启用swap文件</span>
<span class="token function">sudo</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;/swapfile none swap defaults 0 0&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似的，也可以自行裁出一块分区后，依次使用<code>mkswap</code>和<code>swapon</code>制作 Swap 分区，并在<code>/etc/fstab</code>最后添加<code>UUID=&lt;YOUR_DISK_UUID&gt; /swap swap swap,defaults 0 0</code></p><h3 id="android-debug-工具" tabindex="-1"><a class="header-anchor" href="#android-debug-工具" aria-hidden="true">#</a> Android Debug 工具</h3><p>如果有对安卓机调试/挂载的需要，则安装如下工具即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> scrcpy android-tools <span class="token comment"># 安卓机挂载/调试用的工具</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装-latex-and-latex-workshop-in-vs-code" tabindex="-1"><a class="header-anchor" href="#安装-latex-and-latex-workshop-in-vs-code" aria-hidden="true">#</a> 安装 LaTeX and LaTeX Workshop in VS Code</h3><p>要想在本地使用 LaTeX，安装这些后在 VS Code 上安装插件 LaTeX Workshop，</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> texlive-core texlive-langchinese texlive-latexextra texlive-fontsextra texlive-science texlive-xetex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开其配置文件(<code>Ctrl</code>+<code>Shift</code>+<code>P</code>后输入<code>settings.json</code>, 打开 User Settings), 在<code>{}</code>内加入如下内容：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>    <span class="token property">&quot;latex-workshop.latex.tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-pdf&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;%DOC%&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;%DOC%&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;-synctex=1&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-interaction=nonstopmode&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;-file-line-error&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;%DOC%&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;%DOCFILE%&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.latex.recipes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latexmk&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;latexmk&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;xelatex&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex -&gt; bibtex&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;bibtex&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pdflatex -&gt; bibtex -&gt; pdflatex*2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;pdflatex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;pdflatex&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xelatex -&gt; bibtex -&gt; xelatex*2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;tools&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;bibtex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;xelatex&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;xelatex&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.view.pdf.viewer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tab&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.latex.clean.fileTypes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;*.aux&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.bbl&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.blg&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.idx&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.ind&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.lof&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.lot&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.out&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.toc&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.acn&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.acr&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.alg&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.glg&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.glo&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.gls&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.ist&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.fls&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.log&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;*.fdb_latexmk&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.bibtex-format.tab&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4 spaces&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.latex.autoBuild.run&quot;</span><span class="token operator">:</span> <span class="token string">&quot;onSave&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;latex-workshop.latex.recipe.default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lastUsed&quot;</span><span class="token punctuation">,</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次的配置文件较以前在 ArcoLinux 中多了按照上次使用的编译方式进行编译，并且可以修改是否在保存时编译的设置。</p><h3 id="使用-clash-premium-and-dashboard-科学上网" tabindex="-1"><a class="header-anchor" href="#使用-clash-premium-and-dashboard-科学上网" aria-hidden="true">#</a> 使用 Clash Premium and Dashboard 科学上网</h3><p>科学上网，就用Clash保驾护航，首先需要安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> archlinuxcn/clash-premium-bin <span class="token comment"># 安装该软件的Premium版本才能使用Rules规则</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> archlinuxcn/clash-dashboard-git <span class="token comment"># Dashboard 是有必要安装的，便于手动切换节点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后需要从机场的订阅链接获取 Clash 配置文件，可考虑使用 wget 将其下载过来，一般下载过来的配置文件都会给你写好里面的规则等必须信息。</p><p>接着需要设置开机自启以及启动服务，但应注意，服务名是这样的格式：<code>clash@&lt;YOUR_USERNAME&gt;.service</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> clash@<span class="token operator">&lt;</span>YOUR_USERNAME<span class="token operator">&gt;</span>
<span class="token function">sudo</span> systemctl start clash@<span class="token operator">&lt;</span>YOUR_USERNAME<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着需要配置全局代理，编辑<code>/etc/environment</code>文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Clash Proxy</span>
<span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890
<span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890
<span class="token assign-left variable">socks_proxy</span><span class="token operator">=</span>http://127.0.0.1:7891
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着配置 dashboard, 将安装来的<code>clash-dashboard-git</code>下的所有文件复制到<code>.config/clash/dashboard</code>里：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/.config/clash/dashboard
<span class="token function">cp</span> <span class="token parameter variable">-r</span> /usr/share/clash-dashboard-git/* ~/.config/clash/dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后编辑clash配置文件<code>~/.config/clash/config.yaml</code>, 一般文件头部的样子是这样的：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7890</span>
<span class="token key atrule">socks-port</span><span class="token punctuation">:</span> <span class="token number">7891</span>
<span class="token key atrule">allow-lan</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">mode</span><span class="token punctuation">:</span> Rule
<span class="token key atrule">log-level</span><span class="token punctuation">:</span> info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为使用 Dashboard， 需要添加如下两行：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">secert</span><span class="token punctuation">:</span> &#39;&#39; // 设置 Dashboard 登入密码，如不设置可像这样置空
<span class="token key atrule">external-ui</span><span class="token punctuation">:</span> dashboard // 增加这一行以启用 Dashboard 界面，名字与 ~/.config/clash/ 下的文件夹名保持一致
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,33),I=n("code",null,"sudo systemctl restart clash@<YOUR_USERNAME>",-1),O=t('<h3 id="linux-查找软件安装目录" tabindex="-1"><a class="header-anchor" href="#linux-查找软件安装目录" aria-hidden="true">#</a> Linux 查找软件安装目录</h3><p>Linux 一般安装的软件位置会在以下几个目录中，如有需要届时可以自行查找：</p><ol><li><code>/usr/share</code></li><li><code>/usr/local</code></li><li><code>/opt</code></li></ol><p>如果已知可执行程序，也可直接使用<code>whereis</code>, <code>which</code>等查看位置</p><h2 id="醒不过来了" tabindex="-1"><a class="header-anchor" href="#醒不过来了" aria-hidden="true">#</a> 醒不过来了</h2>',5);function D(N,R){const e=l("ExternalLinkIcon"),i=l("RouterLink");return p(),r("div",null,[u,n("ol",null,[n("li",null,[n("a",m,[s("Arch Linux 基础安装"),a(e)])]),n("li",null,[n("a",v,[s("Arch Linux 启用 archlinuxcn 源"),a(e)])]),n("li",null,[n("a",b,[s("Arch Linux 安装 Xorg"),a(e)])]),n("li",null,[n("a",k,[s("ArchLinux下i3wm安装和简单配置美化"),a(e)])]),n("li",null,[n("a",h,[s("Arch Linux install i3-wm"),a(e)])]),n("li",null,[n("a",g,[s("Archlinux 下 fcitx5-rime 的使用"),a(e)])]),n("li",null,[n("a",f,[s("fkxxyz/rime-cloverpinyin - GitHub"),a(e)])]),n("li",null,[n("a",x,[s("Arch Linux Clash 安装配置记录"),a(e)])]),n("li",null,[n("a",q,[s("mkinitcpio - Archwiki"),a(e)])]),n("li",null,[n("a",y,[s("ArchLinux安装教程"),a(e)])]),n("li",null,[n("a",S,[s("2024年最好用的12款 Linux Terminal Emulator (终端模拟器)"),a(e)])]),n("li",null,[n("a",_,[s("Linux 下使用 Clash 科学上网"),a(e)])]),n("li",null,[n("a",w,[s("Linux查看软件安装目录及位置4种方法（Linux）"),a(e)])]),n("li",null,[n("a",E,[s("linux查看软件的安装位置简单方法"),a(e)])]),n("li",null,[n("a",A,[s("pacman常用命令"),a(e)])]),n("li",null,[n("a",U,[s("nvme硬盘的断电保护是否有用，是噱头、智商税还是真的有需要？购买DOCKCASE智能M2固态硬盘盒10秒保护"),a(e)])]),n("li",null,[n("a",T,[s("0.0.0.0和127.0.0.1、127.0.1.1、localhost"),a(e)])]),n("li",null,[n("a",C,[s("linux下部署Clash+dashboard"),a(e)])])]),L,n("p",null,[s("接着先推荐一个主题，是我个人比较喜欢使用的一个主题："),n("a",z,[s("https://github.com/hosxy/Fcitx5-Material-Color"),a(e)])]),M,n("p",null,[s("至此，执行"),I,s("后就可以正常科学上网了，另外，如需要进入 Dashboard 界面，应点击这里的链接："),a(i,{to:"/Linux/localhost:9090/ui/clash-dashboard-git/"},{default:o(()=>[s("localhost:9090/ui/clash-dashboard-git/")]),_:1}),s(", 如果你不确定 Dashboard 的具体名字，可点该链接查看："),a(i,{to:"/Linux/localhost:9090/ui/"},{default:o(()=>[s("localhost:9090/ui/")]),_:1}),s("。")]),O])}const H=c(d,[["render",D],["__file","ArchLinux_i3.html.vue"]]);export{H as default};
