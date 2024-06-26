---
icon: pen-to-square
date: 2022-04-08
category:
  - 消息队列
tag:
  - framework
  - rabbitMQ
---

# 《RabbitMQ》

## 同步和异步

举个简单例子
同步通讯：打电话，实时通话
异步通讯：发短信，接收方和发送方不需要实时通讯

> 同步通讯

优点：实时性强

缺点：

+ 耦合度高
+ 性能和吞吐能力下降
+ 额外资源消耗
+ 级联失败问题

> 异步通讯

为了解决生产者和消费者的耦合性，中间会使用这个Broker，以此来解决耦合性。

Broker类似于一个数据总线，所有服务要接收数据和发送数据到这个总线上。

优点：

- 吞吐量提升：无需等待订阅者处理完成，响应更快速

- 故障隔离：服务没有直接调用，不存在级联失败问题
- 调用间没有阻塞，不会造成无效的资源占用
- 耦合度极低，每个服务都可以灵活插拔，可替换
- 流量削峰：不管发布事件的流量波动多大，都由Broker接收，订阅者可以按照自己的速度去处理事件

缺点：

- 架构复杂了，业务没有明显的流程线，不好管理
- 需要依赖于Broker的可靠、安全、性能

## RabbitMQ的角色

- publisher：生产者
- consumer：消费者
- exchange个：交换机，负责消息路由
- queue：队列，存储消息
- virtualHost：虚拟主机，隔离不同租户的exchange、queue、消息的隔离

## 消息模型

> 基本消息队列(BasicQueue)

生产者->消息队列->消费者

> 工作消息队列(WorkQueue)

生产者 -> 消息队列 ->消费者1/消费者2

> 发布订阅模型-广播

生产者 -> 交换机 -> 消息队列 -> 消费者

流程：

1. 拥有多个消费者
2. 每个消费者拥有子的queue
3. 每个队列都绑定了交换机
4. 生产者发送消息只能到交换机，交换机来决定要发给哪个队列，生产者是无法决定的
5. 交换机把消息发送到所有绑定的队列
6. 实现了 一条消息被多个消费者消费

> 发布订阅模型-路由

生产者 -> 交换机(routing key) -> (routing key)消息队列 -> 消费者

【注意】 队列和交换机都要绑定一个指定的RoutingKey

消息发送方再向交换机发送消息的时候，也需要指定RoutingKey

交换机不再把消息交给每一个绑定的队列，而是根据RoutingKey 进行判断，只有队列的RoutingKey 与消息的RoutingKey完全一致，方可接收到消息

> 发布订阅模型-通配符

生产者 -> 交换机 -> 消息队列 -> 消费者

Topics类型的交换机与路由相比，都是可以根据RoutingKey把消息路由到不同的队列。

不同的是Topic类型的交换机可以让队列在绑定RoutingKey的时候使用通配符

通配规则：

+ '#' : 匹配一个或多个单词

+ '*' : 匹配一个单词

举例：

+ user.# : 能够匹配user.add 或者user.detail.add

+ user.* ：能够匹配user.add