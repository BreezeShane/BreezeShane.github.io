---
title: 算法基础
date: 2022-04-12 07:21:02
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
2. [渐近记号、算法复杂度与主定理](https://zhuanlan.zhihu.com/p/362214924)
3. [大 O 记号及算法的时间复杂度](https://g0ul4sh.top/2017/09/26/big-o-notation/)
4. [算法复杂性分析及运算规则证明(二)](https://blog.csdn.net/a22222259/article/details/88349669)
5. [算法导论------递归算法的时间复杂度求解](https://blog.csdn.net/so_geili/article/details/53444816)
6. [递归方程的求解（代入、递归树和主方法）](https://codeantenna.com/a/cEzNAzRqZ1)
7. [递归式求解——代入法、递归树与主定理](https://zhuanlan.zhihu.com/p/267890781)
8. [递归树： 如何借助树来求解递归算法的时间复杂度](https://blog.csdn.net/every__day/article/details/86554857)
9. [算法导论------递归算法的时间复杂度求解](https://blog.csdn.net/so_geili/article/details/53444816)

:::

## 基本概念

一个算法问题的**规约**(Specification)主要包括两部分:
 - **输入**: 明确规定了算法接受的所有合法输入.
 - **输出**: 明确规定了对于每一个合法的输入值, 相应的输出值应该是什么.

**算法**是为了解决某个问题的一系列运算或操作.

**问题的实例**(Instance)是计算该问题解所必须的(满足问题陈述中强加的各种约束的)输入组成.

若把问题$P$的任何实例作为算法$A$的输入, $A$能够在有限步后停机, 并输出该实例正确的解, 我们称这个过程为算法$A$解决问题$P$.

## 计算复杂性

针对任何输入规模$n$, 任意一个算法都必然要消耗一段时间才能得出解. 这自然会区分出算法计算速度的快与慢, 资源使用效率的高与低, 性能发挥的优与劣. 为了能够系统性地, 科学性地衡量一个算法, 我们就产生了一系列的衡量, 这些衡量有着共同的数学概念与模型: 函数渐进的界.

(这里是施工现场, 我正在填坑了, 您先等等, 别着急......ToT)