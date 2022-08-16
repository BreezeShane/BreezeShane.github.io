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

   在笔记本电脑上通常是按下<kbd>F12</kbd>或者<kbd>F2</kbd>来进入EFI启动选项界面，选择你的USB即可。
3. **使用GParted手动划分硬盘分区。**我是折腾许久都无果失败后找到大佬帮助的，这才弄明白原来真正需要做的是：为你的系统划分一个EFI启动引导分区，推荐大小为 `512MB`，虽然我真正安装后才知道实际只用了 `1.30MB`，再划分好硬盘的一部分空间来存放你的系统，剩下的就用来存放你的数据，但要注意，划分好后别急着点击下一步，我们还有非常重要的配置还没写——先选择Manual partitioning选项，然后选择好刚才那个EFI启动引导分区，编辑它的属性，将flag修改为 `/boot/efi`，一般不用选中 `grub-boot`；然后将存放数据的硬盘分区中属性的flag一项修改为 `/`。其他选项则自由发挥，自己安排，值得一提的是，我这次没有选择使用Plasma桌面系统，而是选择了AwesomeWM，因为我确信学会熟练使用它会大幅提高我的工作效率。
4. 等待安装好后就可以拔掉系统盘了，至此你的系统已经可以安装完毕了。

## ArcoLinux配置

> 由于我之前已经有过Manjaro安装配置的经验了，这次安装配置ArcoLinux也就顺利多了。两者都是基于ArchLinux的发行版，安装与配置的思路也是差不多的。

**「注意」**：AwesomeWM桌面系统与常见的桌面系统是完全不一样的逻辑，常见的桌面系统如Windows、Plasma/KDE、GNOME、XFCE等都是堆栈式桌面布局，而AwesomeWM和i3两者都是平铺式桌面布局，因此使用上有较大区别，最明显的是从前你所记住的绝大多数快捷键在这里全部无效，原因都是对不上号，执行同一功能的两个桌面系统对应的快捷键是截然不同的。出于这样的原因，我会在文章中穿插描述AwesomeWM的使用方式。

**「重点」**：AwesomeWM的配置文件在：`~/.config/awesome/rc.lua`这里，使用的语言正如你所见，是Lua。另外在学习使用的时候请按<kbd>Meta</kbd>+<kbd>S</kbd>打开帮助窗口来查看各种操作的使用，建议都亲自敲一遍，这样入门快。

开局第一步：换源。

**按下<kbd>Meta</kbd>+<kbd>ENTER</kbd>或者<kbd>Meta</kbd>+<kbd>T</kbd>打开终端。**为pacman添加archlinuxcn镜像源，需要将如下内容写入 `/etc/pacman.conf`内：

