---
title: Crawler
date: 2021-06-07 20:47:07
author: Breeze Shane
top: false
toc: true
mathjax: false
category: 
 - Python
 - Crawler
tag: 
 - Python
 - Crawler
---

::: details 参考资料

1. [莫烦 Python 爬虫基础教程](https://mofanpy.com/tutorials/data-manipulation/scraping/)
2. [Python有哪些常见的、好用的爬虫框架？ - 知乎](https://www.zhihu.com/question/60280580)
3. [Scrapy 2.5 documentation¶](https://www.osgeo.cn/scrapy/)
4. [Scrapy Documentation Demo](https://github.com/scrapy/dirbot)
5. [Unknown command: crawl（爬虫框架Scrapy遇到的常见错误）](https://blog.csdn.net/HuaCode/article/details/79429383)
6. [Python爬虫之教你利用Scrapy爬取图片](https://www.jb51.net/article/209743.htm)
7. [小白学 Python 爬虫（35）：爬虫框架 Scrapy 入门基础（三） Selector 选择器](https://juejin.cn/post/6844904041290399751)
8. [Python爬虫（三）：scrapy提取数据之CSS提取器](https://blog.csdn.net/u014041590/article/details/85109026)
9. [Python网络爬虫数据提取神器 Selector 的用法](https://blog.csdn.net/Python_sn/article/details/108827436)
10. [python网络爬虫之使用scrapy下载文件 - 一张红枫叶](https://www.cnblogs.com/zhanghongfeng/p/7881810.html)
11. [Scrapy爬虫之中文乱码问题](https://blog.csdn.net/qq_40795214/article/details/82154464)
12. [python下载文件进度条_python超好用爬虫下载进度条模块](https://codeantenna.com/a/JlowUk9g7J)
13. [Python使用aiohttp和asyncio多线程下载文件](https://blog.csdn.net/yangchuan0120/article/details/109843009)
14. [Python AsyncIO Awaitables: Coroutine, Future, and Task](https://leimao.github.io/blog/Python-AsyncIO-Awaitable-Coroutine-Future-Task/)
15. [通过一个例子分析python3异步编程过程](https://www.dounaite.com/article/625c7b29ae87fd3f79680cee.html)
16. [【Hard Python】【第二章-异步IO】2、异步任务在事件循环中的执行-爱代码爱编程](https://icode.best/i/35828746609683)
17. [JavaScript 运行机制详解：再谈Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
18. [Chapter 18 - 使用 asyncio 包处理并发](https://homholueng.github.io/2019/10/08/fluent-python-asyncio/)
19. [一份详细的asyncio入门教程](https://bbs.huaweicloud.com/blogs/109055)
20. [Python进阶-面向对象-网编并发 » 13 asyncio并发编程进阶](https://huoyingwhw.com/pythonGuide/python%E8%BF%9B%E9%98%B6/asyncio3/)

:::

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

## 使用Scrapy来实战

爬虫的流行框架很多，比如Scrapy、Crawley、Portia、newspaper、Python-goose、Aiohttp、Asks、Vibora、Pyppeteer、Requestium、Arsenic、Grab、Botflow、Ruia等等，难免让人眼花缭乱，但应该注意到，各框架之间是大同小异的，区别也在于基于什么技术上实现的，因此如有特别需求才需要细细甄别，一般直接无脑选择第一个就够用。如你所见，我使用了Scrapy框架，因为我没有特殊需要。

因为本人是一名刀客塔狂热分子，特别喜欢Arknights里的游戏音乐，然后凭借自己的搜索能力淘到了两个宝藏网站：

1. [音乐鉴赏](https://prts.wiki/w/%E9%9F%B3%E4%B9%90%E9%89%B4%E8%B5%8F)
2. [GDIndex](https://arknightsost.nbh.workers.dev/)

> ~~虽然的确可以自己解包提取，但别人做好的成果我为什么不能拿来白嫖呢？~~

### PRTS Wiki

如你所见，这两个网站资源真的丰富，我先拿第一个网站实验~~（开刀）~~，但是这里想全要的话是要自己一个一个点开下载，总共286首也太难办了点……于是我决定使用爬虫来替我完成批量下载的操作。

爬虫，结合之前所学，本质上是按照网站设计方式针对性制定的爬取资源模式。于是在开工之前，我首先进行网站的结构解析工作，发现该网站的目标资源分布规律十分明显：资源都分布在table标签下的tbody内，而且每个tbody标签内的前两个tr都是对应表标题和子标题，剩下tr部分都是资源文件所在的表格，而且这部分的tr标签内每一个都有两个td标签，第一个用来显示资源名称，另一个则是目标了，令人愉快的是，这个网站没做什么资源加密与隐藏的事，而是直接暴露在audio标签中的source标签内，并且亲自确认有效链接就是其src属性中的链接。

基于这一分析结果，我确定好自己的需要：**按照table的标题创建对应的文件夹，然后在其中存放下载的音频文件，且以其对应的名字命名**，于是就开始针对性地写爬虫脚本了。

首先创建爬虫项目，在命令行中执行`scrapy crawl ArknightsBGMCrawler`，这样就会在当前位置创建一个名为`ArknightsBGMCrawler`的包，其结构为：
```shell
ArknightsBGMCrawler
├── __init__.py
├── items.py
├── middlewares.py
├── pipelines.py
├── settings.py
├── spiders
│   └── __init__.py
└── utils.py

1 directory, 7 files
```

而现在我们要做的第一件事就是创建Item Model，定义每一个对象的属性结构，`items.py`文件内代码如下：

```python
import scrapy


class ArknightsbgmcrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    folder_name = scrapy.Field()
    item_name = scrapy.Field()
    url = scrapy.Field()

```

> 如果你感觉这非常眼熟的话，那很正常，因为Scrapy框架其实也是基于ORM技术的。

然后我们要做的就是创建对应的Crawler Model，于是我们在其中的spider文件夹下创建新的文件`PRTSCrawler.py`，在其中写入Crawler类对象的定义，对应的代码如下：

```python
import scrapy
from ArknightsBGMCrawler.items import ArknightsbgmcrawlerItem
from ArknightsBGMCrawler.utils import *


class PRTSSpider(scrapy.Spider):
    name = "PRTS"
    allowed_domains = ["prts.wiki"]
    start_urls = [
        'https://prts.wiki/w/%E9%9F%B3%E4%B9%90%E9%89%B4%E8%B5%8F'
    ]

    def parse(self, response):
        node_sources = response.css(".wikitable")[:-1]
        items = []
        for node in node_sources:
            folder_name_from_span = node.css("tbody > tr:first-child big").get()
            folder_name_from_img = node.css("tbody > tr:first-child > th > img::attr(alt)").get()
            songs = node.css("tbody > tr:nth-child(n+3)")
            for song in songs:
                item = ArknightsbgmcrawlerItem()

                item['folder_name'] = clean_folder_name(folder_name_from_img) \
                    if folder_name_from_span is None else remove_tags(folder_name_from_span)

                song_name = song.css("td:nth-last-child(2)").get()
                song_url = song.css("td:last-child > audio > source::attr(src)").get()
                item['item_name'] = clean_song_name(remove_tags(song_name))
                item['url'] = song_url

                items.append(item)
        return items
```

类内name变量决定后面你在运行时要写的名字；allowed_domains变量决定爬取资源的可接受域，设置这个的目的在于避免爬取其他域的资源，避免意外的访问；start_urls变量决定爬取目标的链接。

继承Crawler类时要重写parse方法，参数为response，代表着对应爬取资源的对象。根据我之前提到的资源分布规律，我首先选择所有对应的目标所在的table，然后去掉最后一个项（原因是最后一个是外服的BGM，只有两个有对应资源，其它都要去另外的链接找，在这里自动化处理会非常麻烦，再加上这里面可直接获取的歌曲只有两个，就懒得折腾了，过后自己再手动下载就行了）。folder_name_from_span变量获取的是每一个分类对应的表格标题，folder_name_from_img变量获取的是每一个分类对应的图片标题，这样做的原因在于网站中的每个分类并不都有表格标题，有的是只有图片，有的是只有标题，但还好图片有对应的标题，于是在`item['folder_name'] = clean_folder_name(folder_name_from_img) if folder_name_from_span is None else remove_tags(folder_name_from_span)`这里做了一个合并处理，成功做到每个分类都有对应的合适名字。songs变量则是获取每个分类下的所有可下载的歌曲所在的tr，最后遍历songs列表，给每一个song创建一个对象，并且给对象的folder_name、item_name、url属性赋值（这些属性的名字就取决于之前在`items.py`内的定义），至此parse方法就重写完成了。

链接获取到了，那接下来我们要做的就是下载了。据资料，我可以使用FilesPipeline来定义下载行为，除了要重写parse方法之外，还要在`pipelines.py`中定义FilesPipeline的继承类，重写file_path方法，return预期的文件名及路径即可。

但作为一个~~勇敢~~智障的技术宅，我突然脑子一拍，想用异步算法来完成批量下载，于是就开始鲁莽起来了。我先执行`scrapy crawl PRTS -o data.json`把爬取结果导出到data.json中，再由`Downloader.py`读取文件并批量下载，于是我在`Downloader.py`中写了如下代码：

```python
import os
import json
import aiohttp
import asyncio
from tqdm import tqdm


async def start(data, event_loop):
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(limit=64, ssl=False)) as session:
        tasks = [
            event_loop.create_task(
                await job(
                    session=session,
                    save_dir=os.path.join(SAVE_DIR, item['folder_name']),
                    name=item['item_name'] + ".mp3",
                    url=item['url']
                )
            ) for item in data
        ]
        finished, unfinished = await asyncio.wait(tasks)
        all_results = [r.result() for r in finished]
        print("文件全部下载完毕: \n", all_results)


async def job(session, save_dir, name, url):
    if not os.path.exists(save_dir):
        os.mkdir(save_dir)
    save_path = os.path.join(save_dir, name)
    if not os.path.exists(save_path):
        file = await session.get(url)
        file_code = await file.read()
        with open(save_path, 'wb') as save_file:
            save_file.write(file_code)
            pbar.update(1)
    return raise_message(url)


async def raise_message(url):
    print(str(url))


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    SAVE_DIR = './ArknightsBGMs/'
    if not os.path.exists(SAVE_DIR):
        os.mkdir(SAVE_DIR)

    with open("data.json", "r") as f:
        data_json = json.load(f)
        # formatted_data_json = json.dumps(data_json, indent=4)
        # print(formatted_data_json)
        pbar = tqdm(total=len(data_json), desc="Downloading", initial=0, unit_scale=True, colour='green')
        asyncio.run(start(data_json, loop))

```

结合我之前所学的异步知识，我首先创建好存放目录并创建一个循环事件队列，接着从前面爬取的json文件中读取出来下载连接，为了便于用户与计算机之间的交互，我另外创建了进度条对象。这之后我定义好事务并命名为job，通过async关键字修饰使其可挂起。在确保目录存在且文件未下载过的前提下，我将读取到的文件二进制流写入到预设好的文件中，在下载完成后更新进度条。

接下来我定义了start函数，在其中先创建连接池，并且创建事务队列，里面的元素通过create_task方法来创建事务，最后通过asyncio.wait将队列内各元素封装成Task对象，此后就是由该协程返回生成器对象（其他情况下可能也会是协程），最后由asyncio.run来驱动循环事务队列来进行。

### GDIndex

*这个网站的执行策略有些不一样，先留个坑，以后或许会填，或许会删掉（。。。）*
<!--
```javascript
document.querySelectorAll(".v-btn--round").forEach(function(item){console.log(item.href)})
```
-->