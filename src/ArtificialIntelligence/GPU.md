---
title: 机器学习的GPU参数指南
date: 2022-08-17 22:08:52
author: Breeze Shane
top: false
toc: true
mathjax: true
category: 
 - ArtificialIntelligence
tag: 
 - Artificial Intelligence
---

::: details 参考资料

1. [通俗易懂的显卡参数详解](http://www.xiaobaixitong.com/jiaocheng/41105.html)
2. [深度学习显卡选型指南:关于GPU选择的一般建议](http://www.skcircle.com/?id=1292)
3. [深度学习GPU显卡选型攻略](https://ai-wx.blog.csdn.net/article/details/118751181)
4. [深度学习 训练吃显卡_深度学习显卡参数详细对比](https://blog.csdn.net/weixin_29009501/article/details/112160280)
5. [深度学习的GPU型号和参数选择](https://blog.csdn.net/Deeachain/article/details/106690556)
6. [显卡的主时钟频率和显存频率分别表示了显卡的哪个方面性能](https://wap.zol.com.cn/ask/details_2575011_3084537_3.html)
7. [如何分辨显卡的重要参数（重要参数详解）](https://blog.51cto.com/professor/1573126)
8. [显存容量 - 百度百科](https://baike.baidu.com/item/%E6%98%BE%E5%AD%98%E5%AE%B9%E9%87%8F/275347)
9. [显存 - 维基百科](https://zh.m.wikipedia.org/zh-hans/%E6%98%BE%E5%AD%98)
10. [NVIDIA英伟达GPU显卡算力一览（包含Tesla和GeForce、TITAN及RTX系列等）](https://blog.csdn.net/qq_41070955/article/details/108269915)
11. [NVIDIA GPU 架构梳理](https://zhuanlan.zhihu.com/p/394352476)
12. [FLOPS和FLOPs、GFLOPs区别与计算](https://blog.csdn.net/weixin_44479045/article/details/120873332)
13. [NVIDIA GPU的浮点计算能力](https://blog.csdn.net/zong596568821xp/article/details/103957058)
14. [双精度，单精度和半精度](https://blog.csdn.net/sinat_24143931/article/details/78557852)

:::

## 前言（关于显卡的一系列事）

> 这里会简单聊聊当下显卡的背景环境以及近期的一些相关事情。正文在下一节。

显卡对于炼丹人来说非常重要，因为它相当于是一个炼丹炉。能多久得到一个优良的“丹”，有一部分就要取决于炼丹炉的质地。俗话说，工欲善其事，必先利其器，挑选一个合适的显卡对于炼丹人而言意义不小。

但目前依旧比较尴尬的是，我们惦念的好显卡，普遍价格非常高，其实这里面就有挖矿行业和游戏行业推动的原因。我们想要用上好些的显卡来进行训练、推断等等作业，就要不得不支付一大笔费用，甚至可能这样的费用普通人是承担不起的。

后来我考虑了一个选择：那我退而求其次，我买一个能用的二手好显卡不可吗？于是我打探了各路消息，得出的结论是：跑，别碰！

这是因为近几年相当多的无良商家大批量采购了几近报废的“矿卡”，通过一些操作进行翻新之后充当二手卡卖，相当多的人都中了套：买来的显卡表面看上去是个新卡，应该非常不错，实际上内部却是满目疮痍，或许是这里元件烧坏，或许那里是缺失零件，等等。

而且在2021年五六月中，国家出台了政策要打压挖矿行业，可以说这真的是炼丹人的福音！然而近期知名网购平台上又出现了欺骗消费者的行为：商家将剩下的还没用完的矿卡等进行了翻新处理，再按照新卡的价格卖出。这一现象的曝光原因是有消费者收货后发现显卡非常老旧，内部的散热风扇口上也有非常重的灰尘，而店铺上写的正是新卡，当消费者与客服联系将显卡寄回店家后许久都没再受到货，联系客服也没有回音，于是这一事情在bilibili上得以曝光，有人认为邮寄回去的那个显卡被店家再翻新之后卖给了别人，真实性虽尚不可知，但这样的事本身已经足够恶劣。

以上种种都打消了我购置二手显卡的念头，还对全新的显卡也保有了一些戒心。因此迄今为止，我使用显卡的首要考虑途径仍然是通过关系借用工作站上的显卡，其次才是在各云GPU平台上购置会员进行使用。

在这里我想提一下我曾经使用过的云GPU平台Colab。我不建议在这个平台上进行相关的训练等实验，虽然，Colab在能够与Google云盘结合使用上的确非常方便，而且如果有能连接到海外的服务器，从平台到该服务器的传输速度也相当快，但是，Colab使用非常不友好。现在的Colab早就不是当年那个样子了，现在的Colab又有小会员、大会员之分，使用体验上小会员也开始和免费用户一样受到较多限制了，比如每几小时如果发现长时间不使用的话会被断线，关闭页面会导致当前的进程被服务器杀掉，而且平台上的数据也会被清空，最糟糕的是，如果不巧你需要进行高强度模型训练，Colab就会限制你的使用，我至今也没弄明白它是按照什么逻辑限制你的使用，但只要你的强度到了，它就是会提示你不可以使用，要等一段时间之后，而且也没告诉你这个“一段时间”有多久，反正不是一天两天。

介于这一原因，我也开始反感这类的云GPU平台，这也促使我更加想购买一个新的显卡了。之后我在相当长的时间搜集了各种资料来研究如何挑选显卡、看显卡的参数等等，遂有了这一篇文章，目的是为了给自己整顿一个采购思路。

至于为什么没买，肯定是因为没钱啊（悲）！

## 概念解释

1. **显示芯片**： 显示芯片是显卡的核心芯片，它的性能好坏直接决定了显卡性能的好坏，它的主要任务就是处理系统输入的视频信息并将其进行构建、渲染等工作。另外，显示主芯片的性能直接决定了显示卡性能的高低。
2. **核心频率**： 显示核心的核心频率在一定程度上反映出核心的运行性能，就像CPU的运行频率一样，是显卡GPU的工作频率。如果在相同核心架构的前提下，核心频率越高的显卡其运行性能就越好。核心频率的高低决定了GPU与显存之间数据交换的快慢。另外，核心频率也有其他叫法：主时钟频率。
3. **显存速度**： 显存速度一般以ns（纳秒）为单位，越小表示显存的速度越快，显存的性能越好。
4. **显存类型**： 显卡上采用的显存类型主要有SDR、DDR SDRAM、DDR SGRAM、DDR2、GDDR2、DDR3、GDDR3、GDDR4、GDDR5。其中，现在以GDDR3和GDDR5为主，不同的显存类型，传输效率都不一样。
5. **显存频率**： 显存频率是指默认情况下，该显存在显卡上工作时的频率，以MHz（兆赫兹）为单位。显存频率一定程度上反应着该显存的速度，显存频率越高数据在显存上记录与读取的速度越快，而不同显存能提供的显存频率也差异很大。显存频率与显存时钟周期是相关的，二者成倒数关系，显存的理论工作频率计算公式是：
   $$
   \text{额定工作频率}(MHz)＝\frac{1000}{\text{显存速度}}\times n
   $$
   「**注**」：n因显存类型不同而不同，如果是SDRAM显存，则n=1；DDR显存则n=2；DDRⅡ显存则n=4
6. **显存容量**: 显存容量是显卡上显存的容量数，这是选择显卡的关键参数之一。 显存容量决定着显存临时存储数据的多少，显卡显存容量有128MB、256MB、512MB、1024MB几种，64MB和128MB显存的显卡已非常少见，主流的是2GB、4GB、8GB的产品。 现如今最新显卡已经能达到1TB的显存容量（Pro SSG）。
7. **显存位宽**: 显存位宽是显存在一个时钟周期内所能传送数据的位数，位数越大则瞬间所能传输的数据量越大。目前市场上的显存位宽有64位、128位、256位、384位、448位和512位等。$\text{显存位宽}＝\text{显存颗粒位宽}\times\text{显存颗粒数}$。
8. **显卡带宽**: 指显示芯片与显存之间数据传输速率，它以字节/秒为单位，是决定显卡性能和速度的主要因素，计算公式为：
   $$
   \text{显存带宽}＝\frac{\text{工作频率}\times\text{显存位宽}}{8}\text{bit}
   $$
   「**注**」：显卡位宽和显卡带宽是两个不同的概念的，不过两者的关系也联系紧密，在显存频率相当的情况下，显存位宽将决定显存带宽的大小。目前大多中低端的显卡都能提供6.4GB/s至60GB/s的显存带宽，而对于中高端的显卡产品则提供超过60GB/s的显存带宽。
9.  **流处理单元**: 在DX10显卡出来以前，并没有“流处理器”这个说法，在DX10的时代，取消了传统的“像素管线”和“顶点管线”，统一改为流处理器单元，它既可以进行顶点运算也可以进行像素运算。
10. **显存封装**: 显存封装类型基本分TSOP、QFP和BGA三类，现在基本以BGA为主。
11. **3D API**: 3D API是指显卡与应用程序直接的接口。目前个人电脑中主要应用的3D API有DirectX和OpenGL。
12. **输出接口**: 现在目前基本都是VGA、DVI、HDMI、DP接口。以前都是以VGA接口为主，随着技术的发展，现在反而更多的是用DVI和HDMI，一般对接口要求都不是很多。
13. **浮点计算能力**： 要谈论浮点计算能力首先得区分不同精度的浮点数：半精度、单精度、双精度三种（三者都是IEEE 754标准定义的）。深度学习对精度要求往往不高，因而通常我们关注单精度浮点计算能力。在考虑尽可能节省数据传输与存储成本的情况下我们关注半精度浮点计算能力，而在一些如医学图像等对精度要求比较高的特殊领域里我们更加关注双精度浮点数，因为双精度64位，单精度32位，半精度16位。

---

GPU的浮点计算理论峰值能力的计算公式：
$$
\text{理论峰值} ＝ \text{GPU芯片数量} \times \text{GPU Boost主频} \times \text{核心数量} \times \text{单个时钟周期内能处理的浮点计算次数} \\
\text{双精度理论峰值} ＝ \text{FP64 Cores} \times \text{GPU Boost Clock}(\text{GHz}) \times 2 \\
\text{单精度理论峰值} ＝ \text{FP32 cores} \times \text{GPU Boost Clock}(\text{GHz}) \times 2
$$

注：由于P100还支持在一个FP32里同时进行2次FP16的半精度浮点计算，所以对于半精度的理论峰值更是单精度浮点数计算能力的两倍。

---

FLOPS是Floating-Point Operations Per Second的缩写，意指每秒浮点运算次数。用来衡量硬件的性能。而FLOPs是Floating Point of Operations的缩写，是浮点运算次数，可以用来衡量算法/模型复杂度。

FLOPS的单位换算
$$
1\,\text{MFLOPS}(\text{Mega FLOPS}) = 10^{6}  \Rightarrow \text{每秒一百万次的浮点运算} \\
1\,\text{GFLOPS}(\text{Giga FLOPS}) = 10^{9}  \Rightarrow \text{每秒十亿次的浮点运算} \\
1\,\text{TFLOPS}(\text{Tera FLOPS}) = 10^{12} \Rightarrow \text{每秒一万亿次的浮点运算} \\
1\,\text{PFLOPS}(\text{Peta FLOPS}) = 10^{15} \Rightarrow \text{每秒一千万亿次的浮点运算} \\
1\,\text{EFLOPS}(\text{Exa FLOPS}) = 10^{18} \Rightarrow \text{每秒一百京次的浮点运算} \\
1\,\text{ZFLOPS}(\text{Zetta FLOPS}) = 10^{21} \Rightarrow \text{每秒十万京次的浮点运算}
$$

## 选购参考建议

1. 算力至少在5.0以上。
   > 这里的Compute Capability(算力)并不是我们常说的TFLOPS算力，它只是英伟达给自己支持CUDA的GPU设置的一个“版本号”而已，代表着这个GPU具备什么样的功能，版本号越高说明 GPU 的工具包越新，支持的功能越新。
2. 显存尽量大，如果是CV领域中使用，建议至少8GB。
3. 关注这些参数：GPU架构、显存带宽、显存位宽、GPU工作频率、CUDA核心数量和功耗。
   > GPU架构有Tesla 架构、Fermi架构、Kepler架构、Maxwell架构、Pascal架构、Volta架构、Turing架构和Ampere架构等。
4. 深度学习注重的参数有两个，分别是显存带宽和浮点计算能力，显存带宽计算涉及到的显卡参数：显存位宽(位)、显存频率(Mhz)，单精度浮点据算能力涉及到的显卡参数：显卡主频(Mhz)、CUDA核心。

---

对于不同类型的神经网络，主要参考的指标是不太一样的。

**卷积网络和Transformer**：Tensor核心数 > 单精度浮点性能 > 显存带宽 > 半精度浮点性能

**循环神经网络**：显存带宽 > 半精度浮点性能 > Tensor核心数 > 单精度浮点性能

::: tip 推荐阅读

推荐阅读文章开头参考资料中的[深度学习显卡选型指南:关于GPU选择的一般建议](http://www.skcircle.com/?id=1292)，采购的原则就是对症下药，按需采购。在这里放出该文章中我认为最值得读的一段：

> 现在，如果要判断显卡性能好不好，它的指标应该是带宽、FLOPS和Tensor Cores三合一。要理解这一点，我们可以看看矩阵乘积和卷积这两个最重要的张量操作是在哪里被加速的。
> 
> 提到矩阵乘积，最简单有效的一个理念是它受带宽限制。如果你想用LSTM和其他需要经常进行大量矩阵乘积运算的RNN，那么内存带宽是GPU最重要的特性。类似地，卷积受计算速度约束，因此对于ResNets和其他CNN，GPU上的TFLOP是性能的最佳指标。
> 
> Tensor Cores的出现稍稍改变了上述平衡。它们是非常简单的专用计算单元，可以加速计算——但不是内存带宽 ——因此对CNN来说，如果GPU里有Tensor Core，它们带来的最大改善就是速度提高约30％到100％。
> 
> 虽然Tensor Cores只能提高计算速度，但它们也可以使用16bit数进行计算。这对矩阵乘法也是一个巨大优势，因为在具有相同存储器带宽的矩阵中，16bit数的信息传输量是32bit数的两倍。数字存储器大小的削减对于在L1高速缓存中存储更多数字特别重要，实现了这一点，矩阵就越大，计算效率也更高。所以如果用了Tensor Cores，它对LSTM的提速效果约为20％至60％。
> 
> 请注意，这种加速不是来自Tensor Cores本身，而是来自它们进行16bit数计算的能力。AMD GPU也支持16bit数计算，这意味着在进行乘积运算时，它们其实和具有Tensor Cores的NVIDIA显卡一样快。
> 
> Tensor Cores的一个大问题是它们需要16位浮点输入数据，这可能会引入一些软件支持问题，因为网络通常使用32位。如果没有16位输入，Tensor Cores将毫无用处。但是，我认为这些问题将很快得到解决，因为Tensor Cores太强大了，现在它们已经出现在消费级GPU中，未来，使用它的人只会越来越多。请注意，随着16bit数被引入深度学习，GPU内存其实也相当于翻倍了，因为现在我们可以在同样大小的内存中存储比之前多一倍的参数。
> 
> 总的来说，最好的经验法则是：如果用RNN，请看带宽；如果用卷积，请看FLOPS；如果有钱，上Tensor Cores（除非你必须购买Tesla）。

关于他的采购建议可以点击链接在文章开头处寻找。

:::