```shell
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

然后配置yay的镜像源顺序，要编辑 `/etc/pacman.d/mirrorlist`，良心的是这个文件下已经将全球所有的镜像源都加入其中了，我们要做的是将文件后面的China部分移动到前面即可。我的做法是先sudo vim /etc/pacman.d/mirrorlist，然后用鼠标选中China这一部分的地址，键盘输入<kbd>"+y</kbd>(表示复制选中的内容到系统剪贴板📋)，然后将光标移动到文件开头，直接用键盘键入<kbd>p</kbd>即可将刚才复制的内容粘贴上去，保存退出即可。

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

现在是想让Fcitx5开机自启动，那就可以把上面代码中的 `NAME`改为 `fcitx5`。保存之后，建议执行 `awesome -k`来检查有无语法错误，最后可以按下<kbd>Meta</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>来重启AwesomeWM。注意，这样做也意味着每次你按下这一组快捷键，autorunApps数组里面的所有应用都会再次启动一次。现在重启一下就可以正式投入使用了。

:::

::: tip 简洁思路

其实直接按下<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd>启动软件菜单，运行一下Fcitx5 Configuration后调整输入法设置即可，无需手动添加启动项。

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

但是，我要强调：<font size=7><a href="https://awesomewm.org/doc/api/index.html">官方文档 </a>一定要常翻常看！</font>

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

::: details 参考资料

1. [Nitrogen - Archwiki](https://wiki.archlinux.org/title/nitrogen)
2. [xrandr - Archwiki](https://wiki.archlinux.org/title/xrandr)
3. [Arch Linux下的外接显示器](https://codeantenna.com/a/oza5CQSPDi)
4. [udev - Archwiki](https://wiki.archlinux.org/title/Udev#Execute_when_HDMI_cable_is_plugged_in_or_unplugged)
5. [Xorg - Archwiki](https://wiki.archlinux.org/title/Xorg_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BD%BF%E7%94%A8_.conf_%E6%96%87%E4%BB%B6)
6. [Multihead - Archwiki](https://wiki.archlinux.org/title/Multihead_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E7%94%A8xrandr%E9%85%8D%E7%BD%AE)
7. [Gtk-WARNING **: 22:21:47.873: cannot open display:1 / xhost : unable to open display:1](https://askubuntu.com/questions/1337680/gtk-warning-222147-873-cannot-open-display1-xhost-unable-to-open-dis/1337696#1337696?newreg=083e0066695b49ccbb9a3743503e04e2)

:::

::: info 前言

现在我是正在使用三个电脑屏幕，左侧屏幕是垂直方向，右侧屏幕和下侧屏幕都是是水平方向，因为variety软件设置壁纸对多屏适应有些问题，我就卸载掉了variety，为了简便设置壁纸，就打算三个屏幕分别设置壁纸即可，又因为我存有的壁纸量比较大，于是打算采用随机抽取的方式去设置。过了很久才找到比较合适自己的解决方案。

:::

偶然心血来潮，翻看了一下系统的配置文件，然后意外发现nitrogen这个软件的存在，尝试使用之后发现它应该就是我希望的解决方案的关键。

经过试用nitrogen之后暂时想到的比较朴素的做法是直接写一个脚本`wpch`来完成壁纸切换：
```shell
#!/bin/sh
nitrogen --head=0 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Horizontal > /dev/null 2>&1
nitrogen --head=1 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Horizontal > /dev/null 2>&1
nitrogen --head=2 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Rotated > /dev/null 2>&1
```
然后我需要在终端运行这个脚本。

这种方法确实操作起来有点麻烦，哪怕是我把脚本添加到环境变量之后可以直接使用`wpch`命令来执行脚本。是的，做到这里显然感觉还是不够方便。

于是我想到暂时使用自动定时服务来代替我做这个事，正好可以自动化处理一下，于是执行`crontab -e`，添加如下语句：
```shell
* * * * * sh $HOME/Scripts/wpch
```
但不幸的是我发现毫无反应，通过`journalctl -f`监视活动三回之后才发现有个警告，查询了一下才知道，在执行nitrogen的时候它是不知道应该修改哪一个显示设置的，因此无法操作，查询了相关解决方案之后才知道，需要有一个环境变量来指定需要修改的显示设置，于是我在刚才的脚本中添加了一行语句：
```shell
export DISPLAY=:0
```
这样我的脚本最终的样子应该是这个：
```shell
#!/bin/sh
export DISPLAY=:0
nitrogen --head=0 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Horizontal > /dev/null 2>&1
nitrogen --head=1 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Horizontal > /dev/null 2>&1
nitrogen --head=2 --random --set-zoom-fill /home/breezeshane/AppData/Wallpapers/Rotated > /dev/null 2>&1
```

这样就可以自动多屏幕切换壁纸了。

但是现在问题算解决了吗？不，其实还有一件事：当我尝试拔掉/插上HDMI和DP线的时候它并不会聪明地自动为我做适配。现在暂时想到的解决方案是写一个udev触发事件配置，使其在我插入/拔掉的时候触发执行我的脚本。

创建文件`/etc/udev/rules.d/95-hdmi-plug.rules`，并向其中写入：
```
ACTION=="change",
SUBSYSTEM=="drm",
ENV{DISPLAY}=":0",
ENV{XAUTHORITY}="/home/username/.Xauthority",
RUN+="/home/breezeshane/Scripts/wpch"
```

保存后重新启动，这个脚本就可以正常运作了，但是在这里又遇到了新的问题：因为我要插入两根线，从开始插入到完成插入要持续比较长的时间，在这一段时间内，这个规则会被持续触发，换很多次壁纸，直到完成插入后两道三秒这样结束。

我正在想这个问题该怎么解决。

### 修改主机名

执行如下命令即可：

```shell
sudo hostnamectl set-hostname <NAMEYOULIKE>
```

### 给URxvt添加多标签功能

修改 `~/.Xresources`文件，搜索其中的 `URxvt.perl-ext-common`字样，在后面添加 `,tabbed`后执行 `xrdb -merge ~/.Xresources`即可。

### 让URxvt支持组合键

如果你喜欢使用<kbd>Ctrl</kbd>+<kbd>Arrow</kbd>类的组合键，但是你发现它在URxvt这里并不生效，其实是需要修改 `~/.Xresources`配置文件的：

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

使用这个东西时应该做好心理准备，我使用一段时间的`Xscreensaver`后发现它有个缺陷，不知是什么时候，它就可能彻底锁死计算机。

这里锁死的含义就是即使你输入了十分正确的密码，依旧会认为你输入错误。

也正是这种原因，我弃用了这个锁屏程序。

<details>

如果希望能使用热键来锁定系统的话，需要稍微折腾一下，下载安装 `xscreensaver`，执行：`sudo pacman -S xscreensaver`，然后要编辑 `~/.xinitrc`文件，在结尾处添加：`xscreensaver -no-splash &`，并且需要在 `~/.Xresources`文件中寻找 `my_table.join`的字样，添加：

```lua
awful.key({ modkey }, "l", function () awful.util.spawn( "xscreensaver-command -lock" ) end,
    { description = "Screen lock", group = "global keys" }),
