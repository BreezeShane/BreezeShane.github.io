---
title: Java 杂记
date: 2022-03-08 19:31:10
author: Breeze Shane
top: false
toc: true
mathjax: true
article: false
---
## Java 输出NaN的原因

中间的某步计算是在算$\frac{0}{0}$或者负数的平方根(即虚数)的.

注意: 判断是否为NaN时要使用isNaN.

## Java double 类型 格式化转换为字符串

使用`String.format("<Format Map>", <Variable>)`方法来实现即可.



