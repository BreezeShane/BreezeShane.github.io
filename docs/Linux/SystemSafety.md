---
title: Linux系统安全防护
date: 2022-04-19 14:37:47
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
tags: 
 - Linux
 - System Safety
---
::: details 参考

1. [Linux系统安全隐患及加强安全管理的方法](https://www.modb.pro/db/116651)
2. [14个Linux系统安全小妙招，总有一招用的上](https://cloud.tencent.com/developer/article/1670754)
3. [[SOLVED] What is the systemd equivalent of chkconfig --list?](https://www.linuxquestions.org/questions/linux-newbie-8/what-is-the-systemd-equivalent-of-chkconfig-list-4175547184/)
4. 

:::

## 有防必先攻，有攻才有防

黑客通常会以下列的方式入侵系统：

::: details 入侵方法

1. 直接窃听取得root密码,或者取得某位特殊User的密码，而该位User可能为root，再获取任意一位User的密码，因为取得一般用户密码通常很容易。
2. 黑客们经常用一些常用字来破解密码。曾经有一位美国黑客表示，只要用“password”这个字，就可以打开全美多数的计算机。其它常用的单词还有：account、ald、alpha、beta、computer、dead、demo、dollar、games、bod、hello、help、intro、kill、love、no、ok、okay、please、sex、secret、superuser、system、test、work、yes等。
3. 使用命令：finger@some.cracked.host，就可以知道该台计算机上面的用户名称。然后找这些用户下手，并通过这些容易入侵的用户取得系统的密码文件/etc/passwd，再用密码字典文件搭配密码猜测工具猜出root的密码。
4. 利用一般用户在/tmp目录放置着的SetUID的文件或者执行着SetUID程序，让root去执行，以产生安全漏洞。
5. 利用系统上需要SetUID root权限的程序的安全漏洞，取得root的权限，例如:pppd。
6. 从.rhost的主机入侵。因为当用户执行rlogin登录时，rlogin程序会锁定.rhost定义的主机及账号，并且不需要密码登录。
7. 修改用户的.login、cshrc、.profile等Shell设置文件，加入一些破坏程序。用户只要登录就会执行，例如`if tmp/backdoor exists run tmp/backdoor`。
8. 只要用户登录系统，就会不知不觉地执行Backdoor程序（可能是Crack程序），它会破坏系统或者提供更进一步的系统信息，以利Hacker渗透系统。
9. 如果公司的重要主机可能有网络防火墙的层层防护，Hacker有时先找该子网的任何一台容易入侵的主机下手，再慢慢向重要主机伸出魔掌。例如：使用NIS共同联机，可以利用`remote`命令不需要密码即可登录等，这样黑客就很容易得手了。
10. Hacker会通过中间主机联机，再寻找攻击目标，避免被用逆查法抓到其所在的真正IP地址。
11. Hacker进入主机有好几种方式，可以经由Telnet（Port 23）、Sendmail（Port25）、FTP（Port 21）或WWW（Port 80）的方式进入。一台主机虽然只有一个地址，但是它可能同时进行多项服务，而这些Port都是黑客进入该主机很好的方式。
12. Hacker通常利用NIS（IP）、NFS这些RPC Service截获信息。只要通过简单的命令（例如`showmount`），便能让远方的主机自动报告它所提供的服务。当这些信息被截获时，即使装有tcp_wrapper等安全防护软件，管理员依然会在毫不知情的情况下被借用了NIS Server上的文件系统，而导致/etc/passwd外流。
13. 发E-mail给anonymous账号，从FTP站取得/etc/passwd密码文件，或直接下载FTP站/etc目录的passwd文件。
14. 网络窃听，使用sniffer程序监视网络Packet，捕捉Telnet，FTP和Rlogin一开始的会话信息，便可顺手截获root密码，所以sniffer是造成今日Internet非法入侵的主要原因之一。
15. 利用一些系统安全漏洞入侵主机，例如：Sendmail、Imapd、Pop3d、DNS等程序，经常发现安全漏洞，这对于入侵不勤于修补系统漏洞的主机相当容易得手。
16. 被Hacker入侵计算机，系统的Telnet程序可能被掉包，所有用户Telnet session的账号和密码均被记录下，并发E-mail给Hacker，进行更进一步的入侵。
17. Hacker会清除系统记录。一些厉害的Hacker都会把记录它们进入的时间、IP地址消除掉，诸如清除：syslog、lastlog、messages、wtmp、utmp的内容，以及Shell历史文件.history。
18. 入侵者经常将如`ifconfig`、`tcpdump`这类的检查命令更换，以避免被发觉。
19. 系统家贼偷偷复制/etc/passwd，然后利用字典文件去解密码。
20. 家贼通过su或sudo之类的Super User程序觊觎root的权限。
21. 黑客经常使用Buffer overflow（缓冲区溢位）手动入侵系统。
22. cron是Linux操作系统用来自动执行命令的工具，如定时备份或删除过期文件等等。入侵者常会用cron来留后门，除了可以定时执行破译码来入侵系统外，又可避免被管理员发现的危险。
23. 利用IP spoof（IP诈骗）技术入侵Linux主机。

:::

## 布线设防的宏观理念

如果能采用以上方式入侵你的电脑，这已经说明当前电脑的安全性十分令人担忧。但我们不是一点办法都没有，而要未雨绸缪，做好日常的安全防护军备：
1. 提前关闭所有可能的系统后门，以防止入侵者利用系统中的漏洞入侵。例如用`rpcinfo -p`来检查机器上是否运行了一些不必要的远程服务。一旦发现，立即停掉，以免给非法用户留下系统的后门。 
2. 确认系统当中运行的是较新的Linux、Unix守护程序。因为老的守护程序允许其它机器远程运行一些非法的命令。
3. 定期从操作系统生产商那里获得安全补丁程序。
4. 安装加强系统安全的程序，如：Shadow password、TCP wrappet、SSH、PGP等。
5. 可以搭建网络防火墙，防止网络受到攻击。
6. 利用扫描工具对系统进行漏洞检测，来考验主机容易受攻击的程度。
7. 多订阅一些安全通报，多访问安全站点，以获得及时的安全信息来修补系统软硬件的漏洞。

设防的基本思路应该是都包含在内了，接着我们谈一下具体的做法。

## 巡逻检查

### 充分利用Linux和Unix系统中内置的检查命令来检测系统

 - 使用`who`来查看谁登陆到系统中。
 - 使用`w`来查看谁登陆到系统中，且在做什么操作。
 - 使用`last`显示系统曾经被登陆的用户和ttys。
 - 使用`history`显示系统过去被运行的命令。
 - 使用`netstat`来查看现在的网络状态。
 - 使用`top`动态实时查看系统进程。
 - 使用`finger`查看所有的登陆用户。

### 定期检查系统中的日志、文件、时间和进程信息

 - 检查`/var/log/messages`日志文件查看外部用户的登陆状况。
 - 检查用户目录下`/home/username`下的登陆历史文件(如：.history 文件)。
 - 检查用户目录下`/home/username`的`.rhosts`、`.forward`远程登陆文件。
 - 用`find / -ctime -2 -ctime +1 -ls`命令来查看不到两天以内修改的一些文件。
 - 用`ls -lac`命令去查看文件真正的修改时间。
 - 用`cmp file1 file2`命令来比较文件大小的变化。


::: tip 注意

为了保证系统的绝对安全，除了做好预防和进行安全检查工作外，还要养成一个保证系统、网络安全的好习惯：定期定时做好完整的数据备份。有了完整的数据备份，在遭到攻击或系统出现故障时也能迅速恢复系统。

:::

## 安全防线加强巩固

### 物理层面的安全问题

硬件服务器，首先得专业人的来做专业的维护。其次就是关闭从CD/DVD等这些方面的软启动方式。同时也可以设置BIOS密码，并且要有限制访问的策略与各类流程管控。

还可以禁用USB设备来达到安全的目的，方法如下：
```shell
vim /etc/modprobe.d/stopusb
```
并向其中写入`install usb-storage /bin/true`。

还有另外的方式，不过不建议采用：
```shell
mv /lib/modules/<KernelVersion>/kernel/drivers/usb/storage/usb-storage.ko.zst /lib/modules/<KernelVersion>/kernel/drivers/usb/storage/usb-storage.ko.zst.backup
```

### 系统版本相关的安全问题

要常做系统更新，及时下载安装更新补丁，要保证已经有的漏洞要及时的修复，系统内无其它漏洞存在。还要保证系统包含了最新版本的补丁、安全修复和可用内核。

### 软件应用相关的安全问题

不论安装系统还是安装常用软件，请遵循最小化处理原则。因为软件越多，也意味着潜在的漏洞越多。

对于一些不必要开放的系统服务及端口，建议关闭：
```shell
chkconfig --list # 用于查看当前开放的服务与端口
chkconfig <ServerName> off # 用于关闭端口
```

然后当我尝试使用的时候发现系统没有`chkconfig`命令。相应地在现在基于`systemctl`命令管理系统进程及服务的Linux系统应该使用以下命令来代替：
```shell
systemctl -a # 用于查看当前所有的服务进程
systemctl stop <ServerName> # 用于终止服务进程运行
```

### 远程连接相关的安全问题

非必要情况下不能允许使用root用户远程登录，root具有系统的最高权限，如果允许的话就会存在将最高权限暴露给他人的风险。因此我们需要修改SSH的配置文件`/etc/ssh/sshd_config`，将其中的`PermitRootLogin`字段修改为`no`，如果有需要，可以根据实际情况修改`Port`属性（表示端口号）、`PermitEmptyPasswords`属性（表示是否允许密码为空）、`AllowUsers`属性（表示允许使用SSH协议进行远程连接的用户）等。

### 用户管理相关的安全问题

1. 使用`passwd`命令来管理用户的密码
2. 使用`userdel`命令删除不需要的用户
3. 使用`usermod -L`命令来锁定用户的属性，如需要解锁的话使用`usermod -U`命令即可。

**设置只允许该组账号使用**`su`**命令切换至root用户**：


### 文件管理相关的安全问题

建议`/etc/passwd`和`/etc/shadow`两个文件都要限定锁死，只限root管理员能查看。并且平日注意防止该类文件外泄。

::: tip 更多

关于用户管理和文件管理相关的更多详细知识，可以点击[这里](./UUA.md)跳转来查看详情。

:::

### 禁用快捷键重启的安全问题

在使用Linux系统中，按下<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>会触发重启事件，在一些情况下可能会产生不良影响甚至会带来不小的损失，因此需要考虑禁用这一组危险的快捷键。

但应该注意到，这个快捷键其实是让systemd来按照`ctrl-alt-del.target`的文件配置进行活动的，而该文件的性质其实是一个软链接：
```shell
❯ ll /usr/lib/systemd/system/ctrl-alt-del.target
lrwxrwxrwx 1 root root 13  3月 18 03:24 /usr/lib/systemd/system/ctrl-alt-del.target -> reboot.target
```

因此如果尝试直接去修改这个文件的话，实际上改动的是reboot.target文件，这样可能会导致reboot命令不能正常执行甚至直接失效。所以我们应该改的是这个软链接，做法也比较简单，只需要将这个软链接重命名为其他名称即可（最好是能方便自己直接还原的名称）。

### 监控用户行为相关的安全问题

如果有需要监视用户的具体活动的话，需要安装工具`acct`，如果是使用yum包管理器的话可以`psacct`和`acct`二选一；如果是Arch系的Linux则需要从AUR源下载`acct`工具。接着这个工具的相关简单使用如下：
1. **`ac`系列**：
```shell
ac #显示所有用户连接总时间
ac -p #显示每个用户连接时间
ac -d #显示每天所有用户连接总时间
ac silence #显示指定用户连接时间
ac -d silence #显示指定用户每天连接时间
```
2. **`sa`系列**：
```shell
sa 输出用户活动信息
sa #显示所有用户执行命令情况
sa -u #按用户显示执行命令情况
sa -m #按进程显示执行命令情况
sa -p #按使用率显示执行命令情况
```
3. **`lastcomm`系列**：
```shell
lastcomm #输出最近执行命令信息
lastcomm #显示所有执行命令
lastcomm silence #显示指定用户执行命令
lastcomm ls #显示指定命令执行情况
```
4. **其他**：
```shell
last #查看最近用户登录成功列表
last -x #显示系统关机、重新开启等信息
last -a #将IP显示在最后一列
last -d #对IP进行域名解析
last -R #不显示IP列
last -n 3 #显示最近3条
lastb #查看最近用户登录失败的列表
```

### 日志相关的安全问题

定期检查日志文件是一件必要的事，这样也方便你第一时间掌握一些情况，在CentOS Linux中以下常用的日志文件的功能如表所示：
|日志文件|作用|
|:-----:|:---:|
|`/var/log/message`|记录系统日志或当前活动日志|
|`/var/log/auth.log`|身份认证日志|
|`/var/log/kern.log`|内核日志|
|`/var/log/cron.log`|Crond日志，cron任务|
|`/var/log/maillog`|邮件服务器日志|
|`/var/log/boot.log`|系统启动日志|
|`/var/log/mysqld.log`|MySQL数据库服务器日志|
|`/var/log/secure`|认证日志|
|`/var/log/utmp`或`/var/log/wtmp`|登录日志|
|`/var/log/yum.log`|Yum日志|

### 安全工具相关的安全问题

对于系统来说，常用的安全扫描工具是必备的，比如：扫描开放端口nmap。对于系统中的WEB应用等来说，可以使用一些开源的工具：IBM AppScan、SQL Map等。

### 管理方法相关的安全问题

对于安全管理来说，好的流程与管理制度同样也是必须的，否则，谈上述各方面的作用基本为0，有方法，没有制度去让方法落地执行。

由于我没有在公司内待过，所以这一点也写不了什么。