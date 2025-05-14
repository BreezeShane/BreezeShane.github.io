---
title: 傅立叶分析
date: 2025-05-06
category: Mathematics
tag:
 - Theories
 - Analysis
 - Derivation
 - Fourier
# order: 2
excerpt: <ul><li>本篇于<strong>2025年5月6日</strong>起稿，于<strong>2025年5月13日</strong>结稿，主要讲述傅立叶分析的相关内容，包含从傅立叶级数、傅立叶变换、加伯变换到拉普拉斯变换等等，力求以比较严谨的数学定义与推导来理解、学习傅里叶分析。</li><li>本篇计划未来补充关于快速傅立叶变换的算法原理的内容。</li><li><strong>【温馨提示】如果这篇文章有幸能得到您的垂读，建议您具备高等数学的基础再进行阅读学习。</strong></li></ul>
---

::: info 参考资料

课程学习：

- [Steve Brunton【中英⚡傅里叶分析|Fourier Analysis】- Bilibili](https://www.bilibili.com/video/BV13oZqYkEpe)

---

图文资料：

- [正交 - 维基百科](https://zh.wikipedia.org/wiki/%E6%AD%A3%E4%BA%A4)
- [标准正交基 - 维基百科](https://zh.wikipedia.org/zh-cn/%E6%A0%87%E5%87%86%E6%AD%A3%E4%BA%A4%E5%9F%BA)
- [内积空间 - 维基百科](https://zh.wikipedia.org/wiki/%E5%86%85%E7%A7%AF%E7%A9%BA%E9%97%B4)
- [卷积 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%8D%B7%E7%A7%AF)
- [$L^p$空间 - 维基百科](https://zh.wikipedia.org/zh-sg/Lp%E7%A9%BA%E9%97%B4)
- [Lp空间 - 知乎](https://zhuanlan.zhihu.com/p/245782301)
- [傅里叶系列（一）傅里叶级数的推导](https://zhuanlan.zhihu.com/p/41455378)
- [傅里叶级数 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%82%85%E9%87%8C%E5%8F%B6%E7%BA%A7%E6%95%B0)
- [（一）傅里叶变换：傅里叶级数（Fourier Series）](https://blog.csdn.net/a493823882/article/details/78421899)
- [线性关系 - 维基百科](https://zh.wikipedia.org/zh-cn/%E7%B7%9A%E6%80%A7%E9%97%9C%E4%BF%82)
- [齐次函数 - 维基百科](https://zh.wikipedia.org/wiki/%E9%BD%90%E6%AC%A1%E5%87%BD%E6%95%B0)
- [欧拉公式 - 维基百科](https://zh.wikipedia.org/zh-cn/%E6%AC%A7%E6%8B%89%E5%85%AC%E5%BC%8F)
- [柯西-施瓦茨不等式 - 维基百科](https://zh.wikipedia.org/zh-cn/%E6%9F%AF%E8%A5%BF-%E6%96%BD%E7%93%A6%E8%8C%A8%E4%B8%8D%E7%AD%89%E5%BC%8F)
- [弱微分 - 维基百科](https://zh.wikipedia.org/wiki/%E5%BC%B1%E5%BE%AE%E5%88%86)
- [弱导数 - 中文数学Wiki](https://math.fandom.com/zh/wiki/%E5%BC%B1%E5%AF%BC%E6%95%B0)
- [开集 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%BC%80%E9%9B%86)
- [度量空间 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%BA%A6%E9%87%8F%E7%A9%BA%E9%97%B4)
- [局部可积函数 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%B1%80%E9%83%A8%E5%8F%AF%E7%A7%AF%E5%87%BD%E6%95%B0)
- [Compact set，紧集，闭集，开集 - CSDN](https://blog.csdn.net/robert_chen1988/article/details/82836226)
- [基本空间 - 中文数学Wiki](https://math.fandom.com/zh/wiki/%E5%9F%BA%E6%9C%AC%E7%A9%BA%E9%97%B4)
- [偏微分方程笔记(16)——弱导数、Sobolev空间 - 知乎](https://zhuanlan.zhihu.com/p/98143530)
- [Hölder 条件 - 维基百科](https://zh.wikipedia.org/zh-cn/%E8%B5%AB%E7%88%BE%E5%BE%B7%E6%A2%9D%E4%BB%B6)
- [Hölder 不等式 - 维基百科](https://zh.wikipedia.org/zh-cn/%E8%B5%AB%E5%B0%94%E5%BE%B7%E4%B8%8D%E7%AD%89%E5%BC%8F)
- [一致连续 - 维基百科](https://zh.wikipedia.org/w/index.php?title=%E4%B8%80%E8%87%B4%E8%BF%9E%E7%BB%AD&variant=zh-cn&oldformat=true)
- [帕塞瓦尔定理Parseval's theorem - 知乎](https://zhuanlan.zhihu.com/p/99602919)
- [帕塞瓦尔定理 - 维基百科](https://zh.wikipedia.org/zh-hans/%E5%B8%95%E5%A1%9E%E7%93%A6%E5%B0%94%E5%AE%9A%E7%90%86)
- [高斯函数 - 维基百科](https://zh.wikipedia.org/zh-cn/%E9%AB%98%E6%96%AF%E5%87%BD%E6%95%B0)
- [加伯变换 - 维基百科](https://zh.wikipedia.org/zh-cn/%E5%8A%A0%E4%BC%AF%E8%BD%89%E6%8F%9B)
- [高斯积分 - 维基百科](https://zh.wikipedia.org/zh-cn/%E9%AB%98%E6%96%AF%E7%A7%AF%E5%88%86)
- [拉普拉斯变换 - 维基百科](https://zh.wikipedia.org/zh-cn/%E6%8B%89%E6%99%AE%E6%8B%89%E6%96%AF%E5%8F%98%E6%8D%A2)

:::

## 前置知识

### 正交与正交基(摘自维基百科)

- 若内积空间中两向量的内积为0，则称它们是正交的。如果能够定义向量间的夹角，则正交可以直观地理解为垂直。
- 在线性代数中，一个内积空间的**正交基**（orthogonal basis）是元素两两正交的基。称基中的元素为**基向量**。假若，一个正交基的基向量的模长都是单位长度1，则称这正交基为**标准正交基**或"**规范正交基**"（Orthonormal basis）。

::: tip 内积空间

内积空间（inner product space）是增添了某种运算的向量空间，这种运算叫作内积，它推广了原来欧几里德空间的点积，而从比较一般的角度看待向量的“夹角”、“长度”还有正交性。

下文中 $F$ 有可能是实数系 $\mathbb{R}$ 或复数系 $\mathbb{C}$。

$V$ 是一個定義在域 $\left(F,\,+,\,\times \right)$ 上的向量空间，其向量加法記為「 $\oplus$ 」，且其标量乘法記為「 $\cdot$ 」。若它裝配了一個二元函数 $f:V\times V\to F$ 滿足：（以下將 $f(v,\,w)$ 簡寫為 $\langle v,\,w\rangle$ ）

1. **共轭对称**：$\forall v,w \in V$，有$\langle v,w \rangle = \overline{\langle w,v \rangle}$
2. **线性**：$\forall a,v,w \in V$，有$\langle v\oplus w,a \rangle = \langle v,a \rangle + \langle w,a \rangle$，同时$\forall v,w \in V, \forall \lambda \in F$，有$\langle \lambda\cdot v, w \rangle = \lambda\times\langle v,w \rangle$
3. **非负性**：$\forall v\in V$，有$\langle v,v \rangle \geq 0$
4. **非退化**：$\forall v\in V$，有$(v=0_{V})\Leftrightarrow (\langle v,\,v\rangle =0)$

:::

### 函数内积

在实数域下，有区间$[a,b]$上的函数$f(x), g(x)$，则定义函数$f(x)$与函数$g(x)$的内积为：

$$
\langle f(x), g(x)\rangle = \int_a^b f(x)g(x)\mathrm{dx}
$$

在复数域下，区间$[a,b]$上的函数$f(x)$和$g(x)$的内积为：

$$
\langle f(x), g(x)\rangle = \int_a^b f(x)\overline{g}(x) \mathrm{dx}
$$

其中$\overline{g}(x)$为函数$g(x)$的共轭函数。

### 坐标与正交基的关系

在常见的平面空间中，它的一组正交基可以是$\{(0,1), (1,0)\}$，也可以是其它一组标准正交基$\{ e_x, e_y \}$。

设一个向量$v$在$\{(0,1), (1,0)\}$正交基下，它的坐标是$(\lambda_x, \lambda_y)$，这个坐标的每一个元素都可以看作是向量$v$在对应基向量上的投影：

$$
\begin{aligned}
    \lambda_x &= \langle v, (1, 0)\rangle \\
    \lambda_y &= \langle v, (0, 1)\rangle
\end{aligned}
$$

对应的在另一组标准正交基$\{ e_x, e_y \}$下，向量$v$的坐标也可以同样的方式得出：

$$
\begin{aligned}
    \lambda_{e_x} = \langle v, e_x \rangle \\
    \lambda_{e_y} = \langle v, e_y \rangle
\end{aligned}
$$

因此，对于一组标准正交基$\{ e_k | k \in \mathbb{N} \}$，向量$v$的第$k$个分量在该正交基上的坐标为：

$$
v_k = \langle v, e_k \rangle
$$

从而得到向量$v$在这组正交基上的坐标为$(v_0, v_1, \dotsc, v_k, \dotsc)$。

::: important

对于一组非标准的正交基$\{ \psi_k | k \in \mathbb{R} \}$，要得到向量$v$在这组正交基上的坐标，需要另外除去正交基的模长：

$$
v_k = \frac{\langle v, \psi_k \rangle}{\Vert \psi_k\Vert ^2} = \frac{\langle v, \psi_k \rangle}{\langle \psi_k, \psi_k \rangle}
$$

:::

### 卷积

定义在$(-\infty, +\infty)$上的两个可积函数$f(x), g(x)$，它们的卷积按照如下定义：

$$
(f\star g)(x) = \int_{-\infty}^{\infty}f(x-\xi)g(\xi)\mathrm{d\xi}
$$

### Lp空间与范数

::: tip 要定义$L^p$空间与范数，首先需要构造等价类，然后限制积分收敛，才能得出$L^p$空间与范数的严格定义。
:::

设测度空间$(X,\mathscr{R},\mu)$中所有可测函数构成集合$\mathscr{M}$，对于$f\in\mathscr{M}, p\in \mathbb{R}_+$

首先定义等价关系：若$f = g$在$X$上几乎处处成立，即，则认为$f$与$g$等价，记为$f=g\ \mathrm{a.e.} \Leftrightarrow f\sim g$。

::: warning “几乎处处”是严格定义的

设空间$(X,\mathscr{R},\mu)$是一个测度空间，若某个性质在$X$上除了一个测度为零的集合外均成立，则称该性质几乎处处成立，即存在一个可测集$N\in\mathscr{R}$，满足$\mu(N) = 0, \forall x \in X \setminus N$，此时某个性质成立。

:::

其次定义商空间：将可测函数集合$\mathscr{M}$按照等价关系$\sim$划分等价类，记为$\mathscr{M} / \sim$。

验证是否保持非退化性：在商空间中，每个等价类要么是零类，要么是非零类。此时$\Vert [f]\Vert_p = 0\Leftrightarrow[f]$是零类。

然后要求以下积分收敛：
$$
\Bigg( \int_X |f|^p\mathrm{d\mu} \Bigg)^{1/p} < +\infty
$$

此时$L^p(X)$空间定义为：

$$
L^p (X,\mathscr{R},\mu) = \Bigg\{ [f]\in\mathscr{M}/\sim \,\Bigg|\, \Vert f\Vert_p < +\infty \Bigg\}
$$

$L_p$范数被定义为：
$$
\Vert f\Vert_p = \Bigg( \int_X |f|^p\mathrm{d\mu} \Bigg)^{1/p}
$$

::: important $p\to+\infty$

等价类构造方法同上，当$p\to+\infty$时，$L^{\infty}$空间有以下定义：
$$
L^{\infty} (X,\mathscr{R},\mu) = \Bigg\{ [f]\in\mathscr{M}/\sim \,\Bigg|\, \Vert f\Vert_{\infty} < +\infty \Bigg\}
$$

同时$\Vert f\Vert_{\infty}$有以下定义：

$$
\Vert f \Vert_{\infty} = \inf \Bigg\{ M\geq 0 \,\Bigg|\, |f(x)|\leq M\ \mathrm{a.e.} \Bigg\}
$$

即$\Vert f \Vert_{\infty}$是函数$f$的最小上界。

---

- 若$\Vert f \Vert_{\infty} < +\infty$，则称函数$f$**本性有界**，$\lim_{p\to+\infty}\Vert f(x)\Vert_p = \Vert f \Vert_{\infty}$
- 有限测度空间：若$\mu(X)<+\infty$，则 $L^{\infty}(X) \subset L^p(X)$对所有$p\geq1$成立。
- 无限测度空间：若$\mu(X)=+\infty$，则 $L^{\infty}(X)$与$L^p(X)$无必然包含关系。

:::

### 柯西不等式

柯西不等式的一般形式：

$V$ 是个复内积空间，则对所有的 $v,\,w\in V$ 有：

- $\|v\|\|w\|\geq |\langle v,\,w\rangle |$
- $\|v\|\|w\|=|\langle v,\,w\rangle | \Leftrightarrow \exist \lambda \in \mathbb{C}, \text{使} v=\lambda\cdot w$

柯西不等式的积分形式：

对平方可积的复值函数，有

$$
\left|\int f(x)g(x)\,dx\right|^{2}\leq \int \left|f(x)\right|^{2}\,dx\cdot \int \left|g(x)\right|^{2}\,dx = \Vert f\Vert_{L^2}^{2}\cdot \Vert g\Vert_{L^2}^{2}
$$

这等价于

$$
\left|\int f(x)g(x)\,dx\right| \leq \Bigg(\int \left|f(x)\right|^{2}\,dx\Bigg)^{1/2} \cdot \Bigg(\int \left|g(x)\right|^{2}\,dx\Bigg)^{1/2} = \Vert f\Vert_{L^2}\cdot \Vert g\Vert_{L^2}
$$

### 弱导数

假设有开集 $U\subset \mathbb {R} ^{n}$，$u,v$是 $U$ 上局部可积函数。给定多重指标 $\alpha$，我们称 $v$ 是 $u$ 的 $\alpha$ 阶弱导数，是指对任意 $\psi \in C_{c}^{\infty}(U)$，满足关系式：

$$
\int _{U}uD^{\alpha }\phi \mathrm {d} x=(-1)^{|\alpha |}\int _{U}v\phi \mathrm {d} x
$$

我们记 $v\coloneqq{\widetilde{D}}^{\alpha}u$，有时在不引起混淆的情况下也记为$D^{\alpha }u$。其中 $\phi$ 常称为测试函数（test function），是基本空间$\mathcal {D}(U)$中的元素。

::: tip 概念解释

- **赋距空间**：
  设$M$为集合，如果它装配了函数$d: M\times M\to \mathbb{R}, \forall x,y,z\in M$，满足三个性质：
  1. _同一性_：$d(x,y) = 0 \Rightarrow x = y$
  2. _对称性_：$d(x,y) = d(y, x)$
  3. _三角不等式_：$d(x,z) \leq d(x,y) + d(y,z)$
  则称$d$是$M$上的度量或距离函数，称$(M, d)$为度量空间。
- **开集、闭集、紧集**：
  - 在度量空间$(M, d)$中定义**开球**为：$B(a, \delta) = \Big\{ p\in M \Big| d(a, p) < \delta \Big\}$，若$U\subseteq M, \forall\, p \in U, \exist\, \delta > 0$ 使得 $B(a, \delta) \subseteq U$，则称 $U$ 是 $M$ 的一个开集。
  - 补集为开集的集合称为闭集。
  - 若一个集合同时满足闭集和有界，则它被称为紧集。
  > **注意**：闭集不一定有界，如$[a,+\infty)$是闭集，但它无界。
- **局部可积**：在数学中，局部可积函数是指在定义域内的所有紧集上都可积的函数。
- **极限点**：
  在拓扑空间中，给定集合 $A$，如果点 $x$ 满足以下条件：
  $$
  \forall \varepsilon>0, \Big( B(x, \epsilon) \setminus {x} \Big) \cap A \neq \emptyset
  $$
  其中 $B(x,\varepsilon)$ 是以点 $x$ 为中心，半径为 $\varepsilon$ 的开邻域。
  此时称点 $x$ 是集合 $A$ 的一个极限点（或聚点）。
- **闭包**：给定集合 $A$，其闭包 $\overline{A}$ 是包含 $A$ 的所有极限点的最小闭集。换句话说，闭包由 $A$ 本身及其所有极限点（即聚点）组成。
- **基本空间**：
  假设 $U\subset \mathbb{R}^n$是一个开集（可以是全空间），$C_{c}^{\infty}(U)$表示 $U$ 上所有满足以下条件的函数 $f$ 的全体：
  1. 在 $U$ 的闭包 $\overline{U}$ 上有定义且连续
  2. 在 $U$ 上无穷可微
  3. 具有紧支集，即 $\exist\,U_f\subset U$ 使得 $U_f\coloneqq \big\{ x\in U_f \big| f(x)\neq 0 \big\}$ 的闭包 $\overline{U_f}$ 在 $U$ 中是紧集。

:::

::: important 下文关于导函数的变换中，导函数均指本小节的弱导数。
:::

## 傅立叶级数

由欧拉公式可得

$$
e^{ikx} = \cos(kx) + i\sin(kx) \coloneqq \psi_k(x)
$$

断言该空间下的$\{\psi_k | k \in \mathbb{R}\}$是一组正交基，原因如下：

$$
\begin{align*}
<\psi_j,\psi_k> &= \int_{-\pi}^\pi e^{ijx} \cdot e^{-ikx} \mathrm{dx} \\
    &= \int_{-\pi}^\pi e^{i(j-k)x} \mathrm{dx} \\
    &= \left\{
        \begin{align*}
            &2\pi & &{\mathrm{if}} &{j = k} \\
            &\frac{1}{i(j-k)}\big[ e^{i(j-k)x} \big]_{-\pi}^\pi & &{\mathrm{if}} &{j \neq k}
        \end{align*}
    \right.
\end{align*}
$$

注意到$e^{i(j-k)x}$在$-\pi$和$\pi$两处的值相同（详见欧拉公式的几何意义），可得$\frac{1}{i(j-k)}\big[ e^{i(j-k)x} \big]_{-\pi}^\pi = 0$，即

$$
<\psi_j,\psi_k>= \left\{
        \begin{align*}
            &2\pi & &{\mathrm{if}} &{j = k} \\
            &0 & &{\mathrm{if}} &{j \neq k}
        \end{align*}
    \right.
$$

故称$\{\psi_k | k \in \mathbb{R}\}$是该空间下的一组正交基。

现在不妨先假设在复数域$C$上有以$2\pi$为周期的函数$f(x)$，有

$$
f(x) = \sum_{k=-\infty}^{+\infty}c_k e^{ikx}\text{，其中若}f(x)\text{为实函数，则}c_k = \overline{c_{-k}}\text{。}
$$

::: tip

该公式源自于一个最朴素的想法：将$f(x)$看作一个无穷维向量，它在不同标准正交基下的坐标不同，而$\{\psi_k | k \in \mathbb{R}\}$下$f(x)$有对应坐标$c=[c_0, c_1, \dotsc, c_k, \dotsc]$，因而$f(x)$可以写成$c$的分量$c_k$与$f(x)$和对应正交基向量内积之和的形式，即：

$$
c_k = \langle f(x), \psi_k \rangle
$$

:::

进一步地，令$x = \frac{\pi}{T}\xi$，则有$f(\frac{\pi}{T}\xi) = \sum_{k=-\infty}^{+\infty}c_k e^{ik\cdot \frac{\pi}{T} \xi} \coloneqq g(\xi)$

这样，便得到了新的以$2T$为周期的$f(x)$，使得下式成立：

$$
f(x) = \sum_{k=-\infty}^{+\infty} c_k\exp{\frac{ik\pi}{T}x}
$$

::: details **实数域下三角形式的傅里叶级数**

On building...

:::

## 由级数到积分变换的推导

由上节得知以$2T$为周期的$f(x)$满足：

$$
f(x) = \sum_{k=-\infty}^{+\infty} c_k\exp{\frac{ik\pi}{T}x} \\
\text{易得 }c_k = \frac{\langle f(x),\psi_k \rangle}{\langle \psi_k,\psi_k \rangle} = \frac{\langle f(x),\psi_k \rangle}{\int_{-T}^{T}\psi_k(x)\overline{\psi_k}(x) \mathrm{dx}} = \frac{1}{2T}\langle f(x),\psi_k \rangle
$$
::: tip 为了导出积分的形式，我们定义$\omega_k \coloneqq \frac{k\pi}{T} \coloneqq k\cdot\Delta\omega, \Delta\omega = \frac{\pi}{T}$，这个$\Delta\omega$可看作基频，其它频率$\omega_k$是$\Delta\omega$的$k$倍。
:::
将$c_k$代入$f(x)$中，得：
$$
\begin{aligned}
    f(x) =& \sum_{k=-\infty}^{+\infty} \frac{1}{2T}\langle f(x),\psi_k \rangle\exp{\frac{ik\pi}{T}x} \\
    =& \sum_{k=-\infty}^{+\infty} \frac{1}{2T} \int_{-T}^{T} f(\xi)\cdot\overline{\psi_k}\mathrm{d\xi}\exp{\frac{ik\pi}{T}x} \\
    =& \sum_{k=-\infty}^{+\infty} \frac{1}{2T} \int_{-T}^{T} f(\xi)\cdot\exp{\big(-\frac{ik\pi}{T}\xi\big)}\mathrm{d\xi}\exp{\frac{ik\pi}{T}x} \\
    T\to\infty\text{时},\quad f(x) =& \lim_{T\to\infty} \sum_{k=-\infty}^{+\infty} \frac{1}{2T} \int_{-T}^{T} f(\xi)\cdot\exp{\big(-\frac{ik\pi}{T}\xi\big)}\mathrm{d\xi}\exp{\frac{ik\pi}{T}x} \\
    \xlongequal[\omega = k\Delta\omega]{T=\dfrac{\pi}{\Delta\omega}}& \lim_{\Delta\omega\to0} \sum_{k=-\infty}^{+\infty} \frac{\Delta\omega}{2\pi} \int_{-\pi/\Delta\omega}^{\pi/\Delta\omega} f(\xi)\cdot\exp{(-ik\Delta\omega\xi)}\mathrm{d\xi}\exp{(ik\Delta\omega x)} \\
    =& \frac{1}{2\pi} \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty}f(\xi) e^{-i\omega\xi}\mathrm{d\xi} \cdot e^{i\omega x}\mathrm{d\omega}
\end{aligned}
$$

观察$f(x) = \frac{1}{2\pi} \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty}f(\xi) e^{-i\omega\xi}\mathrm{d\xi} \cdot e^{i\omega x}\mathrm{d\omega}$，不难发现，等式右侧中$\int_{-\infty}^{+\infty}f(\xi) e^{-i\omega\xi}\mathrm{d\xi}$是一个关于$\omega$的函数，因此可以定义：
$$
\hat{f}(\omega) \coloneqq \int_{-\infty}^{+\infty}f(\xi) e^{-i\omega\xi}\mathrm{d\xi}
$$

那么就有

$$
f(x) = \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) e^{i\omega x}\mathrm{d\omega}
$$

至此我们已经得出了**傅立叶变换对**：

$$
\left\{
\begin{aligned}
    \hat{f}(\omega) &= \int_{-\infty}^{+\infty}f(x) e^{-i\omega x}\mathrm{dx} \\
    f(x) &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) e^{i\omega x}\mathrm{d\omega}
\end{aligned}
\right.
$$

::: tip $\hat{f}(\omega)$是$f(x)$经过变换后得到的傅立叶系数。
:::

::: important 傅立叶级数使用条件

傅立叶级数要求函数具有**周期性**，对于函数$f(x)$的不同情况：

- 当函数$f(x)$满足周期性时（假设以$2T$为周期），该函数可以直接展开为傅立叶级数。
- 当函数$f(x)$不满足周期性，但定义在有限区间上时，需要对该函数使用周期延拓、奇延拓或偶延拓等方法进行处理，使得延拓后的函数满足周期性。

**注意**：这种延拓可能导致延拓后的函数在区间端点处出现不连续性（即使原函数连续），从而引发吉布斯现象（Gibbs phenomenon）。

---

傅立叶级数还要求函数满足**狄利克雷条件**：

1. **在一个周期内绝对可积**：$\int_{-T}^{T}|f(x)|\mathrm{dx} < \infty$
2. **有限个极值点**：函数在周期内只有有限个极大值和极小值。
3. **有限个第一类间断点**：函数在周期内仅有有限个跳跃不连续点。

:::

::: important 傅立叶变换使用条件

傅立叶变换要求函数：

1. $\forall f: \mathbb{R^n}\to\mathbb{C} \in L^1(\mathbb{R^n})$，如果函数$f(x)$绝对可积，即
    $$
    \int_{-\infty}^{+\infty}|f(x)|\mathrm{dx} < \infty
    $$
2. $\forall f: \mathbb{R^n}\to\mathbb{C} \in L^2(\mathbb{R^n})$，如果函数$f(x)$平方可积，即
    $$
    \int_{-\infty}^{+\infty}|f(x)|^2\mathrm{dx} < \infty
    $$

满足以上条件之一，则可以对该函数使用傅立叶变换。

:::

## 傅立叶变换

上一节我们推导出了傅立叶变换对，更常见的写法如下：
$$
\left\{
\begin{aligned}
    \mathcal{F}\Big(f(x)\Big) &= \int_{-\infty}^{+\infty}f(x) e^{-i\omega x}\mathrm{dx} \\
    \mathcal{F}^{-1}\Big(\hat{f}(\omega)\Big) &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) e^{i\omega x}\mathrm{d\omega}
\end{aligned}
\right.
$$

其中$\mathcal{F}(\cdot)$是傅立叶变换，$\mathcal{F}^{-1}(\cdot)$是它的逆变换。

::: tip 高斯函数经过逆傅立叶变换后仍然是高斯函数。
:::

## 傅立叶变换的性质

### 线性变换

$\mathcal{F}(\cdot)$是一种线性变换，要证明这一点，我们只需要证明它满足**可加性**和**一次齐次性**即可：

$\forall f_a, f_b \in \Big(L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n)\Big)$，有：

$$
\begin{aligned}
    \mathcal{F}(f_a + f_b) &= \int_{-\infty}^{+\infty} (f_a + f_b) e^{-i\omega x}\mathrm{dx} \\
    &= \int_{-\infty}^{+\infty} f_a e^{-i\omega x} + f_b e^{-i\omega x}\mathrm{dx} \\
    &= \int_{-\infty}^{+\infty} f_a e^{-i\omega x}\mathrm{dx} + \int_{-\infty}^{+\infty} f_b e^{-i\omega x}\mathrm{dx} \\
    &= \mathcal{F}(f_a) + \mathcal{F}(f_b)
\end{aligned}
$$

$\therefore \mathcal{F}(\cdot)$满足可加性。

---

$\forall f \in \Big(L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n)\Big),\forall\lambda\in\mathbb{R}$，有：

$$
\begin{aligned}
    \mathcal{F}(\lambda f) &= \int_{-\infty}^{+\infty} \lambda f \cdot e^{-i\omega x}\mathrm{dx} \\
    &= \lambda \int_{-\infty}^{+\infty} f \cdot e^{-i\omega x}\mathrm{dx} \\
    &= \lambda \mathcal{F}(f)
\end{aligned}
$$

$\therefore \mathcal{F}(\cdot)$满足一次齐次性。

综上所述，$\mathcal{F}(\cdot)$是一种线性变换。

### 导函数的傅立叶变换

$\forall f \in \Big(L^1(\mathbb{R}) \cup L^2(\mathbb{R})\Big)$，$f$有导函数$\mathrm{\dfrac{d}{dx}}f \in \Big(L^1(\mathbb{R}) \cup L^2(\mathbb{R})\Big)$，那么有：

$$
\begin{aligned}
    \mathcal{F}(\mathrm{\frac{d}{dx}}f) &= \int_{-\infty}^{+\infty} \mathrm{\frac{d}{dx}}f \cdot e^{-i\omega x}\mathrm{dx} \\
    &= \int_{-\infty}^{+\infty} e^{-i\omega x}\mathrm{d}[f(x)] \\
    &= \Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} - \int_{-\infty}^{+\infty} f(x) \mathrm{d}[e^{-i\omega x}] \\
    &= \Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} + i\omega\int_{-\infty}^{+\infty} f(x) \cdot e^{-i\omega x} \mathrm{dx} \\
    &= \Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} + i\omega\mathcal{F}(f(x)) \\
    &= i\omega\hat{f}(\omega)
\end{aligned}
$$

从中我们得到了傅立叶变换的一个很重要的等式：$\mathcal{F}\Big(\mathrm{\dfrac{d}{dx}}f(x)\Big) = i\omega\hat{f}(\omega)$

::: tip $\Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty}$为什么是$0$？

$\Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} = 0$是由条件$\forall f,\mathrm{\dfrac{d}{dx}}f \in \Big( L^1(\mathbb{R}) \cup L^2(\mathbb{R}) \Big)$保证的。

$$
\Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} = \lim_{x\to+\infty}f(x)e^{-i\omega x} - \lim_{x\to-\infty}f(x)e^{-i\omega x}
$$

应当注意到，当$x\to\plusmn\infty$时，$e^{-i\omega x}$是一个有界量，因为$e^{i\omega x}=cos(\omega x)+i\sin(\omega x)$，而且$e^{i\omega x}$的模长为$1$。所以现在需要关注函数$f(x)$是否无穷小，若$f(x)\to0$成立，则$\lim_{x\to\plusmn\infty}f(x)e^{-i\omega x}=0$成立，那么现在需要分情况讨论：

- $f^\prime \in L^1(\mathbb{R})$时
  由牛顿-莱布尼茨公式可知，$f(x) = f(0) + \int_0^x f^\prime(t)\mathrm{dt}$
  $$
  \because f^\prime \in L^1(\mathbb{R}) \Rightarrow \int_{-\infty}^{+\infty}|f^\prime(t)|\mathrm{dt}\ \text{收敛} \\
  \therefore \lim_{x\to+\infty}\int_0^x f^\prime(t)\mathrm{dt} = C_+, \lim_{x\to-\infty}\int_0^x f^\prime(t)\mathrm{dt} = C_-\ (C_+,\ C_- \in \mathbb{R}) \\
  \text{即}\ \lim_{x\to+\infty} f(x) = f(0) + C_+, \lim_{x\to-\infty} f(x) = f(0) + C_- \\
  $$
  设 $C = f(0) + C_+$（ $C = f(0) + C_-$ 同理），则假设 $|x|\to\infty$ 时，$|f(x)|\to |C|\neq 0$
  $$
  \because \forall\ \varepsilon > 0, \exist\ N \in \mathbb{R}, \text{当}|x| > N\text{时}, \text{使得} 0 < |f(x) - C| < \varepsilon \\
  \text{对于}\varepsilon = \frac{|C|}{2}, \text{有} |f(x) - C| < \frac{|C|}{2} \\
  \text{由三角不等式得} |f(x)| \geq |C| - |f(x) - C| > |C| - \frac{|C|}{2} = \frac{|C|}{2} \\
  \therefore \int_{-\infty}^{+\infty} |f(x)|^p\mathrm{dx} > \int_{-\infty}^{+\infty} \Big( \frac{|C|}{2} \Big)^p\mathrm{dx} \\
  \text{显然} \int_{-\infty}^{+\infty} \Big( \frac{|C|}{2} \Big)^p\mathrm{dx} \text{发散，与} f \in L^p(\mathbb{R}) \text{矛盾。} \\
  \therefore C = 0\ \text{即} \lim_{x\to\plusmn\infty}f(x) = 0 \Rightarrow \lim_{x\to\plusmn\infty}f(x)e^{-i\omega x}=0
  $$
- $f^\prime \in L^2(\mathbb{R})$时
  首先需要讨论函数$f$的连续性问题，根据牛顿-莱布尼茨公式以及弱导数的定义，可得：
  $$
  f(x) - f(y) = \int_y^x f^\prime(t)\mathrm{dt}
  $$
  考虑到：
  $$
  -|f^\prime(t)| \leq f^\prime(t) \leq |f^\prime(t)| \Rightarrow -\int_{y}^{x}|f^\prime(t)|\mathrm{dt} \leq \int_{y}^{x}f^\prime(t)\mathrm{dt} \leq \int_{y}^{x}|f^\prime(t)|\mathrm{dt}
  $$
  那么有
  $$
  \big|f(x) - f(y)\big| = \Bigg|\int_{y}^{x} f^\prime(t)\mathrm{dt}\Bigg| \leq \int_{y}^{x} |f^\prime(t)|\mathrm{dt}
  $$
  对$\int_{y}^{x} |f^\prime(t)|\mathrm{dt}$使用柯西-施瓦茨不等式可得：
  $$
  \int_{y}^{x} |f^\prime(t)|\mathrm{dt} \leq \Bigg( \int_y^x 1^2 \mathrm{dt} \Bigg)^{1/2} \cdot \Bigg( \int_y^x |f^\prime(t)|^2 \mathrm{dt} \Bigg)^{1/2} = \sqrt{|x-y|} \cdot \Vert f^\prime \Vert_{L^2}
  $$
  根据 $\mathrm{H\ddot{o}lder}$ 连续条件：
  $$
  |f(x) - f(y)| \leq C|x-y|^\alpha, \, \alpha=\frac{1}{2} , \, C = \Vert f^\prime\Vert_{L^2}
  $$
  可知函数$f$是 $\mathrm{H\ddot{o}lder}$ 连续的。
  断言 $\mathrm{H\ddot{o}lder}$ 连续必一致连续，因为：
  假设函数$f$满足 $\mathrm{H\ddot{o}lder}$ 条件，但不一致连续，则$\exist \varepsilon>0, \forall \delta > 0$ 使得
  $$
  \forall n\in\mathbb{N}, \exist x_n,y_n\in D_f,\text{使得}\ |x_n - y_n| < \delta, |f(x_n) - f(y_n)| \geq \varepsilon \\
  \text{不妨设}\, \delta = \Big( \frac{\varepsilon}{C} \Big)^2\ \text{则有} |x_n - y_n| < \frac{\varepsilon^2}{C^2} \Rightarrow |x_n - y_n|^{1/2} < \frac{\varepsilon}{C}\ \text{即}\ C|x_n - y_n|^{1/2} < \varepsilon \\
  \therefore |f(x_n) - f(y_n)| \leq C\sqrt{|x_n-y_n|} < \varepsilon \ \big(\mathrm{H\ddot{o}lder}\,\text{条件} \big) \\
  \text{与}\ |f(x_n) - f(y_n)| \geq \varepsilon\ \text{即函数}f \text{不一致连续矛盾} \\
  $$
  $\therefore$ 得证 $\mathrm{H\ddot{o}lder}$ 连续必一致连续，所以函数$f$在$\mathbb{R}$上连续【一致连续必连续】。
  其次需要说明函数$f$在无穷远处必衰减至 $0$：
  假设 $x\to\infty$ 时，$f(x)\not\to 0$，那么$\forall n \in \mathbb{N}, \exist\ x_n\to+\infty, |f(x_n)| \geq \varepsilon > 0$
  $$
  \because f \text{在}\,\mathbb{R}\,\text{上连续} \Rightarrow \exist N\in\mathbb{N}, \text{当}\, n>N\,\text{时}\, |f(x_n)| \geq \varepsilon \\
  \text{又}\, \because \exist \delta >0,\text{使得} x\in[x_n-\delta, x_n+\delta]\,\text{时}\, |f(x)| \geq \varepsilon_0 = \frac{\varepsilon}{2} \\
  \therefore \int_{x_n-\delta}^{x_n+\delta} |f(x)|^2\mathrm{dx} \geq \int_{x_n-\delta}^{x_n+\delta} \Big( \frac{\varepsilon}{2} \Big)^2 \mathrm{dx} = \frac{\varepsilon^2\delta}{2} \neq 0
  $$
  取 $x_{n+1} - \delta \geq x_n + \delta$，则
  $$
  \int_{-\infty}^{+\infty} |f(x)|^2\mathrm{dx} \geq \sum_{n=1}^{\infty} \int_{x_n-\delta}^{x_n+\delta} |f(x)|^2 \mathrm{dx} \geq \sum_{n=1}^{\infty} \frac{\varepsilon^2\delta}{2} = +\infty
  $$
  与函数$f\in L^2(\mathbb{R})$ 矛盾，所以$x\to\infty$时$f(x)\to0$，即$\lim_{x\to\infty}f(x) = 0$

综上所述，有：
$$
\forall f \in \Big(L^1(\mathbb{R}) \cup L^2(\mathbb{R})\Big), \lim_{x\to\infty} f(x) = 0 \Rightarrow \lim_{x\to\plusmn\infty}f(x)e^{-i\omega x} = 0 \Rightarrow \Big[f(x)e^{-i\omega x}\Big]_{-\infty}^{+\infty} = 0
$$

:::

### 卷积的傅立叶变换

傅立叶变换能化简卷积运算，因为下列等式成立：
$$
\mathcal{F}(f\star g)(x) = \hat{f}\cdot\hat{g}
$$

证明：
$$
\begin{aligned}
    \mathcal{F}^{-1}( \hat{f}\cdot\hat{g} ) &= \frac{1}{2\pi}\int_{-\infty}^{+\infty} \hat{f}\hat{g} \cdot e^{i\omega x}\mathcal{d\omega} \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f} \int_{-\infty}^{+\infty} g(\xi)e^{-i\omega\xi}\mathrm{d\xi} \cdot e^{i\omega x}\mathrm{d\omega} \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} \hat{f} \cdot g(\xi) e^{i\omega(x-\xi)}\mathrm{d\omega} \mathrm{d\xi} \\
    &= \int_{-\infty}^{+\infty} \Big[ \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f} e^{i\omega(x-\xi)}\mathrm{d\omega} \Big] \cdot g(\xi) \mathrm{d\xi} \\
    &= \int_{-\infty}^{+\infty} f(x-\xi) g(\xi) \mathrm{d\xi} \\
\end{aligned} \\
\therefore \mathcal{F}^{-1}( \hat{f}\cdot\hat{g} ) = (f\star g)(x) \\
$$
对两侧进行傅立叶变换得：
$$
\mathcal{F}(f\star g)(x) = \hat{f}\cdot\hat{g}
$$

## Parseval's theorem

$$
\forall f \in \Big( L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n) \Big),\,\text{有}\,\int_{-\infty}^{+\infty}|\hat{f}(\omega)|^2\mathrm{d\omega} = 2\pi\int_{-\infty}^{+\infty}|f(x)|^2\mathrm{dx}
$$

上式被称作帕塞瓦尔定理，这一定理表明信号的能量在时域和频域相等，同时也揭示了一件事：使用傅立叶变换去拟合函数时，对于其中傅立叶系数绝对值非常小的各分量，即使直接忽略掉这些分量，对拟合函数的过程影响也非常小。

推导证明：

$$
\begin{aligned}
    \int_{-\infty}^{+\infty}|f(x)|^2\mathrm{dx} &= \int_{-\infty}^{+\infty}\Big[ f(x) \Big]^2\mathrm{dx} \\
    &= \int_{-\infty}^{+\infty} f(x) \cdot \Bigg[ \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) e^{i\omega x} \mathrm{d}\omega \Bigg] \mathrm{dx} \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) \cdot \Bigg[ \int_{-\infty}^{+\infty} f(x) e^{i\omega x} \mathrm{d}x \Bigg] \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) \cdot \Bigg[ \int_{-\infty}^{+\infty} f(x) e^{-i(-\omega) x} \mathrm{d}x \Bigg] \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}(\omega) \cdot \hat{f}(-\omega) \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} |\hat{f}(\omega)|^2 \mathrm{d}\omega
\end{aligned} \\
\therefore \int_{-\infty}^{+\infty}|\hat{f}(\omega)|^2\mathrm{d\omega} = 2\pi\int_{-\infty}^{+\infty}|f(x)|^2\mathrm{dx}
$$

::: tip ${\mathcal{F}[f]}(-\omega) = \overline{\mathcal{F}[f]}(\omega)$？
$$
{\mathcal{F}[f]}(-\omega) = \int_{-\infty}^{+\infty} f(x) e^{-i(-\omega) x} \mathrm{d}x = \int_{-\infty}^{+\infty} f(x) e^{i\omega x} \mathrm{d}x \\
\overline{{\mathcal{F}[f]}}(\omega) = \overline{\int_{-\infty}^{+\infty} f(x) e^{-i\omega x} \mathrm{d}x} = \int_{-\infty}^{+\infty} \overline{f(x) e^{-i\omega x}} \mathrm{d}x = \int_{-\infty}^{+\infty} \overline{f(x)} \cdot \overline{e^{-i\omega x}} \mathrm{d}x = \int_{-\infty}^{+\infty} \overline{f(x)} \cdot e^{i\omega x} \mathrm{d}x \\
\because f \in \Big( L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n) \Big) \Rightarrow \overline{f(x)} = f(x) \\
\therefore \overline{{\mathcal{F}[f]}}(\omega) = \int_{-\infty}^{+\infty} f(x)e^{i\omega x} \mathrm{d}x \\
\therefore {\mathcal{F}[f]}(-\omega) = \overline{\mathcal{F}[f]}(\omega)
$$
:::

类似地，对于两个不同的信号$f_1, f_2\in \Big( L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n) \Big)$，有以下等式成立：
$$
\int_{-\infty}^{+\infty} f_1 f_2 \mathrm{d}t = \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1^{} \hat{f}_2^* \mathrm{d}\omega
$$

推导证明：
$$
\begin{aligned}
    \int_{-\infty}^{+\infty} f_1 f_2 \mathrm{d}t &= \int_{-\infty}^{+\infty} f_2 \Bigg[ \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1 e^{i\omega t} \mathrm{d}\omega \Bigg] \mathrm{d}t \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1 \Bigg[ \int_{-\infty}^{+\infty} f_2 e^{i\omega t} \mathrm{d}t \Bigg] \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1 \Bigg[ \int_{-\infty}^{+\infty} f_2 e^{-i( -\omega) t} \mathrm{d}t \Bigg] \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1(\omega) \hat{f}_2(-\omega) \mathrm{d}\omega \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1^{}\hat{f}_2^* \mathrm{d}\omega \quad \Bigg( = \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1^*\hat{f}_2^{} \mathrm{d}\omega \Bigg)
\end{aligned} \\
\therefore \int_{-\infty}^{+\infty} f_1 f_2 \mathrm{d}t = \frac{1}{2\pi} \int_{-\infty}^{+\infty} \hat{f}_1^{} \hat{f}_2^* \mathrm{d}\omega
$$

## Discrete Fourier Transform (DFS)

有一系列数据$f = [f_0, f_1, f_2, \dotsc, f_n]^T$，其中$f_k\,(k\in\mathbb{N})$是$f$的第$k$个值。对于这种离散值，我们通常使用以下变换对来做离散傅立叶变换：
$$
\left\{
\begin{aligned}
    \hat{f}(k ) &= \sum_{j=0}^{n-1} f_j \exp{\Big( -\dfrac{i\cdot2\pi jk}{n} \Big)} \\\\
    f_k &= \dfrac{1}{n} \sum_{j=0}^{n-1} \hat{f_j} \exp{\dfrac{i\cdot2\pi jk}{n}}
\end{aligned}
\right.
$$
其中设$\omega\coloneqq\exp{ \Big( -\dfrac{2\pi i}{n} \Big) }$为基频。
那么利用这个变换对在对$f$进行离散傅立叶变换时可以该写成矩阵乘法的形式表示：
$$
\hat{f} = Wf
$$
其中
$$
W\coloneqq\left[
\begin{matrix}
    1 & 1 & 1 & \cdots & 1 \\
    1 & \omega & \omega^{2} & \cdots & \omega^{n-1} \\
    1 & \omega^{2} & \omega^{4} & \cdots & \omega^{2(n-1)} \\
    \vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & \omega^{n-1} & \omega^{2(n-1)} & \cdots & \omega^{(n-1)^2} \\
\end{matrix}
\right]
$$

::: tip $W$ 是一个范德蒙矩阵 (Vandermonde Matrix)，同时也是一个酉矩阵 (Unitary Matrix)。
:::

实际场景下一般使用快速傅立叶变换 (FFT)，DFS 本身运行效率偏低，时间复杂度可达 $\mathcal{O}(n^2)$，这里写出来是为了便于理解对数据的傅立叶变换这一过程。

## Fast Fourier Transform (FFT)

::: info 由于算法复杂性，未来会补充该部分的内容
:::

## Gabor Transform

定义以下等式：
$$
G[f(t)] = \hat{f_g}(t, \omega) = \int_{-\infty}^{+\infty}f(\tau)e^{-i\omega\tau}\cdot\mathrm{Gauss}(t-\tau)\mathrm{d\tau}
$$

其中 $\mathrm{Gauss}(\cdot)$ 是高斯函数，高斯函数的定义如下：
$$
\forall\,a,b,c \in \mathbb{R}, a>0, \mathrm{Gauss}(x) = a\exp{ \Big[\frac{-(x-b)^2}{2c^2} \Big] }
$$

::: tip $c^2 = 2$ 的高斯函数是傅立叶变换的特征函数。这就意味着高斯函数的傅立叶变换不仅仅是另一个高斯函数，而且是进行傅立叶变换的函数的标量倍。
:::

通过定义可以看出，Gabor 变换是窗函数为高斯函数时的短时距傅立叶变换。该变换可以同时兼顾时间轴和频率轴的分辨率。
一般地，加窗傅立叶变换可以同时兼顾时域和频域的精度，选择高斯函数的原因是：
由海森堡测不准原理（[Heisenberg Uncertainty Principle](https://zh.wikipedia.org/zh-cn/%E4%B8%8D%E7%A1%AE%E5%AE%9A%E6%80%A7%E5%8E%9F%E7%90%86)）可知，
对于一个信号 $x(t)$，当 $|t|\to \infty$，若 $\sqrt{t}x(t)=0$，则$\sigma_{t}\sigma_{f}\geq 1/4\pi$，其中
$$
\left\{
\begin{aligned}
    \sigma_t^2 &= \int (t-\mu_t)^2 P_x(t)\mathrm{d}t, \\
    \mu_t &= \int tP_x(t)\mathrm{d}t, \\
    P_x(t) &= \frac{|x(t)|^2}{\int |x(t)|^2\mathrm{d}t}
\end{aligned}
\right.
\qquad\qquad
\left\{
\begin{aligned}
    \sigma_f^2 &= \int (f-\mu_f)^2 P_X(f)\mathrm{d}f \\
    \mu_f &= \int fP_X(f)\mathrm{d}f \\
    P_X(f) &= \frac{|X(f)|^{2}}{\int |X(f)|^{2}\mathrm{d}f}
\end{aligned}
\right.
$$
由于两者标准差相乘有下限，这个定理说明了我们没有办法同时精准量测时间和频率，其中一者标准差下降(分辨率上升)，另一者标准差就上升(分辨率下降)。
特别地，当信号函数 $x(t)$ 为高斯函数时
$$
x(t)=e^{-\pi t^{2}},\,X(f)=e^{-\pi f^{2}}
$$
此时 $\mu_t = \int tP_x(t)\mathrm{d}t = 0$，因此得出
$$
\sigma_{t}^{2} = \frac{\int t^2 |x(t)|^{2}\mathrm{d}t}{\int |x(t)|^{2}\mathrm{d}t} = \frac{\int t^2 e^{-2\pi t^2}\mathrm{dt}}{\int e^{-2\pi t^2}\mathrm{dt}}
$$
对于高斯积分，可以利用双重积分来计算，设$S = \int e^{-at^2} \mathrm{d}t$，则
$$
\begin{aligned}
    S^2 =& \Bigg( \int e^{-at^2} \mathrm{d}t \Bigg)^2 = \Bigg( \int e^{-au^2} \mathrm{d}u \Bigg) \cdot \Bigg( \int e^{-av^2} \mathrm{d}v \Bigg) \\
    =& \iint_{\mathbb{R}^2} e^{-a(u^2+v^2)}\mathrm{d}u\mathrm{d}v
    \xlongequal[\mathrm{d}u\mathrm{d}v = r\mathrm{d}r\mathrm{d}\theta]{
        \begin{cases}
            u = r\cos\theta \\
            v = r\sin\theta
        \end{cases}
    } \int_0^{2\pi} \int_0^{+\infty} re^{-ar^2} \mathrm{d}r\mathrm{d}\theta \\
    =& \int_0^{2\pi}\mathrm{d}\theta \int_0^{+\infty} re^{-ar^2} \mathrm{d}r \\
    =& \pi \int_0^{+\infty}e^{-ar^2}\mathrm{d}(r^2) \\
    =& \pi \Big[ -\frac{e^{-ar^2}}{a} \Big]_0^{+\infty} = \frac{\pi}{a}
\end{aligned} \\
\therefore S = \int e^{-at^2} \mathrm{d}t = \sqrt{\frac{\pi}{a}}
$$
同时设$T = \int t^2 e^{-at^2} \mathrm{d}t$，则有
$$
\begin{aligned}
    T^2 =& \Bigg( \int t^2 e^{-at^2} \mathrm{d}t \Bigg)^2 = \Bigg( \int u^2 e^{-au^2} \mathrm{d}u \Bigg) \cdot \Bigg( \int v^2 e^{-av^2} \mathrm{d}v \Bigg) \\
    =& \iint_{\mathbb{R}^2} (uv)^2 e^{-a(u^2 + v^2)} \mathrm{d}u\mathrm{d}v
    \xlongequal[\mathrm{d}u\mathrm{d}v = r\mathrm{d}r\mathrm{d}\theta]{
        \begin{cases}
            u = r\cos\theta \\
            v = r\sin\theta
        \end{cases}
    } \iint_{\mathbb{R}^2} \big( r^2 \sin\theta \cos\theta \big)^2 e^{-ar^2} r\mathrm{d}r\mathrm{d}\theta \\
    =& \int_0^{2\pi} \sin^2\theta\cos^2\theta \mathrm{d}\theta \cdot \int_0^{+\infty} r^5 e^{-ar^2}\mathrm{d}r \\
    =& \Bigg(\frac{1}{4}\int_0^{2\pi} \sin^2(2\theta) \mathrm{d}\theta \Bigg) \Bigg(\frac{1}{2}\int_0^{+\infty} r^4 e^{-ar^2}\mathrm{d}(r^2) \Bigg) \\
    \xlongequal[x = r^2, \mathrm{d}x = \mathrm{d}(r^2)]{\varphi = 2\theta, \mathrm{d}\varphi=2\mathrm{d}\theta}& \Bigg( \frac{1}{8} \int_0^{4\pi} \sin^2\varphi \mathrm{d}\varphi \Bigg) \Bigg( \frac{1}{2}\int_0^{+\infty} x^2 e^{-a x}\mathrm{d}x \Bigg) \\
    =& \Bigg( \frac{1}{8} \int_0^{4\pi} \frac{1-\cos(2\varphi)}{2} \mathrm{d}\varphi \Bigg) \Bigg( -\frac{1}{2a}\int_0^{+\infty} x^2 \mathrm{d}(e^{-ax}) \Bigg) \\
    =& \frac{1}{8} \Bigg[ \frac{\varphi}{2}-\frac{\sin(2\varphi)}{4} \Bigg]_0^{4\pi} \Bigg( \frac{1}{a}\int_0^{+\infty} x e^{-ax}\mathrm{d}x \Bigg) \\
    =& \frac{\pi}{4}\cdot \Bigg( -\frac{1}{a^2}\int_0^{+\infty} x\mathrm{d}(e^{-ax}) \Bigg) = \frac{\pi}{4}\cdot\frac{1}{a^2}\int_0^{+\infty}e^{-ax}\mathrm{d}x \\
    =& \frac{\pi}{4}\cdot\frac{1}{a^2} \Bigg[ \frac{e^{-ax}}{a} \Bigg]_{+\infty}^0 = \frac{\pi}{4}\cdot\frac{1}{a^2}\cdot\frac{1}{a} = \frac{\pi}{4a^3}
\end{aligned} \\
\therefore T = \int t^2 e^{-at^2} \mathrm{d}t = \frac{\sqrt{\pi}}{2a^{3/2}}
$$
经过上面的计算可知
当 $a=2\pi$ 时，$S = \dfrac{1}{\sqrt{2}}, T = \dfrac{\sqrt{2}}{8\pi}$，
$$
\therefore \sigma_t^2 = \frac{\int t^2 e^{-2\pi t^2}\mathrm{dt}}{\int e^{-2\pi t^2}\mathrm{dt}} = \frac{1}{4\pi} \,\text{即}\,\sigma_t = \frac{1}{2\sqrt{\pi}}
$$
同理可得 $\sigma_f = \dfrac{1}{2\sqrt{\pi}}$，所以
$$
\sigma_t\sigma_f = \frac{1}{4\pi}, \, \sigma_t^2\sigma_f^2 = \frac{1}{16\pi^2}
$$
可见，窗函数选取高斯函数时，它可以达到测不准原理的下界，因此认为高斯函数是同时兼顾时域与频域的最优窗函数。

::: important 傅立叶变换的不确定性原理

$$
\sigma_t^2\sigma_f^2 \geq \frac{1}{16\pi^2},\,\text{即}\,\Bigg( \int_{-\infty}^{+\infty} t^2|f(t)|^2 \mathrm{dt} \Bigg) \Bigg( \int_{-\infty}^{+\infty} \omega^2|\hat{f}(\omega)|^2 \mathrm{d\omega} \Bigg) \geq \frac{1}{16\pi^2}
$$

:::

## Wavelets (brief introduction)

Wavelets，即小波分析，是傅立叶变换的延伸。它基于一个朴素的想法：低频信号随时间变化较慢，因而对时间的精度要求低。利用这一点，小波分析可以比经典傅立叶变换更精确全面地分析信号。

首先定义母小波 (Mother Wavelet) $\psi(t)$，则可以定义以下的含参形式：
$$
\psi_{a,b}(t) = \frac{1}{\sqrt{a}}\psi(\frac{t-b}{a})
$$
::: tip 参数$a$用于提高或降低信号层级（用以分离高低频信号）；参数$b$用于平移信号波，将母小波函数作为窗口左右滑动，分析信号。
:::
::: important 定义母小波时需要保证每一基向量$\psi_{a,b}$彼此之间是正交的。
:::
那么可以用小波变换来对信号$f(t)$进行分析：
$$
\mathcal{W}[f](a,b) = \langle f(t), \psi_{a,b}(t) \rangle
$$

::: note 母小波的类型

1. Haar
2. Davbechies
3. Mexizan Hat
4. Coiflet
5. ……

:::

## FFT on n-D

通常傅立叶变换处理的函数是一元函数，即函数 $f$ 定义在 $\mathbb{R}$ 上。如果函数 $f$ 定义在 $\mathbb{R}^n$ 上，傅立叶变换的计算方法应为：
$$
\mathcal{F}_{\mathbb{R}^n}[f] (\xi) = \int_{\mathbb{R}^n} f(x) e^{-i\omega x} \mathrm{d}\xi
$$
其中 $\xi = [x_1, x_2, \dotsc, x_n]^T$，$x$ 是 $\xi$ 的分量，且各分量相互独立。这种计算表示对 $\xi$ 的每一个分量依次进行傅立叶变换，具体展开可用符号表示如下：
$$
\mathcal{F}_1 \circ \mathcal{F}_2 \circ \dotsm \circ \mathcal{F}_n\{f(\xi)\}, \,\text{其中}\, \mathcal{F}_j\{f(\xi)\} = \int_{-\infty}^{+\infty} f(x_j)e^{-i\omega_j x_j}\mathrm{d}x_j
$$
变换后得到傅立叶系数 $\hat{f}(\hat{\xi})$，其中 $\hat{\xi} = [ \omega_1, \omega_2, \dotsc, \omega_n ]^T$。

::: tip 观察积分表达式显然可知，对各分量进行傅立叶变换的先后顺序不影响结果（积分运算保证）。
:::

特别地，当 $n = 2$ 时，有
$$
\mathcal{F}_{\mathbb{R}^2}[f](u, v) = \int_{-\infty}^{+\infty} \Bigg[ \int_{-\infty}^{+\infty} f(u, v) e^{-i\omega_u u} \mathrm{d}u \Bigg] e^{-i\omega_v v} \mathrm{d}v = \int_{-\infty}^{+\infty} \hat{f}(\omega_u, v) e^{-i\omega_v v} \mathrm{d}v = \hat{f}(\omega_u, \omega_v)
$$

这种情况在计算机中，通常用于对灰度图像或者彩色图像每一个通道上的灰度图进行傅立叶变换。

当 $n = 3$ 时，有
$$
\begin{aligned}
    \mathcal{F}_{\mathbb{R}^3}[f](x, y, z) &= \int_{-\infty}^{+\infty} \Bigg\{ \int_{-\infty}^{+\infty} \Big[ \int_{-\infty}^{+\infty} f(x, y, z) e^{-i\omega_x x} \mathrm{d}x \Big] e^{-i\omega_y y} \mathrm{d}y \Bigg\} e^{-i\omega_z z} \mathrm{d}z \\
    &= \int_{-\infty}^{+\infty} \Bigg[ \int_{-\infty}^{+\infty} \hat{f}(\omega_x, y, z) e^{-i\omega_y y} \mathrm{d}y \Bigg] e^{-i\omega_z z} \mathrm{d}z \\
    &= \int_{-\infty}^{+\infty} \hat{f}(\omega_x, \omega_y, z) e^{-i\omega_z z} \mathrm{d}z \\
    &= \hat{f}(\omega_x, \omega_y, \omega_z)
\end{aligned}
$$

这种情况在计算机中，通常用于处理具有三维空间结构的数据（如 CT 扫描的体素数据等）或有时间序列的二维空间结构的数据（如视频等）。

## Laplace Transform

由于傅里叶变换要求函数在无穷远处衰减为$0$，即$f\in \Big( L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n) \Big)$，对于一些性质不是很好的函数就无法使用傅立叶变换，为了也能够处理这样的函数，一般使用拉普拉斯变换。
对于函数$f(t)$，构造函数$F(t)$：
$$
F(t) = f(t)e^{-\gamma t}H(t), \text{其中}\, \gamma\,\text{为足够大的常数}
$$
Heaviside 函数$H(t)$有如下定义：
$$
H(t) =
\begin{cases}
    0 & t<0 \\
    1 & t\geq0
\end{cases}
$$
这时对函数$F(t)$进行傅立叶变换：
$$
\begin{aligned}
    \hat{F}(\omega) =& \int_{-\infty}^{+\infty} F(t) e^{-i\omega t}\mathrm{dt} \\
    =& \int_0^{+\infty} f(t)e^{-\gamma t} \cdot e^{-i\omega t} \mathrm{dt} \\
    =& \int_0^{+\infty} f(t)e^{-(\gamma+i\omega) t}\mathrel{dt} \\
    \xlongequal{s\coloneqq \gamma+i\omega}& \int_0^{+\infty} f(t)e^{-st}\mathrel{dt} \\
    =& \overline{f}(s)
\end{aligned}
$$
其中$s$被称作拉普拉斯变量 (Laplace Variable)，
$$
s = \gamma + i\omega \Rightarrow \mathrm{ds} = i\mathrm{d\omega} \Rightarrow \mathrm{d\omega}=\frac{1}{i}\mathrm{ds}
$$
对于逆变换，作如下推导：
$$
\because F(t) = f(t)e^{-\gamma t} \Rightarrow f(t) = e^{\gamma t}F(t)\quad(t\geq 0)\\
\begin{aligned}
    f(t) &= e^{\gamma t}\cdot\frac{1}{2\pi}\int_{-\infty}^{+\infty} \hat{F}(\omega)e^{i\omega t}\mathrm{d\omega} \\
    &= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \overline{f}(s) e^{(\gamma+i\omega)t} \mathrm{d\omega} \\
    &= \frac{1}{2\pi i} \int_{\gamma-i\infty}^{\gamma+i\infty} \overline{f}(s) e^{st} \mathrm{ds}
\end{aligned}
$$

综上所述，得到拉普拉斯变换对：
$$
\left\{
\begin{aligned}
    \overline{f}(s) &= \int_0^{+\infty}f(t)e^{-st}\mathrm{dt} \\
    f(t) &= \frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty} \overline{f}(s) e^{st} \mathrm{ds}
\end{aligned}
\right.
$$
更常见的写法是：
$$
\left\{
\begin{aligned}
    \mathcal{L} \Big( f(t) \Big) &= \int_0^{+\infty}f(t)e^{-st}\mathrm{dt} \\
    \mathcal{L}^{-1} \Big(\overline{f}(s) \Big) &= \frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty} \overline{f}(s) e^{st} \mathrm{ds}
\end{aligned}
\right.
$$

::: tip Laplace 变换是一种加权的单边傅里叶变换。
:::

::: important Laplace 变换的条件

Laplace 变换要求广义积分$\int_0^{+\infty}f(t)e^{-st}\mathrm{d}t$存在且收敛，满足这个要求的几类函数如下：

1. **分段连续条件**：函数 $f(t)$ 在 $t \geq 0$ 的每个有限区间内必须是分段连续的，即在任意区间 $[a, b]$ 上，$f(t)$至多有有限个不连续点，而且每个不连续点的跳跃值有限。
2. **指数阶条件**：$\exist\,M>0,\alpha\in\mathbb{R}, T \geq 0, \forall t > T$ 使得 $|f(t)|\leq Me^{\alpha t}$，此时称函数 $f(t)$ 是指数阶为 $\alpha$ 的函数，当 $\Re(s) = \mathrm{Re}(s) > \alpha$ 时，拉普拉斯积分绝对收敛。
3. **绝对可积性条件**：对于 $\int_0^{+\infty} |f(t)e^{-st}|\mathrm{d}t = \int_0^{+\infty} |f(t)|e^{-\Re(s)t}\mathrm{d}t$，如果 $ \exist\, \lambda$ 使得 $\Re(s) > \lambda$ 时积分收敛

> **注意**：以上条件均为充分不必要条件，目前没有充要条件可以简洁描述函数的性质。

:::

::: info 双边 Laplace 变换

更广义地，对于定义于整个实轴上的实值函数或复值函数 $f(t)$，其双边拉普拉斯变换为
$$
\mathcal{B}[f] (s)=\int_{-\infty}^{+\infty} f(t)e^{-st} \mathrm {d}t
$$

:::

## Laplace 变换的性质

### Laplace 线性变换

$\mathcal{L}(\cdot)$是一种线性变换，要证明这一点，我们只需要证明它满足**可加性**和**一次齐次性**即可：

$\forall f_a, f_b \in \Big(L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n)\Big)$，有：

$$
\begin{aligned}
    \mathcal{L}(f_a + f_b) &= \int_0^{+\infty} (f_a + f_b) e^{-st}\mathrm{d}t \\
    &= \int_0^{+\infty} f_a e^{-st} + f_b e^{-st}\mathrm{d}t \\
    &= \int_0^{+\infty} f_a e^{-st}\mathrm{d}t + \int_0^{+\infty} f_b e^{-st}\mathrm{d}t \\
    &= \mathcal{L}(f_a) + \mathcal{L}(f_b)
\end{aligned}
$$

$\therefore \mathcal{L}(\cdot)$满足可加性。

---

$\forall f \in \Big(L^1(\mathbb{R}^n) \cup L^2(\mathbb{R}^n)\Big),\forall\lambda\in\mathbb{R}$，有：

$$
\begin{aligned}
    \mathcal{L}(\lambda f) &= \int_0^{+\infty} \lambda f \cdot e^{-st}\mathrm{d}t \\
    &= \lambda \int_0^{+\infty} f \cdot e^{-st}\mathrm{d}t \\
    &= \lambda \mathcal{L}(f)
\end{aligned}
$$

$\therefore \mathcal{L}(\cdot)$满足一次齐次性。

综上所述，$\mathcal{L}(\cdot)$是一种线性变换。

### 导函数的 Laplace 变换

$$
\begin{aligned}
    \mathcal{L}\Big( \mathrm{\frac{d}{dt}}f \Big) &= \int_0^{+\infty}\frac{d}{dt}f \cdot e^{-st}\mathrm{dt} \\
    &= \int_0^{+\infty} e^{-st}\mathrm{d}f \\
    &= \Bigg[ f(t)e^{-st} \Bigg]_{0}^{+\infty} + s\int_{0}^{+\infty}f(t)e^{-st}\mathrm{dt} \\
    &= -f(0) + s\overline{f}(s) \\
    \therefore \mathcal{L}\Big( &\mathrm{\frac{d}{dt}}f \Big) = -f(0) + s\overline{f}(s)
\end{aligned}
$$
同理，也可计算得：
$$
\mathcal{L}\Big( \mathrm{\frac{d^2}{dt^2}}f \Big) = -sf(0) - f^\prime(0) + s^2\overline{f}(s)
$$

那么对于 $n$ 阶可导的函数 $f(t)$，对其 $n$ 阶导函数 $\Big( \dfrac{\mathrm{d}}{\mathrm{d}t} \Big)^n f$ 进行拉普拉斯变换可得：
$$
\mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^n f \Big] = s^n\overline{f}(s) - \sum_{k=0}^{n-1} s^k f^{(n-1-k)}(0) = s^n \int_0^{+\infty}f(t)e^{-st}\mathrm{d}t - \sum_{k=0}^{n-1} s^k \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^{n-1-k}f(0)
$$

证明：

注意到这样的递推关系：
$$
\begin{aligned}
    \mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^n f \Big] &= \int_0^{+\infty} \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^n f e^{-st}\mathrm{d}t = \int_0^{+\infty} e^{-st}\mathrm{d}\Big[ \frac{\mathrm{d}^{n-1}f}{\mathrm{d}t^{n-1}} \Big] \\
    &= \Bigg[ \frac{\mathrm{d}^{n-1}f}{\mathrm{d}t^{n-1}} \cdot e^{-st} \Bigg]_0^{+\infty} + s\int_0^{+\infty}\frac{\mathrm{d}^{n-1}f}{\mathrm{d}t^{n-1}} e^{-st} \mathrm{d}t \\
    &= s \mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^{n-1} f \Big] - f^{(n-1)}(0)
\end{aligned}
$$
根据数学归纳法，当 $n = 1$ 时，有下列等式成立
$$
\mathcal{L}\Big(\frac{\mathrm{d}f}{\mathrm{d}t}\Big) = s\overline{f}(s) - f(0)
$$
假设 $n = \lambda \geq 1$ 时，下式成立：
$$
\mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^\lambda f \Big] = s^\lambda\overline{f}(s) - \sum_{k=0}^{\lambda-1} s^k f^{(\lambda-1-k)}(0)
$$
当 $n = \lambda+1$时，
$$
\begin{aligned}
    \mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^{\lambda+1} f \Big] =& s^{\lambda+1}\overline{f}(s) - \sum_{k=0}^{(\lambda+1)-1} s^k f^{((\lambda+1)-1-k)}(0) = s^{\lambda+1}\overline{f}(s) - \sum_{k=0}^{\lambda} s^k f^{(\lambda-k)}(0) \\
    =& s^{\lambda+1}\overline{f}(s) - f^{(\lambda)}(0) - \sum_{k=1}^{\lambda} s^k f^{(\lambda-k)}(0) \\
    \xlongequal{c=k-1}& s^{\lambda+1}\overline{f}(s) - f^{(\lambda)}(0) - s\sum_{c=0}^{\lambda-1} s^c f^{(\lambda-1-c)}(0) \\
    =& s\cdot \Bigg( s^\lambda\overline{f}(s) - \sum_{c=0}^{\lambda-1} s^c f^{(\lambda-1-c)}(0) \Bigg) - f^{(\lambda)}(0) \\
    =& s\cdot \mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^\lambda f \Big] - f^{(\lambda)}(0) \,\text{即}\, n = \lambda + 1 \,\text{成立。}
\end{aligned}
$$
$$
\therefore\,\text{综上所述}\,, \mathcal{L}\Big[ \Big( \frac{\mathrm{d}}{\mathrm{d}t} \Big)^n f \Big] = s^n\overline{f}(s) - \sum_{k=0}^{n-1} s^k f^{(n-1-k)}(0)
$$

### 卷积的 Laplace 变换

$$
\mathcal{L}[f\star g] (t) = \mathcal{L}[f](t) \cdot \mathcal{L}[g](t) = \overline{f}(s)\cdot\overline{g}(s)
$$

证明：

**单边 Laplace 变换的情况下**，即
$$
\mathcal{L}[f] = \int_0^{+\infty} f(t) e^{-st} \mathrm{d}t
$$
设 $f(t), g(t)$ 是因果信号，即当 $t < 0$ 时，$f(t) = 0, g(t) = 0$。此时卷积退化为以下形式：
$$
(f\star g)(t) = \int_0^t f(t-\tau)g(\tau) \mathrm{d}\tau
$$
对 $(f\star g)(t)$ 作 Laplace 变换，得：
$$
\begin{aligned}
    \mathcal{L}[f\star g] (t) =& \int_0^{+\infty} \Bigg[ \int_0^t f(t-\tau)g(\tau) \mathrm{d}\tau \Bigg] e^{-st} \mathrm{d}t \\
    \xlongequal{\text{交换}\,t,\tau\,\text{积分顺序}}& \int_0^{+\infty} \Bigg[ \int_\tau^{+\infty} f(t-\tau) e^{-st} \mathrm{d}t \Bigg] g(\tau) \mathrm{d}\tau \\
    \xlongequal[\mathrm{d}u = \mathrm{d}t]{u = t - \tau}& \int_0^{+\infty} \Bigg[ \int_0^{+\infty} f(u) e^{-s(u+\tau)} \mathrm{d}u \Bigg] g(\tau) \mathrm{d}\tau \\
    =& \Bigg( \int_0^{+\infty} f(u) e^{-su} \mathrm{d}u \Bigg) \Bigg( \int_0^{+\infty}  g(\tau)e^{-s\tau} \mathrm{d}\tau \Bigg) \\
    =& \mathcal{L}[f] (t)\cdot\mathcal{L}[g] (t) = \overline{f}(s)\cdot\overline{g}(s)
\end{aligned}
$$

**双边 Laplace 变换的情况下**，即
$$
\mathcal{B}[f] = \int_{-\infty}^{+\infty} f(t) e^{-st} \mathrm{d}t
$$

设 $\exist s \in \mathbb{C}$ 使得

- $\mathcal{B}[f]$ 的收敛域包含 $\Re(s) > \sigma_f$
- $\mathcal{B}[g]$ 的收敛域包含 $\Re(s) > \sigma_g$
- $\Re(s) > \max(\sigma_f, \sigma_g)$

其中 $\sigma_f, \sigma_g$ 分别是函数 $f, g$ 双边拉普拉斯变换的收敛横坐标。收敛横坐标是指使得积分收敛的最小实部值。

::: tip Laplace 变换收敛域问题

对于单边 Laplace 变换，一般采用以下步骤：

1. 计算拉普拉斯变换 $\mathcal{L}[f](s)$（通常通过积分或查表）。
2. 找出 $\mathcal{L}[f] (s)$ 的所有极点（使分母为零的 $s$ 值）。
3. $\mathrm{ROC}$ 是复平面上所有实部 $\Re(s)>\sigma_0$​ 的区域，其中 $\sigma_0$​ 是最右边的极点【 $\mathrm{ROC}$ 内不能包含任何极点 】。

对于双边 Laplace 变换，一般要这样计算：

1. 将 $f(t)$ 分为右边信号 $f_+(t)$ 和左边信号 $f_-(t)$，其中
   $$
   \begin{aligned}
        f_+(t) &= f(t)u(t) \\
        f_-(t) &= f(t)u(-t)
   \end{aligned}
   $$
2. 分别计算 $\mathcal{L}[f_+]$ 和 $\mathcal{L}[f_-]$ 的收敛域
   - 右边信号 $f_+$ 的 $\mathrm{ROC}$ 为 $\Re(s)>\sigma_+$
   - 左边信号 $f_-$ 的 $\mathrm{ROC}$ 为 $\Re(s)<\sigma_-$
3. 求两边信号收敛域的交集

> $u(t)$ 是单位阶跃函数，数学定义为：
> $$
u(t) = \begin{cases}
    0 & t < 0, \\
    1 & t \geq 0.
\end{cases}
$$

:::

同时积分换序合法（绝对可积）：
$$
\iint_{\mathbb{R}^2}| f(t-\tau)g(\tau) e^{-st} |\mathrm{d}t\mathrm{d}\tau < \infty
$$

对 $(f\star g)(t)$ 作 Laplace 变换，得：
$$
\begin{aligned}
    \mathcal{L}[f\star g] (t) =& \int_{-\infty}^{+\infty} \Bigg[ \int_{-\infty}^{+\infty} f(t-\tau)g(\tau) \mathrm{d}\tau \Bigg] e^{-st} \mathrm{d}t \\
    \xlongequal{\text{交换}\,t,\tau\,\text{积分顺序}}& \int_{-\infty}^{+\infty} \Bigg[ \int_{-\infty}^{+\infty} f(t-\tau) e^{-st} \mathrm{d}t \Bigg] g(\tau) \mathrm{d}\tau \\
    \xlongequal[\mathrm{d}u = \mathrm{d}t]{u = t - \tau}& \int_{-\infty}^{+\infty} \Bigg[ \int_{-\infty}^{+\infty} f(u) e^{-s(u+\tau)} \mathrm{d}u \Bigg] g(\tau) \mathrm{d}\tau \\
    =& \Bigg( \int_{-\infty}^{+\infty} f(u) e^{-su} \mathrm{d}u \Bigg) \Bigg( \int_{-\infty}^{+\infty}  g(\tau)e^{-s\tau} \mathrm{d}\tau \Bigg) \\
    =& \mathcal{L}[f] (t)\cdot\mathcal{L}[g] (t) = \overline{f}(s)\cdot\overline{g}(s)
\end{aligned}
$$
综上所述，
$$
\mathcal{L}[f\star g] (t) = \mathcal{L}[f] (t)\cdot\mathcal{L}[g] (t) = \overline{f}(s)\cdot\overline{g}(s)
$$
