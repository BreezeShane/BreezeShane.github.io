const e=JSON.parse('{"key":"v-b0ea6750","path":"/BlogBuildingAndUsing/LaTeXforMd.html","title":"LaTeX公式(For Markdown)","lang":"zh-CN","frontmatter":{"title":"LaTeX公式(For Markdown)","date":"2021-04-19T18:42:33.000Z","author":"Breeze Shane","img":"/source/images/","top":false,"toc":true,"mathjax":true,"excerpt":"本文详细记述了LaTeX的语法知识，可以直接当作帮助文档或者字典手册之类的东西。","category":["Markdown"],"keywords":null,"tag":["Markdown","LaTeX"],"description":"参考内容： MathJax basic tutorial and quick reference (https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) Cmd Markdown 公式指导手册 (https://www...","head":[["meta",{"property":"og:url","content":"https://blog.brz.ink/BlogBuildingAndUsing/LaTeXforMd.html"}],["meta",{"property":"og:site_name","content":"𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌"}],["meta",{"property":"og:title","content":"LaTeX公式(For Markdown)"}],["meta",{"property":"og:description","content":"参考内容： MathJax basic tutorial and quick reference (https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) Cmd Markdown 公式指导手册 (https://www..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-03T09:27:27.000Z"}],["meta",{"property":"article:author","content":"Breeze Shane"}],["meta",{"property":"article:tag","content":"Markdown"}],["meta",{"property":"article:tag","content":"LaTeX"}],["meta",{"property":"article:published_time","content":"2021-04-19T18:42:33.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-03T09:27:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LaTeX公式(For Markdown)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-04-19T18:42:33.000Z\\",\\"dateModified\\":\\"2023-04-03T09:27:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Breeze Shane\\"}]}"]]},"headers":[{"level":2,"title":"插入公式","slug":"插入公式","link":"#插入公式","children":[]},{"level":2,"title":"输入上下标","slug":"输入上下标","link":"#输入上下标","children":[]},{"level":2,"title":"输入括号和分隔符","slug":"输入括号和分隔符","link":"#输入括号和分隔符","children":[]},{"level":2,"title":"输入分数","slug":"输入分数","link":"#输入分数","children":[]},{"level":2,"title":"输入开方","slug":"输入开方","link":"#输入开方","children":[]},{"level":2,"title":"输入省略号","slug":"输入省略号","link":"#输入省略号","children":[]},{"level":2,"title":"输入向量","slug":"输入向量","link":"#输入向量","children":[]},{"level":2,"title":"输入积分","slug":"输入积分","link":"#输入积分","children":[]},{"level":2,"title":"输入极限符号","slug":"输入极限符号","link":"#输入极限符号","children":[]},{"level":2,"title":"输入求和符号、求积符号","slug":"输入求和符号、求积符号","link":"#输入求和符号、求积符号","children":[]},{"level":2,"title":"输入希腊字母","slug":"输入希腊字母","link":"#输入希腊字母","children":[]},{"level":2,"title":"输入特殊字符","slug":"输入特殊字符","link":"#输入特殊字符","children":[{"level":3,"title":"(1)．关系运算符","slug":"_1-关系运算符","link":"#_1-关系运算符","children":[]},{"level":3,"title":"(2)．集合运算符","slug":"_2-集合运算符","link":"#_2-集合运算符","children":[]},{"level":3,"title":"(3)．对数运算符","slug":"_3-对数运算符","link":"#_3-对数运算符","children":[]},{"level":3,"title":"(4)．三角运算符","slug":"_4-三角运算符","link":"#_4-三角运算符","children":[]},{"level":3,"title":"(5)．微积分运算符","slug":"_5-微积分运算符","link":"#_5-微积分运算符","children":[]},{"level":3,"title":"(6)．逻辑运算符","slug":"_6-逻辑运算符","link":"#_6-逻辑运算符","children":[]},{"level":3,"title":"(7)．戴帽符号","slug":"_7-戴帽符号","link":"#_7-戴帽符号","children":[]},{"level":3,"title":"(8)．连线符号","slug":"_8-连线符号","link":"#_8-连线符号","children":[]},{"level":3,"title":"(9)．箭头符号","slug":"_9-箭头符号","link":"#_9-箭头符号","children":[]}]},{"level":2,"title":"字体转换","slug":"字体转换","link":"#字体转换","children":[]},{"level":2,"title":"设置高亮","slug":"设置高亮","link":"#设置高亮","children":[]},{"level":2,"title":"大括号和行标的使用","slug":"大括号和行标的使用","link":"#大括号和行标的使用","children":[]},{"level":2,"title":"定义新运算符","slug":"定义新运算符","link":"#定义新运算符","children":[]},{"level":2,"title":"添加注释文字","slug":"添加注释文字","link":"#添加注释文字","children":[]},{"level":2,"title":"在字符间加入空格","slug":"在字符间加入空格","link":"#在字符间加入空格","children":[]},{"level":2,"title":"更改文字颜色","slug":"更改文字颜色","link":"#更改文字颜色","children":[]},{"level":2,"title":"添加删除线","slug":"添加删除线","link":"#添加删除线","children":[]},{"level":2,"title":"输入矩阵","slug":"输入矩阵","link":"#输入矩阵","children":[{"level":3,"title":"无框矩阵","slug":"无框矩阵","link":"#无框矩阵","children":[]},{"level":3,"title":"边框矩阵","slug":"边框矩阵","link":"#边框矩阵","children":[]},{"level":3,"title":"带省略符号的矩阵","slug":"带省略符号的矩阵","link":"#带省略符号的矩阵","children":[]},{"level":3,"title":"带分割符号的矩阵","slug":"带分割符号的矩阵","link":"#带分割符号的矩阵","children":[]},{"level":3,"title":"行中矩阵","slug":"行中矩阵","link":"#行中矩阵","children":[]}]},{"level":2,"title":"输入方程组","slug":"输入方程组","link":"#输入方程组","children":[]},{"level":2,"title":"输入方程式序列","slug":"输入方程式序列","link":"#输入方程式序列","children":[]},{"level":2,"title":"输入繁分数","slug":"输入繁分数","link":"#输入繁分数","children":[]},{"level":2,"title":"输入交换图表","slug":"输入交换图表","link":"#输入交换图表","children":[]},{"level":2,"title":"输入条件表达式","slug":"输入条件表达式","link":"#输入条件表达式","children":[]}],"git":{"createdTime":1680514047000,"updatedTime":1680514047000,"contributors":[{"name":"Breeze Shane","email":"72027962+BreezeShane@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":12.47,"words":3740},"filePathRelative":"BlogBuildingAndUsing/LaTeXforMd.md","localizedDate":"2021年4月19日","autoDesc":true}');export{e as data};