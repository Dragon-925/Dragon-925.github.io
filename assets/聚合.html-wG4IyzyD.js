import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as e}from"./app-bMAld-iR.js";const t={},i=e(`<h1 id="《聚合》" tabindex="-1"><a class="header-anchor" href="#《聚合》" aria-hidden="true">#</a> 《聚合》</h1><blockquote><p>定义</p></blockquote><p>简单来说，“聚合”就是将数据统计、分析和运算</p><blockquote><p>种类</p></blockquote><p>聚合常见的种类有三种，分别是桶、度量、管道。</p><ol><li>桶(Bucket)：对文档进行分组</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TermAggregation：按照文档字段值分组，比如品牌分组
Date Histogram：按照日期阶梯分组，例如一周一组
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>度量(Metric)：计算值，比如平均、总和、最大值、最小值</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  Avg
  Max
  Min
  Stats：同时求Max、Min、Avg、Sum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>管道(pipeline)：其他聚合的结果为基础做聚合</li></ol><p>== 注意：== 参加聚合的字段必须是keyword、日期、数值、布尔类型</p><blockquote><p>DSL语法实现聚合</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /hotel/_search
{
    &quot;size&quot;:0 //值为0的情况，只能显示聚合结果，不包含文档的
    &quot;aggs&quot;:{ //定义聚合
        &quot;brandAgg&quot;:{ //自定义名字
            &quot;terms&quot;:{ //聚合类型
                &quot;field&quot;:&quot;brand&quot;, //参与聚合字段
                &quot;size&quot;:20 //获取结果数量
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>查询结果</em>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;took&quot; : 1,
  &quot;timed_out&quot; : false,
  &quot;_shards&quot; : {
    &quot;total&quot; : 1,
    &quot;successful&quot; : 1,
    &quot;skipped&quot; : 0,
    &quot;failed&quot; : 0
  },
  &quot;hits&quot; : {
    &quot;total&quot; : {
      &quot;value&quot; : 201,
      &quot;relation&quot; : &quot;eq&quot;
    },
    &quot;max_score&quot; : null,
    &quot;hits&quot; : [ ]
  },
  &quot;aggregations&quot; : {
    &quot;brandAgg&quot; : {
      &quot;doc_count_error_upper_bound&quot; : 0,
      &quot;sum_other_doc_count&quot; : 96,
      &quot;buckets&quot; : [
        {
          &quot;key&quot; : &quot;7天酒店&quot;,
          &quot;doc_count&quot; : 30
        },
        {
          &quot;key&quot; : &quot;如家&quot;,
          &quot;doc_count&quot; : 30
        },
        {
          &quot;key&quot; : &quot;皇冠假日&quot;,
          &quot;doc_count&quot; : 17
        },
        {
          &quot;key&quot; : &quot;速8&quot;,
          &quot;doc_count&quot; : 15
        },
        {
          &quot;key&quot; : &quot;万怡&quot;,
          &quot;doc_count&quot; : 13
        }
      ]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>聚合结果排序</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /hotel/_search
{
    &quot;size&quot;:0,
    &quot;aggs&quot;:{
        &quot;brandAgg&quot;:{
            &quot;terms&quot;:{
                &quot;field&quot;:&quot;brand&quot;,
                &quot;size&quot;:20,
                &quot;order&quot;:{
                    &quot;_count&quot;:&quot;asc&quot; //按照count升序排列
                }
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>限定聚合的范围</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /hotel/_search
{
    &quot;query&quot;:{
        &quot;range&quot;:{
            &quot;price&quot;:{
                &quot;lte&quot;:200
            }
        }
    },
    &quot;size&quot;:0,
    &quot;aggs&quot;:{
        &quot;brandAgg&quot;:{
            &quot;terms&quot;:{
                &quot;field&quot;:brand,
                &quot;order&quot;:{
                    &quot;_count&quot;:&quot;asc&quot;
                }
                &quot;size&quot;:20
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Metric聚合语法</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /hotel/_search
{
    &quot;size&quot;:0,
    &quot;aggs&quot;:{
        &quot;brandAgg&quot;:{
            &quot;terms&quot;:{
                &quot;field&quot;:&quot;brand&quot;,
                &quot;size&quot;:20
            },
            &quot;aggs&quot;:{
                &quot;score_stats&quot;: { //自定义名称
                    &quot;stats&quot;:{ //聚合类型(可以获取min、max、avg等结果)
                        &quot;field:&quot;score&quot; //聚合字段，score
                    }
                }
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用总结" tabindex="-1"><a class="header-anchor" href="#使用总结" aria-hidden="true">#</a> 使用总结</h2><p>aggs代表聚合，与query同级 聚合的三个必要：</p><ol><li>聚合名称</li><li>聚合类型</li><li>聚合字段</li></ol><p>聚合可以配置的属性：</p><ol><li>size：可显示聚合结果的数量</li><li>order：按照指定聚合结果排序</li><li>field：显示指定名称字段</li></ol><h2 id="restapi实现聚合" tabindex="-1"><a class="header-anchor" href="#restapi实现聚合" aria-hidden="true">#</a> RestAPI实现聚合</h2><ol><li>准备Request</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">SearchRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchRequest</span><span class="token punctuation">(</span><span class="token string">&quot;hotel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>Query</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>设置Size</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>request<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>聚合</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>request<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token class-name">AggregationBuilders</span>
                                 <span class="token punctuation">.</span><span class="token function">terms</span><span class="token punctuation">(</span><span class="token string">&quot;brandAgg&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">field</span><span class="token punctuation">(</span><span class="token string">&quot;brand&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                                <span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token class-name">AggregationBuilders</span>
                                 <span class="token punctuation">.</span><span class="token function">terms</span><span class="token punctuation">(</span><span class="token string">&quot;cityAgg&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">field</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                                <span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token class-name">AggregationBuilders</span>
                                 <span class="token punctuation">.</span><span class="token function">terms</span><span class="token punctuation">(</span><span class="token string">&quot;starAgg&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">field</span><span class="token punctuation">(</span><span class="token string">&quot;starName&quot;</span><span class="token punctuation">)</span>
                                 <span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                                <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>执行查询</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">SearchResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">RequestOptions</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6"><li>解析</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Aggregations</span> aggregations <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getAggregations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 4.1.根据品牌名称，获取品牌结果</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> brandList <span class="token operator">=</span> <span class="token function">getAggByName</span><span class="token punctuation">(</span>aggregations<span class="token punctuation">,</span> <span class="token string">&quot;brandAgg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;品牌&quot;</span><span class="token punctuation">,</span> brandList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.2.根据品牌名称，获取品牌结果</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> cityList <span class="token operator">=</span> <span class="token function">getAggByName</span><span class="token punctuation">(</span>aggregations<span class="token punctuation">,</span> <span class="token string">&quot;cityAgg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;城市&quot;</span><span class="token punctuation">,</span> cityList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.3.根据品牌名称，获取品牌结果</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> starList <span class="token operator">=</span> <span class="token function">getAggByName</span><span class="token punctuation">(</span>aggregations<span class="token punctuation">,</span> <span class="token string">&quot;starAgg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;星级&quot;</span><span class="token punctuation">,</span> starList<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getAggByName</span><span class="token punctuation">(</span><span class="token class-name">Aggregations</span> aggregations<span class="token punctuation">,</span> <span class="token class-name">String</span> aggName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 4.1.根据聚合名称获取聚合结果</span>
    <span class="token class-name">Terms</span> brandTerms <span class="token operator">=</span> aggregations<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>aggName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 4.2.获取buckets</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Terms<span class="token punctuation">.</span>Bucket</span><span class="token punctuation">&gt;</span></span> buckets <span class="token operator">=</span> brandTerms<span class="token punctuation">.</span><span class="token function">getBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 4.3.遍历</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> brandList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Terms<span class="token punctuation">.</span>Bucket</span> bucket <span class="token operator">:</span> buckets<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 4.4.获取key</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">getKeyAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        brandList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> brandList<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),l=[i];function o(u,c){return s(),a("div",null,l)}const r=n(t,[["render",o],["__file","聚合.html.vue"]]);export{r as default};
