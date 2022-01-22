---
title: 用Shell脚本创建新文章
date: 2021-05-09 19:59:21
author: Breeze Shane
img: /source/images/
top: false
image: /images/Shell.jpg
banner_img: /images/aurora_borealis_nature_snow_winter_hd_nature.jpg
toc: true
mathjax: false
excerpt: 本文记述了利用Shell脚本生成文章的具体详细过程，实际上只是简单介绍了一点点的Shell脚本语法。
categories: 
 - Linux
 - Manjaro
 - Shell
tags: 
 - Linux
 - Manjaro
 - Shell
 - Geek
---

## 前言

自从我使用博客以后，写markdown就多了一件事——配置Front-matter。每次写文章我都要写这些几乎重复的东西，心情倍感烦躁，于是我决定用Shell脚本来实现这个功能。

## 实现？

最终，我完成了这个小程序，完整的实现代码如下：

```shell
while getopts ":n:t:D:a:i:u:c:b:T:m:d:C:k:l:h" optname
do
    case "$optname" in
    "n")
        name=$OPTARG
        ;;
    "t")
       title=$OPTARG
       ;;
    "D")
        time=$OPTARG
        ;;
    "a")
        author=$OPTARG
        ;;
    "i")
        img=$OPTARG
        ;;
    "u")
        top=$OPTARG
        ;;
    "c")
        index_img=$OPTARG
        ;;
    "b")
        banner_img=$OPTARG
        ;;
    "T")
        toc=$OPTARG
        ;;
    "m")
        mathjax=$OPTARG
        ;;
    "d")
        summary=$OPTARG
        ;;
    "C")
        categories=$OPTARG
        ;;
    "k")
        keywords=$OPTARG
        ;;
    "l")
        tags=$OPTARG
        ;;
    "h")
        echo -e "Opt\tName\tDescription\n-t\ttitle\tTo determine what the article's title is.\n-D\tdate\tTo write down when you create the article.\n-a\tauthor\tTo record who creates this article.\n-i\timage\tTo describe where the image is.\n-u\tupest\tTo set whether the article is top or not.\n-c\tcover \tTo determine the path of pictures as the cover.\n-T\ttoc  \tTo set whether the article contains its content.\n-m\tmathjax  \tTo determine to use mathjax or not.\n-d\tdescribe\tTo set the abstract of article.\n-C\tcategories\tTo set  what kind of the article is.\n-k\tkeywords\tTo set the article's keywords.\n-l \tlabels  \tTo set the tags of article.\n-b\tbanner image path\tTo set which picture would be the article background.\n"
        exit
        ;;
      *)
         echo "Unknown optimate, please input 'bash new.sh -h' to learn the usage."
         exit
         ;;
    esac
done

echo -e "---\ntitle: ${title:-""}\ndate: ${time-$(date "+%Y-%m-%d %H:%M:%S")}\nauthor: ${author:-"Breeze Shane"}\nimg: /source/images/${img:-""}\ntop: ${top:-"false"}\nindex_img: /images/${index_img:-""}\nbanner_img: /images/${banner_img:-""}\ntoc: ${toc:-"true"}\nmathjax: ${mathjax:-"true"}\nsummary: ${summary:-""}\ncategories: ${categories:-""}\nkeywords: ${keywords:-""}\ntags: ${tags:-""}\n---\n" >> "${name:-"new"}".md

```

# ¿读解

整个程序的大致框架如下：

```shell
while getopts ":n:t:D:a:i:u:c:b:T:m:d:C:k:l:h" optname
do
    case "$optname" in
    "n")
        name=$OPTARG
        ;;
    "t")
       title=$OPTARG
       ;;
    "D")
        time=$OPTARG
        ;;
    "a")
        author=$OPTARG
        ;;
    "i")
        img=$OPTARG
        ;;
    "u")
        top=$OPTARG
        ;;
    "c")
        index_img=$OPTARG
        ;;
    "b")
        banner_img=$OPTARG
        ;;
    "T")
        toc=$OPTARG
        ;;
    "m")
        mathjax=$OPTARG
        ;;
    "d")
        summary=$OPTARG
        ;;
    "C")
        categories=$OPTARG
        ;;
    "k")
        keywords=$OPTARG
        ;;
    "l")
        tags=$OPTARG
        ;;
    "h")
        echo -e "......"
        exit
        ;;
      *)
         echo "...Error..."
         exit
         ;;
    esac
done
```

