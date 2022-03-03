---
title: Shell全自动安装与部署Anaconda
date: 2021-12-13 01:36:37
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
 - Shell
tags: 
 - Linux
 - Anaconda
 - Shell
---

## 背景

因为学校布置了一个在openEuler上的综合大作业，我和比较多的同学们选择了部署安装深度学习的主题，但同学们苦于配置环境非常繁琐。我就产生了编写全自动化Shell部署安装脚本的想法，特此一记。

## 实现思路

1. 下载anaconda
2. 自动化交互并安装anaconda
3. 自动配置conda和pip
4. 自动创建虚拟环境
5. 自动拉取git仓库项目
6. 自动安装requirements
7. 自动运行项目「可选」

## 分步具体实现

### 下载Anaconda

这里实现非常简单，调用wget即可，链接从官网获取：

```shell
wget https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-XXXX.sh
```

注意这里的XXXX是需要你指定类型的，一般情况下系统是使用x86架构的，写`x86_64`即可，但openEuler实验课上我们选择的系统是ARM架构，因此要写`aarch64`。

### 自动化交互并安装anaconda

通过shell实现自动化交互比较麻烦，我搜索了好长时间才知道应该如何解决，

起初我是写成这样的：

```shell
#!/usr/bin/bash
echo $'\003' | echo $KEYCODE_ENTER | sh ./Anaconda3-2021.11-Linux-XXXX.sh
```

很明显失败了，仔细想想不应该写成这样，这意思是：将<kbd>Ctrl</kbd>+<kbd>C</kbd>对应的SIGINT信号送入命令`echo $KEYCODE_ENTER | sh ./Anaconda3-2021.11-Linux-XXXX.sh`，就是中断该命令进行。

后来我的实现思路是尝试将输入的内容发送到进程中，于是在纠结如何获取进程，折腾了好久才发现，实际上在我不修改下载来的Shell Installer的话，我这样做是送不进去的。

之后我查到了有效的方法，写成这样即可按照预期进行：

```shell
{
	echo ${KEYCODE_ENTER};
	kill -SIGINT $PPID;
	echo "yes";
	echo ${KEYCODE_ENTER};
} | sh ./Anaconda3-2021.11-Linux-XXXX.sh
```

但是，当我执行的时候我就发现不论如何，中间出现的用户条例总是会弹出来，而且即使我先后尝试添加语句来输入SIGINT信号也好，输入Q也罢，都不能自动退出阅读用户条例的模式，搜索许久无果后我最终决定看安装脚本的源码，最后我发现，在这个脚本中有这样的语句：

```shell
"$pager" <<EOF
......
EOF
```

这时我才明白，我应该将问题放在如何阻止他向`$pager`写入内容，但搜索了许久也没有能满足我需求的指令，起先是觉得pager应该是个系统环境变量，但经过`env`查看之后也没能找到，虽然看到了`PAGER`，但他俩毕竟有区别，即使是我尝试创建变量$pager也于事无补，始终都不能解决问题。

于是我翻了又翻源代码，注意到这里：

```shell
pager="cat"
if command -v "more" > /dev/null 2>&1; then
pager="more"
fi
"$pager" <<EOF
```

然后我将问题中心转移在cat身上了，我查过cat的相关文档，但看了许久也没发现它有任何相关参数。

> **题外话**：我搜到过systemctl的相应解决方案，是在输入`systemctl stats`时避免出现分页器问题，这个的解决方案也简单，就是执行`export SYSTEMD_PAGER=cat `即可，原因是这个：
>
> > `$SYSTEMD_PAGER` Pager to use when `--no-pager` is not given; overrides `$PAGER`. If neither `$SYSTEMD_PAGER` nor `$PAGER` are set, a set of well-known pager implementations are tried in turn, including `less`(1) and `more`(1), until one is found. If no pager implementation is discovered no pager is invoked. Setting this environment variable to an empty string or the value "`cat`" is equivalent to passing `--no-pager`.
> 
> man page表述已经很清晰了，`$SYSTEMD_PAGER`和`$PAGER`都不存在的时候，就会尝试从`less`和`more`中加载可用的软件。
> 因此如果不想使用分页器就可以执行`export SYSTEMD_PAGER=cat`，这样当你再次输入`systemctl stats`时它也不会出现分页器了。

后来就觉得，可能问题中心还没有找到，我就又从遇到的第一个问题开始分析，从头整理思绪后，开始觉得，分页器终归是分页器，问题应该是在于它的Here Documentation内写了太多的文字信息，因此当它输出的时候即使原本配置是不用分页器的，在这样的情况下也不得不使用分页器，于是我认为应该将问题中心放在这一大段文字上。

