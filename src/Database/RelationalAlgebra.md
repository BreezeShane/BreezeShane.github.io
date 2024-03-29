---
title: 数据库的关系与关系代数
date: 2022-04-07 14:08:53
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - Database
tag: 
 - Database
---

::: details 参考

1. [外键约束详解及术语释疑](https://blog.csdn.net/cnds123/article/details/39827049)
2. [关系型数据库的三类完整性约束](https://blog.csdn.net/weixin_44915226/article/details/105711836)
3. [数据库关系模型的三类完整性约束](https://blog.csdn.net/qq_32623363/article/details/87911560)
4. [关系数据模型要素三 关系完整性约束](https://owen027.github.io/2019/09/19/integrity_constraint_of_relational/)
5. [数据库系统的关系数据结构](https://kjhhhh.github.io/2021/03/07/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%85%B3%E7%B3%BB%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/)
6. [关系数据模型要素一 （关系数据结构）](https://owen027.github.io/2019/09/09/relation_data_model/)
7. [数据库学习--关系模式](https://segmentfault.com/a/1190000017295639)
8. [数据库中几个基本概念 主码 外码](https://blog.csdn.net/u014698348/article/details/46923587)
9. [数据库中的候选码、主码、全码、外码、主属性](https://blog.csdn.net/qq_35293120/article/details/105413418)
10. [关系代数 (数据库)](https://zh.wikipedia.org/wiki/%E5%85%B3%E7%B3%BB%E4%BB%A3%E6%95%B0_(%E6%95%B0%E6%8D%AE%E5%BA%93))
11. [利用SQL语言进行结果运算与聚集运算](https://www.csdn.net/tags/MtjacgwsODc0My1ibG9n.html)
12. [SQL——聚集函数](https://www.jianshu.com/p/5e1f9b8a2ec9)
13. [数据库常用关系代数符号在 LaTeX 中的表示](https://billc.io/2020/04/latex-relational-algebra/)
14. [数据库Schema模式的理解——模式与数据库的区别](https://blog.csdn.net/FallingU/article/details/78955707)
15. [聚集函数 - IBM](https://www.ibm.com/docs/zh/was/9.0.5?topic=language-aggregation-functions)
16. [数据库关系代数的聚集函数](https://blog.csdn.net/Gosick_Geass_Gate/article/details/85794100)
17. [第9讲：结果计算与聚集计算](cnblogs.com/xzxl/p/10742584.html)
18. [Tuple - Wikipedia](https://en.wikipedia.org/wiki/Tuple#Tuples_as_nested_ordered_pairs)
19. [MDX查询学习笔记1-元组和集合](https://blog.csdn.net/doiit/article/details/89068580)
20. [What does the term "Tuple" Mean in Relational Databases?](https://stackoverflow.com/questions/751264/what-does-the-term-tuple-mean-in-relational-databases)
21. [mondrian 源码解读（二）-MDX](https://sqtds.github.io/2014/10/26/2014/mondrian-source-code-2/)
22. [多维数据表达式MDX笔记](https://www.bianchengquan.com/article/359307.html)

:::

## 关系数据结构

**候选码**: 能够唯一标识一条记录的最小属性集. 若关系中的一个属性或属性组的值能够唯一地标识一个元组, 且他的真子集不能唯一的标识一个元组, 则称这个属性或属性组做候选码. 

**主码**: 主码指主关键字. 主关键字(Primary key)是表中的一个或多个字段, 它的值用于唯一地标识表中的某一条记录. 在两个表的关系中, 主关键字用来在一个表中引用来自于另一个表中的特定记录. 主关键字是一种唯一关键字, 表定义的一部分. 一个表的主键可以由多个关键字共同组成, 并且主关键字的列不能包含空值. 

**全码**: 关系模型的所有属性组组成该关系模式的候选码, 称为全码. 

**外码**: 若关系中的某个属性是其他关系中的主码, 则这个属性称为外码. 

**主属性**: 包含在任一候选码中的属性称主属性. 

**非主属性**: 不包含在任何侯选码中的属性称为非主属性(Non-Prime attribute)或非码属性(Non-key attribute)

::: tip 注意

主码是唯一标识, 候选码是可以作为主码的码, 主码一定是候选码的子集, 但候选码不一定是主码. 

:::

**关系模式**: 关系模式（Relation Schema）是对关系的描述,它可以形式化地表示为: $R(U, D, dom, F)$. 其中$R$为关系名, $U$为组成该关系的属性名集合, $D$为属性组$U$中属性所来自的域, $dom$为属性向域的映象集合, $F$为属性间数据的依赖关系集合. 

通常简记为: $R(U)$或$R(A_1, A_2, \dots, A_n)$, 其中$R$为关系名, $U$为属性名集合, $A_1, A_2, \dots, A_n$为各属性名. 

**关系数据库**: 在一个给定的应用领域中, 所有关系的集合构成一个关系数据库

## 关系数据模型

### 关系完整性约束

关系模型中有三类完整性约束, 分别是: 实体完整性, 参照完整性, 用户定义完整性. 

#### 实体完整性

**定义**: 实体完整性是用于保证关系数据库中每个元组都是可区分的, 唯一的. 

::: tip

若属性$A$是基本关系$R$的主属性, 则$A$不能取空值$\mathrm{NULL}$. 

:::

#### 参照完整性

参照完整性约束就是定义外码和主码之间的引用规则, 是对关系间引用数据的一种限制. 

若属性（属性组）$X$是基本关系$R$的外码, 它与基本关系$S$的主码$Y$对应, 那么$R$中每个元组在$X$上的值要么取$\mathrm{NULL}$, 要么等于$S$中对应元组的主码值. $R$和$S$可以是不同的关系, 也可以是同一关系. 

::: details 为什么可以是同一关系?

(这里是施工现场, 我正在填坑了, 您先等等, 别着急......ToT)

:::

#### 用户定义完整性

此约束是针对某一应用环境的完整性约束条件, 反映了某一具体应用所涉及的数据应满足的要求. 关系模型提供定义和检验的机制, 此类规则一般在建立数据库表的同时进行定义, 如果某些条件未建立在库表一级, 则应在各个模块的具体编程中通过程序进行检查和控制. 

### 关系操作

数据库的关系操作如下: 

 - **查询**: 选择、投影、连接、除、并、差、交、笛卡尔积. 

 - **数据更新**: 插入、删除、修改. 

其中选择、投影、并、差、笛卡尔积是五种基本操作. 

::: info 关系运算符

|符号|含义|符号|含义|符号|含义|
|:--:|:--:|:--:|:--:|:--:|:--:|
|$\times$|笛卡尔积|$\div$|除|$⟖$|右外连接|
|$\cup$|并|$\prod$|投影|$⟗$|全外连接|
|$\cap$|交|$\sigma$|选择|$\ltimes$|左半连接|
|$-$|差|$\rho$|重命名|$\rtimes$|右半连接|
|$\bowtie$|连接|$⟕$|左外连接|$\triangleright$|反连接/反半连接|

:::

大多运算我们都很熟悉, 在此不作赘述. 我们特别地讲解投影, 除, 选择, 连接和重命名.

**选择**: 

在关系$R$中选择满足给定条件的元组: 

$$
\sigma_C(R) = \{ t | t\in R \wedge C(t)=\mathrm{true} \}
$$

其中$C$是一个逻辑表达式, 表示选择条件, 基本形式是: $X\theta Y$. 这里的$\theta$表示比较关系. 

**投影**: 

从$R$中选择出若干属性列组成新的关系: 

$$
\Pi_L(R)= \{ t[L] | t \in R \}
$$

其中, $L$为$R$中的属性(属性组).

**重命名**: 

重命名关系或属性: 

$$
\rho_{S(A_1, A_2, \dots, A_n)}(R)
$$

将关系R重命名为S, 属性依次重命名为$A_1, A_2, \dots, A_n$. 

**元组连接**: 

若存在$m$目关系$R$和$n$目关系$S$, 有$t_r\in R$, $t_s\in S$, 则我们有$m+n$列的元组$\widehat{t_rt_s}$, 其中前$m$个属性为关系$R$中的属性, 后$n$个属性为关系$S$中的属性. 

::: tip 

笛卡尔积可以用连接写成如下形式: 

$$
R\times S = \{ \widehat{t_rt_s} | t_r \in R \wedge t_s \in S \}
$$

:::

**条件连接**: 

从两个(或多个)关系的笛卡尔积中选取属性间满足指定条件的元组: 

$$
R \bowtie_{A\theta B} S = \{ \widehat{t_rt_s} | t_r\in R, t_s\in S, t_r[A]\theta t_s[B] \}
$$

其中$\theta$表示比较关系.

特别地, 当$\theta$是$=$时, 这样的连接叫作**等值连接**.

$$
R \bowtie_{A=B} S = \{ \widehat{t_rt_s} | t_r\in R, t_s\in S, t_r[A] = t_s[B] \}
$$

等值连接中还有特殊的连接叫作**自然连接**. 自然连接是: 默认进行比较的分量是两个关系中相同的属性组, 并且在查询结果中去掉重复的属性列的等值连接. 

$$
R \bowtie S = \{ t \cup s : t \in R, s \in S, f (t \cup s) \}
$$

其中$f(r)$是对于二元关系$r$为真的谓词, 当且仅当$r$是函数二元关系. 

::: tip 提示

请多注意**等值连接**和**自然连接**两个定义式之间的区别, 去掉重复的属性列是体现在$t_r[B] = t_s[B]$上的.

:::

**外连接**: 

 - **左外连接**: 结果集包括R的所有行, 而不仅仅是连接列所匹配的行. 如果R的某行在S中没有匹配行, 则在相关联的结果集行中右表的所有选择列表列均为空值, 记为$R⟕S$. 
  
    形式化定义为: 

 - **右外连接**: 结果集包括S的所有行, 而不仅仅是连接列所匹配的行. 如果S的某行在R中没有匹配行, 则在相关联的结果集行中左表的所有选择列表列均为空值, 记为$R⟖S$

::: details 课外知识

与外连接相像的连接是**半连接**, 半连接也分左半连接和右半连接. 

左半连接的形式化定义如下: 
$$
R \ltimes S = \{ t | t \in R, s \in S, f (t \cup s) \}
$$
其中$f(r)$是对于二元关系$r$为真的谓词, 当且仅当$r$是函数二元关系. 

同理, 右半连接的形式化定义为: 
$$
R \rtimes S = \{ s | t \in R, s \in S, f (t \cup s) \}
$$
其中$f(r)$是对于二元关系$r$为真的谓词, 当且仅当$r$是函数二元关系. 

相应地, 我们还有**反连接**的概念, 形式化定义如下: 

$$
R \triangleright  S = \{ t | t \in R \land \neg \exists s \in S : f (t \cup s) \}
$$

另外, 反连接还可以定义为半连接的补集, 形式化定义如下: 
$$
R \triangleright S = R - R \ltimes S
$$
为此反连接有时叫做反半连接.

:::

**除运算**: 

形式化定义为: 

$$
R ÷ S = \bigg\{ t[a_1,\dots,a_n] \Big| t \in R \wedge \forall s \in S \Big( (t[a_1,\dots,a_n] \cup s) \in R\Big) \bigg\}
$$

这里的${a_1,\dots,a_n}$是唯一于R的属性名字的集合, $t[a_1,\dots,a_n]$是$t$到这个集合的限制(投影). 

::: details 理解有困难?

应该注意到, 这里的$t$和$s$都是被视作集合的, 因此进行运算$t[a_1,\dots,a_n] \cup s$后得到的是合并两个行后得到的新行, 如果这个新行仍然属于关系$R$, 而且这一运算对每一行$s$都能成立的话, 这个行的投影$t[a_1,\dots,a_n]$是集合$R\div S$的一个元素. 

关于元组与行的含义, 在[StackOverflow](https://stackoverflow.com/questions/751264/what-does-the-term-tuple-mean-in-relational-databases)上可以看到相关描述: 

> However, a row is not a tuple. Tuples are unordered sets of known values with names. 
> 
> A row is an ordered set of known or unknown values with names (although they may be omitted).

而且相关的说法我们也能在[Wiki](https://en.wikipedia.org/wiki/Tuple#Tuples_as_nested_ordered_pairs)上找到.

因此, 我们应该明白, 元组是无序集合, 而具体的行则是有序集合. 

:::

### 扩展的关系代数操作符

**去重操作符**: $\delta(\cdot)$用于去除关系中重复的元组. 

**排序操作符**: $\tau_L(\cdot)$用于给关系进行关于属性(属性组)$L$的排序.

**分组操作符**: $\gamma_L(\cdot)$用户将关系按照属性(属性组)$L$的值进行分组, 针对每一个分组产生新的元组.

**聚集操作符**: 多数数据库包括五个聚集函数, 这些运算是Sum、Count、Average、Maximum和Minimum. 

### 关于SQL聚集函数要注意的语法问题

1. 当SQL查询使用分组的时候, 需要保证出现在`select`语句中但没有被聚集的属性只能是出现在`group by`子句中的那些属性, 任何没有出现在`group by`子句中的属性如果出现在`select`子句中的话, 它只能出现在聚集函数的内部, 否则这样的查询就是错误的. 
2. 任何出现在`having`子句中, 但没有被聚集的属性必须出现在`group by`子句中, 否则查询就被当成是错误的. 

::: tip

包含聚集、`group by`或者`having`子句(分组过滤子句)的查询的含义可通过下述操作序列定义: 
1. 根据`from`子句计算出一个关系.
2. 如果出现`where`子句, `where`子句的谓词将应用到`from`子句的结果上.
3. 如果出现`group by`子句, 满足`where`子句的元组通过`group by`子句形成分组. 如果没有`group by`子句, 满足`where`谓词的整个元组集被当做一个分组.
4. 如果出现`having`子句, 他将应用到每个分组上；不满足`having`子句谓词的分组将被抛弃.
5. `select`子句利用剩下的分组产生出查询结果中的元组, 即每个分组上应用聚集函数来得到单个关系元组.

:::

顺便谈一个新手都容易犯的错误: 
```sql
select S from SC where Score < 60 and count(*) > 2 group by S;
```
起初我非常不理解这样为什么会行不通, 后来才知道, 这是因为where子句是对每一个元组进行条件过滤, 而聚集函数则是对一个分组(集合)进行条件过滤, 用途和针对的对象类型不一样, 故聚集函数不应出现在这里. 

::: tip having子句与where子句表达条件的区别

 - 对每一**元组**检查满足与否的条件要用where子句表达.
 - 对每一**分组**检查满足与否的条件要用having子句表达.
 - `having`子句需要`Group by`子句支持, 没有`Group by`子句的话就不能使用`having`子句.

:::