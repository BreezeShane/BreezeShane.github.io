---
title: 单向链表
date: 2021-10-02 22:21:39
author: Breeze Shane
toc: true
mathjax: true
category:
 - DataStructuresAndAlgorithms
tag:
 - Data Structures and Algorithms
---

## 定义

> 单链表是一种链式存取的数据结构，用一组地址任意的存储单元存放线性表中的数据元素。
>
> 单链表结构：
>
> 1. 头指针结构
> 2. 头结点结构
> 3. 数据结点

如图所示：

![](/images/DataStructuresAndAlgorithms/SingleLinkedList.png)

结构定义的代码：

```c
struct node{
    int data;
    struct node* next;
};
```

## 单链表基本操作与代码实现

### 创建

**实现思路**：

创建一个空链表，亦是新建一个头指针和一个头结点，创建时注意初始化。

头指针起指示起点作用，头结点内的数据区域用来存放当前链表的结点总数量「不含头指针和头结点本身」。

**源代码**：

```c
//创建带有头结点的单链表
struct node *mycreateList(){
	struct node* HEAD = (struct node*)malloc(sizeof(struct node));
	struct node* p = (struct node*)malloc(sizeof(struct node));
	p->data = 0;
	p->next = NULL;
	HEAD->next = p;
	if (!HEAD || !p) return NULL;
	else return HEAD;
}
```

**时间复杂度**：语句的操作次数与用户的输入规模无关，仅执行常数条语句，因此认为时间复杂度为$O(1)$。

**空间复杂度**：执行该函数只需申请固定的空间大小，因此可以认为该函数空间复杂度为$O(1)$。

### 插入

#### 在表头插入

**实现思路**：

在头结点和头结点的后一结点之间插入新的结点，考虑到指针和操作系统的特性，有关指针的操作需要注意，应该先由新结点指向头结点的后一结点，然后才能由头结点指向新结点。

**注意**：因为如果先由头结点指向新结点的话，原先头结点指向的原数据域就会完全丢失，丢失到数据流中无法找回。这是因为原数据域的地址我们本来就不知道，现在还没有指针能够指向它，那么想访问这一数据域显然无从下手。另外，这也造成了一个问题：内存泄漏「Memory Leak」，丢失的内存块我们无法访问，自然也就无法释放它，它毫无用处，却还在占用系统资源，只有当主程序运行结束后由操作系统回收才能解决这个问题。

> 内存泄漏形象的比喻是“操作系统可提供给所有程序使用的内存空间正在被某个程序榨干”，最终结果是程序运行时间越长，占用内存空间越来越多，最终用尽全部内存空间，整个系统崩溃。

**源代码**：

```c
void myinsertHead(struct node * head, int insData ){
	struct node* tmp = (struct node*)malloc(sizeof(struct node));
	tmp->data = insData;
	tmp->next = head->next;
    head->next = tmp;
}
```

**时间复杂度**：仅作有限个指针值修改等的操作，因此时间复杂度是$O(1)$。

**空间复杂度**：仅申请了一个结点空间，与用户输入的规模无关，因此时间复杂度是$O(1)$。

#### 在表尾插入

**实现思路**：

显然在表尾插入，需要先遍历到表尾才能在此基础上做插入。

**源代码**：

```c
void myinsertTail(struct node *  head , int insData ){
	struct node* tmp = (struct node*)malloc(sizeof(struct node));
	tmp->data = insData;
	tmp->next = NULL;
	struct node* pointer = head->next;
	while(pointer->next){
		pointer=pointer->next;
	}
	pointer->next = tmp;
}
```

**时间复杂度**：因为需要从表头开始一直向后遍历直到表尾，因此需要访问$n$个结点，最后指针接上新的结点，因此认为时间复杂度为$O(n)$。

**空间复杂度**：由于只需要申请常数个新变量的空间大小，因此认为空间复杂度为$O(1)$。

### 输出

**实现思路**：

遍历每一个结点，并将该结点对应的真值输出。

**源代码**：

