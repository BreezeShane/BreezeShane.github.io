---
title: Enlighten GAN
date: 2021-09-17 14:32:24
toc: true
author: Breeze Shane
excerpt: 本文介绍了EnlightenGAN的原理和具体实现。
article: false
tags:
 - Unsupervised Learning
 - Generative Adversarial Networks
categories:
 - UnsupervisedLearning
 - GenerativeAdversarialNetworks
---

## 应用领域及背景

该项目是应用在图像修复领域的低照度增强方向，是致力于将日常生活中常见的各种难以用肉眼感知特征的低照度场景增强到能够方便、舒适地观察内容的场景。

<center>该项目迄今为止仍是无监督学习方法低照度增强的SOTA。</center>

## 网络结构的设计

![](/images/2021-09-17_14-55.png)

本项目依旧是由生成器和鉴别器组成。

**生成器**：

本网络结构是使用Encoder-Decoder的联合结构的残差网络，用以学习低照度到正常图像的深度特征差异。

首先由输入的图片经过灰度变换得到灰度图后归一并取反，由此来获得图像中每一处的增强比率，再将这个增强图层和输入的图片组合成四通道复合图片输入到该残差网络中，在下采样过程中每一层又经过最大池化做特征保留处理，并在每一步上采样中与各层的池化层相乘，用以恢复细节特征，最后得到一个对应的与输入图像对应的增强填补块，最后将其与整个输入的图像相加，至此就完成了增强的整个过程。

**鉴别器**：

该网络结构使用了全局与局部联合而成的组合鉴别器。全局鉴别器和局部鉴别器都是使用相同的结构，即深度为4层的卷积网络。两者的区别就是——全局鉴别器用于评估整张图片的真实程度，而对于局部鉴别器则是从整张图片中随机截取若干个小图片并分别评估，最后取均值来作为模型输出。

> 采用联合的思路是：在能够保证整张图片的真实程度较高的情况下，也要保证图像中的一些具体细节的真实程度较高。

## 损失函数的设计

**双输入鉴别器函数定义如下：**
$$
\begin{align*}
D_{Ra}(x_r, x_f) &= \sigma(C(x_r)-\mathbb{E}_{x_f\sim \mathbb{P}_{fake}}[C(x_f)]) \\
D_{Ra}(x_f, x_r) &= \sigma(C(x_f)-\mathbb{E}_{x_r\sim \mathbb{P}_{real}}[C(x_r)])
\end{align*}
$$
>  注：这里的$\sigma$作者已经交代了，他没有使用sigmoid函数，而是使用MSE来评估两者的差异程度。
>
> 函数设计灵感是来自[RaGAN](https://arxiv.org/abs/1807.00734)

$D_{Ra}(A,B)$函数运算的本质是计算A比B更真实的概率，并且应该认识到，该函数得到的结果应该是一个概率向量。

**损失函数定义分别如下**
$$
\begin{align*}
\mathcal{L}_D^{Global} &= \mathbb{E}_{x_r\sim\mathbb{P}_{real}} [(D_{Ra}(x_r, x_f) - 1)^2] + \mathbb{E}_{x_f\sim\mathbb{P}_{fake}} [D_{Ra}(x_f,x_r)^2] \\
\mathcal{L}_G^{Global} &= \mathbb{E}_{x_f\sim\mathbb{P}_{fake}} [(D_{Ra}(x_f, x_r) - 1)^2] + \mathbb{E}_{x_r\sim\mathbb{P}_{real}} [D_{Ra}(x_r,x_f)^2] \\
\mathcal{L}_D^{Local} &= \mathbb{E}_{x_r\sim\mathbb{P}_{real-patches}}[(D(x_r) - 1)^2] + \mathbb{E}_{x_f\sim\mathbb{P}_{fake-patches}}[(D(x_f) - 0)^2]\\
\mathcal{L}_G^{Local} &= \mathbb{E}_{x_f\sim\mathbb{P}_{fake-patches}}[(D(x_f) - 1)^2]
\end{align*}
$$
这里则是设计了生成器和鉴别器的对抗关系，通过梯度下降法来优化各项，将各组数据的评估拉向不同方向来达成对抗训练的效果。

**自保留特征损失定义如下**：
$$
\mathcal{L}_{SFP}(I^L) = {1\over{W_{i,j}H_{i,j}}}\sum_{x=1}^{W_{i,j}}\sum_{y=1}^{H_{i,j}}( \phi_{i,j}(I^L) - \phi_{i,j}(G(I^L)) )^2
$$
这里的$\phi$表示VGG网络，用于提取图像的深度特征。$\phi_{i,j}(I^L) - \phi_{i,j}(G(I^L))$表示VGG将分别从真实图片和增强生成的图片中提取深度特征后再计算差异，因此上式表示深度特征差异的均值。

**生成器总损失定义如下**：
$$
Loss = \mathcal{L}_{SFP}^{Global} + \mathcal{L}_{SFP}^{Local} + \mathcal{L}_{G}^{Global} + \mathcal{L}_{G}^{Local}
$$
对于生成器的损失则是以全局和局部联合作为整体来计算损失。

## 问题与缺陷

1. 经过训练后生成的图片存在严重的色彩损失。
2. 对于细节特征丢失较严重「尤指毛发等」。
3. 训练不稳定，经过实验，在Epoch 200左右出现梯度突变的情况。
4. 较难找到较优的纳什均衡点。

---

## 睿智作者的话（不必在意）

鸽了几个月了，因为这段时间一直都在做社团内的暑期考核，一直在忙碌于实验中，没挤时间更新博客，还望谅解。

虽然我成功通过暑期考核了，但毕竟还在上学阶段，软件工程本科生还是要好好做份内的事，因此关于机器学习的理论可能也没那么多时间去研究了。

我当然很想研究，但奈何知识太过匮乏，如今还落入了瓶颈期，不知该怎么办了。