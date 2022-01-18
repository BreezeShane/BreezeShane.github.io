---
title: 在受限的网站里强制复制粘贴
date: 2021-05-14 17:11:00
author: Breeze Shane
top: false
excerpt: 本文介绍了一些常用的破解限制复制的“犯罪”小技巧。
image: /images/cv.png
banner_img: 
toc: true
mathjax: false
categories: 
 - Web
 - Front-end
tags: 
 - Web
 - Front-end
 - CV Method
 - Crack Web Pages
article: false
---

# 在受限的网站里强制复制粘贴

> 参考：
>
> [功能实现-解除页面禁止复制功能](https://segmentfault.com/a/1190000039087909)
>
> [Chrome下如何复制禁止复制网页上的文字](https://blog.csdn.net/facecrazy/article/details/46791443)
>
> [网页禁止复制粘贴怎么办？教你六招轻松搞定](https://news.mydrivers.com/1/651/651484.htm)
>
> [网页禁止复制的实现方法](https://www.jianshu.com/p/5550da3fad49)

## 背景

像我这样“睿智”儿童，天天上网扒人家……博客，然后各种复制白嫖写报告，结果这样的事做多了，官方都看不下去了，就开始打压俺了，设置了各种障碍，说什么也不让我愉快地学（fù）习（zhì）了，不是让我去登陆，就是让我去付费，价钱还不便宜「🤬🤬🤬最重要的是根本不值这个价🤬🤬🤬」，哎，我就学习一下，稍微用亿点点，不行咯？😢😢😢

难道我就没有办法了吗？不行，说什么也得想个办法把在眼前的资料白嫖到手！

## 实现方法

### 插件大法

我选择的是Enable Copy插件，不过似乎在一些网站发挥的作用不是很好，有的网站要在未加载完之前就要复制文字，否则就失效，不过这没啥，不影响用，只要手速快，浏览器就反应不过来🤣🤣🤣

Chrome浏览器请点[这里](https://chrome.google.com/webstore/detail/enable-copy/lmnganadkecefnhncokdlaohlkneihio/related?sid=MbjBMX)安装插件。

Firefox浏览器请点[这里]()安装插件。

### 查看源码大法

在浏览器的菜单里找到开发者工具的一项并点击（也可以使用快捷键<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>），然后搜索`<p>`的关键词，这时候就可以看到你希望复制的正文了。

> 不同浏览器打开开发者工具的方法都不太一样，总之是个正常的浏览器都会有开发者工具这一项的，找一找总会有的。

### Console操作大法

#### 全文复制

打开开发者工具，在Console控制台中输入`document.body.innerText`就会得到它当前页面的所有文字信息「不仅限于文章」。

如果你遇到如下形式的输出：

![](/images/2021-05-14_17-26.png)

也不要深恶痛绝，我们还有一个好东西可以直接消除这些转义字符——echo。

写Shell文件，输入如下代码：

```shell
echo -e "你复制的所有内容" >> new.txt #后面的文件名是任取的。
```

执行完这个脚本文件，文章显示一切正常！

![](/images/2021-05-14_17-30.png)

#### 选中区域复制

如果你只是想复制一段文字，那么采用上一个方法太过笨拙，其实我们还有更高效的做法：

1. 打开开发者工具
2. 选中网页中要复制的文字
3. 在Console控制台输入`window.getSelection(0).toString();`

这时候你就可以看到你希望的文字出现在控制台内了！

### 打印预览大法

按下<kbd>Ctrl</kbd>+<kbd>P</kbd>来打印该网页，在打印预览中再进行选中复制即可。

### 领进家门再拆大法

按下<kbd>Ctrl</kbd>+<kbd>S</kbd>来保存该网页，注意仅保存HTML文件。下载完后再打开复制。

### 终极杀招

<table><tr><td bgcolor=#FF6347><center><font color="#000000"><strong>没什么说的，直接禁用加载js就万事大吉……</strong></font></center></td></tr></table>

## 补充的小知识

知其然，也要知其所以然。我一直都很奇怪为什么这些网站能限制我的操作，虽说大致能想到是用了JS或者其他写了判断来禁用我的对应操作。这回我总算了解到是如何实现的了：

### JavaScript实现方式

```Javascript
// 禁用右键菜单、复制、选择
$(document).bind("contextmenu copy selectstart", function() {
  return false;
});
```

```javascript
// 禁用Ctrl+C和Ctrl+V（所有浏览器均支持）
$(document).keydown(function(e) {
  if(e.ctrlKey && (e.keyCode == 65 || e.keyCode == 67)) {
    return false;
  }
});
```

### CSS实现方式

```css
body {
  -moz-user-select:none; /* Firefox私有属性 */
  -webkit-user-select:none; /* WebKit内核私有属性 */
  -ms-user-select:none; /* IE私有属性(IE10及以后) */
  -khtml-user-select:none; /* KHTML内核私有属性 */
  -o-user-select:none; /* Opera私有属性 */
  user-select:none; /* CSS3属性 */
}
```

### HTML实现方式

```html
<body oncopy="return false" oncut="return false;" onselectstart="return false" >
```

