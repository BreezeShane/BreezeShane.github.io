const a=JSON.parse('{"key":"v-2dce2907","path":"/DataStructures/Basis.html","title":"数据结构前置知识","lang":"zh-CN","frontmatter":{"title":"数据结构前置知识","date":"2023-04-04T21:45:43.000Z","author":"Breeze Shane","top":false,"toc":true,"mathjax":true,"category":["AlgorithmDesignAndAnalysis"],"tag":["Algorithm Design and Analysis"],"description":"基本概念 算法效率的度量是通过时间复杂度与空间复杂度两方面来描述的，使用的数学概念是函数渐近的界，详细信息去往算法基础。 时间复杂度 一个语句的频度是指该语句在算法中被重复执行的次数，而算法中所有语句的频度之和记为T(n)，而算法中基本运算的频度与T(n)同数量级，故通常采用算法中基本运算的频度f(n)来分析算法的时间复杂度，故而算法时间复杂度记为T(n)=O(f(n))。","head":[["meta",{"property":"og:url","content":"https://blog.brz.ink/DataStructures/Basis.html"}],["meta",{"property":"og:site_name","content":"𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌"}],["meta",{"property":"og:title","content":"数据结构前置知识"}],["meta",{"property":"og:description","content":"基本概念 算法效率的度量是通过时间复杂度与空间复杂度两方面来描述的，使用的数学概念是函数渐近的界，详细信息去往算法基础。 时间复杂度 一个语句的频度是指该语句在算法中被重复执行的次数，而算法中所有语句的频度之和记为T(n)，而算法中基本运算的频度与T(n)同数量级，故通常采用算法中基本运算的频度f(n)来分析算法的时间复杂度，故而算法时间复杂度记为T(n)=O(f(n))。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-13T09:04:47.000Z"}],["meta",{"property":"article:author","content":"Breeze Shane"}],["meta",{"property":"article:tag","content":"Algorithm Design and Analysis"}],["meta",{"property":"article:published_time","content":"2023-04-04T21:45:43.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-13T09:04:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据结构前置知识\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-04T21:45:43.000Z\\",\\"dateModified\\":\\"2023-04-13T09:04:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Breeze Shane\\"}]}"]]},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[{"level":3,"title":"时间复杂度","slug":"时间复杂度","link":"#时间复杂度","children":[]},{"level":3,"title":"空间复杂度","slug":"空间复杂度","link":"#空间复杂度","children":[]}]}],"git":{"createdTime":1680617382000,"updatedTime":1681376687000,"contributors":[{"name":"Breeze Shane","email":"72027962+BreezeShane@users.noreply.github.com","commits":2}]},"readingTime":{"minutes":1.52,"words":455},"filePathRelative":"DataStructures/Basis.md","localizedDate":"2023年4月4日","excerpt":"<h2> 基本概念</h2>\\n<p>算法效率的度量是通过时间复杂度与空间复杂度两方面来描述的，使用的数学概念是函数渐近的界，详细信息去往<a href=\\"/AlgorithmDesignAndAnalysis/Basis\\">算法基础</a>。</p>\\n<h3> 时间复杂度</h3>\\n<p>一个语句的频度是指该语句在算法中被重复执行的次数，而算法中所有语句的频度之和记为<span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">T</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">n</span><span class=\\"mclose\\">)</span></span></span></span>，而算法中基本运算的频度与<span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">T</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">n</span><span class=\\"mclose\\">)</span></span></span></span>同数量级，故通常采用算法中基本运算的频度<span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.10764em;\\">f</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">n</span><span class=\\"mclose\\">)</span></span></span></span>来分析算法的时间复杂度，故而算法时间复杂度记为<span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">T</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">n</span><span class=\\"mclose\\">)</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">=</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.02778em;\\">O</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.10764em;\\">f</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">n</span><span class=\\"mclose\\">))</span></span></span></span>。</p>","autoDesc":true}');export{a as data};