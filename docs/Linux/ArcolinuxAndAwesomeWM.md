---
title: Arcolinux & AwesomeWM
date: 2021-12-02 12:00:21
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
 - ArcoLinux
 - AwesomeWM
tags: 
 - Linux
 - Arco Linux
 - Awesome Window Manager
---
> **前因**：由于之前我使用的Manjaro始终都存在着无法正常扩展第三屏幕的Bug，反反复复修了五六次，还是没能彻底解决，所有之前的解决方法其实治标不治本，最后我实在无法解决这个问题，只好解决出问题的系统了，执行 `sudo rm -rf /*`。也正是这样，才不得不换新的系统，经过较长时间的选择以及和大佬交流，最后我选择了ArcoLinux。

不过，这个路比Manjaro艰难得多就是了，ArcoLinuxB仅仅是比ArchLinux多了个桌面环境，我原本是有选择安装的，奈何网络质量问题，我无法如意，因此得到的ArcoLinux几乎相当于一台裸机……

## ArcoLinux 安装

**ArcoLinux安装步骤有如下几步：**

1. **准备好相应的系统启动盘。**

   我是使用Ventoy来制作的系统启动盘，只需要把ArcoLinuxB的ISO系统镜像放进启动盘目录下即可，一切的使用都是非常简单的。
2. **通过EFI BIOS进入系统启动盘。**

   在笔记本电脑上通常是按下 `<kbd>`F12 `</kbd>`或者 `<kbd>`F2 `</kbd>`来进入EFI启动选项界面，选择你的USB即可。
3. **使用GParted手动划分硬盘分区。**我是折腾许久都无果失败后找到大佬帮助的，这才弄明白原来真正需要做的是：为你的系统划分一个EFI启动引导分区，推荐大小为 `512MB`，虽然我真正安装后才知道实际只用了 `1.30MB`，再划分好硬盘的一部分空间来存放你的系统，剩下的就用来存放你的数据，但要注意，划分好后别急着点击下一步，我们还有非常重要的配置还没写——先选择Manual partitioning选项，然后选择好刚才那个EFI启动引导分区，编辑它的属性，将flag修改为 `/boot/efi`，一般不用选中 `grub-boot`；然后将存放数据的硬盘分区中属性的flag一项修改为 `/`。其他选项则自由发挥，自己安排，值得一提的是，我这次没有选择使用Plasma桌面系统，而是选择了AwesomeWM，因为我确信学会熟练使用它会大幅提高我的工作效率。
4. 等待安装好后就可以拔掉系统盘了，至此你的系统已经可以安装完毕了。

## ArcoLinux配置

> 由于我之前已经有过Manjaro安装配置的经验了，这次安装配置ArcoLinux也就顺利多了。两者都是基于ArchLinux的发行版，安装与配置的思路也是差不多的。

**「注意」**：AwesomeWM桌面系统与常见的桌面系统是完全不一样的逻辑，常见的桌面系统如Windows、Plasma/KDE、GNOME、XFCE等都是堆栈式桌面布局，而AwesomeWM和i3两者都是平铺式桌面布局，因此使用上有较大区别，最明显的是从前你所记住的绝大多数快捷键在这里全部无效，原因都是对不上号，执行同一功能的两个桌面系统对应的快捷键是截然不同的。出于这样的原因，我会在文章中穿插描述AwesomeWM的使用方式。

**「重点」**：AwesomeWM的配置文件在：`~/.config/awesome/rc.lua`这里，使用的语言正如你所见，是Lua。另外在学习使用的时候请按 `<kbd>`Meta `</kbd>`+`<kbd>`S `</kbd>`打开帮助窗口来查看各种操作的使用，建议都亲自敲一遍，这样入门快。

开局第一步：换源。

**按下 `<kbd>`Meta `</kbd>`+`<kbd>`ENTER `</kbd>`或者 `<kbd>`Meta `</kbd>`+`<kbd>`T `</kbd>`打开终端。**为pacman添加archlinuxcn镜像源，需要将如下内容写入 `/etc/pacman.conf`内：

