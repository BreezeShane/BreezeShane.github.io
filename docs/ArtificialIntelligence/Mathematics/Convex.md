---
title: 凸优化学习
date: 2022-03-12 15:19:59
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - AritficialIntelligence
 - Mathematics
 - Convex
tags: 
 - AritficialIntelligence
 - Mathematics
 - Convex
---

::: details 参考

 - **Main** [凸函数 - 文再文讲义](https://bicmr.pku.edu.cn/~wenzw/optbook/lect/03_functions_newhyx.pdf)
 - [为什么矩阵内积的定义包含一个迹运算？](https://www.zhihu.com/question/274052744)
 - [矩阵的 Frobenius 范数与 trace （迹）的关系及其求偏导法则](https://blog.csdn.net/frx_bwcx/article/details/108194176?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-3-108194176.pc_agg_new_rank&utm_term=%E7%9F%A9%E9%98%B5%E5%86%85%E7%A7%AF%E4%B8%8E%E8%BF%B9%E7%9A%84%E5%85%B3%E7%B3%BB&spm=1000.2123.3001.4430)
 - [线性代数笔记 Frobenius 范数和矩阵的迹之间的关系](https://blog.csdn.net/qq_40206371/article/details/121123061?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-121123061.pc_agg_new_rank&utm_term=%E7%9F%A9%E9%98%B5%E5%86%85%E7%A7%AF%E4%B8%8E%E8%BF%B9%E7%9A%84%E5%85%B3%E7%B3%BB&spm=1000.2123.3001.4430)
 - [利用分塊矩陣證明 det(AB)=(det A)(det B)](https://ccjou.wordpress.com/2009/05/08/%E5%88%A9%E7%94%A8%E5%88%86%E5%A1%8A%E7%9F%A9%E9%99%A3%E8%AD%89%E6%98%8E-detabdet-adet-b/)

:::

## 基础知识

### 梯度(Gradient)

::: info 定义

给定函数$f : \mathbb{R}^n \to \mathbb{R}$,且$f$在点$x$的一个邻域内有意义,若存在向量$g \in \mathbb{R}^n$满足:

$$
\lim_{p\to 0}\frac{f(x+p) - f(x) - g^\top p}{||p||} = 0,
$$

其中$||\cdot||$是任意的向量范数,就称$f$在点$x$处可微(或Fréchet可微).此时$g$称为$f$在点$x$处的梯度,记作$\nabla f(x)$.如果对区域$D$上的每一个点$x$都有$\nabla f(x)$存在,则称$f$在$D$上可微.

:::

若$f$在点$x$处的梯度存在,在定义式中令$p=\epsilon e_i$,$e_i$是第$i$个分量为1的单位向量,可知$\nabla f(x)$的第$i$个分量为$\frac{\partial f(x)}{\partial x_i}$.因此,

$$
\nabla f(x) = \Big[ \frac{\partial f(x)}{\partial x_1}, \frac{\partial f(x)}{\partial x_2}, \cdots, \frac{\partial f(x)}{\partial x_n} \Big]^\top
$$

### 海瑟矩阵(Hessian Matrix)

::: info 定义

如果函数$f(x):\mathbb{R}^n \to \mathbb{R}$在点$x$处的二阶偏导数$\frac{\partial^2f(x)}{\partial x_i \partial x_j} \; i, j = 1, 2, \cdots , n$都存在,则

$$
\nabla^2f(x) = 
\begin{bmatrix}
\frac{\partial^2f(x)}{\partial x_1^2} & \frac{\partial^2f(x)}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2f(x)}{\partial x_1 \partial x_n} \\

\frac{\partial^2f(x)}{\partial x_2 \partial x_1} & \frac{\partial^2f(x)}{\partial x_2^2} & \cdots & \frac{\partial^2f(x)}{\partial x_2 \partial x_n} \\

\vdots & \vdots & \ddots & \vdots \\

\frac{\partial^2f(x)}{\partial x_n \partial x_1} & \frac{\partial^2f(x)}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2f(x)}{\partial x_n^2}
\end{bmatrix}
$$

称为$f$在点$x$处的海瑟矩阵.

:::

当$\nabla^2f(x)$在区域$D$上的每个点$x$处都存在时,称$f$在$D$上二阶可微.若$\nabla^2f(x)$在$D$上还连续,则称$f$在$D$上二阶连续可微,可以证明此时海瑟矩阵是一个对称矩阵.

### 矩阵变量函数的导数

多元函数梯度的定义可以推广到变量是矩阵的情形.对于以$m\times n$矩阵$X$为自变量的函数$f(X)$,若存在矩阵$G \in \mathbb{R}^{m\times n}$满足

$$
\lim_{V\to 0}\frac{f(X+V)-f(X)-\langle G, V\rangle}{||V||} = 0,
$$

其中$||\cdot||$是任意矩阵范数,就称矩阵变量函数$f$在$X$处Fréchet可微,
称$G$为$f$在Fréchet可微意义下的梯度.类似于向量情形,矩阵变量函数$f(X)$的梯度可以用其偏导数表示为

$$
\nabla f(x) = 
\begin{bmatrix}
\frac{\partial f(x)}{\partial x_{11}} & \frac{\partial f(x)}{\partial x_{12}} & \cdots & \frac{\partial f(x)}{\partial x_{1n}} \\

\frac{\partial f(x)}{\partial x_{21}} & \frac{\partial f(x)}{\partial x_{22} } & \cdots & \frac{\partial f(x)}{\partial x_{2n}} \\

\vdots & \vdots & \ddots & \vdots \\

\frac{\partial^2f(x)}{\partial x_{m1}} & \frac{\partial f(x)}{\partial x_{m2}} & \cdots & \frac{\partial f(x)}{\partial x_{mn}}
\end{bmatrix}
$$

其中$\frac{\partial f(x)}{\partial x_{ij}}$表示$f$关于$x_{ij}$的偏导数.

在实际应用中,矩阵Fréchet可微的定义和使用往往比较繁琐,为此我们需要介绍另一种定义——Gâteaux可微.

::: info Gâteaux可微定义

设$f (X)$为矩阵变量函数,如果对任意方向$V \in \mathbb{R}^{m\times n}$,存在矩阵$G \in \mathbb{R}^{m\times n}$满足

$$
\lim_{t \to 0} \frac {f(X+tV) - f(X) - t \langle G, V \rangle}{t} = 0,
$$

则称$f$关于$X$是Gâteaux可微的.满足上式的$G$称为$f$在$X$处在Gâteaux
可微意义下的梯度.

:::

可以证明,当$f$是Fréchet可微函数时,$f$也是Gâteaux可微的,且这两种意义下的梯度相等.

下面是三种经典的例子

::: details 线性函数

$f(X) = tr(AX^\top B)$,其中$A \in \mathbb{R}^{p\times n}, B \in \mathbb{R}^{m\times p},X \in \mathbb{R}^{m\times n}$对任意方向$V \in \mathbb{R}^{m\times n}$以及$t\in \mathbb{R}$,有

$$
\lim_{t\to 0}\frac{f(X+tV)-f(X)}{t} = \lim_{t\to 0} \frac{tr(A(X+tV)^\top B) - tr(AX^\top B)}{t} = tr(AV^\top B) = tr(V^\top BA) = \langle BA, V\rangle.
$$

因此,$\nabla f(x) = BA$.

:::

::: details 二次函数

$f(X,Y) = \frac{1}{2} || XY - A ||_F^2$,其中$(X,Y)\in \mathbb{R}^{m\times p}\times \mathbb{R}^{p\times n}$对变量$Y$,取任意方向$V$以及充分小的$t\in \mathbb{R}$,有

$$
\begin{aligned}
f(X,Y+tV) - f(X,Y) 
&= \frac{1}{2}||X(Y+tV)-A||_F^2-\frac{1}{2}||XY-A||_F^2 \\
&= \frac{1}{2}tr\Big\{ [X(Y+tV)-A]^\top [X(Y+tV)-A] \Big\} - \frac{1}{2}tr\Big[ (XY-A)^\top(XY-A) \Big] \\
&= \frac{1}{2}tr\Big[(XY+tXV-A)^\top (XY+tXV-A) \Big] - \frac{1}{2}tr\Big[ (XY-A)^\top(XY-A) \Big] \\
&= \frac{1}{2}tr\Big[(XY+tXV-A)^\top (XY-A) \Big] + \frac{1}{2}tr\Big[(XY+tXV-A)^\top (tXV) \Big] - \frac{1}{2}tr\Big[ (XY-A)^\top(XY-A) \Big] \\
&= \frac{1}{2}tr\Big[(XY-A)^\top(XY+tXV-A) \Big] + \frac{1}{2}tr\Big[(tXV)^\top (XY+tXV-A) \Big] - \frac{1}{2}tr\Big[ (XY-A)^\top(XY-A) \Big] \\
&= \frac{1}{2}tr\Big[(XY-A)^\top(XY-A) \Big] + \frac{1}{2}tr\Big[(XY-A)^\top(tXV) \Big] + \frac{1}{2}tr\Big[(tXV)^\top (XY+tXV-A) \Big] - \frac{1}{2}tr\Big[ (XY-A)^\top(XY-A) \Big] \\
&= \frac{1}{2}tr\Big[(XY-A)^\top(tXV) \Big] + \frac{1}{2}tr\Big[(tXV)^\top (XY-A) \Big] + \frac{1}{2}tr\Big[(tXV)^\top (tXV) \Big]  \\
&= t\cdot tr\Big[(XV)^\top(XY-A) \Big] + \frac{t^2}{2}tr\Big[(XV)^\top (XV) \Big]  \\
&= t\cdot tr\Big[V^\top \cdot X^\top(XY-A) \Big] + \frac{t^2}{2}||XV||_F^2  \\
&=t\langle V,X^\top(XY-A) \rangle + \mathcal{O}(t^2)
\end{aligned}
$$

由定义知$\frac{\partial f}{\partial Y} = X^\top(XY-A)$.

对变量$X$,同理可得$\frac{\partial f}{\partial X} = (XY-A)Y^\top$.

:::

::: details ln-det函数

$f(X) = \ln(\det(X)), \; X\in \mathcal{S}_{++}^n$,给定义$X \succ 0$,对任意方向$V \in \mathcal{S}^n$以及$t\in \mathbb{R}$,我们有

$$
\begin{aligned}
f(X+tV) - f(X)
&= \ln(\det(X+tV)) - \ln(\det(X)) \\
&= \ln(\det(X^{\frac{1}{2}}(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}}) X^{\frac{1}{2}} )) - \ln(\det(X)) \\
&= \ln\Big( \frac{\det[ X^{\frac{1}{2}}(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}}) X^{\frac{1}{2}} ]}{\det(X)} \Big) \\
&= \ln\Big( \frac{\det (X^{\frac{1}{2}})\det(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}}) \det(X^{\frac{1}{2}}) }{\det(X)} \Big) \\
&= \ln\Big( \frac{\det (X)\det(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}}) }{\det(X)} \Big) \\
&= \ln(\det(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}})) \\
\end{aligned}
$$

