---
title: 入门机器学习的安装与配置
date: 2021-10-20 1:50:22
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - ArtificialIntelligence
tags: 
 - Artificial Intelligence
article: false
---

## 你可能有配备？

或许你的电脑配有独立显卡，一般可以在Windows系统下通过查看设备管理器，或者在Linux系统下通过键入`inxi -G`来查看电脑的显卡配备信息。可能你不懂什么是显卡？

> 显卡又称[显示卡](https://baike.baidu.com/item/显示卡/103062)( Graphics card)，是计算机中一个重要的组成部分，承担输出显示图形的任务，对喜欢玩游戏和从事专业图形设计的人来说，显卡非常重要。

当然，对于机器学习的学习者来说，自然也是很重要的。机器学习领域之所以会使用显卡，是因为显卡具有良好的、高度的并发运行性能，可以同时并行计算众多表达式，这一点远远超过了CPU。

## 你需要装什么？

1. [Anaconda](https://www.anaconda.com/) / [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
2. [Nvidia Driver](https://www.nvidia.cn/Download/index.aspx?lang=cn)
3. [CUDA](https://developer.nvidia.com/cuda-downloads)
4. [cuDNN](https://developer.nvidia.com/zh-cn/cudnn)
5. 一些常见的工具包
6. 你喜欢的IDE/编辑器

## 它们都是啥？

1. Anaconda/Miniconda是一个集虚拟环境管理器与包管理器于一身的计算科学工具。通过使用这个工具，你可以轻松地安装Python环境和社区内的各种工具包，并且可以很方便地创建新的虚拟环境以便日后版本切换使用，是机器学习入门的必备工具。
2. Nvidia Driver是指Nvidia显卡驱动程序。若想安装CUDA和cuDNN，安装驱动是必不可少的，必须由驱动程序来促使显卡正常运作。
3. CUDA通常指的是CUDA Toolkit，是一个完整的工具安装包，其中提供了Nvidia 驱动程序、开发CUDA 程序相关的开发工具包等可供安装的选项。至于CUDA的含义，它指的是Compute Unified Device Architecture，是一种由NVIDIA推出的通用并行计算架构，该架构使GPU能够解决复杂的计算问题。它是一个并行计算平台和编程模型，能够使得使用GPU进行通用计算变得简单和优雅。
4. cuDNN是一个专门为深度学习计算设计的软件库，里面提供了很多专门的计算函数，如卷积等。

如果想具体、深入了解这些概念，可以看看[这个](https://zhuanlan.zhihu.com/p/91334380)。

## 一些常见的工具包

### 数据科学计算工具包（建议使用时再去查询）

1. [numpy](https://numpy.org/doc/stable/)

2. [pandas](https://pandas.pydata.org/docs/)

3. [keras](https://keras.io/api/)

4. [scipy](https://www.scipy.org/docs.html)

5. [scikit-learn](https://scikit-learn.org/stable/modules/classes.html)


### 常见机器学习框架（建议学习使用其一）

1. [Tensorflow](https://www.tensorflow.org/api_docs/python/tf)
2. [Pytorch](https://pytorch.org/docs/stable/index.html)
3. [MXNet](https://mxnet.apache.org/versions/1.8.0/api/python/docs/api/)

### 常见数据可视化工具包（建议学习使用其一）

1. [tensorboard](https://www.tensorflow.org/tensorboard/get_started)
2. [visdom](https://openbase.com/js/visdom/documentation)

### 常见绘图工具

1. [matplotlib](https://matplotlib.org/stable/contents.html)

## IDE / Editor 推荐

在机器学习领域这里学习自然少不了码代码的过程，「工欲善其事，必先利其器」，选用一个适合自己的IDE / Editor是很重要的一件事。下面将罗列出目前能使用的IDE / Editor：

1. [PyCharm](https://www.jetbrains.com/pycharm/)
2. Jupyter Notebook
3. Jupyter Lab
4. [DataSpell](https://www.jetbrains.com/dataspell/)
5. Spyder
6. VS Code

当然远不止上面这些，像Pydev、Sublime Text、Vim、GNU/Emacs、Atom、IDLE、Thonny等等都可以用来写Python。

不过我更推荐使用PyCharm、DataSpell和Jupyter系列的，PyCharm和DataSpell的功能非常强大，而Jupyter系列一方面是基于Web页面设计的，另一方面则是可以做到分块分阶段输出结果，还可以局部运行代码，也值得一试。
