---
icon: pen-to-square
date: 2019-12-18
category:
        - Java
        - 集合
tag:
        - HashMap
---

# 《HashMap》

<img src="https://image-static.segmentfault.com/285/324/2853246388-60152288ac568"></img>

- HashMap 继承了 AbstractMap 抽象类，而 AbstractMap 实现了 Map 接口，是一个 K,V 存储方式，允许 nullKey nullValue

- 在 JDK8 中，底层实现方式是数组+链表或红黑树,在默认情况下创建 HashMap 它的 size 为 16，负载因子默认为 0.75，当链表长度大于 8，并且数组长度大于 64 时，链表转为红黑树。当链表长度小于等于 6 时，转为链表
  数组扩容机制，是根据负载因子计算的，当动态数组存储数量>=负载因子 \* size 则进行翻倍扩容

- 如何解决 hash 碰撞：也就是刚才说的链表或红黑树，每一个数组位置都相当于一个 bucket，每个 bucket 都会存储多个 Node 节点，而这个 Node 又实现了 Entry,这个类都是 HashMap 的内部类，他们的类中都包含了，
  hash 值、key 值、value 值、next 节点，如果出现 hash 碰撞我们会在同一个 bucket 中存储多个 Node

- 如何 get 到 HashMap 的一个 key，首先我们会根据 key 值计算出一个 hash 位置，找到对应的 bucket，接着我们根据 key 来遍历该 bucket 中的链表或红黑树，直到找到相应的 Node 并返回
