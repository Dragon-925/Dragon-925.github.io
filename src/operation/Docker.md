---
date: 2022-02-16
category:
  - 操作系统
  - 容器
tag:
  - VMware
  - Docker
---

# 《Docker》

## 简介

Docker是一个开源的应用容器引擎。而容器是一种轻量级的虚拟化技术 ，它是一个由应用运行环境、容器基础镜像组成的集合。

> 容器和虚拟机的区别

**在启动速度上**，容器相对虚拟机会更快。虚拟机是一个重量级的操作系统，容器是轻量级的，==容器不需要完整的操作系统，而是共享主机操作系统的内核==。容器只包含应用程序及其运行所需的依赖文件和库文件，以及操作系统的基础文件，例如共享的系统内核和系统工具。因此，==相比虚拟机，容器的尺寸更小，占用的资源更少==。

**运行性能**，由于==虚拟机增加了虚拟化层用于虚拟化硬件==，势必会增加一定的开销，所以运行性能有所损失；而容器是直接运行在物理操作系统上的，他本身与系统上其他进程并没有太大区别，所以运行性能是接近原生的。

**磁盘占用**，虚拟机是一个完整的操作系统，是 GB 级别的，而容器只包含了一些系统启动的必要组件和程序依赖，是 MB 级别的。

**隔离性**，虚拟机是一个完整的操作系统级别的隔离，要比容器好很多；==容器是进程级别的隔离，隔离的不彻底，因为多个容器之间使用的是同一个宿主机的操作系统内核==。

**封装速度**，虚拟机封装会包含操作系统，封装速度比较慢，==容器只封装操作系统的基础文件和库文件、应用程序、依赖，封装速度较快==。

## Docker安装

安装必要的软件包：

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

这行命令安装了一些必要的软件包，包括 yum-utils、device-mapper-persistent-data 和 lvm2。这些软件包是 Docker 的依赖项。

添加 Docker 仓库：

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
这行命令添加了 Docker 的官方 YUM 仓库，并指定了阿里云的镜像源。

更新 YUM 缓存：

```bash
yum makecache fast
```
这行命令用于快速更新 YUM 缓存，以便新添加的仓库信息生效。

安装 Docker：

```bash
yum -y install docker-ce
```
这行命令通过 YUM 安装 Docker 社区版 (docker-ce)。

配置 Docker 镜像加速器：

```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://j6o4qczl.mirror.aliyuncs.com"]
}
EOF
```

这部分命令创建了 Docker 的配置文件目录 /etc/docker，然后使用 tee 命令向 /etc/docker/daemon.json 文件写入配置内容。配置内容指定了一个镜像加速器地址，这里使用的是阿里云的 Docker 镜像加速器。

重新加载 systemd 守护进程配置：

```bash
systemctl daemon-reload
```
这行命令重新加载 systemd 守护进程的配置，以使 Docker 配置的改变生效。

启用 Docker 服务：

```bash
systemctl enable docker
```
这行命令设置 Docker 服务在系统启动时自动启动。

重启 Docker 服务：

```bash
systemctl restart docker
```
这行命令重启 Docker 服务，以应用配置的改变。

## Docker 启动容器

```bash
docker run -d --name nginx_test  nginx

注释：
-d					#后台运行
--name			#自定义容器名称
nginx				#容器镜像
```

> 进入容器查看服务

```bash
docker exec -it nginx_test bash

注释：
-it		#打开终端交互（进入容器操作）
nginx_test	#容器名称
bash	#执行容器使用的 shell, bash 或 sh。
```
## 端口映射

```bash
docker run -d --name nginx_test -p 8080:80 nginx

注释：
-p 8080:80	# 8080 代表宿主机端口，80 代表容器端口
```

查看 本机ip

```bash
hostname -I
```

测试是否映射成功

```bash
curl 【ip】:【port】
```

## 数据卷的挂载

很多时候在进入 容器内部时没有vi/vim命令这一说，无法更改内部文件，所以使用挂载数据卷

首先创建运行容器，这里以nginx为例

