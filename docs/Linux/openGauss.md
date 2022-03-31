---
title: 在Arch系中安装openGauss(全失败过程)
date: 2022-03-30 18:09:59
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
tags: 
 - Linux
 - openGauss
---
## openGauss下载

官网至给出了CentOS和Windows系统下的安装包, 但考虑同样是Linux, openGauss也应该可以安装在Arch系上, 故有此笔记.

去[官方网站](https://opengauss.org/zh/download.html)下载CentOS版本的包.

## openGauss安装

按照官方文档给出的, 我们执行
```shell
mkdir ~/openGauss && tar -jxf openGauss-x.x.x-openEuler-64bit.tar.bz2 -C ~/openGauss
```

::: tip 为什么不安装在/opt/openGauss下

因为`/opt`目录是归属于root用户组的, 如果安装在这里会导致一系列的权限问题, 有时连`chmod 777`也不能解决, 因此我建议避开这个问题, 直接安装到普通用户组下的目录.

::: 

继续执行:

```shell
cd ~/openGauss/simpleInstall
sh install.sh  -w  "xxxx" && source ~/.bashrc
```

然后这时候遇到了报错: 

::: danger Error

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
install.sh: line 215: gs_initdb: command not found
[step 7]: start datanode
install.sh: line 221: gs_ctl: command not found
import sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
```

:::

看到`command not found`就可以知道, 这是因为系统不知道这两个程序在哪里, 解决方案自然是手动添加环境变量, 我们在`~/.bashrc`里的最后一行添加`export PATH="$HOME/openGauss/bin:$PATH"`然后执行`source ~/.bashrc`更新一下. Zsh同理.

为什么会知道加这个路径能解决? 这是因为我通过执行`tree ./ | bat`后查找到这两个程序的, 然后就能顺利找到他们所在的位置.

但这还没完, 又遇到报错:

::: danger Error

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
gs_initdb: error while loading shared libraries: libreadline.so.6: cannot open shared object file: No such file or directory
[step 7]: start datanode
gs_ctl: error while loading shared libraries: libreadline.so.6: cannot open shared object file: No such file or directory
import sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
```

:::

经过查找资料了解到`libreadline.so.6`是位于`/lib/`目录下, 于是我执行`ls /lib/ | grep libreadline.so`来查看我当前拥有的组件:
```shell
libreadline.so
libreadline.so.8
libreadline.so.8.1
```
于是我做了一个软链接来解决找不到`libreadline.so.6`的问题, 执行`sudo ln -s /lib/libreadline.so.8 /lib/libreadline.so.6`.

再次运行又遇到了报错:

::: danger Error

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
gs_initdb: error while loading shared libraries: libcrypt.so.1: cannot open shared object file: No such file or directory
[step 7]: start datanode
gs_ctl: error while loading shared libraries: libcrypt.so.1: cannot open shared object file: No such file or directory
import sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
```

:::

经过查询是缺少了内核`libxcrypt-compat`, 安装一下即可.

再次遇到报错:

::: danger Error

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
/home/breezeshane/openGauss/bin/gaussdb: error while loading shared libraries: libeSDKOBS.so: cannot open shared object file: No such file or directory
no data was returned by command ""/home/breezeshane/openGauss/bin/gaussdb" -V"
The program "gaussdb" is needed by gs_initdb but was not found in the
same directory as "/home/breezeshane/openGauss/bin/gs_initdb".
Check your installation.
[step 7]: start datanode
gs_ctl: error while loading shared libraries: libgssapi_krb5_gauss.so.2: cannot open shared object file: No such file or directory
import sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
```

:::

看报错是说`libeSDKOBS.so`文件找不到了, 可以确定是某环境变量缺少了这个东西的所在目录. 但我不能确定这个文件在哪, 于是先执行了`sudo find / -name libeSDKOBS.so`来查找, 然后发现:

```shell
/home/breezeshane/OpenGauss/lib/libeSDKOBS.so
/home/breezeshane/openGauss/lib/libeSDKOBS.so
find: ‘/proc/10096/task/10096/net’: Invalid argument
find: ‘/proc/10096/net’: Invalid argument
find: ‘/proc/65449/task/65449/net’: Invalid argument
find: ‘/proc/65449/net’: Invalid argument
/run/timeshift/backup/@home/breezeshane/OpenGauss/lib/libeSDKOBS.so
/run/timeshift/backup/@home/breezeshane/openGauss/lib/libeSDKOBS.so
find: File system loop detected; ‘/run/timeshift/backup/@’ is part of the same file system loop as ‘/’.
find: ‘/run/user/1000/doc’: Permission denied
find: ‘/run/user/1000/gvfs’: Permission denied
```

头两行引起了我的注意, 然后我再查看`LD_LIBRARY_PATH`环境变量`echo $LD_LIBRARY_PATH`, 果然发现它没有这个路径, 于是我手动添加了这个环境变量, 执行`export LD_LIBRARY_PATH="$HOME/openGauss/lib:$LD_LIBRARY_PATH"`. 

又双遇到了问题:

::: danger Error

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
/home/breezeshane/openGauss/bin/gaussdb: error while loading shared libraries: libncurses.so.5: cannot open shared object file: No such file or directory
no data was returned by command ""/home/breezeshane/openGauss/bin/gaussdb" -V"
The program "gaussdb" is needed by gs_initdb but was not found in the
same directory as "/home/breezeshane/openGauss/bin/gs_initdb".
Check your installation.
[step 7]: start datanode
[2022-03-30 20:53:54.259][100140][][gs_ctl]: gs_ctl started,datadir is /home/breezeshane/openGauss/data/single_node 
[2022-03-30 20:53:54.259][100140][][gs_ctl]: can't create lock file "/home/breezeshane/openGauss/data/single_node/pg_ctl.lock" : No such file or directoryimport sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
```

:::

经过查找资料, 确认造成这个问题的原因就是在于版本滞后导致缺失运行库, 我们查看一下当前有的运行库, 执行`ls -1 /usr/lib/libncurses*`, 在这里我得到的结果是:

```shell
/usr/lib/libncurses++.so
/usr/lib/libncurses.so
/usr/lib/libncurses++w_g.a
/usr/lib/libncursesw_g.a
/usr/lib/libncurses++w.so
/usr/lib/libncursesw.so
/usr/lib/libncurses++w.so.6
/usr/lib/libncursesw.so.6
/usr/lib/libncurses++w.so.6.3
/usr/lib/libncursesw.so.6.3
```

接着我们执行
```shell
sudo ln -s /usr/lib/libncursesw.so.6.0 /usr/lib/libncurses.so.5
sudo ln -s /usr/lib/libncursesw.so.6.0 /usr/lib/libtinfo.so.5
```
即可解决这个问题.

最后重新执行即可大功告成, 以下是当时输出的信息:

::: details Info

```shell
[step 1]: check parameter
[step 2]: check install env and os setting
[step 3]: change_gausshome_owner
[step 4]: set environment variables

[step 6]: init datanode
The files belonging to this database system will be owned by user "breezeshane".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.UTF-8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

creating directory /home/breezeshane/openGauss/data/single_node ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers ... 32MB
creating configuration files ... ok
Begin init undo subsystem meta.
[INIT UNDO] Init undo subsystem meta successfully.
creating template1 database in /home/breezeshane/openGauss/data/single_node/base/1 ... The core dump path is an invalid directory
2022-03-30 21:05:33.466 [unknown] [unknown] localhost 139689665127360 0[0:0#0]  [BACKEND] WARNING:  macAddr is 39087/1707678456, sysidentifier is 2561631689/452484890, randomNum is 3818217242
ok
initializing pg_authid ... ok
setting password ... ok
initializing dependencies ... ok
loading PL/pgSQL server-side language ... ok
creating system views ... ok
creating performance views ... ok
loading system objects' descriptions ... ok
creating collations ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
initialize global configure for bucketmap length ... ok
creating information schema ... ok
loading foreign-data wrapper for distfs access ... ok
loading foreign-data wrapper for hdfs access ... ok
loading foreign-data wrapper for log access ... ok
loading hstore extension ... ok
loading foreign-data wrapper for MOT access ... ok
loading security plugin ... ok
update system tables ... ok
creating snapshots catalog ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok
freezing database template0 ... ok
freezing database template1 ... ok
freezing database postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run gs_initdb.

Success. You can now start the database server of single node using:

    gaussdb -D /home/breezeshane/openGauss/data/single_node --single_node
or
    gs_ctl start -D /home/breezeshane/openGauss/data/single_node -Z single_node -l logfile

[step 7]: start datanode
[2022-03-30 21:06:05.221][105616][][gs_ctl]: gs_ctl started,datadir is /home/breezeshane/openGauss/data/single_node 
[2022-03-30 21:06:05.290][105616][][gs_ctl]: waiting for server to start...
.0 LOG:  [Alarm Module]can not read GAUSS_WARNING_TYPE env.
	
0 LOG:  [Alarm Module]Host Name: Arknights 
	
0 LOG:  [Alarm Module]Host IP: 127.0.1.1 
	
0 LOG:  [Alarm Module]Get ENV GS_CLUSTER_NAME failed!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 WARNING:  not found GAUSSHOME enviroment variable.
0 WARNING:  failed to open feature control file, please check whether it exists: FileName=gaussdb.version, Errno=2, Errmessage=No such file or directory.
0 WARNING:  failed to parse feature control file: gaussdb.version.
0 WARNING:  Failed to load the product control file, so gaussdb cannot distinguish product version.
The core dump path is an invalid directory
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  when starting as multi_standby mode, we couldn't support data replicaton.
gaussdb.state does not exist, and skipt setting since it is optional.2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]can not read GAUSS_WARNING_TYPE env.
	
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]Host Name: Arknights 
	
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]Host IP: 127.0.1.1 
	
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]Get ENV GS_CLUSTER_NAME failed!
	
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
Get environment of GAUSSHOME failed.
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] FATAL:  Get environment of GAUSSHOME failed.
	
