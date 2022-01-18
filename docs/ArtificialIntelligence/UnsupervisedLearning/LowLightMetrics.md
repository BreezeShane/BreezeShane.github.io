---
title: Low Light Metrics
toc: true
date: 2021-08-06 01:10:00
author: Breeze Shane
article: false
tags:
 - Unsupervised Learning
 - Generative Adversarial Networks
categories:
 - UnsupervisedLearning
 - GenerativeAdversarialNetworks
keywords: Original Generative Adversarial Networks
mathjax: true
---

# Low Light Metrics

## Content

本文记录了LPIPS、SSIM、MAE、MSE、PSNR、NIQE和NIMA共计七个低照度指标，除了介绍相关背景、意义，也会提及算法实现的大致过程。

## LPIPS

全称：Learned Perceptual Image Patch Similarity，中文：学习感知图像块相似度，又称感知损失

是用于度量两张图像差别的一种指标，最开始由论文《The Unreasonable Effectiveness of Deep Features as a Perceptual Metric》提出。

<center><font color="red">LPIPS值越低，表示两张图像越相似，反之则差异越大。</font></center>

给定Ground Truth图像参照块$x$和含噪声图像失真块$x_0$，由论文可知这两个块都是图像输入到AlexNet得到的。

感知相似度度量公式如下：
$$
d(x,x_0)=\sum_l\frac{1}{H_lW_l}\sum_{h,w}||w_l\odot(\hat{y}_{hw}^l-\hat{y}_{0hw}^l)||_2^2
$$
其中，$d$为$x_0$与$x$之间的距离。从$L$层提取特征堆(feature stack)并在通道维度中进行单位规格化(unit-normalize)。利用向量$w_l$来放缩激活通道数并计算$L_2$距离。最后在空间上平均，在通道上求和。

网络结构如下：

![](/images/2021-08-06_00-59.png)

基于学习的相似度得分损失函数公式如下：
$$
\mathcal{L}(x,x_0,x_1,h)=-h\log\mathcal{G}[d(x,x_0),d(x,x_1)]-(1-h)\log\{1-\mathcal{G}[d(x,x_0),d(x,x_1)]\}
$$
给定Ground Truth图像参照块$x$和含噪声图像失真块$x_0$的距离$d_0$、Ground Truth图像参照块$x$和含噪声图像失真块$x_1$的距离$d_1$，这两个距离均由AlexNet计算得出，在顶部训练一个网络$\mathcal G$（包含2个32通道FC-ReLU层、1通道FC层和sigmoid层）映射到得分$h$。这个得分也就是我们所求。

> 依照个人理解这里的$h$其实就是$\mathcal{G}[d(x,x_0),d(x,x_1)]$，而$\mathcal{L}$则代表信息熵「信息熵其实从某种意义上反映了**信息量存储下来需要多少存储空间**」，由于事件空间只有两种状态，对应的概率为$\{p,1-p\}$。当该信息熵缩小时，不确定性也在逐渐减小，这意味着这两个概率的结果趋于一致，信息量存储所要的空间也趋向于最小「这也是我们所求的最优策略」。再看$p(x)$和$p^\prime(x)$分别表示$\mathcal{G}[d(x,x_0),d(x,x_1)]$和$1-\mathcal{G}[d(x,x_0),d(x,x_1)]$，推敲一下不难发现他们代表的意义是$x_0,x_1$的特征差距大小所映射的概率。

## SSIM

全称：Structural Similarity Index，中文：结构相似性指数

**是一种用于量化两幅图像间的结构相似性的指标。**它仿照了人类视觉系统实现了结构相似性的有关理论，对局部结构变化的感知敏感。SSIM分别用均值来估计亮度，用方差来估计对比度，用协方差来估计结构相似程度。它的值域是[0,1]，而且当SSIM=1时，两张图片完全一致。

<center><font color="red">SSIM越大，说明两张图片越相似。</font></center>

给定两张图片A和B，两者之间的照明度(luminance)、对比度 (contrast) 和结构 (structure)分别如下公式所示：
$$
\begin{align}
l(x,y)&=\frac{2\mu_x\mu_y+c_1}{\mu_x^2+\mu_y^2+c_1}\\
c(x,y)&=\frac{2\sigma_x\sigma_y+c_2}{\sigma_x^2+\sigma_y^2+c_2}\\
s(x,y)&=\frac{\sigma_{xy}+c_3}{\sigma_x\sigma_y+c_3}
\end{align}
$$
一般地，有：