```shell
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

然后配置yay的镜像源顺序，要编辑 `/etc/pacman.d/mirrorlist`，良心的是这个文件下已经将全球所有的镜像源都加入其中了，我们要做的是将文件后面的China部分移动到前面即可。我的做法是先sudo vim /etc/pacman.d/mirrorlist，然后用鼠标选中China这一部分的地址，键盘输入 `<kbd>`"+y `</kbd>`(表示复制选中的内容到系统剪贴板📋)，然后将光标移动到文件开头，直接用键盘键入 `<kbd>`p `</kbd>`即可将刚才复制的内容粘贴上去，保存退出即可。

## AwesomeWM 配置

### AwesomeWM中较简单的软件安装

```bash
# 因为有些软件安装过于简单，只是执行安装语句即可完成的事，我就都集中写在这里了。
sudo pacman -S netease-cloud-music # 网易云音乐平台
yay -S elisa # 轻量级的小型音乐播放器
yay -S vlc # 强大又小巧的视频播放器。
yay -S typora-free # 这也是因为近期Typora正式升级版本v1.0，就此转变为收费软件，如果不考虑支付费用的话暂时还是只能用v0.11.8这个最后的测试版。
yay -S wps-office wps-office-mui-zh-cn ttf-wps-fonts # WPS软件
yay -S solaar logiops # 安装相应的无线接收器管理软件和罗技鼠标驱动
yay -S visual-studio-code-bin # 其实可以直接安装code,二选一而已，我用起来感觉没什么区别。
yay -S pycharm-professional # 安装专业版PyCharm
yay -S anaconda cuda cudnn cuda-tools # 安装机器学习的环境
sudo pacman -S clion clion-cmake make clion-lldb clion-jre # 安装Clion环境
yay -S base-devel r r-devel rstudio-desktop-bin # 安装R语言环境
sudo pacman -S intellij-idea-ultimate-edition intellij-idea-ultimate-edition-jre # 安装IntelliJ Idea
sudo pacman -S gimp # GNU图像编辑器
sudo pacman -S flameshot # 强大的截图软件
yay -S openshot blender inkscape # Linux下一般通用视频编辑套装「后两个是openshot运行时需要额外装的」
sudo pacman -S guvcview # 使用笔记本摄像机进行拍摄、录制。
yay -S fim # 终端平台的图片查看器
sudo pacman -S bat # 具有语法高亮和Git集成的Cat类命令
sudo pacman -S cpdf # 一种简易的pdf拼接软件
```

### 安装Fcitx5输入法以及设置软件开机自动启动

安装思路是和Manjaro相差不大的，同样也是安装这些包即可：

```shell
yay -S fcitx5 fcitx5-chinese-addons fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-material-color
# 安装输入法
yay -S fcitx5-pinyin-moegirl fcitx5-pinyin-zhwiki
# 安装词库
```

这时AwesomeWM下配置输入法不太一样，需要将以下内容写入 `~/.pam_environment`：

```shell
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=\@im=fcitx
INPUT_METHOD  DEFAULT=fcitx
SDL_IM_MODULE DEFAULT=fcitx
```

然后将下面的代码写入 `~/.xprofile`即可：

```shell
fcitx5 &
export QT_IM_MODULE=fcitx5
```

::: danger 未必如此

这时候你启动Fcitx5是可以正常使用的，但AwesomeWM并不会自动将它加入到自动启动菜单，因此我们也同样需要修改系统配置，在修改之前我建议先自行备份配置文件：`cp ~/.config/awesome/rc.lua ~/.config/awesome/rc.lua.backup`，然后编辑 `~/.config/awesome/rc.lua`，将下面的代码加入配置文件即可：

```lua
-- Autostart applications
awful.spawn.with_shell("~/.config/awesome/autostart.sh")
awful.spawn.with_shell("picom -b --config  $HOME/.config/awesome/picom.conf")

-- Autorun programs
autorun = true
autorunApps = 
{
	-- 你希望运行的软件名（以终端名称为准），格式为"NAME",
    "Example",
    ……
}

if autorun then
	for app = 1, #autorunApps do
		awful.util.spawn_with_shell(autorunApps[app])
	end
end
```

现在是想让Fcitx5开机自启动，那就可以把上面代码中的 `NAME`改为 `fcitx5`。保存之后，建议执行 `awesome -k`来检查有无语法错误，最后可以按下 `<kbd>`Meta `</kbd>`+`<kbd>`Shift `</kbd>`+`<kbd>`R `</kbd>`来重启AwesomeWM。注意，这样做也意味着每次你按下这一组快捷键，autorunApps数组里面的所有应用都会再次启动一次。现在重启一下就可以正式投入使用了。

:::

::: tip 简洁思路

其实直接按下 `<kbd>`Ctrl `</kbd>`+`<kbd>`Alt `</kbd>`+`<kbd>`A `</kbd>`启动软件菜单，运行一下Fcitx5 Configuration后调整输入法设置即可，无需手动添加启动项。

:::

### 科学上网的配置

经过较长时间的配置我最后终于理明白应该如何配置好科学上网套装了。

这次我选用的还是Qv2ray，但要明白的是，它归根到底只是一个外部界面，真正使用的是V2ray核心。经过我较长时间的摸索发现，内核不止一个，除了要安装v2ray之外，还要安装xray。因此我们应该执行：

```shell
yay -S xray v2ray qv2ray
```

然后应该在 `/etc/environment`配置文件中引入这样的全局变量：

```shell
export http_proxy=http://127.0.0.1:8889
export https_proxy=http://127.0.0.1:8889
export ftp_proxy=http://127.0.0.1:8889
export rsync_proxy=http://127.0.0.1:8889
export no_proxy='localhost,127.0.0.1,localaddress,.localdomain.com'
```

然后在Qv2ray中设置分组的订阅链接，更新订阅，选择节点后就可以开始科学上网了。要注意的是，写入 `/etc/environment`文件的地址应当是本机内网地址，一般选用localhost就够用了，后面跟的端口号应该与Qv2ray上HTTP代理的端口号是一致的。

::: warning

我尝试过只安装v2ray和qv2ray的方案，但是发现它并不能稳定运行，只是能用上一小段时间然后就连不上了，因此仍然认为采取以上做法才是稳定妥当做法。

:::

### 设置系统非静默启动

这里的思路依旧是差不多的，依旧是编辑 `/etc/default/grub`文件，从中寻找 `GRUB_CMDLINE_LINUX_DEFAULT`这一关键字修改，把引号中的quiet参数去掉。

但到此还没完。你会发现当你执行 `sudo update-grub`的时候会报错，导致无法正常进行。但这不意味着我们没有办法，没有这个脚本，我们就造一个。

```shell
#!/bin/sh
set -e
exec grub-mkconfig -o /boot/grub/grub.cfg "$@"
```

将以上代码写入 `/usr/sbin/update-grub`脚本后再重新执行 `sudo update-grub`即可。

### 配置Logid

详见[此处](https://breezeshane.github.io/Linux/Manjaro%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/#logid%E4%BD%BF%E7%94%A8)，两者配置几乎一致，这里就不再赘述了，另外，如果不知道自己的设备名称应该是如何的，可以通过执行 `sudo logid -v`来查看设备名，输出的信息里会写的，注意看提示。

### 配置Anaconda及测试

详见[此处](https://breezeshane.github.io/Linux/Manjaro%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/#windows-10-manjaro%E4%B8%8B%E7%9A%84anaconda%E9%85%8D%E7%BD%AE)，这里也不做赘述了。

### 开机自动挂载硬盘

经本人亲自配置，确认是没有区别，因此可以参考[这里](https://breezeshane.github.io/Linux/Manjaro%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/#%E5%BC%80%E6%9C%BA%E6%8C%82%E8%BD%BDntfs%E7%A1%AC%E7%9B%98)修改

### sudo免密问题

和Manjaro不同，这里应该执行 `sudo visudo`命令来编辑配置文件，并在最后加入：

```yaml
<YOURUSERNAME> ALL=(ALL) NOPASSWD: ALL
```

保存后就可以生效了。

### Virtual Machine Manager使用方法

依旧同[Virtual Machine Manager](https://breezeshane.github.io/Linux/Manjaro%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/#%E5%9C%A8linux%E4%B8%8B%E4%BD%BF%E7%94%A8%E8%99%9A%E6%8B%9F%E6%9C%BA)。

### 配置屏幕亮度调节问题

起初我按下笔记本电脑上的功能键时发现没有任何功效，在网上搜索了好长时间，最后在查看系统配置文件的时候才发现应该如何解决问题。

配置文件中有这样的一段代码：

```lua
-- Brightness
awful.key({ }, "XF86MonBrightnessUp", function () os.execute("xbacklight -inc 10") end,
    {description = "+10%", group = "hotkeys"}),