```dockerfile
docker run -it -d -p 8080:80 --name nginx_dev nginx
```

在宿主机创建对应的文件夹

```bash
mkdir -p /root/docker/nginx/conf
mkdir -p /root/docker/nginx/logs
mkdir -p /root/docker/nginx/html
```

接着将nginx容器内部文件拷贝到宿主机的指定目录

```bash
[root@centos102 nginx]# docker cp nginx_dev:/etc/nginx/nginx.conf /home/docker/nginx/conf/nginx.conf
                                               Successfully copied 2.56kB to /home/docker/nginx/conf/nginx.conf

[root@centos102 nginx]# docker cp nginx_dev:/etc/nginx/conf.d /home/docker/nginx/conf/conf.d
                                               Successfully copied 3.58kB to /home/docker/nginx/conf/conf.d

[root@centos102 nginx]# docker cp nginx_dev:/usr/share/nginx/html /home/docker/nginx
                                               Successfully copied 4.1kB to /home/docker/nginx

```
        格式：docker cp 【容器内部文件】:【宿主机目录】

停止并关闭运行中的nginx容器

```dockerfile
[root@centos102 nginx]# docker stop nginx_dev 
nginx_dev

[root@centos102 nginx]# docker rm -f nginx_dev 
nginx_dev

```

重新运行 nginx容器 并进行挂载

```bash
[root@centos102 nginx]# docker run -d --name nginx -p 8080:80 \
-v /home/docker/nginx/html:/usr/share/nginx/html \
-v /home/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/docker/nginx/logs:/var/log/nginx \
-v /home/docker/nginx/conf/conf.d:/etc/nginx/conf.d \
nginx
```
运行成功，结束！

## 容器编排 docker-compose

> 安装

下载docker-compose文件
```bash
curl -L https://github.com/docker/compose/releases/download/1.21.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

将文件复制到/usr/local/bin环境变量下面

```bash
mv docker-compose /usr/local/bin
```

给他一个执行权限

```bash
chmod +x /usr/local/bin/docker-compose
```

查看是否安装成功

```bash
docker-compose -version
```

> 卸载docker-compose

```bash
rm  /usr/local/bin/docker-compose
```

> 使用教程

创建一个docker-compose目录

```bash
mkdir ~/docker-compose
cd  ~/docker-compose
```

编写docker-compose.yml文件

```bash

vim docker-compose.yml

```

```dockerfile
version: "3"
services:
 redis:
  image: redis:alpine
  container_name: redis_dev
  ports:
   - "6379:6379"
  volumes:
   - /root/docker/redis/redis_date:/data
volumes:
 redis_data:

```
这个 Docker Compose 文件定义了一个名为 redis 的服务，使用了 Redis 的 Alpine 版本镜像，并将容器的 6379 端口映射到宿主机的 6379 端口。此外，它还将容器内的 /data 目录挂载到了本地的 /root/docker/redis/redis_data 目录。

在这个文件中，还定义了一个名为 redis_data 的卷（volume）。这个卷是在全局的 volumes 部分声明的，而不是在 services 中。这意味着 redis_data 卷是全局可用的，可以被整个 Docker Compose 项目中的任何服务使用。在这个例子中，redis 服务使用了这个卷，将容器内的 /data 目录挂载到了本地的 /root/docker/redis/redis_data 目录。

这种方式可以确保卷是全局唯一的，可以被多个服务共享，从而提高了灵活性和可重用性。

启动：
```bash
docker-compose -f docker-compose.yaml up -d  #-f调用文件。-d:开启守护进程

```
> Docker-compose常用命令

|  命令   | 效果  |
|  ----  | ----  |
| build  | 重新构建服务 |
| ps  | 列出容器 |
| up  | 创建和启动容器 |
| exec  | 在容器里面执行命令 |
| scale  | 指定一个服务容器数量 |
| top  | 显示正在运行的容器进程 |
| logs  | 查看服务容器的输出 |
| down  | 删除容器、网络、数据卷和镜像 |
| stop/start/restart  | 停止、启动、重启服务 |