```

然后按下<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>重启一下AwesomeWM即可生效。

按理说这时候应该每次开机启动都可以生效的，但我发现并没有，于是我就修改了 `~/.config/awesome/autostart.sh`来设定自动启动 `xscreensaver`。

```shell
vim ~/.config/awesome/autostart.sh
# 按下G跳转到最后一行，再按下Shift+4跳转到最后一个字符，添加下面一行
run xscreensaver -no-splash
```

保存退出后即可自动启动该程序。

<summary>之前采用的方案是什么？</summary>
</details>

:::

后来我浏览到以下两个网站之后就来了思路了：
 - [Your preferred way of locking the screen - reddit](https://www.reddit.com/r/awesomewm/comments/dabt30/your_preferred_way_of_locking_the_screen/)
 - [i3/i3lock - GitHub](https://github.com/i3/i3lock)

我从中第一次听说`i3lock`这个轻量级的锁屏程序，于是决定使用一下，意外地发现其实系统自带。

于是我参照了官方文档，写了一个脚本用来配置锁屏样式：
```shell
#!/bin/sh

image_path='/home/breezeshane/AppData/Wallpapers/Horizontal/wallhaven-1krqpv.png'

i3lock --screen=1 \
       --image=$image_path \
       --nofork \
       --fill \
       --clock \
       --indicator \
       --radius 230 \
       --date-str="%Y-%m-%d->%a" \
       --date-color=#40de5a \
       --date-size=30 \
       --time-str="%H:%M:%S" \
       --time-color=#c0ebd7 \
       --time-size=100 \
       --verif-text="Connecting to Neural Network…" \
       --wrong-text="Connection Failed!" \
       --noinput-text="no input" \
       --lock-text="locking…" \
       --lockfailed-text="lock failed!" \
       --greeter-text="PTRS Working as Agent..." \
       --greeter-color=#f2fdff \
       --ignore-empty-password \
