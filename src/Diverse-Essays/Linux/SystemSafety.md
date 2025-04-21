---
title: Linux 系统安全防护
category: 
 - Diverse Essays
tag:
 - Eclectic
 - Linux
 - Journal
 - System Safety
article: true
timeline: true
sticky: false
star: true
---
::: details 参考

1. [Linux系统安全隐患及加强安全管理的方法](https://www.modb.pro/db/116651)
2. [14个Linux系统安全小妙招，总有一招用的上](https://cloud.tencent.com/developer/article/1670754)
3. [[SOLVED] What is the systemd equivalent of chkconfig --list?](https://www.linuxquestions.org/questions/linux-newbie-8/what-is-the-systemd-equivalent-of-chkconfig-list-4175547184/)
4. [禁止Linux用户远程登录](https://www.jianshu.com/p/a4defcfe17f9)
5. [Linux系统安全设置整理](https://www.jianshu.com/p/0731a082f054)
6. [Linux允许部分用户su](https://www.361way.com/linux-permit-su/5745.html)
7. [Permitting or Restricting a User's su Access to Privileged Accounts](https://access.redhat.com/solutions/64860)
8. [Restrict su access to Privileged Accounts in Linux](https://computingforgeeks.com/restrict-su-access-to-privileged-accounts-linux/)
9. [pam_succeed_if的使用（四）](https://blog.51cto.com/jasonyong/164005)
10. [pam_succeed_if(8) - Linux man page](https://linux.die.net/man/8/pam_succeed_if)
11. [6.31. pam_succeed_if-测试帐户 Feature](https://www.docs4dev.com/docs/zh/linux-pam/1.1.2/reference/sag-pam_succeed_if.html)
12. [pam_succeed_if(8) — Linux manual page](https://man7.org/linux/man-pages/man8/pam_succeed_if.8.html)
13. [linux杀毒软件 - CSDN](https://blog.csdn.net/qq_29277155/article/details/84943631)
14. [应急响应--linux病毒查杀工具ClamAV](https://blog.csdn.net/xianjie0318/article/details/107315413)
15. [linux病毒查杀](https://www.ultimate-communications.com/zh/system_69433)
16. [Linux 病毒检测](https://blog.51cto.com/moerjinrong/2340089)
17. [深入浅出TCP中的SYN-Cookies](https://segmentfault.com/a/1190000019292140)
18. [backlog参数对TCP连接建立的影响](https://segmentfault.com/a/1190000019252960)
19. [archlinux开机自启动优化](https://blog.csdn.net/jacolin/article/details/47134895)
20. [Arch linux Systemd自启动脚本的使用](http://i.lckiss.com/?p=1623)

:::

## 有防必先攻，有攻才有防

黑客通常会以下列的方式入侵系统：

::: details 入侵方法

1. 直接窃听取得root密码，或者取得某位特殊User的密码，而该位User可能为root，再获取任意一位User的密码，因为取得一般用户密码通常很容易。
2. 黑客们经常用一些常用字来破解密码。曾经有一位美国黑客表示，只要用“password”这个字，就可以打开全美多数的计算机。其它常用的单词还有：account、ald、alpha、beta、computer、dead、demo、dollar、games、bod、hello、help、intro、kill、love、no、ok、okay、please、sex、secret、superuser、system、test、work、yes等。
3. 使用命令：`finger@some.cracked.host`，就可以知道该台计算机上面的用户名称。然后找这些用户下手，并通过这些容易入侵的用户取得系统的密码文件/etc/passwd，再用密码字典文件搭配密码猜测工具猜出root的密码。
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
- 用`ps -ef`查看进程，需要注意UID为0的进程。
- 用`lsof -p [pid]`来查看`[pid]`进程所打开的端口和文件。
- 通过比较差异`ps -ef | awk '{print $2}'| sort -n | uniq >1;ls /proc |sort -n|uniq >2;diff 1 2`来检查隐藏进程。
- 用`ifconfig`查看往外发包量。
- 使用`nethogs`来检测系统进程占用带宽情况，也可用`nethogs <网卡设备>`来指定网卡设备。
- 用`ss -anp |grep ":80"`来查找访问外网80端口的进程。

::: tip 注意

为了保证系统的绝对安全，除了做好预防和进行安全检查工作外，还要养成一个保证系统、网络安全的好习惯：定期定时做好完整的数据备份。有了完整的数据备份，在遭到攻击或系统出现故障时也能迅速恢复系统。

:::

### 检查网络

```shell
ip link | grep PROMISC # 正常网卡不该在promisc混杂模式，可能存在sniffer
lsof –i # 查看所有使用开放端口的进程
lsof –i :80 # 查看所有使用开放端口80的进程

### 两者都是查看非正常打开的TCP/UDP端口
netstat -anp
ss -anp
###

arp -a # 显示本机的arp(地址解析协议)缓冲区内容
```

### 检查系统计划任务、系统服务及开机启动项

有些病毒也可能会通过系统计划任务来静默隐藏运行：

```shell
crontab -u root -l
cat /etc/crontab 
ls -al /etc/cron.*
ls -al /var/spool/cron/ 
```

一些病毒也会自己创建相应的服务、开机启动项来添加，因此要查看开机自启动的服务：

```shell
systemd-analyze blame # 查看开机启动项和启动时间
systemctl --all | grep not-found # 查看出错启动项
ls -l /etc/systemd/system # 检查该目录下的service文件
systemctl status # 检查系统内正在运行的服务
# 如果确认出错启动项无异常并且想解决掉出错启动项的话，可以执行这个：
systemctl mask plymouth-start.service
# 查看开机启动时间可以用这个
systemd-analyze
```

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

另外还要检查命令是否被篡改：

```shell
ls -l  /usr/bin/which
ls -l $(which find)
find /usr/ -mtime -20 -ls
find /bin/ /sbin/ /usr/bin/ /usr/sbin/ /usr/local/bin/ /usr/local/sbin/ -mtime -20 -ls
```

### SSH远程连接相关的安全问题

非必要情况下不能允许使用root用户远程登录，root具有系统的最高权限，如果允许的话就会存在将最高权限暴露给他人的风险。因此我们需要修改SSH的配置文件`/etc/ssh/sshd_config`，将其中的`PermitRootLogin`字段修改为`no`，如果有需要，可以根据实际情况修改`Port`属性（表示端口号）、`PermitEmptyPasswords`属性（表示是否允许密码为空）、`AllowUsers`属性（表示允许使用SSH协议进行远程连接的用户）、`DenyUsers`属性（表示拒绝后面所有用户的SSH连接）等。

::: warning 注意

重启`sshd`服务后修改的所有属性才能生效。
执行：

```shell
sudo systemctl restart sshd
```

:::

### 用户管理相关的安全问题

1. 使用`passwd`命令来管理用户的密码。
2. 使用`userdel`命令删除不需要的用户。
3. 使用`usermod -L`命令来锁定用户的属性，如需要解锁的话使用`usermod -U`命令即可。
4. `cat /etc/passwd`可以用来查看是否有异常的系统用户。
5. `awk -F":" '{if($3 == 0){print $1}}' /etc/passwd`可以用来查看所有的特权用户，特别关注一下是否产生了新用户。

#### 设置只允许该组账号使用`su`命令切换至root用户

我们要实现这个功能的话需要修改`/etc/pam.d/su`文件来做配置。

这里特别介绍一下该文件中这三项的理解：

```text
auth        [success=2 default=ignore] pam_succeed_if.so use_uid user notingroup <group_name>
auth        required pam_wheel.so use_uid group=<group_name>
auth        required pam_listfile.so item=user sense=allow onerr=fail file=/etc/security/<file_with_allowed_target_UIDs>
```

::: tip 透析详解
:::

```text
auth        required pam_wheel.so use_uid group=<group_name>
auth        required pam_listfile.so item=user sense=allow onerr=fail file=/etc/security/<file_with_allowed_target_UIDs>
```

这里要配置的属性应该是两个都要一起配置。

配置信息描述的操作是：验证用户是否在`<group_name>`中，并且是否也在文件`/etc/security/<file_with_allowed_target_UIDs>`中列出，只有都满足的情况下，该用户才能使用`su`命令来登录root用户。

**注意**：文件`/etc/security/<file_with_allowed_target_UIDs>`不应该是全局可写，推荐配置成只有root可读可写，其他人只有可读权限，文件所有者和所在组都改为`root`。该文件下记录的是一些用户的UID，每行对应一个用户UID。

如果发现所属或权限不满足要求，执行以下命令修改权限即可：

```shell
sudo chown root:root /etc/security/<file_with_allowed_target_UIDs>
sudo chmod 0644 /etc/security/<file_with_allowed_target_UIDs>
```

执行之后可以使用`ls -lh`来检查权限信息：

```shell
❯ ls -lh /etc/security/<file_with_allowed_target_UIDs>
-rw-r--r--. 1 root root 5 Apr 22 10:19 /etc/security/<file_with_allowed_target_UIDs>
```

---

如果在实际中发现以上配置方式还是无法满足一些要求的话，还有以下的信息配置进行更多的细粒化验证：

```text
auth        [success=2 default=ignore] pam_succeed_if.so use_uid ......
```

**有关功能、作用和文件的描述如下**：

`pam_succeed_if.so`设计为根据要验证的用户所属帐户的Feature或其他PAM项的值来成功或失败进行身份验证，另外有一种用途是根据此测试选择是否加载其他模块。

> **注意**：应该给模块一个或多个条件作为模块参数，并且只有满足所有条件，身份验证才会成功，这时用户才能正常登录。

`pam_succeed_if.so`后续的内容被这样定义：

```text
pam_succeed_if.so [flag...] [condition...]
```

::: details **flag参数的可选项**

- **debug**：Turns on debugging messages sent to syslog.
- **use_uid**：Evaluate conditions using the account of the user whose UID the application is running under instead of the user being authenticated.
- **quiet**：Don't log failure or success to the system log.
- **quiet_fail**：Don't log failure to the system log.
- **quiet_success**：Don't log success to the system log.

:::

::: details **Condition参数的详情**

Conditions are three words: a field，a test，and a value to test for. Available fields are user，uid，gid，shell，home and service:

- **field < number** : Field has a value numerically less than number.
- **field <= number** : Field has a value numerically less than or equal to number.
- **field eq number** : Field has a value numerically equal to number.
- **field >= number** : Field has a value numerically greater than or equal to number.
- **field > number** : Field has a value numerically greater than number.
- **field ne number** : Field has a value numerically different from number.
- **field = string** : Field exactly matches the given string.
- **field != string** : Field does not match the given string.
- **field =~ glob** : Field matches the given glob.
- **field !~ glob** : Field does not match the given glob.
- **field in item:item:...** : Field is contained in the list of items separated by colons.
- **field notin item:item:...** : Field is not contained in the list of items separated by colons.
- **user ingroup group** : User is in given group.
- **user notingroup group** : User is not in given group.
- **user innetgr netgroup** : (user，host) is in given netgroup.
- **user notinnetgr group** : (user，host) is not in given netgroup.

:::

#### 修改用户的密码策略

对于一个庞大的组织来说，多人共用服务器必然存在安全隐患，我们可以通过设置用户的密码策略来提高系统安全性，降低风险。我们通过修改文件`/etc/login.defs`来配置密码策略。

文件里也写了它的功能与规范要求：
> /etc/login.defs - Configuration control definitions for the login package.
>
> Three items must be defined:  MAIL_DIR，ENV_SUPATH，and ENV_PATH.
> If unspecified，some arbitrary (and possibly incorrect) value will
> be assumed.  All other items are optional - if not specified then
> the described action or option will be inhibited.
>
> Comment lines (lines beginning with "#") and blank lines are ignored.
>
> Modified for Linux.  --marekm

文件里写的内容相当全面详细，各参数的作用都已在上放写好，因此需要修改的时候看注释就好，这里只放出来一个例子：

```shell
#
# Delay in seconds before being allowed another attempt after a login failure
#
FAIL_DELAY  3
```

这里在说`FAIL_DELAY`变量决定了在用户登录失败的时候需要等待`FAIL_DELAY`时间长度后才能进行下一次登录请求。

::: tip 通过该文件设置su权限

```shell
echo "SU_WHEEL_ONLY yes" >> /etc/login.defs
```

通过这个命令来设置参数`SU_WHEEL_ONLY`，表示只有wheel用户组才能使用`su`命令切换至root。

:::

### 文件管理相关的安全问题

建议`/etc/passwd`和`/etc/shadow`两个文件都要限定锁死，只限root管理员能查看。并且平日注意防止该类文件外泄。

联系之前我写的[笔记](UUA.md)，就可以知道还能另外设置特殊权限，执行以下指令来保证文件不可更改：

```shell
chattr +i /etc/passwd
chattr +i /etc/shadow
chattr +i /etc/group
chattr +i /etc/gshadow
```

时常关注文件修改时间也是必要的操作，查看修改时间可以使用`ls -l`命令，如：

```shell
ls -l /etc/passwd
```

### 禁用快捷键重启的安全问题

在使用Linux系统中，按下`Ctrl`+`Alt`+`Del`会触发重启事件，在一些情况下可能会产生不良影响甚至会带来不小的损失，因此需要考虑禁用这一组危险的快捷键。

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
    last | awk '{print $3}'|sort |uniq -c|sort -grk 1 #最近登陆成功次数最多的IP
    lastb #查看最近用户登录失败的列表
    lastb root | awk '{print $3}' | sort | uniq -c | sort -nr| more #检查系统错误登陆日志，统计IP重试次数
    lastlog #查看每个用户最后一次登陆的时间
    grep -i Accepted /var/log/secure #查找远程登录成功的IP
    grep -i Accepted /var/log/secure | awk '{print $9,$11}'|sort |uniq -c |sort -grk 1 #查找远程登录成功的IP
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

Linux平台上还有杀毒软件ClamAV、rkhunter，方便病毒查杀。

此外CentOS还有`McAfee`、`sophos`等杀毒软件可以安装使用，这里就不详细记述了（主要是因为我使用Arco Linux）。

### 管理方法相关的安全问题

对于安全管理来说，好的流程与管理制度同样也是必须的，否则，谈上述各方面的作用基本为0，有方法，没有制度去让方法落地执行。

由于我没有在公司内待过，所以这一点也写不了什么。

## 防火墙

如果是在服务器上设置的话，需要先做好如下的准备工作：

```shell
crontab -e
*/10 * * * * root /etc/init.d/iptables stop
```

这里表示每十分钟就停止一次防火墙，这样就会避免因为误操作而将自己拒之门外的悲痛情况。

一般我们只需要采取以下策略来设置防火墙即可：

1. 仅开放HTTP(80)、HTTPS(443)、SSH(自动捕获)端口，其他端口全部关闭，可以根据需要另外开放其它端口如FTP(21)端口、smtp(25)端口等，在下面的脚本中可以修改dport参数后面的端口列。
2. 写如下脚本来单向禁止ping设置，这样外部IP就无法ping通你的服务器。

   ```shell
    #!/bin/bash
    ssh_port=`netstat -nutlp | grep sshd | grep 0.0.0.0 | awk '{print $4}' | cut -d ":" -f2`
    iptables -F
    iptables -F -t nat
    iptables -X
    iptables -P INPUT DROP
    iptables -P OUTPUT ACCEPT
    iptables -P FORWARD DROP
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A INPUT -m state --state ESTABLISHED，RELATED -j ACCEPT
    iptables -A INPUT -p tcp -m multiport --dport 80，443，$ssh_port -j ACCEPT
    iptables -A INPUT -p icmp --icmp-type 0 -j ACCEPT
    /etc/init.d/iptables save
    exit 0
   ```

最后记得取消掉任务计划服务`crontab`。

## 检查异常系统文件

**注意SUID文件，可疑大于10M和空格文件**：

```shell
ls -artl /tmp/
find / -uid 0 -perm 4000 -print
find / -size +10000k -print
find / -name "..."  -print
find / -name ".."  -print
find / -name "."  -print
find / -name " "  -print
```

**检查系统中的core文件**：

```shell
find / -name core -exec ls -l {} \;
```

## 其他安全设置

**开启**`TCP SYN Cookie`**保护**：

执行`echo 1 > /proc/sys/net/ipv4/tcp_syncookies`即可开启。

::: details TCP SYN Cookie的背景和Syn Flood攻击原理

正如有防必先有攻，我们需要先知道一种典型的DDos攻击：Syn Flood攻击。

Syn Flood攻击是基于TCP建立连接原理而进行的。TCP连接建立时，客户端通过发送SYN报文发起向处于监听状态的服务器发起连接，服务器为该连接分配一定的资源，并发送SYN和ACK报文。对服务器来说，此时该连接的状态称为半连接(Half-Open)，且仅当收到客户端回复的ACK报文后，连接才算建立完成。在这个过程中，如果服务器一直没有收到ACK报文(比如在链路中丢失了)，服务器会在超时后重传SYN和ACK。如果经过多次超时重传后，都没有收到，那么服务器会回收资源并关闭半连接。

在Unix/Linux系统中，监听是通过`listen`函数来完成的：

```c
int listen(int sockfd，int backlog)
```

第一个参数是设置的套接字，而第二个参数，《Unix网络编程》给出的描述是**已完成的连接队列**(ESTABLISHED)与**未完成连接队列**(SYN_RCVD)之和的上限。

> 一般我们将ESTABLISHED状态的连接称为全连接，而将SYN_RCVD状态的连接称为半连接

虽然《Unix网络编程》这样给出描述，但实际上Linux内核中只有已完成连接队列实际存在，而未完成连接队列只有长度的记录。

每一个LISTEN状态的套接字都有一个`inet_connection_sock`结构，其中的`accept_queue`从名字上也可以看出就是已完成三次握手的子连接队列，另外这个结构里还记录了半连接请求的长度。以下是`inet_connection_sock`结构的定义：

```c
struct inet_connection_sock {    
    . . .
    struct request_sock_queue icsk_accept_queue;
    . . .
}

struct request_sock_queue {
    . . .
    atomic_t qlen; // 半连接的长度
    atomic_t young; // 一般情况，这个值 = qlen

    struct request_sock *rskq_accept_head; // 已完成连接的队列头
    struct request_sock *rskq_accept_tail; // 已完成连接的队列尾
    . . .
};
```

其中变量`young`比较关键，代码注释是这样解释的：
> Normally all the openreqs are young and become mature(i.e. converted to established socket) for first timeout. If synack was not acknowledged for 1 second，it means one of the following things: synack was lost，ack was lost，rtt is high or nobody planned to ack (i.e. synflood).

可以看得出来，当第一次出现`synack`或`ack`超时的时候，或者是`rtt`过高的时候，亦或者是根本没有人打算发送`ack`的时候（注意这里也指出了攻击类型Syn Flood），这些开放的请求就会被转换成全连接，这就是mature的含义。

而内核在关闭`syncookie`的情况下会这样处理SYN握手报文：

```c

int tcp_conn_request(struct request_sock_ops *rsk_ops，
             const struct tcp_request_sock_ops *af_ops，
             struct sock *sk，struct sk_buff *skb) {

    // 条件1: 半连接>=backlog
    if ((net->ipv4.sysctl_tcp_syncookies == 2 ||
        inet_csk_reqsk_queue_is_full(sk)) && !isn) {   
        want_cookie = tcp_syn_flood_action(sk，skb，rsk_ops->slab_name);
        if (!want_cookie)
            goto drop;
    } 

    // 条件2: 全连接sock>backlog并且半连接队列的young字段>1
    if (sk_acceptq_is_full(sk) &&
        inet_csk_reqsk_queue_young(sk) > 1) { 
        NET_INC_STATS(sock_net(sk)，LINUX_MIB_LISTENOVERFLOWS);
        goto drop;
    } 

    . . .
}
```

注意到`inet_csk_reqsk_queue_young(sk) > 1`这里表示网络繁忙导致`SYN ACK`丢失，但通常这个条件不会满足，一般client总会及时处理ACK的。因此如果发生丢弃SYN报文的话，只能是`(net->ipv4.sysctl_tcp_syncookies == 2 || inet_csk_reqsk_queue_is_full(sk)) && !isn`这里的条件为真，一般情况下`inet_csk_reqsk_queue_is_full(sk)`比较容易满足条件。

我们再看收到ACK报文时的处理：

```c
struct sock *tcp_v4_syn_recv_sock(const struct sock *sk，
                                struct sk_buff *skb，
                                struct request_sock *req，
                                struct dst_entry *dst，
                                struct request_sock *req_unhash，
                                bool *own_req) {
    . . .

    // 全连接>backlog，就丢弃
    if (sk_acceptq_is_full(sk))           
        goto exit_overflow;

    // 创建子套接字了
    newsk = tcp_create_openreq_child(sk，req，skb);

    . . .
}
```

前面一些连接请求都可以顺利创建子连接，设此时全连接队列长度=backlog=$x$，半连接数目=0；

处理第$x+1$个连接请求时，由于sk_acceptq_is_full的判断条件是`>`而不是`>=`，所以依然可以建立全连接。

而当第$k\，(k>x+1)$个连接请求到来时，由于半连接的数目还没有超过backlog，所以还是可以继续回复`SYNACK`，但收到ACK后已经不能再创建子套接字了，所以TCP状态依然为`SYN_RECV`.同时半连接的数目也会增加到backlog。

而对于客户端，它既然能收到SYNACK握手报文，那么就可以将TCP状态变为ESTABLISHED，当某一次再有握手请求到来时，由于半连接的数目已经达到backlog，因此，这个SYN报文会被丢弃。

这一切都说明了，服务器能保存的半连接的数量是有限的，因此当服务器遭遇大量攻击报文的时候，服务器将不再能够接受正常连接了，也就是服务不可用。

综上所述，我们已经深入理解了Syn Flood攻击了，自然也就明白应该如何防守——开启`TCP SYN Cookie`功能即可。

:::

::: details TCP SYN Cookies原理

> Syn Flood攻击成立的关键在于服务器资源是有限的，而服务器收到请求会分配资源。通常来说，服务器用这些资源保存此次请求的关键信息，包括请求的来源和目(五元组)，以及TCP选项，如最大报文段长度MSS、时间戳timestamp、选择应答使能Sack、窗口缩放因子Wscale等等。当后续的ACK报文到达，三次握手完成，新的连接创建，这些信息可以会被复制到连接结构中，用来指导后续的报文收发。

Syn Cookies算法可以让服务器在不分配资源的情况下做到：

1. 验证之后可能到达的ACK的有效性，保证这是一次完整的握手；
2. 获得SYN报文中携带的TCP选项信息

因为TCP连接建立时，双方的起始报文序号是可以任意的。而Syn Cookies利用这一点，按照如下规则构造初始序列号：

- 设t为一个缓慢增长的时间戳(典型实现是每64s递增一次)
- 设m为客户端发送的SYN报文中的MSS选项值
- 设s是连接的元组信息(源IP,目的IP,源端口，目的端口)和t经过密码学运算后的Hash值，即s=hash(sip,dip,sport,dport,t)，s的结果取低24位。

那么初始序列号n的结构如下：

- 高5位为t mod 32
- 接下来3位为m的编码值
- 低24位为s

当客户端收到此SYN和ACK报文后，根据TCP标准，它会回复ACK报文，且报文中ack = n + 1，那么在服务器收到它时，将ack - 1就可以拿回当初发送的SYN+ACK报文中的序号了！服务器巧妙地通过这种方式间接保存了一部分SYN报文的信息。

接下来，服务器需要对ack - 1这个序号进行检查：

- 将高5位表示的t与当前之间比较，看其到达地时间是否能接受。
- 根据t和连接元组重新计算s，看是否和低24位一致，若不一致，说明这个报文是被伪造的。
- 解码序号中隐藏的mss信息

到此，连接就可以顺利建立了。

Linux的实现与上述有些区别：

```c
seq = hash(saddr, daddr, sport, dport, 0, 0) + req.th.seq + t << 24 + (hash(saddr, daddr, sport, dport, t, 1) + mss_ind) & 0x00FFFFFF
```

其中，`req.th.seq`表示客户端的SYN报文中的序号，`mss_ind`是客户端通告的MSS值得编码，它的取值在比较新的内核中有4种(老的内核有8种), 分别对应以下4种值：

```c
static __u16 const msstab[] = {
    536,
    1300,
    1440, //1440, 1452: PPPoE
    1460,
};
```

:::

::: details Syn Cookies缺点与缺陷

其实使用Syn Cookies是有代价的：

1. MSS的编码只有3位，因此最多只能使用8种MSS值
2. 服务器必须拒绝客户端SYN报文中的其他只在SYN和SYN+ACK中协商的选项，原因是服务器没有地方可以保存这些选项，比如Wscale和SACK
3. 增加了密码学运算，增加了连接服务所需消耗的时间

:::

## 查杀异常进程命令

- `ps`、`top`、`htop`：查看运行的进程和进程系统资源占用情况，查找异常进程。
- `pstree`：以树状图的形式显示进程间的关系。
- `lsof`：可以查看进程打开的文件、文件或目录被哪个进程占用、打开某个端口的进程、系统所有打开的端口等等。
- `netstat`：可以查看系统监听的所有端口、网络连接情况、查找连接数过多的IP地址等。
- `ss`：与`lsof`、`netstat`等价。
- `iftop`：监控TCP连接实时网络流量，可分别分析出入流量并进行排序，查找出流量异常的IP地址。（需要手动安装）
- `nethogs`：监控每个进程使用的网络流量，并从高到低排序，方便查找出流量异常的进程。（需要手动安装）
- `strace`：追踪一个进程所执行的系统调用。如已知PID可使用`strace -p <PID>`。
- `strings`：输出文件中可打印的字符串。
