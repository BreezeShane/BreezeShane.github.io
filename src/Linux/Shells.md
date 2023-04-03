---
title: Linux Shell 编程学习与实战
date: 2021-12-13 04:03:22
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - Mathematics
tag: 
 - Mathematics
---

## 模拟输入组合键<kbd>Ctrl</kbd>+<kbd>AnyKey</kbd>

在[上一篇笔记](./AutoIAC.md)中我提到没能将输入内容送入指定的进程PID，但在了解到这一点之前我学到了如下的一些内容：

```shell
echo $$ # 这个是显示当前进程的PID。
echo $1 # 这个是表示执行脚本时输入的第1个参数
```

特别地，对于命令`echo $'\<CODE>'`有如下的对应：

 - `\001` ==> <kbd>Ctrl</kbd>+<kbd>A</kbd>
 - `\002` ==> <kbd>Ctrl</kbd>+<kbd>B</kbd>
 - `\003` ==> <kbd>Ctrl</kbd>+<kbd>C</kbd>
 - `\004` ==> <kbd>Ctrl</kbd>+<kbd>D</kbd>
 - `\005` ==> <kbd>Ctrl</kbd>+<kbd>E</kbd>
 - `\006` ==> <kbd>Ctrl</kbd>+<kbd>F</kbd>
 - `\007` ==> <kbd>Ctrl</kbd>+<kbd>G</kbd>
 - `\010` ==> <kbd>Ctrl</kbd>+<kbd>H</kbd>
 - `\011` ==> <kbd>Ctrl</kbd>+<kbd>I</kbd>
 - `\012` ==> <kbd>Ctrl</kbd>+<kbd>J</kbd>
 - `\013` ==> <kbd>Ctrl</kbd>+<kbd>K</kbd>
 - `\014` ==> <kbd>Ctrl</kbd>+<kbd>L</kbd>
 - `\015` ==> <kbd>Ctrl</kbd>+<kbd>M</kbd>
 - `\016` ==> <kbd>Ctrl</kbd>+<kbd>N</kbd>
 - `\017` ==> <kbd>Ctrl</kbd>+<kbd>O</kbd>
 - `\020` ==> <kbd>Ctrl</kbd>+<kbd>P</kbd>
 - `\021` ==> <kbd>Ctrl</kbd>+<kbd>Q</kbd>
 - `\022` ==> <kbd>Ctrl</kbd>+<kbd>R</kbd>
 - `\023` ==> <kbd>Ctrl</kbd>+<kbd>S</kbd>
 - `\024` ==> <kbd>Ctrl</kbd>+<kbd>T</kbd>
 - `\025` ==> <kbd>Ctrl</kbd>+<kbd>U</kbd>
 - `\026` ==> <kbd>Ctrl</kbd>+<kbd>V</kbd>
 - `\027` ==> <kbd>Ctrl</kbd>+<kbd>W</kbd>
 - `\030` ==> <kbd>Ctrl</kbd>+<kbd>X</kbd>
 - `\031` ==> <kbd>Ctrl</kbd>+<kbd>Y</kbd>
 - `\032` ==> <kbd>Ctrl</kbd>+<kbd>Z</kbd>

在写上面的映射表时我嫌一个一个打太麻烦，于是搜索了好多资料，最后成功使用了Shell命令来实现循环输出字符，执行：

```shell
paste <(seq 1 26) <(echo -e "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ") |  while read num char; do printf " - \`\%03o\` ==> <kbd>Ctrl</kbd>+<kbd>$char</kbd>\n" $num; done
```

该命令的含义是将数字1-26和字母A-Z分别一一绑定，输入到后面的while循环中的两个变量`num`和`char`，然后按照该格式打出，执行该命令后会得到这个输出：

