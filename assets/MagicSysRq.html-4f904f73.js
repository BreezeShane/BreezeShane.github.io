import{_ as t,W as d,X as e,a1 as r}from"./framework-68a75bb9.js";const n={},l=r('<div class="hint-container tip"><p class="hint-container-title">说明</p><p>以下表格中的按键是指按下 <kbd>Alt</kbd>+<kbd>SysRq</kbd>后再按下相应的附加按键，如按键中写B时表示 <kbd>Alt</kbd>+<kbd>SysRq</kbd>+<kbd>B</kbd>。</p></div><table><thead><tr><th>功能</th><th style="text-align:center;">按键</th></tr></thead><tbody><tr><td>设置控制台日志等级，这个可以控制内核信息打印的等级</td><td style="text-align:center;"><kbd>0</kbd>~<kbd>9</kbd></td></tr><tr><td>立即重启系统，不同步文件系统或者卸载文件系统</td><td style="text-align:center;"><kbd>B</kbd></td></tr><tr><td>发起内核 Crash 崩溃，如果配置了 kdump 服务的话，将会获得一个 crashdump 文件</td><td style="text-align:center;"><kbd>C</kbd></td></tr><tr><td>打印当前正在被持有的锁 Locks，CONFIG_LOCKEDP 内核选项需要开启</td><td style="text-align:center;"><kbd>D</kbd></td></tr><tr><td>发送一个 SIGTERM 信号至所有进程，除开 1 号进程（init 进程）</td><td style="text-align:center;"><kbd>E</kbd></td></tr><tr><td>调用 oom_kill，选择一个最符合 oom 的进程杀死</td><td style="text-align:center;"><kbd>F</kbd></td></tr><tr><td>当使用 Kernel Model Setting 模式的时候，切换至内核的 Frame Buffer 控制台，如果正在使用 kdb 进行调试，那么直接切换到 debugger</td><td style="text-align:center;"><kbd>G</kbd></td></tr><tr><td>将简洁的帮助文档打印至控制台</td><td style="text-align:center;"><kbd>H</kbd></td></tr><tr><td>发送一个 SIGKILL 信号至所有进程，除开 1 号进程（init 进程）</td><td style="text-align:center;"><kbd>I</kbd></td></tr><tr><td>强制解冻由 FIFREEZE ioctl 冻结的文件系统</td><td style="text-align:center;"><kbd>J</kbd></td></tr><tr><td>杀死当前虚拟中断的所有进程（可以杀死 X 和 SVGAlib 进程），最初是为了模仿安全警示按键而设立的</td><td style="text-align:center;"><kbd>K</kbd></td></tr><tr><td>打印当前所有在线的 CPU 堆栈信息</td><td style="text-align:center;"><kbd>L</kbd></td></tr><tr><td>打印当前的内存信息在控制台</td><td style="text-align:center;"><kbd>M</kbd></td></tr><tr><td>重置所有的实时进程或者高优先级进程的 nice 值</td><td style="text-align:center;"><kbd>N</kbd></td></tr><tr><td>关闭系统</td><td style="text-align:center;"><kbd>O</kbd></td></tr><tr><td>打印当前的寄存器信息和 flags 信息在控制台</td><td style="text-align:center;"><kbd>P</kbd></td></tr><tr><td>显示所有在线的高进度定时器和时钟源信息</td><td style="text-align:center;"><kbd>Q</kbd></td></tr><tr><td>键盘从 raw mode 切出至 XLATE 模式，经常被 X11 或者 SVGALib 使用</td><td style="text-align:center;"><kbd>R</kbd></td></tr><tr><td>同步所有的已挂载的文件系统</td><td style="text-align:center;"><kbd>S</kbd></td></tr><tr><td>打印当前的进程列表，以及他们的详细信息</td><td style="text-align:center;"><kbd>T</kbd></td></tr><tr><td>重新挂载文件系统至只读模式</td><td style="text-align:center;"><kbd>U</kbd></td></tr><tr><td>强制还原帧缓冲控制台</td><td style="text-align:center;"><kbd>V</kbd></td></tr><tr><td>打印所有 D 状态（阻塞）的进程信息</td><td style="text-align:center;"><kbd>W</kbd></td></tr><tr><td>转储 ftrace 缓冲区</td><td style="text-align:center;"><kbd>Z</kbd></td></tr></tbody></table>',2),b=[l];function k(a,i){return d(),e("div",null,b)}const s=t(n,[["render",k],["__file","MagicSysRq.html.vue"]]);export{s as default};