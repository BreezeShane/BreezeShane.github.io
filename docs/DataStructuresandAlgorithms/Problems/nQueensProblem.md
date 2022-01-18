---
title: N皇后问题
date: 2021-05-04 20:45:55
author: Breeze Shane
toc: true
mathjax: true
categories: 
 - DataStructuresAndAlgorithms
tags: 
 - Data Structures and Algorithms
article: false
---

## 问题

下图所示为4皇后问题。n皇后问题：在n×n的棋盘上安置n个皇后，要求任意两个皇后均不在同一行、同一列、同一对角线上，要求设计算法求解总共有多少方案。

![](/images/nQueens.png)

## 相关背景知识

1. 可满足性概念
2. 合取、析取的概念

## 问题求解

可在棋盘上建立一个xOy坐标系，从每一行中的每一列找起，排除掉已不满足的可能性，继续这样搜索每一个可能的各种满足题意的情况。

## 问题分析与建模

设棋盘上任意一点对应的命题变量为$P_{(i, j)}$。由约束条件“任意两个皇后均不在同一行、同一列、同一对角线上”可知，该命题等价于每行每列每个对角线上有且仅有一个皇后，而“有且仅有”又可看作“至少有一个”与的“至多有一个”的合取。

其中每行至少有一个皇后可以表示为
$$
Q_1 = \bigwedge^{n}_{i=1}\bigwedge^{n}_{j=1}P_{(i,j)}
$$
而在第$i$行中，$\exist j, k \in N_+ , 1\leq j < k \leq n$，$P_{(i,j)}$和$P_{(i,k)}$不同时为真，观察$\neg P_{(i,j)} \vee \neg P_{(i,k)}$可知至少$\neg P_{(i,j)}$ 和 $\neg P_{(i,k)}$之一为真，即$P_{(i,j)}$ 和 $P_{(i,k)}$有一个为假，因此下列断言表示每一行至多有一个皇后：
$$
Q_2 = \bigwedge^{n}_{i=1}\bigwedge^{n-1}_{j=1}\bigwedge^{n}_{k=j+1}(\neg P_{(i,j)} \vee \neg P_{(i,k)})
$$
同理，每一列有且仅有一个皇后的断言为：
$$
Q_3 = \bigwedge^{n}_{j=1}\bigwedge^{n-1}_{i=1}\bigwedge^{n}_{k=i+1}(\neg P_{(i,j)} \vee \neg P_{(k,j)})
$$
同时为了校验每条对角线上有且仅有一个皇后，可以推知如下断言：
$$
Q_4 = \bigwedge^{n}_{i=2}\bigwedge^{n-1}_{j=1}\bigwedge^{\min(i-1, n-j)}_{k=1}(\neg P_{(i,j)} \vee \neg P_{(i-k,k+j)})
$$

$$
Q_5 = \bigwedge^{n}_{i=1}\bigwedge^{n-1}_{j=1}\bigwedge^{\min(n-i, n-j)}_{k=1}(\neg P_{(i,j)} \vee \neg P_{(i+k,k+j)})
$$

这里出现了$\min (i-1,n-j)$是因为$(i-k)$满足$i - k \geq 1$，$(k+j)$满足$k+j \leq n$，从而求得
$$
\begin{cases}
k \leq i-1 \\
k \leq n-j
\end{cases}
$$
求解方知结果就是$\min (i-1,n-j)$。同理可得$\min(n-i, n-j)$。

综上所述，满足题意的解应使以下断言为真：
$$
Q = \bigwedge^5_{i=1}Q_i
$$
该式对应$P_{(i,j)}$的真值解释，即为所求。

## 算法设计、分析与求解算法

```cpp
#include <iostream>
#include <vector>

int side_length = 0;
int count = 0;

bool Check_True_Or_False(int i, int j, std::vector<std::vector<int>> Board);
void Print_the_Board(std::vector<std::vector<int>> Board);
void Queens(int j, std::vector<std::vector<int>> Board);
```

