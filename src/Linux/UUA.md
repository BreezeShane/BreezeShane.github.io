---
title: Linux 用户与组和权限分配杂谈
date: 2022-04-05 11:37:30
author: Breeze Shane
top: false
toc: true
mathjax: true
category:
 - Linux
tag:
 - Linux
 - User
 - Usergroup
 - Authority
---

::: details 参考

1. [Linux 用户和组管理](https://jiabaoer.github.io/2019/11/21/013.Linux-%E7%94%A8%E6%88%B7%E5%92%8C%E7%BB%84%E7%AE%A1%E7%90%86/)
2. [一篇读懂 Linux 用户管理与操作](https://zhuanlan.zhihu.com/p/105482468)
3. [Linux 用户和用户组管理](https://www.runoob.com/linux/linux-user-manage.html)
4. [linux -----创建用户 , 群组, 权限](https://blog.csdn.net/py_method/article/details/103364504)
5. [Linux用户和用户组管理详解](http://c.biancheng.net/linux_tutorial/60/)
6. [Linux 用户和组管理](https://www.cjavapy.com/article/2294/)
7. [三分钟教你理清Linux 用户与用户组关系~](https://zhuanlan.zhihu.com/p/38136194)
8. [Linux权限详解（chmod、600、644、700、711、755、777、4755、6755、7755）](https://blog.csdn.net/u013197629/article/details/73608613)
9. [一文带你彻底搞懂Linux 文件权限管理](https://segmentfault.com/a/1190000039202476)
10. [Linux 文件权限管理](https://www.jianshu.com/p/d27016653f1d)
11. [Linux权限管理详解](http://c.biancheng.net/linux_tutorial/70/)
12. [Linux 权限管理](https://zhuanlan.zhihu.com/p/61196860)
13. [第3章 Linux上文件的权限管理](https://www.cnblogs.com/f-ck-need-u/p/7011971.html)
14. [【Linux】聊聊Linux的文件权限管理](https://cloud.tencent.com/developer/article/1517793)
15. [Linux用户和权限管理](https://zou8944.com/2022/01/10/Linux%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86/)
16. [Filesystem Hierarchy Standard](https://www.linuxbase.org/betaspecs/fhs/fhs/index.html)
17. [Linux文件系统中/bin、/sbin、/usr/bin、/usr/sbin、/usr/local/bin、/usr/local/sbin文件夹的区别是什么？](https://www.zhihu.com/question/21265424?sort=created)
18. [Linux 文件权限](https://yanglei253.github.io/2021/03/17/linux/linux4-permission/)
19. [再议Linux文件、目录的隐藏属性（lsattr、chattr）](https://blog.csdn.net/solaraceboy/article/details/78758251)
20. [总结-Linux 文件隐藏属性](https://blog.csdn.net/u011341352/article/details/103901164)
21. [Linux ACL 权限](https://www.cnblogs.com/sparkdev/p/5536868.html)

:::

## 概念

Linux允许多个不同用户同时登录一台主机并同时使用主机资源, 因此为了保护各用户隐私, 规范化各用户的权限管理等, Linux有着独特的用户管理与操作机制. 我们在了解具体命令之前需要站在宏观角度来看待这个过程:

在这个机制中, 实际上只分两个层次, 一是用户组, 二是用户. 而用户又分root用户和非root用户. Linux通过建立这个机制建立起用户与文件权限之间的联系, 并保证系统能充分考虑到各用户的隐私保护, 在很大程度上保障了Linux作为多用户系统的可行性.

我们如果从文件权限的角度出发, 那么用户与用户组又可以延伸出三个对象: 文件所有者(User), 用户组成员(Group), 其他人(Others).

::: tip 注意

文件所有者(User), 用户组成员(Group)两者权限具有排他性, 这是Linux隐私保护的关键.

:::

当一个用户创建某个文件时, 这个文件的属性信息中文件所有者就是该用户, 该用户拥有管理这个文件的最高权限, 且具有排他性, 除非开放权限, 否则其他用户不能查看修改和执行这个文件.

当用户希望只对部分用户开放权限的话, 就需要用户组(Group)了. 通过规划合适恰当的用户组, 可以实现这个效果: 同组成员之间可以共享文件, 但对非组内成员保持私有.

而其他人(Others)的含义是指与文件没有联系的其他用户.

::: tip 注意

一个用户至少有一个用户组. 即一个用户组可以有多个用户也可以没有用户, 每个用户又可以有多个用户组, 但不能没有用户组, 不能孤立.

:::

## 上帝

在Linux系统中, 有这样的一个用户担任上帝的角色, 那就是root用户.

root用户是系统中的唯一的超级管理员, 它拥有系统的所有权限, 可以执行任何想做的操作, 但高度的自由往往也意味危险. 因此出于安全考虑, 日常使用我们是不使用root用户的.

::: tip 注意

root用户所在的用户组就是root用户组. 处于root用户组的用户都能通过sudo命令来获取管理员权限.

:::

## 相关的系统文件

在庞大的用户群中权限问题必然是纷杂错乱的, 那么系统会如何对这些用户进行管理?

系统是通过以下四个文件夹来记录用户信息(帐号密码等)的:
 - /etc/passwd
 - /etc/shadow
 - /etc/group
 - /etc/gshadow

### /etc/passwd

该文件是管理用户UID/GID重要参数的文件, 每一行的存储格式为:
```yaml
用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
```

::: details 参数详解

**用户名**是代表用户帐号的字符串, 通常长度不会超过8字符, 由大小写字母或数字构成, 显然用户名中间是不可以带`:`字符的, 因为它是作为该文件的分隔符.

**口令**存放着加密后的口令字. 虽然这里存放着的不是明文, 但对所有用户都可读, 这是一个安全隐患, 因此许多系统使用shadow技术, 将真正的加密后的口令字存放在/etc/shadow文件中, 而在这里只留下一个特殊字符, 如"x"或者"*".

**用户标识号**是一个整数, 系统内部用它来标识用户. 通常它与用户名一一对应, 若几个用户名的用户标识号是一样的, 系统内部会将它们视作同一个用户, 而它们却可以有不同的口令、主目录和登陆Shell. 通常取值范围是[0, 65535], 其中0是上帝的标识号, [1, 99]由系统保留, 作为管理账号, 普通用户的标识号从100开始, 但在Linux中是从500开始的.

**组标识号**字段记录的是用户所在的用户组, 这里的信息在/etc/group文件中有对应的记录.

**注释性描述**记录着用户的一些个人情况, 没有什么实际用途, 没有具体规定的统一格式, 它将用作finger命令的输出.

**主目录**是用户的起始工作目录, 是用户登录系统之后所在的位置, 大多系统中各用户的主目录是组织在同一个特定目录下的, 而用户主目录的名称就是该用户的登录名. 用户具有对自己主目录的读写执行搜索权限, 而其他用户对此目录的访问权限依情况而定.

**登录Shell**是用户登录后启动的一个进程. 这个进程负责将用户的操作传递给内核, 是用户登录到系统后运行的命令解释器或某个特定程序, 即Shell.

:::

::: tip 伪用户

伪用户是系统中独有的一类用户, 在/etc/passwd文件中也占有记录, 但都不能登录, 因为登录Shell为空. 它们的存在主要是为了方便系统进行管理, 满足相应系统进程对文件属主的要求.

我们常见的伪用户有:
```yaml
bin #拥有可执行的用户命令文件
sys #拥有系统文件
adm #拥有帐户文件
uucp #UUCP使用
lp #lp或lpd子系统使用
nobody #NFS使用
```

除了上面列出的伪用户外, 还有许多标准的伪用户, 例如：audit, cron, mail, usenet等, 它们也都各自为相关的进程和文件所需要.

:::

### /etc/shadow

前面说到, /etc/passwd是所有用户可读的, 如果用户的密码过于简单或者规律性比较明显的话, 很容易被破解, 因此大多Linux系统都选择将加密后的口令字分离出来, 单独存放在一个文件中, 这个文件就是/etc/shadow. 只有超级用户才拥有该文件的阅读权限, 这就保证了用户密码的安全性.

它的文件格式和/etc/passwd类似, 字段格式如下:
```yaml
登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志
```

::: details 参数详解

**登录名**是与/etc/passwd文件中的登录名相一致的用户账号

**口令**字段存放的是加密后的用户口令字, 长度为13个字符. 如果为空, 则对应用户没有口令, 登录时不需要口令；如果含有不属于集合{ . / 0-9 A-Z a-z }中的字符, 则对应的用户不能登录.

**最后一次修改时间**字段表示的是从某个时刻起, 到用户最后一次修改口令时的天数. 时间起点对不同的系统可能不一样. 例如在SCO Linux 中, 这个时间起点是1970年1月1日.

**最小时间间隔**字段指的是两次修改口令之间所需的最小天数.

**最大时间间隔**字段指的是口令保持有效的最大天数.

**警告时间**字段表示的是从系统开始警告用户到用户密码正式失效之间的天数.

**不活动时间**表示的是用户没有登录活动但账号仍能保持有效的最大天数.

**失效时间**字段给出的是一个绝对的天数, 如果使用了这个字段, 那么就给出相应账号的生存期. 期满后, 该账号就不再是一个合法的账号, 也就不能再用来登录了.

:::

### /etc/group

在/etc/passwd中提到过/etc/group, 这个文件就是用来记录各用户与各用户组之间的关系, 用户组的所有信息都存放在/etc/group文件中.

::: tip 注意

当一个用户同时是多个组中的成员时, 在/etc/passwd文件中记录的是用户所属的主组, 也就是登录时所属的默认组, 而其他组称为附加组.

用户要访问属于附加组的文件时, 必须首先使用newgrp命令使自己成为所要访问的组中的成员.

:::

此文件的格式也类似于/etc/passwd文件, 字段结构如下:
```yaml
组名:口令:组标识号:组内用户列表
```

::: details 参数详解

**组名**是用户组的名称, 由字母或数字构成. 与/etc/passwd中的登录名一样, 组名不应重复.

**口令**字段存放的是用户组加密后的口令字. 一般Linux系统的用户组都没有口令, 即这个字段一般为空, 或者是*.

**组标识号**与用户标识号类似, 也是一个整数, 被系统内部用来标识组.

**组内用户列表**是属于这个组的所有用户的列表, 不同用户之间用逗号(,)分隔. 这个用户组可能是用户的主组, 也可能是附加组.

:::

### /etc/gshadow

这个文件目前比较少见了, 因为这个文件的作用是管理群组管理员. 但类sudo的工具相继出现, 这个功能已经很少使用了. 起初设置这个的考虑是: 当Linux系统中帐号过多, 而root又可能没有时间, 这时若有用户想加入某群组的时候, root是来不及作出回应的. 这样的情况下, 设立群组管理员来帮他处理这样的事就可以解决这样的问题, 就免去麻烦root了.

该文件的字段结构如下:
```yaml
组名：加密密码：组管理员：组附加用户列表
```

::: details 参数详解

**组名**同/etc/group文件中的组名相对应.

**组密码**通常是不设置的, 因此该字段常为空, 但有时为"!", 指的是该群组没有组密码, 也不设有群组管理员.

**组管理员**从系统管理员的角度来说, 该文件最大的功能就是创建群组管理员.

**组中的附加用户**该字段显示这个用户组中有哪些附加用户, 和/etc/group文件中附加组显示内容相同.

:::

## 用户管理操作

### 增加用户

```shell
useradd 用户名
useradd -u (UID号)
useradd -p (口令)
useradd -g (分组)
useradd -s (SHELL)
useradd -d (用户目录)
```

### 修改用户

```shell
usermod -u (新UID)
usermod -d (用户目录)
usermod -g (组名)
usermod -s (SHELL)
usermod -p (新口令)
usermod -l (新登录名)
usermod -L (锁定用户账号密码)
usermod -U (解锁用户账号)
```

### 删除用户

```shell
userdel 用户名 (删除用户账号)
userdel -r 删除账号时同时删除目录
```

### 组账户维护

```shell
groupadd 组账户名 (创建新组)
groupadd -g 指定组GID
groupmod -g 更改组的GID
groupmod -n 更改组账户名
groupdel 组账户名 (删除指定组账户)
```

### 口令维护

```shell
passwd 用户账户名 (设置用户口令)
passwd -l 用户账户名 (锁定用户账户)
passwd -u 用户账户名 (解锁用户账户)
passwd -d 用户账户名 (删除账户口令)
gpasswd -a 用户账户名 组账户名 (将指定用户添加到指定组)
gpasswd -d 用户账户名 组账户名 (将用户从指定组中删除)
gpasswd -A 用户账户名 组账户名 (将用户指定为组的管理员)
```

### 用户和组状态

```shell
su 用户名(切换用户账户)
id 用户名(显示用户的UID, GID)
whoami (显示当前用户名称)
groups (显示用户所属组)
```

## 文件权限管理操作

在任意一个目录下执行`ls -lb`可以看到如下的输出:

```shell
❯ ls -lb ./
total 90988
drwxrwxrwx 35 mysql       breezeshane     4096  3月 29 15:55 AppData
drwxr-xr-x  1 breezeshane breezeshane        0  1月 19 18:03 Desktop
drwxr-xr-x  1 breezeshane breezeshane      498  4月  3 17:54 Documents
drwxr-xr-x  1 breezeshane breezeshane     2686  4月  5 12:06 Downloads
-rw-r--r--  1 breezeshane breezeshane  5624166  1月 25 01:07 EnlightenGAN_Results.zip
drwxr-xr-x  1 breezeshane breezeshane       48  1月 27 19:08 Music
drwxr-xr-x  1 breezeshane breezeshane      664  4月  3 15:05 Pictures
drwxr-xr-x  1 breezeshane breezeshane        0  1月 19 18:03 Public
drwxr-xr-x  1 breezeshane breezeshane        8  4月  4 21:26 Scripts
drwxr-xr-x  1 breezeshane breezeshane        0  1月 19 18:03 Templates
-rw-r--r--  1 breezeshane breezeshane       12  4月  5 10:24 temp.md
drwxr-xr-x  1 breezeshane breezeshane        0  1月 19 18:03 Videos
drwxr-xr-x  1 breezeshane breezeshane        0  1月 24 14:44 WinSys
```

类似`drwxr-xr-x`和`-rw-r--r--`这样的串就是在描述相关的权限信息, 左侧的第一位有如下对应的字符表示:
- `-` : 代表普通文件
- `d` : 代表目录
- `c` : 代表字符型文件
- `l` : 代表链接文件
- `s` : 代表socket
- `b` : 代表块设备
- `p` : 代表管道

后面九位中每一位字符所代表的含义如下:
- `r` : 代表允许查看文件内容, 显示目录列表.
- `w` : 代表允许修改文件内容, 允许在目录中新建删除文件或子目录.
- `x` : 代表允许运行程序, 切换目录.
- `-` : 代表没有相应的权限.

那么重复三次`rwx`有什么含义? 实际上这九位是分成三小组的, 每组有三位字符. 从左到右三小组分别对应: 文件所有者, 用户组, 其他人. 对于每一组中, 三位从左到右则表示能否读取, 能否改写和能否执行.

也就是说, 对于`EnlightenGAN_Results.zip`, 它是一个普通文件, 文件所有者有读写权限, 而用户组内其他用户和其他人只有读取权限.

实际上`r` `w` `x`三个字符都对应数字1, `-`对应数字0, 这样看`rwx`就表示二进制码`111`, 对应的十进制数字是7. 这也是为什么你会经常看见以下类似的命令:

```shell
sudo chmod 777 -R <AnyFileOrFolder>
sudo chmod 770 <AnyFileOrFolder>
sudo chmod u+x <AnyFileOrFolder>
sudo chmod g+w <AnyFileOrFolder>
sudo chmod og+r <AnyFileOrFolder>
sudo chmod +x <AnyFileOrFolder>
sudo chmod a=rwx <AnyFileOrFolder>
```

::: tip 注意

`+`前面的所写字母有三个: `u` `g` `o`, 正是分别对应着文件所有者(User), 用户组成员(Group), 其他人(Others). 如果`+`前面不写任何字母, 表示三者都赋予`+`后面的权限. 相应地你也可以把`+`改成`-`, 这样意味着去除某种权限. 如果是写成`a=`的形式, 则是表示将等号后边的值赋给所有人, 即`ugo`.

另外, 一个目录同时具有读权限和执行权限才可以打开并查看内部文件, 而一个目录要有写权限才允许在其中创建其它文件, 这是因为目录文件实际保存着该目录里面的文件的列表等信息.

:::

::: tip 冷知识

1. 决定用户能否进行sudo是通过文件`/etc/sudoers`来控制, 可以查看该文件内具体内容了解详情.
2. 如果需要禁止一个用户ssh登录, 则有两种做法:
  1. 锁定账号`usermod -L <UserName>`然后修改用户shell为不可登录`/sbin/nologin`.
  2. 修改`/etc/ssh/sshd_config`, 找到`DenyUsers`字样, 后面写上要禁止的用户名即可. 顺便一提, 如果想禁止root用户登录, 只需要找`PermitRootLogin`字样并将后面的字段改为`no`.
3. 我们可以限制ssh账号密码登录, 修改`/etc/ssh/sshd_config`, 找到`Match User`字样后将`PasswordAuthentication`后面的值改为`no`即可; 另外如果是限制所有用户的话, 找的字样就应该是`Match all`了.

:::

## 创建文件的默认权限

`umask`值用于设置用户在创建文件时的默认权限. 默认设置是写在`/etc/profile`和`/etc/bashrc`两个环境配置文件中的.

执行`umask`可以看到当前用户的值. 执行`umask <NUM>`可以临时修改umask值, 但如果想永久生效的话, 就要写入到`/etc/profile`、`/etc/bashrc`、`~/.bashrc`和`~/.bash_profile`这四个文件之一了, 具体写入哪里是看需求的.

umask决定创建文件的默认权限是这样做的:

 - 如果创建的是目录, 则使用777-umask值.
 - 如果创建的是文件, 而如果umask的三位都为偶数的话, 则直接使用666去减掉umask值;  而如果umask值某一位为奇数, 则666减去umask值后再在奇数位上加1.

::: tip 为什么创建文件时会这样麻烦?

因为在Linux中, 深入贯彻了一点：文件默认不应该有执行权限, 否则是危险的,

:::

## 一些目录的权限分配

|路径|作用|
|:---:|:---:|
|/usr/local/sbin|自己编译的、根用户才能访问的目录|
|/usr/local/bin|自己编译的、大家都能访问的目录|
|/usr/sbin、/sbin<br>（只是/usr/sbin的链接, 至少ubuntu是如此）|系统的或安装的、根用户才能访问的目录|
|/usr/bin、/bin<br>（它只是/usr/bin的链接, 至少ubuntu是如此）|系统的或安装的、大家都能访问的目录|
|/usr/share|存放一些共享数据, 如文档等|
|/usr/lib|存放软件所需的库文件|
|/etc|存放配置文件|
|/opt|一些可选的软件会安装在这里, 可选就是用户自己安装的一些无足轻重与系统无关的应用比如tomcat|

- 系统级的组件放在/bin、/lib
- 根用户才能访问的放在/sbin
- 系统repository提供的应用程序放在/usr/bin、/usr/lib
- 用户自己编译的放在/usr/local/XXX
- 所有用户皆可用的系统程序放在/bin
- 超级用户才能使用的系统程序放在/sbin
- 所有用户都可用的应用程序放在/usr/bin
- 超级用户才能使用的应用程序放在/usr/sbin
- 所有用户都可用的与本地机器无关的程序存放在/usr/local/bin
- 超级用户才能使用的与本地机器无关的程序存放在/usr/local/sbin

## 隐藏权限

隐藏权限涉及到两个命令: `chattr`和`lsattr`.

### chattr

`chattr`的用法为:
```shell
chattr [+-=] [OPTION] FileOrFolder
```

其中`+`, `-`, `=`分别表示添加, 去除, 赋值为后面的属性. OPTION可支持的参数如下表:

|属性|描述|
|:-:|:-:|
|**a**|**append, 只允许在文件中进行追加操作, 不能删减原文件内容, 只有root用户拥有该属性的设置权限**|
|A|不允许更新文件的访问时间|
|c|compressed, 文件在磁盘上会自动压缩, 在读取的时候将会自动解压缩. 存储时, 先压缩再存储, 对大文件非常有用|
|d|dump, 不能使用dump命令备份文件|
|D|更改会同步保存在磁盘上|
|e|extent format, 表明该文件使用磁盘上块的映射扩展|
|**i**|**immutable, 不能更改, 重命名或者删除该文件, 只有root用户拥有该属性的设置权限**|
|j|journaling, 文件的数据先保存在日志中, 然后再写入文件|
|S|synchronous, 变更或更改同步保存在磁盘上|


### lsattr

`lsattr`的用法为:
```shell
lsattr [-a|d|R] Directory|File
```
其中:
 - a表示显示所有的隐形属性
 - d表示显示目录
 - R表示递归显示

::: info 注意

据说只能在ext2, ext3, ext4和xfs等文件系统上生效, 目前我还没做过相关实验, 暂不能确定.

:::

## 特殊权限

### SUID

**该权限出现于文件拥有者的**`x`**权限之上**, 它具有如下使用限制和功能：

1. 该权限仅对于二进制程序有效,
2. 使用者对于该程序需具有`x`执行权限,
3. 程序执行过程中, 使用者暂时具有程序拥有者的所有权限,

换言之, 如果使用者有权执行某程序, 且此程序具有 SUID 权限, 则程序执行时是以程序拥有者的身份执行的,

### SGID

**该权限出现于文件所在群组的**`x`**权限之上**, 它具有如下使用限制和功能：

1. 该权限仅对二进制程序和目录有效,
2. 如果该权限作用于二进制程序, 且使用者对于该程序具有`x`执行权限, 则程序执行过程中, 使用者暂时具有该程序所在群组的群组身份,
3. 如果该权限作用于目录, 且使用者对于该目录具有`wx`权限, 则使用者在此目录下的有效群组暂时变更为该程序所在群组,

### SBIT

**该权限出现于其他人的**`x`**权限之上**, 它具有如下使用限制和功能：

1. 该权限仅对目录有效,
2. 如果使用者对于该目录具有`wx`权限, 则使用者在此目录下创建的文件, 只能由使用者自己或 root 删除, 即该目录下某文件的删除权利仅限于文件拥有者和`root`用户,

::: tip

如果某文件拥有 SUID 权限, 则表明此文件拥有者同时具有`x`权限, 同理可得`SGID`和`SBIT`.

:::

与普通`rwx`权限类似, 同样存在两种设置特殊权限的写法：
 - 数字类型表示特殊权限: `100`表示 SUID, `010`表示 SGID, `001`表示 SBIT, 此时设置命令可表示为: `chmod 7*** fileName`(`*`表示`r`, `w`, `x`, `-`四个字符中的任意一个).
 - 符号类型表示特殊权限: 如果是三个特殊权限都要设置, 此时命令应该是: `chmod ug+s,o+t fileName`.

## ACL权限

### ACL的概念是什么

ACL的全称是 Access Control List (访问控制列表) , 一个针对文件/目录的访问控制列表, 它在UGO权限管理的基础上为文件系统提供一个额外的、更灵活的权限管理机制, 它被设计为UNIX文件权限管理的一个补充, ACL允许你给任何的用户或用户组设置任何文件/目录的访问权限,

### ACL的用处有什么

既然是作为UGO权限管理的补充, ACL自然要有UGO办不到或者很难办到的本事, 例如：
1. 可以针对用户来设置权限
2. 可以针对用户组来设置权限
3. 子文件/目录继承父目录的权限

### ACL要怎么用

#### getfacl

该命令的用法为: `getfacl <FileNameOrDirectoryName>`

#### setfacl

该命令的用法为:
```shell
setfacl [-bkRd] [{-m|-x} acl参数] 文件/目录名
```
 - `-m`：设定ACL权限(modify)
 - `-x`：删除指定的ACL权限, 可以指定用户、组和文件来删除(remove)
 - `-M`：写了ACL条目的文件, 将从此文件中读取ACL条目, 需要配合-m, 所以-M指定的是modify file
 - `-X`：写了ACL条目的文件, 将从此文件中读取ACL条目, 需要配合-x, 所以-X指定的是remove file
 - `-n`：不重置mask
 - `-b`：删除所有的ACL权限
 - `-d`：设定默认ACL权限, 只对目录有效, 设置后子目录(文件)继承默认ACL, 只对未来文件 有效
 - `-k`：删除默认ACL权限
 - `-R`：递归设定ACL权限, 只对目录有效, 只对已有文件有效

acl参数的写法是: `*:UserName:xxx`, 其中`*`表示`u` `g` `o`三者的任意组合, `xxx`表示授予的权限, 是`r` `w` `x`的任意组合之一. 如果想实现子文件或目录继承父目录权限的话, 需要在`*`前面加上`d:`, 表示设定默认值, 但这个参数只能给目录设定, 文件显然是不合法的.

::: info 注意

参数`-m`实际上是更改文件或目录的权限, 是一种写覆盖操作, 而不是增量更新操作.

:::

如果使用了`setfacl --set`的话, 后面不能只描述ACL权限, 而是要描述完整的UGO权限. 另外, 如果设置权限时打算不授予任何权限的话, `-`至少保留一个; 其他情况下`-`都可以省略不写.

值得一提的是, ACL权限是可以**备份恢复**的, 我们要做的是使用`getfacl`来递归描述文件结构中各文件或目录的权限信息, 并写入到一个备份档案(就是任意一个新建的文件)中, 然后通过`setfacl --restore <PATH/TO/FILE>`来实现恢复整个文件结构的权限.

**例**:
```shell
getfacl -R <YourDirectory>
setfacl --restore <YourDirectory>
```

针对文件的话调整一下参数即可, 这里不作赘述.

### ACL也有mask!

ACL的mask设定方式为:
```shell
setfacl -m m:[rwx] <YourFileOrDirectory>
```

设置mask后会将mask权限与已有的acl权限进行按位与计算, 计算后的结果会成为新的ACL权限,

::: warning 注意

默认每次设置文件的acl都会重置mask为此次给定的用户的值, 也就是说当你修改某一对象的权限时, 与它有关的所有mask都会重新进行计算, 接连地更改其他文件的权限. 这样的话, 若一个文件上要设置多个用户的acl, 重置mask后就会对已有用户的acl重新计算, 而使得acl权限得不到有效的控制. 因此`setfacl`就提供了参数`-n`, 表示此次设置不会重置mask值.

:::