awful.key({ }, "XF86MonBrightnessDown", function () os.execute("xbacklight -dec 10") end,
    {description = "-10%", group = "hotkeys"}),
```

看到这里就能明白，按下这样的功能键应该会在终端执行这个指令，于是我去尝试执行，发现果然不行。于是我又去网上搜索一段时间，最后得出了如下的解决方案：

```shell
sudo pacman -Rs xorg-xbacklight
sudo pacman -S acpilight
```

按照网友的说法，这个时候应该奏效的，还是没有任何反应，于是我尝试使用了Root权限执行，果然有效，但又考虑到，我不可能在按下键的时候还要去输入sudo的密码，而且系统也不会给我这个提示信息，那么我应该怎么做呢？执行过 `xbacklight -inc 10`后得到这样的输出：

```shell
/usr/bin/xbacklight: [Errno 13] Permission denied: '/sys/class/backlight/intel_backlight/brightness
```

显然是权限问题，改写一下文件的权限就可以完全解决问题了：

```shell
sudo chmod 777 /sys/class/backlight/intel_backlight/brightness
```

现在即使你不用Root权限也可以正常使用了！

### 配置多媒体功能键

和之前的调节屏幕亮度是同一个道理，同样是按下相应的键会执行相应的终端工具，因此我们再一次查看配置文件：

```lua
    -- ALSA volume control
    --awful.key({ modkey1 }, "Up",
    awful.key({ }, "XF86AudioRaiseVolume",
        function ()
            os.execute(string.format("amixer -q set %s 1%%+", beautiful.volume.channel))
            beautiful.volume.update()
        end),
    --awful.key({ modkey1 }, "Down",
    awful.key({ }, "XF86AudioLowerVolume",
        function ()
            os.execute(string.format("amixer -q set %s 1%%-", beautiful.volume.channel))
            beautiful.volume.update()
        end),
    awful.key({ }, "XF86AudioMute",
        function ()
            os.execute(string.format("amixer -q set %s toggle", beautiful.volume.togglechannel or beautiful.volume.channel))
            beautiful.volume.update()
        end),
    awful.key({ modkey1, "Shift" }, "m",
        function ()
            os.execute(string.format("amixer -q set %s 100%%", beautiful.volume.channel))
            beautiful.volume.update()
        end),
    awful.key({ modkey1, "Shift" }, "0",
        function ()
            os.execute(string.format("amixer -q set %s 0%%", beautiful.volume.channel))
            beautiful.volume.update()
        end),

    --Media keys supported by vlc, spotify, audacious, xmm2, ...
    --awful.key({}, "XF86AudioPlay", function() awful.util.spawn("playerctl play-pause", false) end),
    --awful.key({}, "XF86AudioNext", function() awful.util.spawn("playerctl next", false) end),
    --awful.key({}, "XF86AudioPrev", function() awful.util.spawn("playerctl previous", false) end),
    --awful.key({}, "XF86AudioStop", function() awful.util.spawn("playerctl stop", false) end),
))
--Media keys supported by mpd.
    awful.key({}, "XF86AudioPlay", function () awful.util.spawn("mpc toggle") end),
    awful.key({}, "XF86AudioNext", function () awful.util.spawn("mpc next") end),
    awful.key({}, "XF86AudioPrev", function () awful.util.spawn("mpc prev") end),
    awful.key({}, "XF86AudioStop", function () awful.util.spawn("mpc stop") end),

    -- MPD control
    awful.key({ modkey1, "Shift" }, "Up",
        function ()
            os.execute("mpc toggle")
            beautiful.mpd.update()
        end,
        {description = "mpc toggle", group = "widgets"}),
    awful.key({ modkey1, "Shift" }, "Down",
        function ()
            os.execute("mpc stop")
            beautiful.mpd.update()
        end,
        {description = "mpc stop", group = "widgets"}),
    awful.key({ modkey1, "Shift" }, "Left",
        function ()
            os.execute("mpc prev")
            beautiful.mpd.update()
        end,
        {description = "mpc prev", group = "widgets"}),
    awful.key({ modkey1, "Shift" }, "Right",
        function ()
            os.execute("mpc next")
            beautiful.mpd.update()
        end,
        {description = "mpc next", group = "widgets"}),
    awful.key({ modkey1, "Shift" }, "s",
        function ()
            local common = { text = "MPD widget ", position = "top_middle", timeout = 2 }
            if beautiful.mpd.timer.started then
                beautiful.mpd.timer:stop()
                common.text = common.text .. lain.util.markup.bold("OFF")
            else
                beautiful.mpd.timer:start()
                common.text = common.text .. lain.util.markup.bold("ON")
            end
            naughty.notify(common)
        end,
        {description = "mpc on/off", group = "widgets"}),
