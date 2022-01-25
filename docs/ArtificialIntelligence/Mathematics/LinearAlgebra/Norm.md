---
title: 向量范数与矩阵范数
date: 2022-01-18 22:04:04
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - AritficialIntelligence
 - Mathematics
tags: 
 - Aritficial Intelligence
 - Mathematics
---
## 向量范数

向量范数具有“长度”概念，是一个函数，其为向量空间内的所有向量赋予非零的正长度或大小。

假设V是域F上的向量空间；V的半范数是一个函数$p:V\to \mathbb {R} ;x\mapsto p(x)$，满足：

$\forall a\in F,\forall u,v\in V$

1. $p(v)\geq 0$（具有半正定性）

2. $p(av)=|a|p(v)$（具有绝对一次齐次性）

3. $p(u+v)\leq p(u)+p(v)$（满足三角不等式，或称次可加性）

范数是一个半范数加上额外性质：

4. $p(v)=0$,当且仅当$v$是零向量（正定性）

::: tip
如果拓扑向量空间的拓扑可以被范数导出，这个拓扑向量空间被称为赋范向量空间。
:::

机器学习领域中$L_p$范数非常常见，它也同样满足以上的性质，是向量空间中的一组范数。$L_{p}$范数与幂平均有一定的联系。为了对抗过拟合、提高模型的泛化能力，可以通过向目标函数当中引入参数向量的$L_{p}$范数来进行正则化。其中最常用的是引入$L_{1}$范数的$L_{1}$正则项和引入$L_{2}$范数的$L_{2}$正则项；前者有利于得到稀疏解，后者有利于得到平滑解。

它的定义如下：

$$
L_{p}({\vec {x}})=\lVert\vec{x}\rVert_{p}={\Bigl (}\sum _{i=1}^{n}|x_{i}|^{p}{\Bigr )}^{1/p},\\
\text{其中}\quad\vec {x}=\{x_{1},x_{2},\ldots ,x_{n}\},\,p\geqslant 1.
$$

## 关于p值的讨论

::: details 当$p=0$时

$$
\lVert\vec{x}\rVert_{0}=\sum^{n}_{i=1}[x_i \neq 0]
$$

<Badge text="「注意」" type="warn"/>：这里的$L_{0}$范数并非通常意义上的范数（不满足三角不等式或次可加性）。

:::

::: details 当$p=1$时

$$
\lVert\vec{x}\rVert_{1}=\sum^{n}_{i=1}|x_i|
$$

该距离又称曼哈顿距离。

:::

::: details 当$p=2$时

$$
\lVert\vec{x}\rVert_{2}=\sqrt{\sum^{n}_{i=1}|x_i|^2}
$$

该距离又以欧氏距离而知名。

:::

::: details 当$p\rightarrow\infty$时

当$p\rightarrow+\infty$时，

$$
||\vec{x}||_{p}=\lim_{p\rightarrow+\infty}(\sum^{n}_{i=1}|x_i|^p)^{1/p} =\max_{i}|x_i|
$$

当$p\rightarrow-\infty$时，

$$
||\vec{x}||_{p}=\lim_{p\rightarrow -\infty}(\sum^{n}_{i=1}|x_i|^p)^{1/p} =\min_{i}|x_i|
$$

该距离被称作无穷范数或最大范数。而且该距离也有另外一个名称：切比雪夫距离。

因为切比雪夫距离定义为：

若有两个向量或两个点p和q，其坐标分别为$p_{i}$和$q_i$，则有

$$
\begin{aligned}
D_{\rm{Chebyshev}}(p,q)&:=\max_{i}(|p_{i}-q_{i}|) \\
&= \lim_{k\to\infty}\bigg(\sum_{i=1}^{n}\left|p_{i}-q_{i}\right|^{k}\bigg)^{1/k}
\end{aligned}
$$

:::

以上的$L_p$范数系都是在衡量向量的大小，如果想衡量矩阵的大小，则需要使用矩阵范数。



