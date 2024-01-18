import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as r,c as e,f as a}from"./app-581uZDMM.js";const i={},o=a('<h1 id="《spring-事务隔离级别》" tabindex="-1"><a class="header-anchor" href="#《spring-事务隔离级别》" aria-hidden="true">#</a> 《Spring 事务隔离级别》</h1><blockquote><p>Spring 事务隔离级别共有 5 种</p></blockquote><ol><li><p>事务默认隔离级别</p><p><mark>根据不同的情况设置隔离级别</mark></p></li><li><p>读取未提交的数据变更</p><p><mark>可能导致脏读、幻读、不可重复读</mark></p></li><li><p>允许读取并发事务已提交的数据</p><p><mark>可阻止脏读，但是可能导致幻读、不可重复读</mark></p></li><li><p>重复读取相同数据，保证当前事务中多次读取的数据一致</p><p><mark>可阻止脏读、不可重复读，但幻读依旧可能发生</mark></p></li><li><p>保证所有并发事务按照顺序依次执行</p><p><mark>最高隔离级别（完全服从 ACID 的隔离级别），但是影响并发性能</mark></p></li></ol><blockquote><p>名词解释</p></blockquote><p>**脏读：**A 事务和 B 事务在并发中，A 提交了数据，B 读取了 A 提交的数据，但是 A 事务做了回滚，B 事务读到的数据就是脏数据。</p><p>**幻读：**在并发情况下，A 事务第一次读取数据，B 事务同时在插入数据。A 事务第二次读取数据读到了 B 事务提交的数据，导致两次读取到的数据不一致。A 事务出现了幻读情况。</p><p>**不可重复读：**在并发情况下，A 事务读取数据的同时，B 事务对数据做修改或删除，A 事务第二次读取数据，出现了和第一次读到的数据不一致，这种情况就是不可重复读。</p>',7),t=[o];function l(c,n){return r(),e("div",null,t)}const s=p(i,[["render",l],["__file","Spring事务隔离级别.html.vue"]]);export{s as default};
