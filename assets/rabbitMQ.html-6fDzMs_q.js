import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as l,c as e,d as p}from"./app-hwzvE8Ik.js";const t={},o=p('<h1 id="《rabbitmq》" tabindex="-1"><a class="header-anchor" href="#《rabbitmq》" aria-hidden="true">#</a> 《RabbitMQ》</h1><h2 id="同步和异步" tabindex="-1"><a class="header-anchor" href="#同步和异步" aria-hidden="true">#</a> 同步和异步</h2><p>举个简单例子 同步通讯：打电话，实时通话 异步通讯：发短信，接收方和发送方不需要实时通讯</p><blockquote><p>同步通讯</p></blockquote><p>优点：实时性强</p><p>缺点：</p><ul><li>耦合度高</li><li>性能和吞吐能力下降</li><li>额外资源消耗</li><li>级联失败问题</li></ul><blockquote><p>异步通讯</p></blockquote><p>为了解决生产者和消费者的耦合性，中间会使用这个Broker，以此来解决耦合性。</p><p>Broker类似于一个数据总线，所有服务要接收数据和发送数据到这个总线上。</p><p>优点：</p><ul><li><p>吞吐量提升：无需等待订阅者处理完成，响应更快速</p></li><li><p>故障隔离：服务没有直接调用，不存在级联失败问题</p></li><li><p>调用间没有阻塞，不会造成无效的资源占用</p></li><li><p>耦合度极低，每个服务都可以灵活插拔，可替换</p></li><li><p>流量削峰：不管发布事件的流量波动多大，都由Broker接收，订阅者可以按照自己的速度去处理事件</p></li></ul><p>缺点：</p><ul><li>架构复杂了，业务没有明显的流程线，不好管理</li><li>需要依赖于Broker的可靠、安全、性能</li></ul><h2 id="rabbitmq的角色" tabindex="-1"><a class="header-anchor" href="#rabbitmq的角色" aria-hidden="true">#</a> RabbitMQ的角色</h2><ul><li>publisher：生产者</li><li>consumer：消费者</li><li>exchange个：交换机，负责消息路由</li><li>queue：队列，存储消息</li><li>virtualHost：虚拟主机，隔离不同租户的exchange、queue、消息的隔离</li></ul><h2 id="消息模型" tabindex="-1"><a class="header-anchor" href="#消息模型" aria-hidden="true">#</a> 消息模型</h2><blockquote><p>基本消息队列(BasicQueue)</p></blockquote><p>生产者-&gt;消息队列-&gt;消费者</p><blockquote><p>工作消息队列(WorkQueue)</p></blockquote><p>生产者 -&gt; 消息队列 -&gt;消费者1/消费者2</p><blockquote><p>发布订阅模型-广播</p></blockquote><p>生产者 -&gt; 交换机 -&gt; 消息队列 -&gt; 消费者</p><p>流程：</p><ol><li>拥有多个消费者</li><li>每个消费者拥有子的queue</li><li>每个队列都绑定了交换机</li><li>生产者发送消息只能到交换机，交换机来决定要发给哪个队列，生产者是无法决定的</li><li>交换机把消息发送到所有绑定的队列</li><li>实现了 一条消息被多个消费者消费</li></ol><blockquote><p>发布订阅模型-路由</p></blockquote><p>生产者 -&gt; 交换机(routing key) -&gt; (routing key)消息队列 -&gt; 消费者</p><p>【注意】 队列和交换机都要绑定一个指定的RoutingKey</p><p>消息发送方再向交换机发送消息的时候，也需要指定RoutingKey</p><p>交换机不再把消息交给每一个绑定的队列，而是根据RoutingKey 进行判断，只有队列的RoutingKey 与消息的RoutingKey完全一致，方可接收到消息</p><blockquote><p>发布订阅模型-通配符</p></blockquote><p>生产者 -&gt; 交换机 -&gt; 消息队列 -&gt; 消费者</p><p>Topics类型的交换机与路由相比，都是可以根据RoutingKey把消息路由到不同的队列。</p><p>不同的是Topic类型的交换机可以让队列在绑定RoutingKey的时候使用通配符</p><p>通配规则：</p><ul><li><p>&#39;#&#39; : 匹配一个或多个单词</p></li><li><p>&#39;*&#39; : 匹配一个单词</p></li></ul><p>举例：</p><ul><li><p>user.# : 能够匹配user.add 或者user.detail.add</p></li><li><p>user.* ：能够匹配user.add</p></li></ul>',38),u=[o];function a(r,c){return l(),e("div",null,u)}const d=i(t,[["render",a],["__file","rabbitMQ.html.vue"]]);export{d as default};
