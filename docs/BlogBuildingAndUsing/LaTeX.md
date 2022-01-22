---
title: LaTeX公式
date: 2021-4-19 18:42:33
author: Breeze Shane
img: /source/images/
top: false
toc: true
mathjax: true
excerpt: 本文详细记述了LaTeX的语法知识，可以直接当作帮助文档或者字典手册之类的东西。
categories: 
 - Markdown
keywords: 
tags:
 - Markdown
 - LaTeX
---
> 参考内容：
>
> [MathJax basic tutorial and quick reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)
>
> [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962#mjx-eqn-eqsample)
>
> [MathJax: LaTeX Basic Tutorial und Referenz (Deutsch)](https://www.mathelounge.de/509545/mathjax-latex-basic-tutorial-und-referenz-deutsch)
>
> [<menclose>](https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose)

## 插入公式

- 行中公式可以用如下方法表示：

  ` $ 数学公式 $ `

- 独立公式可以用如下方法表示：

  ` $$ 数学公式 $$ `

- 自动编号的公式可以用如下方法表示：

  若需要手动编号，参见“[大括号和行标的使用](https://www.zybuluo.com/codeep/note/163962#14大括号和行标的使用)”。

  `\begin{equation}`

  `    数学公式    `    

  `\label{eq:当前公式名} `

   `\end{equation} `

**自动编号后的公式可在全文任意处使用 `\eqref{eq:公式名}` 语句引用。**

## 输入上下标

`^` 表示上标, `_` 表示下标。如果上下标的内容多于一个字符，需要用 `{}` 将这些内容括成一个整体。上下标可以嵌套，也可以同时使用。

另外，如果要在左右两边都有上下标，可以使用 `\quad` 命令；也可以简单地在符号前面多打一个上下标，此时会以行内公式渲染。

```latex
$$
	\quad_3^4X_5^6
$$
$$
	\sideset_\alpha^\betaS_0^1
$$

```


$$
\quad_3^4X_5^6
$$

## 输入括号和分隔符

`()`、`[]` 和 `|` 表示符号本身，使用 `\{\}` 来表示 `{}` 。当要显示大号的括号或分隔符时，要用 `\left` 和 `\right` 命令。

一些特殊的括号：

|   左    |   输出    |   右    |   输出    |
| :-----: | :-------: | :-----: | :-------: |
| \langle | $\langle$ | \rangle | $\rangle$ |
| \lceil  | $\lceil$  | \rceil  | $\rceil$  |
| \lfloor | $\lfloor$ | \rfloor | $\rfloor$ |
| \lbrace | $\lbrace$ | \rbrace | $\rbrace$ |
| \lvert  | $\lvert$  | \rvert  | $\rvert$  |
| \lVert  | $\lVert$  | \rVert  | $\rVert$  |

有时要用 `\left.` 或 `\right.` 进行匹配而不显示本身。

## 输入分数

通常使用 `\frac {分子} {分母}` 来生成一个分数，分数可多层嵌套。如果分式较为复杂，亦可使用 `分子 \over 分母` 此时分数仅有一层。

```latex
$$
\frac {\frac{3^\alpha}{Tim}}{\frac{P_g}{Math}}+{3\gamma \over 7\epsilon}
$$
```

$$
\frac {\frac{3^\alpha}{Tim}}{\frac{P_g}{Math}}+{3\gamma \over 7\epsilon}
$$

## 输入开方

使用 `\sqrt [根指数，省略时为2] {被开方数}` 命令输入开方。

```
$$
	||\alpha||_3 = \sqrt [3] {x^3+y^3}
$$
```

$$
||\alpha||_3 = \sqrt [3] {x^3+y^3}
$$

## 输入省略号

数学公式中常见的省略号有两种，`\ldots` 表示与 **文本底线** 对齐的省略号	$\ldots$		，`\cdots` 表示与 **文本中线** 对齐的省略号	$\cdots$	。

## 输入向量

使用 `\vec{向量}` 来自动产生一个向量。也可以使用`\overrightarrow``\overleftarrow``\overleftrightarrow` 等命令自定义字母上方的符号。

$\vec{a}$	$\overrightarrow b$	$\overleftarrow c$	$\overleftrightarrow d$

## 输入积分

使用 `\int_积分下限^积分上限 {被积表达式}` 来输入一个积分。$\int_a^bxdx$

## 输入极限符号

使用 `\lim_{变量 \to 表达式} 表达式` 来输入一个极限。如有需求，可以更改 `\to` 符号至任意符号。

$\lim_{x \to 0^+} {sinx \over x}$

## 输入求和符号、求积符号

使用 `\sum_{下标表达式}^{上标表达式} {累加表达式}` 来输入一个累加。与之类似，使用 `\prod` `\bigcup` `\bigcap` 来分别输入累乘、并集和交集。此类符号在行内显示时上下标表达式将会移至右上角和右下角。

$$
\sum_{i=0}^{n} {x_i} \quad \prod_{i=0}^{n} {x_i} \quad \bigcup_{i=0}^{n} {x_i} \quad \bigcap_{i=0}^{n} {x_i}
$$


## 输入希腊字母

输入 `\小写希腊字母英文全称` 和 `\首字母大写希腊字母英文全称` 来分别输入小写和大写希腊字母。 
 **对于大写希腊字母与现有字母相同的，直接输入大写字母即可。**

|   输入   |    输出    |  输入   |   输出    |   输入   |    输出    |   输入   |    输出    |
| :------: | :--------: | :-----: | :-------: | :------: | :--------: | :------: | :--------: |
|  \alpha  |  $\alpha$  |    A    |    $A$    |  \beta   |  $\beta$   |    B     |    $B$     |
|  \gamma  |  $\gamma$  | \Gamma  | $\Gamma$  |  \delta  |  $\delta$  |  \Delta  |  $\Delta$  |
| \epsilon | $\epsilon$ |    E    |    $E$    |  \zeta   |  $\zeta$   |    Z     |    $Z$     |
|   \eta   |   $\eta$   |    H    |    $H$    |  \theta  |  $\theta$  |  \Theta  |  $\Theta$  |
|  \iota   |  $\iota$   |    I    |    $I$    |  \kappa  |  $\kappa$  |    K     |    $K$     |
| \lambda  | $\lambda$  | \Lambda | $\Lambda$ |   \mu    |   $\mu$    |    M     |    $M$     |
|   \nu    |   $\nu$    |    N    |    $N$    |   \xi    |   $\xi$    |   \Xi    |   $\Xi$    |
|    o     |    $o$     |    O    |    $O$    |   \pi    |   $\pi$    |   \Pi    |   $\Pi$    |
|   \rho   |   $\rho$   |    P    |    $P$    |  \sigma  |  $\sigma$  |  \Sigma  |  $\Sigma$  |
|   \tau   |   $\tau$   |    T    |    $T$    | \upsilon | $\upsilon$ | \Upsilon | $\Upsilon$ |
|   \phi   |   $\phi$   |  \Phi   |  $\Phi$   |   \chi   |   $\chi$   |    X     |    $X$     |
|   \psi   |   $\psi$   |  \Psi   |  $\Psi$   |  \omega  |  $\omega$  |  \Omega  |  $\Omega$  |

**部分字母有变量专用形式，以 `\var-` 开头。**

| 小写形式 |    输出    | 大写形式 |   输出   |  变量形式   |     输出      |
| :------: | :--------: | :------: | :------: | :---------: | :-----------: |
| \epsilon | $\epsilon$ |    E     |   $E$    | \varepsilon | $\varepsilon$ |
|  \theta  |  $\theta$  |  \Theta  | $\Theta$ |  \vartheta  |  $\vartheta$  |
|   \rho   |   $\rho$   |    P     |   $P$    |   \varrho   |   $\varrho$   |
|  \sigma  |  $\sigma$  |  \Sigma  | $\Sigma$ |  \varsigma  |  $\varsigma$  |
|   \phi   |   $\phi$   |   \Phi   |  $\Phi$  |   \varphi   |   $\varphi$   |

## 输入特殊字符

### (1)．关系运算符

|   输入   |    显示    |    输入    |     显示     |   输入    |    显示     |    输入    |     显示     |
| :------: | :--------: | :--------: | :----------: | :-------: | :---------: | :--------: | :----------: |
|   \pm    |   $\pm$    |   \times   |   $\times$   |   \div    |   $\div$    |    \mid    |    $\mid$    |
|  \nmid   |  $\nmid$   |   \cdot    |   $\cdot$    |   \circ   |   $\circ$   |    \ast    |    $\ast$    |
| \bigodot | $\bigodot$ | \bigotimes | $\bigotimes$ | \bigoplus | $\bigoplus$ |    \leq    |    $\leq$    |
|   \geq   |   $\geq$   |    \neq    |    $\neq$    |  \approx  |  $\approx$  |   \equiv   |   $\equiv$   |
|   \sum   |   $\sum$   |   \prod    |   $\prod$    |  \coprod  |  $\coprod$  | \backslash | $\backslash$ |

> 其中\pm表示plus minus，如果写成minus plus，即\mp的话会显示$\mp$

### (2)．集合运算符

|   输入    |    显示     |  输入   |   显示    |    输入     |     显示      |
| :-------: | :---------: | :-----: | :-------: | :---------: | :-----------: |
| \emptyset | $\emptyset$ |   \in   |   $\in$   |   \notin    |   $\notin$    |
|  \subset  |  $\subset$  | \supset | $\supset$ |  \subseteq  |  $\subseteq$  |
| \supseteq | $\supseteq$ |  \cap   |  $\cap$   |    \cup     |    $\cup$     |
|   \vee    |   $\vee$    | \wedge  | $\wedge$  |   \uplus    |   $\uplus$    |
|   \top    |   $\top$    |  \bot   |  $\bot$   | \complement | $\complement$ |

### (3)．对数运算符

| 输入 |  显示  | 输入 | 显示  | 输入 | 显示  |
| :--: | :----: | :--: | :---: | :--: | :---: |
| \log | $\log$ | \lg  | $\lg$ | \ln  | $\ln$ |

### (4)．三角运算符

|   输入   |    显示    | 输入  |  显示   |   输入   |    显示    |
| :------: | :--------: | :---: | :-----: | :------: | :--------: |
| \backsim | $\backsim$ | \cong | $\cong$ | \angle A | $\angle A$ |
|   \sin   |   $\sin$   | \cos  | $\cos$  |   \tan   |   $\tan$   |
|   \csc   |   $\csc$   | \sec  | $\sec$  |   \cot   |   $\cot$   |

### (5)．微积分运算符

|      输入       |    显示    |  输入  |   显示   |  输入  |   显示   |
| :-------------: | :--------: | :----: | :------: | :----: | :------: |
|      \int       |   $\int$   | \iint  | $\iint$  | \iiint | $\iiint$ |
| \partial、\part | $\partial$ | \oint  | $\oint$  | \prime | $\prime$ |
|      \lim       |   $\lim$   | \infty | $\infty$ | \nabla | $\nabla$ |

### (6)．逻辑运算符

|   输入   |    显示    |      输入       |     显示     |    输入     |     显示      |
| :------: | :--------: | :-------------: | :----------: | :---------: | :-----------: |
| \because | $\because$ |   \therefore    | $\therefore$ |    \neg     |    $\neg$     |
| \forall  | $\forall$  | \exists、\exist |  $\exists$   | \not\subset | $\not\subset$ |
|  \not<   |  $\not<$   |      \not>      |   $\not>$    |    \not=    |    $\not=$    |

### (7)．戴帽符号

|    输入    |     显示     |      输入       |       显示        |   输入    |    显示     |
| :--------: | :----------: | :-------------: | :---------------: | :-------: | :---------: |
|  \hat{xy}  |  $\hat{xy}$  |  \widehat{xyz}  |  $\widehat{xyz}$  |  \bar{y}  |  $\bar{y}$  |
| \tilde{xy} | $\tilde{xy}$ | \widetilde{xyz} | $\widetilde{xyz}$ | \acute{y} | $\acute{y}$ |
| \breve{y}  | $\breve{y}$  |    \check{y}    |    $\check{y}$    | \grave{y} | $\grave{y}$ |
|  \dot{x}   |  $\dot{x}$   |    \ddot{x}     |    $\ddot{x}$     | \dddot{x} | $\dddot{x}$ |

若需要在特定文字顶部\底部放置内容，可使用 `\overset{顶部内容}{正常内容}` 和 `\underset{底部内容}{正常内容}` 命令。$\overset{normal}{X}$	$\underset{abs}{Y}$

### (8)．连线符号

其它可用的文字修饰符可参见官方文档 ["Additional decorations"](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference#answer-13081)。

|                             输入                             |       显示       |
| :----------------------------------------------------------: | :--------------: |
| \fbox{a+b+c+d} **高级框选需[声明 `enclose` 标签](https://www.zybuluo.com/codeep/note/163962#5添加删除线)** | $\fbox{a+b+c+d}$ |

|                      输入                      |                       输出                       |
| :--------------------------------------------: | :----------------------------------------------: |
|            \overleftarrow{a+b+c+d}             |            $\overleftarrow{a+b+c+d}$             |
|            \overrightarrow{a+b+c+d}            |            $\overrightarrow{a+b+c+d}$            |
|          \overleftrightarrow{a+b+c+d}          |          $\overleftrightarrow{a+b+c+d}$          |
|            \underleftarrow{a+b+c+d}            |            $\underleftarrow{a+b+c+d}$            |
|           \underrightarrow{a+b+c+d}            |           $\underrightarrow{a+b+c+d}$            |
|         \underleftrightarrow{a+b+c+d}          |         $\underleftrightarrow{a+b+c+d}$          |
|               \overline{a+b+c+d}               |               $\overline{a+b+c+d}$               |
|              \underline{a+b+c+d}               |              $\underline{a+b+c+d}$               |
|          \overbrace{a+b+c+d}^{Sample}          |          $\overbrace{a+b+c+d}^{Sample}$          |
|         \underbrace{a+b+c+d}_{Sample}          |         $\underbrace{a+b+c+d}_{Sample}$          |
|  \overbrace{a+\underbrace{b+c}_{1.0}+d}^{2.0}  |  $\overbrace{a+\underbrace{b+c}_{1.0}+d}^{2.0}$  |
| \underbrace{a\cdot a\cdots a}_{b\text{ times}} | $\underbrace{a\cdot a\cdots a}_{b\text{ times}}$ |

### (9)．箭头符号

- 推荐使用符号：

|   输入   |    显示    |  输入   |   显示    |           输入           |            显示            |
| :------: | :--------: | :-----: | :-------: | :----------------------: | :------------------------: |
|   \to    |   $\to$    | \mapsto | $\mapsto$ | \underrightarrow{1℃/min} | $\underrightarrow{1℃/min}$ |
| \implies | $\implies$ |  \iff   |  $\iff$   |        \impliedby        |        $\impliedby$        |

- 其它可用符号：

|        输入         |         显示          |        输入         |         显示          |
| :-----------------: | :-------------------: | :-----------------: | :-------------------: |
|      \uparrow       |      $\uparrow$       |      \Uparrow       |      $\Uparrow$       |
|     \downarrow      |     $\downarrow$      |     \Downarrow      |     $\Downarrow$      |
|     \leftarrow      |     $\leftarrow$      |     \Leftarrow      |     $\Leftarrow$      |
|     \rightarrow     |     $\rightarrow$     |     \Rightarrow     |     $\Rightarrow$     |
|   \leftrightarrow   |   $\leftrightarrow$   |   \Leftrightarrow   |   $\Leftrightarrow$   |
|   \longleftarrow    |   $\longleftarrow$    |   \Longleftarrow    |   $\Longleftarrow$    |
|   \longrightarrow   |   $\longrightarrow$   |   \Longrightarrow   |   $\Longrightarrow$   |
| \longleftrightarrow | $\longleftrightarrow$ | \Longleftrightarrow | $\Longleftrightarrow$ |

## 字体转换

若要对公式的某一部分字符进行字体转换，可以用 `{\字体 {需转换的部分字符}}` 命令，其中 `\字体` 部分可以参照下表选择合适的字体。一般情况下，公式默认为斜体字  。

示例中 **全部大写** 的字体仅大写可用。

| 输入  | 全字母可用 |   输入   |      仅大写可用      |
| :---: | :--------: | :------: | :------------------: |
|  \rm  |   罗马体   | \mathcal |  花体（数学符号等）  |
|  \it  |    斜体    | \mathbb  | 黑板粗体（定义域等） |
|  \bf  |    粗体    |   \mit   |       数学斜体       |
|  \sf  |   等线体   |   \scr   |        手写体        |
|  \tt  |  打字机体  |   \cal   |                      |
| \frak | 旧德式字体 |          |                      |

`\boldsymbol{\alpha}` 用来表示向量或者矩阵的加粗斜体	$\boldsymbol{\alpha}$

## 设置高亮

使用 `\bbox[底色, (可选)边距, (可选)边框 border: 框宽度 框类型 框颜色]` 命令来高亮一行公式。 
 底色和框颜色支持详见“[更改文字颜色](https://www.zybuluo.com/codeep/note/163962#4更改文字颜色-color)”，边距及框宽度支持 `绝对像素 px` 或 `相对大小 em`，框类型支持 `实线 solid` 或 `虚线 dashed`。

## 大括号和行标的使用

在 `\left` 和 `\right` 之后加上要使用的括号来创建自动匹配高度的圆括号 `(` `)`，方括号 `[` `]` 和花括号 `\{` `\}`。 
 在每个公式末尾前使用 `\tag {行标}` 来实现行标。

如果你需要在不同的行显示对应括号，可以在每一行对应处使用 `\left.` 或 `\right.` 来放一个“不存在的括号”。

如果你需要将大括号里面显示的分隔符也变大，可以使用 `\middle` 命令，此处分别使用单竖线 `|` 和双竖线 `\|` 。

## 定义新运算符

当需要使用的运算符不在 MathJax 的内置库中时，程序可能会报错或产生错误的渲染结果。此时可以使用 `\operatorname` 命令定义一个新的运算符号。

使用 `\operatorname{运算符}{式子}` 来生成一个普通运算，或使用 `\operatorname*{运算符}_{下标}^{上标}{式子}` 来生成一个含上下标的自定义运算。

## 添加注释文字

在 `\text {文字}` 中仍可以使用 `$公式$` 插入其它公式。

## 在字符间加入空格

有四种宽度的空格可以使用： `\,`、`\;`、`\quad` 和 `\qquad`，灵活使用 `\text{n个空格}` 也可以在任意位置实现空格。 
 同时存在一种负空格 `\!` 用来减小字符间距，一般在物理单位中使用。 
 **反复使用 `\!` 命令能够实现不同元素的叠加渲染。**

## 更改文字颜色

使用 `\color{颜色}{文字}` 来更改特定的文字颜色。

更改文字颜色需要浏览器支持 ，如果浏览器不知道你所需的颜色，那么文字将被渲染为黑色。对于较旧的浏览器（HTML4 & CSS2），以下颜色是被支持的：

| black  |  grey   |
| :----: | :-----: |
| silver |  white  |
| maroon |   red   |
| yellow |  lime   |
| olive  |  green  |
|  teal  |  auqa   |
|  blue  |  navy   |
| purple | fuchsia |

对于较新的浏览器（HTML5 & CSS3），HEX 颜色将被支持：

输入 `\color {#rgb} {text}` 来自定义更多的颜色，其中 `#rgb` 或 `#rrggbb` 的 `r` `g` `b` 可输入 `0-9` 和 `a-f` 来表示红色、绿色和蓝色的纯度（饱和度）。

## 添加删除线

使用删除线功能必须声明 `$$` 符号。

在公式内使用 `\require{cancel}` 来允许**片段删除线**的显示。 
 声明片段删除线后，使用 `\cancel{字符}`、`\bcancel{字符}`、`\xcancel{字符}` 和 `\cancelto{字符}` 来实现各种片段删除线效果。

使用 `\require{enclose}` 来允许**整段删除线**的显示。 
 声明整段删除线后，使用 `\enclose{删除线效果}{字符}` 来实现各种整段删除线效果。 
 其中，删除线效果有 `horizontalstrike`、`verticalstrike`、`updiagonalstrike` 和 `downdiagonalstrike`，可叠加使用。

此外， `\enclose` 命令还可以产生包围的边框和圆等，参见 [MathML Menclose Documentation](https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose) 以查看更多效果。

## 输入矩阵

### 无框矩阵

在开头使用 `\begin{matrix}`，在结尾使用 `\end{matrix}`，在中间插入矩阵元素，每个元素之间插入 `&` ，并在每行结尾处使用 `\\` 。 
 使用矩阵时必须声明 `$` 或 `$$` 符号。

### 边框矩阵

在开头将 `matrix` 替换为 `pmatrix` `bmatrix` `Bmatrix` `vmatrix` `Vmatrix` 。

### 带省略符号的矩阵

使用 `\cdots`  , `\ddots`  , `\vdots`  来输入省略符号。

### 带分割符号的矩阵

通常，一个格式化后的表格比单纯的文字或排版后的文字更具有可读性。 
 数组和表格均以 `\begin{array}` 开头，并在其后定义列数及每一列的文本对齐属性`{c|lcr}`，`c` `l` `r` 分别代表居中、左对齐及右对齐。若需要插入垂直分割线，在定义式中插入 `|` ，若要插入水平分割线，在下一行输入前插入 `\hline` 。 
 与矩阵相似，每行元素间均须要插入 `&` ，每行元素以 `\\` 结尾，最后以 `\ end{array}` 结束数组。 
 使用单个数组或表格时无需声明 `$` 或 `$$` 符号。

### 行中矩阵

若想在一行内显示矩阵， 使用`\bigl(\begin{smallmatrix} ... \end{smallmatrix}\bigr)`。

「注」：多个数组\表格可 **互相嵌套** 并组成一组数组或表格。使用嵌套前必须声明 `$$` 符号。

## 输入方程组

可以使用 `\begin{array} … \end{array}` 和 `\left\{ … \right.` 来创建一个方程组，或使用条件表达式组 `\begin{cases} … \end{cases}` 来实现相同效果。

## 输入方程式序列

人们经常想要一列整齐且居中的方程式序列。使用 `\begin{align}…\end{align}` 来创造一列方程式，其中在每行结尾处使用 `\\` 。使用方程式序列无需声明公式符号 `$` 或 `$$` 。

若要注明原因，在 `{align}` 中后添加 `&` 符号来自动对齐后面的内容，可灵活组合 `\text` 和 `\tag` 语句。`\tag` 语句编号优先级高于自动编号。

**请注意 `{align}` 语句是自动编号的，使用 `{align*}` 声明不自动编号。**

## 输入繁分数

就像输入分式时使用 `\frac` 一样，使用 `\cfrac` 来创建一个连分数。不要使用普通的 `\frac` 或 `\over` 来生成连分数，这样会看起来**很恶心**。当然，你可以使用 `\frac` 来表达连分数的**紧缩记法**。

## 输入交换图表

使用一行 `\require{AMScd}` 语句来允许交换图表的显示。 
 声明交换图表后，语法与矩阵相似，在开头使用 `\begin{CD}`，在结尾使用 `\ end{CD}`，在中间插入图表元素，每个元素之间插入 `&` ，并在每行结尾处使用 `\\`。

## 输入条件表达式

使用 `\begin{cases}…\end{cases}` 来创造一组条件表达式，在每一行条件中插入 `&` 来指定需要对齐的内容，并在每一行结尾处使用 `\\`。

```latex
f(x,y)=
\begin{cases}
x+y & if \quad x|y \\
x-y & if \quad  xy=0\\
xy & if \quad x^y=e^{x+y}
\end{cases}
```

显示如下：
$$
f(x,y)=
\begin{cases}
x+y & if \quad x|y \\
x-y & if \quad  xy=0\\
xy & if \quad x^y=e^{x+y}
\end{cases}
$$
适配行高需要使用 `\\[2ex]` 语句代替该行末尾的 `\\` 来让编辑器适配。

如果希望打出仅含右大括号的条件表达式的话，要用

```LaTeX
\left.
\begin{aligned}
\lim_{|a-b|\to0^+}\frac{|f(a)-f(b)|}{|a-b|}\leq K \\
\quad \lim_{|a-b|\to0^-}\frac{|f(a)-f(b)|}{|a-b|}\leq K
\end{aligned}
\right\}
```

显示如下：
$$
\left.
\begin{aligned}
\lim_{|a-b|\to0^+}\frac{|f(a)-f(b)|}{|a-b|}\leq K \\
\quad \lim_{|a-b|\to0^-}\frac{|f(a)-f(b)|}{|a-b|}\leq K
\end{aligned}
\right\}
$$
