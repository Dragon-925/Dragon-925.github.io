---
icon: pen-to-square
date: 2021-06-08
category:
  - Redis
tag:
  - 缓存
  - 中间件
---

# 《Redis》

        Redis，是一种以K,V形式存储并基于内存的非关系型数据库。
        
> 特征

+ 键值型，value支持不同数据结构

+ 单线程，每个命令具有原子特性

+ 低延迟、速度快（基于内存、IO多路复用）

+ 支持数据持久化

+ 支持主从集群、分片集群

`
I/O多路复用：使用特定的系统调用，同时监听多个I/O事件，并在其中至少有一个I/O事件就绪时通知应用程序
`

> 数据类型-基本类型

+ String: hello redis

        定义：字符串是 Redis 中最基本的数据结构之一，它是一个二进制安全的字符串，可以包含任何数据，例如文本、整数或二进制数据。
        区别：字符串是 Redis 中最简单的数据结构，你可以执行一些基本的操作，如设置和获取值、追加、获取子字符串等。

  ```
  设置值：SET key value
  获取值：GET key
  追加值：APPEND key value
  获取子字符串：GETRANGE key start end
  ```

+ Hash

        定义：哈希是一种键值对的集合，其中每个键都与一个值相关联。哈希适用于存储对象，并且可以在哈希对象中设置、获取和删除单个字段。
        区别：哈希结构允许你存储和检索与一个键相关联的多个字段，这使得哈希结构非常适合存储对象的属性。

  ```
  设置字段值：HSET key field value
  获取字段值：HGET key field
  获取所有字段值：HGETALL key
  删除字段：HDEL key field [field ...]
  ```

+ List

        定义：列表是一个有序的字符串集合，按照插入顺序存储。你可以在列表的两端执行插入和删除操作。
        区别：列表结构允许你按顺序存储多个元素，并且可以根据需要在列表的任一端添加或删除元素。这使得列表结构非常适合用作队列或栈。

  ```
  从左端插入元素：LPUSH key value [value ...]
  从右端插入元素：RPUSH key value [value ...]
  获取范围内的元素：LRANGE key start stop
  移除并返回左端的元素：LPOP key
  ```

+ Set

        定义：集合是一个无序的字符串集合，不允许重复的成员。你可以执行添加、删除和判断成员是否存在等操作。
        区别：集合结构允许你存储一组唯一的元素，并提供了快速的成员检查功能。这使得集合结构非常适合用于存储唯一值的场景。

  ```
  添加成员：SADD key member [member ...]
  移除成员：SREM key member [member ...]
  获取所有成员：SMEMBERS key
  判断成员是否存在：SISMEMBER key member
  ```

+ SortedSet

        定义：有序集合与集合类似，但每个成员都关联一个分数，根据分数对成员进行排序。你可以添加、删除、更新成员，并按分数范围或成员检索排名。
        区别：有序集合结构除了提供了集合的所有功能外，还允许你按照成员的分数进行排序和检索。这使得有序集合结构非常适合用于需要根据分数排序的场景，如排行榜等。

  ```
  添加成员：ZADD key score member [score member ...]
  移除成员：ZREM key member [member ...]
  获取指定范围内的成员：ZRANGE key start stop [WITHSCORES]
  根据分数范围获取成员数量：ZCOUNT key min max
  ```

> 数据类型-特殊类型

+ GEO

        定义：GEO 是 Redis 用于处理地理空间数据的数据结构，它可以存储地理位置（经度和纬度）与名称之间的映射关系，并支持执行基于地理位置的查询操作。

        区别：与其他数据结构相比，GEO 具有独特的地理位置查询功能。你可以使用它来存储地理位置信息，并执行类似于查找附近的位置、计算两个位置之间的距离等操作。    

  ```
  添加地理位置：GEOADD key longitude latitude member [longitude latitude member ...]
  获取两个位置之间的距离：GEODIST key member1 member2 [unit]
  获取指定范围内的地理位置：GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
  获取指定成员附近的地理位置：GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
  ```
+ BitMap: 011010101110101011

        定义：位图是 Redis 中表示位集合的数据结构，它将位（0 或 1）组织成一个连续的二进制序列。每个位都可以被设置或清除，通常用于记录某种状态或者标记。

        区别：位图主要用于记录布尔值信息或者某种状态的变化。它的优势在于可以高效地存储大量的布尔值，并且支持一系列位操作，如 AND、OR、NOT 等。

  ```
  设置位：SETBIT key offset value
  获取位：GETBIT key offset
  对位进行操作：BITOP operation destkey key [key ...]
  统计位中被设置为 1 的数量：BITCOUNT key [start] [end]
  ```

+ HyperLog: 0110110101110101011

        定义：HyperLogLog 是一种用于估计集合基数（即不重复元素的数量）的数据结构，它通过使用固定数量的位来表示输入数据的哈希值，并使用统计算法来估计不重复元素的数量。

        区别：HyperLogLog 允许你在极小的内存开销下估计非常大的集合基数，因此它适用于需要快速、低成本地估计大型数据集的基数的场景，例如统计网站的独立访客数量。

  ```
  添加元素：PFADD key element [element ...]
  获取基数估计值：PFCOUNT key [key ...]
  合并多个 HyperLogLog 结构：PFMERGE destkey sourcekey [sourcekey ...] 
  ```

## Redis之RDB

  RDB全称“Redis Database”，在指定的时间间隔将内存中的数据快照存入磁盘，恢复时便是将硬盘中的快照信息读到内存中。

  > 备份创建过程

Redis会单独创建(Fork)一个子进程来进行持久化，首先将数据写入到一个临时文件，等持久化这个过程结束后，再用临时文件替换上次持久化完成的文件。在整个过程中，主进程是不进行任何IO操作的。

> Fork

“Fork”是复制一个和当前进程相同的进程，作为原进程的子进程。
出于安全考虑，Linux引入“==写时复制技术==”
一般情况下，主进程和子进程会共用同一块内存，只有进程空间的各段的内容要发生变化，才会将父进程的内容复制一份给子进程。

> redis.conf

```bash
repl-disable-tcp-nodelay no
replica-priority 100
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

#注意修改这里的配置，yes开启持久化，no关闭持久化
appendonly yes

appendfilename "appendonly.aof"
appendfsync everysec # always:立即记录 ; everysec:先存入AOF缓冲区，每隔1s将缓冲区命令写入aof文件 ; no : 先存入缓冲区，由操作系统决定何时将内容写入磁盘
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100 # 比上次文件增长百分比 触发 bgrewriteaof
auto-aof-rewrite-min-size 64mb # 当文件体积达到 64mb执行
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
```