由于$X^{-\frac{1}{2}}VX^{-\frac{1}{2}}$是对称矩阵,所以他可以正交对角化,不妨设其特征值为$\lambda_1,\lambda_2,\dots,\lambda_n$,则

$$
\begin{aligned}
\ln(\det(I + tX^{-\frac{1}{2}}VX^{-\frac{1}{2}})) 
&= \ln\prod_{i=1}^{n}(1+t\lambda_i) \\
&= \sum_{i=1}^{n}\ln(1+t\lambda_i) \\
&= \sum_{i=1}^{n}t\lambda_i + \mathcal{O}(t^2) \\
&= t \Big\langle (X^{-1})^\top, V \Big\rangle + \mathcal{O}
\end{aligned}
$$

因此,我们可以根据Gâteaux可微定义得到结论$\nabla f(X)=(X^{-1})^\top$.

注意,$\sum_{i=1}^{n}\ln(1+t\lambda_i) = \sum_{i=1}^{n}t\lambda_i + \mathcal{O}(t^2)$这里其实是应用了级数来计算的.

$$
\because \ln z = \sum_{i=1}^{n}(-1)^{i+1}\cdot\frac{1}{i}(z-1)^i + \mathcal{O}((z-1)^2) \\
\therefore \ln(1+x)=\sum_{i=1}^{n}\frac{(-1)^{i+1}}{i}x^i + \mathcal{O}(x^2)
$$