[2022-03-30 21:06:06.291][105616][][gs_ctl]: waitpid 105619 failed, exitstatus is 256, ret is 2

[2022-03-30 21:06:06.291][105616][][gs_ctl]: stopped waiting
[2022-03-30 21:06:06.291][105616][][gs_ctl]: could not start server
Examine the log output.
import sql file
Would you like to create a demo database (yes/no)? no
Input no, operation skip.
❯ gaussdb
0 LOG:  [Alarm Module]can not read GAUSS_WARNING_TYPE env.
	
0 LOG:  [Alarm Module]Host Name: Arknights 
	
0 LOG:  [Alarm Module]Host IP: 127.0.1.1 
	
0 LOG:  [Alarm Module]Get ENV GS_CLUSTER_NAME failed!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 WARNING:  not found GAUSSHOME enviroment variable.
0 WARNING:  failed to open feature control file, please check whether it exists: FileName=gaussdb.version, Errno=2, Errmessage=No such file or directory.
0 WARNING:  failed to parse feature control file: gaussdb.version.
0 WARNING:  Failed to load the product control file, so gaussdb cannot distinguish product version.
The core dump path is an invalid directory
 0 [BACKEND] LOG:  environment variable $PGDATA is NULL or size is out of 1024
	
 0 [BACKEND] FATAL:  Incorrect backend environment variable $PGDATA
 0 [BACKEND] DETAIL:  Please refer to the backend instance log for the detail
 ```

:::

## openGauss配置

安装完成之后我们执行`ps ux | grep gaussdb`和`gs_ctl query -D $HOME/openGauss/data/single_node`来查看进程是否正常. 以下是具体输出细节.

::: details Info

```shell
❯ ps ux | grep gaussdb
breezes+  107155  0.0  0.0  11536  2676 pts/1    S+   21:09   0:00 grep --color=auto gaussdb
❯ gs_ctl query -D ~/openGauss/data/single_node
[2022-03-30 21:10:17.458][107813][][gs_ctl]: gs_ctl query ,datadir is /home/breezeshane/openGauss/data/single_node 
[2022-03-30 21:10:17.458][107813][][gs_ctl]:  invalid data in PID file "/home/breezeshane/openGauss/data/single_node/postmaster.pid"
```

:::

官方文档给出的`gs_om`是一种专门用来管理openGauss的操作工具, 全称应该是 openGauss Operation Manager, 于是我去搜索了一下这个工具, 果然GitHub上确实有这个工具的源代码, 在这里给出链接: [openGauss-OM](https://github.com/opengauss-mirror/openGauss-OM).

我们可以拉取下来然后编译构建, 执行:
```shell
git clone https://github.com/opengauss-mirror/openGauss-OM
cd openGauss-OM
```
中间出现了小差池, 我误以为那个是`gs_om`的源代码, 需要我做编译才能得到, 但后来通过`tree . | bat`查看后发现它其实是一个脚本. 于是我确认它的位置之后, 手动添加了环境变量`export PATH="$HOME/openGauss/openGauss-OM/script:$HOME/openGauss/bin:$PATH"`, 这样就可以直接使用`gs_om`了, 当我执行`gs_om -t status --detail`时给出了报错: `zsh: permission denied: gs_om`.

于是我执行`ls -lb openGauss-OM/script`来查看相关权限情况的时候, 发现给出的信息是:
```shell
total 400
drwxr-xr-x 1 breezeshane breezeshane   156  3月 30 23:10 base_diff
drwxr-xr-x 1 breezeshane breezeshane    82  3月 30 23:10 base_utils
drwxr-xr-x 1 breezeshane breezeshane    62  3月 30 23:10 config
drwxr-xr-x 1 breezeshane breezeshane   130  3月 30 23:10 domain_utils
-rw-r--r-- 1 breezeshane breezeshane  8916  3月 30 23:10 gs_backup
-rw-r--r-- 1 breezeshane breezeshane 64836  3月 30 23:10 gs_check
-rw-r--r-- 1 breezeshane breezeshane 60769  3月 30 23:10 gs_checkos
-rw-r--r-- 1 breezeshane breezeshane 10802  3月 30 23:10 gs_checkperf
-rw-r--r-- 1 breezeshane breezeshane 16485  3月 30 23:10 gs_collector
-rw-r--r-- 1 breezeshane breezeshane 14625  3月 30 23:10 gs_dropnode
-rw-r--r-- 1 breezeshane breezeshane 24871  3月 30 23:10 gs_expansion
-rw-r--r-- 1 breezeshane breezeshane 12400  3月 30 23:10 gs_install
-rw-r--r-- 1 breezeshane breezeshane 32869  3月 30 23:10 gs_om
-rw-r--r-- 1 breezeshane breezeshane 15724  3月 30 23:10 gs_postuninstall
-rw-r--r-- 1 breezeshane breezeshane 19588  3月 30 23:10 gs_preinstall
drwxr-xr-x 1 breezeshane breezeshane   120  3月 30 23:10 gspylib
-rw-r--r-- 1 breezeshane breezeshane  9048  3月 30 23:10 gs_ssh
-rw-r--r-- 1 breezeshane breezeshane 57267  3月 30 23:10 gs_sshexkey
-rw-r--r-- 1 breezeshane breezeshane  6347  3月 30 23:10 gs_uninstall
-rw-r--r-- 1 breezeshane breezeshane 13305  3月 30 23:10 gs_upgradectl
drwxr-xr-x 1 breezeshane breezeshane   196  3月 30 23:10 impl
-rw-r--r-- 1 breezeshane breezeshane     0  3月 30 23:10 __init__.py
-rw-r--r-- 1 breezeshane breezeshane  6110  3月 30 23:10 killall
drwxr-xr-x 1 breezeshane breezeshane   974  3月 30 23:10 local
drwxr-xr-x 1 breezeshane breezeshane   222  3月 30 23:10 os_platform
```
显然`gs_om`缺少执行权限, 于是我执行`sudo chmod o+x openGauss-OM/script/gs_om`后即可通过zsh来使用`gs_om`了.

但是, 最后我执行`gs_om -t status --detail`的时候给出了报错:

::: danger Real Error

```shell
❯ gs_om -t status --detail
Traceback (most recent call last):
  File "/home/breezeshane/openGauss/openGauss-OM/script/gs_om", line 29, in <module>
    from gspylib.common.ParameterParsecheck import Parameter
  File "/home/breezeshane/openGauss/openGauss-OM/script/gspylib/common/ParameterParsecheck.py", line 27, in <module>
    from gspylib.common.Common import DefaultValue
  File "/home/breezeshane/openGauss/openGauss-OM/script/gspylib/common/Common.py", line 96, in <module>
    from os_platform.UserPlatform import g_Platform
  File "/home/breezeshane/openGauss/openGauss-OM/script/os_platform/UserPlatform.py", line 67, in <module>
    g_Platform = UserPlatform().userPlatform
  File "/home/breezeshane/openGauss/openGauss-OM/script/os_platform/UserPlatform.py", line 48, in __init__
    raise Exception(ErrorCode.GAUSS_519["GAUSS_51900"] +
Exception: [GAUSS-51900] : The current OS is not supported.Supported platforms are: ['suse', 'redhat', 'centos', 'euleros', 'openeuler', 'kylin', 'asianux', 'debian', 'ubuntu'].
```

:::

我的评价是: 寄!!!

虽然咱没有现成的, 我们还是可以自行编译的, 不是说毫无希望.

## 重整旗鼓

官方文档说要保证以下依赖都已经安装好:
```
libaio-devel
ncurses-devel
pam-devel
libffi-devel
python3-devel
libtool
libtool-devel 
libtool-ltdl
python-devel
openssl-devel
bison
```
我亲自搜索考察, 确认是当前系统装有以上依赖. 文档提到需要装gcc7.3和cmake(>=3.16.5), 当前我的状态是cmake满足了条件, 但gcc是11.2.0, 版本差距过大, 又回想到曾经使用Manjaro的时候gcc版本更迭后系统出现了问题, 因此认为gcc11不能直接编译(没有亲自实践过, 如果确实能编译, 欢迎前来指正), 我便转而去安装gcc(7.5.0).

> 编译要很久的, 如果正好是晚上的话我建议你先睡一觉. 另外提示一下, 这个编译功耗比较大, 如果只有笔记本电源支撑的话建议不要编译.

终于编译完成了, 现在我们下载openGauss的第三方依赖库, 下载完之后我们进行编译, 执行: 
```shell
git clone https://gitee.com/opengauss/openGauss-third_party.git
```
但事情总不会这样顺利, 再次遇到报错:

::: danger Error

```shell
❯ git clone https://gitee.com/opengauss/openGauss-third_party.git
Cloning into 'openGauss-third_party'...
remote: Enumerating objects: 2936, done.
remote: Counting objects: 100% (496/496), done.
remote: Compressing objects: 100% (466/466), done.
error: 8112 bytes of body are still expectedB | 2.16 MiB/s     
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

:::

于是我继续查询, 发现它出错的原因是拉取的项目体积过大导致报错，连接中断了. 好吧, 几经折腾才发现其实是网络问题, 换手机热点就能解决了......

好的, 接下来我们进入到build文件夹下, 按照官方文档给出的那样, 执行`sh build_all.sh`, 然后看见了这个报错:

::: danger Error

```shell
❯ sh build_all.sh
--------------------------------openssl-------------------------------------------------
Traceback (most recent call last):
  File "build.py", line 308, in <module>
    Operator.build_mode()
  File "build.py", line 96, in build_mode
    self.binary_parser()
  File "build.py", line 87, in binary_parser
    assert False
AssertionError
```

:::

不了解发生了什么, 但是又想到这里其实是在编译依赖库, 我既然已经比对好相应的依赖, 不编译也没关系, 于是直接拉取了openGauss-server的源代码试图直接编译.

最后我遇到了这个报错: 

::: danger Error

```shell
❯ sh build.sh -m release -3rd ~/binarylibs
ROOT_DIR : /home/breezeshane/openGauss-server
We only support openEuler(aarch64), EulerOS(aarch64), CentOS, Kylin(aarch64) platform.
```

:::

于是我就知道了, 解决这个问题就应该直接去执行: 

```shell
rm -rf openGauss-* binarylibs
```

至此这篇文章就已经结束了.