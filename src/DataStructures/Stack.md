---
title: 栈
date: 2023-04-14 18:56:39
author: Breeze Shane
toc: true
mathjax: true
category:
 - DataStructuresAndAlgorithms
tag:
 - Data Structures and Algorithms
---
栈是只允许在一段进行插入或删除操作的线性表。

对于栈有以下三个概念：
1. 栈顶：线性表允许进行插入删除操作的一端。
2. 栈底：固定的、不允许插入删除操作的一端。
3. 空栈：不含任何元素的空表。

栈的操作特性可以明显地概括为**后进先出**。

::: tip 考研中可直接使用的栈的基本操作

1. InitStach(&S): 初始化一个空栈
2. StackEmpty(S): 判断栈是否为空
3. Push(&S, x): 入栈
4. Pop(&S, &x): 出栈
5. GetTop(S, &x): 读栈顶元素
6. DestroyStack(&S): 销毁栈

:::

## 栈的数学性质

$n$个不同元素入栈，出栈元素不同排列的个数为
$$
\frac{1}{n+1}C_{2n}^{n}
$$
上述公式称为卡特兰数(Catalan)，这一点可以使用数学归纳法证明。

## 栈的顺序存储结构

顾名思义，就是使用顺序线性表来实现栈的功能。

结构体定义如下：

```c
typedef int ElemType;
enum { MAX_SIZE = 50 };
typedef struct {
  ElemType data[MAX_SIZE];
  int top;
} SqStack, *PSqStack;
```

其中`SqStack.top`为栈顶指针，初始时设置`SqStack.top = -1`（也可设置为`SqStack.top = 0`），栈顶元素为`SqStack.data[SqStack.top]`。

`SqStack.top`初始化为`-1`和`0`在操作上存在差别（但不大），以下基本操作中会分别讨论。

### 初始化

::: code-tabs#stack

@tab top = -1

```c
void InitStack(PSqStack S){
  S->top = -1;
}
```

@tab top = 0

```c
void InitStack(PSqStack S){
  S.top = 0;
}
```

:::

### 判断空栈

::: code-tabs#stack

@tab top = -1

```c
int StackEmpty(PSqStack S){
  if (S->top == -1) return 1;
  else return 0;
}
```

@tab top = 0

```c
int StackEmpty(PSqStack S){
  if (S->top == 0) return 1;
  else return 0;
}
```

:::

### 入栈

::: code-tabs#stack

@tab top = -1

```c
int Push(PSqStack S, ElemType x){
  if (S->top == MAX_SIZE-1) return 0;
  S->data[++S->top] = x;
  return 1;
}
```

@tab top = 0

```c
int Push(PSqStack S, ElemType x){
  if (S->top == MAX_SIZE) return 0;
  S->data[S->top++] = x;
  return 1;
}
```

:::

### 出栈

::: code-tabs#stack

@tab top = -1

```c
int Pop(PSqStack S, ElemType *x){
  if (StackEmpty(S)) return 0;
  *x = S->data[S->top--];
  return 1;
}
```

@tab top = 0

```c
int Pop(PSqStack S, ElemType *x){
  if (StackEmpty(S)) return 0;
  *x = S->data[--S->top];
  return 1;
}
```

:::

### 读栈顶元素

```c
int GetTop(PSqStack S, ElemType *x){
  if (StackEmpty(S)) return 0;
  *x = S->data[S->top];
  return 1;
}
```

## 顺序栈的特殊情形——共享栈

利用栈底位置不变的特性，可让两个顺序栈共享一个一维数组空间，将两个栈的栈底分别设置在共享空间的两端，两者的栈顶向共享空间的中间延伸。

使用共享栈是为了更有效地利用存储空间，两个栈的空间相互调节，只有在整个存储空间被占满时才发生上溢。

结构定义：
```c
typedef int ElemType;
enum { MAX_SIZE = 100 };
typedef struct {
    ElemType data[MAX_SIZE];
    int topA;
    int topB;
} SStack, *PSStack;
```

### 初始化

```c
void InitSharedStack(PSStack S){
    S->topA = -1;
    S->topB = MAX_SIZE;
}
```

### 判断空栈

```c
int StackAEmpty(PSStack S){
    if (S->topA == -1)
        return 1;
    else
        return 0;
}

int StackBEmpty(PSStack S){
    if (S->topB == MAX_SIZE)
        return 1;
    else
        return 0;
}
```

### 判断满栈

实现思路：仅当两个栈的栈顶元素相邻时，这个共享栈的空间就被占满。

```c
int isFullSharedStack(PSStack S){
    if (S->topB - S->topA == 1)
        return 1;
    else
        return 0;
}
```

### 入栈

```c
int PushA(PSStack S, ElemType x){
    if (isFullSharedStack(S)) return 0;
    S->data[++S->topA] = x;
    return 1;
}

int PushB(PSStack S, ElemType x){
    if (isFullSharedStack(S)) return 0;
    S->data[--S->topB] = x;
    return 1;
}
```

### 出栈

```c
int PopA(PSStack S, ElemType *x){
    if (StackAEmpty(S)) return 0;
    *x = S->data[S->topA--];
    return 1;
}

int PopB(PSStack S, ElemType *x){
    if (StackBEmpty(S)) return 0;
    *x = S->data[S->topB++];
    return 1;
}
```

### 读栈顶元素

```c
ElemType GetTopA(PSStack S, ElemType *x){
    if (StackAEmpty(S)) return 0;
    *x = S->data[S->topA];
    return 1;
}

ElemType GetTopB(PSStack S, ElemType *x){
    if (StackBEmpty(S)) return 0;
    *x = S->data[S->topB];
    return 1;
}
```

## 栈的链式存储结构

采用链式存储的栈称为**链栈**。链栈的优点是便于多个栈共享存储空间并提高其效率，且不存在栈满上溢的情况。

链栈通常使用单链表实现，并且规定所有操作都是在单链表的表头进行的。这里规定链栈没有头结点，头指针直接指向栈顶元素。

```c
typedef struct LinkStackNode{
  ElemType data;
  struct LinkStackNode* next;
} *LStack;
```

采用链式存储，便于结点的插入与删除操作。插入操作与单链表的头插法相同；删除操作也与头插法类似。
