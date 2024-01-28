const e=JSON.parse('{"key":"v-08400ab0","path":"/operation/git.html","title":"《Git》","lang":"zh-CN","frontmatter":{"icon":"/icons/git.svg","date":"2020-03-15T00:00:00.000Z","category":["分布式版本管理工具","git"],"tag":["git"]},"headers":[{"level":3,"title":"查看本地分支","slug":"查看本地分支","link":"#查看本地分支","children":[]},{"level":3,"title":"创建新分支","slug":"创建新分支","link":"#创建新分支","children":[]},{"level":3,"title":"切换分支","slug":"切换分支","link":"#切换分支","children":[]},{"level":3,"title":"创建远程分支","slug":"创建远程分支","link":"#创建远程分支","children":[]},{"level":3,"title":"从主分支更新当前分支内容","slug":"从主分支更新当前分支内容","link":"#从主分支更新当前分支内容","children":[]},{"level":3,"title":"删除分支","slug":"删除分支","link":"#删除分支","children":[]},{"level":3,"title":"日志","slug":"日志","link":"#日志","children":[]},{"level":3,"title":"回滚","slug":"回滚","link":"#回滚","children":[]},{"level":3,"title":"备份回滚","slug":"备份回滚","link":"#备份回滚","children":[]},{"level":3,"title":"操作回溯","slug":"操作回溯","link":"#操作回溯","children":[]}],"git":{"createdTime":1706462412000,"updatedTime":1706462412000,"contributors":[{"name":"itsni","email":"dragon.zbl@qq.com","commits":1}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"operation/git.md","localizedDate":"2020年3月15日","excerpt":"<h1> 《Git》</h1>\\n<h3> 查看本地分支</h3>\\n<p><code>git branch</code></p>\\n<h3> 创建新分支</h3>\\n<p><code>git branch ${branch_name}</code></p>\\n<h3> 切换分支</h3>\\n<p><code>git checkout ${branch_name}</code></p>\\n<h3> 创建远程分支</h3>\\n<p><code>git push -u origin ${branch_name}</code></p>\\n<p>将 &lt;branch_name&gt; 分支的代码推送到 origin 远程仓库中。\\n如果 origin 远程仓库中不存在同名分支，则在 origin 中创建一个新的同名分支。\\n建立本地分支 &lt;branch_name&gt; 与远程分支 origin/&lt;branch_name&gt; 之间的跟踪关系。这意味着，在以后的推送和拉取操作中，Git 会自动将本地分支与远程分支同步，从而方便你进行协作开发。\\n-u 参数是 --set-upstream 的简写形式，它告诉 Git 将本地分支与远程分支建立跟踪关系。一旦建立了跟踪关系，你就可以使用 git pull 或 git push 命令来自动拉取或推送与远程分支同步的代码。\\n总之，git push -u origin &lt;branch_name&gt; 命令是将本地分支的代码推送到远程仓库，并建立分支之间的跟踪关系的缩写形式。</p>"}');export{e as data};
