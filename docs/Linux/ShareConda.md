---
title: Linux 共享 Anaconda
date: 2022-04-05 13:07:23
author: Breeze Shane
top: false
toc: true
mathjax: true
categories:
 - Linux
tags:
 - Linux
 - Anaconda
 - Multiple Users Share
---

> 安装Anaconda的步骤这里不做详细记述.

恰好有朋友需要和我共享同一个服务器, 但是我已经用过一段时间了, 要说共用一个用户简直不现实, 于是我就决定使用Linux的多用户机制了. 接着我以root用户登录了服务器.

为了便于分配权限, 我们需要创建相应的用户组, 执行:
```shell
groupadd anaconda
```
然后将所有需要加入的用户加到这个组中, 执行:
```shell
usermod -a -G anaconda <UserToAdd>
```
然后我们做一下文件的相关更改:
```shell
chgrp -R anaconda /opt/anaconda/
chmod 770 -R /opt/anaconda/
```
考虑到低权限用户会在这里进行后续的读写等操作, 用户创建的新文件也需要有自己的权限去管理, 因此我们需要做一下组继承, 执行:
```shell
chmod g+s /opt/anaconda
chmod g+s `find /opt/anaconda -type d`
```
第二行的意思是设置/opt/anaconda下的所有子文件夹的组继承.

接着我们切到低权限用户视角来看, 发现使用conda会提示unknown command, 这是因为我们没有为它添加环境变量, 添加一下就好, 这里需要我们修改/etc/profile文件, 然后在最后一行添加如下语句:
```shell
export PATH="/opt/anaconda/bin:$PATH"
```
保存即可.

然后用户需要先完成初始化, 执行`conda init bash`, 接着你会发现登出后再重新登录, 还是使用不了conda, 只当执行了`source ~/.bashrc`才能继续使用conda, 因此需要编辑一下`.profile`文件, 执行`vim $HOME/.profile`后输入以下内容:
```shell
if [ -s $HOME/.bashrc ]; then
  source $HOME/.bashrc;
fi
```
保存后重新登录即可.

另外我发现, 在低权限用户的home目录下好像缺少了很多权限, 结果一看, 我之前是使用root用户给他创建的, 因此那个文件夹的拥有者和用户组都是属于root的, 因此我还需要修改一下, 执行:
```shell
sudo chown -R <YourUserName> <YourUserName>
sudo chgrp -R <YourUserName> <YourUserName>
```

这样就大功告成了!