```

由于我没有安装mpc、mpd这一系列的东西，而且经过查看ArchWiki发现配置十分麻烦，而且我平日对多媒体控制按键的功能需求并不高，因此我打算去掉以上所有mpc、mpd相关的快捷键，使用系统自带的playerctl就好了。音量大小的调节可以直接用原先已写好的ALSA的配置即可。

最后我修改的配置文件如下：

```lua
--Media keys supported by vlc, spotify, audacious, xmm2, ...
    awful.key({}, "XF86AudioPlay", function() awful.util.spawn("playerctl play-pause", false) end),
    awful.key({}, "XF86AudioNext", function() awful.util.spawn("playerctl next", false) end),
    awful.key({}, "XF86AudioPrev", function() awful.util.spawn("playerctl previous", false) end),
    awful.key({}, "XF86AudioStop", function() awful.util.spawn("playerctl stop", false) end),
))
--Media keys supported by mpd.
    -- awful.key({}, "XF86AudioPlay", function () awful.util.spawn("mpc toggle") end),
    -- awful.key({}, "XF86AudioNext", function () awful.util.spawn("mpc next") end),
    -- awful.key({}, "XF86AudioPrev", function () awful.util.spawn("mpc prev") end),
    -- awful.key({}, "XF86AudioStop", function () awful.util.spawn("mpc stop") end),

    -- MPD control
    -- awful.key({ modkey1, "Shift" }, "Up",
    --  function ()
    --      os.execute("mpc toggle")
    --      beautiful.mpd.update()
    --  end,
    --  {description = "mpc toggle", group = "widgets"}),
    -- awful.key({ modkey1, "Shift" }, "Down",
    --  function ()
    --      os.execute("mpc stop")
    --      beautiful.mpd.update()
    --  end,
    --  {description = "mpc stop", group = "widgets"}),
    -- awful.key({ modkey1, "Shift" }, "Left",
    --  function ()
    --      os.execute("mpc prev")
    --      beautiful.mpd.update()
    --  end,
    --  {description = "mpc prev", group = "widgets"}),
    -- awful.key({ modkey1, "Shift" }, "Right",
    --  function ()
    --      os.execute("mpc next")
    --      beautiful.mpd.update()
    --  end,
    --  {description = "mpc next", group = "widgets"}),
    -- awful.key({ modkey1, "Shift" }, "s",
    --  function ()
    --      local common = { text = "MPD widget ", position = "top_middle", timeout = 2 }
    --      if beautiful.mpd.timer.started then
    --          beautiful.mpd.timer:stop()
    --          common.text = common.text .. lain.util.markup.bold("OFF")
    --      else
    --          beautiful.mpd.timer:start()
    --          common.text = common.text .. lain.util.markup.bold("ON")
    --      end
    --      naughty.notify(common)
    --  end,
    --  {description = "mpc on/off", group = "widgets"}),
```

现在键盘上所有的多媒体功能键全部都可以正常使用了！

### 设置自定义快捷键

最后在这里我们来提炼一下以上配置按键的内容，配置文件多看一看就能懂了，其实无非就这些事：

```lua
awful.key({}, "<KEYNAME>", function() awful.util.spawn("<YOUR TERMINAL COMMAND>", false) end),
awful.key({}, "<KEYNAME>", function () os.execute("<YOUR TERMINAL COMMAND>") end,
    {description = "<YOUR DISCRIPTION>", group = "<YOUR KEY GROUP NAME>"}), 
