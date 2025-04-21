---
title: TeXlive-LaTeX 使用
date: 2022-03-18
category:
 - Diverse Essays
tag:
 - Topic
 - Journal
 - Discussion
---

## TeX Studio安装宏包

在ArcoLinux+AwesomeWM环境下,TeX Studio要操作的文件夹位于:`/usr/share/texmf/tex/latex/`.

然后从宏包的官网上下载相应的文档,如果遇到`sty`文档的话(它是已经编译好的宏包文档),下载过来放在上面那个文件夹就好;如果是一个压缩包,解压出来后将文件夹命名为包的名字后直接放在上面的目录即可.

通过终端执行`sudo texhash`(一定要加管理员权限,因为该目录下权限归属于Root用户).

重启TeX Studio即可正常使用.

::: tip 宏包官网

[CTAN](https://ctan.org/)

:::

## 我常用的宏包

1. algorithm, algorithmicx, algpseudocode, amsmath, amssymb
   注: 伪代码的相关宏包我是通过终端执行`sudo pacman -S texlive-science`解决的.
2. tikz, tikz-qtree

::: info On building...
:::
