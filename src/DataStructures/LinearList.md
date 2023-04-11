---
title: 线性表
date: 2021-10-02 18:42:05
author: Breeze Shane
toc: true
mathjax: true
category:
 - DataStructuresAndAlgorithms
tag:
 - Data Structures and Algorithms
---

## 线性表

线性表是具有相同数据据类型的$n (n\geq0)$个数据元素的有限序列，其中$n$为表长，当$n=0$时线性表是一个空表。

表头元素是线性表里的唯一的第一个数据元素，而表尾元素是唯一的最后一个数据元素。

线性表的特点：
 - 表中元素的个数有限
 - 表中元素具有逻辑上的顺序性，表中元素有其先后次序。
 - 表中元素都是数据元素，每个元素都是单个元素。
 - 表中元素的数据类型都相同，每个元素占有相同大小的存储空间。
 - 表中元素具有抽象性，仅讨论元素间的逻辑关系而不考虑其表示的内容。

::: tip 考研中可直接使用的线性表的基本操作

1. InitList(&L): 初始化表
2. Length(L): 求表长
3. LocateElem(L, e): 按值查找
4. GetElem(L, i): 按位查找
5. ListInsert(&L, i, e): 插入元素
6. ListDelete(&L, i, e): 删除元素
7. PrintList(L): 输出操作
8. Empty(L): 判空操作
9. DestoryList(&L): 销毁操作

:::

## 线性表的顺序表示

顺序表是线性表的顺序存储，它是用一组地址连续的存储单元依次存储线性表中的数据元素，从而使得**逻辑上相邻的两个元素在物理位置上也相邻**（此即顺序表的特点）。

我们称第$i$个元素$a_i$的$i$为位序。若设$\mathrm{LOC}(A)$为线性表存储的起始位置，$\mathrm{sizeof(ElemType)}$为每个数据元素所占用的存储空间的大小，那么对于第$i$个元素的指针地址为$\mathrm{LOC}(A) + i \times \mathrm{sizeof(ElemType)}, i\in[0, n-1], n$为该表的长度。

线性表的顺序存储结构是一种随机存取的存储结构。

> 通常顺序表的组成成分如下：
> 1. 头指针结构：包含最大储存空间、当前存有数据量和线性表三个成员。
> 2. 线性表结构：一个连续存储的数组。

如图所示：

![](/images/DataStructuresAndAlgorithms/SequentialLinearList.png)

结构定义的代码：

::: code-tabs

@tab 在堆上的定义

```c
typedef int DataType;
struct seqList {
    DataType *element;
    int MAXNUM, length;
};
typedef struct seqList* PseqList;
```

@tab 在栈上的定义

```c
enum { MAXNUM = 50 };
typedef int DataType;
struct seqList {
    DataType element[MAXNUM];
    int length;
};
typedef struct seqList* PseqList;
```