```shell
 - `\001` ==> <kbd>Ctrl</kbd>+<kbd>A</kbd>
 - `\002` ==> <kbd>Ctrl</kbd>+<kbd>B</kbd>
 - `\003` ==> <kbd>Ctrl</kbd>+<kbd>C</kbd>
 - `\004` ==> <kbd>Ctrl</kbd>+<kbd>D</kbd>
 - `\005` ==> <kbd>Ctrl</kbd>+<kbd>E</kbd>
 - `\006` ==> <kbd>Ctrl</kbd>+<kbd>F</kbd>
 - `\007` ==> <kbd>Ctrl</kbd>+<kbd>G</kbd>
 - `\010` ==> <kbd>Ctrl</kbd>+<kbd>H</kbd>
 - `\011` ==> <kbd>Ctrl</kbd>+<kbd>I</kbd>
 - `\012` ==> <kbd>Ctrl</kbd>+<kbd>J</kbd>
 - `\013` ==> <kbd>Ctrl</kbd>+<kbd>K</kbd>
 - `\014` ==> <kbd>Ctrl</kbd>+<kbd>L</kbd>
 - `\015` ==> <kbd>Ctrl</kbd>+<kbd>M</kbd>
 - `\016` ==> <kbd>Ctrl</kbd>+<kbd>N</kbd>
 - `\017` ==> <kbd>Ctrl</kbd>+<kbd>O</kbd>
 - `\020` ==> <kbd>Ctrl</kbd>+<kbd>P</kbd>
 - `\021` ==> <kbd>Ctrl</kbd>+<kbd>Q</kbd>
 - `\022` ==> <kbd>Ctrl</kbd>+<kbd>R</kbd>
 - `\023` ==> <kbd>Ctrl</kbd>+<kbd>S</kbd>
 - `\024` ==> <kbd>Ctrl</kbd>+<kbd>T</kbd>
 - `\025` ==> <kbd>Ctrl</kbd>+<kbd>U</kbd>
 - `\026` ==> <kbd>Ctrl</kbd>+<kbd>V</kbd>
 - `\027` ==> <kbd>Ctrl</kbd>+<kbd>W</kbd>
 - `\030` ==> <kbd>Ctrl</kbd>+<kbd>X</kbd>
 - `\031` ==> <kbd>Ctrl</kbd>+<kbd>Y</kbd>
 - `\032` ==> <kbd>Ctrl</kbd>+<kbd>Z</kbd>
```

同时我也注意到，如果是使用了`echo $'\1XX'`的话还有如下的映射关系：

 - `\101` ==> A
 - `\102` ==> B
 - `\103` ==> C
 - `\104` ==> D
 - `\105` ==> E
 - `\106` ==> F
 - `\107` ==> G
 - `\110` ==> H
 - `\111` ==> I
 - `\112` ==> J
 - `\113` ==> K
 - `\114` ==> L
 - `\115` ==> M
 - `\116` ==> N
 - `\117` ==> O
 - `\120` ==> P
 - `\121` ==> Q
 - `\122` ==> R
 - `\123` ==> S
 - `\124` ==> T
 - `\125` ==> U
 - `\126` ==> V
 - `\127` ==> W
 - `\130` ==> X
 - `\131` ==> Y
 - `\132` ==> Z

类似地，上面这个映射表我也是使用了这个命令：

```shell
paste <(seq 1 26) <(echo -e "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ") |  while read num char; do printf " - \`\\\1%02o\` ==> $char\n" $num; done
```

这样有什么用？当你需要完成自动化交互的时候可以使用`echo $<CODE> | XXX`来将这样的值输入到后面的XXX中。

## 针对模拟输入组合键<kbd>Ctrl</kbd>+<kbd>AnyKey</kbd>的思考

经过不断地尝试`echo $'\XXX' | $0`这个命令来查看终端反应后我发现，上一节这个映射表其实绝非偶然，经过我的查证后才发现，实质上`XXX`是一个八进制数字，转换为对应的十进制后你应该会发现，每一个字母对应的十进制数值恰恰是我们熟悉的ASCII码，比如$(101)_8=(65)_{10}$，这正好就是A的ASCII码。

于是我去查询ASCII码表，并在这给出：