初期准备，设想是构建并实现判断满足性、递归构建逻辑关系和打印三大部分，并设定好相关的计数器

```cpp
int main() {

    std::cout << "Input the side length of checkerboard: " << std::endl;
    std::cin >> side_length;
    std::vector<std::vector<int>> Board(side_length);
    for (int i = 0; i < side_length; ++i) {
        Board[i].resize(side_length);
        for (int j = 0; j < side_length; ++j) {
            Board[i][j] = 0;
        }
    }
    Queens(0, Board);
    std::cout << "共有"<< count << "种方案。" << std::endl;
    return 0;
}
```

主函数用于定义主要行为，获取输入的棋盘边长并初始化二维数组，并使用Queens来构造逻辑关系。

```cpp
void Queens(int j, std::vector<std::vector<int>> Board){
    if (j == side_length && j != 0){
        Print_the_Board(Board);
        ++count;
        return;
    }
    for (int i = 0; i < side_length; ++i) {
        if ( Check_True_Or_False(i,j,Board) ){
            Board[i][j] = 1;
            Queens(j+1, Board);
            Board[i][j] = 0;
        }
    }
}
```

Queens函数采用了递归方式，利用回溯法确定方案。大致逻辑是：从第一列开始寻找，在每一格上判断真值，若为真，则放下皇后（相当于 0 改为 1），否则不作处理，判断为真的情况下递归一次，向下继续查找满足的情况，以此类推，最后找到所有情况后再同时回溯到上一层直到起点。if  语句块设定递归的出口（递归终止），因为我们可以确定能递归到最后的一定可以满足条件，这时我们输出棋盘状况，计数器加一，然后开始撤回所有的皇后（就是 `Board[i][j] = 0;`这个语句的含义），继续搜索其他情况下的解。for 循环保证了搜索过每一行，而列则由递归来保证搜索。另外我还做了输入合法性问题的检查，当用户输入 0（没有棋盘的时候）时不应计数。

```cpp
bool Check_True_Or_False(int i, int j, std::vector<std::vector<int>> Board){
    int line, column;

    for (line = i, column = 0; column < side_length; ++column) {
        if (Board[line][column] == 1 && column != j){
            return false;
        }
    }

    for (line = 0, column = j; line < side_length; ++line) {
        if (Board[line][column] == 1 && line != i){
            return false;
        }
    }

    for (line = i + 1, column = j + 1; line < side_length && column < side_length; ++line, ++column) {
        if (Board[line][column] == 1){
            return false;
        }
    }

    for (line = i + 1, column = j - 1; line < side_length && column >= 0; ++line, --column) {
        if (Board[line][column] == 1){
            return false;
        }
    }

    for (line = i - 1, column = j - 1; line >= 0 && column >= 0; --line, --column) {
        if (Board[line][column] == 1){
            return false;
        }
    }

    for (line = i - 1, column = j + 1; line >= 0 && column < side_length; --line, ++column) {
        if (Board[line][column] == 1){
            return false;
        }
    }
    return true;
}

void Print_the_Board(std::vector<std::vector<int>> Board){
    for (int i = 0; i < side_length; ++i) {
        for (int j = 0; j < side_length; ++j) {
            std::cout << Board[i][j] << '\t';
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;
}
```

这里的判断真值的Check_True_Or_False函数逻辑简单，使用循环方式依次遍历每行每列每条对角线上是否存在其他皇后，若存在则返回false，否则返回true。

最后则是打印出这个棋盘上皇后的摆放位置。

## 参考资料

[1] Kenneth H. Rosen. Discrete Mathematics and Its Applications[M].Beijing: China Machine Press, 2020.1: 28-30.

## 源代码-->[N Queens Problem](https://github.com/BreezeShane/MySummary/blob/master/C%2B%2B/N-Queens%20Problem/N%E7%9A%87%E5%90%8E%E9%97%AE%E9%A2%98.cpp)
