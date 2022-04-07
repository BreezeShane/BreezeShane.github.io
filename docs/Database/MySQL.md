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

[MySQL 创建数据库](https://www.runoob.com/mysql/mysql-create-database.html)
[MySQL 创建数据表](https://www.runoob.com/mysql/mysql-create-tables.html)
[MySQL创建数据表（CREATE TABLE语句）](http://c.biancheng.net/view/2430.html)
[MySQL 数据类型](https://www.runoob.com/mysql/mysql-data-types.html)
[Mysql 导入文件提示 --secure-file-priv option 问题](https://www.cnblogs.com/Braveliu/p/10728162.html)
[mysql 查看当前使用的配置文件my.cnf的方法](https://blog.csdn.net/fdipzone/article/details/52705507)
[MySQL my.cnf file - Found option without preceding group](https://stackoverflow.com/questions/8020297/mysql-my-cnf-file-found-option-without-preceding-group)
[解决方法MySQL ERROR 3948 (42000): Loading local data is disabled； this must be enabled on both the](https://blog.csdn.net/qq_32834005/article/details/110443574)
[Mysql——将CSV文件导入表中](https://zhuanlan.zhihu.com/p/26964403)
[MYSQL：如何清空表中的数据](https://blog.csdn.net/qq_29229567/article/details/82743645)
[MySQL 删除数据表](https://www.runoob.com/mysql/mysql-drop-tables.html)


:::

## MySQL安装与配置

近期上课需要使用MySQL，因此我需要提前做好配置，特此一记：

安装仅需一步：
```shell
sudo pacman -S mysql
```

然后就可以开始进行配置，按照其输出的内容，我们执行：

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

什么也不用考虑，删除掉`/var/lib/mysql/`这个文件夹即可

:::

命令执行成功后请留意一下输出的内容，这里会给你默认的MySQL用户及其密码，我们需要特别记下这两个。

然后就需要启动MySQL服务，执行这两个命令：
```shell
sudo systemctl enable mysqld
sudo systemctl start mysqld
```

以普遍的理性而言，这类的密码是反人类的，因此我们需要修改一下登录密码，先执行这个命令来连接数据库：

```shell
mysql -uroot -p
```

然后输入刚才记下的那个复杂的密码，便可成功连接。

在这时你执行命令`use mysql;`会得到类似这样的提示：

```mysql
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
```

所以我们可以根据提示执行这个命令：
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```

这样就可以成功修改密码了，MySQL的安装与配置也到此结束了。

## MySQL初步使用

首先我们先连接数据库。要使用数据库，就需要先从新建数据库开始，搜过之后，就知道要使用下面一系列命令：

```mysql
CREATE DATABASE <NAME_OF_DB>; # 创建新数据库
use <NAME_OF_DB>; # 此处开始指定使用的数据库，这是每次连接数据库需要做的一步。
CREATE TABLE <NAME_OF_TB> （ COL_1 TYPE_1, COL_2 TYPE_2 ... ）; # 创建新数据表，并分别指定COL_1和COL_2等的数据类型分别为TYPE_1和TYPE_2等。
```

## MySQL导入本地文件数据

本来这件事应该很简单的，执行这个语句就应该结束一切的：

```mysql
LOAD DATA INFILE 'PATH_TO_MY_FILE' INTO TABLE <NAME_OF_TB> FIELDS TERM INATED BY ',' LINES TERMINATED BY '\n'  GNORE 1 ROWS;
```

但就在这里报了错：

::: danger

The MySQL server is running with the --secure-file-priv option so it cannot execute this statement.

:::

然后经过我的长时间搜索之后了解到：MySQL在安装的时候是会限制导入和导出的目录权限的，仅在规定的目录下才可以导入。我们可以用`SHOW VARIABLES LIKE "secure_file_priv";`来查看这个变量的值应该是什么，结果果然能看到这时的状态是NULL。

::: tip secure_file_priv各值代表的意义

NULL：表示禁止，不接受任何形式的导入。

某目录：仅接受该目录下的文件，甚至不接受其子文件夹与其内含的文件。

空：不做限制，接受任何目录的导入。

:::

那么我要解决这个问题就必须要去修改配置文件了。这里又花了我较长时间才找到其配置文件所在的路径：

1. /etc/my.cnf
2. /etc/mysql/my.cnf
3. /usr/local/etc/my.cnf
4. ~/.my.cnf

这四个是MySQL默认会搜寻的路径，并且从上到下优先级是逐级降低。

于是我二话不说直接用管理员身份创建了`/etc/my.cnf`文件，正满怀期待地保存希望能够成功，当我执行`sudo systemctl restart mysqld`命令来重启MySQL服务的时候，它挂了……

当我执行`mysql -uroot -p`的时候它给出了如下报错：

::: danger

ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/run/mysqld/mysqld.sock' (2)

:::

简单搜索了一下，这个其实意思就是MySQL服务启动失败，因此无法建立联接。当我尝试使用`systemctl status mysqld`来查看日志，接着看到了下面的报错：

::: danger

ERROR Found option without preceding group in config file /etc/my.cnf.

:::

搜索了几下后我才发现，原来是缺少了`[mysqld]`这个内容，粗略地看了一下，应该就是Group的一种标志，这个mysqld应该是Group的名字。于是这个文件最后长的样子应该是下面的：

```mysql
[mysqld]
secure_file_priv = 
```

这里等号后面不写东西是对应上面提到的空的情况。最后重启服务果然能成了。

我想这下应该能解决了吧，于是重新开始执行了下面的语句：

```mysql
LOAD DATA INFILE 'PATH_TO_MY_FILE' INTO TABLE <NAME_OF_TB> FIELDS TERM INATED BY ',' LINES TERMINATED BY '\n'  GNORE 1 ROWS;
```

这回又给出了报错：

::: danger

ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides.

:::

搜索了一下，看到有用修改环境变量的方法解决的：

要修改的关键的环境变量是`local_infile`，可以使用`show variables like 'local_infile';`来查看该环境变量的值。果然执行后发现它的值是OFF。因此我需要修改这个环境变量来达到读取文件的目的，执行：`SET GLOBAL local_infile=on;`这样就可以了，于是我再次执行上面的LOAD命令的时候，又遭遇了报错：

::: danger

ERROR 13 (HY000): Can't get stat of '/home/breezeshane/AppData/Subjects/Database/product.csv' (OS errno 13 - Permission denied)

:::

这个问题是我遇到的所有问题当中耗时最久的问题了……四下搜索无果，后来去找周围的大佬请教，终于才知道，是我缺少了LOCAL这个关键词，难怪它总是提示没有权限，我首先就打开方式不对……

命令的正确写法应该是：

```mysql
LOAD DATA LOCAL INFILE '/home/breezeshane/AppData/Subjects/Database/product.csv' INTO TABLE <NAME_OF_TB> FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
```

这里的命令含义是：通过给出的路径获取本地文件并从中加载数据到表`<NAME_OF_TB>`里(`LOAD DATA LOCAL INFILE '/home/breezeshane/AppData/Subjects/Database/product.csv' INTO TABLE <NAME_OF_TB>`)，数据的分隔符是`,`(`FIELDS TERMINATED BY ','`)，行分隔符是`\n`(`LINES TERMINATED BY '\n'`)，最后忽略掉第一行的内容(`IGNORE 1 ROWS`)。

## MySQL的一些命令

SQL语句我第一次接触，因此打算记录下来（因为我知道我大有可能不打算常用它，总会忘掉的）。

1. **删除数据表/数据库**：`DROP TABLE <NAME_OF_TB>`/`DROP DATABASE <NAME_OF_DB>`。
2. **查看表的属性及类型**：`DESCRIBE <NAME_OF_TB>`/`SHOW COLUMNS FROM <NAME_OF_TB>`。
3. **查看整表**：`SELECT * FROM <NAME_OF_TB>`。
4. **清空数据表**：`truncate <NAME_OF_TB>`/`DELETE FROM <NAME_OF_TB>`。
5. **删除表中指定行**：`DELETE FROM <NAME_OF_TB> WHERE <Options>`。

实际上需要用什么去查官方文档就好了。