- $c_3= {c_2\over2}$
- $\mu_x$为$x$的均值
- $\mu_y$为$y$的均值
- $\sigma_x^2$为$x$的方差
- $\sigma_y^2$为$y$的方差
- $\sigma_{xy}$为$x$与$y$的协方差
- $c_1=(k_1L)^2$，$c_2=(k_2L)^2$为两个常数，是为了避免0作为除数的情况
- $L$为像素值的范围，即$2^B-1$
- $k_1=0.01$，$k_2=0.03$为默认值

而SSIM被定义为：
$$
SSIM(x,y)=[l(x,y)^\alpha \cdot c(x,y)^\beta\cdot s(x,y)^\gamma]
$$
令$\alpha=\beta=\gamma=1$，则有：
$$
SSIM(x,y)=\frac{(2\mu_x\mu_y+c_1)(2\sigma_{xy}+c_2)}{(\mu_x^2+\mu_y^2+c_1)(\sigma_x^2+\sigma_y^2+c_2)}
$$

## MAE

用于计算平均绝对误差，用来衡量两图片之间的差距，但由于绝对值符号的存在，求得的导数并不平滑，有些点导数不存在，因此不适合作为Loss，但它能很好地衡量差距。

<center><font color="red">MAE越小，说明两张图片差距越小。</font></center>

对于给定的两个图片$x$和$y$，其计算公式如下：
$$
MAE(x,y)={1\over W\times H}\sum_{i=0}^{W-1}\sum_{j=0}^{H-1}|x(i,j)-y(i,j)|
$$

## MSE

用于计算平均平方误差，用来衡量两图片之间的差距，平方的特性能很好地解决MAE导数不平滑问题，因此它既可以用作Loss的指导参考，又可以衡量差距。

<center><font color="red">MSE越小，说明两张图片差距越小。</font></center>

对于给定的两个图片$x$和$y$，其计算公式如下：
$$
MSE(x,y)={1\over W\times H}\sum_{i=0}^{W-1}\sum_{j=0}^{H-1}[x(i,j)-y(i,j)]^2
$$

## PSNR

全称：Peak Signal to Noise Ratio，中文：峰值信噪比

是一种评价图像质量的度量标准，但只是衡量最大值信号和背景噪音之间的图像质量参考值，具有局限性。PSNR的单位为dB，值越大对应图像的失真越少。

<center><font color="red">一般来说，PSNR高于40dB说明图像质量几乎与原图一样好；在30-40dB之间通常表示图像质量的失真损失在可接受范围内；在20-30dB之间说明图像质量比较差；PSNR低于20dB说明图像失真严重。</font></center>

给定一个大小为W×H的灰度图$I$和噪声图$K$来说，PSNR的定义为：
$$
PSNR = 10\log_{10}(\frac{MAX_I^2}{MSE})
$$
其中$MAX_I$为图像中最大像素值，即B-bit的图像的$MAX_I^2$值为$2^B-1$。一般地，针对 uint8 数据，最大像素值为255,；针对浮点型数据，最大像素值为1。

有三种方法来计算彩色RGB图像的PSNR：

1. 分别计算 RGB 三个通道的 PSNR，然后取平均值；
2. 计算RGB各个通道的均方差的均值，然后统一求PSNR；
3. 把RGB转化为 YCbCr，然后只计算 Y(亮度)分量的PSNR。

## NIQE

全称：Naturalness Image Quality Evaluator，中文：自然图像质量评估

NIQE是ECCV 2018年PIRM比赛时的评价指标，是一种新的**无参考**图像质量指标。其原理与BRUSQUE一致，因为两者皆出自同一人之手。

<center><font color="red">NIQE值越小越好。</font></center>

前面36个特征提取方法几乎一模一样，但NIQE在提取图像统计特征时先对图像提取了感兴趣区域，这一点源自于人眼更倾向于以图像中更清晰的部分来判断图像质量。所以作者通过计算图像中不同patch的方差场来判别清晰度，选择大于一定阈值的清晰度为自然图像的patch，而失真图像采用全局计算NSS。

