---
title: 底层原因
date: 2021-10-3 17:29:15
article: false
author: Breeze Shane
toc: true
mathjax: true
categories:
 - DataStructuresAndAlgorithms
tags:
 - Data Structures and Algorithms
---

## 指针变量写法

```c
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

## 临时变量写法

```c
struct seqList createNullList_seq(int m){
    struct seqList HEAD;
    HEAD.MAXNUM = m;
    HEAD.curNum = 0;
    HEAD.element = (DataType *)malloc(sizeof(DataType) * HEAD.MAXNUM);
    return HEAD;
}
```

## 为什么不采用临时变量写法？

**一方面来说**，在临时变量的写法中，HEAD变量是向系统申请了函数栈内的空间，修改了成员数据后在执行return语句的时候，系统会原封不动地将HEAD变量复制到新的空间内，然后再回收掉整个函数栈。这意味着，你在外部访问到的变量已经不是这个函数内的变量了，而是它的复制版。**那么复制到新的空间又是复制到哪里去了？**答案是具体看你的代码逻辑。

如果你在外部这样写：

```c
int function() {
    struct seqList head = createNullList_seq(5);
    head.element[0] = 5;
    head.curNum = 1;
    printList_seq(head);
}
```

那么`createNullList_seq`函数内的HEAD变量就会复制到function函数内的栈空间中。

然而如果这样写：

```c
int main() {
    struct seqList* head;
    *head = createNullList_seq(5);
    head->element[0] = 5;
    head->curNum = 1;
    printList_seq(head);
}
```

则是复制到堆空间内了。

这意味着，如果多个函数相互调用，会造成栈空间的浪费，因为对于每一个函数来说，每调用其它函数一次都要占用掉一部分栈空间。而使用指针变量写法可以避免进行大量不必要的复制行为。

**另一方面来说**，临时变量的写法是将这个临时变量交给操作系统来管理，程序员将无法控制它，这意味着可能在某些时候系统认为它已失去作用，这时它将被回收，而这会导致此后如果再访问使用它将成为非法行为。但使用指针变量写法可以保证你申请的空间不会被意外回收，你拥有管理它的一切权限。

<center><font size="6" color="#f2be45"><strong>综上所述，我们认为<br>使用指针变量的写法要优于使用临时变量写法。</strong></font></center>
