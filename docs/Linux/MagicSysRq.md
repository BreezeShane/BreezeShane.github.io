---
title: Magic SysRq 组合键功能表
date: 2022-01-21 16:33:41
author: Breeze Shane
top: false
toc: true
mathjax: true
categories: 
 - Linux
tags: 
 - Linux
article: false
---
::: tip 说明

以下表格中的按键是指按下 <kbd>Alt</kbd>+<kbd>SysRq</kbd>后再按下相应的附加按键，如按键中写B时表示 <kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>B</kbd>。

:::

| 功能                                                                                                                         |     按键     |
| ---------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| 设置控制台日志等级，这个可以控制内核信息打印的等级                                                                           | <kbd>0</kbd> ~ <kbd>9</kbd> |
| 立即重启系统，不同步文件系统或者卸载文件系统                                                                                 |     <kbd>b</kbd>     |
| 发起内核 Crash 崩溃，如果配置了 kdump 服务的话，将会获得一个 crashdump 文件                                                  |     <kbd>c</kbd>     |
| 打印当前正在被持有的锁 Locks，CONFIG_LOCKEDP 内核选项需要开启                                                                |     <kbd>d</kbd>     |
| 发送一个 SIGTERM 信号至所有进程，除开 1 号进程（init 进程）                                                                  |     <kbd>e</kbd>     |
| 调用 oom_kill，选择一个最符合 oom 的进程杀死                                                                                 |     <kbd>f</kbd>     |
| 当使用 Kernel Model Setting 模式的时候，切换至内核的 Frame Buffer 控制台，如果正在使用 kdb 进行调试，那么直接切换到 debugger |     <kbd>g</kbd>     |
| 将简洁的帮助文档打印至控制台                                                                                                 |     <kbd>h</kbd>     |
| 发送一个 SIGKILL 信号至所有进程，除开 1 号进程（init 进程）                                                                  |     <kbd>i</kbd>     |
| 强制解冻由 FIFREEZE ioctl 冻结的文件系统                                                                                     |     <kbd>j</kbd>     |
| 杀死当前虚拟中断的所有进程（可以杀死 X 和 SVGAlib 进程），最初是为了模仿安全警示按键而设立的                                 |     <kbd>k</kbd>     |
| 打印当前所有在线的 CPU 堆栈信息                                                                                              |     <kbd>l</kbd>     |
| 打印当前的内存信息在控制台                                                                                                   |     <kbd>m</kbd>     |
| 重置所有的实时进程或者高优先级进程的 nice 值                                                                                 |     <kbd>n</kbd>     |
| 关闭系统                                                                                                                     |     <kbd>o</kbd>     |
| 打印当前的寄存器信息和 flags 信息在控制台                                                                                    |     <kbd>p</kbd>     |
| 显示所有在线的高进度定时器和时钟源信息                                                                                       |     <kbd>q</kbd>     |
| 键盘从 raw mode 切出至 XLATE 模式，经常被 X11 或者 SVGALib 使用                                                              |     <kbd>r</kbd>     |
| 同步所有的已挂载的文件系统                                                                                                   |     <kbd>s</kbd>     |
| 打印当前的进程列表，以及他们的详细信息                                                                                       |     <kbd>t</kbd>     |
| 重新挂载文件系统至只读模式                                                                                                   |     <kbd>u</kbd>     |
| 强制还原帧缓冲控制台                                                                                                         |     <kbd>v</kbd>     |
| 打印所有 D 状态（阻塞）的进程信息                                                                                            |     <kbd>w</kbd>     |
| 转储 ftrace 缓冲区                                                                                                           |     <kbd>z</kbd>     |
