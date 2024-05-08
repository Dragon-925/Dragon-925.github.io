import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as d,a as n}from"./app-SCOzfqwc.js";const l={},s=n(`<h1 id="《redis》" tabindex="-1"><a class="header-anchor" href="#《redis》" aria-hidden="true">#</a> 《Redis》</h1><pre><code>    Redis，是一种以K,V形式存储并基于内存的非关系型数据库。
</code></pre><blockquote><p>特征</p></blockquote><ul><li><p>键值型，value支持不同数据结构</p></li><li><p>单线程，每个命令具有原子特性</p></li><li><p>低延迟、速度快（基于内存、IO多路复用）</p></li><li><p>支持数据持久化</p></li><li><p>支持主从集群、分片集群</p></li></ul><p><code>I/O多路复用：使用特定的系统调用，同时监听多个I/O事件，并在其中至少有一个I/O事件就绪时通知应用程序</code></p><blockquote><p>数据类型-基本类型</p></blockquote><ul><li><p>String: hello redis</p><pre><code>  定义：字符串是 Redis 中最基本的数据结构之一，它是一个二进制安全的字符串，可以包含任何数据，例如文本、整数或二进制数据。
  区别：字符串是 Redis 中最简单的数据结构，你可以执行一些基本的操作，如设置和获取值、追加、获取子字符串等。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>设置值：SET key value
获取值：GET key
追加值：APPEND key value
获取子字符串：GETRANGE key start end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Hash</p><pre><code>  定义：哈希是一种键值对的集合，其中每个键都与一个值相关联。哈希适用于存储对象，并且可以在哈希对象中设置、获取和删除单个字段。
  区别：哈希结构允许你存储和检索与一个键相关联的多个字段，这使得哈希结构非常适合存储对象的属性。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>设置字段值：HSET key field value
获取字段值：HGET key field
获取所有字段值：HGETALL key
删除字段：HDEL key field [field ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>List</p><pre><code>  定义：列表是一个有序的字符串集合，按照插入顺序存储。你可以在列表的两端执行插入和删除操作。
  区别：列表结构允许你按顺序存储多个元素，并且可以根据需要在列表的任一端添加或删除元素。这使得列表结构非常适合用作队列或栈。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>从左端插入元素：LPUSH key value [value ...]
从右端插入元素：RPUSH key value [value ...]
获取范围内的元素：LRANGE key start stop
移除并返回左端的元素：LPOP key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Set</p><pre><code>  定义：集合是一个无序的字符串集合，不允许重复的成员。你可以执行添加、删除和判断成员是否存在等操作。
  区别：集合结构允许你存储一组唯一的元素，并提供了快速的成员检查功能。这使得集合结构非常适合用于存储唯一值的场景。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加成员：SADD key member [member ...]
移除成员：SREM key member [member ...]
获取所有成员：SMEMBERS key
判断成员是否存在：SISMEMBER key member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>SortedSet</p><pre><code>  定义：有序集合与集合类似，但每个成员都关联一个分数，根据分数对成员进行排序。你可以添加、删除、更新成员，并按分数范围或成员检索排名。
  区别：有序集合结构除了提供了集合的所有功能外，还允许你按照成员的分数进行排序和检索。这使得有序集合结构非常适合用于需要根据分数排序的场景，如排行榜等。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加成员：ZADD key score member [score member ...]
移除成员：ZREM key member [member ...]
获取指定范围内的成员：ZRANGE key start stop [WITHSCORES]
根据分数范围获取成员数量：ZCOUNT key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><blockquote><p>数据类型-特殊类型</p></blockquote><ul><li><p>GEO</p><pre><code>  定义：GEO 是 Redis 用于处理地理空间数据的数据结构，它可以存储地理位置（经度和纬度）与名称之间的映射关系，并支持执行基于地理位置的查询操作。

  区别：与其他数据结构相比，GEO 具有独特的地理位置查询功能。你可以使用它来存储地理位置信息，并执行类似于查找附近的位置、计算两个位置之间的距离等操作。    
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加地理位置：GEOADD key longitude latitude member [longitude latitude member ...]
获取两个位置之间的距离：GEODIST key member1 member2 [unit]
获取指定范围内的地理位置：GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
获取指定成员附近的地理位置：GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>BitMap: 011010101110101011</p><pre><code>  定义：位图是 Redis 中表示位集合的数据结构，它将位（0 或 1）组织成一个连续的二进制序列。每个位都可以被设置或清除，通常用于记录某种状态或者标记。

  区别：位图主要用于记录布尔值信息或者某种状态的变化。它的优势在于可以高效地存储大量的布尔值，并且支持一系列位操作，如 AND、OR、NOT 等。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>设置位：SETBIT key offset value
获取位：GETBIT key offset
对位进行操作：BITOP operation destkey key [key ...]
统计位中被设置为 1 的数量：BITCOUNT key [start] [end]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HyperLog: 0110110101110101011</p><pre><code>  定义：HyperLogLog 是一种用于估计集合基数（即不重复元素的数量）的数据结构，它通过使用固定数量的位来表示输入数据的哈希值，并使用统计算法来估计不重复元素的数量。

  区别：HyperLogLog 允许你在极小的内存开销下估计非常大的集合基数，因此它适用于需要快速、低成本地估计大型数据集的基数的场景，例如统计网站的独立访客数量。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加元素：PFADD key element [element ...]
获取基数估计值：PFCOUNT key [key ...]
合并多个 HyperLogLog 结构：PFMERGE destkey sourcekey [sourcekey ...] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="redis之rdb" tabindex="-1"><a class="header-anchor" href="#redis之rdb" aria-hidden="true">#</a> Redis之RDB</h2><p>RDB全称“Redis Database”，在指定的时间间隔将内存中的数据快照存入磁盘，恢复时便是将硬盘中的快照信息读到内存中。</p><blockquote><p>备份创建过程</p></blockquote><p>Redis会单独创建(Fork)一个子进程来进行持久化，首先将数据写入到一个临时文件，等持久化这个过程结束后，再用临时文件替换上次持久化完成的文件。在整个过程中，主进程是不进行任何IO操作的。</p><blockquote><p>Fork</p></blockquote><p>“Fork”是复制一个和当前进程相同的进程，作为原进程的子进程。 出于安全考虑，Linux引入“<mark>写时复制技术</mark>” 一般情况下，主进程和子进程会共用同一块内存，只有进程空间的各段的内容要发生变化，才会将父进程的内容复制一份给子进程。</p>`,15),a=[s];function r(t,c){return i(),d("div",null,a)}const v=e(l,[["render",r],["__file","redis.html.vue"]]);export{v as default};
