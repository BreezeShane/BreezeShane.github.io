---
title: Markdown语法杂记
date: 2021-4-12 19:25:00
author: Breeze Shane
toc: true
mathjax: false
categories: Markdown
article: false
tags: 
  - Markdown
---
# Markdown语法杂记
---
> 参考的博客有：
> [Markdown语法大全(超级版)](https://www.jianshu.com/p/ebe52d2d468f)
> [Markdown教程语法汇总大全](https://zhuanlan.zhihu.com/p/75286458)
> [Markdown 扩展语法](https://www.markdown.xyz/extended-syntax/)
> [表情符号简码列表](https://gist.github.com/rxaviers/7360908)
> [markdown语法大全](https://www.cnblogs.com/miki-peng/articles/12502985.html)
---
## 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### ... n级标题
也可以写成如下形式：
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```

### 标题效果

# 一级标题

## 二级标题
### 三级标题

---

## 显示目录结构

```markdown
[TOC]
```

### 显示目录结构效果(部分环境下不可用)

[TOC]

---

## 超链接

```markdown
[超链接显示名](超链接地址 "超链接title")
其中"超链接title"可有可无。
另外也可写成下列形式：
<a href="超链接地址" title="超链接title">超链接显示名</a>
```

### 超链接效果

[超链接显示名](超链接地址 "超链接title")

---

## 超链接的简洁用法

```markdown
[GitHub][1]
[Google][2]
[StackOverflow][3]

[1]: https://github.com/
[2]: https://www.google.com/
[3]: https://stackoverflow.com/
```



### 超链接简洁用法效果

[GitHub][1]
[Google][2]
[StackOverflow][3]

[1]: https://github.com/
[2]: https://www.google.com/
[3]: https://stackoverflow.com/

「注」：下列写法等效：

- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)`

---

## 图片

```markdown
![图片alt](图片链接 "图片title")
也可写成如下形式：
<img src="图片链接" alt="图片alt" title="图片title">
如果希望能自定义图片的大小，则使用普通的标签来写：
<img src="http://static.runoob.com/images/runoob-logo.png" width="50%">
```

### 图片效果

![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif "图片Title")

<img src="http://static.runoob.com/images/runoob-logo.png" width="50%">

## 字体

### 粗体、斜体、删除线、下划线

```markdown
**这是加粗的文字**			也可以写成<strong>   </strong>
*这是倾斜的文字*			也可以写成<em>   </em>
***这是斜体加粗的文字***
++这是带下划线的文字++
==我亮了！==
~~这是加删除线的文字~~
___还有这个也是斜体加粗！___ 也可以写成
然而最后一种方式并不推荐，因为存在不兼容的问题。
```

#### 字体效果

**这是加粗的文字**
*这是倾斜的文字*
***这是斜体加粗的文字***
<u>这是带下划线的文字</u>
==我亮了！==
~~这是加删除线的文字~~
___还有这个也是斜体加粗！___

### 字体颜色修改

```
<font color="#dd0000">文字颜色预览</font>
```

#### 字体颜色修改效果

<font color="#dd0000">文字颜色预览</font>

| 颜色名               | 十六进制颜色值                               | 颜色               | 预览 |
| :------------------: | :------------------------------------------: | :----------------: | :--: |
| AliceBlue            | #F0F8FF | rgb(240, 248, 255) | <table><tr><td bgcolor=#F0F8FF></td></tr></table> |
| AntiqueWhite         | #FAEBD7 | rgb(250, 235, 215) | <table><tr><td bgcolor=#FAEBD7></td></tr></table> |
| Aqua                 | #00FFFF | rgb(0, 255, 255)   | <table><tr><td bgcolor=#00FFFF></td></tr></table> |
| Aquamarine           | #7FFFD4 | rgb(127, 255, 212) | <table><tr><td bgcolor=#7FFFD4></td></tr></table> |
| Azure                | #F0FFFF | rgb(240, 255, 255) | <table><tr><td bgcolor=#F0FFFF></td></tr></table> |
| Beige                | #F5F5DC | rgb(245, 245, 220) | <table><tr><td bgcolor=#F5F5DC></td></tr></table> |
| Bisque               | #FFE4C4 | rgb(255, 228, 196) | <table><tr><td bgcolor=#FFE4C4></td></tr></table> |
| Black                | #000000 | rgb(0, 0, 0)       | <table><tr><td bgcolor=#000000></td></tr></table> |
| BlanchedAlmond       | #FFEBCD | rgb(255, 235, 205) | <table><tr><td bgcolor=#FFEBCD></td></tr></table> |
| Blue                 | #0000FF | rgb(0, 0, 255)     | <table><tr><td bgcolor=#0000FF></td></tr></table> |
| BlueViolet           | #8A2BE2 | rgb(138, 43, 226)  | <table><tr><td bgcolor=#8A2BE2></td></tr></table> |
| Brown                | #A52A2A | rgb(165, 42, 42)   | <table><tr><td bgcolor=#A52A2A></td></tr></table> |
| BurlyWood            | #DEB887 | rgb(222, 184, 135) | <table><tr><td bgcolor=#DEB887></td></tr></table> |
| CadetBlue            | #5F9EA0 | rgb(95, 158, 160)  | <table><tr><td bgcolor=#5F9EA0></td></tr></table> |
| Chartreuse           | #7FFF00 | rgb(127, 255, 0)   | <table><tr><td bgcolor=#7FFF00></td></tr></table> |
| Chocolate            | #D2691E | rgb(210, 105, 30)  | <table><tr><td bgcolor=#D2691E></td></tr></table> |
| Coral                | #FF7F50 | rgb(255, 127, 80)  | <table><tr><td bgcolor=#FF7F50></td></tr></table> |
| CornflowerBlue       | #6495ED | rgb(100, 149, 237) | <table><tr><td bgcolor=#6495ED></td></tr></table> |
| Cornsilk             | #FFF8DC | rgb(255, 248, 220) | <table><tr><td bgcolor=#FFF8DC></td></tr></table> |
| Crimson              | #DC143C | rgb(220, 20, 60)   | <table><tr><td bgcolor=#DC143C></td></tr></table> |
| Cyan                 | #00FFFF | rgb(0, 255, 255)   | <table><tr><td bgcolor=#00FFFF></td></tr></table> |
| DarkBlue             | #00008B | rgb(0, 0, 139)     | <table><tr><td bgcolor=#00008B></td></tr></table> |
| DarkCyan             | #008B8B | rgb(0, 139, 139)   | <table><tr><td bgcolor=#008B8B></td></tr></table> |
| DarkGoldenRod        | #B8860B | rgb(184, 134, 11)  | <table><tr><td bgcolor=#B8860B></td></tr></table> |
| DarkGray             | #A9A9A9 | rgb(169, 169, 169) | <table><tr><td bgcolor=#A9A9A9></td></tr></table> |
| DarkGreen            | #006400 | rgb(0, 100, 0)     | <table><tr><td bgcolor=#006400></td></tr></table> |
| DarkKhaki            | #BDB76B | rgb(189, 183, 107) | <table><tr><td bgcolor=#BDB76B></td></tr></table> |
| DarkMagenta          | #8B008B | rgb(139, 0, 139)   | <table><tr><td bgcolor=#8B008B></td></tr></table> |
| DarkOliveGreen       | #556B2F | rgb(85, 107, 47)   | <table><tr><td bgcolor=#556B2F></td></tr></table> |
| Darkorange           | #FF8C00 | rgb(255, 140, 0)   | <table><tr><td bgcolor=#FF8C00></td></tr></table> |
| DarkOrchid           | #9932CC | rgb(153, 50, 204)  | <table><tr><td bgcolor=#9932CC></td></tr></table> |
| DarkRed              | #8B0000 | rgb(139, 0, 0)     | <table><tr><td bgcolor=#8B0000></td></tr></table> |
| DarkSalmon           | #E9967A | rgb(233, 150, 122) | <table><tr><td bgcolor=#E9967A></td></tr></table> |
| DarkSeaGreen         | #8FBC8F | rgb(143, 188, 143) | <table><tr><td bgcolor=#8FBC8F></td></tr></table> |
| DarkSlateBlue        | #483D8B | rgb(72, 61, 139)   | <table><tr><td bgcolor=#483D8B></td></tr></table> |
| DarkSlateGray        | #2F4F4F | rgb(47, 79, 79)    | <table><tr><td bgcolor=#2F4F4F></td></tr></table> |
| DarkTurquoise        | #00CED1 | rgb(0, 206, 209)   | <table><tr><td bgcolor=#00CED1></td></tr></table> |
| DarkViolet           | #9400D3 | rgb(148, 0, 211)   | <table><tr><td bgcolor=#9400D3></td></tr></table> |
| DeepPink             | #FF1493 | rgb(255, 20, 147)  | <table><tr><td bgcolor=#FF1493></td></tr></table> |
| DeepSkyBlue          | #00BFFF | rgb(0, 191, 255)   | <table><tr><td bgcolor=#00BFFF></td></tr></table> |
| DimGray              | #696969 | rgb(105, 105, 105) | <table><tr><td bgcolor=#696969></td></tr></table> |
| DodgerBlue           | #1E90FF | rgb(30, 144, 255)  | <table><tr><td bgcolor=#1E90FF></td></tr></table> |
| Feldspar             | #D19275 | rgb(209, 146, 117) | <table><tr><td bgcolor=#D19275></td></tr></table> |
| FireBrick            | #B22222 | rgb(178, 34, 34)   | <table><tr><td bgcolor=#B22222></td></tr></table> |
| FloralWhite          | #FFFAF0 | rgb(255, 250, 240) | <table><tr><td bgcolor=#FFFAF0></td></tr></table> |
| ForestGreen          | #228B22 | rgb(34, 139, 34)   | <table><tr><td bgcolor=#228B22></td></tr></table> |
| Fuchsia              | #FF00FF | rgb(255, 0, 255)   | <table><tr><td bgcolor=#FF00FF></td></tr></table> |
| Gainsboro            | #DCDCDC | rgb(220, 220, 220) | <table><tr><td bgcolor=#DCDCDC></td></tr></table> |
| GhostWhite           | #F8F8FF | rgb(248, 248, 255) | <table><tr><td bgcolor=#F8F8FF></td></tr></table> |
| Gold                 | #FFD700 | rgb(255, 215, 0)   | <table><tr><td bgcolor=#FFD700></td></tr></table> |
| GoldenRod            | #DAA520 | rgb(218, 165, 32)  | <table><tr><td bgcolor=#DAA520></td></tr></table> |
| Gray                 | #808080 | rgb(128, 128, 128) | <table><tr><td bgcolor=#808080></td></tr></table> |
| Green                | #008000 | rgb(0, 128, 0)     | <table><tr><td bgcolor=#008000></td></tr></table> |
| GreenYellow          | #ADFF2F | rgb(173, 255, 47)  | <table><tr><td bgcolor=#ADFF2F></td></tr></table> |
| HoneyDew             | #F0FFF0 | rgb(240, 255, 240) | <table><tr><td bgcolor=#F0FFF0></td></tr></table> |
| HotPink              | #FF69B4 | rgb(255, 105, 180) | <table><tr><td bgcolor=#FF69B4></td></tr></table> |
| IndianRed            | #CD5C5C | rgb(205, 92, 92)   | <table><tr><td bgcolor=#CD5C5C></td></tr></table> |
| Indigo               | #4B0082 | rgb(75, 0, 130)    | <table><tr><td bgcolor=#4B0082></td></tr></table> |
| Ivory                | #FFFFF0 | rgb(255, 255, 240) | <table><tr><td bgcolor=#FFFFF0></td></tr></table> |
| Khaki                | #F0E68C | rgb(240, 230, 140) | <table><tr><td bgcolor=#F0E68C></td></tr></table> |
| Lavender             | #E6E6FA | rgb(230, 230, 250) | <table><tr><td bgcolor=#E6E6FA></td></tr></table> |
| LavenderBlush        | #FFF0F5 | rgb(255, 240, 245) | <table><tr><td bgcolor=#FFF0F5></td></tr></table> |
| LawnGreen            | #7CFC00 | rgb(124, 252, 0)   | <table><tr><td bgcolor=#7CFC00></td></tr></table> |
| LemonChiffon         | #FFFACD | rgb(255, 250, 205) | <table><tr><td bgcolor=#FFFACD></td></tr></table> |
| LightBlue            | #ADD8E6 | rgb(173, 216, 230) | <table><tr><td bgcolor=#ADD8E6></td></tr></table> |
| LightCoral           | #F08080 | rgb(240, 128, 128) | <table><tr><td bgcolor=#F08080></td></tr></table> |
| LightCyan            | #E0FFFF | rgb(224, 255, 255) | <table><tr><td bgcolor=#E0FFFF></td></tr></table> |
| LightGoldenRodYellow | #FAFAD2 | rgb(250, 250, 210) | <table><tr><td bgcolor=#FAFAD2></td></tr></table> |
| LightGrey            | #D3D3D3 | rgb(211, 211, 211) | <table><tr><td bgcolor=#D3D3D3></td></tr></table> |
| LightGreen           | #90EE90 | rgb(144, 238, 144) | <table><tr><td bgcolor=#90EE90></td></tr></table> |
| LightPink            | #FFB6C1 | rgb(255, 182, 193) | <table><tr><td bgcolor=#FFB6C1></td></tr></table> |
| LightSalmon          | #FFA07A | rgb(255, 160, 122) | <table><tr><td bgcolor=#FFA07A></td></tr></table> |
| LightSeaGreen        | #20B2AA | rgb(32, 178, 170)  | <table><tr><td bgcolor=#20B2AA></td></tr></table> |
| LightSkyBlue         | #87CEFA | rgb(135, 206, 250) | <table><tr><td bgcolor=#87CEFA></td></tr></table> |
| LightSlateBlue       | #8470FF | rgb(132, 112, 255) | <table><tr><td bgcolor=#8470FF></td></tr></table> |
| LightSlateGray       | #778899 | rgb(119, 136, 153) | <table><tr><td bgcolor=#778899></td></tr></table> |
| LightSteelBlue       | #B0C4DE | rgb(176, 196, 222) | <table><tr><td bgcolor=#B0C4DE></td></tr></table> |
| LightYellow          | #FFFFE0 | rgb(255, 255, 224) | <table><tr><td bgcolor=#FFFFE0></td></tr></table> |
| Lime                 | #00FF00 | rgb(0, 255, 0)     | <table><tr><td bgcolor=#00FF00></td></tr></table> |
| LimeGreen            | #32CD32 | rgb(50, 205, 50)   | <table><tr><td bgcolor=#32CD32></td></tr></table> |
| Linen                | #FAF0E6 | rgb(250, 240, 230) | <table><tr><td bgcolor=#FAF0E6></td></tr></table> |
| Magenta              | #FF00FF | rgb(255, 0, 255)   | <table><tr><td bgcolor=#FF00FF></td></tr></table> |
| Maroon               | #800000 | rgb(128, 0, 0)     | <table><tr><td bgcolor=#800000></td></tr></table> |
| MediumAquaMarine     | #66CDAA | rgb(102, 205, 170) | <table><tr><td bgcolor=#66CDAA></td></tr></table> |
| MediumBlue           | #0000CD | rgb(0, 0, 205)     | <table><tr><td bgcolor=#0000CD></td></tr></table> |
| MediumOrchid         | #BA55D3 | rgb(186, 85, 211)  | <table><tr><td bgcolor=#BA55D3></td></tr></table> |
| MediumPurple         | #9370D8 | rgb(147, 112, 216) | <table><tr><td bgcolor=#9370D8></td></tr></table> |
| MediumSeaGreen       | #3CB371 | rgb(60, 179, 113)  | <table><tr><td bgcolor=#3CB371></td></tr></table> |
| MediumSlateBlue      | #7B68EE | rgb(123, 104, 238) | <table><tr><td bgcolor=#7B68EE></td></tr></table> |
| MediumSpringGreen    | #00FA9A | rgb(0, 250, 154)   | <table><tr><td bgcolor=#00FA9A></td></tr></table> |
| MediumTurquoise      | #48D1CC | rgb(72, 209, 204)  | <table><tr><td bgcolor=#48D1CC></td></tr></table> |
| MediumVioletRed      | #C71585 | rgb(199, 21, 133)  | <table><tr><td bgcolor=#C71585></td></tr></table> |
| MidnightBlue         | #191970 | rgb(25, 25, 112)   | <table><tr><td bgcolor=#191970></td></tr></table> |
| MintCream            | #F5FFFA | rgb(245, 255, 250) | <table><tr><td bgcolor=#F5FFFA></td></tr></table> |
| MistyRose            | #FFE4E1 | rgb(255, 228, 225) | <table><tr><td bgcolor=#FFE4E1></td></tr></table> |
| Moccasin             | #FFE4B5 | rgb(255, 228, 181) | <table><tr><td bgcolor=#FFE4B5></td></tr></table> |
| NavajoWhite          | #FFDEAD | rgb(255, 222, 173) | <table><tr><td bgcolor=#FFDEAD></td></tr></table> |
| Navy                 | #000080 | rgb(0, 0, 128)     | <table><tr><td bgcolor=#000080></td></tr></table> |
| OldLace              | #FDF5E6 | rgb(253, 245, 230) | <table><tr><td bgcolor=#FDF5E6></td></tr></table> |
| Olive                | #808000 | rgb(128, 128, 0)   | <table><tr><td bgcolor=#808000></td></tr></table> |
| OliveDrab            | #6B8E23 | rgb(107, 142, 35)  | <table><tr><td bgcolor=#6B8E23></td></tr></table> |
| Orange               | #FFA500 | rgb(255, 165, 0)   | <table><tr><td bgcolor=#FFA500></td></tr></table> |
| OrangeRed            | #FF4500 | rgb(255, 69, 0)    | <table><tr><td bgcolor=#FF4500></td></tr></table> |
| Orchid               | #DA70D6 | rgb(218, 112, 214) | <table><tr><td bgcolor=#DA70D6></td></tr></table> |
| PaleGoldenRod        | #EEE8AA | rgb(238, 232, 170) | <table><tr><td bgcolor=#EEE8AA></td></tr></table> |
| PaleGreen            | #98FB98 | rgb(152, 251, 152) | <table><tr><td bgcolor=#98FB98></td></tr></table> |
| PaleTurquoise        | #AFEEEE | rgb(175, 238, 238) | <table><tr><td bgcolor=#AFEEEE></td></tr></table> |
| PaleVioletRed        | #D87093 | rgb(216, 112, 147) | <table><tr><td bgcolor=#D87093></td></tr></table> |
| PapayaWhip           | #FFEFD5 | rgb(255, 239, 213) | <table><tr><td bgcolor=#FFEFD5></td></tr></table> |
| PeachPuff            | #FFDAB9 | rgb(255, 218, 185) | <table><tr><td bgcolor=#FFDAB9></td></tr></table> |
| Peru                 | #CD853F | rgb(205, 133, 63)  | <table><tr><td bgcolor=#CD853F></td></tr></table> |
| Pink                 | #FFC0CB | rgb(255, 192, 203) | <table><tr><td bgcolor=#FFC0CB></td></tr></table> |
| Plum                 | #DDA0DD | rgb(221, 160, 221) | <table><tr><td bgcolor=#DDA0DD></td></tr></table> |
| PowderBlue           | #B0E0E6 | rgb(176, 224, 230) | <table><tr><td bgcolor=#B0E0E6></td></tr></table> |
| Purple               | #800080 | rgb(128, 0, 128)   | <table><tr><td bgcolor=#800080></td></tr></table> |
| Red                  | #FF0000 | rgb(255, 0, 0)     | <table><tr><td bgcolor=#FF0000></td></tr></table> |
| RosyBrown            | #BC8F8F | rgb(188, 143, 143) | <table><tr><td bgcolor=#BC8F8F></td></tr></table> |
| RoyalBlue            | #4169E1 | rgb(65, 105, 225)  | <table><tr><td bgcolor=#4169E1></td></tr></table> |
| SaddleBrown          | #8B4513 | rgb(139, 69, 19)   | <table><tr><td bgcolor=#8B4513></td></tr></table> |
| Salmon               | #FA8072 | rgb(250, 128, 114) | <table><tr><td bgcolor=#FA8072></td></tr></table> |
| SandyBrown           | #F4A460 | rgb(244, 164, 96)  | <table><tr><td bgcolor=#F4A460></td></tr></table> |
| SeaGreen             | #2E8B57 | rgb(46, 139, 87)   | <table><tr><td bgcolor=#2E8B57></td></tr></table> |
| SeaShell             | #FFF5EE | rgb(255, 245, 238) | <table><tr><td bgcolor=#FFF5EE></td></tr></table> |
| Sienna               | #A0522D | rgb(160, 82, 45)   | <table><tr><td bgcolor=#A0522D></td></tr></table> |
| Silver               | #C0C0C0 | rgb(192, 192, 192) | <table><tr><td bgcolor=#C0C0C0></td></tr></table> |
| SkyBlue              | #87CEEB | rgb(135, 206, 235) | <table><tr><td bgcolor=#87CEEB></td></tr></table> |
| SlateBlue            | #6A5ACD | rgb(106, 90, 205)  | <table><tr><td bgcolor=#6A5ACD></td></tr></table> |
| SlateGray            | #708090 | rgb(112, 128, 144) | <table><tr><td bgcolor=#708090></td></tr></table> |
| Snow                 | #FFFAFA | rgb(255, 250, 250) | <table><tr><td bgcolor=#FFFAFA></td></tr></table> |
| SpringGreen          | #00FF7F | rgb(0, 255, 127)   | <table><tr><td bgcolor=#00FF7F></td></tr></table> |
| SteelBlue            | #4682B4 | rgb(70, 130, 180)  | <table><tr><td bgcolor=#4682B4></td></tr></table> |
| Tan                  | #D2B48C | rgb(210, 180, 140) | <table><tr><td bgcolor=#D2B48C></td></tr></table> |
| Teal                 | #008080 | rgb(0, 128, 128)   | <table><tr><td bgcolor=#008080></td></tr></table> |
| Thistle              | #D8BFD8 | rgb(216, 191, 216) | <table><tr><td bgcolor=#D8BFD8></td></tr></table> |
| Tomato               | #FF6347 | rgb(255, 99, 71)   | <table><tr><td bgcolor=#FF6347></td></tr></table> |
| Turquoise            | #40E0D0 | rgb(64, 224, 208)  | <table><tr><td bgcolor=#40E0D0></td></tr></table> |
| Violet               | #EE82EE | rgb(238, 130, 238) | <table><tr><td bgcolor=#EE82EE></td></tr></table> |
| VioletRed            | #D02090 | rgb(208, 32, 144)  | <table><tr><td bgcolor=#D02090></td></tr></table> |
| Wheat                | #F5DEB3 | rgb(245, 222, 179) | <table><tr><td bgcolor=#F5DEB3></td></tr></table> |
| White                | #FFFFFF | rgb(255, 255, 255) | <table><tr><td bgcolor=#FFFFFF></td></tr></table> |
| WhiteSmoke           | #F5F5F5 | rgb(245, 245, 245) | <table><tr><td bgcolor=#F5F5F5></td></tr></table> |
| Yellow               | #FFFF00 | rgb(255, 255, 0)   | <table><tr><td bgcolor=#FFFF00></td></tr></table> |
| YellowGreen          | #9ACD32 | rgb(154, 205, 50)  | <table><tr><td bgcolor=#9ACD32></td></tr></table> |


### 字体大小修改

```markdown
size为1：<font size="1">size为1</font>
size为2：<font size="2">size为2</font>
size为3：<font size="3">size为3</font>
size为4：<font size="4">size为4</font>
size为5：<font size="5">size为5</font>
size为6：<font size="6">size为6</font>
```

#### 字体大小修改效果

size为1：<font size="1">size为1</font>
size为2：<font size="2">size为2</font>
size为3：<font size="3">size为3</font>
size为4：<font size="4">size为4</font>
size为5：<font size="5">size为5</font>
size为6：<font size="6">size为6</font>

### 字体类型

```markdown
<font face="黑体">我是黑体字</font> 
<font face="宋体">我是宋体字</font> 
<font face="楷体">我是楷体字</font> 
<font face="微软雅黑">我是微软雅黑字</font> 
<font face="fantasy">我是fantasy字</font>
<font face="Helvetica">我是Helvetica字</font> 
```

#### 字体类型效果

<font face="黑体">我是黑体字</font> 
<font face="宋体">我是宋体字</font> 
<font face="楷体">我是楷体字</font> 
<font face="微软雅黑">我是微软雅黑字</font> 
<font face="fantasy">我是fantasy字</font>
<font face="Helvetica">我是Helvetica字</font> 

### 背景色修改

```markdown
<table><tr><td bgcolor=#F4A460>#F4A460</td></tr></table>
<table><tr><td bgcolor=#FF6347>#FF6347</td></tr></table>  
<table><tr><td bgcolor=#D8BFD8>#D8BFD8</td></tr></table>  
<table><tr><td bgcolor=#008080>#008080</td></tr></table>  
<table><tr><td bgcolor=#FFD700>#FFD700</td></tr></table>  
```

#### 背景色修改效果

<table><tr><td bgcolor=#F4A460>#F4A460</td></tr></table>
<table><tr><td bgcolor=#FF6347>#FF6347</td></tr></table> 
<table><tr><td bgcolor=#D8BFD8>#D8BFD8</td></tr></table> 
<table><tr><td bgcolor=#008080>#008080</td></tr></table> 
<table><tr><td bgcolor=#FFD700>#FFD700</td></tr></table> 

***

## 引用

```markdown
> What？
>> 这是啥？
>>> 引用啥？
也可以写成如下形式：
<blockquote>引用的内容</blockquote>
```

### 引用效果

> What？
> > 这是啥？
> >
> > > 引用啥？

---

## 分割线

```markdown
---
***
___
```

### 分割线效果

---

___

___



---

## 列表（支持嵌套）

### 无序列表

```markdown
- 列表内容
+ 列表内容
* 列表内容
也可写成：
<ul>
<li>   </li>
<li>   </li>
<li>   </li>
<li>   </li>
</ul> 
```

> 注意：-、+、*与列表内容之间要有一个空格

#### 无序列表效果

- 列表内容
+ 列表内容

* 列表内容

### 有序列表

```markdown
1. 列表内容
2. 列表内容
3. 列表内容
也可写成：
<ol>
<li>   </li>
<li>   </li>
<li>   </li>
<li>   </li>
</ol> 
```

#### 有序列表效果

1. 列表内容
2. 列表内容
3. 列表内容

### 任务列表

```markdown
 - [x] Have breakfast!
 - [ ] Have lunch!
 - [ ] Have dinner!
 「注」：先打空格再打-，接着打空格，最后再打[ ]，另外[ ]中间是有括号的。
```

#### 任务列表效果

- [x] Have breakfast!

- [ ] Have lunch!

- [ ] Have dinner!

---

## 表格

```markdown
表头|表头|表头|表头
---|:---|---:|:---:
内容|内容|内容|内容
内容|内容|内容|内容

可以注意到，：起到的作用是设定对齐方式，依次是左对齐、右对齐、居中对齐。
```

### 表格效果

| 表头 | 表头 | 表头 | 表头 |
| ---- | :--- | ---: | :--: |
| 内容 | 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 | 内容 |

***

## 代码行 & 代码块

### 单行代码

```
`import torch as pd`
```

### 单行代码效果

`import torch as pd`

### 代码块

````
```
import tensorflow as np
import torch as pd
​```
如果想指定语言从而达到语法高亮的效果则可以写成：
​```python
import tensorflow as np
import torch as pd
​```
````

### 代码块效果

```
import tensorflow as np
import torch as pd
```

```python
import tensorflow as np
import torch as pd
```

***

## Emoji

People

| :bowtie: `:bowtie:`                                          | :smile: `:smile:`                                            | :laughing: `:laughing:`                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------- |
| :blush: `:blush:`                                            | :smiley: `:smiley:`                                          | :relaxed: `:relaxed:`                       |
| :smirk: `:smirk:`                                            | :heart_eyes: `:heart_eyes:`                                  | :kissing_heart: `:kissing_heart:`           |
| :kissing_closed_eyes: `:kissing_closed_eyes:`                | :flushed: `:flushed:`                                        | :relieved: `:relieved:`                     |
| :satisfied: `:satisfied:`                                    | :grin: `:grin:`                                              | :wink: `:wink:`                             |
| :stuck_out_tongue_winking_eye: `:stuck_out_tongue_winking_eye:` | :stuck_out_tongue_closed_eyes: `:stuck_out_tongue_closed_eyes:` | :grinning: `:grinning:`                     |
| :kissing: `:kissing:`                                        | :kissing_smiling_eyes: `:kissing_smiling_eyes:`              | :stuck_out_tongue: `:stuck_out_tongue:`     |
| :sleeping: `:sleeping:`                                      | :worried: `:worried:`                                        | :frowning: `:frowning:`                     |
| :anguished: `:anguished:`                                    | :open_mouth: `:open_mouth:`                                  | :grimacing: `:grimacing:`                   |
| :confused: `:confused:`                                      | :hushed: `:hushed:`                                          | :expressionless: `:expressionless:`         |
| :unamused: `:unamused:`                                      | :sweat_smile: `:sweat_smile:`                                | :sweat: `:sweat:`                           |
| :disappointed_relieved: `:disappointed_relieved:`            | :weary: `:weary:`                                            | :pensive: `:pensive:`                       |
| :disappointed: `:disappointed:`                              | :confounded: `:confounded:`                                  | :fearful: `:fearful:`                       |
| :cold_sweat: `:cold_sweat:`                                  | :persevere: `:persevere:`                                    | :cry: `:cry:`                               |
| :sob: `:sob:`                                                | :joy: `:joy:`                                                | :astonished: `:astonished:`                 |
| :scream: `:scream:`                                          | :neckbeard: `:neckbeard:`                                    | :tired_face: `:tired_face:`                 |
| :angry: `:angry:`                                            | :rage: `:rage:`                                              | :triumph: `:triumph:`                       |
| :sleepy: `:sleepy:`                                          | :yum: `:yum:`                                                | :mask: `:mask:`                             |
| :sunglasses: `:sunglasses:`                                  | :dizzy_face: `:dizzy_face:`                                  | :imp: `:imp:`                               |
| :smiling_imp: `:smiling_imp:`                                | :neutral_face: `:neutral_face:`                              | :no_mouth: `:no_mouth:`                     |
| :innocent: `:innocent:`                                      | :alien: `:alien:`                                            | :yellow_heart: `:yellow_heart:`             |
| :blue_heart: `:blue_heart:`                                  | :purple_heart: `:purple_heart:`                              | :heart: `:heart:`                           |
| :green_heart: `:green_heart:`                                | :broken_heart: `:broken_heart:`                              | :heartbeat: `:heartbeat:`                   |
| :heartpulse: `:heartpulse:`                                  | :two_hearts: `:two_hearts:`                                  | :revolving_hearts: `:revolving_hearts:`     |
| :cupid: `:cupid:`                                            | :sparkling_heart: `:sparkling_heart:`                        | :sparkles: `:sparkles:`                     |
| :star: `:star:`                                              | :star2: `:star2:`                                            | :dizzy: `:dizzy:`                           |
| :boom: `:boom:`                                              | :collision: `:collision:`                                    | :anger: `:anger:`                           |
| :exclamation: `:exclamation:`                                | :question: `:question:`                                      | :grey_exclamation: `:grey_exclamation:`     |
| :grey_question: `:grey_question:`                            | :zzz: `:zzz:`                                                | :dash: `:dash:`                             |
| :sweat_drops: `:sweat_drops:`                                | :notes: `:notes:`                                            | :musical_note: `:musical_note:`             |
| :fire: `:fire:`                                              | :hankey: `:hankey:`                                          | :poop: `:poop:`                             |
| :shit: `:shit:`                                              | :+1: `:+1:`                                                  | :thumbsup: `:thumbsup:`                     |
| :-1: `:-1:`                                                  | :thumbsdown: `:thumbsdown:`                                  | :ok_hand: `:ok_hand:`                       |
| :punch: `:punch:`                                            | :facepunch: `:facepunch:`                                    | :fist: `:fist:`                             |
| :v: `:v:`                                                    | :wave: `:wave:`                                              | :hand: `:hand:`                             |
| :raised_hand: `:raised_hand:`                                | :open_hands: `:open_hands:`                                  | :point_up: `:point_up:`                     |
| :point_down: `:point_down:`                                  | :point_left: `:point_left:`                                  | :point_right: `:point_right:`               |
| :raised_hands: `:raised_hands:`                              | :pray: `:pray:`                                              | :point_up_2: `:point_up_2:`                 |
| :clap: `:clap:`                                              | :muscle: `:muscle:`                                          | :metal: `:metal:`                           |
| :fu: `:fu:`                                                  | :walking: `:walking:`                                        | :runner: `:runner:`                         |
| :running: `:running:`                                        | :couple: `:couple:`                                          | :family: `:family:`                         |
| :two_men_holding_hands: `:two_men_holding_hands:`            | :two_women_holding_hands: `:two_women_holding_hands:`        | :dancer: `:dancer:`                         |
| :dancers: `:dancers:`                                        | :ok_woman: `:ok_woman:`                                      | :no_good: `:no_good:`                       |
| :information_desk_person: `:information_desk_person:`        | :raising_hand: `:raising_hand:`                              | :bride_with_veil: `:bride_with_veil:`       |
| :person_with_pouting_face: `:person_with_pouting_face:`      | :person_frowning: `:person_frowning:`                        | :bow: `:bow:`                               |
| :couplekiss: `:couplekiss:`                                  | :couple_with_heart: `:couple_with_heart:`                    | :massage: `:massage:`                       |
| :haircut: `:haircut:`                                        | :nail_care: `:nail_care:`                                    | :boy: `:boy:`                               |
| :girl: `:girl:`                                              | :woman: `:woman:`                                            | :man: `:man:`                               |
| :baby: `:baby:`                                              | :older_woman: `:older_woman:`                                | :older_man: `:older_man:`                   |
| :person_with_blond_hair: `:person_with_blond_hair:`          | :man_with_gua_pi_mao: `:man_with_gua_pi_mao:`                | :man_with_turban: `:man_with_turban:`       |
| :construction_worker: `:construction_worker:`                | :cop: `:cop:`                                                | :angel: `:angel:`                           |
| :princess: `:princess:`                                      | :smiley_cat: `:smiley_cat:`                                  | :smile_cat: `:smile_cat:`                   |
| :heart_eyes_cat: `:heart_eyes_cat:`                          | :kissing_cat: `:kissing_cat:`                                | :smirk_cat: `:smirk_cat:`                   |
| :scream_cat: `:scream_cat:`                                  | :crying_cat_face: `:crying_cat_face:`                        | :joy_cat: `:joy_cat:`                       |
| :pouting_cat: `:pouting_cat:`                                | :japanese_ogre: `:japanese_ogre:`                            | :japanese_goblin: `:japanese_goblin:`       |
| :see_no_evil: `:see_no_evil:`                                | :hear_no_evil: `:hear_no_evil:`                              | :speak_no_evil: `:speak_no_evil:`           |
| :guardsman: `:guardsman:`                                    | :skull: `:skull:`                                            | :feet: `:feet:`                             |
| :lips: `:lips:`                                              | :kiss: `:kiss:`                                              | :droplet: `:droplet:`                       |
| :ear: `:ear:`                                                | :eyes: `:eyes:`                                              | :nose: `:nose:`                             |
| :tongue: `:tongue:`                                          | :love_letter: `:love_letter:`                                | :bust_in_silhouette: `:bust_in_silhouette:` |
| :busts_in_silhouette: `:busts_in_silhouette:`                | :speech_balloon: `:speech_balloon:`                          | :thought_balloon: `:thought_balloon:`       |
| :feelsgood: `:feelsgood:`                                    | :finnadie: `:finnadie:`                                      | :goberserk: `:goberserk:`                   |
| :godmode: `:godmode:`                                        | :hurtrealbad: `:hurtrealbad:`                                | :rage1: `:rage1:`                           |
| :rage2: `:rage2:`                                            | :rage3: `:rage3:`                                            | :rage4: `:rage4:`                           |
| :suspect: `:suspect:`                                        | :trollface: `:trollface:`                                    |                                             |

Nature

| :sunny: `:sunny:`                                            | :umbrella: `:umbrella:`                         | :cloud: `:cloud:`                                            |
| ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------ |
| :snowflake: `:snowflake:`                                    | :snowman: `:snowman:`                           | :zap: `:zap:`                                                |
| :cyclone: `:cyclone:`                                        | :foggy: `:foggy:`                               | :ocean: `:ocean:`                                            |
| :cat: `:cat:`                                                | :dog: `:dog:`                                   | :mouse: `:mouse:`                                            |
| :hamster: `:hamster:`                                        | :rabbit: `:rabbit:`                             | :wolf: `:wolf:`                                              |
| :frog: `:frog:`                                              | :tiger: `:tiger:`                               | :koala: `:koala:`                                            |
| :bear: `:bear:`                                              | :pig: `:pig:`                                   | :pig_nose: `:pig_nose:`                                      |
| :cow: `:cow:`                                                | :boar: `:boar:`                                 | :monkey_face: `:monkey_face:`                                |
| :monkey: `:monkey:`                                          | :horse: `:horse:`                               | :racehorse: `:racehorse:`                                    |
| :camel: `:camel:`                                            | :sheep: `:sheep:`                               | :elephant: `:elephant:`                                      |
| :panda_face: `:panda_face:`                                  | :snake: `:snake:`                               | :bird: `:bird:`                                              |
| :baby_chick: `:baby_chick:`                                  | :hatched_chick: `:hatched_chick:`               | :hatching_chick: `:hatching_chick:`                          |
| :chicken: `:chicken:`                                        | :penguin: `:penguin:`                           | :turtle: `:turtle:`                                          |
| :bug: `:bug:`                                                | :honeybee: `:honeybee:`                         | :ant: `:ant:`                                                |
| :beetle: `:beetle:`                                          | :snail: `:snail:`                               | :octopus: `:octopus:`                                        |
| :tropical_fish: `:tropical_fish:`                            | :fish: `:fish:`                                 | :whale: `:whale:`                                            |
| :whale2: `:whale2:`                                          | :dolphin: `:dolphin:`                           | :cow2: `:cow2:`                                              |
| :ram: `:ram:`                                                | :rat: `:rat:`                                   | :water_buffalo: `:water_buffalo:`                            |
| :tiger2: `:tiger2:`                                          | :rabbit2: `:rabbit2:`                           | :dragon: `:dragon:`                                          |
| :goat: `:goat:`                                              | :rooster: `:rooster:`                           | :dog2: `:dog2:`                                              |
| :pig2: `:pig2:`                                              | :mouse2: `:mouse2:`                             | :ox: `:ox:`                                                  |
| :dragon_face: `:dragon_face:`                                | :blowfish: `:blowfish:`                         | :crocodile: `:crocodile:`                                    |
| :dromedary_camel: `:dromedary_camel:`                        | :leopard: `:leopard:`                           | :cat2: `:cat2:`                                              |
| :poodle: `:poodle:`                                          | :paw_prints: `:paw_prints:`                     | :bouquet: `:bouquet:`                                        |
| :cherry_blossom: `:cherry_blossom:`                          | :tulip: `:tulip:`                               | :four_leaf_clover: `:four_leaf_clover:`                      |
| :rose: `:rose:`                                              | :sunflower: `:sunflower:`                       | :hibiscus: `:hibiscus:`                                      |
| :maple_leaf: `:maple_leaf:`                                  | :leaves: `:leaves:`                             | :fallen_leaf: `:fallen_leaf:`                                |
| :herb: `:herb:`                                              | :mushroom: `:mushroom:`                         | :cactus: `:cactus:`                                          |
| :palm_tree: `:palm_tree:`                                    | :evergreen_tree: `:evergreen_tree:`             | :deciduous_tree: `:deciduous_tree:`                          |
| :chestnut: `:chestnut:`                                      | :seedling: `:seedling:`                         | :blossom: `:blossom:`                                        |
| :ear_of_rice: `:ear_of_rice:`                                | :shell: `:shell:`                               | :globe_with_meridians: `:globe_with_meridians:`              |
| :sun_with_face: `:sun_with_face:`                            | :full_moon_with_face: `:full_moon_with_face:`   | :new_moon_with_face: `:new_moon_with_face:`                  |
| :new_moon: `:new_moon:`                                      | :waxing_crescent_moon: `:waxing_crescent_moon:` | :first_quarter_moon: `:first_quarter_moon:`                  |
| :waxing_gibbous_moon: `:waxing_gibbous_moon:`                | :full_moon: `:full_moon:`                       | :waning_gibbous_moon: `:waning_gibbous_moon:`                |
| :last_quarter_moon: `:last_quarter_moon:`                    | :waning_crescent_moon: `:waning_crescent_moon:` | :last_quarter_moon_with_face: `:last_quarter_moon_with_face:` |
| :first_quarter_moon_with_face: `:first_quarter_moon_with_face:` | :moon: `:moon:`                                 | :earth_africa: `:earth_africa:`                              |
| :earth_americas: `:earth_americas:`                          | :earth_asia: `:earth_asia:`                     | :volcano: `:volcano:`                                        |
| :milky_way: `:milky_way:`                                    | :partly_sunny: `:partly_sunny:`                 | :octocat: `:octocat:`                                        |
| :squirrel: `:squirrel:`                                      |                                                 |                                                              |

Objects

| :bamboo: `:bamboo:`                                          | :gift_heart: `:gift_heart:`                                 | :dolls: `:dolls:`                                   |
| ------------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------- |
| :school_satchel: `:school_satchel:`                          | :mortar_board: `:mortar_board:`                             | :flags: `:flags:`                                   |
| :fireworks: `:fireworks:`                                    | :sparkler: `:sparkler:`                                     | :wind_chime: `:wind_chime:`                         |
| :rice_scene: `:rice_scene:`                                  | :jack_o_lantern: `:jack_o_lantern:`                         | :ghost: `:ghost:`                                   |
| :santa: `:santa:`                                            | :christmas_tree: `:christmas_tree:`                         | :gift: `:gift:`                                     |
| :bell: `:bell:`                                              | :no_bell: `:no_bell:`                                       | :tanabata_tree: `:tanabata_tree:`                   |
| :tada: `:tada:`                                              | :confetti_ball: `:confetti_ball:`                           | :balloon: `:balloon:`                               |
| :crystal_ball: `:crystal_ball:`                              | :cd: `:cd:`                                                 | :dvd: `:dvd:`                                       |
| :floppy_disk: `:floppy_disk:`                                | :camera: `:camera:`                                         | :video_camera: `:video_camera:`                     |
| :movie_camera: `:movie_camera:`                              | :computer: `:computer:`                                     | :tv: `:tv:`                                         |
| :iphone: `:iphone:`                                          | :phone: `:phone:`                                           | :telephone: `:telephone:`                           |
| :telephone_receiver: `:telephone_receiver:`                  | :pager: `:pager:`                                           | :fax: `:fax:`                                       |
| :minidisc: `:minidisc:`                                      | :vhs: `:vhs:`                                               | :sound: `:sound:`                                   |
| :speaker: `:speaker:`                                        | :mute: `:mute:`                                             | :loudspeaker: `:loudspeaker:`                       |
| :mega: `:mega:`                                              | :hourglass: `:hourglass:`                                   | :hourglass_flowing_sand: `:hourglass_flowing_sand:` |
| :alarm_clock: `:alarm_clock:`                                | :watch: `:watch:`                                           | :radio: `:radio:`                                   |
| :satellite: `:satellite:`                                    | :loop: `:loop:`                                             | :mag: `:mag:`                                       |
| :mag_right: `:mag_right:`                                    | :unlock: `:unlock:`                                         | :lock: `:lock:`                                     |
| :lock_with_ink_pen: `:lock_with_ink_pen:`                    | :closed_lock_with_key: `:closed_lock_with_key:`             | :key: `:key:`                                       |
| :bulb: `:bulb:`                                              | :flashlight: `:flashlight:`                                 | :high_brightness: `:high_brightness:`               |
| :low_brightness: `:low_brightness:`                          | :electric_plug: `:electric_plug:`                           | :battery: `:battery:`                               |
| :calling: `:calling:`                                        | :email: `:email:`                                           | :mailbox: `:mailbox:`                               |
| :postbox: `:postbox:`                                        | :bath: `:bath:`                                             | :bathtub: `:bathtub:`                               |
| :shower: `:shower:`                                          | :toilet: `:toilet:`                                         | :wrench: `:wrench:`                                 |
| :nut_and_bolt: `:nut_and_bolt:`                              | :hammer: `:hammer:`                                         | :seat: `:seat:`                                     |
| :moneybag: `:moneybag:`                                      | :yen: `:yen:`                                               | :dollar: `:dollar:`                                 |
| :pound: `:pound:`                                            | :euro: `:euro:`                                             | :credit_card: `:credit_card:`                       |
| :money_with_wings: `:money_with_wings:`                      | :e-mail: `:e-mail:`                                         | :inbox_tray: `:inbox_tray:`                         |
| :outbox_tray: `:outbox_tray:`                                | :envelope: `:envelope:`                                     | :incoming_envelope: `:incoming_envelope:`           |
| :postal_horn: `:postal_horn:`                                | :mailbox_closed: `:mailbox_closed:`                         | :mailbox_with_mail: `:mailbox_with_mail:`           |
| :mailbox_with_no_mail: `:mailbox_with_no_mail:`              | :door: `:door:`                                             | :smoking: `:smoking:`                               |
| :bomb: `:bomb:`                                              | :gun: `:gun:`                                               | :hocho: `:hocho:`                                   |
| :pill: `:pill:`                                              | :syringe: `:syringe:`                                       | :page_facing_up: `:page_facing_up:`                 |
| :page_with_curl: `:page_with_curl:`                          | :bookmark_tabs: `:bookmark_tabs:`                           | :bar_chart: `:bar_chart:`                           |
| :chart_with_upwards_trend: `:chart_with_upwards_trend:`      | :chart_with_downwards_trend: `:chart_with_downwards_trend:` | :scroll: `:scroll:`                                 |
| :clipboard: `:clipboard:`                                    | :calendar: `:calendar:`                                     | :date: `:date:`                                     |
| :card_index: `:card_index:`                                  | :file_folder: `:file_folder:`                               | :open_file_folder: `:open_file_folder:`             |
| :scissors: `:scissors:`                                      | :pushpin: `:pushpin:`                                       | :paperclip: `:paperclip:`                           |
| :black_nib: `:black_nib:`                                    | :pencil2: `:pencil2:`                                       | :straight_ruler: `:straight_ruler:`                 |
| :triangular_ruler: `:triangular_ruler:`                      | :closed_book: `:closed_book:`                               | :green_book: `:green_book:`                         |
| :blue_book: `:blue_book:`                                    | :orange_book: `:orange_book:`                               | :notebook: `:notebook:`                             |
| :notebook_with_decorative_cover: `:notebook_with_decorative_cover:` | :ledger: `:ledger:`                                         | :books: `:books:`                                   |
| :bookmark: `:bookmark:`                                      | :name_badge: `:name_badge:`                                 | :microscope: `:microscope:`                         |
| :telescope: `:telescope:`                                    | :newspaper: `:newspaper:`                                   | :football: `:football:`                             |
| :basketball: `:basketball:`                                  | :soccer: `:soccer:`                                         | :baseball: `:baseball:`                             |
| :tennis: `:tennis:`                                          | :8ball: `:8ball:`                                           | :rugby_football: `:rugby_football:`                 |
| :bowling: `:bowling:`                                        | :golf: `:golf:`                                             | :mountain_bicyclist: `:mountain_bicyclist:`         |
| :bicyclist: `:bicyclist:`                                    | :horse_racing: `:horse_racing:`                             | :snowboarder: `:snowboarder:`                       |
| :swimmer: `:swimmer:`                                        | :surfer: `:surfer:`                                         | :ski: `:ski:`                                       |
| :spades: `:spades:`                                          | :hearts: `:hearts:`                                         | :clubs: `:clubs:`                                   |
| :diamonds: `:diamonds:`                                      | :gem: `:gem:`                                               | :ring: `:ring:`                                     |
| :trophy: `:trophy:`                                          | :musical_score: `:musical_score:`                           | :musical_keyboard: `:musical_keyboard:`             |
| :violin: `:violin:`                                          | :space_invader: `:space_invader:`                           | :video_game: `:video_game:`                         |
| :black_joker: `:black_joker:`                                | :flower_playing_cards: `:flower_playing_cards:`             | :game_die: `:game_die:`                             |
| :dart: `:dart:`                                              | :mahjong: `:mahjong:`                                       | :clapper: `:clapper:`                               |
| :memo: `:memo:`                                              | :pencil: `:pencil:`                                         | :book: `:book:`                                     |
| :art: `:art:`                                                | :microphone: `:microphone:`                                 | :headphones: `:headphones:`                         |
| :trumpet: `:trumpet:`                                        | :saxophone: `:saxophone:`                                   | :guitar: `:guitar:`                                 |
| :shoe: `:shoe:`                                              | :sandal: `:sandal:`                                         | :high_heel: `:high_heel:`                           |
| :lipstick: `:lipstick:`                                      | :boot: `:boot:`                                             | :shirt: `:shirt:`                                   |
| :tshirt: `:tshirt:`                                          | :necktie: `:necktie:`                                       | :womans_clothes: `:womans_clothes:`                 |
| :dress: `:dress:`                                            | :running_shirt_with_sash: `:running_shirt_with_sash:`       | :jeans: `:jeans:`                                   |
| :kimono: `:kimono:`                                          | :bikini: `:bikini:`                                         | :ribbon: `:ribbon:`                                 |
| :tophat: `:tophat:`                                          | :crown: `:crown:`                                           | :womans_hat: `:womans_hat:`                         |
| :mans_shoe: `:mans_shoe:`                                    | :closed_umbrella: `:closed_umbrella:`                       | :briefcase: `:briefcase:`                           |
| :handbag: `:handbag:`                                        | :pouch: `:pouch:`                                           | :purse: `:purse:`                                   |
| :eyeglasses: `:eyeglasses:`                                  | :fishing_pole_and_fish: `:fishing_pole_and_fish:`           | :coffee: `:coffee:`                                 |
| :tea: `:tea:`                                                | :sake: `:sake:`                                             | :baby_bottle: `:baby_bottle:`                       |
| :beer: `:beer:`                                              | :beers: `:beers:`                                           | :cocktail: `:cocktail:`                             |
| :tropical_drink: `:tropical_drink:`                          | :wine_glass: `:wine_glass:`                                 | :fork_and_knife: `:fork_and_knife:`                 |
| :pizza: `:pizza:`                                            | :hamburger: `:hamburger:`                                   | :fries: `:fries:`                                   |
| :poultry_leg: `:poultry_leg:`                                | :meat_on_bone: `:meat_on_bone:`                             | :spaghetti: `:spaghetti:`                           |
| :curry: `:curry:`                                            | :fried_shrimp: `:fried_shrimp:`                             | :bento: `:bento:`                                   |
| :sushi: `:sushi:`                                            | :fish_cake: `:fish_cake:`                                   | :rice_ball: `:rice_ball:`                           |
| :rice_cracker: `:rice_cracker:`                              | :rice: `:rice:`                                             | :ramen: `:ramen:`                                   |
| :stew: `:stew:`                                              | :oden: `:oden:`                                             | :dango: `:dango:`                                   |
| :egg: `:egg:`                                                | :bread: `:bread:`                                           | :doughnut: `:doughnut:`                             |
| :custard: `:custard:`                                        | :icecream: `:icecream:`                                     | :ice_cream: `:ice_cream:`                           |
| :shaved_ice: `:shaved_ice:`                                  | :birthday: `:birthday:`                                     | :cake: `:cake:`                                     |
| :cookie: `:cookie:`                                          | :chocolate_bar: `:chocolate_bar:`                           | :candy: `:candy:`                                   |
| :lollipop: `:lollipop:`                                      | :honey_pot: `:honey_pot:`                                   | :apple: `:apple:`                                   |
| :green_apple: `:green_apple:`                                | :tangerine: `:tangerine:`                                   | :lemon: `:lemon:`                                   |
| :cherries: `:cherries:`                                      | :grapes: `:grapes:`                                         | :watermelon: `:watermelon:`                         |
| :strawberry: `:strawberry:`                                  | :peach: `:peach:`                                           | :melon: `:melon:`                                   |
| :banana: `:banana:`                                          | :pear: `:pear:`                                             | :pineapple: `:pineapple:`                           |
| :sweet_potato: `:sweet_potato:`                              | :eggplant: `:eggplant:`                                     | :tomato: `:tomato:`                                 |
| :corn: `:corn:`                                              |                                                             |                                                     |

Places

| :house: `:house:`                             | :house_with_garden: `:house_with_garden:`             | :school: `:school:`                                 |
| --------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| :office: `:office:`                           | :post_office: `:post_office:`                         | :hospital: `:hospital:`                             |
| :bank: `:bank:`                               | :convenience_store: `:convenience_store:`             | :love_hotel: `:love_hotel:`                         |
| :hotel: `:hotel:`                             | :wedding: `:wedding:`                                 | :church: `:church:`                                 |
| :department_store: `:department_store:`       | :european_post_office: `:european_post_office:`       | :city_sunrise: `:city_sunrise:`                     |
| :city_sunset: `:city_sunset:`                 | :japanese_castle: `:japanese_castle:`                 | :european_castle: `:european_castle:`               |
| :tent: `:tent:`                               | :factory: `:factory:`                                 | :tokyo_tower: `:tokyo_tower:`                       |
| :japan: `:japan:`                             | :mount_fuji: `:mount_fuji:`                           | :sunrise_over_mountains: `:sunrise_over_mountains:` |
| :sunrise: `:sunrise:`                         | :stars: `:stars:`                                     | :statue_of_liberty: `:statue_of_liberty:`           |
| :bridge_at_night: `:bridge_at_night:`         | :carousel_horse: `:carousel_horse:`                   | :rainbow: `:rainbow:`                               |
| :ferris_wheel: `:ferris_wheel:`               | :fountain: `:fountain:`                               | :roller_coaster: `:roller_coaster:`                 |
| :ship: `:ship:`                               | :speedboat: `:speedboat:`                             | :boat: `:boat:`                                     |
| :sailboat: `:sailboat:`                       | :rowboat: `:rowboat:`                                 | :anchor: `:anchor:`                                 |
| :rocket: `:rocket:`                           | :airplane: `:airplane:`                               | :helicopter: `:helicopter:`                         |
| :steam_locomotive: `:steam_locomotive:`       | :tram: `:tram:`                                       | :mountain_railway: `:mountain_railway:`             |
| :bike: `:bike:`                               | :aerial_tramway: `:aerial_tramway:`                   | :suspension_railway: `:suspension_railway:`         |
| :mountain_cableway: `:mountain_cableway:`     | :tractor: `:tractor:`                                 | :blue_car: `:blue_car:`                             |
| :oncoming_automobile: `:oncoming_automobile:` | :car: `:car:`                                         | :red_car: `:red_car:`                               |
| :taxi: `:taxi:`                               | :oncoming_taxi: `:oncoming_taxi:`                     | :articulated_lorry: `:articulated_lorry:`           |
| :bus: `:bus:`                                 | :oncoming_bus: `:oncoming_bus:`                       | :rotating_light: `:rotating_light:`                 |
| :police_car: `:police_car:`                   | :oncoming_police_car: `:oncoming_police_car:`         | :fire_engine: `:fire_engine:`                       |
| :ambulance: `:ambulance:`                     | :minibus: `:minibus:`                                 | :truck: `:truck:`                                   |
| :train: `:train:`                             | :station: `:station:`                                 | :train2: `:train2:`                                 |
| :bullettrain_front: `:bullettrain_front:`     | :bullettrain_side: `:bullettrain_side:`               | :light_rail: `:light_rail:`                         |
| :monorail: `:monorail:`                       | :railway_car: `:railway_car:`                         | :trolleybus: `:trolleybus:`                         |
| :ticket: `:ticket:`                           | :fuelpump: `:fuelpump:`                               | :vertical_traffic_light: `:vertical_traffic_light:` |
| :traffic_light: `:traffic_light:`             | :warning: `:warning:`                                 | :construction: `:construction:`                     |
| :beginner: `:beginner:`                       | :atm: `:atm:`                                         | :slot_machine: `:slot_machine:`                     |
| :busstop: `:busstop:`                         | :barber: `:barber:`                                   | :hotsprings: `:hotsprings:`                         |
| :checkered_flag: `:checkered_flag:`           | :crossed_flags: `:crossed_flags:`                     | :izakaya_lantern: `:izakaya_lantern:`               |
| :moyai: `:moyai:`                             | :circus_tent: `:circus_tent:`                         | :performing_arts: `:performing_arts:`               |
| :round_pushpin: `:round_pushpin:`             | :triangular_flag_on_post: `:triangular_flag_on_post:` | :jp: `:jp:`                                         |
| :kr: `:kr:`                                   | :cn: `:cn:`                                           | :us: `:us:`                                         |
| :fr: `:fr:`                                   | :es: `:es:`                                           | :it: `:it:`                                         |
| :ru: `:ru:`                                   | :gb: `:gb:`                                           | :uk: `:uk:`                                         |
| :de: `:de:`                                   |                                                       |                                                     |

Symbols

| :one: `:one:`                                                | :two: `:two:`                                                | :three: `:three:`                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------------- |
| :four: `:four:`                                              | :five: `:five:`                                              | :six: `:six:`                                             |
| :seven: `:seven:`                                            | :eight: `:eight:`                                            | :nine: `:nine:`                                           |
| :keycap_ten: `:keycap_ten:`                                  | :1234: `:1234:`                                              | :zero: `:zero:`                                           |
| :hash: `:hash:`                                              | :symbols: `:symbols:`                                        | :arrow_backward: `:arrow_backward:`                       |
| :arrow_down: `:arrow_down:`                                  | :arrow_forward: `:arrow_forward:`                            | :arrow_left: `:arrow_left:`                               |
| :capital_abcd: `:capital_abcd:`                              | :abcd: `:abcd:`                                              | :abc: `:abc:`                                             |
| :arrow_lower_left: `:arrow_lower_left:`                      | :arrow_lower_right: `:arrow_lower_right:`                    | :arrow_right: `:arrow_right:`                             |
| :arrow_up: `:arrow_up:`                                      | :arrow_upper_left: `:arrow_upper_left:`                      | :arrow_upper_right: `:arrow_upper_right:`                 |
| :arrow_double_down: `:arrow_double_down:`                    | :arrow_double_up: `:arrow_double_up:`                        | :arrow_down_small: `:arrow_down_small:`                   |
| :arrow_heading_down: `:arrow_heading_down:`                  | :arrow_heading_up: `:arrow_heading_up:`                      | :leftwards_arrow_with_hook: `:leftwards_arrow_with_hook:` |
| :arrow_right_hook: `:arrow_right_hook:`                      | :left_right_arrow: `:left_right_arrow:`                      | :arrow_up_down: `:arrow_up_down:`                         |
| :arrow_up_small: `:arrow_up_small:`                          | :arrows_clockwise: `:arrows_clockwise:`                      | :arrows_counterclockwise: `:arrows_counterclockwise:`     |
| :rewind: `:rewind:`                                          | :fast_forward: `:fast_forward:`                              | :information_source: `:information_source:`               |
| :ok: `:ok:`                                                  | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:`    | :repeat: `:repeat:`                                       |
| :repeat_one: `:repeat_one:`                                  | :new: `:new:`                                                | :top: `:top:`                                             |
| :up: `:up:`                                                  | :cool: `:cool:`                                              | :free: `:free:`                                           |
| :ng: `:ng:`                                                  | :cinema: `:cinema:`                                          | :koko: `:koko:`                                           |
| :signal_strength: `:signal_strength:`                        | :u5272: `:u5272:`                                            | :u5408: `:u5408:`                                         |
| :u55b6: `:u55b6:`                                            | :u6307: `:u6307:`                                            | :u6708: `:u6708:`                                         |
| :u6709: `:u6709:`                                            | :u6e80: `:u6e80:`                                            | :u7121: `:u7121:`                                         |
| :u7533: `:u7533:`                                            | :u7a7a: `:u7a7a:`                                            | :u7981: `:u7981:`                                         |
| :sa: `:sa:`                                                  | :restroom: `:restroom:`                                      | :mens: `:mens:`                                           |
| :womens: `:womens:`                                          | :baby_symbol: `:baby_symbol:`                                | :no_smoking: `:no_smoking:`                               |
| :parking: `:parking:`                                        | :wheelchair: `:wheelchair:`                                  | :metro: `:metro:`                                         |
| :baggage_claim: `:baggage_claim:`                            | :accept: `:accept:`                                          | :wc: `:wc:`                                               |
| :potable_water: `:potable_water:`                            | :put_litter_in_its_place: `:put_litter_in_its_place:`        | :secret: `:secret:`                                       |
| :congratulations: `:congratulations:`                        | :m: `:m:`                                                    | :passport_control: `:passport_control:`                   |
| :left_luggage: `:left_luggage:`                              | :customs: `:customs:`                                        | :ideograph_advantage: `:ideograph_advantage:`             |
| :cl: `:cl:`                                                  | :sos: `:sos:`                                                | :id: `:id:`                                               |
| :no_entry_sign: `:no_entry_sign:`                            | :underage: `:underage:`                                      | :no_mobile_phones: `:no_mobile_phones:`                   |
| :do_not_litter: `:do_not_litter:`                            | :non-potable_water: `:non-potable_water:`                    | :no_bicycles: `:no_bicycles:`                             |
| :no_pedestrians: `:no_pedestrians:`                          | :children_crossing: `:children_crossing:`                    | :no_entry: `:no_entry:`                                   |
| :eight_spoked_asterisk: `:eight_spoked_asterisk:`            | :eight_pointed_black_star: `:eight_pointed_black_star:`      | :heart_decoration: `:heart_decoration:`                   |
| :vs: `:vs:`                                                  | :vibration_mode: `:vibration_mode:`                          | :mobile_phone_off: `:mobile_phone_off:`                   |
| :chart: `:chart:`                                            | :currency_exchange: `:currency_exchange:`                    | :aries: `:aries:`                                         |
| :taurus: `:taurus:`                                          | :gemini: `:gemini:`                                          | :cancer: `:cancer:`                                       |
| :leo: `:leo:`                                                | :virgo: `:virgo:`                                            | :libra: `:libra:`                                         |
| :scorpius: `:scorpius:`                                      | :sagittarius: `:sagittarius:`                                | :capricorn: `:capricorn:`                                 |
| :aquarius: `:aquarius:`                                      | :pisces: `:pisces:`                                          | :ophiuchus: `:ophiuchus:`                                 |
| :six_pointed_star: `:six_pointed_star:`                      | :negative_squared_cross_mark: `:negative_squared_cross_mark:` | :a: `:a:`                                                 |
| :b: `:b:`                                                    | :ab: `:ab:`                                                  | :o2: `:o2:`                                               |
| :diamond_shape_with_a_dot_inside: `:diamond_shape_with_a_dot_inside:` | :recycle: `:recycle:`                                        | :end: `:end:`                                             |
| :on: `:on:`                                                  | :soon: `:soon:`                                              | :clock1: `:clock1:`                                       |
| :clock130: `:clock130:`                                      | :clock10: `:clock10:`                                        | :clock1030: `:clock1030:`                                 |
| :clock11: `:clock11:`                                        | :clock1130: `:clock1130:`                                    | :clock12: `:clock12:`                                     |
| :clock1230: `:clock1230:`                                    | :clock2: `:clock2:`                                          | :clock230: `:clock230:`                                   |
| :clock3: `:clock3:`                                          | :clock330: `:clock330:`                                      | :clock4: `:clock4:`                                       |
| :clock430: `:clock430:`                                      | :clock5: `:clock5:`                                          | :clock530: `:clock530:`                                   |
| :clock6: `:clock6:`                                          | :clock630: `:clock630:`                                      | :clock7: `:clock7:`                                       |
| :clock730: `:clock730:`                                      | :clock8: `:clock8:`                                          | :clock830: `:clock830:`                                   |
| :clock9: `:clock9:`                                          | :clock930: `:clock930:`                                      | :heavy_dollar_sign: `:heavy_dollar_sign:`                 |
| :copyright: `:copyright:`                                    | :registered: `:registered:`                                  | :tm: `:tm:`                                               |
| :x: `:x:`                                                    | :heavy_exclamation_mark: `:heavy_exclamation_mark:`          | :bangbang: `:bangbang:`                                   |
| :interrobang: `:interrobang:`                                | :o: `:o:`                                                    | :heavy_multiplication_x: `:heavy_multiplication_x:`       |
| :heavy_plus_sign: `:heavy_plus_sign:`                        | :heavy_minus_sign: `:heavy_minus_sign:`                      | :heavy_division_sign: `:heavy_division_sign:`             |
| :white_flower: `:white_flower:`                              | :100: `:100:`                                                | :heavy_check_mark: `:heavy_check_mark:`                   |
| :ballot_box_with_check: `:ballot_box_with_check:`            | :radio_button: `:radio_button:`                              | :link: `:link:`                                           |
| :curly_loop: `:curly_loop:`                                  | :wavy_dash: `:wavy_dash:`                                    | :part_alternation_mark: `:part_alternation_mark:`         |
| :trident: `:trident:`                                        | :black_square: `:black_square:`                              | :white_square: `:white_square:`                           |
| :white_check_mark: `:white_check_mark:`                      | :black_square_button: `:black_square_button:`                | :white_square_button: `:white_square_button:`             |
| :black_circle: `:black_circle:`                              | :white_circle: `:white_circle:`                              | :red_circle: `:red_circle:`                               |
| :large_blue_circle: `:large_blue_circle:`                    | :large_blue_diamond: `:large_blue_diamond:`                  | :large_orange_diamond: `:large_orange_diamond:`           |
| :small_blue_diamond: `:small_blue_diamond:`                  | :small_orange_diamond: `:small_orange_diamond:`              | :small_red_triangle: `:small_red_triangle:`               |
| :small_red_triangle_down: `:small_red_triangle_down:`        | :shipit: `:shipit:`                                          |                                                           |

***

## 转义

| \    | 反斜杠（backslash）                                          |
| ---- | ------------------------------------------------------------ |
| `    | 反引号（backtick），连续使用两个“ ` ”来包裹使用至少一个反引号的句子即可 |
| *    | 星号（asterisk）                                             |
| _    | 下划线（underscore）                                         |
| { }  | 花括号（curly braces）                                       |
| [ ]  | 方括号（brackets）                                           |
| < >  | 尖括号（angle brackets）                                     |
| ( )  | 圆括号或括号（parentheses）                                  |
| #    | 井号（pound sign）                                           |
| +    | 加号（plus sign）                                            |
| -    | 减号（minus sign） (也叫连字符 hyphen)                       |
| .    | 句点（dot）                                                  |
| !    | 感叹号（exclamation mark）                                   |
| \|   | 管道符（pipe），可以使用`&#124;`来代替                       |

---

## 特殊字符

<center>

| 特殊字符 |     描述      |  字符代码  |
| :------: | :-----------: | :--------: |
|          |    空格符     |  `&nbsp;`  |
|    <     |    小于号     |   `&lt;`   |
|    >     |    大于号     |   `&gt;`   |
|    &     |     和号      |  `&amp;`   |
|    ￥    |    人民币     |  `&yen;`   |
|    ©     |     版权      |  `&copy;`  |
|    ®     |   注册商标    |  `&reg;`   |
|    °C    |    摄氏度     |  `&deg;C`  |
|    ±     |    正负号     | `&plusmn;` |
|    ×     |     乘号      | `&times;`  |
|    ÷     |     除号      | `&divide;` |
|    ²     | 平方（上标²） |  `&sup2;`  |
|    ³     | 立方（上标³） |  `&sup3;`  |

</center>

---

## 脚注

```markdown
不可能三角又称潘洛斯三角[^1]，是由奥斯卡·雷乌特斯瓦德[^note]1934年创建的不可能图形。 
[^1]: 潘洛斯三角（Penrose triangle）是不可能物體中的一種。最早是由瑞典藝術家Oscar Reutersvärd在1934年製作。英國數學家羅傑·潘洛斯（Roger Penrose）及其父親莱昂内尔·彭罗斯設計及推廣，並在1958年2月份的《英國心理學月刊》（British Journal of Psychology）中發表，稱之為「最純粹形式的不可能」。 
[^note]: Oscar Reutersvärd (29 November 1915 – 2 February 2002) was a Swedish graphic artist, who in 1934 pioneered the art of 3D drawings that may initially appear feasible, yet cannot be physically constructed. He is sometimes described as "the father of the impossible figure", although there are much older examples, e.g. Hogarth's Satire on False Perspective, in addition to more recent well known example of the Penrose triangle and some others. 
```

### 脚注效果

不可能三角又称潘洛斯三角[^1]，是由奥斯卡·雷乌特斯瓦德[^note]1934年创建的不可能图形。 
[^1]: 潘洛斯三角（Penrose triangle）是不可能物體中的一種。最早是由瑞典藝術家Oscar Reutersvärd在1934年製作。英國數學家羅傑·潘洛斯（Roger Penrose）及其父親莱昂内尔·彭罗斯設計及推廣，並在1958年2月份的《英國心理學月刊》（British Journal of Psychology）中發表，稱之為「最純粹形式的不可能」。 
[^note]: Oscar Reutersvärd (29 November 1915 – 2 February 2002) was a Swedish graphic artist, who in 1934 pioneered the art of 3D drawings that may initially appear feasible, yet cannot be physically constructed. He is sometimes described as "the father of the impossible figure", although there are much older examples, e.g. Hogarth's Satire on False Perspective, in addition to more recent well known example of the Penrose triangle and some others. 

***

## 自定义标题ID

```
### ？？？ {#custom-id}
也可以写成：
<h3 id="custom-id">    </h3>
```

### 自定义标题ID效果

##### JetBrains！ {# JB-Yeah!}

编上这个id有什么用？[点这个试试看！](# JB-Yeah!)

你会发现它跳到JetBrains！这个标题了，而这个超链接语法没什么特殊的，就是这个：

```markdown
[点这个试试看！](# JB-Yeah!)
也可以写成这个：
<a href="#JB-Yeah!">点这个试试看！</a>
```

---

## 网址和邮件地址

```markdown
<https://www.markdownguide.org>
<fake@example.com>
```

### 网址和邮件地址效果

<https://www.markdownguide.org>
<fake@example.com>

---

## 显示快捷键图形

```
使用<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F2</kbd>进入tty2
```

### 显示快捷键图形效果

使用<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F2</kbd>进入tty2

---

## Markdown内部的注释

```markdown
<div style='display: none'>ANYTHING YOU WANNA SAY</div>
<!-- ANYTHING YOU WANNA SAY -->
[//]: # ANYTHING YOU WANNA SAY
[^_^]: # ANYTHING YOU WANNA SAY
[//]: <> ANYTHING YOU WANNA SAY
[comment]: <> ANYTHING YOU WANNA SAY
```

---

## 文字对齐方式(部分环境下不可用)

```
<center>中心对齐</center>
<p align="left">左对齐</p>
<p align="right">右对齐</p>
```

### 对齐方式效果

<center>中心对齐</center>
<p align="left">左对齐</p>
<p align="right">右对齐</p>