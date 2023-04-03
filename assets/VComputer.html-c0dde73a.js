import{_ as e,W as i,X as n,a1 as l}from"./framework-68a75bb9.js";const d={},c=l(`<h1 id="关于vcomputer如何实现循环的哲学问题" tabindex="-1"><a class="header-anchor" href="#关于vcomputer如何实现循环的哲学问题" aria-hidden="true">#</a> 关于Vcomputer如何实现循环的哲学问题</h1><hr><p>由于种种原因，我的计算机科学导论实验作业少做了第三题，题目如下：</p><blockquote><p>请使用Vcomputer用循环计算1+2+3+4+5+6+7+8+9+10的结果。</p></blockquote><p>当时吧，我一看这题，就去找Vcomputer的操作码表了，扫了一下，发现只有操作码8才符合循环的特性。这个特性其实好恶心的......</p><blockquote><p>8RXY -&gt; 若寄存器R与寄存器0中的值相同，则将数据XY（转移地址）存入程序计数器；否则程序按原来的顺序继续执行。</p></blockquote><p>以前使用高级编程语言的时候，这个问题都不是问题，for直接秒杀。但是这回是用Vcomputer，这可就难办了......经过长足的思考以及与学长们的讨论,终于找到解决问题的方法了,先放上我的代码~</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2001
2101
2201
2301
240A
2501
8418
5002
5112
5323
5553
830C
9000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来说一下想出这个鬼东西的思路:</p><ol><li>计算这个算式时,首先要知道得有一个寄存器能依次储存1,2,3,4,5,6,7,8,9,10这十个数,既然发现它们依次递增1,那么就可以单独使用一个寄存器做一个迭代运算(如上部代码的<code>5323</code>,也就是相当于<code>i++;</code>),不难发现,必须还要有另一个储存器存放1,否则无法直接使该储存器增加1.</li><li>循环这里是重中之重,是代码的最关键之处.要实现循环,我们首先要想,用几个储存器合适?</li><li>如果只用一个储存器,那么我们会发现,不论怎么写,这个循环总是不会顺利执行,因为总会还没到预期停止的时间就已经和储存器0的值不一样了,无法满足循环条件.</li><li>如果只用两个储存器(其中有一个是储存器0),你会发现,不论怎么做,都不能在需要的地方停下来,因为你总是能够构造出死循环.你既然要循环,就得要求这两个储存器的值始终相同,当你执行代码到应该停下的时候你会发现,你没有任何代码去跳出这个循环,也就是说这个循环是没法终止的,是个死循环.</li><li>那么用三个储存器如何?我们在原来两个储存器的基础上继续思考,你会发现,如果再来一个储存器用来存放你想停下的终点(对于这题来说是10),说到这你很可能就明白了:当你的储存器0执行到与第三个储存器的值相同时,你这时候就有这个条件且能够跳出循环啦!就是用操作码8直接跳到9000的地址即可.</li></ol><hr><p>不得不吐槽的是,机器代码真的好烦人好恶心,但是当我做成这个东西的时候,我会发现,它是这么地有意思,这么地有魅力,这份快乐简直无法替代!</p>`,12),s=[c];function r(a,t){return i(),n("div",null,s)}const u=e(d,[["render",r],["__file","VComputer.html.vue"]]);export{u as default};
