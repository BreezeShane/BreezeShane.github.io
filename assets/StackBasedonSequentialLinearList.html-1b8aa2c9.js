const e=JSON.parse('{"key":"v-9f2a29be","path":"/DataStructures/StackBasedonSequentialLinearList.html","title":"顺序线性栈","lang":"zh-CN","frontmatter":{"title":"顺序线性栈","date":"2021-12-22T16:45:35.000Z","author":"Breeze Shane","toc":true,"mathjax":true,"category":["DataStructuresAndAlgorithms"],"tag":["Data Structures and Algorithms"],"description":"栈的定义 栈是一种特殊的线性表，特殊在于该线性表的操作是受限的，只能访问与操作栈顶元素。 顺序线性栈的定义 顾名思义，就是使用顺序线性表来实现栈的功能。 结构体定义如下： typedef int DataType; struct seqStack { int MAXNUM; int top; DataType *element; }; typedef struct seqStack* PseqStack;","head":[["meta",{"property":"og:url","content":"https://blog.brz.ink/DataStructures/StackBasedonSequentialLinearList.html"}],["meta",{"property":"og:site_name","content":"𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌"}],["meta",{"property":"og:title","content":"顺序线性栈"}],["meta",{"property":"og:description","content":"栈的定义 栈是一种特殊的线性表，特殊在于该线性表的操作是受限的，只能访问与操作栈顶元素。 顺序线性栈的定义 顾名思义，就是使用顺序线性表来实现栈的功能。 结构体定义如下： typedef int DataType; struct seqStack { int MAXNUM; int top; DataType *element; }; typedef struct seqStack* PseqStack;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-03T09:27:27.000Z"}],["meta",{"property":"article:author","content":"Breeze Shane"}],["meta",{"property":"article:tag","content":"Data Structures and Algorithms"}],["meta",{"property":"article:published_time","content":"2021-12-22T16:45:35.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-03T09:27:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"顺序线性栈\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-22T16:45:35.000Z\\",\\"dateModified\\":\\"2023-04-03T09:27:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Breeze Shane\\"}]}"]]},"headers":[{"level":2,"title":"栈的定义","slug":"栈的定义","link":"#栈的定义","children":[]},{"level":2,"title":"顺序线性栈的定义","slug":"顺序线性栈的定义","link":"#顺序线性栈的定义","children":[]},{"level":2,"title":"顺序线性栈的基本操作与实现","slug":"顺序线性栈的基本操作与实现","link":"#顺序线性栈的基本操作与实现","children":[{"level":3,"title":"创建","slug":"创建","link":"#创建","children":[]},{"level":3,"title":"入栈","slug":"入栈","link":"#入栈","children":[]},{"level":3,"title":"出栈","slug":"出栈","link":"#出栈","children":[]},{"level":3,"title":"读取栈顶元素","slug":"读取栈顶元素","link":"#读取栈顶元素","children":[]},{"level":3,"title":"销毁栈","slug":"销毁栈","link":"#销毁栈","children":[]}]},{"level":2,"title":"顺序线性栈的优缺点","slug":"顺序线性栈的优缺点","link":"#顺序线性栈的优缺点","children":[]}],"git":{"createdTime":1680514047000,"updatedTime":1680514047000,"contributors":[{"name":"Breeze Shane","email":"72027962+BreezeShane@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.32,"words":397},"filePathRelative":"DataStructures/StackBasedonSequentialLinearList.md","localizedDate":"2021年12月22日","excerpt":"<h2> 栈的定义</h2>\\n<p>栈是一种特殊的线性表，特殊在于该线性表的操作是受限的，只能访问与操作栈顶元素。</p>\\n<h2> 顺序线性栈的定义</h2>\\n<p>顾名思义，就是使用顺序线性表来实现栈的功能。</p>\\n<p>结构体定义如下：</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">typedef</span> <span class=\\"token keyword\\">int</span> DataType<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">seqStack</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">int</span> MAXNUM<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">int</span> top<span class=\\"token punctuation\\">;</span>\\n  DataType <span class=\\"token operator\\">*</span>element<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">typedef</span> <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">seqStack</span><span class=\\"token operator\\">*</span> PseqStack<span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};