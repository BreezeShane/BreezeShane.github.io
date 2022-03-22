---
title: 共轭函数性质的证明
date: 2022-03-22 14:40:15
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - AritficialIntelligence
tags: 
 - Aritficial Intelligence
---

> 参考连接: [共轭函数两个性质的证明](https://blog.csdn.net/weixin_42258608/article/details/87610618)

::: info 性质1

无论$f$是否是凸函数,$f^*$恒为凸函数.

:::

**证明**:

证明"无论$f$是否是凸函数,$f^*$恒为凸函数.",即证:

$$
f^*(\theta t_1 + (1-\theta)t_2) \leq \theta f^*(t_1) + (1-\theta)f^*(t_2)
$$

由定义可知:

$$
\begin{aligned}
&\qquad \sup_{x\in \mathrm{dom}\,f}\{ [\theta t_1 + (1-\theta)t_2]x - f(x) \} \leq \theta\sup_{x\in \mathrm{dom}\,f}\{ xt_1 - f(x) \} + (1-\theta)\sup_{x\in \mathrm{dom}\,f}\{ xt_2 - f(x) \} \\
&\Leftrightarrow \sup_{x\in \mathrm{dom}\,f} \{ (1-\theta)[xt_2-f(x)] + \theta[xt_1 - f(x)] \} \leq \theta\sup_{x\in \mathrm{dom}\,f}\{ xt_1 - f(x) \} + (1-\theta)\sup_{x\in \mathrm{dom}\,f}\{ xt_2 - f(x) \}
\end{aligned}
$$

设在$x\to x_0$时不等式左式取得最小上界,则有:

$$
(1-\theta)[x_0t_2-f(x_0)] + \theta[x_0t_1 - f(x_0)]
 \leq \theta\sup_{x\in \mathrm{dom}\,f}\{ t_1x - f(x) \} + (1-\theta)\sup_{x\in \mathrm{dom}\,f}\{ t_2x - f(x) \}
$$

注意到下式显然成立:

$$
\begin{aligned}
&x_0t_1 - f(x_0)\leq \sup_{x\in \mathrm{dom}\,f}\{ t_1x-f(x) \} \qquad \text{(1)} \\
&x_0t_2 - f(x_0)\leq \sup_{x\in \mathrm{dom}\,f}\{ t_2x-f(x) \} \qquad \text{(2)}
\end{aligned}
$$

则$\theta(1) + (1-\theta)(2)$这一线性组合即可得到以上不等式成立,由此性质1得证.

---

::: info 性质2

凸函数的共轭函数的共轭函数是它自己.

:::

**证明**:

已知$f(x)$为凸函数,共轭函数的定义如下:

$$
f^*(t) = \sup_{x\in \mathrm{dom}\,f}\{ tx - f(x) \}
$$

$$
\because \frac{d}{dx} f^*(t) = 0 \Rightarrow \frac{d}{dx}(tx - f(x)) = 0 \\
\therefore t = \frac{d}{dx}f(x)
$$

又有$f^*(t)$的共轭函数为

$$
f^{**}(s) = \sup_{t\in \mathrm{dom}\,f}\{ st - f^*(t) \}
$$

$$
\because \frac{d}{dt}f^{**}(s) = 0 \Rightarrow \frac{d}{dt}[st - f^*(t)] = 0
$$
$$
\begin{aligned}
\therefore s &= \frac{d}{dt}f^*(t) \\
&= \frac{d}{dt}[tx - f(x)] \\
&= x + t\frac{dx}{dt} - \frac{d}{dt}f(x) \\
&= x + t\frac{dx}{dt} - \frac{d}{dx}f(x)\cdot \frac{dx}{dt} \\
&= x + t\frac{dx}{dt} - t\frac{dx}{dt} \\
&= x
\end{aligned}
$$

$$
\begin{aligned}
\therefore f^{**}(s) 
&= \sup_{t\in \mathrm{dom}\,f}\{ st - f^*(t) \} \\
&= \sup_{t\in \mathrm{dom}\,f} \{ tx - f^*(t) \} \\
&= \sup_{t\in \mathrm{dom}\,f} \{ tx - [tx - f(x)] \} \\
&= \sup_{t\in \mathrm{dom}\,f}f(x) \\
&= f(x) \\
&= f(s)
\end{aligned}
$$

故该性质成立.


