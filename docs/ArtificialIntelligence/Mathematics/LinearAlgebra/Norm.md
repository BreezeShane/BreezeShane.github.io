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

::: details 向量范数诱导的矩阵范数

考虑从向量空间$V = \mathbb{K}^m$映射到$W = \mathbb{K}^n$的所有线性映射的构成的空间：$\mathcal{L}_{m, n}(\mathbb{K})$。设$V$和$W$中分别装备了两个向量范数$\| \cdot \|_V$和$\| \cdot \|_W$，则可以定义$\mathcal{L}_{m, n}(\mathbb{K})$上的算子范数$\| \cdot \|_\mathcal{L}$：

$$
\forall A\in {\mathcal  {L}}_{{m,n}}({\mathbb  {K}})\|A\|_{{\mathcal  {L}}}=\max\{\|A(x)\|_{W}\;;\;\;x\in V,\;\;\|x\|_{V}\leqslant 1\}
$$

而给定了基底后，每个从$V$映射到$W$的线性映射都可以用一个$m\times n$的矩阵来表示，所以同样地可以定义$\mathcal{M}_{m, n}(\mathbb{K})$上的非负映射$\| \cdot \|_\mathcal{M}$：

$$
{\displaystyle \forall A\in {\mathcal {M}}_{m,n}(\mathbb {K} )\|A\|_{\mathcal {M}}=\max\{\|Ax\|_{W}\;;\;\;x\in V,\;\;\|x\|_{V}\leqslant 1\}}
$$

可以验证，$\| \cdot \|_\mathcal{M}$满足矩阵范数的定义，因此是一个矩阵范数。这个矩阵范数被称为是由向量空间范数诱导的矩阵范数，可以看作是算子范数在由有限维向量空间之间线性映射组成的空间上的特例。如果$m = n$，所对应的矩阵空间就是$n$阶方块矩阵空间$\mathcal{M}_{n}(\mathbb{K})$。这时可以验证，诱导范数$\| \cdot \|_\mathcal{M}$满足一致性条件。

:::

::: details p-范数诱导的矩阵范数

当$V$和$W$中装备的向量范数都是$p$-范数的时候，诱导的矩阵范数也称为矩阵的诱导$p$-范数。具体来说就是：

$$
{\displaystyle \left\|A\right\|_{p}=\max \limits _{x\neq 0}{\frac {\left\|Ax\right\|_{p}}{\left\|x\right\|_{p}}}=\max \limits _{x\neq 0}{\frac {\left(\sum _{i=1}^{m}|\sum _{j=1}^{n}a_{ij}x_{j}|^{p}\right)^{1/p}}{\left(\sum _{j=1}^{n}|x_{j}|^{p}\right)^{1/p}}}}
$$

在$p=1$和$p\rightarrow\infty$的情况下，其范数可以以下方式计算：

$$
\begin{aligned}
&\left\|A\right\|_{1}=\max \limits _{1\leq j\leq n}\sum _{i=1}^{m}|a_{ij}| \\

&\left\|A\right\|_{\infty }=\max \limits _{1\leq i\leq m}\sum _{j=1}^{n}|a_{ij}|
\end{aligned}
$$
这些与矩阵的Schatten p-范数不同，也可以用$\left\|A\right\|_{p}$来表示。

当$p = 2$（欧几里德范数）时，诱导的矩阵范数就是谱范数。矩阵A的谱范数是A最大的奇异值或半正定矩阵A*A的最大特征值的平方根：

$$
\left \| A \right \| _2=\sqrt{\lambda_{\text{max}}(A^* A)} \qquad\text{其中A*代表A的共轭转置。}
$$

任何诱导的矩阵范数都满足此不等式

$$
\left \| A \right \| \ge \rho(A) \quad\text{其中$\rho(A)$是$A$的谱半径。}
$$

事实上，可以证明$\rho(A)$是A的所有诱导范数的下界。

此外，我们有

$$
\lim _{{r\rightarrow \infty }}\|A^{r}\|^{{1/r}}=\rho (A)
$$

:::

::: details 矩阵元范数

这些向量范数将矩阵视为$m\times n$向量，并使用类似的向量范数。

举例说明，使用向量的p-范数，我们得到：

$$
\Vert A\Vert _{p}={\Big (}\sum _{i=1}^{m}\sum _{j=1}^{n}|a_{ij}|^{p}{\Big )}^{1/p}
$$

<Badge text="注" type="error" />：不要把矩阵元p-范数与诱导p-范数混淆。

:::

::: details Frobenuis范数

对$p = 2$，这称为弗罗贝尼乌斯范数（Frobenius norm）或希尔伯特-施密特范数（Hilbert–Schmidt norm），不过后面这个术语通常只用于希尔伯特空间。这个范数可用不同的方式定义：

$$
\|A\|_F=\sqrt{\sum_{i=1}^m\sum_{j=1}^n |a_{ij}|^2}=\sqrt{\operatorname{trace}(A^{{}^*} A)}=\sqrt{\sum_{i=1}^{\min\{m,\,n\}} \sigma_{i}^2}
$$

这里$A^*$表示A的共轭转置，$σ_i$是A的奇异值，并使用了迹函数。弗罗贝尼乌斯范数与$K_n$上欧几里得范数非常类似，来自所有矩阵的空间上一个内积。

弗罗贝尼乌斯范数是服从乘法的且在数值线性代数中非常有用。这个范数通常比诱导范数容易计算。

:::

::: details 极大值范数

极大值范数是$p\rightarrow\infty$的元素范数，

$$
\|A\|_{{max}}=\max\{|a_{{ij}}|\}
$$

<Badge text="注意" type="error"/>：这个范数不服从次可乘性（Sub-Multiplicative Property）。

:::

::: details Schatten范数

Schatten范数出现于当p-范数应用于一个矩阵的奇异值向量时。如果奇异值记做$σ_i$，则Schatten p-范数定义为

$$
\|A\|_{p}={\Big(}\sum _{i=1}^{\min\{m,\,n\}}\sigma_{i}^{p}{\Big )}^{1/p}\ 
$$

这个范数与诱导、元素p-范数使用了同样的记号，但它们是不同的。

所有Schatten范数服从乘法。它们也都是酉不变的，这就是说对所有矩阵$A$与所有酉矩阵$U$和$V$,都有$||A|| = ||UAV||$。

最常见的情形是$p = 1, 2, \infty$。$p = 2$得出弗罗贝尼乌斯范数，前面已经介绍过了。$p \rightarrow \infty$得出谱范数，这是由向量2-范数诱导的矩阵范数（见下）。最后，p = 1得出迹范数(核范数)，定义为

$$
\|A\|_{{{\text{tr}}}}=\operatorname {trace}({\sqrt  {A^{*}A}})=\sum _{{i=1}}^{{\min\{m,\,n\}}}\sigma _{{i}}
$$

<Badge text="知识补充" type="tip" />：

在线性代数中，酉矩阵（又译作幺正矩阵，英语：Unitary Matrix）是一个$n×n$复数方块矩阵$U$，其满足以下性质：
$$
{\displaystyle U^{*}U=UU^{*}=I_{n}}
$$
其中$U^*$是$U$的共轭转置，$I_n$是$n×n$的单位矩阵。

换句话说，酉矩阵的逆矩阵，就是其共轭转置：

$$
U^{-1}=U^{*}
$$
酉矩阵是实数上的正交矩阵，在复数的推广。

:::

::: tip

Frobenuis范数是机器学习领域中常用的矩阵范数。

:::


