const e=JSON.parse('{"key":"v-6fea1fd8","path":"/DataStructures/Queue.html","title":"队列与循环队列","lang":"zh-CN","frontmatter":{"title":"队列与循环队列","date":"2023-04-18T21:42:38.000Z","author":"Breeze Shane","toc":true,"mathjax":true,"category":["DataStructuresAndAlgorithms"],"tag":["Data Structures and Algorithms"],"description":"队列简称队，也是一种操作受限的线性表，只允许在表的一端进行插入，而在另一端进行删除。我们称向队列中插入元素为入队，从队列中删除元素为出队或离队。 对于队列有以下三个概念： 队首：允许删除的一端，又称队头。 队尾：允许插入的一端。 空队列：不含任何元素的空表。 考研中可直接使用的栈的基本操作 InitQueue(&amp;Q): 初始化队列 QueueEmpty(Q): 判队列空 EnQueue(&amp;Q, x): 入队 DeQueue(&amp;Q, &amp;x): 出队 GetHead(Q, &amp;x): 读队首元素","head":[["meta",{"property":"og:url","content":"https://blog.brz.ink/DataStructures/Queue.html"}],["meta",{"property":"og:site_name","content":"𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌"}],["meta",{"property":"og:title","content":"队列与循环队列"}],["meta",{"property":"og:description","content":"队列简称队，也是一种操作受限的线性表，只允许在表的一端进行插入，而在另一端进行删除。我们称向队列中插入元素为入队，从队列中删除元素为出队或离队。 对于队列有以下三个概念： 队首：允许删除的一端，又称队头。 队尾：允许插入的一端。 空队列：不含任何元素的空表。 考研中可直接使用的栈的基本操作 InitQueue(&amp;Q): 初始化队列 QueueEmpty(Q): 判队列空 EnQueue(&amp;Q, x): 入队 DeQueue(&amp;Q, &amp;x): 出队 GetHead(Q, &amp;x): 读队首元素"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T13:44:33.000Z"}],["meta",{"property":"article:author","content":"Breeze Shane"}],["meta",{"property":"article:tag","content":"Data Structures and Algorithms"}],["meta",{"property":"article:published_time","content":"2023-04-18T21:42:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-18T13:44:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"队列与循环队列\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-18T21:42:38.000Z\\",\\"dateModified\\":\\"2023-04-18T13:44:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Breeze Shane\\"}]}"]]},"headers":[{"level":2,"title":"队列的顺序存储","slug":"队列的顺序存储","link":"#队列的顺序存储","children":[{"level":3,"title":"存在的问题","slug":"存在的问题","link":"#存在的问题","children":[]}]},{"level":2,"title":"队列的顺序存储变种——循环队列","slug":"队列的顺序存储变种——循环队列","link":"#队列的顺序存储变种——循环队列","children":[{"level":3,"title":"结构定义","slug":"结构定义","link":"#结构定义","children":[]},{"level":3,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":3,"title":"队列判空","slug":"队列判空","link":"#队列判空","children":[]},{"level":3,"title":"队列判满","slug":"队列判满","link":"#队列判满","children":[]},{"level":3,"title":"入队","slug":"入队","link":"#入队","children":[]},{"level":3,"title":"出队","slug":"出队","link":"#出队","children":[]},{"level":3,"title":"读取","slug":"读取","link":"#读取","children":[]},{"level":3,"title":"获取队列长度","slug":"获取队列长度","link":"#获取队列长度","children":[]}]},{"level":2,"title":"队列的链式存储","slug":"队列的链式存储","link":"#队列的链式存储","children":[{"level":3,"title":"初始化","slug":"初始化-1","link":"#初始化-1","children":[]},{"level":3,"title":"队列判空","slug":"队列判空-1","link":"#队列判空-1","children":[]},{"level":3,"title":"入队","slug":"入队-1","link":"#入队-1","children":[]},{"level":3,"title":"出队","slug":"出队-1","link":"#出队-1","children":[]}]},{"level":2,"title":"队列的拓展——双端队列","slug":"队列的拓展——双端队列","link":"#队列的拓展——双端队列","children":[]}],"git":{"createdTime":1680514047000,"updatedTime":1681825473000,"contributors":[{"name":"Breeze Shane","email":"72027962+BreezeShane@users.noreply.github.com","commits":2}]},"readingTime":{"minutes":6.85,"words":2056},"filePathRelative":"DataStructures/Queue.md","localizedDate":"2023年4月18日","excerpt":"<p>队列简称队，也是一种操作受限的线性表，只允许在表的一端进行插入，而在另一端进行删除。我们称向队列中插入元素为<strong>入队</strong>，从队列中删除元素为<strong>出队</strong>或<strong>离队</strong>。</p>\\n<p>对于队列有以下三个概念：</p>\\n<ol>\\n<li>队首：允许删除的一端，又称队头。</li>\\n<li>队尾：允许插入的一端。</li>\\n<li>空队列：不含任何元素的空表。</li>\\n</ol>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">考研中可直接使用的栈的基本操作</p>\\n<ol>\\n<li>InitQueue(&amp;Q): 初始化队列</li>\\n<li>QueueEmpty(Q): 判队列空</li>\\n<li>EnQueue(&amp;Q, x): 入队</li>\\n<li>DeQueue(&amp;Q, &amp;x): 出队</li>\\n<li>GetHead(Q, &amp;x): 读队首元素</li>\\n</ol>\\n</div>","autoDesc":true}');export{e as data};