```

虽然当时我看到有`--slideshow-random-selection`这个选项，但是在我使用的时候发现它严重拖慢了锁屏的运行速度，所以才决定弃用。另外，如果不打算直接使用别人写的脚本而是自己做配置的话，有个比较好用的选项就是`--no-verify`，这样每次调整的时候都不必输入正确密码（虽然我是调整完后才发现的），不过记得调整好之后要去掉。

写完这个脚本之后，我还希望通过快捷键来触发执行这个脚本，于是我编辑了`$HOME/.config/awesome/rc.lua`配置文件，修改以下部分，将想触发的事件添加到其中：
```lua
globalkeys = my_table.join(

    -- {{{ Personal keybindings
    awful.key({ modkey, "Shift" }, "l", function () awful.util.spawn_with_shell( "sh ~/Scripts/screen-lock.sh" ) end,
    	{ description = "Screen lock", group = "global keys" }),
    -- ……………………
)
```

注意，要执行脚本，应该调用系统API`awful.util.spawn_with_shell`，如果调用`awful.util.spawn`是不会有任何响应的，可能是因为它们在底层实现不一样，这里我没细追究。

最后重启一下AwesomeWM就可以正常使用快捷键锁屏了。

::: tip 意外的发现

我发现在这里即使是快捷键发生了冲突，AwesomeWM也不会做任何提示，而是直接使用最后的配置来覆盖掉前面冲突的配置，因此最开始我本是希望使用<kbd>Super</kbd>+<kbd>L</kbd>来实现的，结果和后面的移动鼠标到某一屏幕的相关快捷键冲突了，便只好修改。

:::

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
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>R</kbd> |            从 X 收回对键盘的控制            |
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>E</kbd> | 向所有进程发送 SIGTERM 信号，让它们正常终止 |
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>I</kbd> |  向所有进程发送 SIGKILL 信号，强制立即终止  |
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>S</kbd> |             将待写数据写入磁盘             |
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>U</kbd> |     卸载所有硬盘然后重新按只读模式挂载     |
|<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>B</kbd> |                    重启                    |

通常我们在关机/重启之前都会做好保存工作，因此一般而言执行这三步就可以了：

1.<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>R</kbd>
2.<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>E</kbd>
3.<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>I</kbd>

::: warning 注意

第二步和第三步之间最好隔开1～2秒，不然做完第二步后立刻做第三步的话有可能导致有些本可以正常结束的进程被意外终止掉的结果，因此稍微等一下是妥当的做法。

另外，第一步是关键，如果不夺取键盘，后面你试图发送的任何信息都无法发送。要说话，就得先抢过来“话筒”。

:::

当系统中有内核高耗的进程导致系统卡顿时，可以使用<kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>F</kbd> Magic SysRq 组合键唤醒 Linux Kernel 的 OOM（out of memory） Killer 杀死这些进程。使用这个组合键可以减少因内存高耗导致重启系统的次数，OMM Killer使用启发算法选取当前系统内存占用最高且不重要的进程进行杀死，所以当系统内存占用不高的情况下还是需要慎用。

有关Magic SysRq的所有功能按键可以[点此查看](./MagicSysRq.md)

### ArcoLinux/ArchLinux 报错 GPGME Error: no data 的解决方式

解决方式其实非常粗暴, 直接执行`sudo rm -R /var/lib/pacman/sync`, 然后再重新尝试系统更新即可解决.

**后日谈**: 于是我就思考这个文件夹究竟是怎么回事, 怎么删掉之后就正常了, 那不是一开始就不应该存在吗?

其实不然, 我查看了[ArchWiki](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))中**数据库结构**给出的解释.

::: info

pacman数据库通常位于`/var/lib/pacman/sync`. 对于每一个在`/etc/pacman.conf`中指定的软件仓库， 这里都有一个一致的数据库。数据库文件夹里每个tar.gz文件都包含着一个仓库的软件包信息。

:::

这也就是说, 每一次更新, pacman都会直接读取数据库并向镜像源发送请求来比对, 之后更新数据库, 那么我们这里出现的报错`GPGME Error: no data`其实就是镜像源上已经没有了这些数据, 换言之就是不支持这样旧的软件包了, 因此我们直接删掉之后, pacman会自动重新获取来做一次大更新.

### git, yay, pacman等下载出现报错

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

### 多版本GCC安装与管理

与上节的多版本CUDA安装与管理原理基本一致, 这里就只给出gcc的路径了, 使用`ls /usr/bin/gcc*`即可查看所有的gcc, 然后通过软链接来做好版本切换.

### 安装Trello时遇到的未知错误(该错误因不了解底细而无法确定名字)

最近不知道干了啥, yay还是出现了错误:

::: danger Error

```shell
node: /home/breezeshane/openGauss/lib/libstdc++.so.6: version `GLIBCXX_3.4.29' not found (required by node)
node: /home/breezeshane/openGauss/lib/libstdc++.so.6: version `GLIBCXX_3.4.26' not found (required by node)
==> ERROR: A failure occurred in package().
    Aborting...
 -> error making: trello-cli
```

:::

原因: 这是因为之前我安装了openGauss修改了LD_LIBRARY_PATH环境变量导致yay在安装依赖node的程序时自动使用该环境变量导致这个问题, 很自然地就可以想到的一个解决方案是在`.zshrc`里去掉或注释LD_LIBRARY_PATH环境变量设置的语句.

但实际上这两者并非互不相容, 我们其实可以修改一下环境变量的配置:
```shell
export LD_LIBRARY_PATH="$HOME/openGauss/lib:$LD_LIBRARY_PATH"
# 原来的配置

export LD_LIBRARY_PATH="/usr/lib:$HOME/openGauss/lib:$LD_LIBRARY_PATH"
# 后来的配置
```

::: warning 注意

环境变量LD_LIBRARY_PATH内是有序的, 软件在使用的时候会按照优先级从前向后遍历, 因此才写`/usr/lib:$HOME/openGauss/lib:$LD_LIBRARY_PATH`而不是`$HOME/openGauss/lib:/usr/lib:$LD_LIBRARY_PATH`

:::

### Atom安装WakaTime插件失败

我在Atom中尝试安装WakaTime插件时失败, 得到了如下的报错:

::: danger Error

```shell
Installing “wakatime@11.0.10” failed.Hide output…
node:internal/fs/utils:344
    throw err;
    ^

Error: ENOENT: no such file or directory, open '/usr/lib/electron11/version'
    at Object.openSync (node:fs:585:3)
    at Object.readFileSync (node:fs:453:35)
    at Object.<anonymous> (/usr/lib/node_modules/atom-package-manager/bin/apm:7:88)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47 {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: '/usr/lib/electron11/version'
}
```

:::

然后我去检查了一下Electron的情况, 然后发现:

```shell
❯ ls /usr/lib/ | grep electron
electron
electron13
electron6
electron9
```

果然我是没有Electron11, 于是我只需要安装一下即可, `sudo pacman -S electron11`.

这时候就可以正常安装WakaTime插件了.

### 关于系统内核不能处理DURGOD K330W的蓝牙通信的Bug

不知道大概什么时候开始, 键盘就有些问题了, 连媒体功能键都不能发挥作用, 尝试蓝牙断开再连接甚至删除设备重新连接都不能解决, 于是我只好去查看系统日志, 执行了`journalctl -f`来实时跟进, 结果看到了这个报错:

::: danger Error

```shell
4月 02 10:05:03 Arknights kernel: Bluetooth: hci0: Opcode 0x2043 failed: -110
4月 02 10:05:03 Arknights kernel: Bluetooth: hci0: request failed to create LE connection: err -110
```

:::

我尝试去检索报错, 结果只能匹配到1~3条的结果, 然而还基本都是不相关的. 于是这个报错我停了一天, 想了许久, 感觉实在没啥办法, 却意外找到了相应的解决方法, 这个解决方法的确很离谱, 但亲测有效, 至于为啥能解决我也不懂了.

::: details 解决方法

请一个劲地乱敲键盘, 把你知道的所有快捷键都敲个遍, 就好了.(迫真)

情景还原的话, 当时我是一个劲胡乱按下字母键, 又乱敲多媒体功能键(键盘上是用组合键实现的), 接着我就又敲回去一堆字母, 最后是在输入方向键的时候发现有反应了的, 然后这时候尝试多媒体功能键, 发现有作用了, 遂逐一测试发现一切功能正常.

:::

但是凭经验判断, 这大概治标不治本, 所以记一下就现在这里挖个坑, 留一下伏笔.

好吧, 没隔多久还是出毛病了, 这回报错有新的内容了:

::: danger Error

```shell
4月 02 14:07:04 Arknights systemd-logind[559]: Watching system buttons on /dev/input/event18 (DURGOD K330w Keyboard)
4月 02 14:07:07 Arknights tlp[91713]: Warning: systemd-rfkill.service is not masked, radio device switching may not work as configured.
4月 02 14:07:07 Arknights tlp[91713]: >>> Invoke 'systemctl mask systemd-rfkill.service' to correct this.
4月 02 14:07:07 Arknights tlp[91713]: Warning: systemd-rfkill.socket is not masked, radio device switching may not work as configured.
4月 02 14:07:07 Arknights tlp[91713]: >>> Invoke 'systemctl mask systemd-rfkill.socket' to correct this.
4月 02 14:07:50 Arknights kernel: Bluetooth: hci0: Opcode 0x2043 failed: -110
4月 02 14:07:50 Arknights kernel: Bluetooth: hci0: request failed to create LE connection: err -110
4月 02 14:07:54 Arknights kernel: input: DURGOD K330w Keyboard as /devices/virtual/misc/uhid/0005:090A:01C1.000F/input/input48
4月 02 14:07:54 Arknights kernel: input: DURGOD K330w Mouse as /devices/virtual/misc/uhid/0005:090A:01C1.000F/input/input49
4月 02 14:07:54 Arknights kernel: hid-generic 0005:090A:01C1.000F: input,hidraw1: BLUETOOTH HID v1.09 Keyboard [DURGOD K330w] on 98:af:65:c9:1a:fc
4月 02 14:07:55 Arknights systemd-logind[559]: Watching system buttons on /dev/input/event18 (DURGOD K330w Keyboard)
4月 02 14:08:04 Arknights kernel: Bluetooth: hci0: Opcode 0x 401 failed: -16
```

:::

那么怎么解决呢?

尝试维修了两天, 终于是确定了, 问题出现在键盘上了, 现在已经邮寄回去进行返厂检修了......

> **后日谈**：虽然厂家检测两回都表示没问题，而且我严重怀疑他们只在Windows/Mac系统下做测试而没有管Linux，但是还是同意给我换新了，换新后的键盘拿回来再次测试，发现还是没法正常使用，即使是蓝牙连接成功了，这个键盘仍旧无法打字，按下任何键没有任何响应。最终我只能确定，是厂家自己修改了蓝牙协议导致与现行Linux核完全不兼容。最后咋解决呢？我已经挂二手市场上卖掉了。

### 关于Linux系统下键盘的F1～F12键无法响应的问题

> [参考资料](https://mikeshade.com/posts/keychron-linux-function-keys/)

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

现在我们再分析一下为什么这样做会有效：

首先要知道Linux系统下一切皆是文件，这当然包括你的设备。而我们这个操作实际上在做的就是调整设备参数。`fnmode`文件内存放的内容是一位二进制码，`0`表示默认不按下<kbd>Fn</kbd>，而`1`自然表示默认按下<kbd>Fn</kbd>了。这样问题自然很容易复现了：我们在尝试按下<kbd>F1</kbd>～<kbd>F12</kbd>的时候，<kbd>Fn</kbd>键已经相当于是按下了，这样的话自然是直接使用其对应的多媒体功能键，那么就算我再按下<kbd>Fn</kbd>当然也无济于事了，因此这个文件我们需要置零。

### Okular等pdf阅读器无法显示中文

也不知道最近做了什么，当我打开TexStudio的时候我发现除了英文字符和公式，其余所有中文字符全部消失不见。开始我还以为是编译问题，但编译几回都没发现什么问题，直到我打开以前生成过的正常完好的pdf文件的时候我发现这里也没有中文，所以我确定这个问题不是出现在TexStudio上，而是出现在阅读器上，另外我还发现，Chrome是可以正常显示这些pdf的，由此可以判断得知Chrome的pdf渲染引擎是独立于系统的。

言归正传，这个问题也不难解决，其实是缺少了编码库`poppler-data`，安装这个就可以正常显示了。以下是该组件的详细信息：
```shell
❯ yay -Ss poppler-data
extra/poppler-data 0.4.11-1 (2.0 MiB 12.3 MiB)
    Encoding data for the poppler PDF rendering library
```

::: info 可能的问题原因

1. 某些软件在后台静默安装了，导致新版本的组件不能与系统当前组件兼容。
2. 原本是支持中文编码的，但主体与中文编码相关的部分分离了。
3. 纯粹是PDF阅读器出现的Bug。
4. 我后来安装什么东西时不经意把这个组件删掉了。

:::

### 开启休眠模式

::: details 参考资料

1. [Power management (简体中文)/Suspend and hibernate (简体中文) - Archwiki](https://wiki.archlinux.org/title/Power_management_(%E7%AE%80%E4%BD%93%E4%wang wB8%AD%E6%96%87)/Suspend_and_hibernate_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
2. [ArchLinux 休眠到交换文件](https://harttle.land/2019/10/19/hibernate-archlinux.html)
3. [Arch Linux Hibernates¶ - Cloud Atlas](https://cloud-atlas.readthedocs.io/zh_CN/latest/linux/arch_linux/archlinux_hibernates.html)
4. [arch linux 启用休眠的具体步骤(hibernation)](https://blog.csdn.net/chenyiyue/article/details/79238487)

:::

::: info 前言

因为我经常将电脑装入书包带回宿舍，做点事情之后合上盖子挂起，然后就去睡觉，这样第二天就总是会发现书包里热热的，而且电脑还没有电，往往此前有些东西没能来得及保存。这直接给我造成了损失和极大的不便，于是我说什么也要搞定休眠模式了。

:::

首先需要知道Linux支持三种挂起模式：
1. suspend to RAM(也简称suspend)，做的是切断主机大多数部件的电源而保留RAM的电源。也就是说在这种模式下电脑仍旧会一点点消耗电池的电量，但比正常开机要更加省电得多。「我曾经使用的就是这个模式，前言部分也提到了这个模式」
2. suspend to disk(又称hibernate)，是通过将内存内所有数据保存到swap分区/文件后切断所有电源，在开机的时候又会重新将swap分区/文件内数据复制到内存中。换句话说，该模式下电脑是完全不消耗电能的。
3. suspend to both(也称hybrid suspend)，其实就是前两个模式结合一下，同时将主机状态保存到内存和硬盘中，如果电池电量充足，可以迅速开机反应运作，如果电量不足就会从硬盘恢复主机状态。可以把这个模式看作是suspend模式的保险版本，当电池耗尽的时候接上电源或者充一段时间的电，就可以从硬盘恢复主机状态，这样不论什么情况下你的工作内容都不会丢失。

suspend模式和hibernate模式的优劣：
 - suspend模式优点是可以迅速开机，反应快；缺点也很明显，就是仍旧需要消耗电能，尤其是在你的工作内容比较多、运行消耗比较大的时候，电能消耗也非常大，这不利于长时间放置。
 - hibernate模式的优点是可以最大程度节省电源，有利于长时间放置；缺点同样明显，从硬盘恢复状态相对于suspend模式要慢。

对于我个人来说，我是不喜欢在我不使用电脑的情况下仍要消耗电能的，往往当我需要使用的时候会发现笔记本电量所剩无几，这在我宿舍生活条件下是非常不利的，另外开机速度如何我本来无所谓，更何况其实hibernate模式恢复速度其实也不慢，因此我必然会选择使用hibernate模式。

使用hibernate模式有两个选择：一是休眠到分区；二是休眠到文件。

虽然分两个模式，其实两者本质上是差不多的。我就直接选择休眠到分区了。首先要自己准备好一个专门用来当作swap区使用的分区，一般大小有物理内存的60%就够，但我其实不差这点空间，所以直接和物理内存同样大小了。

假设你划分好的盘是`/dev/sde4`，那么你需要依次执行如下操作：
```shell
mkswap /dev/sde4
swapon /dev/sde4
```
这两个命令的意思就是你要在盘`/dev/sde4`上创建swap分区，然后开启使用这个swap分区。

然后我们将该盘的信息添加到`/etc/fstab`中，使得开机可以自动挂载swap分区。
```
# <file system> <mount point> <type> <options> <dump> <pass>
UUID={{ UUID }} /swap swap swap,defaults 0 0
```
> 虽然参考资料中写的type是none，这成功让我进入了12次Emergency Mode，但问题不大，只是类型不对，当我通过Gparted查看swap分区的信息时就了解到这里的type应该是swap。

然后我们需要编辑`/etc/default/grub`，给内核添加参数：

<CodeGroup>
<CodeGroupItem title="第一种写法" active>
```
GRUB_CMDLINE_LINUX_DEFAULT=".... resume=/dev/sde4"
```
</CodeGroupItem>

<CodeGroupItem title="第二种写法">
```
GRUB_CMDLINE_LINUX_DEFAULT=".... resume=UUID={{ UUID }}"
```
</CodeGroupItem>
</CodeGroup>

接下来我们需要配置initramfs的resume钩子，编辑`/etc/mkinitcpio.conf`，找到`HOOKS=`，在其中添加：
```
HOOKS="base udev resume autodetect modconf block keyboard keymap consolefont filesystems"
```

::: warning 注意

resume要放在filesystems之前。如果有lvm一项，则resume要放在lvm之后。

:::

最后我们要更新配置，分别执行以下命令：
```shell
sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo mkinitcpio -P
```

然后我们重启一下电脑，就可以使用命令：`systemctl hibernate`了。

### 开机自动适配屏幕模式

::: details 参考资料

1. [Arch Linux下的外接显示器](https://codeantenna.com/a/oza5CQSPDi)
2. [Xorg (简体中文) - Archwiki](https://wiki.archlinux.org/title/Xorg_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BD%BF%E7%94%A8_.conf_%E6%96%87%E4%BB%B6)

:::

虽然我有`autorandr`这个非常好用的高层API软件，但是它在开机的时候却是一点办法都没有。如果我在开机之前就已经插好线了，那么从开机到正常使用一直都是默认向右扩展，而不是按照我习惯的配置模式，每次到这里我还必须要手动执行`autorandr --load`才能恢复正常。虽然这两个资料是我在解决壁纸问题时的参考资料，但实际上它们也启发我去尝试解决这个问题了。

> Arch提供了位于`/usr/share/X11/xorg.conf.d`的默认配置文件。通常情况下，用户无需进行额外的配置与修改即可正常使用。
> Xorg 使用名为`xorg.conf`的配置文件和后缀为`.conf`的文件作为它的初始设置。这些文件的位置的完整列表可以在[xorg.conf(5)](https://man.archlinux.org/man/xorg.conf.5)中找到，其中还附有全部可用选项的详尽解释。
> `/etc/X11/xorg.conf.d/`目录保存主机特有设置，你可以创建自己的配置文件，需要以`XX-`开头(两个数字和一个连接符)并以`.conf`结尾。X服务器启动是会解析这些文件，将其视为`xorg.conf`的一部分进行处理。如果配置之间有冲突，将会使用最后被处理的文件。所以通用的设置应该放到前面。最后会解析`xorg.conf`文件。

Archwiki在这里已经把配置文件的作用说得足够明确了，剩下就是需要我们去写这个配置文件了。
```
Section "Monitor"
	Identifier "eDP-1"
	Option "Primary" "true"
	Option "DPMS" "true"
	Option "PreferredMode" "1920x1080_60.01"
    	Option "Position" "1080 1080"
EndSection

Section "Monitor"
	Identifier "DP-1"
	Option "DPMS" "true"
	Option "PreferredMode" "1920x1080_60.00"
	Option "LeftOf" "eDP1"
    	Option "Position" "0 0"
	Option "Rotate" "left"
EndSection

Section "Monitor"
	Identifier "HDMI-1"
	Option "DPMS" "true"
	Option "PreferredMode" "1920x1080_60.00"
	Option "Above" "eDP1"
    	Option "Position" "1080 0"
EndSection
```
目前我是按照这个配置文件来写的，其实语法什么的也比较简单，`xrandr`怎么写命令，在这里就要怎么写配置，还算比较容易。

不过新的问题也出现了：开机的时候DP-1端口的分辨率输出有些异常，虽然配置文件是$1920\times1080$，但实际执行后的分辨率却比这个小，我目前还没找到解决办法，估计是与系统的默认配置出现了冲突，恰好系统的配置覆盖掉了。

### Linux 查看充电信息

因为之前我手里原本有一根双Type-C的线，但不知道为什么坏掉了~~（我什么也没有做～）~~，于是我只好再从网上买来两根，不过虽然店家表明支持100W充电并且明确表明内置E-marker芯片了（对于我个人目前的设备情况则是PD充电协议65W的规格），我还是想看看实际会不会有60W+的充电功率，而眼下我没有电流计那么方便的设备，那我该怎么做呢？

于是我想，既然系统和电脑上任何一个活动的硬件都会有交互，而且想到系统中也会有一些软件能够获取到电源的相关信息，为什么认为不可能有在哪里直接找到存有这些信息的地方呢？

几经搜索，我找到如下相关参考资料：
1. [如何在 Linux 中检查笔记本电脑的电池健康状况](https://zhongguo.eskere.club/%E5%A6%82%E4%BD%95%E5%9C%A8-linux-%E4%B8%AD%E6%A3%80%E6%9F%A5%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91%E7%9A%84%E7%94%B5%E6%B1%A0%E5%81%A5%E5%BA%B7%E7%8A%B6%E5%86%B5/2021-07-18/)
2. [Dell Latitude 3420笔记本最快能以多少功率充电？](http://wildgun.net/2022/02/charge_rate_of_dell_latitude_3420/)
3. [Linux power supply class](https://www.kernel.org/doc/Documentation/power/power_supply_class.txt)
4. [Linux sysfs class typec](https://www.kernel.org/doc/Documentation/ABI/testing/sysfs-class-typec)
5. [Linux sysfs class power](https://www.kernel.org/doc/Documentation/ABI/testing/sysfs-class-power)

***再次感谢这些作者的帮助！***

于是我在我的系统中找到笔记本电池对应的伪文件了，我二话不说就进去了啊：
```shell
cd /sys/class/power_supply/BAT1
```

这时候你`ls`一下会看到如下的信息：

```shell
alarm                           manufacturer
capacity                        model_name
capacity_level                  power
charge_control_end_threshold    present
charge_control_start_threshold  serial_number
charge_full                     status
charge_full_design              subsystem
charge_now                      technology
current_now                     type
cycle_count                     uevent
device                          voltage_min_design
hwmon2                          voltage_now
```

注意到文档中也对这几个文件的介绍如下：
1. **voltage_max**：Reports the maximum VBUS voltage the supply can support.
2. **voltage_now**：Reports the VBUS voltage supplied now. This value is generally read-only reporting, unless the ‘online’ state of the supply is set to be programmable, in which case this value can be set within the reported min/max range.
3. **current_max**：Reports the maximum IBUS current the supply can support.
4. **current_now**：Reports the IBUS current supplied now. This value is generally read-only reporting, unless the ‘online’ state of the supply is set to be programmable, in which case this value can be setwithin the reported min/max range.

而且，这些文件的单位都是采用微数量级单位的，如微安、微伏等等。

那么我只需要知道里面存放的具体数值，就可以知道当前的充电信息了，用cat即可。

::: details Linux伪文件

> 参考资料：
> - [linux伪文件与proc文件](https://www.cnblogs.com/rusking/p/3766633.html)
> - [Linux学习-伪文件（设备文件，命名管道，proc文件）](https://blog.csdn.net/qq_31730735/article/details/80527449)

Linux/Unix系统的文件类型大致可分为三类：普通文件、目录文件和伪文件。

伪文件不用来存储数据，本身不占用任何空间。它是文件系统的一部分，并按目录进行组织。伪文件设置的目的在于提供一种服务，采取与常规文件相同的访问方式进行访问，而且在多数情况下，伪文件用来访问内核（操作系统的核心部分）提供的服务。

常见的伪文件分别有设备文件、命名管道及proc文件。

- **设备文件**：又称特殊文件，是物理设备的内部表示，包括计算机和网络中的每个设备都可以当作特殊文件来访问，如键盘、显示器、打印机、磁盘驱动器等等，它们都存放在/dev目录中。
- **命名管道**：管道功能的一个扩展，将一个进程的输出连接到另一个进程的输入。
- **proc文件**：提供一种简单的途径来检查多种类型的系统文件的伪文件，它直接从内核获取信息，而不是使用复杂的程序搜出数据。这些文件都存放在/proc目录中。

这里只是做一个简单介绍，想了解详情还是点开[这里](https://blog.csdn.net/qq_31730735/article/details/80527449)比较好，这位作者写的是相当详细的。

:::

### LaTeX & VS Code 双剑合璧

> 参考资料：[vscode配置latex环境](https://www.jianshu.com/p/1f57334d56c4)
> 「注意」：在这里我已经装过TexLive了，如果你还没有装的话请先完成安装，再做文中后续操作，执行如下命令：
> ```shell
> # yay -S texlive-full
> # 上面这里似乎是安装TeXLive全套的命令，不过当时是考虑轻便的缘由，我执行的是下面的命令
> sudo pacman -S texlive-core texlive-langchinese texlive-latexextra texlive-fontsextra
> ```

虽然我有在使用TeXStudio+LaTeX，但是说实在话，TeXStudio的编写体验实在不怎么样，且不说有些时候会有奇怪的提示，更多的时候是在补全上有些让人不爽……于是就打算直接让VS Code和LaTeX配合使用了，还好它没那么难配置，我只需要在VS Code上安装插件————LaTeX Workshop，然后在`settings.json`里添加如下代码就好了，非常感谢这位作者的分享！

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
    "*.买到
    "*.log",
    "*.fdb_latexmk"
  ],
  "latex-workshop.bibtex-format.tab": "4 spaces",
```

::: tip settings.json在哪里？

虽然使用有一段时间了，但想到当初我还第一次使用的时候，看见别人只是写settings.json就一直在找，找了很久，于是我想在这里特别提示一下：

- 按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>，然后输入`Open Settings`或者`settings.json`，第一个就是。

:::

### HP Laser Jet P1106 打印机驱动

高三的时候买到一台打印机，型号就是标题所写。比较意外的是这个打印机的驱动居然在Linux上也有相应的驱动支持，安装这个即可：
```shell
sudo pacman -S extra/hplip
```

关于它的简要描述如下：
> extra/hplip 1:3.22.6-1 [installed]
>    Drivers for HP DeskJet, OfficeJet, Photosmart, Business Inkjet and some LaserJet

这样就打印机即可投入正常使用。