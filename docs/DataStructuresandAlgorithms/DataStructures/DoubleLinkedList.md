---
title: 双链表
date: 2021-10-14 19:26:31
author: Breeze Shane
toc: true
mathjax: true
categories:
 - DataStructuresAndAlgorithms
tags:
 - Data Structures and Algorithms
---
## 定义

双链表，即表中每一个结点都有两个指针，分别指向前驱和后继。

结构代码的定义：
```c
struct node {
    int data ;
    struct node *llink, *rlink ;
};
```
如果希望对双链表做一次封装，可以额外使用如下的代码：
```c
struct Hnode {
    struct node *head, *tail;
};
```

双链表的出现是为了解决单链表不能直接访问前驱的问题。

## 双向炼表的基本操作与实现

### 创建

**实现思路**：


创建好相关的封装，并在此基础上创建双链表中的头结点，彼此相连构建成一个空的双链表。

**源代码**：

```c
struct Hnode *createDlist() {
    struct Hnode* HEAD = (struct Hnode*) malloc(sizeof (struct Hnode));
    struct node* headNode = (struct node*) malloc(sizeof(struct node));
    headNode->data = 0;
    headNode->llink = NULL;
    headNode->rlink = NULL;
    HEAD->head = headNode;
    HEAD->tail = headNode;
    return HEAD;
}
```

**时间复杂度**：该函数仅做有限的操作，显然时间复杂度为$O(1)$。

**空间复杂度**：该函数申请的空间大小与用户输入规模不相关，因此认为空间复杂度为$O(1)$。

### 插入

**实现思路**：

如果双链表为空，则需完成如下的操作：

1. 头结点指向新结点
2. 新结点左指针指向头结点
3. 封装的尾指针指向尾结点

如果双链表非空，则需按照如下顺序执行：

1. 头结点后继的左指针指向新结点
2. 新结点右指针指向头结点后继
3. 新结点左指针指向头结点
4. 头结点右指针指向新结点

**「注意」**：该情况下第四点必须要在第一、二点之后做，其他顺序任意调整即可。

**源代码**：

```c
void insertDlist(struct Hnode *list, int insData) {
    struct node* headNode = list->head;
    struct node* newNode = (struct node*) malloc(sizeof (struct node));
    newNode->data = insData;

    if (headNode == list->tail){
        headNode->rlink = newNode;
        newNode->llink = headNode;
        list->tail = newNode;
    } else {
        headNode->rlink->llink = newNode;
        newNode->rlink = headNode->rlink;
        newNode->llink = headNode;
        headNode->rlink = newNode;
    }
    headNode->data++;
}
```

**时间复杂度**：该插入操作执行次数与用户输入规模不相关，每一次插入都是固定执行这些语句，因此认为时间复杂度为$O(1)$。

**空间复杂度**：该插入操作只需要申请固定变量所占的空间大小，因此认为该操作空间复杂度为$O(1)$。

### 删除

**实现思路**：

遍历每一个结点，找到要删除的数据时，将其前驱的右指针指向该结点的后继，其后继的左指针指向该结点的前驱，然后释放该空间。

**源代码**：

```c
int deleteData(struct Hnode  *list, int delData) {
    struct node* watcher = list->head->rlink;
    struct node* toDel = NULL;
    while (watcher) {
        if (watcher->data == delData){
            toDel = watcher;
            watcher->llink->rlink = watcher->rlink;
            watcher->rlink->llink = watcher->llink;
            free(toDel);
            return 1;
        }
        watcher = watcher->rlink;
    }
    return 0;
}
```

**时间复杂度**：该操作执行次数与用户输入的规模线性相关，显然时间复杂度为$O(1)$。

**空间复杂度**：该操作只需要在原有数据的基础上做操作，申请固定的变量空间大小，因此空间复杂度为$O(1)$。

### 输出

**实现思路**：

遍历每一个结点并输出，终止条件应该是指针为空时。

**源代码**：

```c
void printDlist(struct Hnode *list) {
    //输出双向循环链表中各数据元素的值，每输出一个数据元素换行
    struct node* watcher = list->head->rlink;
    while(watcher){
        printf("%d\n", watcher->data);
        watcher = watcher->rlink;
    }
}
```

**时间复杂度**：该操作与用户输入规模线性相关，因此时间复杂度为$O(1)$。

**空间复杂度**：该操作只需要在原有数据的基础上做操作，申请固定的变量空间大小，因此空间复杂度为$O(1)$。

### 销毁

**实现思路**：

遍历每一个结点，执行删除操作，删除操作与上面的删除指定数据的结点思路是一致的。

**源代码**：

```c
int destroyDlist(struct Hnode *list) {
    int delNum = 0;
    struct node* watcher = list->head->rlink;
    struct node* toDel = NULL;
    while (watcher->rlink){
        toDel = watcher;
        watcher->llink->rlink = watcher->rlink;
        watcher->rlink->llink = watcher->llink;
        watcher = watcher->rlink;
        free(toDel);
        delNum++;
        list->head->data--;
    }
    free(list->head);
    free(list->tail);
    list->head = list->tail = NULL;
    delNum++;
    return delNum;
}
```

**时间复杂度**：由于需要遍历用户输入的所有数据，执行次数与用户输入规模线性相关，因此时间复杂度为$O(n)$。

**空间复杂度**：由于删除操作只需要使用固定的变量空间，因此认为空间复杂度为$O(1)$。

## 双向链表优缺点

**优点**：

1. 可以找到前驱和后继，向前遍历和向后遍历。
2. 在当前结点前面、后面插入操作方便
3. 针对前驱、后继以及结点本身的删除操作方便。

**缺点**：

1. 增加删除结点操作复杂。
2. 较单链表需要占据更多的指针空间。
3. 存储密度较单链表低。
