import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,d as t}from"./app-XpAOohZN.js";const e={},p=t(`<h1 id="《metaobjecthandler的使用》" tabindex="-1"><a class="header-anchor" href="#《metaobjecthandler的使用》" aria-hidden="true">#</a> 《MetaObjectHandler的使用》</h1><blockquote><p>问题出现</p></blockquote><p>使用mybatis-plus多次进行保存修改基础字段，使得代码冗余度高</p><blockquote><p>问题分析</p></blockquote><p><code>MetaObjectHandler</code> 是 MyBatis-Plus 框架提供的一个接口，用于处理实体对象的公共字段自动填充功能。通过实现 <code>MetaObjectHandler</code> 接口，你可以在插入或更新操作时自动填充一些公共字段，比如创建时间、更新时间、创建人、更新人等。这样可以减少重复的代码编写，提高开发效率。</p><blockquote><p>问题解决</p></blockquote><ol><li><p>引入mybatis-plus依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>{mybatis-plus-version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建一个组件实现<em><strong>MetaObjectHandler</strong></em>接口并被<em><strong>spring</strong></em>托管</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyMetaObjectHandler</span> <span class="token keyword">implements</span> <span class="token class-name">MetaObjectHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insertFill</span><span class="token punctuation">(</span><span class="token class-name">MetaObject</span> metaObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">strictInsertFill</span><span class="token punctuation">(</span>metaObject<span class="token punctuation">,</span> <span class="token string">&quot;createTime&quot;</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 还可以填充其他字段，比如创建人等</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateFill</span><span class="token punctuation">(</span><span class="token class-name">MetaObject</span> metaObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">strictUpdateFill</span><span class="token punctuation">(</span>metaObject<span class="token punctuation">,</span> <span class="token string">&quot;updateTime&quot;</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 还可以填充其他字段，比如更新人等</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【实体类】</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableField</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">FieldFill</span></span><span class="token punctuation">;</span>

<span class="token comment">//表示插入时调用insertFill()填充create_time字段</span>
<span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;create_time&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>注意：如果你在使用MyBatis-Plus 3.x版本时，确实不需要使用<code>@TableField(fill = FieldFill.INSERT, value = &quot;create_time&quot;)</code>这样的注解来实现自动填充字段。</mark></p></li></ol>`,7),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","MetaObjectHandler.html.vue"]]);export{d as default};