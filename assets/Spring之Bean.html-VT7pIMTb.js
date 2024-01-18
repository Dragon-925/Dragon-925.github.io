const n=JSON.parse('{"key":"v-4dcc86f3","path":"/language/Spring/Spring%E4%B9%8BBean.html","title":"《Spring 之 Bean》","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-11-30T00:00:00.000Z","category":["Java","Spring"],"tag":["Bean生命周期","Bean作用域","Bean实例化"]},"headers":[{"level":2,"title":"Bean 的实例化","slug":"bean-的实例化","link":"#bean-的实例化","children":[{"level":3,"title":"1.构造器实例化","slug":"_1-构造器实例化","link":"#_1-构造器实例化","children":[]},{"level":3,"title":"2.静态工厂","slug":"_2-静态工厂","link":"#_2-静态工厂","children":[]},{"level":3,"title":"3.实例化工厂","slug":"_3-实例化工厂","link":"#_3-实例化工厂","children":[]}]},{"level":2,"title":"Bean 的作用域","slug":"bean-的作用域","link":"#bean-的作用域","children":[]},{"level":2,"title":"Bean 的生命周期","slug":"bean-的生命周期","link":"#bean-的生命周期","children":[]},{"level":2,"title":"Spring 循环依赖","slug":"spring-循环依赖","link":"#spring-循环依赖","children":[{"level":3,"title":"3 种形态","slug":"_3-种形态","link":"#_3-种形态","children":[]},{"level":3,"title":"解决循环依赖方法","slug":"解决循环依赖方法","link":"#解决循环依赖方法","children":[]}]}],"git":{},"readingTime":{"minutes":2.55,"words":765},"filePathRelative":"language/Spring/Spring之Bean.md","localizedDate":"2019年11月30日","excerpt":"<h1> 《Spring 之 Bean》</h1>\\n<h2> Bean 的实例化</h2>\\n<h3> 1.构造器实例化</h3>\\n<h3> 2.静态工厂</h3>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token doc-comment comment\\">/**\\n * 静态工厂模式\\n * （解耦）\\n */</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">DaoFactory</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">UserDao</span> <span class=\\"token function\\">userDaoFactory</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">UserDao</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{n as data};
