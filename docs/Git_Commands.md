---
title: Git Commands
date: 2020-11-08 17:27:09
update: 2021-5-1 18:54:49
author: Breeze Shane
toc: true
mathjax: false
image: /images/git.png
excerpt: 本文主要用来记录Git的指令，用以记录并解决自己遇到过的所有问题。
categories: Git
keywords: Git Commands
tags:
  - Git
  - GitHub
---
最近小伙伴们好像都在为git指令发愁啊，讲真，刚开始确实用不惯。嘛，用的时间长了，git指令还是很好的东西~   ~（我不可能告诉你我是DOS系统的情怀党）~

于是我就写这个帮助文档，一来我能日后有需要再去复习，二来也可以给小伙伴们提供参考~

## Git 前期准备该怎么做？

首先，第一次使用git的时候，操作稍稍麻烦一些，但做完之后，就是一劳永逸的事啦！

1. 按下Super键+R，打开运行对话框，输入powershell，点击运行。
2. 首先要选择你的存储目录（以后的文件都要放在这里的~如果换文件夹需要重新做）
3. 选择好你的目录后，在powershell里输入 `cd (你的文件路径)`
4. 输入 `git init`进行初始化
5. /* 可以输入 `ls`来查看当前目录下所有文件，如果想查看被隐藏的文件需要输入 `ls -s` */
6. 输入 `git remote add (Your repository's name) (Your repository's Url)`//通常Your repository's Url就是在你的GitHub上打开你的repository后的链接地址**还要再加上 .git**
7. 连接成功后，由于你第一次使用，需要先登录，则要执行以下两行指令：
   ```
   git config --global user.name "(Your User name)"
   git config --global user.email "***********@***"
   ```
