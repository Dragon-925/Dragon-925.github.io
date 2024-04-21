import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-bMAld-iR.js";const p={},t=e(`<h1 id="《设计模式》" tabindex="-1"><a class="header-anchor" href="#《设计模式》" aria-hidden="true">#</a> 《设计模式》</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><ul><li><p>设计模式是软件开发人员在软件开发过程中面临复杂度问题的一般问题的解决方案</p></li><li><p>设计模式（Design pattern）是重构解决方案不是开发的解决方案</p></li><li><p>设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结</p></li><li><p>使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性</p></li><li><p>毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样</p></li><li><p>项目中合理地运用设计模式可以完美地解决很多问题，每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，这也是设计模式能被广泛应用的原因</p></li></ul><h2 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h2><pre><code>    控制对象的实例化,有些情况下，我们希望限制一个类只能拥有一个实例，以确保一些特定的约束条件得到满足。单例模式提供了一种简洁的方式来实现这种控制。
</code></pre><p>单例模式分为<mark>懒汉模式</mark>和<mark>饿汉模式</mark>两种</p><blockquote><p>懒汉模式</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LazySingle</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">LazySingle</span> lazySingle<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">LazySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>

        <span class="token comment">// 非线程安全</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LazySingle</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>lazySingle <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        lazySingle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LazySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> lazySingle<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 线程安全</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">LazySingle</span> <span class="token function">getSafeInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>lazySingle <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        lazySingle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LazySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> lazySingle<span class="token punctuation">;</span>        
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>饿汉模式-非线程安全</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HungrySingle</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">HungrySingle</span> hungrySingle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HungrySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">HUngrySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HungrySingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> hungrySingle<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>饿汉模式-线程安全</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HungrySafeSingle</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token class-name">HungrySafeSingle</span> hungrySafeSingle<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">HungrySafeSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HungrySafeSingle</span> <span class="token function">hungrySafeSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>hungrySafeSingle <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 第一次检查，避免不必要的同步</span>
			<span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">HungrySafeSingle</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span>hungrySafeSingle <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 第二次检查，确保只创建一个实例</span>
					hungrySafeSingle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HUngrySafeSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> hungrySafeSingle<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方式为双检锁/双重校验锁（DCL，即 double-checked locking）</p><pre><code>这种方式采用双锁机制，安全且在多线程情况下能保持高性能getInstance()的性能对应用程序很关键
</code></pre><blockquote><p>饿汉模式-线程安全-登记式/静态内部类方式</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HungrySafeSingle</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">HungrySafeSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

	<span class="token punctuation">}</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingleHolder</span><span class="token punctuation">{</span>
		<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">HungrySafeSingle</span> <span class="token constant">INSTANCE</span><span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HungrySafeSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">HungrySafeSingle</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">SingleHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式使用了 lazy loading方式，使得只有在使用时，才进行创建</p><blockquote><p>饿汉模式-线程安全-枚举方式</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">HungrySafeSingle</span><span class="token punctuation">{</span>
	<span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法，拥有延迟加载特性还防止了反序列化，同时不能通过 reflection attack 来调用私有构造方法，缺点是可读性差，不存在抽象层，扩展有很大的困难</p>`,20),l=[t];function c(i,o){return s(),a("div",null,l)}const k=n(p,[["render",c],["__file","designPattern.html.vue"]]);export{k as default};
