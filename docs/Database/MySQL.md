---
title: MySQL初步使用
date: 2022-03-03 20:06:48
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Web
 - Database
tags: 
 - Web
 - Database
---

::: details 参考

1. [MySQL 创建数据库](https://www.runoob.com/mysql/mysql-create-database.html)
2. [MySQL 创建数据表](https://www.runoob.com/mysql/mysql-create-tables.html)
3. [MySQL创建数据表（CREATE TABLE语句）](http://c.biancheng.net/view/2430.html)
4. [MySQL 数据类型](https://www.runoob.com/mysql/mysql-data-types.html)
5. [Mysql 导入文件提示 --secure-file-priv option 问题](https://www.cnblogs.com/Braveliu/p/10728162.html)
6. [mysql 查看当前使用的配置文件my.cnf的方法](https://blog.csdn.net/fdipzone/article/details/52705507)
7. [MySQL my.cnf file - Found option without preceding group](https://stackoverflow.com/questions/8020297/mysql-my-cnf-file-found-option-without-preceding-group)
8. [解决方法MySQL ERROR 3948 (42000): Loading local data is disabled;  this must be enabled on both the](https://blog.csdn.net/qq_32834005/article/details/110443574)
9. [Mysql——将CSV文件导入表中](https://zhuanlan.zhihu.com/p/26964403)
10. [MYSQL：如何清空表中的数据](https://blog.csdn.net/qq_29229567/article/details/82743645)
11. [MySQL 删除数据表](https://www.runoob.com/mysql/mysql-drop-tables.html)
12. [数据库索引到底是什么, 是怎样工作的？](https://blog.csdn.net/weiliangliang111/article/details/51333169)
13. [深入浅出数据库索引原理](https://zhuanlan.zhihu.com/p/23624390)
14. [说一下聚簇索引 & 非聚簇索引](https://juejin.cn/post/6844903845554814983)
15. [MySQL：聚簇索引的优缺点](https://zhuanlan.zhihu.com/p/388252001)
16. [索引 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1177760294764384/1218728442198976)
17. [数据库索引的知识点, 你所需要了解的都在这儿了](https://segmentfault.com/a/1190000023314270)
18. [你真的会使用数据库的索引吗？](https://developer.huawei.com/consumer/cn/forum/topic/0202699338499720961?fid=0101592429757310384)
19. [16 个该搞定的数据库索引问题！](https://www.51cto.com/article/696360.html)
20. [数据库索引原理, 读懂这篇文章就可以跟面试官掰掰手腕了！](https://www.modb.pro/db/134175)
21. [数据库--视图的基本概念以及作用](https://blog.csdn.net/buhuikanjian/article/details/53105416)
22. [数据库视图是什么？视图的作用？](https://zhuanlan.zhihu.com/p/372569011)
23. [SQL模糊查询的四种匹配模式](https://cloud.tencent.com/developer/article/1492397)
24. [数据库学习 - like（模糊查询）](https://blog.csdn.net/linan_pin/article/details/70154416)
25. [MySQL 数据库 like 语句通配符模糊查询小结](https://bbs.huaweicloud.com/blogs/242256)
26. [如何实现mysql数据库单表多字段的模糊查询？](https://uhomework.com/%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0mysql%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8D%95%E8%A1%A8%E5%A4%9A%E5%AD%97%E6%AE%B5%E7%9A%84%E6%A8%A1%E7%B3%8A%E6%9F%A5%E8%AF%A2%EF%BC%9F/)
27. [Mysql单表多字段模糊查询](https://blog.csdn.net/qq_42301094/article/details/103296338)
28. [MySQL模糊搜索的几种姿势](https://www.51cto.com/article/614332.html)
29. [MySQL模糊查询用法大全（正则、通配符、内置函数等）](https://blog.csdn.net/qq_39390545/article/details/106414765)
30. [讲一讲加密数据如何进行模糊查询](https://ningyu1.github.io/20201230/encrypted-data-fuzzy-query.html)
31. [Can anyone explain how this regex [ -~] matches ASCII characters?
2014/02/04 (186 words)](https://boyter.org/2014/02/explain-regex-matches-ascii-characters/)


:::

## MySQL安装与配置

近期上课需要使用MySQL, 因此我需要提前做好配置, 特此一记：

安装仅需一步：
```shell
sudo pacman -S mysql
```

然后就可以开始进行配置, 按照其输出的内容, 我们执行：

```shell
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

::: tip

如果遇到如下报错：
```shell
mysqld: Can't create directory '/var/lib/mysql/' (OS errno 17 - File exists)
2022-03-03T00:15:00.207164Z 0 [Warning] [MY-010915] [Server] 'NO_ZERO_DATE', 'NO_ZERO_IN_DATE' and 'ERROR_FOR_DIVISION_BY_ZERO' sql modes should be used with strict mode. They will be merged with strict mode in a future release.
2022-03-03T00:15:00.207238Z 0 [System] [MY-013169] [Server] /usr/bin/mysqld (mysqld 8.0.28) initializing of server in progress as process 283212
2022-03-03T00:15:00.209622Z 0 [ERROR] [MY-013236] [Server] The designated data directory /var/lib/mysql/ is unusable. You can remove all files that the server added to it.
2022-03-03T00:15:00.209733Z 0 [ERROR] [MY-010119] [Server] Aborting
2022-03-03T00:15:00.209929Z 0 [System] [MY-010910] [Server] /usr/bin/mysqld: Shutdown complete (mysqld 8.0.28)  Source distribution.
```

什么也不用考虑, 删除掉`/var/lib/mysql/`这个文件夹即可

:::

命令执行成功后请留意一下输出的内容, 这里会给你默认的MySQL用户及其密码, 我们需要特别记下这两个. 

然后就需要启动MySQL服务, 执行这两个命令：
```shell
sudo systemctl enable mysqld
sudo systemctl start mysqld
```

以普遍的理性而言, 这类的密码是反人类的, 因此我们需要修改一下登录密码, 先执行这个命令来连接数据库：

```shell
mysql -uroot -p
```

然后输入刚才记下的那个复杂的密码, 便可成功连接. 

在这时你执行命令`use mysql;`会得到类似这样的提示：

```mysql
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
```

所以我们可以根据提示执行这个命令：
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```

这样就可以成功修改密码了, MySQL的安装与配置也到此结束了. 

## MySQL初步使用

首先我们先连接数据库. 要使用数据库, 就需要先从新建数据库开始, 搜过之后, 就知道要使用下面一系列命令：

```mysql
CREATE DATABASE <NAME_OF_DB>; # 创建新数据库
use <NAME_OF_DB>; # 此处开始指定使用的数据库, 这是每次连接数据库需要做的一步. 
CREATE TABLE <NAME_OF_TB> （ COL_1 TYPE_1, COL_2 TYPE_2 ... ）; # 创建新数据表, 并分别指定COL_1和COL_2等的数据类型分别为TYPE_1和TYPE_2等. 
```

## MySQL导入本地文件数据

本来这件事应该很简单的, 执行这个语句就应该结束一切的：

```mysql
LOAD DATA INFILE 'PATH_TO_MY_FILE' INTO TABLE <NAME_OF_TB> FIELDS TERM INATED BY ',' LINES TERMINATED BY '\n'  GNORE 1 ROWS;
```

但就在这里报了错：

::: danger

The MySQL server is running with the --secure-file-priv option so it cannot execute this statement.

:::

然后经过我的长时间搜索之后了解到：MySQL在安装的时候是会限制导入和导出的目录权限的, 仅在规定的目录下才可以导入. 我们可以用`SHOW VARIABLES LIKE "secure_file_priv";`来查看这个变量的值应该是什么, 结果果然能看到这时的状态是NULL. 

::: tip secure_file_priv各值代表的意义

NULL：表示禁止, 不接受任何形式的导入. 

某目录：仅接受该目录下的文件, 甚至不接受其子文件夹与其内含的文件. 

空：不做限制, 接受任何目录的导入. 

:::

那么我要解决这个问题就必须要去修改配置文件了. 这里又花了我较长时间才找到其配置文件所在的路径：

1. /etc/my.cnf
2. /etc/mysql/my.cnf
3. /usr/local/etc/my.cnf
4. ~/.my.cnf

这四个是MySQL默认会搜寻的路径, 并且从上到下优先级是逐级降低. 

于是我二话不说直接用管理员身份创建了`/etc/my.cnf`文件, 正满怀期待地保存希望能够成功, 当我执行`sudo systemctl restart mysqld`命令来重启MySQL服务的时候, 它挂了……

当我执行`mysql -uroot -p`的时候它给出了如下报错：

::: danger

ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/run/mysqld/mysqld.sock' (2)

:::

简单搜索了一下, 这个其实意思就是MySQL服务启动失败, 因此无法建立联接. 当我尝试使用`systemctl status mysqld`来查看日志, 接着看到了下面的报错：

::: danger

ERROR Found option without preceding group in config file /etc/my.cnf.

:::

搜索了几下后我才发现, 原来是缺少了`[mysqld]`这个内容, 粗略地看了一下, 应该就是Group的一种标志, 这个mysqld应该是Group的名字. 于是这个文件最后长的样子应该是下面的：

```mysql
[mysqld]
secure_file_priv = 
```

这里等号后面不写东西是对应上面提到的空的情况. 最后重启服务果然能成了. 

我想这下应该能解决了吧, 于是重新开始执行了下面的语句：

```mysql
LOAD DATA INFILE 'PATH_TO_MY_FILE' INTO TABLE <NAME_OF_TB> FIELDS TERM INATED BY ',' LINES TERMINATED BY '\n'  GNORE 1 ROWS;
```

这回又给出了报错：

::: danger

ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides.

:::

搜索了一下, 看到有用修改环境变量的方法解决的：

要修改的关键的环境变量是`local_infile`, 可以使用`show variables like 'local_infile';`来查看该环境变量的值. 果然执行后发现它的值是OFF. 因此我需要修改这个环境变量来达到读取文件的目的, 执行：`SET GLOBAL local_infile=on;`这样就可以了, 于是我再次执行上面的LOAD命令的时候, 又遭遇了报错：

::: danger

ERROR 13 (HY000): Can't get stat of '/home/breezeshane/AppData/Subjects/Database/product.csv' (OS errno 13 - Permission denied)

:::

这个问题是我遇到的所有问题当中耗时最久的问题了……四下搜索无果, 后来去找周围的大佬请教, 终于才知道, 是我缺少了LOCAL这个关键词, 难怪它总是提示没有权限, 我首先就打开方式不对……

命令的正确写法应该是：

```mysql
LOAD DATA LOCAL INFILE '/home/breezeshane/AppData/Subjects/Database/product.csv' INTO TABLE <NAME_OF_TB> FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
```

这里的命令含义是：通过给出的路径获取本地文件并从中加载数据到表`<NAME_OF_TB>`里(`LOAD DATA LOCAL INFILE '/home/breezeshane/AppData/Subjects/Database/product.csv' INTO TABLE <NAME_OF_TB>`), 数据的分隔符是`,`(`FIELDS TERMINATED BY ','`), 行分隔符是`\n`(`LINES TERMINATED BY '\n'`), 最后忽略掉第一行的内容(`IGNORE 1 ROWS`). 

## Schema的浅析

**模式与数据库、表的关系**: 一个数据库(Database)内有多个模式(Schema), 一个模式有多个表(Table). 

定义模式实际上定义了一个命名空间, 在这个空间中可以定义该模式包含的数据库对象, 例如基本表、视图、索引等.

创建方法: 
```sql
CREATE SCHEMA <Name> AUTHORIZATION <UserName>
```
这个命令需要用户具有DBA的权限, 否则失败. 

删除方法: 
```sql
DROP SCHEMA <Name> <CASCADE | RESTRICT>
```
 - `CASCADE`(级联)：删除模式的同时把该模式中所有的数据库对象全部删除; 
 - `RESTRICT`(限制)：如果该模式中定义了下属的数据库对象（如表、视图等）, 则拒绝该删除语句的执行. 即当该模式中没有任何下属对象时, 才可以删除. 

::: warning 警告

不管任何时候删除操作都是一个需要非常慎重考虑, 仔细琢磨并小心执行的危险行为, 如果你选择要做这样的操作, 就要做好应对损失这些数据的准备, 或许可能还要做好损失其他数据的准备(大都是误删......).

:::

## 索引的建立与删除

DBMS中索引一般采用B+树、HASH索引来实现, B+树索引具有动态平衡的优点, HASH索引具有查找速度快的特点. 索引是关系数据库的内部实现技术, 属于内模式的范畴. 

应该知道, 索引会占用额外的存储空间, 并且降低插入、删除和更新行的速度, 但会提高查询速度; 应在频繁进行查询操作的列上建立索引; 系统在查询数据时自动选择合适的索引作为存储路径, 用户不必也不能选择索引.  

::: danger 坑

<!-- https://blog.csdn.net/weiliangliang111/article/details/51333169 参考链接-->

<!-- https://zhuanlan.zhihu.com/p/23624390 参考链接-->

(这里是施工现场, 我正在填坑了, 您先等等, 别着急......ToT)

我在这里先埋下大坑, 等我学完B+树和HASH表检索算法之后再回来写写这两个策略的优异性和劣势性.

:::

索引有两种类型: 
 - **聚簇索引**: 表中数据的物理存储顺序按照索引键的排序次序存储; 一个数据表只能建立一个聚簇索引
 - **非聚簇索引**

::: details 浅谈聚簇索引和非聚簇索引

(这里是施工现场, 我正在填坑了, 您先等等, 别着急......ToT)

:::

创建方法: 
```sql
CREATE [UNIQUE] [CLUSTERED|NONCLUSTERED] INDEX <IndexName> 
ON <TableName>( <RowName>[<Order>]
                [,<RowName>[<Order>] ... ]);
```
`<Order>`有两个值: `ASC`和`DESC`. 

删除方法: 
```sql
DROP INDEX <IndexName>;
```

::: warning 注意

索引也存在失效的情况, 比如在使用`where`语句时使用了负向查询.

> 负向查询包括: `NOT`, `!=`, `<>`, `!<`, `!>`, `NOT IN`, `NOT LIKE`, `NOT BETWEEN ... AND ...`等. 

在允许为`null`的列上建立索引也会导致这样的问题.

还有在使用`A OR B`语句中, 有一个是没有索引的这种情况也是如此.

另外, 如果对索引列进行运算, 索引一定会失效.

:::

## 视图

**定义**: 是从一个或多个表导出的虚拟的表, 其内容由查询定义. 它具有普通表的结构, 但是不实现数据存储. 

::: warning 注意

视图定义约束要求:
1. 组成视图的属性列名要么是全部省略, 要么就是全部指定. 
2. 子查询不允许使用`order by`子句和`distinct`短语. 

:::

**作用**: 
1. 视图能够简化用户的操作, 适当的用视图可以更清晰地表达查询.
2. 视图使用户能以多种角度看待同一数据. 
3. 视图对重构数据库提供了一定程度的逻辑独立性, 屏蔽了真实表的结构带来的影响.
4. 视图能够对机密数据提供安全防护, 用户只能查询和修改能看到的数据. 

**缺点**: 
1. 性能差: 数据库必须把视图查询转化成对基本表的查询, 如果这个视图是由一个复杂的多表查询所定义, 那么, 即使是视图的一个简单查询, 数据库也要把它变成一个复杂的结合体, 需要花费一定的时间. 
2. 修改受限: 当用户试图修改视图的某些信息时, 数据库必须把它转化为对基本表的某些信息的修改, 对于简单的视图来说, 这是很方便的, 但是, 对于比较复杂的试图, 可能是不可修改的. 

## 数据操作

SQL语句我第一次接触, 因此打算记录下来（因为我知道我大有可能不打算常用它, 总会忘掉的）. 

1. **删除数据表/数据库**：`DROP TABLE <NAME_OF_TB>`/`DROP DATABASE <NAME_OF_DB>`. 
2. **查看表的属性及类型**：`DESCRIBE <NAME_OF_TB>`/`SHOW COLUMNS FROM <NAME_OF_TB>`. 
3. **查看整表**：`SELECT * FROM <NAME_OF_TB>`. 
4. **清空数据表**：`truncate <NAME_OF_TB>`/`DELETE FROM <NAME_OF_TB>`. 
5. **删除表中指定行**：`DELETE FROM <NAME_OF_TB> WHERE <Options>`. 

实际上需要用什么去查官方文档就好了. 下面给出常见语句的模板: 
```sql
Select <RowName>|expr|agfunc(<RowName>) [[, <RowName>|expr|agfunc(<RowName>)] ... ]
From TableName1 [, TableName2 ... ]
[ Where <SearchingConditions> ]
[Group by <GroupingConditions> [ Having <FilteringConditions>]];
```
其中`expr`可以是常量, 列名或由常量, 列名, 特殊函数及算术运算符构成的算数运算式. 特殊函数的使用需要结合DBMS的文档. `agfunc()`是一些聚集函数. 

::: details 一些运算操作对应的语句参考

首先要强调一下, 这里的语句未必在一些数据库上适用, 如果要了解这些差异性内容应该去查阅官方文档. 

$R\cup S$: 
```sql
select * from R
union
select * from S
```

$R - S$: 
```sql
select * from R
except
select * from S
```

$R\cap S$: 
```sql
select * from R
intersect
select * from S
```

$R\times S$: 
```sql
select R.*, S.* from R, S
select R.*, S.* from R cross join S
```

$\sigma_{C}(R)$: 
```sql
select * from R where C
```

$\prod_L(R)$: 
```sql
select L from R
```

$\Pi_L(\sigma_C(R))$:
```sql
select L from R where C
select L from (select * from R where C) S   
```

$R\bowtie_{A=B}S$:
```sql
select R.*, S.* from R join S on R.A=S.B
```

$R\bowtie S$:
```sql
select R.*, S.* from R join S on R.A=S.A
```

$R\ltimes_C S$: 
```sql
select R.*, S.* from R left outer join S on C
```

$R\rtimes_C S$: 
```sql
select R.*, S.* from R right outer join S on C
```

$\delta(R)$:
```sql
select distinct * from R
```

$\tau_L(R)$:
```sql
select * from R order by L
```

$\gamma_{L,f}(R)$:
```sql
select L,f from R group by L [ having <Conditions> ]
```
其中$f$表示任意一个聚合算子.

:::

### 深入使用条件表达式 

#### SQL模糊查询

##### 通配符匹配

四种匹配模式: 
1. `%` : 表示任意0个或多个字符, 可匹配任意类型和长度的字符, 但不能匹配空值`NULL`.
2. `_` : 表示任意单个字符. 
3. `[ ]` : 表示括号内所列字符中的一个.
4. `[^ ]` : 表示不在括号所列之内的单个字符. 

> **注**: 如果`[ ]`或者`[^ ]`内含一系列连续字符集的话, 可以用`-`来简洁表示, 如`0123456789`就可以直接写成`0-9`即可.

::: warning 注意

SQL语句的`like`关键字主要支持前两个`%`和`_`, `[ ]`和`[^ ]`并不受支持. 相应地这两个都受`regexp`和`rlike`支持. 

如果待匹配的字符内含`%`或`_`, 这时应该使用`ESCAPE`关键字来自行定义转义符号, 然后使用这个转义符号来完成字符转义, 使用法则和C语言的转义类似. 

> 在使用模糊匹配时MySQL默认配置是不区分大小写的, 但是否区分大小写取决于用户对MySQL的配置方式, 因此当你在使用他人的数据库时请多留意数据库的配置方式.

:::

在使用Spring框架的JdbcTemplate时, 因为`?`是被用作通配符的, 是用来代替参数的, 而其在SQL语句中无法直接对类似`'%?%'`的表达式进行解析, 所以我们需要对连接的字符串进行处理, 使用动态拼接`concat()`方法将`'%?%'`中的内容进行连接, 然后再执行增删改查操作. 
因此应该写成如下形式:
```Spring
String sql = "select count(*) from tab_route where rname like concat('%',?,'%')";
```
而MyBatis中关键字为`#{str}`, 因此将上面的语句中的`?`替换成这个即可, 如果还需要添加排序的话, 应该另外使用关键字`${str}`, 最后语句应该类似下句:
```MyBatis
select * from table where name  like concat('%',#{name},'%') order by ${id};
```

有时候我们需要做在单表中对多字段进行多关键字模糊查询, 实现方法和前面提到的基本类似, 也是使用`concat`方法的: 
```sql
SELECT * FROM <TableName> WHERE CONCAT（ '<Field1>' , '<Field2>' , '<Field3>' ） LIKE '%<Key Words>%'
```

::: tip

通配符搜索的处理一般要比其他搜索所花时间更长，消耗更多的内存等资源. 因此: 
 - 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
 - 在确实需要使用通配符时，除非绝对有必要，否则不要把它们用在搜索模式的开始处。
   > 因为MySQL在`where`后面的执行顺序是从左往右执行的，如果把通配符置于搜索模式的开始处，数据库搜索就是按照全库扫描模式进行的, 这样的搜索是最慢的.
 - 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。

:::

##### 内置函数检索

`locate`:

```sql
locate ( substr, str ) 
-- 如果substr在str中不存在，返回值为0，否则返回值为substr在str中第一次出现的位置。

locate ( substr, str, pos )
-- 从位置pos开始的字符串str中第一次出现子字符串substr的位置。如果substr不在str中，则返回0。如果substr或str为NULL，则返回NULL。 
```

`position`:

```sql
position ( substr IN str )
-- 这个方法可以理解为locate(substr，str)方法的别名，因为它和locate(substr，str)方法的作用是一样的。
```

`instr`:

```sql
instr ( str, substr )
-- 返回字符串str中第一次出现子字符串substr的位置。INSTR()与LOCATE()的双参数形式相同，只是参数的顺序相反。
```

::: tip 提示

据了解, 内置函数匹配搜索的底层实现和前面的通配符匹配搜索是相差不多的, 执行效率同样偏低. 

:::

##### 基于regexp、rlike的正则匹配查询

> MySQL中的regexp和rlike关键字属于同义词, 功能相同.

`regexp`关键字比`like`关键字要更加细粒化, 匹配更加具体, 因为它支持正则表达式匹配, 几乎可以满足所有需求. 但注意, `regexp`不支持通配符`%`和`_`. 

**Regexp参数类型**: 

|参数类型|作用|
|:----:|:---:|
|`^`|匹配字符串的开始位置|
|`$`|匹配字符串的结束位置|
|`.`|匹配任何一个字符，包括回车、换行等|
|`*`|星号匹配0个或多个字符，在它之前必须有内容|
|`+`|加号匹配1个或多个字符，在它之前也必须有内容|
|`?`|问号匹配0次或1次|
|`{n}`|匹配指定n个长度的字符|
|`{n,}`|匹配不少于n个长度的字符|
|`{n,m}`|匹配n-m个长度的字符|

|操作符|作用|
|:----:|:---:|
|`\|`|可以搜索多个字符串之一，表示逻辑或|
|`[ ]`|匹配`[ ]`符号中几个字符之一，支持解析正则表达式|
|`[^ ]`|不匹配`[^ ]`符号中几个字符中的任意一个，支持解析正则表达式|

::: tip

MySQL中，UTF-8下中文是3个字节/字; GBK下中文是2个字节/字.

特殊符号匹配需要在前面加`\\`, 但如果是被包含在`[ ]`中就可以不加上.

:::

如果想匹配首位字符是中文的话应该使用正则表达式`^[^ -~]`, 而首位字符不是中文的要使用正则表达式`^[ -~]`, 不包含中文数据对应的正则表达式为`^([a-z]|[0-9]|[A-Z])+$`.

::: tip 如何理解`^[^ -~]`和`^[ -~]`

理解这两个的关键是先搞清楚`[ -~]`表达的是什么.

`[ -~]`实际上描述的是一个范围, 表示从` `到`~`这一系列的字符范围, 你可以用如下的方式复写这个表达式:

```
[ !"#$%&'()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~]
```

实际上这就是在限定ASCII码的范围.

现在你一定可以理解`^[^ -~]`和`^[ -~]`了. 

:::

##### 字符类匹配

|字符类|作用|
|:---:|:-:|
|[:alnum:]|匹配字面和数字字符。(等同于[A~Za~z0~9])|
|[:alpha:]|匹配字母字符。(等同于[A~Za~z])|
|[:blank:]|匹配空格或制表符(同[\\\t])|
|[:cntrl:]|匹配控制字符(ASCII0到37和127)|
|[:digit:]|匹配十进制数字。(等同于[0-9])|
|[:graph:]|匹配ASCII码值范围33~126的字符。与[:print:]相似，但不包括空格字符|
|[:print:]|任何可打印字符|
|[:lower:]|匹配小写字母，等同于[a-z]|
|[:upper:]|匹配大写字母，等同于[A-Z]|
|[:space:]|匹配空白字符（同[\\f\\n\\r\\t\\v]）|
|[:xdigit:]|匹配十六进制数字。等同于[0-9A-Fa-f]|

::: warning 注意

这种字符类需要主要的外层要加一层`[]`, 如: `[[:digit:]]`. 

:::

##### [:<:]和[:>:]

与`^`和`$`不同, [:<:]是匹配词的开始, [:>:]是匹配词的结束.

**例**:

```sql
select * from <TableName> where <Attr> regexp '^x';
-- 该匹配模式只能匹配整体以字母X开头的数据, 如'xylophone', 像'go to xerox the letter'是不能匹配的.

select * from <TableName> where <Attr> regexp '[[:<:]]x';
-- 该匹配模式除了能匹配到整体以字母X开头的数据外, 还可以匹配到在中间某个单词中以X开头的数据, 如'Play with a xylophone'.
```

::: warning 注意

该匹配中的单词开头和结尾都不是包含在`[[:alnum:]]`中的字符也不能是下划线. 

:::

##### 加密数据的模糊查询问题

(这里是施工现场, 我正在填坑了, 您先等等, 别着急......ToT)

#### SQL统计查询结果

|函数名|使用格式|描述|
|:--:|:--:|:--:|
|COUNT|`COUNT( [DISTINCT\|ALL] * )`|统计元组个数|
|COUNT|`COUNT( [DISTINCT\|ALL] <RowName> )`|统计一列中值的个数|
|SUM|`SUM( [DISTINCT\|ALL] <RowName> )`|计算一列值的总和|
|AVG|`AVG( [DISTINCT\|ALL] <RowName> )`|计算一列值的平均值|
|MAX|`MAX( [DISTINCT\|ALL] <RowName> )`|求一列值的函数名最大值|
|MIN|`MIN( [DISTINCT\|ALL] <RowName> )`|求一列值的最小值|

#### SQL的其他查询

 - SQL语句中有确定值范围的谓词: `BETWEEN ... AND ...`
 - SQL语句也有确定元素属于集合的谓词: `IN`
 - 如果涉及到空值的查询, 我们使用谓词`IS NULL`或`IS NOT NULL`. 
 - 逻辑运算符`AND`优先级要比`OR`要高, 但可以使用`()`来决定查询条件的各部分优先级. 
 - `ORDER BY`子句中`ASC`表示升序, 而`DESC`表示降序, 缺省值为`ASC`. 如果排序列内含有空值, `ASC`会将空值放在最后显示, `DESC`则会将空值放在首处显示.

#### SQL数据更新与删除:

 - `INSERT`: 
    ```sql
    insert
    into <TableName> [ ( <Attr1> [, <Attr2> ] ... ) ]
    values( <ConstVar1> [, <ConstVar2> ] ... )

    insert
    into <TableName> [ ( <Attr1> [, <Attr2> ] ... ) ]
    <Subquery>
    ```
 - `UPDATE`: 
    ```sql
    update <TableName>
    set <RowName>-<Expression> [, <RowName>-<Expression> ] ...
    [where <Conditions>]
    ```
 - `DELETE`: 
    ```sql
    delete
    from <TableName>
    [where <Conditions>]
    ```

::: tip 注意

RDBMS在执行**插入**语句时会检查所插元组是否破坏表上已定义的完整性规则:
 - **实体完整性**
 - **参照完整性**
 - **用户定义的完整性**: `NOT NULL`约束, `UNIQUE`约束, 值域约束

RDBMS在执行**修改**语句时会检查修改操作是否破坏表上已定义的完整性规则:
 - **实体完整性**
 - **主码不允许修改**
 - **用户定义的完整性**: `NOT NULL`约束, `UNIQUE`约束, 值域约束

:::