NIQE的建模过程比较复杂，分五大部分：

一、**Spatial Domain NSS 提取图像空间域特征**

首先将图片进行归一化处理，得到MSCN系数：
$$
\hat{I}(i,j)=\frac{I(i,j)-\mu(i.j)}{\sigma(i,j)+1}
$$
该式表示高斯滤波后求局部均值和局部标准差，其中，

局部均值是对原始图像做高斯模糊处理，具体公式为：
$$
\mu(i.j)=\sum_{k=-K}^K\sum_{l=-L}^L{w_{k,l}I(i+k,j+l)}
$$
局部标准差是对原始图像和局部均值的差的平方做高斯模糊处理，具体公式为：
$$
\sigma(i,j)=\sqrt{\sum_{k=-K}^K\sum_{l=-L}^L{w_{k,l}[I(i+k,j+l)}-\mu(i,j)]^2 }
$$
二、**Patch Selection 筛选图像块**

由于人类似乎更重视他们对清晰图像区域的图像质量判断。我们使用一个简单的设备从一组自然补丁中优先选择那些信息最丰富且不太可能受到限制失真的补丁。因此我们的筛选标准是:边缘更锐利的,包含信息内容更丰富的。

在归一化后,筛选前,作者将图像分成大小为PxP的若干个图像块(P=96),索引为b = 1,2,3,...,B，再对每个图像块求平均方差：
$$
\delta(b)=\sum\sum_{(i,j)\in pathb}\sigma(i,j)
$$
这里的$\delta$代表局部图像的锐利程度。

在做筛选的时候，作者将所有的图像块的最大锐利程度的p倍设置为阈值，其中$p\in [0.6, 0.9]$，然后将大于阈值的图像块保留，小于阈值的图像全部丢弃。

三、**Characterizing Image Patches 求图像块特征**

该部分用到GGD(广义高斯分布)和AGGD(非对称广义高斯分布)求图像块特征，首先利用GGD求取图像的两个特征：
$$
\begin{align*}
f(x,\alpha,\beta)&=\frac{\alpha}{2\beta\,\Gamma({1\over\alpha})}\, exp[-(\frac{|x|}{\beta})^\alpha] \\
\Gamma(a)&=\int_0^\infty t^{a-1}e^{-t}\, dt\qquad a>0
\end{align*}
$$
并且使用了快速匹配算法得到了参数ɑ和β。

四、**Multivariate Gaussian Model 多元高斯模型**

已知有拟合高斯模型（MVG）：
$$
f_X(x_1,\,\dots\,,x_k)=\frac{1}{(2\pi)^{k\over2}|\sum|^{1\over2}}\times exp\big[ -{1\over2}(x-\nu)^T\Sigma^{-1}(x-\nu) \big]
$$
输入每张清晰图像的特征参数后得到上式，对其做最大似然估计后将得到该模型的均值向量$\nu$和协方差矩阵$\Sigma$。

五、**NIQE Index 最终得分**
$$
D(\nu_1,\nu_2,\Sigma_1,\Sigma_2)=\sqrt{
(\nu_1-\nu_2)^T\,\big(\frac{\Sigma_1+\Sigma_2}{2}\big)^{-1}(\nu_1-\nu_2)
}
$$
由上式即可得出最终得分，$\nu_1$、$\Sigma_1$是一组清晰图像得到的均值向量和协方差矩阵，而$\nu_2$、$\Sigma_2$是输入的低质量图像得到的均值向量和协方差矩阵。

## NIMA

全称：Neural Image Assessment，中文：图像质量评估

NIMA算法是对任意图像都生成评分直方图，即对图像进行1～10分的打分，并直接比较同一主题的图像, 这种设计跟人的评分系统产生的直方图在形式上吻合，且评估效果更接近人类评估的结果。而且这篇论文侧重的是从美学角度进行评分。作者是基于CNN进行训练的，就是将CNN的最后一层替换为具有10个神经元的全连接层，然后进行softmax激活。

<center><font color="red">NIMA分值越高，代表图像质量越好</font></center>

该指标算法流程如下：在模型训练的时候，将输入图像缩放为256×256，然后随机提取大小为224×224的裁剪块。训练的目标是预测给定图像的评级分布。这就是预测结果的直方图和真实直方图的比较。
