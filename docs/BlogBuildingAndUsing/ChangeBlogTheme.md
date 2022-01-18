---
title: Changing Blog Theme
date: 2021-05-29 14:18:03
author: Breeze Shane
top: false
image: /images/theme/welcome-image.jpg
toc: true
categories: 
 - BlogBuilding
 - Zhaoo
tags: 
  - Blog Building
  - Zhaoo
  - GitHub
excerpt: 本文记述了我由原来的Fluid主题切换到Zhaoo主题的详细过程，经历了不少辛酸。。。
article: false
---

# To Change My Blog Theme

> 参考文档：
>
> 强烈建议先看看[配置文档](https://www.izhaoo.com/2020/05/05/hexo-theme-zhaoo-doc/)！！！看完配置文档再食用本篇效果最佳！
>
> [hexo引入自定义css文件](https://yk1062008412.github.io/2017/02/20/hexo%E5%AF%BC%E5%85%A5%E8%87%AA%E5%AE%9A%E4%B9%89css%E6%96%87%E4%BB%B6/)
>
> [如何在hexo主题里用echarts写思维导图](https://blog.csdn.net/qq_41426117/article/details/105416911)
>
> [hexo-tag-echarts插件](http://zhoulvjun.github.io/2016/02/07/hexo-tag-echarts/)
>
> [5 分钟上手 ECharts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)
>
> [document.getElementById](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)
>
> [echarts dataset](https://echarts.apache.org/zh/option.html#title)

## 声明

<center><font color="#00FFFF" size=6><strong>首先要强调的是本人在前端这<br>只是有能看懂HTML和JavaScript的一点点代码的程度，<br>其它一概不知！</strong></font></center>

<center>本篇文章所描述的根目录都是指博客文件夹下的目录，一概标记为`/`。</center>

## 原因？

原来一直在使用Fluid主题，虽然使用过程没出什么问题，但是主页没有侧边栏就真的一直很介意，查过不知多少文档依旧无从下手解决添加侧边栏问题。又由于某种契机，我看到GitHub上的[Hexo-theme-zhaoo](https://github.com/zhaoo/hexo-theme-zhaoo)，便心动不已，二话不说就git clone过来了，然后在“有空”的时候修改一下主题。。。

## 过程！

首先是直接把我原来的博客文件夹另外复制了一份，这样就可以直接跳过配好SSH的过程以及一些初始化操作。然后我就开始折腾起来了：

---

首先打开终端进入根目录下，输入`git clone https://github.com/zhaoo/hexo-theme-zhaoo theme/zhaoo `来下载主题。

然后在_config.yml文件中修改theme一项，改为zhaoo。

---

在根目录下创建_config.zhaoo.yml配置文件。

执行`npm i`来安装一下依赖。「当时我发现好些东西被删掉了，但不用担心，需要的话确实还会再装回来。」

另外，由于原来的Fluid主题是内嵌LaTeX渲染器的，而新主题没有，因此我就又要去折腾渲染器的事。

不过还好，执行下两个指令就可以解决：

```
npm uninstall hexo-renderer-marked
npm install hexo-renderer-kramed --save
```

然后在_config.zhaoo.yml配置文件中添加：

```yaml
kramed:
  enable: true
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true

mathjax: true
```

---

接着需要重建SSH链接，需要安装hexo-deployer-git，执行`npm i hexo-deployer-git --save`，成功后执行`ssh -T git@github.com`来重建链接。

---

_config.zhaoo.yml配置文件中的copyright一项可以修改，使用HTML标记语言，最终效果是页面底部显示内容。另外，gray一项的功能挺有心意，是哀悼模式。pjax一项可以选择true。而主题中的gallery模块照配置文档来做即可，本篇不必赘述。另外切换主题的话，文章的Front-matter也相应发生了变化，具体看配置文档即可。不过提一句：这个主题也一样支持excerpt，可以在文章头添加`excerpt:`。

---

如果你的某些文章需要嵌入pdf文件，需要安装一下hexo-pdf，执行：

`npm i --save hexo-pdf`

---

注意，如果你有绘制思维导图甚至是动态图表需求的话，且听我接下来的讲述：

> 以下一大部分总结就一句话：在Hexo中JsMind就别想用了！不想了解详细情况的话可直接跳过这一部分，看我最终成功的取代方案。
>
> 另外，此时我的source文件夹下已经有：
>
> - css
> - js
>
> 其中css文件夹下有jsmind.css文件，js文件夹下有jquery.js、jsmind.js和jsmind.min.js文件。

起初尝试使用原来在用的hexo-markmap和hexo-simple-mindmap，但是发现这两个东西根本用不了「后来再回顾过来，如果当时再加入jQuery是不是就能正常了？」，渲染不出来我预期的效果，要不就是干脆直接空白，再加之早在先前就觉得很简陋，不太喜欢，于是我果断执行了：

```
npm un hexo-markmap
npm un hexo-simple-mindmap
```

然后我转去搜索取代的方案，终于我找到JsMind的方案，看了JsMind文档，正觉得这个还不错，渲染挺好看的，就想着拿来用，我重点参考了[JsMind文档](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/index.md)，然后照做一番，结果发现渲染失败。。。而且typora对代码处理的真不怎么好，要注意一下的是不要空四个格，因为这样会被解析为代码块，不能执行的那种。。。

使用JsMind，就要下载好对应的JS文件和CSS文件，

查过$\infty$个文档之后我总结一下有这四种方案，先说明白了，都不行！

**方案一**：直接写入JavaScript代码

最简单粗暴的方法，直接在md文件中加入如下代码「为了避开自己写可能出现错误，我下方特意使用官方文档的示例代码来写」：

```javascript
<link type="text/css" rel="stylesheet" href="/css/jsmind.css" />
<script type="text/javascript" src="/js/jsmind.js"></script>
<script type="text/javascript" src="/js/jsmind.draggable.js"></script>
<div id="jsmind_container"></div>
<script type="text/javascript">
    var mind = {
    "meta":{
        "name":"jsMind-demo-tree",
        "author":"hizzgdev@163.com",
        "version":"0.2"
    },
    "format":"node_tree",
    "data":{"id":"root","topic":"jsMind","children":[
        {"id":"easy","topic":"Easy","direction":"left","expanded":false,"children":[
            {"id":"easy1","topic":"Easy to show"},
            {"id":"easy2","topic":"Easy to edit"},
            {"id":"easy3","topic":"Easy to store"},
            {"id":"easy4","topic":"Easy to embed"}
        ]},
        {"id":"open","topic":"Open Source","direction":"right","expanded":true,"children":[
            {"id":"open1","topic":"on GitHub"},
            {"id":"open2","topic":"BSD License"}
        ]},
        {"id":"powerful","topic":"Powerful","direction":"right","children":[
            {"id":"powerful1","topic":"Base on Javascript"},
            {"id":"powerful2","topic":"Base on HTML5"},
            {"id":"powerful3","topic":"Depends on you"}
        ]},
        {"id":"other","topic":"test node","direction":"left","children":[
            {"id":"other1","topic":"I'm from local variable"},
            {"id":"other2","topic":"I can do everything"}
        ]}
    ]}
};
    var options = {
        container:'jsmind_container',
        editable:true,
        theme:'orange'
    };
    var jm = new jsMind(options);
    jm.show();
</script>
```

测试后，发现不行，什么也没显示。

**方案二**：Hexo脚本注入机制引入CSS

「这个其实不是自己查的，是在先前已经了解过Hexo5的新特性，就知道如何操作注入JS脚本」

在根目录下创建scripts文件夹，并在该文件夹下新建injector.js文件，写入如下代码：

```javascript
hexo.extend.injector.register('head_begin', `<link type="text/css" rel="stylesheet" href="/css/jsmind.css" />`, 'default');
// 括号中第一个参数可选head_begin、head_end、body_begin、body_end这四个选项。
// 括号中第二个参数要用``来括上，不要用错了！这里就是为了注入link标签
```

代码部分和方案一一致，但经过测试，还是什么也没显示。

**方案三**：HTML文件嵌入

新建一个HTML文本文件，将方案一中的JS代码写入这个文件「要符合HTML语法要求」，然后在md文件中写入：

```html
<iframe src="PATH_TO_YOUR_HTML"></iframe>
```

但除了套娃的效果，其余什么也没看到。。。

**方案四**：使用JavaScript动态引入CSS

在根目录下，进入js文件夹，新建include_css.js文件，写入如下代码：

```javascript
$(document).ready(function() {
	var url = '/css/my/test.css';
	var doc = document;
	var link = doc.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("type","text/css");
	link.setAttribute("href",url);
	var heads = doc.getElementsByTagName("head");
	if (heads.length) {
		heads[0].appendChild(link);
	}else{
		doc.documentElement.appendChild(link);
	}
});
```

然后在md文件中添加

```javascript
<script type="text/javascript" src="/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="/js/include_css.js"></script>
```

然后剩余部分和方案一的代码相同。

这一方法其实相当于Hexo注入，但依旧无效。

经过无数次尝试，我也在实践中发现，问题的根源在于这个CSS文件上，当我只引入js脚本时，页面倒也能渲染，但是所有的方框不能被渲染，就只剩下一群虫子般扭曲的线条了。。。而当我成功引入CSS文件时，该渲染区域就直接消失，什么也见不到。综上所述，最大的问题来自于CSS文件，而这直接在HTML文件中渲染一切正常，但我是使用了Hexo编译，由于其中的一些机制，本地代码和网页中的代码不一样，才会出现异常，但到底哪里有问题，我就不知道了。。。

<center><strong><font color="#00FFFF" size=6>那么问题来了，就没有可行方案了吗？</font></strong></center>

终于就在今天「2021-5-29」，我找到了[echarts](https://echarts.apache.org/examples/zh/index.html#chart-type-line)，看到这个就仿佛看到了胜利的曙光。

这个echarts给我带来了惊喜，非常意外！于是我立马研究如何使用了。

首先要说的是，如果你只是希望画简单的一些图，安装插件hexo-tag-echarts3就可以正常使用了，在md文件中用`{% echarts 400 '81%' %}`和`{% endecharts %}`括上你的代码就可以了。

然而我需要绘制一些比较复杂的，或者比较美观一些的，就不能用这个东西了。

我们不需要像[如何在hexo主题里用echarts写思维导图](https://blog.csdn.net/qq_41426117/article/details/105416911)这位博主说的那样下载什么echarts.min.js和jquery.js「当然你也可以直接下载」，我们用CDN来处理就好了。

我们只需要在根目录下的source文件夹中新建一个json文件夹，这就用来存放dataset文件「json文件」。

然后在md文件中写如下代码：

```javascript
<div id="chart-print" style="width:100%;height:800px;"></div>
<script src="https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript">
var chartDom = document.getElementById('chart-print');
var myChart = echarts.init(chartDom);
var option;
myChart.showLoading();
$.get('/json/' + 'data.json', function (data) {
    myChart.hideLoading();
    myChart.setOption(option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [data],
                top: '18%',
                bottom: '14%',
                layout: 'radial',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750,
                emphasis: {
                    focus: 'descendant'
                }
            }
        ]
    });
});
</script>
```

其实这段已经改好的代码中间还遇到了小挫折，就是在调试的时候发现页面消失，我就觉得很奇怪，将这段代码移植到HTML文件中再看一切正常，这就更奇怪了，又考虑到在这篇博客中有很多地方可能名称就是main，于是我把第6行代码随便改了个名称，就发现页面正常了，但是图形没渲染出来，我去排查一下发现，是charDom变量为空，然后我就去查看代码，并不能解决什么问题，又查了这个文档——[document.getElementById](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)就了解到，原来document.getElementById()这个方法是用来查找特定元素的ID的，于是我再去查看代码，发现那个ID就是`<div id="chart-print" style="width:100%;height:800px;"></div>`中的id，再把名称改一下，页面渲染成功，一切大功告成！

后来上传到GitHub Page时发现有个地方不稳定，有时候页面会显示不出来图表，调试一下发现是路径这里加载异常，本地代码写的都是对的，但加载异常。后来发现代码第10行的路径需要修改成`‘路径’+‘文件名’`的形式才能稳定。

## 插曲

随着使用时间的加长，我发现这个主题……什么？没有友链‽我直接……(?。?)？

![](/images/2021-06-03_09-27.png)

![](/images/2021-06-03_09-15.png)

这个Issue都开了5天多了，还是没人回，我现在甚至都认为这没人维护了，于是我便开始自己动手添加吧……没想到啊，最后求人还是不如求己……于是根据我丰富的踩坑经验，我开始着手造轮子……

- 首先在终端输入`hexo new page links`来创建友链页，进入<strong><font color="#70f3ff">博客目录文件夹</font></strong>下的source文件夹，你会发现多了一个links的文件夹，进入之后会发现只有一个index.md，这就是我们要改的东西了。

- 编辑index.md的Front-matter，修改为如下形式并保存：

  ```
  ---
  title: 友链
  type: "links"
  layout: "links"
  ---
  ```

- 然后你需要在_config.zhaoo.yml文件中的menu下添加：`link: /links/ || 友链`，接着就需要修改主题模板了。是的，这就涉及到主题文件的直接修改了。因为你通过观察<strong><font color="#ff3300">主题目录文件夹</font></strong>下的layouts文件夹就可以发现，每一个ejs文件「嵌入式JavaScript模板引擎文件」的文件名其实都是有同名文件夹与之对应着的。

- 我们在<strong><font color="#ff3300">主题目录文件夹</font></strong>下layouts文件夹中新建一个文件，名为`links.ejs`，由于我们预期的界面应该是与文章视图相同的，所以我为了省力，继续在这个目录下寻找有关post、article的模板文件了，最后东拼西凑，总算可以凑出来了。

  ```ejs
  <html>
  
  <body class="linkpage">
      <%
  page.layout = "links"
  page.title = theme.links.title || __('links.title')
  page.subtitle = theme.links.subtitle || __('links.subtitle')
  page.image = theme.links.image || __('/images/theme/post-image.jpg')
  %>
          <main id="linkpagemain">
              <div class="article-wrap">
                  <div class="row container">
                      <div class="col-xl-3"></div>
                      <div class="col-xl-6">
                          <article class="article">
                              <div class="wrap">
                                  <%- partial('_partial/post/head') %>
                                      <section class="main">
                                          <section class="extra">
                                              <div class="row links">
                                                  <% for(const each of theme.links.items || []) { %>
                                                      <% if (!each.title || !each.link) continue %>
                                                          <div class="card col-lg-4 col-md-6 col-sm-12">
                                                              <a href="<%= url_for(each.link) %>" class="card-body hover-with-bg" target="_blank" rel="noopener">
                                                                  <div class="card-content">
                                                                      <% if (each.avatar || each.image) { %>
                                                                          <div class="link-avatar my-auto">
                                                                              <img src="<%= each.avatar || each.image %>" alt="<%= each.title %>" onerror="this.onerror=null; this.src=this.srcset='<%= theme.links.onerror_avatar %>'" />
                                                                          </div>
                                                                          <% } %>
                                                                              <div class="link-text">
                                                                                  <div class="link-title">
                                                                                      <%- each.title %>
                                                                                  </div>
                                                                                  <div class="link-intro">
                                                                                      <%- each.intro || '' %>
                                                                                  </div>
                                                                              </div>
                                                                  </div>
                                                              </a>
                                                          </div>
                                                          <% } %>
                                              </div>
                                              <% if(theme.links.custom.enable && theme.links.custom.content) { %>
                                                  <!-- Custom -->
                                                  <div class="custom mx-auto">
                                                      <%- theme.links.custom.content %>
                                                  </div>
                                                  <% } %>
                                                      <% if (theme.donate.enable && page.donate !== false) { %>
                                                          <%- partial('_partial/post/donate') %>
                                                              <% } %>
                                                                  <%- partial('_partial/post/tag') %>
                                                                      <%- partial('_partial/post/nav') %>
                                          </section>
                                      </section>
                              </div>
                          </article>
                          <% if (theme.comments.enable) { %>
                              <%- partial('_partial/post/comments') %>
                                  <% } %>
                      </div>
                  </div>
              </div>
              </div>
          </main>
  </body>
  
  </html>
  ```

  其实这里是有参考之前我在用的fluid主题下的模板的，我拿过来做好移植的处理了。

- 最后就可以回到刚才的`_config.zhaoo.yml`文件中添加如下的配置信息了：

  ```yaml
  links:
    enable: true
    image: 
    title: 友情链接
    subtitle: 
    # 友链的成员项
    # Member item of page
    items:
      - {
        title: 
        intro: 
        link: 
        avatar: 
      }
    # 当成员头像加载失败时，替换为指定图片
    # When the member avatar fails to load, replace the specified image
    onerror_avatar: /images/avatar.png
  
    # 友链下方自定义区域，支持 HTML，可插入例如申请友链的文字
    # Custom content at the bottom of the links
    custom:
      enable: true
      content: '<hr><p>通过联系我申请加入我的友链，按如下格式提供信息：</p><ul><li>博客名：</li><li>简介：</li><li>链接：</li><li>图片：</li></ul>'
  ```

  **添加友链的操作到此结束，请放心食用。**

---

然后接下来，我就发现一个问题，当我配置好亮色模式下的主题时，一旦我点了切换亮暗模式的按钮，就会发现，亮色模式下的图片没发生变动，于是在整个暗色主题当中，亮色图片显得分外扎眼……我真挺想吐槽这一点的，既然您开发出这个主题，开设这个功能的时候，能想到要换页面的配色方案，那您为啥没想到要换背景的事呢？？？于是我开始着手处理这件非常棘手的事「开头已经声明，我没有任何前端基础。」。

我花了大量精力以及大量时间去研究、学习与理解，最终发现，这个主题的外观配置居然直接拿CSS定义就载入的，这意味着什么？你在页面下是无法通过代码直接访问到这个属性的，页面下一切有关定义都是undefined，但现在我希望它能改动，那我就有两种方式，一是使用JS直接动态修改CSS，但这方法迄今为止我依旧没能找到。另一个方案是使用JS动态载入CSS文件，用新的CSS文件写覆盖原来的样式，我自然是采取后者的做法。

首先要在<strong><font color="#70f3ff">博客目录文件夹</font></strong>下的source文件夹中创建css文件夹「为了以后方便快速管理css文件」，并在里面新建`lightbg.css`和`darkbg.css`两个文件，并都使用如下的代码模板：

```css
@charset "utf-8";
body {
    background-image: url(".../×××.jpg"); //这要指定你的图片路径，包括但不限于jpg图片格式。
}
```

然后重点来了，我们要开始修改`color-mode.js`文件了，因为我们希望在点击切换按钮的时候能触发切换壁纸的事件。打开在<strong><font color="#ff3300">主题目录文件夹</font></strong>下的source文件夹中的js文件夹，找到并编辑`color-mode.js`，在定义变量的区域后插入如下代码：

```javascript
    window.onload = function() {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = "bgimg";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = document.getElementById('color-toggle').getAttribute('color-toggle') === "light" ? "/css/lightbg.css" : "/css/darkbg.css";
        head.appendChild(link);
    }
```

然后找到switchColorMode这个函数变量，在其中添加代码，最后这里的样子应该如此：

```javascript
    var switchColorMode = function() {
        if (!toggleElement) return;
        toggleElement.addEventListener('click', function() {
            var mode = this.getAttribute(toggleAttribute) === 'light' ? 'dark' : 'light';
            setColorMode(mode);
            setIcon(mode);
            setHighlightStyle(mode);
            //以下是新加的代码：
            document.getElementById('bgimg').setAttribute('href', mode === 'light' ? "/css/lightbg.css" : "/css/darkbg.css");
        });
```

使用window.onload方法的原因在于：如果不使用这个方法，而是直接写的话，当你进入其中某一文章后又退回主页时，你会发现这背景竟然变回去了，检查一下，你会发现连自己创建出来的标签都消失了，但经过我长时间的排查考证，其实这个脚本就是只加载一次，在最开始加载页面的时候加载的，进入其他界面时这个脚本一直都在，因此退回主页之后脚本并不会直接重新执行那一段代码，根据以往我的C#经验，我给出的解决方案就是将这段代码定义为页面加载时触发的事件即可解决。

---

由于本人喜欢水墨风，亮色主题下设置出水墨风的搭配后，发现进入文章就会感觉文章版块所在位置遮挡了较大一部分，有些影响美观，由发现我手里还有一个水墨图片适合这个界面，但放在主页面就感觉不太好看，于是我决定想个办法让它在两个视图中加载不同的背景。然而折腾到最后，还是做做写覆盖的操作了。

在<strong><font color="#70f3ff">博客目录文件夹</font></strong>下的source文件夹中创建js文件夹「同样也是便于日后直接快速管理我的js文件」，并在其中新建`post_bg_img.js`，写入如下代码：

```javascript
if (window.onload != null) { var f1 = window.onload; }
window.onload = function() {
    if (document.getElementsByTagName('article')[0]) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style'); 
        style.id = "postbgimg";
        style.type = "text/css"
        style.rel = "stylesheet";
        var code = document.getElementById('color-toggle').getAttribute('color-toggle') === "light" ? "@charset \"utf-8\";body { background-image: url(\"/images/Wallpapers/shanshui_guohua-004.jpg\") !important; }" : "@charset \"utf-8\";body { background-image: url(\"/images/Wallpapers/galaxy_apple_technology_hd_macbook.jpg\") !important; }"; 
        style.innerHTML = code;
        head.appendChild(style);
    }
    if (f1 != null) { f1(); }
}
```

而刚才编辑过的`color-mode.js`也需要修改一下，将上面的代码改成如下形式：

```javascript
if (window.onload != null) { var f2 = window.onload; }
    window.onload = function() {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = "bgimg";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = document.getElementById('color-toggle').getAttribute('color-toggle') === "light" ? "/css/lightbg.css" : "/css/darkbg.css";
        head.appendChild(link);
        if (f2 != null) { f2(); }
    }
```

后面的switchColorMode函数变量也要再添加新的东西：

```javascript
    var switchColorMode = function() {
        if (!toggleElement) return;
        toggleElement.addEventListener('click', function() {
            var mode = this.getAttribute(toggleAttribute) === 'light' ? 'dark' : 'light';
            setColorMode(mode);
            setIcon(mode);
            setHighlightStyle(mode);
            //以下是相对最开始时所添加的代码：
            document.getElementById('bgimg').setAttribute('href', mode === 'light' ? "/css/lightbg.css" : "/css/darkbg.css");
            var stylelabel = document.getElementById("postbgimg");
            var code = document.getElementById('color-toggle').getAttribute('color-toggle') === "light" ? "@charset \"utf-8\";body { background-image: url(\"/images/Wallpapers/shanshui_guohua-004.jpg\") !important; }" : "@charset \"utf-8\";body { background-image: url(\"/images/Wallpapers/galaxy_apple_technology_hd_macbook.jpg\") !important; }";
            stylelabel.innerHTML = code;
        });
```

可能你在奇怪为啥会出现这个形式：

```javascript
if (window.onload != null) { var f1 = window.onload; }
window.onload = function() {
    ......
    if (f1 != null) { f1(); }
}
```

这是因为，在多个文件中定义window.onload方法后，而在执行时实际上只会执行最后加入的一种定义，前面添加的一概作废，因此为了能让这些定义都同时采用，就写成了以上的形式。

最终，我是终于完成了博客的小改动，现在感觉更加舒服了……

## 结果～

来看看我的博客？-->[·](https://breezeshane.github.io/)

🥺🥺🥺如果可以的话，能给个star吗？🥺🥺🥺

## “睿智”作者的话「不重要」

搭建博客这一过程非常艰辛，尤其对于我这种没学习过前端的人来说更是如此，虽然我用Hexo搭的博客，感觉上好像可能会是有手就行，别人都给你写好了，但至少我遇到的这位主虽然写了很不错、有意思的主题，但对于我来说缺了一些东西。通过这次改动，我也学到了不少前端知识，收获还真的不小！