:::

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
    HEAD->length = 0;
    HEAD->element = (DataType *)malloc(sizeof(DataType) * HEAD->MAXNUM);
    // C++
    // HEAD->element = new DataType[HEAD->MAXNUM];
    return HEAD;
}
```

> 注意：之所以没有直接写成`struct seqList HEAD;`是因为使用这样的写法会导致栈空间的浪费，还会存在不可预知的被回收掉的风险。想了解底层原因请点击[这里](Statement.md)

### 插入

**实现思路**：

在指定位置插入新的数据，就需要将后面所有的数据向后移动一位来给新的数据腾出空间，移动完毕后就可以将新的数据放入指定位置了。

**源代码**：

```c
//判断是否已满，是为了验证能否继续插入的先决条件
int isFullList_seq(PseqList L) {
    if (L->length < L->MAXNUM) {
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
    } else if (p > L->length + 1 || p < 0) {
        printf("position is illegel");
        return 0;
    } else {
        for (int i = L->length - 1; i >= p; --i) {
            L->element[i + 1] = L->element[i];
        }
        L->element[p] = x;
        L->length++;
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

**时间复杂度**：

**最好情况**：在表尾插入，元素后移语句将不执行，此时时间复杂度为$O(1)$。

**最坏情况**：在表头插入，元素后移语句将执行$n$次，此时时间复杂度为$O(n)$。

**平均情况**：

假设$p_i=\frac{1}{n+1}$是在第$i$个位置上插入一个结点的概率，则在长度为$n$的线性表中插入一个结点时，所需移动结点的平均次数为
$$
\begin{align*}
    \sum_{i=1}^{n+1}p_i(n-i+1) &= \sum_{i=1}^{n+1}\frac{1}{n+1}(n-i+1) \\
    &= \frac{1}{n+1}\sum_{i=1}^{n+1}(n-i+1) \\
    &= \frac{1}{n+1}\frac{n(n+1)}{2} = \frac{n}{2}
\end{align*}
$$

综上所述，该操作的时间复杂度为$O(n)$。

### 输出

**实现思路**：

确定一个索引，在索引递增的同时输出顺序线性表对应索引的值。

**源代码**：

```c
void printList_seq(PseqList L) {
    for (int i = 0; i < L->length; ++i) {
        printf("%d ", L->element[i]);
    }
}
```

**时间复杂度**：该函数执行时间与用户输入的数据规模线性相关，因此认为时间复杂度为$O(n)$。

**空间复杂度**：显然该函数只申请了一个`int`整型变量的空间大小，因此认为空间复杂度为$O(1)$

### 查询

**实现思路**：

由于查询顺序线性表有两种查找方式，一种是按索引查找值，另一种则是按值查找索引。

**按索引查找值**：只需要确定偏移量，直接访问线性表起点偏移后对应的空间即可。

**按值查找索引**：关于搜索算法有许多种，这里仅提最简单的顺序查找。顺序查找的思路是：从线性表起点开始，一位一位地向后探查，找到第一个与查找值相同时立即返回其对应的索引。

**源代码**：

::: tabs#search

@tab 按索引查找值

```c
DataType locatePos_seq(PseqList L, int pos) {
    if (pos >= L->length || pos < 0) {
        return L->element[0];
    } else {
        return L->element[pos];
    }
}
```

@tab 按值查找索引

```c
int locate_seq(PseqList L, int x) {
    for (int i = 0; i < L->length; ++i) {
        if (L->element[i] == x)
            return i;
    }
    return -1;
}
```

:::

**时间复杂度**：

::: tabs#search

@tab 按索引查找值

由于顺序表具有随机访存的特点，所以时间复杂度为$O(1)$。

@tab 按值查找索引

**最好情况**：查找的元素在表头，仅需比较一次，时间复杂度为$O(1)$。

**最坏情况**：查找的元素在表尾，需要比较$n$次，时间复杂度为$O(n)$。

**一般情况**：假设$p_i = \frac{1}{n}$是查找的元素在第$i$个位置上的概率（$i\in[1, \mathrm{L.length}]$），则在长度为$n$的线性表中查找指定值的元素所需比较的平均次数为
$$
\sum_{i=1}^{n}p_i\times i = \sum_{i=1}^{n}\frac{i}{n} = \frac{1}{n}\times\frac{n(n+1)}{2} = \frac{n+1}{2}
$$

综上所述，该操作的时间复杂度为$O(n)$。

:::

### 删除

**实现思路**：

删除元素，即需要从线性表所有数据中抹除掉指定的元素，抹除掉旧数据，新数据自然需要向前一位来占空，那么这一系列操作可以直接简化为：将指定元素以后的所有数据都向前一位，覆盖原来的数据。

如果想删除所有指定值的元素，则只需要将上面删除单个元素的操作重复几次即可。

**源代码**：

::: tabs#del

@tab 删除指定位置的元素#item

```c
int deletePos_seq(PseqList L, int pos) {
    if (pos >= L->length || pos < 0) {
        return -1;
    } else {
        for (int i = pos; i < L->length - 1; ++i) {
            L->element[i] = L->element[i + 1];
        }
        L->length--;
    }
    return 1;
}
```

@tab 删除所有指定值的元素#items

```c
int delete_seq(PseqList L, int x) {
    int num = 0;
    for (int i = 0; i < L->length; ++i) {
        if (L->element[i] == x) {
            deletePos_seq(L, i);
            num++;
            --i;
        }
    }
    return num;
}
```

:::

**时间复杂度**：

::: tabs#del

@tab 删除单个元素#item

**最好情况**：删除表尾元素，此时无需移动元素，时间复杂度为$O(1)$。

**最坏情况**：删除表头元素，此时需要移动除表头元素外所有元素，时间复杂度为$O(n)$。

**平均情况**：

假设$p_i=\frac{1}{n}$是删除第$i$个位置上结点的概率，则在长度为$n$的线性表中删除一个结点时，所需移动结点的平均次数为
$$
\begin{align*}
    \sum_{i=1}^{n}p_i(n-i) &= \sum_{i=1}^{n}\frac{1}{n}(n-i) \\
    &= \frac{1}{n}\sum_{i=1}^{n}(n-i) \\
    &= \frac{1}{n}\frac{n(n-1)}{2} = \frac{n-1}{2}
\end{align*}
$$

综上所述，该操作的时间复杂度为$O(n)$。

@tab 删除值为指定值的所有元素#items

**最好情况**：表中不存在指定指，此时无需做任何操作，仅仅遍历整个表，时间复杂度为$O(n)$。

**最坏情况**：表中所有元素都是指定值，此时需要执行$n$次删除操作，考虑到对于一次删除操作的平均时间复杂度为$O(n)$，该操作的时间复杂度为$O(n)\times O(n) = O(n^2)$。

**平均情况**：

假设表中有$c$个待删除的元素，则需要执行删除操作的概率为$p=\frac{1}{n}$，则表的遍历执行次数为
$$
\sum_{i=1}^{c}p(n-i+1) = p\sum_{i=1}^{c}(n-i+1) = \frac{1}{n}\frac{(2n-c+1)c}{2} = cn - \frac{1}{2}c^2+\frac{1}{2}
$$

根据删除单个元素的平均时间复杂度为$O(n)$可知删除值为指定值的所有元素的时间复杂度为$O(n)\times O(cn - \frac{1}{2}c^2+\frac{1}{2}) = O(cn - \frac{1}{2}c^2+\frac{1}{2}) = O(cn)$。

:::

### 修改

**实现思路**：

该操作仅在查找指定值操作的基础上多了一步修改的操作，即每找到一个符合条件的值时执行修改数据的操作。

**源代码**：

```c
//修改指定值
void replace_seq(PseqList L, int x, int y) {
    for (int i = 0; i < L->length; ++i) {
        if (L->element[i] == x) {
            L->element[i] = y;
        }
    }
    return;
}
```

**时间复杂度**：该操作需要比较$n$次，因此时间复杂度为$O(n)$。

### 顺序线性表的优缺点

**优点**：

1. 查询速度快，简单、运算方便，更适合小线性表或者固定长度的线性表。

**缺点**：

1. 删除和插入效率低
2. 存储空间容易出现上溢
3. 容易导致空间浪费。

## 线性表的链式表示

### 单链表

### 双链表

### 循环链表

### 静态链表