使用while循环来遍历输入的每一个参数并接受，在case中设定各种参数的动作。遇到其他未知字符或者参数h则输出错误信息或帮助信息并终止，并专门为-h参数设定了帮助信息，echo开启转义模式需要加上-e参数才行。

getopts后面的字符串中，第一个:表示遇到错误信息也不输出，保持沉默，后面的各个字母表示各参数的名称，有无:决定了参数是否必须接受输入。比如n:就表示参数n必须接受后面的输入，不输入则报错；而h表示不接受输入（接受也是沉默）。

注意：

- 诸如`${title:-""}`的写法表示设定参数取变量title的值，如果title变量未被定义，则该参数取默认设定值`""`（这对引号表示空）。「其实个人认为理解成Python语句`def function(opt1=9,opt2=7)`中的opt1和opt2会更快一些，因为从结果上来看其实效果都是一样：设定一个参数，并为之设定默认值。」

- :-句法——在这个命令中，若前者变量已被定义但是为空值，echo语句将使用后者变量的值。

  :=句法——只有当前者变量已被定义，而且有一个实际的非空值时，整体表达式的值才不会被设置为后者变量的值而继续保持为前者变量的值。「**原博客这里的讲解有小瑕疵，特此更正一下。**」

  :?句法——使用:?句法时，如果前者变量已被定义为非空值，在echo命令中就会使用前者变量的值。如果前者变量已被定义但却没有一个真正的值（也就是说非空）或者完全未被定义，那么在echo命令中就会使用后者变量的值，并且脚本退出执行。

- 这里的变量不需要声明，这是shell脚本的特点。

- 诸如"h")的写法表示当变量optname为h时。

- esac表示case语句块的结束。

- ;;表示break。

- done表示do语句块的结束

- 参数名只能是一个字符，因为诸如`-aiuc`的长名称参数实际上会被理解为`-a -i -u -c`，所以请务必保证长度只有一个字符。

最后的输出要像这样实现：

```shell
echo -e "---\ntitle: ${title:-""}\ndate: ${time-$(date "+%Y-%m-%d %H:%M:%S")}\nauthor: ${author:-"Breeze Shane"}\nimg: /source/images/${img:-""}\ntop: ${top:-"false"}\nindex_img: /images/${index_img:-""}\nbanner_img: /images/${banner_img:-""}\ntoc: ${toc:-"true"}\nmathjax: ${mathjax:-"true"}\nsummary: ${summary:-""}\ncategories: ${categories:-""}\nkeywords: ${keywords:-""}\ntags: ${tags:-""}\n---\n" >> "${name:-"new"}".md
```

注意一定要这样写：`"${name:-"new"}".md`，而不是写成`${name:-"new"}.md`或者`${name:?"new"}.md`等其他各种写法，否则当你输入含有空格的新文章的文件名时会遇到报错信息：模糊的重定向。

> 在变量周围添加引号似乎是处理“歧义重定向”消息的一种好方法：输入错误时，以及*错误是由于文件名中的空格引起的时，您往往会得到更好的消息，使用引号即可解决。

因此才写作`"${name:-"new"}".md`，这样就可以接受含有空格的文件名，不过当你想这样输入的时候需要加引号：

```shell
bash new.sh -n 'New File'
# 或者像下面这样写：
bash new.sh -n "new file"
```

## 扩展！

在此基础上，你可以添加自己喜欢的功能，比如希望在某一目录下创建新文章，只需要在原来基础上将新文件移动到指定目录即可。

```shell
mv "${name:-"new"}".md ./source/_posts/
```

如果你用typora编辑markdown文件，而且你希望创建新文章后立即编辑，可以再加上这一句：

```shell
typora ./source/_posts/"${name:-"new"}".md
```

如果觉得总是要输入路径、脚本名才能执行太过麻烦，还可以创建软链接到系统环境变量来简单执行！

```shell
sudo ln -s [绝对路径]/[name]  /usr/local/bin/[newName]
```

这样输入newName就可以直接执行自己的脚本文件咯～

---

> 本文参考的博客如下：
>
> - [linux bash shell之变量替换](https://www.cnblogs.com/fhefh/archive/2011/04/22/2024750.html)
> - [Shell echo命令](https://www.runoob.com/linux/linux-shell-echo.html)
> - [shell获取系统当前时间并格式化](https://blog.csdn.net/sinat_29100331/article/details/79091323)
> - [这样处理shell脚本参数，爽多了！](https://cloud.tencent.com/developer/article/1629932)

---

<center>🤣🤣🤣***地球人已经阻拦不了我偷懒了！***🤣🤣🤣</center>