而上面那一步是用$\ln (1+x) = x + \mathcal{O}(x^2)$来作和直接代换的.

:::

::: tip 计算中用到的定理及结论

$$
tr(A^\top B) = \langle A,B \rangle = \sum_{i=1}^{n}\sum_{j=1}^{n}a_{ij}b_{ij}
$$

易知

$$
tr(A^\top A) = \langle A,A \rangle = \sum_{i=1}^{n}\sum_{j=1}^{n}a_{ij}^2 = ||A||_F^2
$$

$\ln(1+x)$的泰勒展开式:

$$
\ln(1+x)=\sum_{i=1}^{n}\frac{(-1)^{i+1}}{i}x^i + \mathcal{O}(x^2)
$$

:::

### 广义实值函数

::: info 定义

令$\overline{\mathbb{R}} := \mathbb{R} \cup \{\pm\infty\}$为广义实数空间,则映射$f:\mathbb{R}^n\to \overline{\mathbb{R}}$称为广义实值函数.

和数学分析一样,我们规定
$$
-\infty < a < +\infty, \; \forall a \in \mathbb{R}, \\
(+\infty) + (+\infty) = +\infty, \\
(+\infty) + a = +\infty, \; \forall a \in \mathbb{R}
$$

:::

### 适当函数

::: info 定义

给定广义实值函数$f$和非空集合$\mathcal{X}$.如果存在$x \in \mathcal{X}$使得$f(x) < +\infty$,并且对任意的$x \in \mathcal{X}$,都有$f(x)>−\infty$,那么称函数$f$关于集合$\mathcal{X}$ 是适当的.

:::

概括来说,适当函数$f$的特点是“至少有一处取值不为正无穷”,以及“处
处取值不为负无穷”.

*(未完待续......)*