```c
void myprintList(struct node *L){
	struct node* pointer = L->next->next;
	while(pointer){
		printf("%d\n", pointer->data);
		pointer = pointer->next;
    }
}
```

**时间复杂度**：因为需要从表头开始一直向后遍历直到表尾，因此需要访问$n$个结点，故时间复杂度为$O(n)$。

**空间复杂度**：由于只需要申请常数个新变量的空间大小，因此认为空间复杂度为$O(1)$。

### 逆置

**实现思路**：

要将链表中所有结点的顺序逆置，考虑到结点插入方式的特性，选用头插法可以实现

**源代码**：

```c
//将正序的链表倒序链接
void reverseList_link( struct node *L){
	struct node* tmp = NULL;
	struct node* saver = L->next->next->next;
	struct node* headNode = L->next, *tailNode = L->next->next;
	tailNode->next = NULL;
	while(saver){
		tmp = saver;
		saver = saver->next;
		tmp->next = headNode->next;
        headNode->next = tmp;
    }
}
```

**时间复杂度**：由于要针对$n-1$个数据进行插入操作，因此可以认为时间复杂度是$O(n)$。

**空间复杂度**：由于插入操作是基于原有空间上进行的，并且申请了有限个常数个的变量空间，因此认为空间复杂度是$O(1)$。

### 查询

#### 查询指定值的索引

**实现思路**：

查找指定值对应的索引，就需要从表头开始向后遍历，并开始从0计数，找到指定值时返回计得的数，否则返回未找到的信号「如-1等」。

**源代码**：

```c
int locateNode( struct node *L, int data){
    struct node* headNode = L->next;
    struct node* linkWatcher = headNode->next;
    int index = 0;
    while(linkWatcher){
        if (linkWatcher->data == data){
            return index;
        }
        linkWatcher = linkWatcher->next;
        index++;
    }
    return -1;
}
```

**时间复杂度**：详情可见线性表的查询分析，时间复杂度为$O(n)$。

**空间复杂度**：该操作只需要申请常数个变量，因而空间复杂度为$O(1)$。

#### 查询指定索引的值

**实现思路**：

获取用户输入的索引记为$n$，在有效范围$(0\leq n < N)$内，从表头开始向后遍历，遍历$n$次后返回指针指向的数据区域的值；若超出范围则返回未找到的信号「如-1等」。

**源代码**：

```c
int locateNode(struct node *L, int position){
    struct node* headNode = L->next;
    struct node* linkWatcher = headNode->next;
    if (position < 0 || position > headNode->data) return -1;
    for (int i = 0; i < position; ++i) {
        linkWatcher = linkWatcher->next;
    }
    return linkWatcher->data;
}
```

**时间复杂度**：详情可见线性表的查询分析，时间复杂度为$O(n)$。

**空间复杂度**：该操作只需要申请常数个变量，因而空间复杂度为$O(1)$。

### 销毁

**实现思路**：

因为链表是分散分布在内存空间中的，不能一次性批量释放，只能顺着链表一节一节地释放。

**源代码**：

```c
int destroyList(struct node *L) {
    int deletedNum = 0;
    struct node *firstNode = L->next;
    struct node *tmp = NULL;
    while (firstNode) {
        tmp = firstNode;
        firstNode = firstNode->next;
        free(tmp);
        deletedNum++;
    }
    return deletedNum;
}
```

**时间复杂度**：该操作执行次数与用户输入规模大小线性相关，因此时间复杂度为$O(n)$。

**空间复杂度**：该操作只需要在原有数据基础上进行释放空间，仅需要申请有限个变量的空间，因此空间复杂度为$O(1)$。

## 单链表的优缺点

**优点**：

1. 插入、删除操作十分简单高效。
2. 不需要指定固定的初始化空间大小。
3. 不会造成内存空间浪费。

**缺点**：

1. 查询操作低效。
2. 只能单向遍历，任何一个结点都只能访问其后继，无法访问前驱。
3. 存储元素较数组需要的内存空间更大。

## 单链表对应的一些难题-->[]()
