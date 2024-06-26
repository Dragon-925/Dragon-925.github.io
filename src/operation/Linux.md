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


> 查看文件头部和尾部

`head -【前多少行】 文件名` 查看文件前多少行

`tail -【后多少行】 文件名` 常用于查看日志

`tail -f 文件名` 实时监控文件

> 打印输出命令

`echo 内容`

```shell
echo 内容

echo "内容"

echo -e "内容" # 这里的是 转义字符 比如 \t \n

# 如果要输出转义字符的本身，需要在 \t 之前加上\\
```

> 追加和覆盖命令

`>`：覆盖

`>>`：追加

```shell
# 使用ll打印出信息

ll > 【文件名】 # 这里的文件也可以是不存在的文件，默认会创建

echo -e "hello\tlinux" > 【文件名】 # 覆盖文件

echo -e "abcdes" >> 【文件名】 # 追加文件
```

>硬链接和软连接

链接为的是防止创建多份重复文件，而是利用一份文件多次调用使用

**硬链接**：

`ln 【源文件】 【目标路径】/文件`

**软连接**：

`ln -s 【绝对路径源文件】 【绝对路径目标】`

> 查看历史命令

`history`

> 编辑命令 vim

|  按键   | 效果  |
|  ----  | ----  |
| dd  | 删除光标当前行 |
| dnd  | 删除n行 |
| u  | 撤销上一步 |
| x/X  | 删除一个字母Delete/删除一个字母Backspace |
| yy  | 复制光标当前行 |
| p  | 粘贴 |
| dw  | 删除一个词 |
| yw  | 复制一个词 |
| gg  | 移动到页头 |
| G  | 移动到页尾 |
| 数字+G  | 移动到目标行 |
| ^  | 移动到行头 |
| $  | 移动到行尾 |
| ZZ  | 如果没修改，直接退出；如果修改保存后退出 |


`vim`命令

保存：`w`

退出：`q`

查找：`/【查找内容】`

  `n`:下一个
  `N`：上一个

替换：`:%s/【被替换内容】/【替换内容】`

取消高亮：`:noh`

展示行号：`:set nu`

取消展示行号：`:set nonu`

> 修改主机名和hotst映射

```shell
# 查看主机名
[root@localhost ~]# hostname
localhost.localdomain
# 修改主机名
[root@localhost ~]# vim /etc/hostname
dawson
#追加映射关系
[root@localhost ~]# vim /etc/hosts

# 将 本机 ip 和 hostname 追加到这个文件中
```

> 时间命令

`date` 获取当前系统时间

```shell
2022年 05月 08日 星期三 14:50:18 CST
```

`date +"%Y %m %d %H:%M:%S"` 格式化输出系统时间

```shell
2022 05 08 15:04:33
```

> 用户管理命令

`useradd 【新用户名】` 添加用户

`passwd 【用户名】` 给新用户设置密码

`id 【用户名】` 查看是否存在用户

`su 【用户账号】` 切换用户

`userdel 【用户账号】` 删除用户

`userdel -r 【用户账号】` 删除用户和用户主目录信息

==查看创建的用户都在home目录下==

> 用户权限命令操作

`sudo 命令` 最高权限执行

修改配置文件
`vim /etc/sudoers`

```shell
【用户名】 ALL=(ALL)  NOPASSWD:ALL #无密码
或者
【用户名】 ALL=(ALL)  ALL
```

> 查找命令

`find 目录/ -name "*.txt"` 查找目录/下的文件

`find 目录/ -user 【用户名】` 查找用户名称为 -user的文件

`find 目录 -size +204800` 查找文件大于 200m的文件

> 模糊查询 grep命令

grep 是一个用于在文件中搜索指定模式的命令，其基本语法如下：

`grep [选项] 模式 [文件...]`
选项：可以是一些参数，用于调整 grep 命令的行为，例如 -i（忽略大小写）、-r（递归搜索）、-n（显示行号）等。

模式：是您想要搜索的文本模式或正则表达式。

文件：是要搜索的文件列表。如果省略文件参数，则 grep 会从标准输入（stdin）中读取数据进行搜索。

以下是一些常用的 grep 选项：

-i：忽略大小写，不区分大小写地搜索。

-r：递归搜索，搜索指定目录及其子目录下的文件。

-n：显示匹配行的行号。

-v：显示不匹配的行。

-E：启用扩展的正则表达式（支持更多的正则表达式语法）。

-w：仅匹配整个单词，而不是匹配包含搜索模式的部分单词。

例如，要在文件 example.txt 中搜索包含单词 "hello" 的行，可以使用以下命令：

grep "hello" example.txt
如果要在当前目录及其子目录中递归搜索包含 "error" 的文件，并显示匹配行的行号，可以使用以下命令：

grep -rn "error" .

`ps -ef | grep nginx
` 查找 进程中是nginx的
> 压缩命令和解压缩命令

`tar -zcvf 【文件名称.tar.gz】 【要压缩的文件名】` 压缩文件

`tar -zxvf 【解压文件名】` 解压文件

如果解压到其他目录

在【解压文件名】 -C 目录即可

|  选项   | 功能  |
|  ----  | ----  |
| -z  | 打包同时压缩 |
| -c  | 产生.tar打包文件 |
| -v  | 显示详细信息 |
| -f  | 指定压缩后的文件名 |
| -x  | 解压.tar文件 |

> 磁盘命令

`df -h` 显示文件系统的磁盘空间使用情况

`fdisk -l` 查看磁盘分区

> RPM 安装包

相当于 windows中的setup.exed

`rpm -qa | grep firefox` 查询火狐安装情况

`rpm -e 软件包` 卸载

`rpm -e --nodeps 软件包` 不检查依赖卸载

`rpm -ivh RPM 包全名` 安装

|  选项   | 功能  |
|  ----  | ----  |
| -i  | install |
| -v  | verbose显示详细信息 |
| -h  | hash 进度条 |
| -nodeps  | 不检测依赖进度 |


> YUM安装命令

`yum 【选项】 【参数】` 安装程序命令

`yum list | grep google` 查询google下载源

`yum install xorg-x11-drv-openchrome.x86_64` 安装chrome浏览器

> JDK的安装和部署