|  二进制  | 八进制 | 十进制 | 十六进制 |                  字符/缩写                   |                解释                |
| :------: | :----: | :----: | :------: | :------------------------------------------: | :--------------------------------: |
| 00000000 |  000   |   0    |    00    |                  NUL (NULL)                  |               空字符               |
| 00000001 |  001   |   1    |    01    |           SOH (Start Of Headling)            |              标题开始              |
| 00000010 |  002   |   2    |    02    |             STX (Start Of Text)              |              正文开始              |
| 00000011 |  003   |   3    |    03    |              ETX (End Of Text)               |              正文结束              |
| 00000100 |  004   |   4    |    04    |          EOT (End Of Transmission)           |              传输结束              |
| 00000101 |  005   |   5    |    05    |                ENQ (Enquiry)                 |                请求                |
| 00000110 |  006   |   6    |    06    |              ACK (Acknowledge)               |         回应/响应/收到通知         |
| 00000111 |  007   |   7    |    07    |                  BEL (Bell)                  |                响铃                |
| 00001000 |  010   |   8    |    08    |                BS (Backspace)                |                退格                |
| 00001001 |  011   |   9    |    09    |             HT (Horizontal Tab)              |             水平制表符             |
| 00001010 |  012   |   10   |    0A    |          LF/NL(Line Feed/New Line)           |               换行键               |
| 00001011 |  013   |   11   |    0B    |              VT (Vertical Tab)               |             垂直制表符             |
| 00001100 |  014   |   12   |    0C    |          FF/NP (Form Feed/New Page)          |               换页键               |
| 00001101 |  015   |   13   |    0D    |             CR (Carriage Return)             |               回车键               |
| 00001110 |  016   |   14   |    0E    |                SO (Shift Out)                |              不用切换              |
| 00001111 |  017   |   15   |    0F    |                SI (Shift In)                 |              启用切换              |
| 00010000 |  020   |   16   |    10    |            DLE (Data Link Escape)            |            数据链路转义            |
| 00010001 |  021   |   17   |    11    |  DC1/XON (Device Control 1/Transmission On)  |         设备控制1/传输开始         |
| 00010010 |  022   |   18   |    12    |            DC2 (Device Control 2)            |             设备控制2              |
| 00010011 |  023   |   19   |    13    | DC3/XOFF (Device Control 3/Transmission Off) |         设备控制3/传输中断         |
| 00010100 |  024   |   20   |    14    |            DC4 (Device Control 4)            |             设备控制4              |
| 00010101 |  025   |   21   |    15    |          NAK (Negative Acknowledge)          |     无响应/非正常响应/拒绝接收     |
| 00010110 |  026   |   22   |    16    |            SYN (Synchronous Idle)            |              同步空闲              |
| 00010111 |  027   |   23   |    17    |       ETB (End of Transmission Block)        |       传输块结束/块传输终止        |
| 00011000 |  030   |   24   |    18    |                 CAN (Cancel)                 |                取消                |
| 00011001 |  031   |   25   |    19    |              EM (End of Medium)              | 已到介质末端/介质存储已满/介质中断 |
| 00011010 |  032   |   26   |    1A    |               SUB (Substitute)               |             替补/替换              |
| 00011011 |  033   |   27   |    1B    |                 ESC (Escape)                 |             逃离/取消              |
| 00011100 |  034   |   28   |    1C    |             FS (File Separator)              |             文件分割符             |
| 00011101 |  035   |   29   |    1D    |             GS (Group Separator)             |          组分隔符/分组符           |
| 00011110 |  036   |   30   |    1E    |            RS (Record Separator)             |             记录分离符             |
| 00011111 |  037   |   31   |    1F    |             US (Unit Separator)              |             单元分隔符             |
| 00100000 |  040   |   32   |    20    |                   (Space)                    |                空格                |
| 00100001 |  041   |   33   |    21    |                      !                       |                                    |
| 00100010 |  042   |   34   |    22    |                      "                       |                                    |
| 00100011 |  043   |   35   |    23    |                      #                       |                                    |
| 00100100 |  044   |   36   |    24    |                      $                       |                                    |
| 00100101 |  045   |   37   |    25    |                      %                       |                                    |
| 00100110 |  046   |   38   |    26    |                      &                       |                                    |
| 00100111 |  047   |   39   |    27    |                      '                       |                                    |
| 00101000 |  050   |   40   |    28    |                      (                       |                                    |
| 00101001 |  051   |   41   |    29    |                      )                       |                                    |
| 00101010 |  052   |   42   |    2A    |                      *                       |                                    |
| 00101011 |  053   |   43   |    2B    |                      +                       |                                    |
| 00101100 |  054   |   44   |    2C    |                      ,                       |                                    |
| 00101101 |  055   |   45   |    2D    |                      -                       |                                    |
| 00101110 |  056   |   46   |    2E    |                      .                       |                                    |
| 00101111 |  057   |   47   |    2F    |                      /                       |                                    |
| 00110000 |  060   |   48   |    30    |                      0                       |                                    |
| 00110001 |  061   |   49   |    31    |                      1                       |                                    |
| 00110010 |  062   |   50   |    32    |                      2                       |                                    |
| 00110011 |  063   |   51   |    33    |                      3                       |                                    |
| 00110100 |  064   |   52   |    34    |                      4                       |                                    |
| 00110101 |  065   |   53   |    35    |                      5                       |                                    |
| 00110110 |  066   |   54   |    36    |                      6                       |                                    |
| 00110111 |  067   |   55   |    37    |                      7                       |                                    |
| 00111000 |  070   |   56   |    38    |                      8                       |                                    |
| 00111001 |  071   |   57   |    39    |                      9                       |                                    |
| 00111010 |  072   |   58   |    3A    |                      :                       |                                    |
| 00111011 |  073   |   59   |    3B    |                      ;                       |                                    |
| 00111100 |  074   |   60   |    3C    |                      <                       |                                    |
| 00111101 |  075   |   61   |    3D    |                      =                       |                                    |
| 00111110 |  076   |   62   |    3E    |                      >                       |                                    |
| 00111111 |  077   |   63   |    3F    |                      ?                       |                                    |
| 01000000 |  100   |   64   |    40    |                      @                       |                                    |
| 01000001 |  101   |   65   |    41    |                      A                       |                                    |
| 01000010 |  102   |   66   |    42    |                      B                       |                                    |
| 01000011 |  103   |   67   |    43    |                      C                       |                                    |
| 01000100 |  104   |   68   |    44    |                      D                       |                                    |
| 01000101 |  105   |   69   |    45    |                      E                       |                                    |
| 01000110 |  106   |   70   |    46    |                      F                       |                                    |
| 01000111 |  107   |   71   |    47    |                      G                       |                                    |
| 01001000 |  110   |   72   |    48    |                      H                       |                                    |
| 01001001 |  111   |   73   |    49    |                      I                       |                                    |
| 01001010 |  112   |   74   |    4A    |                      J                       |                                    |
| 01001011 |  113   |   75   |    4B    |                      K                       |                                    |
| 01001100 |  114   |   76   |    4C    |                      L                       |                                    |
| 01001101 |  115   |   77   |    4D    |                      M                       |                                    |
| 01001110 |  116   |   78   |    4E    |                      N                       |                                    |
| 01001111 |  117   |   79   |    4F    |                      O                       |                                    |
| 01010000 |  120   |   80   |    50    |                      P                       |                                    |
| 01010001 |  121   |   81   |    51    |                      Q                       |                                    |
| 01010010 |  122   |   82   |    52    |                      R                       |                                    |
| 01010011 |  123   |   83   |    53    |                      S                       |                                    |
| 01010100 |  124   |   84   |    54    |                      T                       |                                    |
| 01010101 |  125   |   85   |    55    |                      U                       |                                    |
| 01010110 |  126   |   86   |    56    |                      V                       |                                    |
| 01010111 |  127   |   87   |    57    |                      W                       |                                    |
| 01011000 |  130   |   88   |    58    |                      X                       |                                    |
| 01011001 |  131   |   89   |    59    |                      Y                       |                                    |
| 01011010 |  132   |   90   |    5A    |                      Z                       |                                    |
| 01011011 |  133   |   91   |    5B    |                      [                       |                                    |
| 01011100 |  134   |   92   |    5C    |                      \                       |                                    |
| 01011101 |  135   |   93   |    5D    |                      ]                       |                                    |
| 01011110 |  136   |   94   |    5E    |                      ^                       |                                    |
| 01011111 |  137   |   95   |    5F    |                      _                       |                                    |
| 01100000 |  140   |   96   |    60    |                      `                       |                                    |
| 01100001 |  141   |   97   |    61    |                      a                       |                                    |
| 01100010 |  142   |   98   |    62    |                      b                       |                                    |
| 01100011 |  143   |   99   |    63    |                      c                       |                                    |
| 01100100 |  144   |  100   |    64    |                      d                       |                                    |
| 01100101 |  145   |  101   |    65    |                      e                       |                                    |
| 01100110 |  146   |  102   |    66    |                      f                       |                                    |
| 01100111 |  147   |  103   |    67    |                      g                       |                                    |
| 01101000 |  150   |  104   |    68    |                      h                       |                                    |
| 01101001 |  151   |  105   |    69    |                      i                       |                                    |
| 01101010 |  152   |  106   |    6A    |                      j                       |                                    |
| 01101011 |  153   |  107   |    6B    |                      k                       |                                    |
| 01101100 |  154   |  108   |    6C    |                      l                       |                                    |
| 01101101 |  155   |  109   |    6D    |                      m                       |                                    |
| 01101110 |  156   |  110   |    6E    |                      n                       |                                    |
| 01101111 |  157   |  111   |    6F    |                      o                       |                                    |
| 01110000 |  160   |  112   |    70    |                      p                       |                                    |
| 01110001 |  161   |  113   |    71    |                      q                       |                                    |
| 01110010 |  162   |  114   |    72    |                      r                       |                                    |
| 01110011 |  163   |  115   |    73    |                      s                       |                                    |
| 01110100 |  164   |  116   |    74    |                      t                       |                                    |
| 01110101 |  165   |  117   |    75    |                      u                       |                                    |
| 01110110 |  166   |  118   |    76    |                      v                       |                                    |
| 01110111 |  167   |  119   |    77    |                      w                       |                                    |
| 01111000 |  170   |  120   |    78    |                      x                       |                                    |
| 01111001 |  171   |  121   |    79    |                      y                       |                                    |
| 01111010 |  172   |  122   |    7A    |                      z                       |                                    |
| 01111011 |  173   |  123   |    7B    |                      {                       |                                    |
| 01111100 |  174   |  124   |    7C    |                      \|                      |                                    |
| 01111101 |  175   |  125   |    7D    |                      }                       |                                    |
| 01111110 |  176   |  126   |    7E    |                      ~                       |                                    |
| 01111111 |  177   |  127   |    7F    |                 DEL (Delete)                 |                删除                |

你尽可以自己亲自验证。

关于其中一些控制符号的说明其实可以执行这个命令来查看`stty -a`，得到的输出是：

```shell
❯ stty -a
speed 38400 baud; rows 29; columns 119; line = 0;
intr = ^C; quit = ^\; erase = ^?; kill = ^U; eof = ^D; eol = <undef>; eol2 = <undef>; swtch = <undef>; start = ^Q;
stop = ^S; susp = ^Z; rprnt = ^R; werase = ^W; lnext = ^V; discard = ^O; min = 1; time = 0;
-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts
-ignbrk brkint ignpar -parmrk -inpck -istrip -inlcr -igncr icrnl ixon -ixoff -iuclc -ixany imaxbel iutf8
opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0
isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke -flusho -extproc
```
