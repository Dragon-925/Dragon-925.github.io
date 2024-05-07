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

[![man ls](http://47.92.230.178:9001/blog/linux/1715062723421.jpg)](http://47.92.230.178:9001/blog/linux/1715062723421.jpg)

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

  <img src="http://47.92.230.178:9001/blog/linux/1715066079652.jpg"/>


> 文件目录类命令

`pwd(print working directory)` 打印当前工作目录的绝对路径

`ls (list)` 列出目录内容

> 创建目录和删除目录

`mkdir -p` 创建多级目录

`rmdir` 删除空目录

> 创建空文件

`touch 文件名称` 创建空文件

> 复制命令

`cp 【源文件】 【目标路径】` 普通复制文件

`cp -p 【源目录】 【目标目录】` 复制目录

`\cp 【源文件】 【目标目录】` 强制覆盖

在复制过程中如果忘了要复制的目录，可以连续两次【Tab】键进行查看目录

> 删除命令

`rm 【文件名】`

`-r` 递归删除

`-f` 强制删除

`-v` 查看删除详细过程

==在实际工作中，尽量避免使用这种删除方式，而是使用重命名 将文件重命名为 【文件】.bak 即可==

> 移动和重命名命令

`mv 【源文件】 【目标路径】/` 移动文件

`mv 【源文件】 【重命名】` 重命名


> 文件查看命令

`cat -n 【文件名】` 查看文件 -n 代表显示行数

`less 【文件名】` 查看文件

空格：向下翻动一页

pageDown：向下翻动一页

pageUp：向上翻动一页

/字串：向下搜寻字串的功能   n:向下查找   N：向上查找

?字串：向上搜寻字串的功能

q：离开less这个程序



