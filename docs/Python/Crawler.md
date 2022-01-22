---
title: Crawler
date: 2021-06-07 20:47:07
author: Breeze Shane
top: false
image: /images/crawler.jpg
toc: true
mathjax: false
categories: 
 - Python
 - Crawler
tags: 
 - Python
 - Crawler
excerpt: 本文是关于网络爬虫的学习笔记，主要用于提高搜索数据的效率。
---

# 网络爬虫学习(Updating...)

## 前言

入门学习网络爬虫的阶段主要参考的是[莫烦 Python](https://mofanpy.com/tutorials/data-manipulation/scraping/)的爬虫基础教程，按照了他的学习路线去学，因为这个教程实在是非常通俗易懂，能让你迅速掌握网络爬虫的相关基础概念。

在学过网络爬虫这一版块的内容之后，我发现网络爬虫本就没有那么神秘，说到底，不过是进入某一网络站点获取源码，再利用其他技术来爬取我们需要的信息。而且，我发现，到目前这个学习阶段为止，网络爬虫只是一种具备针对性的工具，也就是说当你需要获取某种数据时，你要做的工作首先就是要在目标网络站点上“踩点”——剖析目标网站的结构，并在其中找出你希望找到的目标。然后从此设计你的爬虫程序。

写爬虫工具常用的包有requests、beautifulsoup4、Asyncio、Aiohttp和Selenium等，皆可通过pip3安装。另外有看见关于Scrapy爬虫库的介绍，目前还没有学。

## BeautifulSoup

> 此处参考的是[BeautifulSoup4 官方文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/)

使用之前要先安装，执行`pip install beautifulsoup4 lxml html5lib`来完成安装「其中最后两个是解析器，可以选择不安装」。

使用BeautifulSoup时需要提前引用相关的包，并且获取目标网站的网页：

```python
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen

web_page = urlopen("https://breezeshane.github.io/index.html").read().decode('utf-8')
soup = bs(web_page, features='lxml')
```

而且对Python友好的是，我们获取来的一切标签，皆可按照Python字典的操作方式操作标签。「而这一点官方文档也再三强调。」

若希望查找所有某名字的标签时，可以使用find_all方法查找，使用样例如下：

```python
href = soup.find_all('a')
links = [link['href'] for link in href]
print(links)
```

这里的href就可以获取一切标签`<a>`，而如果只是希望获取其中的链接，则可使用第二行代码来生成只含有链接的列表。

另外，值得注意的是，find_all方法支持正则表达式，但需要引用re包，在第一行插入`import re`。Example：`href = soup.find_all(re.compile("^li"))`，这表示寻找以“li”开头的所有标签，而如果希望寻找包含“li”的标签，则需写成：`href = soup.find_all(re.compile("li"))`

同时，find_all方法还支持一次性获取多个类型标签，只消用逗号隔开即可。Example：`href = soup.find_all(["link", "script"])`

如果想查找指定属性以及其对应的值的话，可以使用`soup.find_all('link', {"mode" : "dark"})`，这表示寻找包含`mode="dark"`的link标签。

还有一个比较有用的标签属性——has_attr属性，可以判断该标签是否含有指定属性，是则返回True，否则为False。

更多具体细节可以直接查询官方文档，本文就不作赘述。

## Requests

> 此处参考[Requests 官方文档](https://cn.python-requests.org/zh_CN/latest/)

传递URL参数时，可以写如下代码「此处以模拟Bing搜索为例」：

```python
import requests

r = requests.get('https://www.bing.com/search', params= {"q": "BreezeShane"})
print(r.url)
```

其他功能相对来说较为复杂并且信息量也挺大，但很完善，因此要经常翻看官方文档，写爬虫时如果有什么需求再来查就好了。

## Asyncio（在学了在学了(ToT)）

> 此处参考[Asyncio 官方文档](https://docs.python.org/zh-cn/3/library/asyncio.html)

Asyncio是异步加载库，虽说是单线程，但在较多场合情况下优胜于多线程，而我们如果需要爬取大量数据的话，异步加载还是有必要学的。从官方文档中我们也发现，学到这就已经接触了Python并发编程技术。

官方给出了一个程序示例：

```python
import asyncio

async def main():
    print('Hello ...')
    await asyncio.sleep(1)
    print('... World!')

# Python 3.7+
asyncio.run(main())
```

上面的Asyncio Example并不难理解，async表示后面定义的函数是异步加载的模块，await一行表示执行该函数时暂停等待1秒。实际上这个就基本给出了Asyncio的使用模板。如果你希望实现什么功能，自行添加自己的代码即可，就像Movant写的程序：

```python
import asyncio


async def job(t):                   # async 形式的功能
    print('Start job ', t)
    await asyncio.sleep(t)          # 等待 "t" 秒, 期间切换其他任务
    print('Job ', t, ' takes ', t, ' s')


async def main(loop):                       # async 形式的功能
    tasks = [
    loop.create_task(job(t)) for t in range(1, 3)
    ]                                       # 创建任务, 但是不执行
    await asyncio.wait(tasks)               # 执行并等待所有任务完成

t1 = time.time()
loop = asyncio.get_event_loop()             # 建立 loop
loop.run_until_complete(main(loop))         # 执行 loop
loop.close()                                # 关闭 loop
print("Async total time : ", time.time() - t1)
```

写的程序蛮简单，但Asyncio实际上远不止如此。

更多的用法可以直接去阅读文档，本人精力有限，而且意图也不在于深入精通网络爬虫，只是希望满足自己的需求而已，就不会在此继续讨论Asyncio了。如果过后遇到了什么问题，解决之后还是会回来记录一下。

## Aiohttp（在学了在学了(ToT)）

## Selenium（在学了在学了(ToT)）
