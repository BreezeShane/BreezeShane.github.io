---
title: 算法基础
date: 2023-04-04 21:43:15
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - AlgorithmDesignAndAnalysis
tag: 
 - Algorithm Design and Analysis
---

::: details 参考

1. [算法复杂度及渐进符号](https://www.bookstack.cn/read/hunterhug-goa.c/basic-dregee.md#3.4.%20%E6%B8%90%E8%BF%9B%E5%88%86%E6%9E%90)
2. [函数的渐近的界](https://blog.csdn.net/qq_41375318/article/details/103535849)
3. [函数的渐近的界&阶的比较](https://www.cnblogs.com/jfdwd/p/11109462.html)
4. [函数渐近界及渐近符号介绍](https://www.jianshu.com/p/213ae7dbea25)
5. [程序算法艺术与实践:基础知识之函数的渐近的界](https://www.kancloud.cn/digest/tac-programalgrithm/211833)
6. [渐近记号、算法复杂度与主定理](https://zhuanlan.zhihu.com/p/362214924)
7. [大 O 记号及算法的时间复杂度](https://g0ul4sh.top/2017/09/26/big-o-notation/)
8. [算法复杂性分析及运算规则证明(二)](https://blog.csdn.net/a22222259/article/details/88349669)
9. [算法导论------递归算法的时间复杂度求解](https://blog.csdn.net/so_geili/article/details/53444816)
10. [递归方程的求解（代入、递归树和主方法）](https://codeantenna.com/a/cEzNAzRqZ1)
11. [递归式求解——代入法、递归树与主定理](https://zhuanlan.zhihu.com/p/267890781)
12. [递归树： 如何借助树来求解递归算法的时间复杂度](https://blog.csdn.net/every__day/article/details/86554857)
13. [算法导论------递归算法的时间复杂度求解](https://blog.csdn.net/so_geili/article/details/53444816)

:::

## 基本概念

一个算法问题的**规约**(Specification)主要包括两部分:
 - **输入**: 明确规定了算法接受的所有合法输入.
 - **输出**: 明确规定了对于每一个合法的输入值, 相应的输出值应该是什么.

**算法**是为了解决某个问题的一系列运算或操作.

**问题的实例**(Instance)是计算该问题解所必须的(满足问题陈述中强加的各种约束的)输入组成.

若把问题$P$的任何实例作为算法$A$的输入, $A$能够在有限步后停机, 并输出该实例正确的解, 我们称这个过程为算法$A$解决问题$P$.

算法的五大重要特征：
1. 有穷性
2. 确定性
3. 可行性
4. 输入
5. 输出

通常设计一个好的算法应当考虑到如下目标：
1. 正确性
2. 可读性
3. 健壮性
4. 高效率与低存储量需求

## 计算复杂性

针对任何输入规模$n$, 任意一个算法都必然要消耗一段时间才能得出解. 这自然会区分出算法计算速度的快与慢, 资源使用效率的高与低, 性能发挥的优与劣. 为了能够系统性地, 科学性地衡量一个算法, 我们就产生了一系列的衡量, 这些衡量有着共同的数学概念与模型: 函数渐近的界.

函数渐近的界有六种：渐近上界、非渐近紧确上界、渐近下界、非渐近紧确下界、渐近紧确界。

※**渐近上界**：设$f$和$g$是定义域为自然数集$N$上的函数。若存在$C,n_0\in R_+$，使得对一切$n\geq n_0$有$0\leq f(n)\leq Cg(n)$成立，则称$f(n)$的渐近上界是$g(n)$，记作$f(n)=O(g(n))$。

**非渐近紧确上界**：设$f$和$g$是定义域为自然数集$N$上的函数。若$\forall C \in R_+, \exists n_0\in R_+$，使得对一切$n\geq n_0$有$0\leq f(n)\leq Cg(n)$成立，则称$f(n)$的非渐近紧确上界是$g(n)$，记作$f(n)=o(g(n))$。

**渐近下界**：设$f$和$g$是定义域为自然数集$N$上的函数。若存在$C,n_0\in R_+$，使得对一切$n\geq n_0$有$0\leq Cg(n)\leq f(n)$成立，则称$f(n)$的渐近下界是$g(n)$，记作$f(n)=\Omega(g(n))$。

**非渐近紧确下界**：设$f$和$g$是定义域为自然数集$N$上的函数。若$\forall C \in R_+, \exists n_0\in R_+$，使得对一切$n\geq n_0$有$0\leq Cg(n)\leq f(n)$成立，则称$f(n)$的非渐近紧确上界是$g(n)$，记作$f(n)=\omega(g(n))$。

**渐近紧确界**：若$f(n)=O(g(n))$且$f(n)=\Omega(g(n))$，则记作$f(n)=\Theta(g(n))$「注意：对于前面有限个$n$值可以不满足条件。」

> 在数据结构与算法中我们一般使用上面用※标记的**渐近上界**。

::: details 非重点知识

函数渐近的界相关的数学性质：

传递性：
 - $f(n)=\Theta(g(n))\text{和}g(n)=\Theta(h(n))\Rightarrow f(n)=\Theta(h(n))$
 - $f(n)=O(g(n))\text{和}g(n)=O(h(n))\Rightarrow f(n)=O(h(n))$
 - $f(n)=\Omega(g(n))\text{和}g(n)=\Omega(h(n))\Rightarrow f(n)=\Omega(h(n))$
 - $f(n)=o(g(n))\text{和}g(n)=o(h(n))\Rightarrow f(n)=o(h(n))$
 - $f(n)=\omega(g(n))\text{和}g(n)=\omega(h(n))\Rightarrow f(n)=\omega(h(n))$

自反性：
 - $f(n)=\Theta(f(n))$
 - $f(n)=O(f(n))$
 - $f(n)=\Omega(f(n))$

对称性：

- $f(n)=\Theta(g(n))\text{当且仅当}g(n)=\Theta(f(n))$

转置对称性：

 - $f(n)=O(g(n))\text{当且仅当}g(n)=\Omega(f(n))$
 - $f(n)=o(g(n))\text{当且仅当}g(n)=\omega(f(n))$

:::