于是我自然而然地想到了重定向问题。猛地发现，我可以使用重定向将这一大段文字清空掉，于是我写成了如下形式：

```shell
{
	echo ${KEYCODE_ENTER};
	echo "yes";
	echo ${KEYCODE_ENTER};
} | sh ./Anaconda3-2021.11-Linux-XXXX.sh > /dev/null
```

但后来我发现，这样是直接将所有输出全部丢弃掉了，有些事是还想回溯一下历史，那应该如何做？

在我进一步深入学习重定向之后，了解到了如下内容：

> 在shell脚本中，默认情况下，总是有三个文件处于打开状态，标准输入、标准输出、标准错误，它们分别对应的文件描述符是0，1，2 。
>
> `>`默认为标准输出重定向，与`1>`相同。
> `2>&1`是输出标准错误并重定向到标准输出。
>
> `&>file`是把标准输出和标准错误都重定向到文件file中。
>
> `/dev/null`是一个特殊的文件，所有传给它的东西都会被丢弃掉。
>
> `1>&2`指的是将正确返回值传递给2输出通道，`&2`表示2输出通道。
>
> `2>&1`指的是将错误返回值传递给1输出通道, 同样`&1`表示1输出通道。

结合以上的知识和我目前的需求，最后就暂时写成以下的样子：

```shell
{
	echo ${KEYCODE_ENTER};
	echo "yes";
	echo ${KEYCODE_ENTER};
} | sh ./Anaconda3-2021.11-Linux-XXXX.sh 1>./Anaconda.log 2>&1 &
```

### 自动配置conda和pip

前面的事做好的话，后面也不怎么难了，把常用的那些指令写上去就可以了。

```shell
# conda change channels
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
conda config --set show_channel_urls yes
# cat /root/.condarc

# pip change channels
pip config set global.index-url http://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
# cat /root/.config/pip/pip.conf
```

### 自动创建虚拟环境

```shell
{ echo "y"; } | conda create -n OEDL python=3.8
```

### 自动拉取git仓库项目

```shell
git clone https://hub.fastgit.org/<USERNAME>/<REPO-NAME>.git
```

### 自动安装requirements

```shell
pip install -r requirements.txt
```

### 自动运行项目「可选」

```shell
python YOUR_SCRIPT.py
```

## 强化与优化

将上述分布执行再优化一下，设置一些参数，增强其通用性。

在该脚本中，我增加了如下功能：

1. 判断文件是否已下载过，若存在则跳过下载；
2. 给出选项供用户选择不同架构下的Anaconda；
3. 提供帮助文档；
4. 允许通过传送参数修改项目来源地和虚拟环境名称；

##### 实现功能一：

基本思路就是判断文件是否存在，然后套用shell的if语法框架即可：

```shell
if [ ! -f "./Anaconda3-2021.11-Linux-${TYPE}.sh" ]; then
	wget https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-${TYPE}.sh
fi
```

**扩展：**

判断文件夹是否存在时将上段代码中`-f`改为`-d`即可；判断是否有执行权限则改为`-x`即可；判断变量是否有值则改为`-n`即可。

##### 实现功能二：

基本思路是shell分支语句的框架：

```shell
read TYPEID;
if [ $TYPEID -eq 1 ]; then
	TYPE="x86_64";
elif [ $TYPEID -eq 2 ]; then
	TYPE="aarch64";
elif [ $TYPEID -eq 3 ]; then
	TYPE="ppc64le";
elif [ $TYPEID -eq 4 ]; then
	TYPE="s390x";
else
	echo -e "Invalid type id.";
	exit 1;
fi
```

##### 实现功能三：

基本思路就是利用echo带有转义输出的控制`echo -e "<String>\n"`。

##### 实现功能四：

基本思路是利用shell脚本中的特殊变量如`$1`、`$2`、`$3`等等，分别表示第一个参数、第二个参数、第三个参数，另外注意`$0`是表示程序名。该功能还利用shell变量的特殊替换结构而设置默认值。

