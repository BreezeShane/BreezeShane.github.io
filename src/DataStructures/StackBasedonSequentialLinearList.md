---
title: 顺序线性栈
date: 2021-12-22 16:45:35
author: Breeze Shane
toc: true
mathjax: true
category:
 - DataStructuresAndAlgorithms
tag:
 - Data Structures and Algorithms
---
## 栈的定义

栈是一种特殊的线性表，特殊在于该线性表的操作是受限的，只能访问与操作栈顶元素。

## 顺序线性栈的定义

顾名思义，就是使用顺序线性表来实现栈的功能。

结构体定义如下：

```c
typedef int DataType;
struct seqStack {
  int MAXNUM;
  int top;
  DataType *element;
};

typedef struct seqStack* PseqStack;
```

## 顺序线性栈的基本操作与实现

### 创建

**实现思路**：



**源代码**

```c
PseqStack createNullStack_seq(int m) {
    if ( m <= 0 ) return NULL;
    PseqStack stack = (PseqStack)malloc(sizeof(struct seqStack));
    stack->MAXNUM = m;
    stack->top = 0;
    stack->element = (DataType*)malloc(sizeof(DataType) * stack->MAXNUM);
    return stack;
}
```

**时间复杂度**：

**空间复杂度**：

### 入栈

**实现思路**：


**源代码**

```c
int isNullStack_seq(PseqStack L) {
    if ( !L )  return -1; 
    else if ( L->top - 1 < 0) return 1;
    else return 0;
}


//第三关 
int isFullStack_seq(PseqStack L) {
    if ( L->top == L->MAXNUM ) return 1;
    else return 0;
}


//第四关
int push_seq(PseqStack L ,DataType x) {
    if ( isNullStack_seq(L) == -1 || isFullStack_seq(L) ) return 0;
    else {
      L->element[L->top] = x;
      L->top++;
      return 1;
    }
}
```

**时间复杂度**：

**空间复杂度**：

### 出栈

**实现思路**：


**源代码**

```c
DataType pop_seq(PseqStack L) {
    if ( !(L->top) ) return -1;
    int temp = L->element[L->top - 1];
    L->top--;
    return temp;
}
```

**时间复杂度**：

**空间复杂度**：

### 读取栈顶元素

**实现思路**：


**源代码**

```c
DataType top_seq(PseqStack L) {
  if ( isNullStack_seq(L) ) return -1;
  return L->element[L->top -1];
}
```

**时间复杂度**：

**空间复杂度**：

### 销毁栈

**实现思路**：


**源代码**

```c
int destroystack_seq(PseqStack L) {
    if ( isNullStack_seq(L) == -1 ) return 0;
    free(L->element);
    return L->top;
}
```

**时间复杂度**：

**空间复杂度**：

## 顺序线性栈的优缺点

**优点**：

**缺点**：
