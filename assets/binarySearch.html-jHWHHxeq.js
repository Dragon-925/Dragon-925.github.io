import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,d as t}from"./app-Rv3bV2ye.js";const p={},e=t(`<h1 id="《二分查找》" tabindex="-1"><a class="header-anchor" href="#《二分查找》" aria-hidden="true">#</a> 《二分查找》</h1><blockquote><p>算法描述：</p></blockquote><ul><li>二分查找也称折半查找，它是一种效率较高的查找方法，要求列表中的元素首先要 进行有序排列。</li><li>首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较， 如果两者相等，则查找成功；</li><li>否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于 查找关键字，则进一步查找前一子表，否则进一步查找后一子表。</li><li>重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止， 此时查找不成功。</li></ul><blockquote><p>代码实现</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> findVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&gt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> middleIndex <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>findVal <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>middleIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>left<span class="token punctuation">,</span>middleIndex<span class="token punctuation">,</span>findVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>findVal <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>middleIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>middleIndex<span class="token punctuation">,</span>right<span class="token punctuation">,</span>findVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> middleIndex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","binarySearch.html.vue"]]);export{k as default};
