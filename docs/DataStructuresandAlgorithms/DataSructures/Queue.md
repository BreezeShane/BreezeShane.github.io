---
title: 队列与循环队列
date: 2021-10-6 13:39:05
author: Breeze Shane
toc: true
mathjax: true
categories:
 - DataStructuresAndAlgorithms
tags:
 - Data Structures and Algorithms
---

## 定义

队列是限制结点插入操作固定在一端进行,而结点的删除操作固定在另一端进行的一种特殊线性表，特殊在于它操作受限，仅能使用入队、出队操作。

如图所示：

![](/images/DataStructuresAndAlgorithms/Queue.png)

结构定义代码如下：

```c
#include <stdio.h>

typedef int DataType;
struct SeqQueue{
	int MAXNUM;
	int head, tail;
	DataType *list;
}
typedef struct SeqQueue* PSeqQueue;
```

### 存在的问题

如果经过某种一系列操作后，head的索引在某个非零整数上，而tail的索引到达了最后一个元素的索引。这时即使显然线性表未满，我们仍可发现我们无法继续进行插入。为了缓解这个问题，我们使用以下的队列变种——循环队列。

## 循环队列

由于我们无法完全确定索引head和tail的确切位置，因此我们就将线性的数组掰弯，构成一个闭环，从而达到循环的效果。

如图所示：

![](/images/DataStructuresAndAlgorithms/CircularQueue.png)

### 出现的问题

如果装满了元素，有可能队首和队尾重合，导致无法真正区分空与满的两个状态。

### 缓解方案

我们不会使用数组中的最后一个空间，以免导致以上问题。

## 循环队列的基本实现

### 创建

```c
//用于创建队列
PseqQueue createNullQueue_seq(int m){
    if ( !m ) return NULL;
    PseqQueue Queue = (PseqQueue)malloc(sizeof(struct seqQueue));
    Queue->MAXNUM = m;
    Queue->head = Queue->tail = 0;
    Queue->list = (DataType*)malloc(sizeof(DataType) * Queue->MAXNUM);
    return Queue;
}
```

### 入队

```c
//判断队列是否为空或者不存在
int isNullQueue_seq(PseqQueue Q){
    if ( !Q || !(Q->list) ) return -1;
    else if ( Q->head == Q->tail ) return 1;
    else return 0;
}

//判断队列是否已满
int isFullQueue_seq(PseqQueue Q){
    if ( Q->head == (Q->tail + 1) % Q->MAXNUM ) return 1;
    else return 0;
}

//进行队列的入队操作
int enQueue_seq(PseqQueue Q ,DataType x){
    if ( isNullQueue_seq(Q) == -1 || isFullQueue_seq(Q) ) return 0;
    Q->list[Q->tail % Q->MAXNUM] = x;//这里的取模是关键
    Q->tail = (Q->tail + 1) % Q->MAXNUM;
    return 1;
}
```

### 出队

```c
//进行队列的出队操作
DataType delQueue_seq(PseqQueue Q){
    if ( isNullQueue_seq(Q) ) return -1;
    int toReturn = Q->list[Q->head];
    Q->head = (Q->head + 1) % Q->MAXNUM;//这里的取模是关键
    return toReturn;
}
```

### 读取

```c
//从队首中读取元素
DataType front_seq(PseqQueue Q){
    if ( isNullQueue_seq(Q) ) return -1;
    return Q->list[Q->head];
}

//获取队列中存放元素格
DataType computeNum(PseqQueue Q){
    return (Q->tail - Q->head + Q->MAXNUM) % Q->MAXNUM;
}
```

### 销毁

```c
//销毁整个队列线性表
int destroyQueue_seq(PseqQueue Q){
    if (isNullQueue_seq(Q) == -1) return 0;
    int totalNum = Q->tail - Q->head;
    free(Q->list);
    free(Q);
    return totalNum;
}
```

## 易错点

上面写有取模是关键的两个地方是易错点，因为我们常常会忽略掉索引越界的问题，实际上应该去取模来保证不会数组越界访问。
