---
date: 2022-01-16
category:
  - 操作系统
  - CentOS7
tag:
  - VMware
---

# 《Linux》

## 常用命令

> 帮助类命令

`man 【命令或配置文件】`：获得帮助信息

实际操作如图所示：
`man ls`

[![man ls](http://47.92.230.178:9090/api/v1/buckets/blog/objects/download?preview=true&prefix=bGludXgvMTcxNTA2MjcyMzQyMS5qcGc=&version_id=null)](http://47.92.230.178:9090/api/v1/buckets/blog/objects/download?preview=true&prefix=bGludXgvMTcxNTA2MjcyMzQyMS5qcGc=&version_id=null)

> 开关机命令

`sync` 将内存中的数据同步到硬盘中

`poweroff` 关闭系统，等同于`shutdown -h now`

`reboot` 重启系统，等同于`shutdown -h now`

`shutdown【选项】 时间`

> 服务管理类命令

+ CentOS6

  `service 服务名 start` 开启服务

  `service 服务名 stop` 关闭服务

  `service 服务名 restart` 重启服务

  `service 服务名 status` 查看服务状态

+ CentOS7

  `systemctl start 服务名` 开启服务

  `systemctl stop 服务名` 关闭服务

  `systemctl restart 服务名` 重启服务

  `systemctl status 服务名` 查看服务状态

  `systemctl --type service` 查看正在运行的服务

**永久开关服务命令**

+ CentOS6

  `chkconfig` 查看所有服务自启配置

  `chkconfig 服务名 off` 关闭服务自启

  `chkconfig 服务名 on` 开启服务自启

  `chkconfig 服务名 --list` 查看服务开机自启状态

+ CentOS7

  `systemctl enable 服务名` 打开自启

  `systemctl disable 服务名` 关闭自启

  `systemctl is-enabled 服务名` 查看服务是否自启

  `systemctl list-unit-files` 查看所有服务自启配置

**实际操作-永久关闭防火墙自启**

  <img src="http://47.92.230.178:9090/api/v1/buckets/blog/objects/download?preview=true&prefix=bGludXgvMTcxNTA2NjA3OTY1Mi5qcGc=&version_id=null"/>


> 文件目录类命令

`pwd(print working directory)` 打印当前工作目录的绝对路径

`ls (list)` 列出目录内容