> shell变量特殊替换结构：
>
> `${var:-string}`：当变量var未定义或者值为空时，返回值为string的内容，否则返回变量的值。
>
> `${var:+string}`：若变量var已赋值的话，其值才用string替换，否则不进行任何替换。
>
> `${var:=string}`：若变量var未定义或者值为空时，在返回string的值的同时将string赋值给var。
>
> `${var:?string}`：若变量var已赋值的话,正常输出var的值。否则将消息string送到标准错误输出（若此替换出现在Shell程序中，那么该程序将终止运行）
>
> `${var:offset:length}`：从变量var中提取子串，这里offset和length可以是算术表达式。offset代表偏移量，从第几个字符开始提取，length是需要提取的字符串的个数。
>
> `${#var}`：变量var的字符个数。
>
> `${var#pattern}`和`${var##pattern}`：去掉var中与pattern相匹配的部分，条件是var的开头与pattern相匹配。#与##的区别在于一个是最短匹配模式，一个是最长匹配模式。
>
> `${var%pattern}`和`${var%%pattern}`：与上例相似，但是从var的尾部和pattern相匹配，%与%%的区别与#与##一样。
>
> `${var/pattern/string}` 和`${var//pattern/string}`：进行变量内容的替换，把与pattern匹配的部分替换为string的内容。`/`与`//`的区别是`/`只进行一次匹配替换，而`//`可以进行多次匹配替换。
>
> 从网上看到的模式匹配记忆方法：
>
> > `#` 是去掉左边(在键盘上`#`在`$`之左边)
> > `%` 是去掉右边(在键盘上`%`在`$`之右边)
> > `#`和`%`中的单一符号是最小匹配，两个相同符号是最大匹配。

```shell
# Variables
USER=$1
REPO=$2
ENVNAME=$3

......

# Create the virtual environment.
{ echo "y"; } | conda create -n ${ENVNAME:-"OEDL"} python=3.8

# Activate the environment.
conda activate ${ENVNAME}

......

# Download the repo.
git clone https://hub.fastgit.org/${USER:-"BreezeShane"}/${REPO:-"Unsupervised-Learning"}.git
cd ${REPO}
```

## 最终成果

```shell
#!/bin/bash

# Variables
USER=$1
REPO=$2
ENVNAME=$3

if [ $1 == "help" ]; then
	echo -e "To use the shell script, type in this format:\n\t \"source IAC.sh <USERNAME> <REPONAME> <ENVNAME>\"\nParameter Introduction:\n\t<USERNAME>: The parameter should be the name of your GitHub account. The default value is \"BreezeShane\"\n\t<REPONAME>: The parameter should be the name of your GitHub Repository you want to download. The default value is \"Unsupervised-Learning\".\n\t<ENVNAME>: The parameter should be the name of your new anaconda virtual environment. The default value is \"OEDL\"\nIf you type \"source IAC.sh help\" and then the help documentation will be displayed.\n";
	exit 0;
fi

# Download source file.
echo "Welcome to use Auto Installer!"
echo "Which kind of Anaconda3 would you like?"
echo "1. 64-Bit (x86) Installer (581 MB)"
echo "2. 64-Bit (AWS Graviton2 / ARM64) Installer (488 M)"
echo "3. 64-Bit (Power8 and Power9) Installer (255 MB)"
echo "4. 64-bit (Linux on IBM Z & LinuxONE) Installer (242 M)"

read TYPEID;
if [ $TYPEID -eq 1 ]; then
	TYPE="x86_64";
elif [ $TYPEID -eq 2 ]; then
	TYPE="aarch64";
elif [ $TYPEID -eq 3 ]; then
	TYPE="ppc64le";
elif [ $TYPEID -eq 4 ]; then
	TYPE="s390x";
else
	echo -e "Invalid type id.";
	exit 1;
fi

if [ ! -f "./Anaconda3-2021.11-Linux-${TYPE}.sh" ]; then
	wget https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-${TYPE}.sh
	echo "Anaconda Shell Installer Download Success!"
else
	echo "Anaconda Shell Installer File exists!"
fi

# Auto-Install anaconda3.
echo "Installing Anaconda3......"
{
	echo ${KEYCODE_ENTER};
	echo "yes";
	echo ${KEYCODE_ENTER};
} | sh ./Anaconda3-2021.11-Linux-${TYPE}.sh 1>./Anaconda.log 2>&1
echo "Anaconda3 now is installed!"

# Initialize anaconda.
/root/anaconda3/bin/conda init bash
. ~/.bashrc

# Create the virtual environment.
{ echo "y"; } | conda create -n ${ENVNAME:="OEDL"} python=3.8

# Activate the environment.
conda activate ${ENVNAME}

# conda change channels
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
conda config --set show_channel_urls yes
# cat /root/.condarc

# pip change channels
pip config set global.index-url http://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
# cat /root/.config/pip/pip.conf

# Download the repo.
# git clone https://hub.fastgit.org/BreezeShane/Unsupervised-Learning.git
git clone https://hub.fastgit.org/${USER:="BreezeShane"}/${REPO:="Unsupervised-Learning"}.git
# cd ${REPO}

# Install requirements.
pip install -r "${REPO}/requirements.txt"

# Run visdom server.
python -m visdom.server &

# Run the demo.
python Generative\ Adversaria\ Networks.py
```
