---
title: 相关名词的概念
date: 2022-01-16 19:47:33
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
## 标量、向量、矩阵和张量

### 标量

又称**纯量**，是只有大小、没有方向、可用实数表示的一个量。

实际上标量就是实数，“标量”这个称法只是为了区别于向量。

### 向量

也称作**矢量**，指一个同时具有大小和方向，且满足平行四边形法则的几何对象。

一个向量可以由一列有序的数来确定。

若向量$x$中总共有$n$个元素，且每一个元素都属于$\mathbb{R}$，则$x \in \mathbb{R}^{n}$，其中$\mathbb{R}^{n}$表示实数集$\mathbb{R}$的$n$次笛卡尔积所构成的集合。

::: tip

有时我们会这样描述向量：

$$
x = \big[x_1\,\,x_2\,\,\cdots\,\,x_n\big]^\top = 
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

:::

### 矩阵

数学上，一个$m\times n$的矩阵是一个由$m$行（row）$n$列（column）元素排列成的矩形阵列。矩阵里的元素可以是数字、符号或数学式。

若一个实数矩阵$\bold{A}$高度为$m$，宽度为$n$，那么我们称矩阵$\bf{A} \in \mathbb{R}^{m \times n}$。

$$
\bold{A} = 
\begin{bmatrix}
    a_{1,1} & a_{1,2} & a_{1,3} & \cdots & a_{1,j} & \cdots & a_{1,n} \\
    a_{2,1} & a_{2,2} & a_{2,3} & \cdots & a_{2,j} & \cdots & a_{2,n} \\
    a_{3,1} & a_{3,2} & a_{3,3} & \cdots & a_{3,j} & \cdots & a_{3,n} \\
    \vdots & \vdots & \vdots & \ddots & \vdots & \ddots & \vdots \\
    a_{i,1} & a_{i,2} & a_{i,3} & \cdots & a_{i,j} & \cdots & a_{i,n} \\
    \vdots & \vdots & \vdots & \ddots & \vdots & \ddots & \vdots \\
    a_{m,1} & a_{m,2} & a_{m,3} & \cdots & a_{m,j} & \cdots & a_{m,n}
\end{bmatrix}
$$

### 张量

**严格定义：**

是一个可用来表示在一些矢量、标量和其他张量之间的线性关系的多线性函数(线性关系的基本例子有内积、外积、线性映射以及笛卡儿积)。

其坐标在$n$维空间内，有$n^r$个分量的一种量，其中每个分量都是坐标的函数，而在坐标变换时，这些分量也依照某些规则作线性变换。$r$称为该张量的秩或阶（与矩阵的秩和阶均无关系）。

张量的简洁定义表述为由若干坐标系改变时满足一定坐标转化关系的有序数组成的集合。

**另一种定义方式：**

一个$(p,q)$型的张量$T$被定义为一个多重线性映射

$$
T: \underbrace{V^{*}\times \dots \times V^{*}}_{p{\text{ 個}}}\times \underbrace{V\times \dots \times V}_{q{\text{ 個}}} \mapsto \mathbb{R},
$$

其中$V$是矢量空间，$V^∗$是其对偶空间。

张量不随参照系的坐标变换（其实就是基向量变化）而变化。

::: tip

**与标量、矩阵的关系：**

我们可以将标量视为零阶张量，矢量视为一阶张量，那么矩阵就是二阶张量。

:::

## 单位矩阵和逆矩阵

### 单位矩阵

是一个$n\times n$的方形矩阵，其主对角线元素为1，其余元素为0，且该方阵的阶数为$n$，记作$I_n$，有时会记作$\text{diag}(1,1,\dots,1)$

### 逆矩阵

设A是一个$n$阶矩阵$\bold{A}$，若存在另一个$n$阶矩阵$\bold{B}$，使得$\bold{AB}=\bold{BA}=\bold{E}$ ，则称方阵$\bold{A}$可逆，并称方阵$\bold{B}$是$\bold{A}$的逆矩阵，并记作$\bold{A}^{-1}$。

## 范数

详细请查看[此处](../../Mathematics/Norm.md)

## 特殊类型的矩阵和向量

## 行列式

记作$\det(\bold{A})$，是一个将方阵$\bold{A}$映射到实数的函数，等于矩阵所有特征值的乘积。

## 对角元

对于一个$m\times n$的矩阵$\bold{A}$，有如下定义：

$\text{对于} \bold{A}_{i,j}, \text{若}i=j \text{则该元素为对角元。}$

$\text{对于} \bold{A}_{i,j}, \text{若}i=j+1 \text{，则该元素为次对角元。}$

$\text{对于} \bold{A}_{i,j}, \text{若}i=j-1 \text{，则该元素为超对角元。}$
