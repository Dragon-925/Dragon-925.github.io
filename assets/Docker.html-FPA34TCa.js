import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as a,a as s}from"./app-HXmC235x.js";const i={},d=s(`<h1 id="《docker》" tabindex="-1"><a class="header-anchor" href="#《docker》" aria-hidden="true">#</a> 《Docker》</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Docker是一个开源的应用容器引擎。而容器是一种轻量级的虚拟化技术 ，它是一个由应用运行环境、容器基础镜像组成的集合。</p><blockquote><p>容器和虚拟机的区别</p></blockquote><p><strong>在启动速度上</strong>，容器相对虚拟机会更快。虚拟机是一个重量级的操作系统，容器是轻量级的，<mark>容器不需要完整的操作系统，而是共享主机操作系统的内核</mark>。容器只包含应用程序及其运行所需的依赖文件和库文件，以及操作系统的基础文件，例如共享的系统内核和系统工具。因此，<mark>相比虚拟机，容器的尺寸更小，占用的资源更少</mark>。</p><p><strong>运行性能</strong>，由于<mark>虚拟机增加了虚拟化层用于虚拟化硬件</mark>，势必会增加一定的开销，所以运行性能有所损失；而容器是直接运行在物理操作系统上的，他本身与系统上其他进程并没有太大区别，所以运行性能是接近原生的。</p><p><strong>磁盘占用</strong>，虚拟机是一个完整的操作系统，是 GB 级别的，而容器只包含了一些系统启动的必要组件和程序依赖，是 MB 级别的。</p><p><strong>隔离性</strong>，虚拟机是一个完整的操作系统级别的隔离，要比容器好很多；<mark>容器是进程级别的隔离，隔离的不彻底，因为多个容器之间使用的是同一个宿主机的操作系统内核</mark>。</p><p><strong>封装速度</strong>，虚拟机封装会包含操作系统，封装速度比较慢，<mark>容器只封装操作系统的基础文件和库文件、应用程序、依赖，封装速度较快</mark>。</p><h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> Docker安装</h2><p>安装必要的软件包：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令安装了一些必要的软件包，包括 yum-utils、device-mapper-persistent-data 和 lvm2。这些软件包是 Docker 的依赖项。</p><p>添加 Docker 仓库：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令添加了 Docker 的官方 YUM 仓库，并指定了阿里云的镜像源。</p><p>更新 YUM 缓存：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum makecache fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令用于快速更新 YUM 缓存，以便新添加的仓库信息生效。</p><p>安装 Docker：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令通过 YUM 安装 Docker 社区版 (docker-ce)。</p><p>配置 Docker 镜像加速器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://j6o4qczl.mirror.aliyuncs.com&quot;]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分命令创建了 Docker 的配置文件目录 /etc/docker，然后使用 tee 命令向 /etc/docker/daemon.json 文件写入配置内容。配置内容指定了一个镜像加速器地址，这里使用的是阿里云的 Docker 镜像加速器。</p><p>重新加载 systemd 守护进程配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令重新加载 systemd 守护进程的配置，以使 Docker 配置的改变生效。</p><p>启用 Docker 服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令设置 Docker 服务在系统启动时自动启动。</p><p>重启 Docker 服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行命令重启 Docker 服务，以应用配置的改变。</p><h2 id="docker-启动容器" tabindex="-1"><a class="header-anchor" href="#docker-启动容器" aria-hidden="true">#</a> Docker 启动容器</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nginx_test  nginx

注释：
<span class="token parameter variable">-d</span>					<span class="token comment">#后台运行</span>
<span class="token parameter variable">--name</span>			<span class="token comment">#自定义容器名称</span>
nginx				<span class="token comment">#容器镜像</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>进入容器查看服务</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> nginx_test <span class="token function">bash</span>

注释：
<span class="token parameter variable">-it</span>		<span class="token comment">#打开终端交互（进入容器操作）</span>
nginx_test	<span class="token comment">#容器名称</span>
<span class="token function">bash</span>	<span class="token comment">#执行容器使用的 shell, bash 或 sh。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="端口映射" tabindex="-1"><a class="header-anchor" href="#端口映射" aria-hidden="true">#</a> 端口映射</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nginx_test <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 nginx

注释：
<span class="token parameter variable">-p</span> <span class="token number">8080</span>:80	<span class="token comment"># 8080 代表宿主机端口，80 代表容器端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 本机ip</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">hostname</span> <span class="token parameter variable">-I</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试是否映射成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> 【ip】:【port】
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据卷的挂载" tabindex="-1"><a class="header-anchor" href="#数据卷的挂载" aria-hidden="true">#</a> 数据卷的挂载</h2><p>很多时候在进入 容器内部时没有vi/vim命令这一说，无法更改内部文件，所以使用挂载数据卷</p><p>首先创建运行容器，这里以nginx为例</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker run -it -d -p 8080:80 --name nginx_dev nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在宿主机创建对应的文件夹</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/docker/nginx/conf
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/docker/nginx/logs
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/docker/nginx/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着将nginx容器内部文件拷贝到宿主机的指定目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@centos102 nginx<span class="token punctuation">]</span><span class="token comment"># docker cp nginx_dev:/etc/nginx/nginx.conf /home/docker/nginx/conf/nginx.conf</span>
                                               Successfully copied <span class="token number">2</span>.56kB to /home/docker/nginx/conf/nginx.conf

<span class="token punctuation">[</span>root@centos102 nginx<span class="token punctuation">]</span><span class="token comment"># docker cp nginx_dev:/etc/nginx/conf.d /home/docker/nginx/conf/conf.d</span>
                                               Successfully copied <span class="token number">3</span>.58kB to /home/docker/nginx/conf/conf.d

<span class="token punctuation">[</span>root@centos102 nginx<span class="token punctuation">]</span><span class="token comment"># docker cp nginx_dev:/usr/share/nginx/html /home/docker/nginx</span>
                                               Successfully copied <span class="token number">4</span>.1kB to /home/docker/nginx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>    格式：docker cp 【容器内部文件】:【宿主机目录】
</code></pre><p>停止并关闭运行中的nginx容器</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>[root@centos102 nginx]# docker stop nginx_dev 
nginx_dev

[root@centos102 nginx]# docker rm -f nginx_dev 
nginx_dev

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行 nginx容器 并进行挂载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@centos102 nginx<span class="token punctuation">]</span><span class="token comment"># docker run -d --name nginx -p 8080:80 \\</span>
<span class="token parameter variable">-v</span> /home/docker/nginx/html:/usr/share/nginx/html <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/docker/nginx/logs:/var/log/nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/docker/nginx/conf/conf.d:/etc/nginx/conf.d <span class="token punctuation">\\</span>
nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行成功，结束！</p><h2 id="容器编排-docker-compose" tabindex="-1"><a class="header-anchor" href="#容器编排-docker-compose" aria-hidden="true">#</a> 容器编排 docker-compose</h2><blockquote><p>安装</p></blockquote><p>下载docker-compose文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/docker/compose/releases/download/1.21.1/docker-compose-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">\`</span></span>-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">\`</span></span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将文件复制到/usr/local/bin环境变量下面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> <span class="token function">docker-compose</span> /usr/local/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>给他一个执行权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>卸载docker-compose</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span>  /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>使用教程</p></blockquote><p>创建一个docker-compose目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/docker-compose
<span class="token builtin class-name">cd</span>  ~/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编写docker-compose.yml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token function">vim</span> docker-compose.yml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>version: &quot;3&quot;
services:
 redis:
  image: redis:alpine
  container_name: redis_dev
  ports:
   - &quot;6379:6379&quot;
  volumes:
   - /root/docker/redis/redis_date:/data
volumes:
 redis_data:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 Docker Compose 文件定义了一个名为 redis 的服务，使用了 Redis 的 Alpine 版本镜像，并将容器的 6379 端口映射到宿主机的 6379 端口。此外，它还将容器内的 /data 目录挂载到了本地的 /root/docker/redis/redis_data 目录。</p><p>在这个文件中，还定义了一个名为 redis_data 的卷（volume）。这个卷是在全局的 volumes 部分声明的，而不是在 services 中。这意味着 redis_data 卷是全局可用的，可以被整个 Docker Compose 项目中的任何服务使用。在这个例子中，redis 服务使用了这个卷，将容器内的 /data 目录挂载到了本地的 /root/docker/redis/redis_data 目录。</p><p>这种方式可以确保卷是全局唯一的，可以被多个服务共享，从而提高了灵活性和可重用性。</p><p>启动：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yaml up <span class="token parameter variable">-d</span>  <span class="token comment">#-f调用文件。-d:开启守护进程</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Docker-compose常用命令</p></blockquote><table><thead><tr><th>命令</th><th>效果</th></tr></thead><tbody><tr><td>build</td><td>重新构建服务</td></tr><tr><td>ps</td><td>列出容器</td></tr><tr><td>up</td><td>创建和启动容器</td></tr><tr><td>exec</td><td>在容器里面执行命令</td></tr><tr><td>scale</td><td>指定一个服务容器数量</td></tr><tr><td>top</td><td>显示正在运行的容器进程</td></tr><tr><td>logs</td><td>查看服务容器的输出</td></tr><tr><td>down</td><td>删除容器、网络、数据卷和镜像</td></tr><tr><td>stop/start/restart</td><td>停止、启动、重启服务</td></tr></tbody></table>`,83),r=[d];function c(l,o){return n(),a("div",null,r)}const u=e(i,[["render",c],["__file","Docker.html.vue"]]);export{u as default};