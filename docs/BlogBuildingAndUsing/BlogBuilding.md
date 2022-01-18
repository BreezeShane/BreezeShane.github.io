---
title: 🥲🥲🥲多灾多难的博客搭建过程🥲🥲🥲
date: 2021-5-7 14:00:56
author: BreezeShane
image: /images/black_hole_4k.jpg
top: false
toc: true
mathjax: true
excerpt: 本文记述了我搭建博客的部分灾难以及应对方案。。。
categories: 
 - BlogBuilding
 - Fluid
tags:
  - Blog Building
  - Fluid
  - SSH
  - GitHub
article: false
---

# Blog Building

> 参考：[hexo中的mathjax数学公式渲染优化](https://wxwoo.top/2019/05/15/hexo-mathjax-renderer-optimization/)

## 搭建博客的原因¿

自从换了方向之后，发现我需要写的公式数量急剧增长，很多时候我都发现使用特殊符号是远不能满足这一需求的，比如如果我想打$$\int_a^b$$、$$\frac{1}{N}\sum_{i=0}^{n}{N_i}$$等等就非常难顶。。。

## 怎么搭建的博客¿

### 初始安装

首先需要安装好hexo以及其所需要的环境Node.js和包管理器npm，我选择的主题是fluid,简单轻便雅观，最重要的是原生支持LaTeX渲染！

```shell
sudo pacman -S nodejs npm
cd ~/your_blog
sudo npm install -g hexo-cli --save
cd ..
hexo init your_blog
cd ~/your_blog/themes
mkdir fluid && cd fluid
git clone https://github.com/fluid-dev/hexo-theme-fluid.git
cd .. && cd ..
npm install
hexo cl && hexo g && hexo s
```

这时候你进入[你的博客](localhost:4000)就可以看到你的网站啦！

### SSH链接配置

接下来我们要创建SSH链接。***「注意：此处的前提条件是你已经拥有GitHub账户且已经建好<用户名>.github.io仓库。」***

在控制台这里输入`ssh-keygen -t rsa -C "Your@email.com"`，其中`Your@email.com`是你的邮箱，可以拿注册GitHub的邮箱。然后执行`cat ~/.ssh/id_rsa.pub`来查看SSH key。别忘了复制好ssh-rsa 后面的那一串字符串。

接下来进入你的GitHub，点击你的右上角的用户头像并点击Settings，再选择SSH and GPG keys，点击New SSH key创建一个新的SSH链接，然后在Key这一文本框里粘贴你刚才复制的东西，最后点击Add SSH key。

输入`ssh -T git@github.com`即可测试是否链接成功。

如果看到它在向你打招呼，那就是连接成功了。

## 遇到了什么问题？怎么解决‽

### Md渲染问题

我在执行`hexo g`时遇到了如下报错：

```
INFO  Validating config
INFO  Start processing
INFO  [Fluid] 读取 _config.yml 中 theme_config 配置项覆盖配置
FATAL {
  err: Template render error: (unknown path)
    Error: expected end of comment, got end of file
      at Object._prettifyError (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/lib.js:36:11)
      at Template.render (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/environment.js:538:21)
      at Environment.renderString (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/environment.js:380:17)
      at /home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/extend/tag.js:236:16
      at tryCatcher (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/util.js:16:23)
      at Function.Promise.fromNode.Promise.fromCallback (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:209:30)
      at Tag.render (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/extend/tag.js:235:20)
      at Object.onRenderEnd (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/hexo/post.js:297:22)
      at /home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/hexo/render.js:79:21
      at tryCatcher (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/util.js:16:23)
      at Promise._settlePromiseFromHandler (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:547:31)
      at Promise._settlePromise (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:604:18)
      at Promise._settlePromise0 (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:649:10)
      at Promise._settlePromises (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:729:18)
      at _drainQueueStep (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:93:12)
      at _drainQueue (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:86:9)
      at Async._drainQueues (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:102:5)
      at Immediate.Async.drainQueues (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:15:14)
      at processImmediate (node:internal/timers:464:21) {
    cause: Template render error: (unknown path)
      Error: expected end of comment, got end of file
        at Object._prettifyError (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/lib.js:36:11)
        at Template.render (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/environment.js:538:21)
        at Environment.renderString (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/nunjucks/src/environment.js:380:17)
        at /home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/extend/tag.js:236:16
        at tryCatcher (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/util.js:16:23)
        at Function.Promise.fromNode.Promise.fromCallback (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:209:30)
        at Tag.render (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/extend/tag.js:235:20)
        at Object.onRenderEnd (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/hexo/post.js:297:22)
        at /home/breeze_shane/Mydata/GitHub_Blog/node_modules/hexo/lib/hexo/render.js:79:21
        at tryCatcher (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/util.js:16:23)
        at Promise._settlePromiseFromHandler (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:547:31)
        at Promise._settlePromise (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:604:18)
        at Promise._settlePromise0 (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:649:10)
        at Promise._settlePromises (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/promise.js:729:18)
        at _drainQueueStep (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:93:12)
        at _drainQueue (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:86:9)
        at Async._drainQueues (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:102:5)
        at Immediate.Async.drainQueues (/home/breeze_shane/Mydata/GitHub_Blog/node_modules/bluebird/js/release/async.js:15:14)
        at processImmediate (node:internal/timers:464:21),
    isOperational: true
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
```

经过查询资料，了解到这其实是渲染md文件的问题，需要修改一下渲染器的代码来解决渲染失败的问题。

首先需要打开博客根目录下的node_modules/nunjucks/src/lexer.js，打开时会看到如下代码，我们需要修改一下这个红框中的内容：

![](/images/2021-05-07_14-28.png)

改成如下形式即可：

```javascript
var VARIABLE_START = '{$';
var VARIABLE_END = '$}';
var COMMENT_START = '{##';
var COMMENT_END = '##}';
```

不过缺点就是每次更新numjucks的话这个文件会被还原，需要再次修改。

### 如何将pdf挂在文章上？

一种做法是安装hexo-pdf插件「执行`npm i --save hexo-pdf`」，然后在文章内要插入的位置中写`{% pdf YOURPDFURL %}`即可。

另一种做法是使用HTML语法，不过未经过本人亲自测试。

1. 将_config.yml中的post_asset_folder选项置为true。

2. 在文章中要插入的位置中写`<object data="YOURPDFURL" type="application/pdf" width="100%" height="100%">`

   > 这里不一定非用object标签，embed、iframe标签也一样；另外如果不能接受pdf的显示方式的话，可以自己手动调整height的参数值。

「注」：以上两种做法的YOURPDFURL就要替换成你要放的pdf文件的位置，可以是链接到其他网站的超链接，也可以是本地的相对路径。

### 如何绘制思维导图？



## ¿要注意哪些问题？

- public文件夹是执行`hexo g`后生成的，这是为了后面执行`hexo d`时做的准备，你在_config.yml文件中写到的所有/img/最后都会链接到这个文件夹。如果你希望显示自己的图片的话一种做法是将这些图片复制到/img/文件夹下。
- 执行`hexo clean`的时候会删除博客根目录下的public整个文件夹，这包括一切你存放在img文件夹下的所有图片，因此如果你经常执行这个语句的花需要提前做好相关备份。
- 如果不希望总是做这些重复性工作，做法之一是写脚本，另一种做法便是在source文件夹下创建任意名称的文件夹，然后在这个新建的文件夹里存放图片，执行`hexo g`后会自动在public文件夹下生成相同文件夹（盲猜是直接复制过去），接下来你就可以在文档这里直接链接到这个文件夹的图片了。