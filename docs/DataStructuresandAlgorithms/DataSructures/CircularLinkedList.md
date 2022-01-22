---
title: 循环链表
date: 2021-10-07 21:26:30
author: Breeze Shane
toc: true
mathjax: true
categories:
 - DataStructuresAndAlgorithms
tags:
 - Data Structures and Algorithms
---

## 定义

循环链表，即令单链表尾结点的指针指向链表的头结点。

结构代码的定义：「本质上与单链表的结构体定义并无差异」

```c
struct node{
    int data;
    struct node *next;
};
```

## 循环链表的出现原因

由于单链表在遍历上存在问题，而且尾结点的指针空间也并未利用起来，在需要快速访问表头和表尾的应用中，比较自然的想法就是尾结点直接连接到首结点「即第一个数据结点」。

## 循环链表的基本操作及实现

### 创建

**实现思路**：

创建空的循环链表，即只需要创建头指针和头结点，并且头指针指向头结点，头结点指向自己。

**源代码**：

```c
struct node *createRlist(){
    struct node* HEAD = (struct node*)malloc(sizeof(struct node));
    struct node* headNode = (struct node*)malloc(sizeof(struct node));
    HEAD->next = headNode;
    headNode->next = headNode;
    headNode->data = 0;
    return HEAD;
}
```

**时间复杂度**：只需要执行有限个创建的操作，因此时间复杂度为$O(1)$。

**空间复杂度**：创建时只需要申请有限固定的空间大小，与用户输入规模无关，因此空间复杂度为$O(1)$。

### 插入

**实现思路**：

思路和单链表的插入思路十分相似，因此在此不作赘述。下面给出的插入方式是按照升序方式插入。

**源代码**：

```c
//按照升序方式插入循环链表
void insertOrder(struct node *list, int insData){
    struct node* tailNode = list->next;
    struct node* headNode = tailNode->next;
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = insData;
    newNode->next = NULL;

    if (headNode == tailNode){
        tailNode->next = newNode;
        newNode->next = headNode;
        list->next = newNode;
        headNode->data++;
        return;
    }
    if (tailNode->data < newNode->data){
        newNode->next = tailNode->next;
        tailNode->next = newNode;
        list->next = newNode;
        headNode->data++;
        return;
    }

    struct node* beforeInsertposition = headNode;
    struct node* insertPosition = headNode->next;
    while (insertPosition != headNode){
        if (newNode->data < insertPosition->data)
            break;
        beforeInsertposition = beforeInsertposition->next;
        insertPosition = insertPosition->next;
    }
    beforeInsertposition->next = newNode;
    newNode->next = insertPosition;
    headNode->data++;
    return;
}
```

**时间复杂度**：对于用户输入的$n$个数据中，每插入一个数据都需要在循环链表中遍历$m$次，因此可以估计时间复杂度为$O(n^2)$。

**空间复杂度**：由于用户插入循环链表的操作是基于原有的数据上进行操作，因此可以认为空间复杂度为$O(1)$。

### 删除

**实现思路**：

遍历循环链表中的每一个结点，循环终止条件是遍历到头结点。在遍历每一结点中若值相同则进行删除操作，即删除结点的前驱指向删除结点的后继，因此需要有两个变量同步遍历链表，

**源代码**：

```c
//删除链表中所有的指定值
int deleteData(struct node  *list, int delData){
    int count = 0;
    struct node* tailNode = list->next;
    struct node* headNode = tailNode->next;
    struct node* formerWatcher = headNode;
    struct node* latterWatcher = headNode->next;
    while(latterWatcher != headNode){
        if (latterWatcher->data == delData){
            struct node* toDel = latterWatcher;
            formerWatcher->next = latterWatcher->next;
            latterWatcher = latterWatcher->next;
            free(toDel);
            count++;
            continue;
        }
        formerWatcher = formerWatcher->next;
        latterWatcher = latterWatcher->next;
    }
    headNode->data -= count;
    return count;
}
```

**时间复杂度**：遍历循环链表的每一个结点显然已有时间复杂度$O(n)$，如果每找到对应的要删除的元素，都会另外单独遍历循环链表来删除相同值的所有元素，相应的时间复杂度也是$O(n)$，因此认为时间复杂度应为$O(n^2)$。

**空间复杂度**：由于删除的操作仅需要固定的变量即可完成，因此空间复杂度为$O(1)$。

### 输出

**实现思路**：

在循环链表中，遍历每一个结点并输出其存储的数据，如果使用`do ... while`句式，终止的条件是遍历到尾结点；如果使用`for`、`while`等句式，终止的条件应该是遍历到头结点。两者并无本质区别，写法不同，只是需要保证每遍历到一个结点的时候都要能输出其相应的数据。

**源代码**：

```c
void printRlist(struct node *list){
    struct node* tempPointer = list->next->next;
    do{
        tempPointer=tempPointer->next;
        printf("%d ", tempPointer->data);
    } while (tempPointer != list->next);
}
```

**时间复杂度**：需要遍历循环链表中的每一个元素，该函数的执行次数与用户输入的数据规模线性相关，因此时间复杂度为$O(n)$。

**空间复杂度**：该函数需要申请固定的变量空间大小，因此空间复杂度为$O(1)$。

### 销毁

**实现思路**：

遍历每一个结点，并由指针变量指向该结点的后继，然后释放该结点的空间。

**源代码**：

```c
int destroyRlist(struct node *list)
{
    struct node* tailNode = list->next;
    struct node* linkSaver = tailNode->next;
    struct node* toDel = NULL;
    int delValue = 0;
    delValue = tailNode->data;
    while (linkSaver != tailNode){
        toDel = linkSaver;
        linkSaver = linkSaver->next;
        free(toDel);
    }
    free(tailNode);
    free(list);
    return delValue;
}
```

**时间复杂度**：该函数执行次数与用户的输入规模线性相关，因此可以认为时间复杂度为$O(n)$。

**空间复杂度**：该函数申请固定的空间大小，不随用户输入规模变化而变化，因此认为空间复杂度为$O(1)$。

### 查找

**实现思路**：

这里实现的思路和单链表查找的思路是完全一致的，因此不再赘述。

**源代码**：

```c
//查找指定数据是否存在链表中
int searchforData(struct node* list, int data){
    struct node* headNode = list->next;
    struct node* linkWatcher = headNode->next;
    while(linkWatcher != headNode){
        if (linkWatcher->data == data) return 1;
        linkWatcher = linkWatcher->next;
    }
    return 0;
}
```

**时间复杂度**：详细分析请查看单链表查询，这里直接给出结果$O(n)$。

**空间复杂度**：详细分析请查看单链表查询，这里直接给出结果$O(1)$。

### [关于循环链表的一些问题]()
