---
title: 同余式及其性质
date: 2021-10-17 15:15:15
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Mathematics
tags: 
 - Mathematics
---

## 定义

若一个整数$a$被一个整数$m$除的时候得到的商$q_1$和唯一的一个余数$r$，另一个整数$b$也被$m$除时得到商$q_2$，得到的唯一余数也是$r$（其中$0 \leq r < m$），即
$$
\begin{cases}
a = mq_1+r \\
b = mq_2+r
\end{cases}
$$
则我们说$a$与$b$对于模$m$，有同一个余数$r$，写成：
$$
a \equiv b \quad (mod \,\,\, m)
$$
可以简略读作：对于模$m$，$a$和$b$同余。

> mod是module的英文缩写

## 性质

1. 由定义可知下式成立：

$$
a \equiv b \quad (mod \,\,\, m) \Leftrightarrow m|a - b| \Leftrightarrow a-b = m(q_1 - q_2)
$$

2. 若$a_1 \equiv b_1 \,\, (mod \,\,\, m)$, $a_2 \equiv b_2 \,\, (mod \,\,\, m)$, $\dots$ , $a_n \equiv b_n \,\, (mod \,\,\, m)$，则有
   $$
   \sum_{i=1}^n a_i \equiv \sum_{i=1}^n b_i \quad (mod \,\,\, m)
   $$

3. 若$a+c \equiv b \,\, (mod \,\,\, m)$，则$a \equiv b-c \,\, (mod \,\,\, m)$

4. 若$a \equiv b \,\, (mod \,\,\, m)$，则$a \pm km \equiv b \,\, (mod \,\,\, m)\quad k\in N$

5. 若$a_1 \equiv b_1 \,\, (mod \,\,\, m)$, $a_2 \equiv b_2 \,\, (mod \,\,\, m)$, $\dots$ , $a_n \equiv b_n \,\, (mod \,\,\, m)$，则有
   $$
   \prod_{i=1}^n a_i \equiv \prod_{i=1}^n b_i \quad (mod \,\,\, m)
   $$

6. 利用性质2和5可得

   1. 若$A \equiv B \,\, (mod \,\,\, m)$, $a_0 \equiv b_0 \,\, (mod \,\,\, m)$, $a_1 \equiv b_1 \,\, (mod \,\,\, m)$, $\dots$ , $a_n \equiv b_n \,\, (mod \,\,\, m)$，则
      
      $$
      A\sum_{k=0}^n\prod_{i=0}^{k}x_i^{a_i} =   B\sum_{k=0}^n\prod_{i=0}^{k}y_i^{a_i}
      $$
      
      > 注：A和B表示一个常数。

   2. 若$a_0 \equiv b_0 \,\, (mod \,\,\, m)$, $a_1 \equiv b_1 \,\, (mod \,\,\, m)$, $a_2 \equiv b_2 \,\, (mod \,\,\, m)$, $\dots$ , $a_n \equiv b_n \,\, (mod \,\,\, m)$，则
      $$
      \sum_{i=1}^n a_ix^i \equiv \sum_{i=1}^n b_ix^i \quad (mod \,\,\, m)
      $$


7. 若$a \equiv b \,\, (mod \,\,\, m)$且$a = a^\prime d\,,\, b=b^\prime d\,,\,gcd(d,\,m)=1$，则$a^\prime \equiv b^\prime \,\, (mod \,\,\, m)$

   > 其中$gcd(a,\,b)$表示$a$和$b$的最大公因数，$gcd(a,\,b)=1$表示$a$和$b$互质。

8. 若$a \equiv b \,\, (mod \,\,\, m)$，则$ak \equiv bk \,\, (mod \,\,\, km)\quad k\in Z$

9. 若$a \equiv b \,\, (mod \,\,\, m)$且$a = a^\prime d\,,\, b=b^\prime d\,,\,m=m^\prime d$，则$a^\prime \equiv b^\prime \,\, (mod \,\,\, m^\prime)$

10. 若$a \equiv b \,\, (mod \,\,\, m)$且$m=m^\prime d$，则$a \equiv b \,\, (mod \,\,\, m^\prime)$

11. 若$a \equiv b \,\, (mod \,\,\, m)$且$k|a\,,\,k|m$，则$k|b$

12. 若$a \equiv b \,\, (mod \,\,\, m)$，则$gcd(a\,,m) = gcd(b\,,m)$

