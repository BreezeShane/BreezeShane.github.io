---
title: 顺序线性表
date: 2021-10-02 18:42:05
author: Breeze Shane
toc: true
mathjax: true
categories:
 - DataStructuresAndAlgorithms
tags:
 - Data Structures and Algorithms
---

## 定义

> 顺序线性表是数据结构算法中最简单的一种结构，它的组成成分如下：
>
>1. 头指针结构：包含最大储存空间、当前存有数据量和线性表三个成员。
>2. 线性表结构：一个连续存储的数组。

如图所示：

![](/images/DataStructuresAndAlgorithms/SequentialLinearList.png)

结构定义的代码：

```c
typedef int DataType;
struct seqList {
    int MAXNUM;
    int curNum;
    DataType *element;
};
typedef struct seqList* PseqList;
```

## 顺序线性表的基本操作与代码实现

### 创建

**实现思路**：

创建空的顺序线性表非常容易，只需要知道固定的空间大小即可，同时也可记录该线性表中最大空间和当前存有数据量。

**源代码**：

```c
//创建头指针用于建立顺序线性表
PseqList createNullList_seq(int m){
    if ( !m )
        return NULL;
    struct seqList* HEAD = (struct seqList*)malloc(sizeof(struct seqList));
    HEAD->MAXNUM = m;
    HEAD->curNum = 0;
    HEAD->element = (DataType *)malloc(sizeof(DataType) * HEAD->MAXNUM);
    return HEAD;
}
```

> 注意：之所以没有直接写成`struct seqList HEAD;`是因为使用这样的写法会导致栈空间的浪费，还会存在不可预知的被回收掉的风险。想了解底层原因请点击[这里](Statement.md)

**时间复杂度**：由于是每一次执行该函数时只需要执行常数个语句，因此可以据此认为时间复杂度是$O(1)$。

**空间复杂度**：由于该函数需要申请固定的空间大小，而这个空间大小依用户输入的数据规模而决定，因此可认为空间复杂度是$O(n)$。

### 插入

**实现思路**：

在指定位置插入新的数据，就需要将后面所有的数据向后移动一位来给新的数据腾出空间，移动完毕后就可以将新的数据放入指定位置了。

**源代码**：

```c
//判断是否已满，是为了验证能否继续插入的先决条件
int isFullList_seq(PseqList L) {
    if (L->curNum < L->MAXNUM) {
        return 0;
    } else {
        return 1;
    }
}
//在指定位置插入数据
int insertP_seq(PseqList L, int p, int x) {
    if (isFullList_seq(L)) {
        printf("list is full");
        return 0;
    } else if (p > L->curNum || p < 0) {
        printf("position is illegel");
        return 0;
    } else {
        for (int i = L->curNum - 1; i >= p; --i) {
            L->element[i + 1] = L->element[i];
        }
        L->element[p] = x;
        L->curNum++;
        return 1;
    }
}
//在指定位置的前面插入数据
int insertPre_seq(PseqList L, int p, int x) {
    if (insertP_seq(L, p - 1, x)) {
        return 1;
    } else {
        return 0;
    }
}
//在指定位置的后面插入数据
int insertPost_seq(PseqList L, int p, int x) {
    if (insertP_seq(L, p + 1, x)) {
        return 1;
    } else {
        return 0;
    }
}
```

**时间复杂度**：以上代码中关键代码段是`insertP_seq`函数。由于该函数执行时需要不断地将后面的数据向后移动一位，如果插在最后一位，则需要移动$0$次，如果插在第一位，则需要移动当前所有的数据，总计$n$次，平均时间复杂度计算可得知$O(\frac{0 + n}{2}) = O(n)$，因此可以认为时间复杂度为$O(n)$。

**空间复杂度**：由于执行插入的操作中，用户输入的数据规模与该函数申请空间大小并无关系，是固定使用常数个变量，因此可以认为该函数的空间复杂度为$O(1)$。

### 输出

**实现思路**：

确定一个索引，在索引递增的同时输出顺序线性表对应索引的值。

**源代码**：

```c
void printList_seq(PseqList L) {
    for (int i = 0; i < L->curNum; ++i) {
        printf("%d ", L->element[i]);
    }
}
```

**时间复杂度**：该函数执行时间与用户输入的数据规模线性相关，因此认为时间复杂度为$O(n)$。

**空间复杂度**：显然该函数只申请了一个`int`整型变量的空间大小，因此认为空间复杂度为$O(1)$

