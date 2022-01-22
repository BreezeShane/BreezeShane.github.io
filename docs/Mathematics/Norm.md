---
title: 向量范数与矩阵范数
date: 2022-01-18 22:04:04
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Mathematics
tags: 
 - Mathematics
article: false
---
## 向量范数

向量范数具有“长度”概念，是一个函数，其为向量空间内的所有向量赋予非零的正长度或大小。

假设V是域F上的向量空间；V的半范数是一个函数$p:V\to \mathbb {R} ;x\mapsto p(x)$，满足：

$\forall a\in F,\forall u,v\in V,$

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
L_{p}({\vec {x}})=\lVert\vec{x}\rVert_{p}={\Bigl (}\sum _{i=1}^{n}|x_{i}|^{p}{\Bigr )}^{1/p},\newline
\text{其中}\quad\vec {x}=\{x_{1},x_{2},\ldots ,x_{n}\},\,p\geqslant 1.
$$

@slidestart moon

#### 当$p=0$时，

$$
\lVert\vec{x}\rVert_{0}=\sum^{n}_{i=1}[x_i \neq 0]
$$

> 「注意」：这里的$L_{0}$范数并非通常意义上的范数（不满足三角不等式或次可加性）。

---

#### 当$p=1$时，

$$
\lVert\vec{x}\rVert_{1}=\sum^{n}_{i=1}|x_i|
$$

该距离又称曼哈顿距离。

---

#### 当$p=2$时，

$$
\lVert\vec{x}\rVert_{2}=\sqrt{\sum^{n}_{i=1}|x_i|^2}
$$

该距离又以欧氏距离而知名。

---

#### 当$p \rightarrow +\infty$时，

$$
\lVert\vec{x}\rVert_{\infty}=\lim_{p\rightarrow+\infty}(\sum^{n}_{i=1}|x_i|^p)^{1/p} =\max_{i}|x_i|
$$

#### 当$p \rightarrow -\infty$时，

$$
\lVert\vec{x}\rVert_{\infty}=\lim_{p\rightarrow -\infty}(\sum^{n}_{i=1}|x_i|^p)^{1/p} =\min_{i}|x_i|
$$

该距离被称作无穷范数或最大范数。而且该距离也有另外一个名称：切比雪夫距离。

--

因为切比雪夫距离定义为：

若有两个向量或两个点p和q，其坐标分别为$p_{i}$和$q_i$，则有

$$
D_{\rm {Chebyshev}}(p,q):=\max _{i}(|p_{i}-q_{i}|) = \lim_{k\to\infty}\bigg(\sum _{i=1}^{n}\left|p_{i}-q_{i}\right|^{k}\bigg)^{1/k},
$$

@slideend

以上的$L_p$范数系都是在衡量向量的大小，如果想衡量矩阵的大小，则需要使用矩阵范数。


## 矩阵范数
矩阵范数，又称矩阵模，是将一定的矩阵空间建立为赋范向量空间时为矩阵装备的范数。

赋范向量空间是拓扑向量空间中的基本种类。通过赋予向量空间（线性空间）以范数，建立拓扑结构。考虑系数域$\mathbb{K}$（$\mathbb{K}$可以是实数域$\mathbb{R}$或复数域$\mathbb{C}$等）上的所有$m \times n$矩阵所构成的向量空间$\mathcal{M}_{m, n}(\mathbb{K})$。这是一个有$m n$维的$\mathbb {K}$-向量空间。可以如同对其他的有限维$\mathbb {K}$-向量空间一样，为矩阵空间$\mathcal{M}_{m, n}(\mathbb{K})$装备范数。这样的范数称为$\mathcal{M}_{m, n}(\mathbb{K})$上的一个矩阵范数。

依照范数的定义，一个从$\mathcal{M}_{m, n}(\mathbb{K})$映射到非负实数的函数$\| \cdot \|$满足以下的条件：

**严格正定性**：对任意矩阵$A \in \mathcal{M}_{m, n}(\mathbb{K})$，都有$\|A\|\ge 0$，且等号成立当且仅当$A=0$；

**线性性**：对任意系数$\alpha \in \mathbb{K}$、任意矩阵$A \in \mathcal{M}_{m, n}(\mathbb{K})$，都有$\|\alpha A\|=|\alpha|\|A\|$；

**三角不等式**：任意矩阵$A, B \in \mathcal{M}_{m, n}(\mathbb{K})$，都有$\|A+B\|\leq \|A\|+\|B\|$。

则称之为$\mathcal{M}_{m, n}(\mathbb{K})$上的一个矩阵范数。

此外，某些定义在方块矩阵组成空间$\mathcal{M}_{n}(\mathbb{K})$上的矩阵范数满足一个或多个以下与的条件：

**相容性**：$\|AB\| \le \|A\|\|B\|$；

**共轭转置相等条件**：$\|A\|=\|A^*\|$。其中$A^*$表示矩阵$A$的共轭转置（在实矩阵中就是普通转置）。

一致性特性（consistency property）也称为次可乘性（sub-multiplicative property）。某些书籍中，矩阵范数特指满足一致性条件的范数。

满足以上设定的矩阵范数可以有多种。由于它们都是定义在$\mathcal{M}_{m, n}(\mathbb{K})$这个有限维向量空间上的范数，所以实质上是等价的。常见的矩阵范数通常是在矩阵的应用中自然定义或诱导的范数。

常见的矩阵范数有

1. 向量范数诱导的矩阵范数
2. p-范数诱导的矩阵范数
3. 矩阵元范数
4. 弗罗贝尼乌斯范数
5. 极大值范数
6. Schatten范数

其中Frobenuis范数
