---
title: 碎碎念
date: 2023-05-20 00:42:13
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - Mathematics
tag: 
 - Mathematics
---

::: details 参考资料

1. [数学分析理论基础11：无穷小量与无穷大量 - 简书](https://www.jianshu.com/p/cd925ebdd2b2)
2. [高等数学高阶无穷小量中o(1)表示什么？ - 知乎](https://www.zhihu.com/question/26404948)
3. [数学分析（10）第八章 反常积分 - 知乎](https://zhuanlan.zhihu.com/p/342471635)
4. [[数学分析]反常积分判敛法 - 知乎](https://zhuanlan.zhihu.com/p/493001732)
5. [数学篇18-反常积分的审敛法（一定要熟练掌握） - 知乎](https://zhuanlan.zhihu.com/p/353396396)
6. [反常积分敛散性判别的万能公式 - 知乎](https://zhuanlan.zhihu.com/p/411898293)
7. [反常积分收敛的极端情形 - 知乎](https://zhuanlan.zhihu.com/p/559189773)
8. [A-D判别法 - 知乎](https://zhuanlan.zhihu.com/p/162972708)
9. [第一类反常积分收敛，则被积函数一定趋于0？ - Bilibili](https://www.bilibili.com/video/BV1ke4y1e7mh/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=e9e9499e9ac0aecac6794a1ecc2e2f4a)
10. [ln(1+x)和ln(1-x)的麦克劳林级数 -CSDN](https://blog.csdn.net/rgbhi/article/details/120844430)
11. [伽马函数（概率论与数理统计） - 知乎](https://zhuanlan.zhihu.com/p/584422956)
12. [考研中的伽马函数](https://shiraha.cn/2021/gamma-function-in-kaoyan/)
13. [如何通俗的理解伽马(gamma)函数 - 知乎](https://zhuanlan.zhihu.com/p/147583667)
14. [Γ函数 - Wiki](https://zh.wikipedia.org/zh-cn/%CE%93%E5%87%BD%E6%95%B0)
15. [Gamma函数入门指北——完全抛开积分定义理解Gamma函数 - Bilibili](https://www.bilibili.com/video/BV1cT411H7Hp/?share_source=copy_web&vd_source=2f006da37bcfa74648db50269d197857)
16. [如何求证：无穷级数∑1/i²=π²/6，求方法？](https://www.zhihu.com/question/50940968)
17. [巴塞尔问题(Basel problem)的多种解法](https://www.cnblogs.com/misaka01034/p/BaselProof.html#title02)
18. [Wallis公式及其应用 -CSDN](https://blog.csdn.net/ACdreamers/article/details/41451591)
19. [欧拉-马斯刻若尼常数 - Wiki](https://zh.wikipedia.org/zh-cn/%E6%AD%90%E6%8B%89-%E9%A6%AC%E6%96%AF%E5%88%BB%E8%8B%A5%E5%B0%BC%E5%B8%B8%E6%95%B8)
20. [三角恒等式 - Wiki](https://zh.wikipedia.org/zh-cn/%E4%B8%89%E8%A7%92%E6%81%92%E7%AD%89%E5%BC%8F)
21. [单调收敛定理 - Wiki](https://zh.wikipedia.org/wiki/%E5%8D%95%E8%B0%83%E6%94%B6%E6%95%9B%E5%AE%9A%E7%90%86)
22. [如何证明通项为（n²+1）/n²的数列的前n项乘积小于2（n≥2）？ - 知乎](https://www.zhihu.com/question/463177983/answer/1938305418)
23. [双曲正弦函数 - 百度百科](https://baike.baidu.com/item/%E5%8F%8C%E6%9B%B2%E6%AD%A3%E5%BC%A6%E5%87%BD%E6%95%B0/4395524)
24. [双曲函数 - Wiki](https://zh.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E5%87%BD%E6%95%B0)
25. [欧拉公式 - Wiki](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89%E5%85%AC%E5%BC%8F)
26. [等比数列 - Wiki](https://zh.wikipedia.org/wiki/%E7%AD%89%E6%AF%94%E6%95%B0%E5%88%97)
27. [Infinite product formula for sin(x) - Youtube](https://www.youtube.com/watch?v=qWxfpQ2wwto)
28. [Euler’s Nonstandard Nonsense](https://cornellmath.wordpress.com/2007/07/13/eulers-nonstandard-nonsense/)
29. [LDA-math - 神奇的 Gamma 函数](https://cosx.org/2013/01/lda-math-gamma-function/)
30. [Γ 函数 - 香蕉空间](https://www.bananaspace.org/wiki/Gamma_%E5%87%BD%E6%95%B0)
31. [沃利斯乘积 - Wiki](https://zh.wikipedia.org/wiki/%E6%B2%83%E5%88%A9%E6%96%AF%E4%B9%98%E7%A7%AF)
32. 

:::

## 颠覆认知的一个问题

讨论积分$\int_{0}^{\infty}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x\;(p>0)$的收敛性。

$$
\int_{0}^{+\infty}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x = \int_{0}^{1}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x + \int_{1}^{+\infty}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x
$$

当$x\to0^+$时，

$$
\frac{\ln(1+x^2)}{x^p}\sim \frac{x^2}{x^p} = \frac{1}{x^{p-2}}
$$

所以当$p-2<1\Rightarrow p<3$时，瑕积分$\int_{0}^{1}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x$收敛；

当$x\to+\infty$时

$$
\frac{\ln(1+x^2)}{x^p}\sim 2\frac{\ln x}{x^p} \\
\lim_{x\to+\infty}2\frac{\ln x}{x^p} = \frac{2}{px^p} \text{（应用洛必达法则）}
$$

所以当$p>1$时，反常积分$\int_{1}^{+\infty}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x$收敛。

当且仅当瑕积分和反常积分都收敛时，原积分才收敛，故

当$1<p<3$时，积分$\int_{0}^{+\infty}\frac{\ln(1+x^2)}{x^p}\mathrm{d}x$收敛。

::: tip

此题所用的是比较原理、比较审敛法和极限审敛法的结合，而非推断反常积分收敛性与被积函数收敛性的关系，经过论证发现：反常积分收敛不能推出被积函数收敛，而被积函数收敛也不能推出反常积分收敛。前者与后者是既不充分也不必要条件。

:::

***

应用洛必达法则这一步看似简单，当初我确实是怎么都没想到，我原本的做法是用了以下结论：

> 反常积分标准型：
> $$
\int_{C}^{+\infty}\frac{1}{x^p\ln^qx}\mathrm{d}x
> $$
>
> 当$p>1,\forall q \in R$或$p=1\text{且}q>1$，该反常积分收敛。
>
> 当$p<1,\forall q \in R$或$p=1\text{且}q\leq1$，该反常积分发散。

于是我搜索过网上许多资料，但没有找到这个结论的证明，于是我就尝试证明了这个结论：

> 应用知识点：
> 1. 比较审敛法
> 2. 极限审敛法

$$
\int_{C}^{+\infty}\frac{1}{x^p\ln^qx}\mathrm{d}x \xlongequal[\mathrm{d}x=e^u\mathrm{d}u]{u=\ln x,\, x=e^u} \int_{\ln C}^{+\infty}\frac{1}{e^{(p-1)u}u^q}\mathrm{d}u
$$
$p=1$时，
$$
\text{原式}=\int_{\ln C}^{+\infty}\frac{1}{u^q}\mathrm{d}u \Rightarrow
\begin{cases}
    q \leq 1 \Rightarrow \text{反常积分发散} \\
    \\
    q > 1 \Rightarrow \text{反常积分收敛}
\end{cases}
$$
$p\neq1$时，
$$
\lim_{x\to+\infty}u^q\cdot\frac{1}{e^{(p-1)u}u^q} = \frac{1}{e^{(p-1)u}} \Rightarrow
\begin{cases}
    p > 1 \Rightarrow \text{反常积分收敛} \\
    \\
    p < 1 \Rightarrow \text{反常积分发散}
\end{cases}
$$
至此证毕。

::: tip 瑕积分标准型

类似反常积分标准型，有以下标准型
$$
\int_{0}^{C}\frac{1}{x^p\ln^qx}\mathrm{d}x
$$
当$p<1,\forall q \in R$或$p=1\text{且}q>1$，该反常积分收敛。

当$p>1,\forall q \in R$或$p=1\text{且}q\leq1$，该反常积分发散。

证明方法与上面类似，有：
$$
\int_{0}^{C}\frac{1}{x^p\ln^qx}\mathrm{d}x \xlongequal[\mathrm{d}x=e^u\mathrm{d}u]{u=\ln x,\, x=e^u} \int_{-\infty}^{\ln C}\frac{1}{e^{(p-1)u}u^q}\mathrm{d}u
$$
$p=1$时，
$$
\text{原式}=\int_{-\infty}^{\ln C}\frac{1}{u^q}\mathrm{d}u \Rightarrow
\begin{cases}
    q \leq 1 \Rightarrow \text{反常积分发散} \\
    \\
    q > 1 \Rightarrow \text{反常积分收敛}
\end{cases}
$$
$p\neq1$时，
$$
\lim_{x\to+\infty}u^q\cdot\frac{1}{e^{(p-1)u}u^q} = \frac{1}{e^{(p-1)u}} = e^{(1-p)u} \Rightarrow
\begin{cases}
    p > 1 \Rightarrow \text{反常积分发散} \\
    \\
    p < 1 \Rightarrow \text{反常积分收敛}
\end{cases}
$$
至此证毕。

:::

那么这个问题是什么颠覆了我的认知呢？

::: warning 高能

$$
\int_{1}^{+\infty} \frac{\ln(1+x^2)}{x^p} \sim \int_{1}^{+\infty} \frac{2\ln x}{x^p} \\
\text{设}\lim_{x\to+\infty}\frac{\ln x}{x^\lambda}=0, \lambda > 0 \\
\text{当}p>1\text{时},\text{不妨取}\lambda = \frac{p-1}{2} > 0 \\
\begin{align*}
\therefore \frac{\ln x}{x^p} &= \Big(\frac{\ln x}{x^\lambda}\Big)\cdot\frac{x^\lambda}{x^p} \\
&= \Big(\frac{\ln x}{x^\lambda}\Big)\cdot\cfrac{1}{x^{ \frac{p+1}{2} }} \\
&\leq \cfrac{\mathcal{M}}{x^{ \frac{p+1}{2} }},\quad \mathcal{M} > 0.
\end{align*} \\
\therefore \text{该反常积分收敛。}
$$

以上这些说明了一件事：

对于$\frac{1}{x^p}$，令其与$\ln x$相乘，这一过程等效于令$\frac{1}{x^p}$与一个常数$\mathcal{M}$相乘。

显然容易推知，当$p\geq q$时，该过程都是相当于与常数相乘。

在此之前我对$\ln x$的认知一直都是以下的泰勒展开形式：
$$
\ln (1 + x) = \sum_{n=1}^{n}\frac{(-1)^{n-1}x^n}{n} + o(x^n)
$$

现在看来其实我那时候认知尚浅，没有注意到这个不等式恒成立：
$$
x - \ln x > 0 \; (x > 0)
$$

也就是说$\ln x$的等效数量级连$1$都没有。

:::

## 反常积分的收敛性与被积函数的收敛性之间的关系

::: danger 结论

两者之间不存在必然关系，反常积分收敛是其被积函数收敛的既不充分也不必要条件。

:::

假设反常积分收敛是其被积函数收敛的充分条件，即反常积分收敛$\Rightarrow$被积函数收敛：

令$f(x) = x\sin(x^4)$，则
$$
\int_{C}^{+\infty}f(x)\mathrm{d}x = \int_{C}^{+\infty}x\sin(x^4)\mathrm{d}x \xlongequal[\mathrm{d}x = \frac{1}{4}t^{-\frac{3}{4}}]{t=x^4, x = t^{\frac{1}{4}}} \frac{1}{4}\int_{C^4}^{+\infty}\frac{\sin t}{\sqrt{t}}\mathrm{d}t
$$

根据$g(x) = \int_{C^4}^{x}\sin t\mathrm{d}t$有界，$h(x) = \frac{1}{\sqrt{x}}$在$[C^4,+\infty)$上单调递减，且$\lim_{x\to+\infty}h(x) = 0$，由Dirichlet判别法可知反常积分$\int_{C^4}^{+\infty}g(x)h(x)\mathrm{d}x = \int_{C^4}^{+\infty}\frac{\sin t}{\sqrt{t}}\mathrm{d}t$收敛，所以反常积分$\int_{C}^{+\infty}x\sin(x^4)\mathrm{d}x$收敛，但显然$\lim_{x\to+\infty}f(x) = \lim_{x\to+\infty} x\sin(x^4) = +\infty$，该被积函数发散，与假设矛盾，故假设不成立。

::: info 其他情形

设$f(x)$在$[1, +\infty)$上如下定义：
$$
f(x) = 
\begin{cases}
    n + 1 & x\in \Big[ n, n + \frac{1}{n(n+1)^2} \Big] \\
    0 & x\in \Big( n + \frac{1}{n(n+1)^2}, n + 1 \Big)
\end{cases},\quad n\in \mathbb{Z}^+
$$

则$\forall A>1$，总$\exist n$使得$A\in[n, n + 1)$，又因为$f(x)\geq 0$，故有
$$
\int_{1}^{n} f(x)\mathrm{d}x \leq \int_{1}^{A} f(x)\mathrm{d}x  \leq \int_{1}^{n+1} f(x)\mathrm{d}x
$$

当$n\to +\infty$时，有
$$
\begin{align*}
\lim_{n\to+\infty}\int_{1}^{n} f(x)\mathrm{d}x 
&= \lim_{n\to+\infty} \sum_{\lambda=2}^{n}\Bigg[ \int_{\lambda-1}^{\lambda}f(x)\mathrm{d}x \Bigg] \\
&= \lim_{n\to+\infty} \sum_{\lambda=2}^{n}\Bigg[ \int_{\lambda-1}^{\lambda-1 + \frac{1}{\lambda^2(\lambda-1)}}f(x)\mathrm{d}x \Bigg] \\
&= \lim_{n\to+\infty} \sum_{\lambda=2}^{n}\Bigg[ \lambda\cdot\frac{1}{\lambda^2(\lambda-1)} \Bigg] = \lim_{n\to+\infty} \sum_{\lambda=2}^{n}\Bigg( \frac{1}{\lambda-1} - \frac{1}{\lambda} \Bigg) \\
&= \lim_{n\to+\infty} 1 - \frac{1}{n} = 1
\end{align*}
$$

而显然有
$$
\lim_{n\to+\infty}\int_{1}^{n} f(x)\mathrm{d}x = \lim_{n\to+\infty}\int_{1}^{n+1} f(x)\mathrm{d}x
$$

所以根据夹逼准则可得
$$
\int_{1}^{+\infty} f(x)\mathrm{d}x = \lim_{A\to+\infty}\int_{1}^{A} f(x)\mathrm{d}x = 1
$$
但极限$\lim_{x\to+\infty}f(x)$不存在（在$0$和$n+1$之间震荡）。

:::

假设反常积分收敛是其被积函数收敛的必要条件，即被积函数收敛$\Rightarrow$反常积分收敛：

令$f(x) = \frac{1}{x}$，则有$\lim_{x\to\infty}f(x) = 0$，而
$$
\int_{C}^{+\infty}\frac{1}{x} \mathrm{d}x = \ln x \Bigg|_{C}^{+\infty} = \lim_{x\to +\infty}\ln x - \ln C = +\infty
$$
显然该反常积分发散，与假设矛盾，故假设不成立。

> 令$f(x) = C,\; C\in R$，也容易得出与假设矛盾的结果。

## 证明$\prod_{n=2}^{\infty}\frac{n^2 + 1}{n^2} < 2$

看到连乘，一般采取的做法是将其转化为求和，因此需要使用一次对数变换，有：
$$
\ln\Bigg(\prod_{n=2}^{\infty}\frac{n^2 + 1}{n^2}\Bigg) = \sum_{n=2}^{\infty}\ln\Big( 1 + \frac{1}{n^2} \Big)
$$

设$f(x) = x - \ln(x+1)\quad (x > -1)$，则有$f^{\prime}(x) = 1 - \frac{1}{x+1}$。

令$f^{\prime}(x)>0$，则$x>0$，令$f^{\prime}(x)<0$，则$-1<x<0$。

故$f_{\min}(x) = f(0) = 0$，由此可得：
$$
x \geq \ln(x+1) \text{在}(-1, +\infty)\text{上恒成立，且仅当}x=0\text{时取得等号}
$$

所以有：
$$
\ln\Bigg(\prod_{n=2}^{\infty}\frac{n^2 + 1}{n^2}\Bigg) = \sum_{n=2}^{\infty}\ln\Big( 1 + \frac{1}{n^2} \Big) < \sum_{n=2}^{\infty}\Big(\frac{1}{n^2} \Big) = \frac{\pi^2}{6} - 1 < 2
$$
至此证毕。

## 无穷级数$\sum_{n=1}^{\infty}\frac{1}{n^2}$求值

观摩学习过后，现在我也会利用现有的高数知识来求这个级数了。

已知该恒等式
$$
\frac{1}{n} = \int_{0}^{1}x^{n-1}\mathrm{d}x
$$

易得
$$
\frac{1}{n^2} = \int_{0}^{1}\int_{0}^{1}x^{n-1}y^{n-1}\mathrm{d}x\mathrm{d}y = \iint_Dx^{n-1}y^{n-1}\mathrm{d}x\mathrm{d}y \\ 
\text{其中}D\text{是由}(0,0),(1,0),(0,1),(1,1)\text{四点确定的正方形区域}
$$

根据重积分的线性可推知
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \sum_{n=1}^{\infty} \Bigg( \iint_Dx^{n-1}y^{n-1}\mathrm{d}x\mathrm{d}y \Bigg) = \iint_D \Bigg[ \sum_{n=1}^{\infty} (xy)^{n-1} \Bigg]\mathrm{d}x\mathrm{d}y
$$

注意到等比数列求和，有
$$
0 < x < 1, 0 < y < 1 \Rightarrow 0 < xy < 1 \\
\sum_{n=1}^{\infty} (xy)^{n-1} = \lim_{n\to\infty} \frac{1-(xy)^{n-1}}{1-xy} = \frac{1}{1-xy}
$$

所以
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \iint_D\frac{1}{1-xy}\mathrm{d}x\mathrm{d}y
$$

令$(u, v) = (\frac{x+y}{2}, \frac{y-x}{2})$即$(x, y) = (u-v, u+v)$，则有新区域$D^*$，该区域是由$(0,0),(\frac{1}{2},\frac{1}{2}),(1,0),(\frac{1}{2},-\frac{1}{2})$四点确定的正方形区域，则可知
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = 2\iint_{D^*}\frac{1}{1-u^2+v^2}\mathrm{d}u\mathrm{d}v
$$

::: tip

重积分前的系数2是由两区域面积之比$\frac{S_D}{S_{D^*}}$得到的。

:::

由正方形的对称性可得
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = 4\iint_{D^{**}}\frac{1}{1-u^2+v^2}\mathrm{d}u\mathrm{d}v \\
\text{其中}D^{**}\text{是由}(0,0)(\frac{1}{2},\frac{1}{2})(1,0)\text{三点确定的三角形区域}
$$

所以有
$$
\begin{align*}
    \sum_{n=1}^{\infty} \frac{1}{n^2} &= 4\Bigg(\int_{0}^{\frac{1}{2}}\int_{0}^{u}\frac{1}{1-u^2+v^2}\mathrm{d}u\mathrm{d}v + \int_{\frac{1}{2}}^{1}\int_{0}^{1-u}\frac{1}{1-u^2+v^2}\mathrm{d}u\mathrm{d}v \Bigg) \\
    &= 4\int_{0}^{ \frac{1}{2} }\mathrm{d}u\int_{0}^{u} \frac{1}{(\sqrt{1-u^2})^2} \cfrac{1}{1 + \big( \frac{v}{\sqrt{1-u^2}} \big)^2 } \mathrm{d}v + 4\int_{ \frac{1}{2} }^{1} \mathrm{d}u \int_{0}^{1-u} \frac{1}{ (\sqrt{1-u^2})^2 } \cfrac{1}{ 1 + \big( \frac{v}{\sqrt{1-u^2}} \big)^2 } \mathrm{d}v \\
    &= 4\int_{0}^{ \frac{1}{2} } \frac{1}{\sqrt{1-u^2}} \mathrm{d}u\int_{0}^{u} \cfrac{1}{1 + \big( \frac{v}{\sqrt{1-u^2}} \big)^2 } \mathrm{d} \Big( \frac{v}{\sqrt{1-u^2}} \Big) + 4\int_{ \frac{1}{2} }^{1} \frac{1}{\sqrt{1-u^2}} \mathrm{d}u \int_{0}^{1-u} \cfrac{1}{ 1 + \big( \frac{v}{\sqrt{1-u^2}} \big)^2 } \mathrm{d} \Big( \frac{v}{\sqrt{1-u^2}} \Big) \\
    &= 4\int_{0}^{ \frac{1}{2} } \frac{1}{\sqrt{1-u^2}} \arctan\frac{u}{\sqrt{1-u^2}} \mathrm{d}u + 4\int_{ \frac{1}{2} }^{1} \frac{1}{\sqrt{1-u^2}} \arctan\frac{1-u}{\sqrt{1-u^2}} \mathrm{d}u
\end{align*}
$$

设$\phi = \arctan\frac{u}{\sqrt{1-u^2}}, \psi = \arctan\frac{1-u}{\sqrt{1-u^2}}$，则有
$$
\begin{align*}
    &\quad\;\tan\phi = \frac{u}{\sqrt{1-u^2}},\; \tan\psi = \frac{1-u}{\sqrt{1-u^2}} \\
    &\Rightarrow \tan^2\phi = \frac{u^2}{1-u^2} = \frac{1}{1-u^2} - 1,\; \tan^2\psi = \frac{1+u^2-2u}{1-u^2} = -1 + \frac{2-2u}{1-u^2} \\
    &\Rightarrow \sec^2\phi = \frac{1}{1-u^2},\; \sec^2\psi = \frac{2-2u}{1-u^2} \\
    &\Rightarrow \cos^2\phi = 1-u^2,\; \cos^2\psi = \frac{1-u^2}{2-2u} \\
    &\Rightarrow u = \sin\phi,\; \sin^2\psi = 1-\cos^2\psi = \frac{1-u}{2} \text{即} u = 1-2\sin^2\psi = \cos(2\psi) \\
    &\therefore \mathrm{d}u = \cos\phi\mathrm{d}\phi,\; \mathrm{d}u = -2\sin(2\psi)\mathrm{d}\psi
\end{align*}
$$

因此
$$
\begin{align*}
    \sum_{n=1}^{\infty} \frac{1}{n^2} &= 4\int_{0}^{ \frac{1}{2} } \frac{1}{\sqrt{1-u^2}} \arctan\frac{u}{\sqrt{1-u^2}} \mathrm{d}u + 4\int_{ \frac{1}{2} }^{1} \frac{1}{\sqrt{1-u^2}} \arctan\frac{1-u}{\sqrt{1-u^2}} \mathrm{d}u \\
    &= 4\int_{0}^{ \frac{\pi}{6} } \phi\sec\phi\cos\phi \,\mathrm{d}\phi + 4\int_{ \frac{\pi}{6} }^{0} \psi\csc(2\psi)\cdot[-2\sin(2\psi)] \mathrm{d}\psi \\
    &= 4\int_{0}^{ \frac{\pi}{6} } \phi \,\mathrm{d}\phi - 8\int_{ \frac{\pi}{6} }^{0} \psi \mathrm{d}\psi \\
    &= 12\int_{0}^{ \frac{\pi}{6} } \phi \,\mathrm{d}\phi \\
    &= \frac{\pi^2}{6}
\end{align*}
$$

## $\Gamma$函数

Bilibili偶然刷到的[视频](https://www.bilibili.com/video/BV1cT411H7Hp/?share_source=copy_web&vd_source=2f006da37bcfa74648db50269d197857)，讲解了$\Gamma$函数的一些入门知识。

::: tip

$\Gamma$函数本质是递推式$\Gamma(z+1) = z\Gamma(z)$所体现的递推关系。

:::

我之前接触$\Gamma$函数的时候书上是直接给出了它的积分定义，实际上我确实无法理解为何这样定义，这个视频是从阶乘递推关系来得到用极限定义函数的形式，再由这个定义推导出积分定义的。

那么现在从递推式$\Gamma(z+1) = z\Gamma(z)$出发，我们有

$$
\Gamma(z+n+1) = \prod_{\lambda = 0}^{n} (z+\lambda) \cdot \Gamma(z) \Rightarrow \Gamma(z) = \frac{\Gamma(z+n+1)}{\prod_{\lambda = 0}^{n} (z+\lambda)}
$$

又有
$$
\Gamma(z+n+1) = (n+z)! = n! \cdot \prod_{\lambda=1}^{z}(n+\lambda)
$$

那么
$$
\Gamma(z) = \frac{n!}{\prod_{\lambda = 0}^{n} (z+\lambda)}\cdot\prod_{\lambda=1}^{z}(n+\lambda)
$$

当$n\to\infty$时，有
$$
\lim_{n\to\infty}\frac{\prod_{\lambda=1}^{z}(n+\lambda)}{n^z} = \lim_{n\to\infty}\prod_{\lambda=1}^{z} \Big( \frac{n+\lambda}{n} \Big) = \lim_{n\to\infty}\prod_{\lambda=1}^{z} \Big( 1 + \frac{\lambda}{n} \Big) = 1^z = 1
$$

故可得
$$
\Gamma(z) = \lim_{n\to\infty}\frac{n!}{\prod_{\lambda = 0}^{n} (z+\lambda)}n^z
$$

该式正是$\Gamma$函数的极限定义形式。

而如果对上式做一些变换并引入欧拉常数，就可以得到著名的倒数$\Gamma$函数：

::: tip

**欧拉常数**(欧拉-马斯刻若尼常数)的定义为调和级数与自然对数的差值：
$$
\gamma = \lim_{n\to\infty}\Bigg[ \Big( \sum_{k=1}^{n}\frac{1}{k} \Big) - \ln(n) \Bigg] = \int_{1}^{\infty}\Big( \frac{1}{\lfloor x \rfloor} - \frac{1}{x} \Big)\mathrm{d}x
$$

:::

$$
n^z = e^{z\ln n} = e^{z(\ln n - \sum_{\lambda=1}^{n}\frac{1}{\lambda} + \sum_{\lambda=1}^{n}\frac{1}{\lambda})} = e^{z(\ln n - \sum_{\lambda=1}^{n}\frac{1}{\lambda}) + z\sum_{\lambda=1}^{n}\frac{1}{\lambda}} \\
\Rightarrow \lim_{n\to\infty}n^z = \lim_{n\to\infty}e^{z(\ln n - \sum_{\lambda=1}^{n}\frac{1}{\lambda})}\cdot e^{z\sum_{\lambda=1}^{n}\frac{1}{\lambda}} = e^{-\gamma z}\prod_{\lambda=1}^{\infty}e^{\frac{z}{\lambda}}
$$

那么倒数$\Gamma$函数推导过程如下
$$
\begin{align*}
\frac{1}{\Gamma(z)} &= \lim_{n\to\infty}\frac{\prod_{\lambda = 0}^{n} (z+\lambda)}{n!}n^{-z} = \lim_{n\to\infty}\frac{z\prod_{\lambda = 1}^{n} (z+\lambda)}{\prod_{\lambda = 1}^{n}\lambda}e^{\gamma z}\prod_{\lambda=1}^{n}e^{-\frac{z}{\lambda}} \\
&= z\lim_{n\to\infty}\prod_{\lambda = 1}^{n}\Big(\frac{z+\lambda}{\lambda}\Big)e^{\gamma z}\prod_{\lambda=1}^{n}e^{-\frac{z}{\lambda}}
\end{align*}
$$

故倒数$\Gamma$函数(Weierstrass公式)为
$$
\frac{1}{\Gamma(z)} = ze^{\gamma z}\prod_{\lambda = 1}^{\infty}\Bigg[\Big(1+\frac{z}{\lambda}\Big)e^{-\frac{z}{\lambda}}\Bigg]
$$

那么这个式子能用来做什么？仔细观察会发现，如果分别代入一对相反数的话，似乎会简单很多：
$$
\Gamma(z) = z^{-1}e^{-\gamma z}\prod_{\lambda = 1}^{\infty}\Bigg[\Big(1+\frac{z}{\lambda}\Big)^{-1}e^{\frac{z}{\lambda}}\Bigg] \\
\Gamma(-z) = -z^{-1}e^{\gamma z}\prod_{\lambda = 1}^{\infty}\Bigg[\Big(1-\frac{z}{\lambda}\Big)^{-1}e^{-\frac{z}{\lambda}}\Bigg] \\
\therefore \Gamma(z)\Gamma(-z) = -\frac{1}{z^2}\prod_{\lambda = 1}^{\infty}\Bigg[\Big(1-\frac{z^2}{\lambda^2}\Big)^{-1}\Bigg] = -\frac{1}{z^2}\frac{\pi z}{\sin(\pi z)} = -\frac{1}{z}\frac{\pi}{\sin(\pi z)} \\
\text{又}\because \Gamma(z)\Gamma(1-z) = -z\Gamma(z)\Gamma(-z) \\
\therefore \Gamma(z)\Gamma(1-z) = \frac{\pi}{\sin(\pi z)}
$$

这样余元公式就得证了。

现在来求这个式子$\Gamma(z)\Gamma(z+\frac{1}{2})$，这个是倍增公式，下面我们计算的时候需要用到Wallis公式。

::: tip Wallis公式

$$
\lim_{n\to\infty} \frac{1}{2n+1}\Big[ \frac{(2n)!!}{(2n-1)!!} \Big]^2 = \frac{\pi}{2} \\
\lim_{n\to\infty} \frac{(n!)^22^{2n}}{(2n)!\sqrt{n}} = \sqrt{\pi}
$$

:::

$$
\because\Gamma(z) = \lim_{n\to\infty} \frac{n!}{\prod_{\lambda=0}^{n}(z+\lambda)} \cdot n^z,\;\Gamma(z+\frac{1}{2}) = \lim_{n\to\infty} \frac{n!}{\prod_{\lambda=0}^{n}(z+\frac{1}{2}+\lambda)} \cdot n^{z+\frac{1}{2}} \\
\therefore \lim_{n\to\infty} \frac{\Gamma(z)\Gamma(z+\frac{1}{2})}{\Gamma(2z)} = \lim_{n\to\infty} \cfrac{\frac{n!\cdot n!}{\prod_{\lambda=0}^{n}(z+\lambda)\prod_{\lambda=0}^{n}(z+\frac{1}{2}+\lambda)} n^{2z+\frac{1}{2}}}{\frac{(2n)!}{\prod_{\lambda=0}^{2n}(2z+\lambda)}(2n)^{2z}} = \lim_{n\to\infty} \cfrac{\frac{(n!)^2\cdot2^{2n+2}}{\prod_{\lambda=0}^{n}(2z+2\lambda)\prod_{\lambda=0}^{n}(2z+2\lambda+1)} \cdot n^{2z+\frac{1}{2}}}{\frac{(2n)!}{\prod_{\lambda=0}^{2n}(2z+\lambda)}(2n)^{2z}} \\
\Rightarrow \lim_{n\to\infty} \frac{\Gamma(z)\Gamma(z+\frac{1}{2})}{\Gamma(2z)} = \lim_{n\to\infty} \frac{(n!)^22^{2n+2}\cdot\prod_{\lambda=0}^{2n}(2z+\lambda)}{2^{2z}(2n)!\prod_{\lambda=0}^{n}(2z+2\lambda)(2z+2\lambda+1)} \cdot n^{\frac{1}{2}} \\
\Rightarrow \lim_{n\to\infty} \frac{\Gamma(z)\Gamma(z+\frac{1}{2})}{\Gamma(2z)} = \lim_{n\to\infty} \frac{(n!)^22^{2n}}{(2n)!\sqrt{n}} \cdot \frac{2^{2-2z}n}{2z+2n+1} = \sqrt{\pi} \lim_{n\to\infty} \frac{2^{2-2z}}{\frac{2z+1}{n}+2} = 2^{1-2z}\sqrt{\pi} \\
\therefore \Gamma(z)\Gamma(z+\frac{1}{2}) = \frac{\sqrt{\pi}}{2^{2z-1}}\Gamma(2z)
$$

易知$\Gamma(\frac{1}{2})\Gamma(1) = \sqrt{\pi}\Gamma(1) \Rightarrow \Gamma(\frac{1}{2})=\sqrt{\pi}$。

我在视频中看到了如下等式，我偶然心血来潮，想来算一算：

$$
\prod_{n=1}^{\infty}\Big( 1 + \frac{1}{n^2} \Big) = \prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} = \frac{1}{i\Gamma(i)\Gamma(1-i)} = \frac{\sinh \pi}{\pi}
$$

其实一开始我看了好久都没想明白前两个式子为什么能相等，$i$又是哪来的，前面的连乘也没有以它为变量啊？后来我才反应过来，$i$在这里是作为虚数单位才对。在此之前我从没有接触、使用过虚数，哪怕以前我确实学过也确实知道，所以刚开始上手确实有点没反应过来，不过明白就好。

::: tip 下面会用到的你需要知道的东西

$$
\begin{align*}
&1.\text{虚数单位：} i^2 = -1 \\
&2.\Gamma\text{函数的极限定义：} \Gamma(z) = \lim_{x\to\infty}\frac{n!}{\prod_{i=0}^{n}(z+i)}n^z \\
&3.\Gamma\text{函数的递推式：} \Gamma(z+1) = z\Gamma(z) \\
&4.\text{余元公式：} \Gamma(z)\Gamma(1-z) = \frac{\pi}{\sin(\pi z)} \\
&5.\text{倒数}\Gamma\text{函数：} \frac{1}{\Gamma(z)} = ze^{\gamma z}\prod_{n=1}^{\infty}\Bigg[ \Big( 1 + \frac{z}{n} \Big) e^{-\frac{z}{n}} \Bigg] \\
&6.\text{欧拉公式：} e^{ix} = \cos x + i\sin x \\
&7.\text{双曲正弦函数：} \sinh x = \frac{e^x - e^{-x}}{2} \\
\end{align*}
$$

:::

$$

\prod_{n=1}^{\infty}\Big( 1 + \frac{1}{n^2} \Big) = \prod_{n=1}^{\infty}\Big( \frac{n^2 - i^2}{n^2} \Big) = \prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} \\
\text{注意到} \frac{1}{\Gamma(i)} = ie^{\gamma i}\prod_{n=1}^{\infty}\Bigg[ \Big( 1 + \frac{i}{n} \Big) e^{-\frac{i}{n}} \Bigg],\, \frac{1}{\Gamma(-i)} = -ie^{-\gamma i}\prod_{n=1}^{\infty}\Bigg[ \Big( 1 - \frac{i}{n} \Big) e^{\frac{i}{n}} \Bigg] \\
\text{又有} \Gamma(1-i) = -i\Gamma(-i) \\
\therefore \frac{1}{\Gamma(i)\Gamma(1-i)} = -\frac{1}{i\Gamma(i)\Gamma(-i)} = -\frac{1}{i} \cdot ie^{\gamma i}\prod_{n=1}^{\infty}\Bigg[ \Big( 1 + \frac{i}{n} \Big) e^{-\frac{i}{n}} \Bigg] \cdot (-i)e^{-\gamma i}\prod_{n=1}^{\infty}\Bigg[ \Big( 1 - \frac{i}{n} \Big) e^{\frac{i}{n}} \Bigg] \\
\therefore \frac{1}{\Gamma(i)\Gamma(1-i)} = i\prod_{n=1}^{\infty} \Bigg[ \Big( 1 + \frac{i}{n} \Big)\cdot\Big( 1 - \frac{i}{n} \Big) \Bigg] \Rightarrow \frac{1}{i\Gamma(i)\Gamma(1-i)} = \prod_{n=1}^{\infty}\Big( 1 + \frac{1}{n^2}\Big) \\
\because \Gamma(i)\Gamma(1-i) = \frac{\pi}{\sin(\pi i)} \\
\therefore \frac{1}{i\Gamma(i)\Gamma(1-i)} = \frac{\sin(\pi i)}{\pi i} \\
\text{根据欧拉公式得}e^\pi = \cos(\pi i) - i\sin(\pi i),\, e^{-\pi} = \cos(\pi i) + i\sin(\pi i) \\
\therefore e^\pi - e^{-\pi} = -2i\sin(\pi i) = \frac{2\sin(\pi i)}{i} \Rightarrow \frac{e^\pi - e^{-\pi}}{2} = \sinh \pi = \frac{\sin(\pi i)}{i} \\
\therefore \frac{\sin(\pi i)}{\pi i} = \frac{\sinh \pi}{\pi} \\
\text{综上所述},\;\; \prod_{n=1}^{\infty}\Big( 1 + \frac{1}{n^2} \Big) = \prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} = \frac{1}{i\Gamma(i)\Gamma(1-i)} = \frac{\sinh \pi}{\pi}
$$

然而中间的式子
$$
\prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} = \frac{1}{i\Gamma(i)\Gamma(1-i)}
$$
有另外更简便的做法，正是视频所说的一个结论
$$
\sum_{k=1}^{n} a_k = \sum_{k=1}^{n} b_k \Rightarrow \prod_{n=1}^{\infty} \Big[ \frac{\prod_{i=1}^{k}(n + a_i)}{\prod_{i=1}^{k}(n + b_i)} \Big] = \prod_{n=1}^{k} \frac{\Gamma(1+b_n)}{\Gamma(1+a_n)}
$$
那么有
$$
\prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} = \prod_{n=1}^{\infty}\frac{(n+i)}{n}\cdot\frac{(n-i)}{n} = \prod_{n=1}^{1}\frac{\Gamma(1+0)}{\Gamma(1+i)} \cdot \prod_{n=1}^{1}\frac{\Gamma(1+0)}{\Gamma(1-i)} = \frac{1}{\Gamma(1+i)\Gamma(1-i)} \\
\because \Gamma(1+i) = i\Gamma(i) \\
\therefore \prod_{n=1}^{\infty}\frac{(n+i)(n-i)}{n^2} = \frac{1}{i\Gamma(i)\Gamma(1-i)}
$$