### 查询

**实现思路**：

由于查询顺序线性表有两种查找方式，一种是查找指定索引对应的值，另一种则是查找指定值对应的索引，为了便于描述，下面我们称前者为方式A，后者为方式B。

**方式A**：只需要确定偏移量，直接访问线性表起点偏移后对应的空间即可。

**方式B**：关于搜索算法有许多种，这里仅提最简单的顺序查找。顺序查找的思路是：从线性表起点开始，一位一位地向后探查，找到第一个与查找值相同时立即返回其对应的索引。

**源代码**：

```c
//查询指定位置的值
int locate_seq(PseqList L, int x) {
    for (int i = 0; i < L->curNum; ++i) {
        if (L->element[i] == x) {
            return i;
        }
    }
    return -1;
}
//查询指定值的位置
DataType locatePos_seq(PseqList L, int pos) {
    if (pos >= L->curNum || pos < 0) {
        return L->element[0];
    } else {
        return L->element[pos];
    }
}
```

**时间复杂度**：

**方式A**：由于只需要计算一次起点与偏移量之和，即可直接访问目标空间，所以认为时间复杂度为$O(1)$。

**方式B**：由于需要从起点开始依次向后移动一位访问空间，访问次数与用户输入规模有关，在最好的情况下查找的数据在起点处，只需要执行一次；在最坏的情况下查找的数据在线性表表尾处，需要执行$n$次，因此平均估计时间复杂度为$O(\frac{1+n}{2})=O(n)$。

**空间复杂度**：

两种方式需要申请的空间都是常数个变量空间，因此认为空间复杂度皆为$O(1)$。

### 删除

**实现思路**：

删除元素，即需要从线性表所有数据中抹除掉指定的元素，抹除掉旧数据，新数据自然需要向前一位来占空，那么这一系列操作可以直接简化为：将指定元素以后的所有数据都向前一位，覆盖原来的数据。

如果想删除所有指定值的元素，则只需要将上面删除单个元素的操作重复几次即可。

**源代码**：

```c
//删除指定位置的元素
int deletePos_seq(PseqList L, int pos) {
    if (pos >= L->curNum || pos < 0) {
        return -1;
    } else {
        for (int i = pos; i < L->curNum - 1; ++i) {
            L->element[i] = L->element[i + 1];
        }
        L->curNum--;
    }
    return 1;
}
//删除所有指定值的元素
int delete_seq(PseqList L, int x) {
    int num = 0;
    for (int i = 0; i < L->curNum; ++i) {
        if (L->element[i] == x) {
            deletePos_seq(L, i);
            num++;
            --i;
        }
    }
    return num;
}
```

**时间复杂度**：

**删除单个元素**：删除的元素位于线性表中索引$n \;\; (0 \leq n < N)$，都需要先访问过前$n - 1$个空间后，将后面的$N - n$个元素向前移位覆盖，因此认为访问和移位覆盖两种操作的执行次数与用户输入的规模线性相关，因此可以认为时间复杂度为$O(n)$。

**删除值为指定值的所有元素**：讨论过删除单个元素操作的时间复杂度$O(n)$。在线性表中查找每一个值为指定值的元素，显然对应的时间复杂度也是$O(n)$，而对于每一个符合条件的元素，都要执行一次删除单个元素操作，据此可以认为，该操作的时间复杂度为$O(n^2)$。

**空间复杂度**：由于这两种操作都是在原来的线性表基础上进行修改，并且只需要申请常数个变量，因此可以认为两种操作的空间复杂度都为$O(1)$。

### 修改

**实现思路**：

该操作仅在查找指定值操作的基础上多了一步修改的操作，即每找到一个符合条件的值时执行修改数据的操作。

**源代码**：

```c
//修改指定值我
void replace_seq(PseqList L, int x, int y) {
    for (int i = 0; i < L->curNum; ++i) {
        if (L->element[i] == x) {
            L->element[i] = y;
        }
    }
    return;
}
```

**时间复杂度**：分析见查询方式B，时间复杂度为$O(n)$。

**空间复杂度**：分析见查询方式B，空间复杂度为$O(n)$。

## 顺序线性表的优缺点

**优点**：

1. 查询速度快，简单、运算方便，更适合小线性表或者固定长度的线性表。

**缺点**：

1. 删除和插入效率低
2. 存储空间容易出现上溢
3. 容易导致空间浪费。

## 线性表对应的一些难题-->[Some Problems on Sequential Linear List]()