8. 然后就可以创建你的readme文件啦，需要输入 `echo "All you wanna say" > readme.md`
9. 接着输入 `git status`
10. 看到返回给你的红字之后，输入 `git add --all`
11. 再次输入 `git status`
12. 你会发现原来红色的字都绿了......
13. **注意中间会弹出一个对话框，让你输入你的GitHub用户名及密码，输入完毕登录以后，就可以了。**
14. 每次上传之前都要养成良好的记录习惯~输入 `git commit -m "All you wanna say"`
15. 这时候再输入 `git push --set-upstream (Your repository's name) master`
16. 当然上面的master也可以换成别的分支。另外应该知道，这里的(Your repository's name)是你在本地命名的仓库名，与GitHub上的仓库名没有必然联系。
17. 最后，你会发现上传成功，那么你赶快去刷新你的GitHub吧！

::: danger 重大变更

[点击这里](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)查看官方公告

很明显GitHub官方在2021年12月13日开始停用用户名验证了，这也是我在当天尝试上传时遇到的问题，如今这个问题的解决办法就是使用SSH密钥来配置，只有配置好这个才能正常上传。

:::

## Git配置SSH密钥

自从GitHub取消了用户名密码验证以后，我们常用的也只剩下了SSH，要使用这个还需要稍微配置一下，不过不算麻烦。

```shell
ssh-keygen -t rsa -C "addr.of.your@email.com"
```

然后可以默认不输入任何信息，一路回车，这样就可以生成了SSH密钥，我们再获取一下公用密钥内容，执行 ` cat ~/.ssh/id_rsa.pub`，再把输出的信息复制一下。

GitHUb上SSH配置路线如下：点击右上角用户后，在出现的菜单中点击Settings，然后在左侧栏中点击SSH and GPG keys，再点击右侧的New SSH key即可新建SSH密钥，把刚才复制的内容粘贴到这里即可。Title根据自己的需要自定即可。

## Git repository名字忘记了怎么办？

你很有可能建立了多个仓库，仓库名太多容易记不过来，有时候又容易忘记，该怎么办啊？别急，山人自有妙计：

输入 `git remote -v`

这时候你会发现，你的所有的repository名字以及它对应的Url都出现啦！

## Git上传时不小心使用git add --all把本不希望添加的文件上传了，但还好没有提交也没做commit，那么这时候你该怎么办？

可以输入 `git rm --cached (filename)`
如果不行，试试这个 `git rm -f --cached (filename)`

## Git 上传文件被拒绝该怎么办？

输入 `git pull --rebase (Your repository's name) master`然后再push一下就好啦！

## Git 需要走代理怎么办？

```shell
# git config --global http.proxy http://127.0.0.1:1080
# git config --global https.proxy https://127.0.0.1:1080
# 如果你像上面那样设置过代理的话需要执行这两行指令：
git config --global --unset http.proxy
git config --global --unset https.proxy

# 1086 改为自己的 socks5 监听端口
git config --global http.https://github.com.proxy socks5://127.0.0.1:1086
git config --global https.https://github.com.proxy socks5://127.0.0.1:1086
# 1080 改为自己的 http 监听端口
git config --global http.https://github.com.proxy https://127.0.0.1:1080
git config --global https.https://github.com.proxy https://127.0.0.1:1080
```

## Manjaro 每次上传总是需要输入用户名和密码的解决方案

目前看到的解决方案是进入到项目目录里添加本地凭证即可。执行：

```
git config --global credential.helper store
# 这个指令会在用户路径下生成.gitconfig文件并指添加相应的配置内容。
# 用户路径是指windows: C:/Users/username、mac os x: /Users/username和linux: /home/username
git pull
```

然后你只需要再输入一次用户名和密码就可以生效了！

## 如何理解git add . ?

`git add .`表示将当前目录下所有的文件都加载到暂存区内，和 `git add --all`等效。

## Git如何删除远程仓库？

`git remote rm NAME`即可删除掉不再需要的远程仓库，为了避免歧义强调一下：对GitHub服务器上的仓库毫无影响。

## Git如何创建服务器并多人协作？

> 注：创建服务器一般由项目负责人来完成此过程。

1. 首先要在GitHub上准备好项目仓库
2. 在本地进入到项目根路径下，执行 `git init --bare`来创建一个裸服务器
3. 执行 `git clone PROJECT_PATH`来从裸服务器将版本库克隆至本地，以便开始后续工作。PROJECT_PATH就是项目的绝对路径。
4. 在本地编写好自己负责的项目部分
5. 执行 `git remote `确定服务器所在之后执行 `git push ORIGIN master`来推送版本至服务器上。

   `<font color="red">`注意从此开始服务器创建完毕并正式投入使用，接下来将讲述如何使用。`</font>`
6. 开始的第一件事是执行 `git pull`来将项目拉取下来，以免出现版本冲突问题。
7. 在本地编写好自己负责的项目部分
8. 执行 `git remote `确定服务器所在之后执行 `git push ORIGIN master`来推送版本至服务器上。

应该注意的是，当甲正在开发项目的时候，乙完成了工作并成功上传到服务器上，这时候甲想直接执行上传就会失败，因为乙上传之后服务器的版本更新了，此时和甲当前的版本不同，因此甲在上传之前就要先执行 `git pull`来更新版本，然后才能继续上传。当然，用多了的话，你也会发现 `git remote `这个是不需要每次都执行的，仅在你不知道有哪些服务器的情况下才有必要执行。

## Git如何更好地多人协作？

看过上一节的教程，不难发现，如果同时开发的人员有多个的话，这样的工作模式是会经常发生冲突的，比如A、B两人合作完成一个项目，A有一个新功能需要实现，但需要花半个月的时间，现在一周过去了，A并不能写完这个功能，但如果就这样提交上去，会导致B无法正常完成项目，因为项目中有并不由B负责的代码没写完，导致B无法进行开发调试；而如果不提交的话，又要面临丢失每日进度的风险，这是每一个程序员都不能接受的。

那么怎么样才能更好地进行协作呢？Git有一个非常好的功能——分支。

分支，顾名思义，就是从主干中分出的支线。我们刚才那一系列操作其实都是在针对master主分支上进行操作，而为了更好协作，我们就需要建立一个新的分支，这样就可以安心自己开发而不必担心打扰其他合作人员。「好在Git是自由的，任何一个程序员都可以拥有自己的分支来进行任何的开发，而不干扰master主分支正常使用。」

我们来查看当前所在的分支，执行 `git branch`，*所在的地方就表示当前所在的分支。

现在我们要创建新的分支，就要执行 `git branch NEW_BRANCH`，这样就可以创建一个名为NEW_BRANCH的分支。

要使用该分支，我们需要先切换到这个分支，就需要执行 `git checkout NEW_BRANCH`来切换到NEW_BRANCH分支这里。

接下来就可以自由进行开发而不再担心会打扰到他人正常工作了。

那么当我们完成了各自分支上的任务，又如何整合到一起呢？我们先切回到master主分支上，`git checkout master`

然后我们来执行 `git merge NEW_BRANCH`来将NEW_BRANCH合并到master主分支上。

如果项目完成收工的话，或者因为一些原因某分支不再需要了的话，我们可以执行 `git branch -d NEW_BRANCH`来删除NEW_BRANCH分支。

如果想看一下提交的历史记录，可以执行 `git log`来查看。

<center>以上教程对于多人协作来说已基本够用。</center>

## Git如何撤回所有的Commit？

在终端输入 `git reset --soft HEAD^`就可以撤销一次申请。有几次提交就可以重复执行几次。

## Git add如何取消所有的文件？

在终端输入 `git reset HEAD .`就可以取消暂存所有文件。

## Git有些东西根本不想上传，怎么办？

在项目目录下新建一个文件，命名为 `.gitignore`，并写入不希望添加的文件(夹)：

```yaml
Content		#忽略掉Content目录
__cache__/*	#忽略掉__cache__下的所有文件
dust.txt	#忽略掉dust.txt文件
lib/*.dll	#忽略掉lib目录下的所有dll文件
```

## Git如何下载指定版本？

最近帮朋友跑实验，发现模型和代码不匹配，于是我需要去找之前的代码来适应这个模型，就很自然地想到去翻看Commit History了，最后我找到需要的历史代码了，那要怎么下载回来？

首先你需要浏览这个Commit的file，直接点击<kbd><></kbd>即可。

然后需要看左侧的分支编号，记住这个编号。

接着在本地选好位置后先执行`git clone git@xxxx.git`来clone下来。

然后执行`git checkout <Commit_ID>`，这里的`<Commit_ID>`就是刚才要记的分支编号。

在此基础上再新建分支，执行`git checkout -b <NEW_BRANCH_NAME>`。

这样你就可以发现，切换版本成功了。:+1:

## 使用GitHub专用匿名邮箱

> 参考资料：
> 1. [Error "Your push would publish a private email address" - StackOverflow](https://stackoverflow.com/questions/43863522/error-your-push-would-publish-a-private-email-address)
> 2. [设置提交电子邮件地址 - GitHub Docs](https://docs.github.com/cn/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)
> 3. [从哪里找自己的GitHub用户Id（UserId）](https://www.cnblogs.com/qiect/articles/16119007.html)

近日出于隐私安全问题，我调整了一下GitHub上的用户隐私设置，当我更新完我的仓库时得到了如下的报错。

::: danger Error

```
❯ git push
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 8.70 KiB | 2.90 MiB/s, done.
Total 6 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
remote: error: GH007: Your push would publish a private email address.
remote: You can make your email public or disable this protection by visiting:
remote: http://github.com/settings/emails
To github.com:BreezeShane/XXXXXXXX.git
 ! [remote rejected] main -> main (push declined due to email privacy restrictions)
error: failed to push some refs to 'github.com:BreezeShane/XXXXXXXX.git'
```

:::

于是我查了一下相关资料，发现是我勾选了[这个页面](https://github.com/settings/emails)下的`Block command line pushes that expose my email`选项。这个选项是出于考虑传输数据时可能被人查看邮箱地址（*我说这传输是不是有点不靠谱了些……*）。按照相关文档的说明，应该在本地执行如下命令来更新配置：
```shell
git config --global user.email "email@example.com"
```
GitHub提供了`GitHub-provided noreply email address`的服务，具体的地址应该在`Keep my email addresses private`选项下的内容中：

> We’ll remove your public profile email and use **_email@users.noreply.github.com_** when performing web-based Git operations (e.g. edits and merges) and sending email on your behalf. If you want command line Git operations to use your private email you must set your email in Git.

你需要用这段文字中的粗斜体部分替换上面命令的`email@example.com`部分。

这样就可以像以往那样正常提交了。

「**注**」：_如果想查看当前设置的邮箱地址，可以执行命令：_`git config --global user.email`_。_