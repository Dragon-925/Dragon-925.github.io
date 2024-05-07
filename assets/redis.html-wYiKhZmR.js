const e=JSON.parse('{"key":"v-df5168fc","path":"/middleware/redis.html","title":"《Redis》","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2021-06-08T00:00:00.000Z","category":["Redis"],"tag":["缓存","中间件"]},"headers":[{"level":2,"title":"Redis之RDB","slug":"redis之rdb","link":"#redis之rdb","children":[]}],"git":{"createdTime":1713855427000,"updatedTime":1715073354000,"contributors":[{"name":"sz-Dawson","email":"dragon.zbl@qq.com","commits":4}]},"readingTime":{"minutes":5.55,"words":1664},"filePathRelative":"middleware/redis.md","localizedDate":"2021年6月8日","excerpt":"<h1> 《Redis》</h1>\\n<pre><code>    Redis，是一种以K,V形式存储并基于内存的非关系型数据库。\\n</code></pre>\\n<blockquote>\\n<p>特征</p>\\n</blockquote>\\n<ul>\\n<li>\\n<p>键值型，value支持不同数据结构</p>\\n</li>\\n<li>\\n<p>单线程，每个命令具有原子特性</p>\\n</li>\\n<li>\\n<p>低延迟、速度快（基于内存、IO多路复用）</p>\\n</li>\\n<li>\\n<p>支持数据持久化</p>\\n</li>\\n<li>\\n<p>支持主从集群、分片集群</p>\\n</li>\\n</ul>\\n<p><code>I/O多路复用：使用特定的系统调用，同时监听多个I/O事件，并在其中至少有一个I/O事件就绪时通知应用程序</code></p>"}');export{e as data};