-- 如果加上了第三行这部分内容，你将会在帮助窗口中看到它。
```

::: tip

按键名称大多数情况下你可以通过执行 `xev`来查看你所按下按键的名称，但亲测发现功能性按键是无法看到名字的，或许会有别的办法，至少只是使用 `xev`是看不了的。

:::

### 配置显示器扩展方式

时隔许久，今天我终于学会如何配置显示器扩展方式了！实现的了灵感其实来自这条命令：

```shell
sudo journalctl
```

通过这个命令来查看日志。我翻看了它的记录，想知道问题到底出现在哪里，终于我看到了如下的信息：

```yaml
12月 12 20:48:32 BreezeShaneLaptop systemd[1]: Starting autorandr execution hook...
12月 12 20:48:32 BreezeShaneLaptop autorandr[11341]: Failed to load profile 'default': Profile not found (line 1420)
12月 12 20:48:32 BreezeShaneLaptop autorandr[11341]: autorandr running as user breezeshane (started from batch instance)
12月 12 20:48:32 BreezeShaneLaptop autorandr[11341]: Running autorandr as breezeshane for display :0
12月 12 20:48:32 BreezeShaneLaptop systemd[1]: autorandr.service: Deactivated successfully.
12月 12 20:48:32 BreezeShaneLaptop systemd[1]: Finished autorandr execution hook.
```

我这时才知道，系统有自带autorandr的，并且我目前没能扩展屏幕也正是因为缺少了关键的配置文件，于是我马上开始查询xrandr、arandr等相关资料，最后我终于弄明白如何调整了：

由于我在使用三个显示器，因此配置起来相对要麻烦些。

本次使用 `xrandr`中我用的参数有 `--output`、`--auto`、`--rate`、`--rotate`、`--left-to`和 `--above`。

- `--output`：该参数后面要写接口名称，表示输出到指定接口，可通过 `xrandr`查看当前显示器所有的接口名称。
- `--auto`：表示自动调节分辨率。
- `--rate`：该参数后面要写数值，表示设定刷新率。
- `--rotate`：该参数后面要写方向，表示屏幕翻转方向。
- `--left-to`：该参数后面要写接口名称，表示屏幕接在该接口对应屏幕的左侧，与之对应的有 `--right-to`。
- `--above`：该参数后面要写接口名称，表示屏幕接在该接口连接的屏幕的上方，与之对应的有 `--below`。

弄明白这些基本参数说明之后，要做的应该是选中一个位于高处的显示器为基准屏幕「可以不是Primary屏幕」，我选择了放在高处的横向屏幕，选择了向左扩展，然后在笔记本显示器这里选择了向上扩展，就这样扩展即可成功实现我的预期。

```shell
xrandr --output eDP-1 --auto --rate 60 --rotate normal --output DP-1 --auto --rate 60 --rotate left --left-of HDMI-1 --output HDMI-1 --auto --rate 60 --rotate normal --above eDP-1
```

但我是做完了这些之后才发现，有可以使用的GUI工具 `arandr`。。。

但是做这些其实还不够，这样修改只是临时修改，重启后还是一切还原的，因此我们还需要使用系统自带的 `autorandr`来实现，执行：

```shell
autorandr --save <YOUR_CONFIG_NAME>
autorandr --default <YOUR_CONFIG_NAME>
# 上面这一行是用来设置默认的显示器默认配置方案的。
```

这样当你插入接口时该系统会自动按照你配置好的方式扩展。

**不过先别急着开始做，在此之前你应该先将当前没有外接任何显示器的初始状态保存下来，你保存好这样的配置后，当你拔下接口的时候它就可以自动恢复到初始状态。**

到目前为止，它可以在插入时变更为三屏配置，拔出时变更为单屏配置，但还有个问题没解决：如果一开始就已经接好屏幕，它就直接采用默认配置——一律向右扩展。

(还没修好呢，再等等吧……)

### 配置标签布局

因为我在使用的屏幕中有一个是竖屏，但系统默认给每一个tag设置为tile布局，即横向平铺布局，如下图：

![](/images/ArcolinuxAndAwesomeWM.assets/image-20211215174833313.png)

那么它在竖屏这里出了什么问题？一图胜过千言万语：

![](/images/ArcolinuxAndAwesomeWM.assets/image-20211215175116794.png)

这种屏幕如果这样用，真心不舒服，不过我看到了[这个问答](https://qastack.cn/unix/78331/how-to-use-screen-rotation-in-awesome-wm-configuration)给出的解决方案：

> **提问：**
>
> 我正在使用[`xrandr`脚本](https://github.com/l0b0/tilde/blob/master/.screenlayout/right-tack.sh)来设置屏幕尺寸和旋转角度。在这种情况下，一个屏幕处于横向模式，另一个屏幕旋转。如何在[Awesome WM配置中](https://github.com/l0b0/tilde/blob/master/.config/awesome/rc.lua)检测到这种旋转？
>
> 目标是设置标签布局，以便沿屏幕的短轴划分窗口。即，`awful.layout.suit.tile`在横向模式下使用的标签将 `awful.layout.suit.tile.bottom`在纵向模式下使用。也就是说，而不是这样：
>
> ![](/images/ArcolinuxAndAwesomeWM.assets/ZdCM1.png)
>
> 我要这个：
>
> ![](/images/ArcolinuxAndAwesomeWM.assets/LPcau.png)
>
> **解答：**
>
> 假设您在以下布局中定义了以下布局 `rc.lua`：
>
> ```lua
> awful.layout.layouts = {
>    awful.layout.suit.tile,
>    awful.layout.suit.tile.bottom,
> }
> ```
>
> 使用 `awful.screen.connect_for_each_screen(func)`，您可以为每个现有的和将来创建的屏幕调用一个函数。您很有可能已经打过电话 `rc.lua`了（例如设置墙纸或创建标签）。根据您的配置，您需要以下内容：
>
> ```lua
> awful.screen.connect_for_each_screen(function(s)
>    if s.geometry.width >= s.geometry.height then
>      awful.tag({ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" }, s, awful.layout.layouts[1])
>    else
>      awful.tag({ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" }, s, awful.layout.layouts[2])
>    end
>  end)
> ```

起初我尝试了它给出的解决方案，但是我实践后发现，我直接这样用，会多出来另外十个tag，心里分外不解，于是我东查西查，最后也没能找到真正行之有效的方法。

但是，我要强调：<font size=7>`<a href="https://awesomewm.org/doc/api/index.html">`官方文档 `</a>`一定要常翻常看！`</font>`

最后我是查询了官方给出的API文档：「[Class tag](https://awesomewm.org/doc/api/classes/tag.html#)」。注意到文档给出的这个内容：

> **Creating tags**:
>
> The default config initializes tags like this:
>
> ```lua
> awful.tag(
>   { "1", "2", "3", "4", "5", "6", "7", "8", "9" },
>   s,
>   awful.layout.layouts[1]
> )
> ```

然后回看上面那个代码，这我才明白，这种写法，意思就是在新建十个tag。于是乎我去翻看了相关的配置文件，注意到了这两部分代码：

```lua
awful.util.tagnames = { "➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒", "➓" }
......
awful.layout.layouts = {
    awful.layout.suit.tile, -- 1
    awful.layout.suit.floating,
    awful.layout.suit.tile.left,
    awful.layout.suit.tile.bottom,  -- 4
    awful.layout.suit.tile.top,
    --awful.layout.suit.fair,
    --awful.layout.suit.fair.horizontal,
    --awful.layout.suit.spiral,
    --awful.layout.suit.spiral.dwindle,
    awful.layout.suit.max,
    --awful.layout.suit.max.fullscreen,
    awful.layout.suit.magnifier,
    --awful.layout.suit.corner.nw,
    --awful.layout.suit.corner.ne,
    --awful.layout.suit.corner.sw,
    --awful.layout.suit.corner.se,
    --lain.layout.cascade,
    --lain.layout.cascade.tile,
    --lain.layout.centerwork,
    --lain.layout.centerwork.horizontal,
    --lain.layout.termfair,
    --lain.layout.termfair.center,
}
......
awful.screen.connect_for_each_screen(function(s) beautiful.at_screen_connect(s)
    if s.geometry.width >= s.geometry.height then
      awful.tag({ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" }, s, awful.layout.layouts[1])
    else
      awful.tag({ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" }, s, awful.layout.layouts[4])
    end
    s.systray = wibox.widget.systray()
    s.systray.visible = true
 end)
```

现在很明显了，在第一行这里，从系统启动一开始就已经初始化十个tag了，然后到调用 `awful.screen.connect_for_each_screen`这个函数的时候，通过这个语句 `awful.tag`就又创建新的十个tag，因此对应的解决办法显然是——删除 `awful.util.tagnames`内的所有内容。

不是删除 `awful.util.tagnames`！不是删除 `awful.util.tagnames`！不是删除 `awful.util.tagnames`！删除它会改崩桌面系统的，因为初始化的基本容器被删掉了，`awful.tag`在尝试加入新的tag时会找不到这个基本容器，所以设置为空即可，修改后的代码如下：

```lua
awful.util.tagnames = {  }
......
awful.layout.layouts = {
    awful.layout.suit.tile, -- 1
    awful.layout.suit.floating,
    awful.layout.suit.tile.left,
    awful.layout.suit.tile.bottom,  -- 4
    awful.layout.suit.tile.top,
    --awful.layout.suit.fair,
    --awful.layout.suit.fair.horizontal,
    --awful.layout.suit.spiral,
    --awful.layout.suit.spiral.dwindle,
    awful.layout.suit.max,
    --awful.layout.suit.max.fullscreen,
    awful.layout.suit.magnifier,
    --awful.layout.suit.corner.nw,
    --awful.layout.suit.corner.ne,
    --awful.layout.suit.corner.sw,
    --awful.layout.suit.corner.se,
    --lain.layout.cascade,
    --lain.layout.cascade.tile,
    --lain.layout.centerwork,
    --lain.layout.centerwork.horizontal,
    --lain.layout.termfair,
    --lain.layout.termfair.center,
}
......
awful.screen.connect_for_each_screen(function(s) beautiful.at_screen_connect(s)
    if s.geometry.width >= s.geometry.height then
      awful.tag({ "➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒", "➓" }, s, awful.layout.layouts[1])
    else
      awful.tag({ "➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒", "➓" }, s, awful.layout.layouts[4])
    end
    s.systray = wibox.widget.systray()
    s.systray.visible = true
 end)
```

问题已经完美解决👍！

### 配置桌面壁纸问题

(还没修好呢，再等等吧……)

### 修改主机名

执行如下命令即可：

```shell
sudo hostnamectl set-hostname <NAMEYOULIKE>
```

### 给URxvt添加多标签功能

修改 `~/.Xresources`文件，搜索其中的 `URxvt.perl-ext-common`字样，在后面添加 `,tabbed`后执行 `xrdb -merge ~/.Xresources`即可。

### 让URxvt支持组合键

如果你喜欢使用 `<kbd>`Ctrl `</kbd>`+`<kbd>`Arrow `</kbd>`类的组合键，但是你发现它在URxvt这里并不生效，其实是需要修改 `~/.Xresources`配置文件的：

在该文件下任意一个比较合适的地方添加如下的配置：

```ini
! enable some control keymap.
URxvt.keysym.Control-Up:     \033[1;5A
URxvt.keysym.Control-Down:   \033[1;5B
URxvt.keysym.Control-Left:   \033[1;5D
URxvt.keysym.Control-Right:  \033[1;5C
```

然后执行 `xrdb -merge ~/.Xresources`，重启一下，即可生效。

### 添加锁屏功能

::: danger 风险提示

使用这个东西时应该做好心理准备，我使用一段时间后发现它有个缺陷，不知是什么时候，它就可能彻底锁死计算机。

这里锁死的含义就是即使你输入了十分正确的密码，依旧会认为你输入错误。

也正是这种原因，我弃用了这个锁屏。

:::

如果希望能使用热键来锁定系统的话，需要稍微折腾一下，下载安装 `xscreensaver`，执行：`sudo pacman -S xscreensaver`，然后要编辑 `~/.xinitrc`文件，在结尾处添加：`xscreensaver -no-splash &`，并且需要在 `~/.Xresources`文件中寻找 `my_table.join`的字样，添加：

```lua
awful.key({ modkey }, "l", function () awful.util.spawn( "xscreensaver-command -lock" ) end,
    { description = "Screen lock", group = "global keys" }),
```

然后按下 `<kbd>`Alt `</kbd>`+`<kbd>`Shift `</kbd>`+`<kbd>`R `</kbd>`重启一下AwesomeWM即可生效。

按理说这时候应该每次开机启动都可以生效的，但我发现并没有，于是我就修改了 `~/.config/awesome/autostart.sh`来设定自动启动 `xscreensaver`。

```shell
vim ~/.config/awesome/autostart.sh
# 按下G跳转到最后一行，再按下Shift+4跳转到最后一个字符，添加下面一行
run xscreensaver -no-splash
```

保存退出后即可自动启动该程序。

### Virtual Machine Manager安装与配置

即使目前我已经是全栈使用Linux，但总会有那种时候，我是必须要使用Windows才行的，而我已经把原来的Windows系统完全删除掉了，因此我必须提前做好准备，先安装配置好虚拟机来以备不时之需。

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

### 手动安装字体

因为URxvt的字体支持问题，我在使用Powerlevel10k时发现无法使用Unicode字符，因此需要按照官方文档给出的Manual Install方式去做：

1. 先下载字体，我选择了官方文档给出的[MesloLGS NF Regular](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)下载链接。
2. 下载后将它移动到 `/usr/share/fonts/awesome-terminal-fonts`下。
3. 执行 `fc-cache -vf`来刷新字体库缓存。

### 更改URxvt字体

安装好字体后，需要编辑 `～/.Xresources`文件，找到其中的段落：

```
! fonts
URxvt.letterSpace: 	    		-1
URxvt.font:                 	xft:Monospace:regular:size=11
URxvt.imFont:               	xft:Monospace:regular:size=11
URxvt.italicFont:           	xft:Monospace:italic:size=11
URxvt.boldFont:             	xft:Monospace:bold:size=11
URxvt.boldItalicFont:     	    xft:Monospace:regular:size=11
! run :.!fc-list | grep <font-name>
```

改成如下即可：

```
! fonts
URxvt.letterSpace: 	    		-1
URxvt.font:                 	xft:MesloLGS NF-20
URxvt.imFont:               	xft:MesloLGS NF-20
URxvt.italicFont:           	xft:MesloLGS NF-20
URxvt.boldFont:             	xft:MesloLGS NF-20
URxvt.boldItalicFont:     	    xft:MesloLGS NF-20
! run :.!fc-list | grep <font-name>
```

保存退出后还需要执行 `xrdb -m ~/.Xresources`

重启一下终端，你就可以看到字体已被启用了。

### 组合键安全从容应对关机/重启卡死问题

最近发现每次重启都要等好久才能正常关机、重启，一般等一分半也就行了，但后来我发现，有的时候它会是这样做的：

一直等待进程结束，写的上限是1min 30s，但到这个时间后又给上限加长，改到3min......最离谱的一次是直接让我等了十分钟多。

于是我终于忍不了了，想起朋友有使用组合键就能完成强制重启，几番查找后发现，原来是使用了Magic SysRq组合键。

::: tip 维基百科

Magic SysRq组合键是一串能直接与Linux 内核沟通的组合键，允许用户就算在系统进入死循环濒临崩溃时，直接调用系统底层将资料写入文件系统或重启，避免尚未写入文件系统与硬盘的数据在关机后消失。效果类似于电脑上的电源键或重启键，但能执行更多操作。

此组合键提供一系列在系统崩溃时常用到的功能，比如上述的写入数据，或关闭 X Server 、Kill 进程、卸载 文件系统，也通常是死机时的最后手段。

但在 linux 核心停止运作的情况下 Magic SysRq 无效，例如 kernel panic。

:::

但是这个组合键功能在Arch系这里是默认关闭的。为了使用这个功能，我们需要做以下操作来开启这个功能：

首先执行 `sudo echo "kernel.sysrq = 1" > /etc/sysctl.d/99-sysctl.conf`来写入开启状态。

然后执行如下命令：

<CodeGroup>
<CodeGroupItem title="重载系统所有配置">
```shell
sudo sysctl --system
```

</CodeGroupItem>

<CodeGroupItem title="仅重载99-sysctl.conf配置文件">
```shell
sudo sysctl --load=/etc/sysctl.d/99-sysctl.conf
```

</CodeGroupItem>
</CodeGroup>

这样我们就启用了Magic SysRQ功能，下面我们看看如何使用这个功能：

|                            KeyBoard Shortcut                            |                Illustration                |
| :---------------------------------------------------------------------: | :-----------------------------------------: |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`R `</kbd>` |            从 X 收回对键盘的控制            |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`E `</kbd>` | 向所有进程发送 SIGTERM 信号，让它们正常终止 |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`I `</kbd>` |  向所有进程发送 SIGKILL 信号，强制立即终止  |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`S `</kbd>` |             将待写数据写入磁盘             |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`U `</kbd>` |     卸载所有硬盘然后重新按只读模式挂载     |
| `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`B `</kbd>` |                    重启                    |

通常我们在关机/重启之前都会做好保存工作，因此一般而言执行这三步就可以了：

1. `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`R `</kbd>`
2. `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`E `</kbd>`
3. `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`I `</kbd>`

::: warning 注意

第二步和第三步之间最好隔开1～2秒，不然做完第二步后立刻做第三步的话有可能导致有些本可以正常结束的进程被意外终止掉的结果，因此稍微等一下是妥当的做法。

另外，第一步是关键，如果不夺取键盘，后面你试图发送的任何信息都无法发送。要说话，就得先抢过来“话筒”。

:::

当系统中有内核高耗的进程导致系统卡顿时，可以使用 `<kbd>`Alt `</kbd>`+`<kbd>`SysRq `</kbd>`+`<kbd>`F `</kbd>` Magic SysRq 组合键唤醒 Linux Kernel 的 OOM（out of memory） Killer 杀死这些进程。使用这个组合键可以减少因内存高耗导致重启系统的次数，OMM Killer使用启发算法选取当前系统内存占用最高且不重要的进程进行杀死，所以当系统内存占用不高的情况下还是需要慎用。

有关Magic SysRq的所有功能按键可以[点此查看](./MagicSysRq.md)

### ArcoLinux/ArchLinux 报错 GPGME Error: no data 的解决方式

解决方式其实非常粗暴, 直接执行`sudo rm -R /var/lib/pacman/sync`, 然后再重新尝试系统更新即可解决.

**后日谈**: 于是我就思考这个文件夹究竟是怎么回事, 怎么删掉之后就正常了, 那不是一开始就不应该存在吗?

其实不然, 我查看了[ArchWiki](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))中**数据库结构**给出的解释.

::: info

pacman数据库通常位于`/var/lib/pacman/sync`. 对于每一个在`/etc/pacman.conf`中指定的软件仓库， 这里都有一个一致的数据库。数据库文件夹里每个tar.gz文件都包含着一个仓库的软件包信息。

:::

这也就是说, 每一次更新, pacman都会直接读取数据库并向镜像源发送请求来比对, 之后更新数据库, 那么我们这里出现的报错`GPGME Error: no data`其实就是镜像源上已经没有了这些数据, 换言之就是不支持这样旧的软件包了, 因此我们直接删掉之后, pacman会自动重新获取来做一次大更新.

### 多版本CUDA安装与管理

其实这个需求的实现还是比较容易的, 基本思路就是将多个版本的CUDA下载并安装好之后, 建立软链接来由系统调用这个软链接, 这样当我们需要使用什么版本的CUDA, 就只需要修改软链接的指向目标即可. 

在这个系统下, CUDA都是安装在`/opt/`目录下的, 如果发现当前你已经有CUDA并且它的目录名字就是CUDA的话, 我们需要先重命名一下, 最好能反映它所代表的版本号(为了便于表述, 我们在这里假定你命名为`cuda-23.3`). 

然后我们需要安装另外一个或几个不同版本的CUDA, 并分别重命名好对应的合适的名字. 最后我们需要执行:
```shell
sudo ln -s /opt/cuda-23.3 /opt/cuda
```
这样系统使用`/opt/cuda`时就是在使用`cuda-23.3`了. 

当你想切换其他版本的时候, 你需要先删除`/opt/cuda`这个软链接, 然后再重新创建指向别的版本CUDA的软链接即可.

::: tip

你可以执行`nvcc --version`来查看你当前CUDA的版本.

:::

### 

我在使用git clone, yay, pacman等的时候遇到类似以下的报错:

::: danger Error

❯ git clone https://github.com/opengauss-mirror/openGauss-OM
                                                            
Cloning into 'openGauss-OM'...
/usr/lib/git-core/git-remote-https: /home/breezeshane/openGauss/lib/libcurl.so.4: no version information available (required by /usr/lib/git-core/git-remote-https)
fatal: unable to access 'https://github.com/opengauss-mirror/openGauss-OM/': error setting certificate verify locations:
  CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none

:::

虽然我无法查证错误原因的来源, 但还是能解决这个问题, 它既然缺少了东西, 我们再加上就是.

这个报错是在说, `curl`预期`ca-bundle.crt`应该位于`/etc/pki/tls/certs/`下, 但实际上它`ca-certificates.crt`(名字不一样但实际还是一样的)却位于`/etc/ssl/certs/`, 因此我们要做的是:
```shell
sudo mkdir -p /etc/pki/tls/certs
sudo cp /etc/ssl/certs/ca-certificates.crt /etc/pki/tls/certs/ca-bundle.crt
```

当然你也可以直接利用强大的软链接来达到目的, 相应的命令应该是:
```shell
sudo mkdir -p /etc/pki/tls/certs
sudo ln -s /etc/ssl/certs/ca-certificates.crt /etc/pki/tls/certs/ca-bundle.crt
```