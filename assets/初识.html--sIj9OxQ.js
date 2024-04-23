import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,a as d}from"./app-r3yqy_Ze.js";const s={},l=d(`<h1 id="《初识》" tabindex="-1"><a class="header-anchor" href="#《初识》" aria-hidden="true">#</a> 《初识》</h1><blockquote><p>基本概念</p></blockquote><p>与MySQL对比： 数据库----索引（名词对应数据库，动词对应数据库中的保存） 表-----类型 行-----文档 列-----属性</p><blockquote><p>什么是倒排索引？</p></blockquote><p>说到倒排索引，要先说到正向索引。 什么是正向索引？ 其实正向索引很简单，比如MySQL中的user表，我们为其每行数据添加主键ID， 当我们查找ID为100的数据，我们只需要找到ID为100的那一行，再根据100来查看这一行数据中的列值即可。这就是正向索引！ 注意：此处并不是从id为1的数据依次对比到100的！ 这里引入了数据结构中的B+树，在数据库中，如果创建了索引那么就会产生一棵B+树，再根据二分法去比较我们需要查找的值。 这样的检索速度就比依次对比快很多。 最终会在我们的叶子节点中获取到我们想要的内容。 在这里就需要抛出聚簇索引和非聚簇索引 1.聚簇索引：叶子节点上存储的是我们需要的信息</p><pre><code>        2.非聚簇索引：叶子节点存储的是我们需要的信息的指针内容，然后再根据指针去定位到我们需要的内容

    注释：如果MySQL使用的引擎是InnoDB,那么默认这个数据库的索引结构就是B+树，在没有创建索引也是！

    几个正向索引的小栗子：
        聚集索引可以类比一本有序的电话号码簿。在电话号码簿中，人们按照姓氏的首字母顺序排序，并将每个人的详细信息与其电话号码一起记录。这样，当你想要找到某个人的电话号码时，只需要按照姓氏的首字母来查找，很容易找到对应的电话号码。
    在数据库中，聚集索引的工作原理类似于电话号码簿。它按照指定的列的顺序来存储数据行，并将每个数据行的值和物理位置进行映射。这样，当你执行查询时，数据库可以更快地找到相关的数据行，因为它们在磁盘上是按照聚集索引的顺序排列的。
    举个例子，假设你有一个存储学生信息的数据库表，其中的聚集索引是按照学生的学号排序。当你根据学号查询某个学生的信息时，数据库可以直接使用聚集索引定位到该学生的数据行，而不需要扫描整个表。这就像你在电话号码簿中根据姓氏的首字母找到相应电话号码一样简单。
    总的来说，聚集索引是一种有序存储数据的方式，它提供了快速定位和访问数据行的能力，适用于经常根据特定列进行查询的情况。

        在聚集索引中，B+树的叶子节点存储了完整的数据行，而非仅存储索引列的值。这使得数据库可以直接通过B+树的索引来定位到对应的数据行，而无需再次访问磁盘。
    举个例子，假设有一个学生表，按照学号建立了聚集索引。聚集索引的B+树会根据学号的顺序进行组织，并在叶子节点存储了每个学生的完整信息。当你根据学号查询某个学生时，数据库可以通过B+树的索引结构直接找到该学生的数据行。
    需要注意的是，B+树的叶子节点是按照聚集索引的顺序存储的，而非整个表的顺序。这意味着，即使没有使用聚集索引进行查询，数据库仍然可以利用B+树的索引结构来提高性能，因为相邻的数据行通常也具有相关性。
    总结：聚集索引通常使用B+树数据结构来实现，它可以直接通过B+树的索引定位到特定键值对应的数据行，提供快速的查询性能。

        非聚集索引是指基于数据库表中的其他列（而非主键）创建的索引。它们与聚集索引不同，非聚集索引的叶子节点并不存储完整的数据行，而是存储索引列的值和指向对应数据行的指针。
    在非聚集索引中，B+树的结构与聚集索引类似，但叶子节点存储的是索引列的值和指针，而非完整的数据行。当执行查询时，数据库可以通过非聚集索引的B+树定位到索引列的值，然后再根据指针找到相应的数据行。
    举个例子，假设有一个学生表，并在姓名列上创建了非聚集索引。非聚集索引的B+树会按照姓名的顺序进行组织，在叶子节点存储了每个学生的姓名和指向对应数据行的指针。当你根据姓名查询某个学生时，数据库可以通过非聚集索引的B+树先定位到对应的姓名值，然后再通过指针找到相应的数据行。
    总结：非聚集索引通常也使用B+树数据结构来实现，它通过B+树的索引定位到索引列的值，然后再通过指针找到对应的数据行。这种索引结构可以提高非聚集索引查询的性能。

        select * from table where name = &#39;张三&#39;,这是不是非聚集索引呢？
    对于这个查询语句，如果在表中创建了名为&quot;name&quot;的非聚集索引，并且该索引是基于&quot;name&quot;列创建的，那么这个查询将使用非聚集索引来提高查询性能。
    当执行这个查询时，数据库会通过非聚集索引的B+树定位到索引列&quot;name&quot;上值为&quot;张三&quot;的记录，然后再通过指针找到对应的数据行。由于非聚集索引存储了索引列的值和指向数据行的指针，可以直接使用非聚集索引进行查询，而无需扫描整个表。
    需要注意的是，如果表中没有创建&quot;name&quot;列的非聚集索引，或者索引不包含该具体查询条件，那么数据库可能会选择其他索引或者全表扫描来执行查询。
    总结：如果在表中创建了基于&quot;name&quot;列的非聚集索引，并且该索引包含该具体查询条件，那么这个查询语句将使用非聚集索引来提高查询性能。非聚集索引可以通过索引定位到指定的记录，而无需扫描整个表。
</code></pre><p>正题来了！！！ 倒排索引：就是按照分完的词汇进行查找包含这个词汇的文档</p><pre><code>举个例子：
    比如，我要去北京的清华大学看一看：1、2、3、4、5
         我要去北京：1、2
         看一看清华大学：5、3、4
        分词：我（1）、北京（2）、清华（3）、大学（4）、看一看（5）

        如果我输入的关键词包含“我”：那么倒排索引到的就是包含1的句子，如果包含多个那就是多条句子。
</code></pre><blockquote><p>创建索引和映射</p></blockquote><p>这里映射，个人理解为 创建表结构</p><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code>PUT /select_dsl
{
  &quot;mappings&quot;:{
    &quot;properties&quot;:{
      &quot;age&quot;:{
        &quot;type&quot;:&quot;integer&quot;,
        &quot;index&quot;:true
      },
      &quot;weight&quot;:{
        &quot;type&quot;:&quot;float&quot;,
        &quot;index&quot;:true
      },
      &quot;isMarried&quot;:{
        &quot;type&quot;:&quot;boolean&quot;,
        &quot;index&quot;:true
      },
      &quot;info&quot;:{
        &quot;type&quot;:&quot;text&quot;,
        &quot;index&quot;:true,
        &quot;analyzer&quot;:&quot;ik_smart&quot;
      },
      &quot;email&quot;:{
        &quot;type&quot;:&quot;keyword&quot;,
        &quot;index&quot;:false
      },
      &quot;score&quot;:{
        &quot;type&quot;:&quot;float&quot;,
        &quot;index&quot;:true
      },
      &quot;name&quot;:{
        &quot;type&quot;:&quot;object&quot;,
        &quot;properties&quot;:{
          &quot;firstName&quot;:{
          &quot;type&quot;:&quot;keyword&quot;,
          &quot;index&quot;:true
          },
          &quot;lastName&quot;:{
            &quot;type&quot;:&quot;keyword&quot;,
            &quot;index&quot;:true
          }
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>添加属性字段【添加数据又称“文档操作”，映射创建】</p></blockquote><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code>PUT /select_dsl/_mapping
{
  &quot;properties&quot;:{
    &quot;video&quot;:{
      &quot;type&quot;:&quot;text&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>查询映射</p></blockquote><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code>GET /select_dsl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>添加数据</p></blockquote><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code>POST /select_dsl/_doc/1001
{
  &quot;age&quot;:25,
  &quot;email&quot;:&quot;dragon.zbl@qq.com&quot;,
  &quot;info&quot;:&quot;认真学习Elasticsearch&quot;,
  &quot;isMarried&quot;:false,
  &quot;name&quot;:{
    &quot;firstName&quot;:&quot;Dragon&quot;,
    &quot;lastName&quot;:&quot;Dawson&quot;
  },
  &quot;score&quot;:50.0,
  &quot;weight&quot;:51
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>查询数据</p></blockquote><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code># 查询数据
GET /select_dsl/_doc/1001

# 修改文档有两种，一种是在原有的基础上修改又称“增量修改”，一种是将原来的索引文档全部覆盖又称“全量修改”

# PUT方法，就是全量修改，相当于将原有的文档DELETE，然后再新增
# POST方法，是增量修改，相当于只修改匹配到文档中的部分字段

# 增量修改 -例子 - 一定要注意！！！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>修改案例</p></blockquote><div class="language-dsl line-numbers-mode" data-ext="dsl"><pre class="language-dsl"><code>
POST /select_dsl/_update/1001
{
  &quot;doc&quot;: {
    &quot;score&quot;:45.0
  }
}

# _update  是增量修改的必要字段
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),u=[l];function t(o,a){return n(),i("div",null,u)}const c=e(s,[["render",t],["__file","初识.html.vue"]]);export{c as default};
