import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as n,a as e}from"./app-oDkgwL5v.js";const u={},q=e(`<h1 id="《dsl文档操作》" tabindex="-1"><a class="header-anchor" href="#《dsl文档操作》" aria-hidden="true">#</a> 《DSL文档操作》</h1><pre><code>    在之前的初识中，已经简单的介绍了几个基本命令操作。在这个DSL文档操作中，会介绍如下几个功能：
    1. 查询全部Document
    2. 条件查询Document
    3. 高亮查询
    4. 排序查询
    5. 分页查询
    6. 区域查询【地理查询】
    7. 相关性算分
    8. 符合查询
</code></pre><h2 id="_1-查询全部document" tabindex="-1"><a class="header-anchor" href="#_1-查询全部document" aria-hidden="true">#</a> 1. 查询全部Document</h2><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;match_all&quot;:{

                    }
            }
    }
</code></pre><h2 id="_2-条件查询document" tabindex="-1"><a class="header-anchor" href="#_2-条件查询document" aria-hidden="true">#</a> 2. 条件查询Document</h2><blockquote><p>方式一【多字段】</p></blockquote><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;multi_match&quot;:{
                            query:&quot;condition_value&quot;,
                            &quot;fields&quot;:[&quot;field1&quot;,&quot;field2&quot;,...]
                    }
            }
    }
</code></pre><blockquote><p>方式二【单字段】</p></blockquote><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;match&quot;:{
                            &quot;all&quot;:&quot;condition_value&quot;
                    }
            }
    }
</code></pre><h2 id="_3-精确搜索" tabindex="-1"><a class="header-anchor" href="#_3-精确搜索" aria-hidden="true">#</a> 3. 精确搜索</h2><p>“精确搜索”，其实就是在query里面套了一个term</p><pre><code>    GET /hotel/_search
    {
            &quot;query&quot;: {
                    &quot;term&quot;: {
                            &quot;city&quot;: {
                                    &quot;value&quot;: &quot;北京&quot;
                            }
                    }
            }
    }
</code></pre><h2 id="_4-区域查询" tabindex="-1"><a class="header-anchor" href="#_4-区域查询" aria-hidden="true">#</a> 4. 区域查询</h2><blockquote><p>矩形搜索</p></blockquote><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;geo_bounding_box&quot;:{
                            &quot;FIELD&quot;:{
                                    &quot;top_left&quot;:{
                                            &quot;lat&quot;:31.1,
                                            &quot;lon&quot;:121.5
                                    },
                                    &quot;bottome_right&quot;:{
                                            &quot;lat&quot;:30.9
                                    }
                            }
                    }
            }
    }
</code></pre><p>这里搜索就是一个矩形</p><blockquote><p>圆形搜索</p></blockquote><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;geo_distance&quot;:{
                            &quot;distance&quot;:&quot;15km&quot;,
                            &quot;location&quot;:&quot;31.21,121.5&quot;
                    }
            }
    }
</code></pre><p>这个是 地域搜索的推荐方式</p><h2 id="_5-范围搜索" tabindex="-1"><a class="header-anchor" href="#_5-范围搜索" aria-hidden="true">#</a> 5. 范围搜索</h2><pre><code>    GET /index_name/_search
    {
            &quot;query&quot;:{
                    &quot;range&quot;:{
                            &quot;price&quot;:{
                                    &quot;gte&quot;:100,
                                    &quot;lte&quot;:200
                            }
                    }
            }
    }
</code></pre><p>搜索的是价格从100-200的信息</p><h2 id="_6-打分" tabindex="-1"><a class="header-anchor" href="#_6-打分" aria-hidden="true">#</a> 6. 打分</h2><pre><code>    GET /hotel/_search
    {
            &quot;query&quot;: {
                    &quot;function_score&quot;: {
                            &quot;query&quot;: {
                                    &quot;match&quot;: {
                                            &quot;all&quot;: &quot;外滩&quot;
                                    }
                            },
                            &quot;functions&quot;: [
                                    {
                                    &quot;filter&quot;:{
                                    &quot;term&quot;:{
                                    &quot;brand&quot;:&quot;如家&quot;
                                    }
                            },
                            &quot;weight&quot;:200
                                    }
                            ],
                            &quot;boost_mode&quot;:&quot;sum&quot;
                    }
            }
    }
</code></pre><h2 id="_7-bool-条件查询" tabindex="-1"><a class="header-anchor" href="#_7-bool-条件查询" aria-hidden="true">#</a> 7. bool 条件查询</h2><ul><li><p>must：必须匹配每个子查询，类似“与”</p></li><li><p>should：选择性匹配子查询，类似“或”</p></li><li><p>must_not：必须不匹配，<strong>不参与算分</strong>，类似“非”</p></li><li><p>filter：必须匹配，<strong>不参与算分</strong></p><pre><code>  GET /hotel/_search
  {
          &quot;query&quot;: {
                  &quot;bool&quot;: {
                          &quot;must&quot;: [
                                  {
                                          &quot;term&quot;: {
                                          &quot;city&quot;:&quot;上海&quot;
                                          }
                                  }
                          ]
                  }
          },
          &quot;highlight&quot;: {
                  &quot;fields&quot;: {
                          &quot;name&quot;: {
                                  &quot;require_field_match&quot;: &quot;true&quot;
                          }
                  }
          }
  }
</code></pre></li></ul><h2 id="_8-高亮" tabindex="-1"><a class="header-anchor" href="#_8-高亮" aria-hidden="true">#</a> 8. 高亮</h2><p><strong>注意：</strong></p><ul><li>高亮是对关键字高亮，因此<strong>搜索条件必须带有关键字</strong>，而不能是范围这样的查询。</li><li>默认情况下，<strong>高亮的字段，必须与搜索指定的字段一致</strong>，否则无法高亮</li><li>如果要对非搜索字段高亮，则需要添加一个属性：<code>required_field_match=false</code></li></ul><h2 id="_9-分页" tabindex="-1"><a class="header-anchor" href="#_9-分页" aria-hidden="true">#</a> 9. 分页</h2><pre><code>    GET /hotel/_search
    {
            &quot;query&quot;: {
                    &quot;match_all&quot;: {}
            },
            &quot;from&quot;: 0,
            &quot;size&quot;: 10
    }
</code></pre>`,31),r=[q];function a(d,c){return t(),n("div",null,r)}const l=o(u,[["render",a],["__file","DSL文档操作.html.vue"]]);export{l as default};
