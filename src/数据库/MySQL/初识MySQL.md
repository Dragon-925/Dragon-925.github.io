---
icon: pen-to-square
date: 2020-01-25
category:
        - MySQL
tag:
        - 数据库
        - 基础
---

# 《MySQL 初始》

## 一、数据库操作

### 1.初识 MySQL

> 操作系统、数据结构与算法、离散数学、数字电路、体系结构、编译原理

### 2.为什么学习数据库

==数据库是所有软件体系中最核心的存在==

### 3.数据库操作

- 创建数据库

     ```sql
     CREATE DATABASE s DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
     ```

- 删除数据库

     ```sql
     drop database 数据库名;
     ```

- 查看数据库

     ```sql
     show databases
     ```

- 使用数据库

     ```sql
     use 数据库名;
     ```

### 4.结构化查询语句分类

| 名称                | 命令                    |
| ------------------- | ----------------------- |
| DDL（数据定义语言） | CREATE、DROP、ALTER     |
| DML（数据操作语言） | INSERT、UPDATE、DELETE  |
| DQL（数据查询语言） | SELECT                  |
| DCL（数据控制语言） | GRANT、commit、rollback |

- **创建数据表**

     ```sql
     create table `表名`(
     	'字段名' 类型 [属性],
     )表类型 表字符集 注释
     ```

### 5.数据值和列类型

- 数值类型

| 类型        | 说明           | 存储要求 |
| ----------- | -------------- | -------- |
| _tinyint_   | 非常小的数据   | 1 字节   |
| _smallint_  | 较小的数据     | 2 字节   |
| _mediumint_ | 中等大小的数据 | 3 字节   |
| int         | 标准整数       | 4 字节   |
| bigint      | 较大的整数     | 8 字节   |
| float       | 单精度浮点数   | 4 字节   |
| double      | 双精度浮点数   | 8 字节   |
| decimal     | 字符串的浮点数 |          |

- 字符串类型

| 类型       | 最大长度    |
| ---------- | ----------- |
| char[x]    | x 字符      |
| varchar[x] | 变长        |
| tinytext   | 2^8^-1 字节 |
| text       | 2^16^-1     |

- 日期和时间型数值类型

| 类型      | 说明                          | 取值      |
| --------- | ----------------------------- | --------- |
| DATE      | YYYY-MM-DD                    |           |
| TIME      | Hh:mm:ss                      |           |
| DATETIME  | YY-MM-DD hh:mm:ss             |           |
| TIMESTAMP | YYYYMMDDhhmmss 格式表示时间戳 |           |
| YEAR      | YYYY 格式的年份值             | 1901~2155 |

- NULL 值
     - 理解为“无值”/未知值
     - 不能用 NULL 进行算术运算，结果仍为 NULL

### 6.数据字段属性

- UnSigned

     - 无符号
     - 不允许负数

- ZEROFILL

     - 0 填充
     - 不足位数的用 0 填充

- auto_increment

     - 自动增长

     - 通常用于设置主键

     - 可定义起始值和步长

          > 当前表设置步长（auto_increment = 100）
          >
          > set @@auto_increment_increment=5;--步长

- default

     - 默认的
     - 用于设置默认值
     - 例如：性别字段，默认为‘男’，否则为‘女’；若无指定该列的值，则默认值为‘男’的值

```sql
 create table `t0`(
    id int not null primary key auto_increment comment '序号',
    name varchar(20) not null default '匿名' comment '姓名',
    sex varchar(2) not null default '男' comment '性别',
    birth datetime default null comment '生日'
     # 默认default ('0000-00-00 00:00:00')
    )engine=innodb default charset=utf8;
```

- 注释

     > 单行注释： #，--
     >
     > 多行注释：/\* ....\*/

### 7.数据表类型

- MySQL 的数据表的类型：MyISAM,InnoDB,HEAP,BOB,CSV 等...

     | 名称       | MyISAM   | InnoDB            |
     | ---------- | -------- | ----------------- |
     | 事务处理   | 不支持   | 支持              |
     | 数据行锁定 | 不支持   | 支持              |
     | 外键约束   | 不支持   | 支持              |
     | 全文索引   | 支持     | 不支持            |
     | 表空间大小 | 相对较小 | 相对较大，约 2 倍 |

     > 适用场合
     >
     > ​ MyISAM：节约空间和响应速度
     >
     > ​ InnoDB：安全性、事务处理和多用户操作数据表

- 数据表存储位置

     - MySQL 数据表以文件方式存放在磁盘中

          ==包括表文件，数据文件和数据库的选项文件==

          ==位置：MySQL 安装目录\data\下存放数据表。目录名对应数据库名，该目录下文件名对应数据表。==

          ```sql
          show global variables like "%datadir%";
          ```

     - \*.frm -- 表结构定义文件

     - \*.MYD -- 数据文件(data)

     - \*.MYI -- 索引文件(index)

     - innoDB 类型数据表只有一个\*.frm 文件，以及上一级目录的 ibadata1 文件

     - MyISAM 类型数据表对应三个文件

## 二、DML 语言（操作）

### 1.外键（_foreign key_）

> 表示两个关系之间的相关联系，即外键也是另外一个关系的主键。
>
> 外键在某个表中作为主键，则该表称为主表。
>
> 具有此外见的表被称为从表

==在表一中设置主键，将该字段的值放入表二，即是表二的外键==

- 外键作用

     保持数据一致性、完整性

     目的是控制存储在外键表中的数据约束，使得两张表形成关联

- 外键的创建

     表一

     ```sql
     create table student(
         id int(8) not null primary key auto_increment comment '学号',
         name varchar(10) not null default '匿名' comment '姓名'
         )engine=innodb default charset=utf8;
     ```

     表二

     ```sql
     create table score(
         id int(8) not null comment '学号',
         name varchar(10) not null comment '姓名',
         math double not null comment '高数',
         chinese double not null comment '语文',
         english double not null comment '英语',
         constraint foreign key(`id`) references `student` (`id`)
         )engine=innodb default charset=utf8;
     ```

     > 创建外键的第二种方式

- ```sql
  alter table score add constraint foreign key(`id`) references `student`(`id`);
  ```

- **外键删除**

     删除主表

     ```sql
     drop table student;
     # 注意：删除具有主外键关系的表时，要先删除子表，后删除主表
     ```

     ==ERROR 3730 (HY000): Cannot drop table 'student' referenced by a foreign key constraint 'score_ibfk_1' on table 'score'.==

### 2.添加数据

```sql
insert into 表名(字段1,字段2,..) values(值1,值2,...);
```

### 3.修改数据

```sql
update 表名 set 列名 = value where 条件;
```

### 4.删除数据

```sql
delete from 表名 where 条件;
```

- 老大 drop
     - 删除内容和定义，释放空间。简单来说就是把整个表去掉.以后要新增数据是不可能的,除非新增一个表
- 老二 truncate
     - 删除内容、释放空间但不删除定义。与 drop 不同的是,他只是清空表数据而已,他比较温柔
- 老三 delete
     - 删除内容不删除定义，不释放空间。三兄弟之中最容易欺负的一个

### 5.truncate

> 作用：完全清空表数据，但表结构，索引，约束等不变

```sql
truncate 表名;
```

==注意：二者区别==

- 相同点：

     都能删除数据，不删除表结构，但 truncate 速度更快

- 不同点：

     - 使用 truncate table 重新设置 auto_increment 计数器
     - 使用 truncate table 不会对事务有影响

## 三、DQL 语言（查询）

**DQL( Data Query Language 数据查询语言 )**

- 查询数据库数据 , 如**SELECT**语句
- 简单的单表查询或多表的复杂查询和嵌套查询
- 是数据库语言中最核心,最重要的语句
- 使用频率最高的语句

### 1.指定查询字段

> AS 子句作为别名

作用：

- 给字段取新别名

     ```sql
     select name as 姓名 from 表名;
     ```

- 给表取新别名

     ```sql
     select name from 表名 as 别名;
     ```

- 计算后的总值用新名称代替

     ```sql
     select count('姓名:',name) as 新名 from student;
     ```

> distinct 关键字使用

作用：去掉重复记录只保留一条

```sql
select distinct name from 表名;
```

> 使用表达式的例

应用场景 :

- SELECT 语句返回结果列中使用

- SELECT 语句中的 ORDER BY , HAVING 等子句中使用

- DML 语句中的 where 条件语句中使用表达式

     ```sql
     select @@auto_increment_increment;#查看步长
     select version();# 查看版本号
     select 100*5-50 as 计算结果; #表达式
     select name,score+50 as '提分后' from 表名;
     ```

### 2.where 条件语句

作用：用于检索数据表中 符合条件 的记录

搜索条件可由一个或多个逻辑表达式组成 , 结果一般为真或假.

- 查询考试成绩在 95-100 之间

     ```sql
     select * from student where score>=95 and score<=100;
     # AND也可以写成“&&”
     select * from student where score>=95 && score<=100;
     ```

- 模糊查询

     ```sql
     select * from student where score between 95 and 100;
     ```

- 除了 100 号的同学，都要

     ```sql
     select * from student where id !=100;
     # 或者
     select * from student where not id =100;
     ```

> 模糊查询：测试

```sql
# LIKE
#======================================================
#like结合使用通配符：%（代表0到任意个字符）
# _(一个字符)
select * from student where name like '赵%';

# 查询赵后面只有一个字的
select * from student where name like '赵_';

# 查询赵后面只有二个字的
select * from student where name like '赵__';

#查询姓名中含有龙的
select * from student where name like'%龙%';


# IN
#=======================================================
#查询学号为1000，1001，1002的学生姓名
select name from student where id in(1000,1001,1002);
#查询在张家口和石家庄的学生
select name from student where address in('张家口','石家庄');


# NULL 空
#=======================================================
#不能直接写 =NULL，这是错误的，需要用 is null
#查询生日没有填写的学生姓名
select name from student where bir is null;

```

### 3.连接查询

- 内连接

     ```sql
     select s.id,name from student s inner join result r on r.id = s.id;
     ```

- 等值连接

     ```sql
     select s.id,name from student s,result r where r.id=s.id;
     ```

### 4.排序和分页

> ORDER BY

- ORDER BY 语句用于根据指定的列对结果集进行排序。

- 如果按照降序对记录进行排序，可以使用 DESC 关键字。

- ORDER BY 语句默认按照 ASC 升序对记录进行排序。

```sql
# 查询 数据结构 -1 的所有考试结果（学号 姓名 科目成绩） 降序

select s.id,name,sbname,sscore from student s
inner join result r on r.id = s.id
inner join subject sub on r.subjectid = sub.subjectid where sbname='数据结构' order by sscore desc;
```

> 分页

```sql
# 每页显示5条数据
#=======================================================
select s.sid,sname,subname,sr from student s
inner join result r
on r.sid = s.sid
inner join subject sub
on r.subid = sub.subid
where subname = '数据结构'
order by sr desc,sid
limit 0,5

# 查询 JAVA第一学年 课程成绩前10名并且分数大于80的学生信息(学号,姓名,课程名,分数)
#=======================================================
select sid,sname,cname,score from student s
inner join result r
on r.sid = s.sid
inner join subject sub
on r.subid = sub.id
where subname='Java第一学年'
order by sr desc
limit 0,10
```

### 5.子查询

> 什么是子查询？
>
> ​ 在查询语句中的 where 条件子句中，又嵌套了另外一条查询语句
>
> ​ 嵌套查询可由多个子查询组成，求解的方式是由里及外
>
> ​ 子查询返回的结果一般都是集合，故而建议使用**_IN_**关键字

```sql
-- 查询 数据库结构-1 的所有考试结果(学号,科目编号,成绩),并且成绩降序排列
-- 方法一:使用连接查询
SELECT studentno,r.subjectno,StudentResult
FROM result r
INNER JOIN `subject` sub
ON r.`SubjectNo`=sub.`SubjectNo`
WHERE subjectname = '数据库结构-1'
ORDER BY studentresult DESC;

-- 方法二:使用子查询(执行顺序:由里及外)
SELECT studentno,subjectno,StudentResult
FROM result
WHERE subjectno=(
   SELECT subjectno FROM `subject`
   WHERE subjectname = '数据库结构-1'
)
ORDER BY studentresult DESC;

-- 查询课程为 高等数学-2 且分数不小于80分的学生的学号和姓名
-- 方法一:使用连接查询
SELECT s.studentno,studentname
FROM student s
INNER JOIN result r
ON s.`StudentNo` = r.`StudentNo`
INNER JOIN `subject` sub
ON sub.`SubjectNo` = r.`SubjectNo`
WHERE subjectname = '高等数学-2' AND StudentResult>=80

-- 方法二:使用连接查询+子查询
-- 分数不小于80分的学生的学号和姓名
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult>=80

-- 在上面SQL基础上,添加需求:课程为 高等数学-2
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult>=80 AND subjectno=(
   SELECT subjectno FROM `subject`
   WHERE subjectname = '高等数学-2'
)

-- 方法三:使用子查询
-- 分步写简单sql语句,然后将其嵌套起来
SELECT studentno,studentname FROM student WHERE studentno IN(
   SELECT studentno FROM result WHERE StudentResult>=80 AND subjectno=(
       SELECT subjectno FROM `subject` WHERE subjectname = '高等数学-2'
  )
)
```

## 四、SQL 函数

### 1、数据函数

> 绝对值：**_select abs(-8)_**
>
> 向上取整：**_ceiling(8.4)_**
>
> 向下取整：**_floor(9.4)_**
>
> 随机数（0-1）：**_rand()_**
>
> 符号函数（负数返回-1、整数返回 1、0 返回 0）：**_sign(0)_**

### 2.字符串函数

> select char_length('坚持就能成功');

返回字符串长度

> select concat('我','爱','S','QL');

字符合并

> select insert('认真学习，坚持努力',1,2,'加油继续努力');

<!-- ![image-20220325144754945](C:\Users\Sni\AppData\Roaming\Typora\typora-user-images\image-20220325144754945.png) -->

替换字符串，从指定位置开始替换前面指定长度

> select lower('Dragon');-----小写
>
> select upper('Dragon');-----大写
>
> select left('hello world',5);------左边截取
>
> select right('hello world',4);------右边截取
>
> select replace('坚持就能成功','成功'，‘success’);-----替换字符串
>
> select substr('坚持就能成功,认真才能实现梦想',4,6);-----截取字符串
>
> select reverse('好好学习，认真学习');------反转

案例----查询姓找的同学改为赵

```sql
select replace(stu_name,'找','赵') as new_name from student where stu_name like '找%';
```

### 3.日期和时间函数

> SELECT CURRENT*DATE(); /*获取当前日期*/
> SELECT CURDATE(); /*获取当前日期*/
> SELECT NOW(); /*获取当前日期和时间*/
> SELECT LOCALTIME(); /*获取当前日期和时间*/
> SELECT SYSDATE(); /*获取当前日期和时间\_/

> -- 获取年月日,时分秒
> SELECT YEAR(NOW());
> SELECT MONTH(NOW());
> SELECT DAY(NOW());
> SELECT HOUR(NOW());
> SELECT MINUTE(NOW());
> SELECT SECOND(NOW());

### 4.系统信息函数

```sql
select version()
select user()
```

### 5.聚合函数

| 函数名称 | 描述                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| COUNT()  | 返回满足 Select 条件的记录总和数，如 select count(_) 【不建议使用 _，效率低】 |
| SUM()    | 返回数字字段或表达式列作统计，返回一列的总和。                                |
| AVG()    | 通常为数值字段或表达列作统计，返回一列的平均值                                |
| MAX()    | 可以为数值字段，字符字段或表达式列作统计，返回最大的值。                      |
| MIN()    | 可以为数值字段，字符字段或表达式列作统计，返回最小的值。                      |

```sql
-- 聚合函数
 /*COUNT:非空的*/
 SELECT COUNT(studentname) FROM student;
 SELECT COUNT(*) FROM student;
 SELECT COUNT(1) FROM student;  /*推荐*/

 -- 从含义上讲，count(1) 与 count(*) 都表示对全部数据行的查询。
 -- count(字段) 会统计该字段在表中出现的次数，忽略字段为null 的情况。即不统计字段为null 的记录。
 -- count(*) 包括了所有的列，相当于行数，在统计结果的时候，包含字段为null 的记录；
 -- count(1) 用1代表代码行，在统计结果的时候，包含字段为null 的记录 。
 /*
 很多人认为count(1)执行的效率会比count(*)高，原因是count(*)会存在全表扫描，而count(1)可以针对一个字段进行查询。其实不然，count(1)和count(*)都会对全表进行扫描，统计所有记录的条数，包括那些为null的记录，因此，它们的效率可以说是相差无几。而count(字段)则与前两者不同，它会统计该字段不为null的记录条数。

 下面它们之间的一些对比：

 1）在表没有主键时，count(1)比count(*)快
 2）有主键时，主键作为计算条件，count(主键)效率最高；
 3）若表格只有一个字段，则count(*)效率较高。
 */

 SELECT SUM(StudentResult) AS 总和 FROM result;
 SELECT AVG(StudentResult) AS 平均分 FROM result;
 SELECT MAX(StudentResult) AS 最高分 FROM result;
 SELECT MIN(StudentResult) AS 最低分 FROM result;
```

```sql
-- 查询不同课程的平均分,最高分,最低分
 -- 前提:根据不同的课程进行分组

 SELECT subjectname,AVG(studentresult) AS 平均分,MAX(StudentResult) AS 最高分,MIN(StudentResult) AS 最低分
 FROM result AS r
 INNER JOIN `subject` AS s
 ON r.subjectno = s.subjectno
 GROUP BY r.subjectno
 HAVING 平均分>80;

 /*
 where写在group by前面.
 要是放在分组后面的筛选
 要使用HAVING..
 因为having是从前面筛选的字段再筛选，而where是从数据表中的>字段直接进行的筛选的
 */
```

### 6.MD5 加密

- 简介

     MD5 即 Message-Digest Algorithm 5（信息-摘要算法 5），用于确保信息传输完整一致。是计算机广泛使用的杂凑算法之一（又译摘要算法、哈希算法），主流编程语言普遍已有 MD5 实现。将数据（如汉字）运算为另一固定长度值，是杂凑算法的基础原理，MD5 的前身有 MD2、MD3 和 MD4。

- 实现数据加密

     ```sql
      CREATE TABLE `testmd5` (
       `id` INT(4) NOT NULL,
       `name` VARCHAR(20) NOT NULL,
       `pwd` VARCHAR(50) NOT NULL,
       PRIMARY KEY (`id`)
      ) ENGINE=INNODB DEFAULT CHARSET=utf8
     ```

     - 插入数据

          ```sql
          INSERT INTO testmd5 VALUES(1,'kuangshen','123456'),(2,'qinjiang','456789')
          ```

     - 数据加密语法(对 pwd 这一列)

          ```sql
          update testmd5 set pwd = md5(pwd);
          ```

     - 指定加密

          ```sql
          INSERT INTO testmd5 VALUES(3,'kuangshen2','123456')
          ```

          ```sql
          update testmd5 set pwd = md5(pwd) where name = 'kuangshen2';
          ```

     - 插入新的数据自动加密

          ```sql
          INSERT INTO testmd5 VALUES(4,'kuangshen3',md5('123456'));
          ```

     - 查询登录用户信息（md5 对比使用，查看用户输入加密后的密码进行比对）

          ```sql
          SELECT * FROM testmd5 WHERE `name`='kuangshen' AND pwd=MD5('123456');
          ```

     ### 7.总结

     ```sql
      -- ================ 内置函数 ================
      -- 数值函数
      abs(x)            -- 绝对值 abs(-10.9) = 10
      format(x, d)    -- 格式化千分位数值 format(1234567.456, 2) = 1,234,567.46
      ceil(x)            -- 向上取整 ceil(10.1) = 11
      floor(x)        -- 向下取整 floor (10.1) = 10
      round(x)        -- 四舍五入去整
      mod(m, n)        -- m%n m mod n 求余 10%3=1
      pi()            -- 获得圆周率
      pow(m, n)        -- m^n
      sqrt(x)            -- 算术平方根
      rand()            -- 随机数
      truncate(x, d)    -- 截取d位小数

      -- 时间日期函数
      now(), current_timestamp();     -- 当前日期时间
      current_date();                    -- 当前日期
      current_time();                    -- 当前时间
      date('yyyy-mm-dd hh:ii:ss');    -- 获取日期部分
      time('yyyy-mm-dd hh:ii:ss');    -- 获取时间部分
      date_format('yyyy-mm-dd hh:ii:ss', '%d %y %a %d %m %b %j');    -- 格式化时间
      unix_timestamp();                -- 获得unix时间戳
      from_unixtime();                -- 从时间戳获得时间

      -- 字符串函数
      length(string)            -- string长度，字节
      char_length(string)        -- string的字符个数
      substring(str, position [,length])        -- 从str的position开始,取length个字符
      replace(str ,search_str ,replace_str)    -- 在str中用replace_str替换search_str
      instr(string ,substring)    -- 返回substring首次在string中出现的位置
      concat(string [,...])    -- 连接字串
      charset(str)            -- 返回字串字符集
      lcase(string)            -- 转换成小写
      left(string, length)    -- 从string2中的左边起取length个字符
      load_file(file_name)    -- 从文件读取内容
      locate(substring, string [,start_position])    -- 同instr,但可指定开始位置
      lpad(string, length, pad)    -- 重复用pad加在string开头,直到字串长度为length
      ltrim(string)            -- 去除前端空格
      repeat(string, count)    -- 重复count次
      rpad(string, length, pad)    --在str后用pad补充,直到长度为length
      rtrim(string)            -- 去除后端空格
      strcmp(string1 ,string2)    -- 逐字符比较两字串大小

      -- 聚合函数
      count()
      sum();
      max();
      min();
      avg();
      group_concat()

      -- 其他常用函数
      md5();
      default();
     ```

## 五、事物和索引

### 1.事物

- **事物的概念**

     - 将一组 SQL 语句放在一起同一批去处理，若其中有一个语句出错，则所有 SQL 都将被取消执行

     - MySQL 事物处理只支持 InnoDB 和 BDB 数据表类型

- **原子性**

     - 整个事物的所有操作，要么全部完成，要不都不完成，不可能停留在中间环节，若在执行过程中发生错误，则会被回滚到事物开始前的状态

- **一致性**

     - 一个事务可以封装状态改变（除非它是一个只读的）。事务必须始终保持系统处于一致的状态，不管在任何给定的时间并发事务有多少。也就是说：如果事务是并发多个，系统也必须如同串行事务一样操作。其主要特征是保护性和不变性(Preserving an Invariant)，以转账案例为例，假设有五个账户，每个账户余额是 100 元，那么五个账户总额是 500 元，如果在这个 5 个账户之间同时发生多个转账，无论并发多少个，比如在 A 与 B 账户之间转账 5 元，在 C 与 D 账户之间转账 10 元，在 B 与 E 之间转账 15 元，五个账户总额也应该还是 500 元，这就是保护性和不变性

- **隔离性**

     - 隔离状态执行事务，使它们好像是系统在给定时间内执行的唯一操作。如果有两个事务，运行在相同的时间内，执行相同的功能，事务的隔离性将确保每一事务在系统中认为只有该事务在使用系统。这种属性有时称为串行化，为了防止事务操作间的混淆，必须串行化或序列化请求，使得在同一时间仅有一个请求用于同一数据。

- **持久性**
     - 在事务完成以后，该事务对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。

> 基本语法

```sql
-- 使用set语句来改变自动提交模式
SET autocommit = 0;   /*关闭*/
SET autocommit = 1;   /*开启*/

-- 注意:
--- 1.MySQL中默认是自动提交
--- 2.使用事务时应先关闭自动提交

-- 开始一个事务,标记事务的起始点
START TRANSACTION

-- 提交一个事务给数据库
COMMIT

-- 将事务回滚,数据回到本次事务的初始状态
ROLLBACK

-- 还原MySQL数据库的自动提交
SET autocommit =1;

-- 保存点
SAVEPOINT 保存点名称 -- 设置一个事务保存点
ROLLBACK TO SAVEPOINT 保存点名称 -- 回滚到保存点
RELEASE SAVEPOINT 保存点名称 -- 删除保存点
```

> 题目练习

- A 在线买一款价格为 500 元商品,网上银行转账.
  A 的银行卡余额为 2000,然后给商家 B 支付 500.
  商家 B 一开始的银行卡余额为 10000

     ```sql
     CREATE TABLE `account` (
     `id` INT(11) NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(32) NOT NULL,
     `cash` DECIMAL(9,2) NOT NULL,
     PRIMARY KEY (`id`)
     ) ENGINE=INNODB DEFAULT CHARSET=utf8

     INSERT INTO account (`name`,`cash`)
     VALUES('A',2000.00),('B',10000.00)

     -- 转账实现
     SET autocommit = 0; -- 关闭自动提交
     START TRANSACTION;  -- 开始一个事务,标记事务的起始点
     UPDATE account SET cash=cash-500 WHERE `name`='A';
     UPDATE account SET cash=cash+500 WHERE `name`='B';
     COMMIT; -- 提交事务
     # rollback;
     SET autocommit = 1; -- 恢复自动提交
     ```

### 2.索引

> 索引的引用

- 提高查询速度
- 确保数据唯一性
- 可以加速表和表之间的连接，实现表与表之间的参照完整性
- 使用分组和排序子句进行数据检索，可以显著减少分组和排序的时间
- 全文检索字段进行搜索优化

> 分类

- 主键索引（Primary Key）
- 唯一索引（Unique）
- 常规索引（Index）
- 全文索引（FullText）

> 主键索引

主键：第一个属性组能唯一标识一条记录

特点：

- 最常见的索引类型
- 确保数据记录唯一性
- 确定特定数据记录在数据库中的位置

> 唯一索引

作用：避免同一个表中某数据列中的值重复

与主键索引的区别

- 主键索引只能有一个
- 唯一索引可能有多个

```sql
CREATE TABLE `Grade`(
  `GradeID` INT(11) AUTO_INCREMENT PRIMARYKEY,
  `GradeName` VARCHAR(32) NOT NULL UNIQUE
   -- 或 UNIQUE KEY `GradeID` (`GradeID`)
)
```

> 常规索引

作用 : 快速定位特定数据

注意 :

- index 和 key 关键字都可以设置常规索引
- 应加在查询找条件的字段
- 不宜添加太多常规索引,影响数据的插入,删除和修改操作

```sql
CREATE TABLE `result`(
   -- 省略一些代码
  INDEX/KEY `ind` (`studentNo`,`subjectNo`) -- 创建表时添加
)
-- 创建后添加
ALTER TABLE `result` ADD INDEX `ind`(`studentNo`,`subjectNo`);
```

> 全文索引

百度搜索：全文索引

作用 : 快速定位特定数据

注意 :

- 只能用于 MyISAM 类型的数据表
- 只能用于 CHAR , VARCHAR , TEXT 数据列类型
- 适合大型数据集

```sql
/*
#方法一：创建表时
  　　CREATE TABLE 表名 (
               字段名1 数据类型 [完整性约束条件…],
               字段名2 数据类型 [完整性约束条件…],
               [UNIQUE | FULLTEXT | SPATIAL ]   INDEX | KEY
               [索引名] (字段名[(长度)] [ASC |DESC])
               );


#方法二：CREATE在已存在的表上创建索引
       CREATE [UNIQUE | FULLTEXT | SPATIAL ] INDEX 索引名
                    ON 表名 (字段名[(长度)] [ASC |DESC]) ;


#方法三：ALTER TABLE在已存在的表上创建索引
       ALTER TABLE 表名 ADD [UNIQUE | FULLTEXT | SPATIAL ] INDEX
                            索引名 (字段名[(长度)] [ASC |DESC]) ;


#删除索引：DROP INDEX 索引名 ON 表名字;
#删除主键索引: ALTER TABLE 表名 DROP PRIMARY KEY;


#显示索引信息: SHOW INDEX FROM student;
*/

/*增加全文索引*/
ALTER TABLE `school`.`student` ADD FULLTEXT INDEX `studentname` (`StudentName`);

/*EXPLAIN : 分析SQL语句执行性能*/
EXPLAIN SELECT * FROM student WHERE studentno='1000';

/*使用全文索引*/
-- 全文搜索通过 MATCH() 函数完成。
-- 搜索字符串作为 against() 的参数被给定。搜索以忽略字母大小写的方式执行。对于表中的每个记录行，MATCH() 返回一个相关性值。即，在搜索字符串与记录行在 MATCH() 列表中指定的列的文本之间的相似性尺度。
EXPLAIN SELECT *FROM student WHERE MATCH(studentname) AGAINST('love');

/*
开始之前，先说一下全文索引的版本、存储引擎、数据类型的支持情况

MySQL 5.6 以前的版本，只有 MyISAM 存储引擎支持全文索引；
MySQL 5.6 及以后的版本，MyISAM 和 InnoDB 存储引擎均支持全文索引;
只有字段的数据类型为 char、varchar、text 及其系列才可以建全文索引。
测试或使用全文索引时，要先看一下自己的 MySQL 版本、存储引擎和数据类型是否支持全文索引。
*/
```

> 拓展：测试索引

**建表 app_user：**

```sql
CREATE TABLE `app_user` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(50) DEFAULT '' COMMENT '用户昵称',
`email` varchar(50) NOT NULL COMMENT '用户邮箱',
`phone` varchar(20) DEFAULT '' COMMENT '手机号',
`gender` tinyint(4) unsigned DEFAULT '0' COMMENT '性别（0:男；1：女）',
`password` varchar(100) NOT NULL COMMENT '密码',
`age` tinyint(4) DEFAULT '0' COMMENT '年龄',
`create_time` datetime DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='app用户表'
```

**批量插入数据：100w**

```sql
DROP FUNCTION IF EXISTS mock_data;
DELIMITER $$
CREATE FUNCTION mock_data()
RETURNS INT
BEGIN
DECLARE num INT DEFAULT 1000000;
DECLARE i INT DEFAULT 0;
WHILE i < num DO
  INSERT INTO app_user(`name`, `email`, `phone`, `gender`, `password`, `age`)
   VALUES(CONCAT('用户', i), '24736743@qq.com', CONCAT('18', FLOOR(RAND()*(999999999-100000000)+100000000)),FLOOR(RAND()*2),UUID(), FLOOR(RAND()*100));
  SET i = i + 1;
END WHILE;
RETURN i;
END;
SELECT mock_data();
```

**索引效率测试**

无索引

```sql
SELECT * FROM app_user WHERE name = '用户9999'; -- 查看耗时
SELECT * FROM app_user WHERE name = '用户9999';
SELECT * FROM app_user WHERE name = '用户9999';

mysql> EXPLAIN SELECT * FROM app_user WHERE name = '用户9999'\G
*************************** 1. row ***************************
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ALL
possible_keys: NULL
        key: NULL
    key_len: NULL
        ref: NULL
        rows: 992759
    filtered: 10.00
      Extra: Using where
1 row in set, 1 warning (0.00 sec)
```

创建索引

```sql
CREATE INDEX idx_app_user_name ON app_user(name);
```

测试普通索引

```sql
mysql> EXPLAIN SELECT * FROM app_user WHERE name = '用户9999'\G
*************************** 1. row ***************************
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ref
possible_keys: idx_app_user_name
        key: idx_app_user_name
    key_len: 203
        ref: const
        rows: 1
    filtered: 100.00
      Extra: NULL
1 row in set, 1 warning (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)
```

> 索引准则

- 索引不是越多越好
- 不要对经常变动的数据加索引
- 小数据量的表建议不要加索引
- 索引一般应加在查找条件的字段

> 索引的数据结构

```sql
-- 我们可以在创建上述索引的时候，为其指定索引类型，分两类
hash类型的索引：查询单条快，范围查询慢
btree类型的索引：b+树，层数越多，数据量指数级增长（我们就用它，因为innodb默认支持它）

-- 不同的存储引擎支持的索引类型也不一样
InnoDB 支持事务，支持行级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；
MyISAM 不支持事务，支持表级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；
Memory 不支持事务，支持表级别锁定，支持 B-tree、Hash 等索引，不支持 Full-text 索引；
NDB 支持事务，支持行级别锁定，支持 Hash 索引，不支持 B-tree、Full-text 等索引；
Archive 不支持事务，支持表级别锁定，不支持 B-tree、Hash、Full-text 等索引；
```

## 六、权限及如何设计数据库

### 1.用户管理

> 基本命令

```sql
/* 用户和权限管理 */ ------------------
用户信息表：mysql.user

-- 刷新权限
FLUSH PRIVILEGES

-- 增加用户 CREATE USER kuangshen IDENTIFIED BY '123456'
CREATE USER 用户名 IDENTIFIED BY [PASSWORD] 密码(字符串)
  - 必须拥有mysql数据库的全局CREATE USER权限，或拥有INSERT权限。
  - 只能创建用户，不能赋予权限。
  - 用户名，注意引号：如 'user_name'@'192.168.1.1'
  - 密码也需引号，纯数字密码也要加引号
  - 要在纯文本中指定密码，需忽略PASSWORD关键词。要把密码指定为由PASSWORD()函数返回的混编值，需包含关键字PASSWORD

-- 重命名用户 RENAME USER kuangshen TO kuangshen2
RENAME USER old_user TO new_user

-- 设置密码
SET PASSWORD = PASSWORD('密码')    -- 为当前用户设置密码
SET PASSWORD FOR 用户名 = PASSWORD('密码')    -- 为指定用户设置密码

-- 删除用户 DROP USER kuangshen2
DROP USER 用户名

-- 分配权限/添加用户
GRANT 权限列表 ON 表名 TO 用户名 [IDENTIFIED BY [PASSWORD] 'password']
  - all privileges 表示所有权限
  - *.* 表示所有库的所有表
  - 库名.表名 表示某库下面的某表

-- 查看权限   SHOW GRANTS FOR root@localhost;
SHOW GRANTS FOR 用户名
   -- 查看当前用户权限
  SHOW GRANTS; 或 SHOW GRANTS FOR CURRENT_USER; 或 SHOW GRANTS FOR CURRENT_USER();

-- 撤消权限
REVOKE 权限列表 ON 表名 FROM 用户名
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 用户名    -- 撤销所有权限
```

> 权限解释

```sql
-- 权限列表
ALL [PRIVILEGES]    -- 设置除GRANT OPTION之外的所有简单权限
ALTER    -- 允许使用ALTER TABLE
ALTER ROUTINE    -- 更改或取消已存储的子程序
CREATE    -- 允许使用CREATE TABLE
CREATE ROUTINE    -- 创建已存储的子程序
CREATE TEMPORARY TABLES        -- 允许使用CREATE TEMPORARY TABLE
CREATE USER        -- 允许使用CREATE USER, DROP USER, RENAME USER和REVOKE ALL PRIVILEGES。
CREATE VIEW        -- 允许使用CREATE VIEW
DELETE    -- 允许使用DELETE
DROP    -- 允许使用DROP TABLE
EXECUTE        -- 允许用户运行已存储的子程序
FILE    -- 允许使用SELECT...INTO OUTFILE和LOAD DATA INFILE
INDEX     -- 允许使用CREATE INDEX和DROP INDEX
INSERT    -- 允许使用INSERT
LOCK TABLES        -- 允许对您拥有SELECT权限的表使用LOCK TABLES
PROCESS     -- 允许使用SHOW FULL PROCESSLIST
REFERENCES    -- 未被实施
RELOAD    -- 允许使用FLUSH
REPLICATION CLIENT    -- 允许用户询问从属服务器或主服务器的地址
REPLICATION SLAVE    -- 用于复制型从属服务器（从主服务器中读取二进制日志事件）
SELECT    -- 允许使用SELECT
SHOW DATABASES    -- 显示所有数据库
SHOW VIEW    -- 允许使用SHOW CREATE VIEW
SHUTDOWN    -- 允许使用mysqladmin shutdown
SUPER    -- 允许使用CHANGE MASTER, KILL, PURGE MASTER LOGS和SET GLOBAL语句，mysqladmin debug命令；允许您连接（一次），即使已达到max_connections。
UPDATE    -- 允许使用UPDATE
USAGE    -- “无权限”的同义词
GRANT OPTION    -- 允许授予权限


/* 表维护 */

-- 分析和存储表的关键字分布
ANALYZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE 表名 ...
-- 检查一个或多个表是否有错误
CHECK TABLE tbl_name [, tbl_name] ... [option] ...
option = {QUICK | FAST | MEDIUM | EXTENDED | CHANGED}
-- 整理数据文件的碎片
OPTIMIZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE tbl_name [, tbl_name] ...
```

### 2.MySQL 备份

数据库备份必要性

- 保证重要数据不丢失
- 数据转移

MySQL 数据库备份方法

- mysqldump 备份工具
- 数据库管理工具,如 SQLyog
- 直接拷贝数据库文件和相关配置文件

**mysqldump 客户端**

作用 :

- 转储数据库
- 搜集数据库进行备份
- 将数据转移到另一个 SQL 服务器,不一定是 MySQL 服务器

![图片](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7Jf7deolwQa44rXvicIhXZ0NzgWJWeyYYcf1Dy3ibfN66SiaZQmqTF3Hv8HBjr1zIowXh201pEjUzyJw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```sql
-- 导出
1. 导出一张表 -- mysqldump -uroot -p123456 school student >D:/a.sql
　　mysqldump -u用户名 -p密码 库名 表名 > 文件名(D:/a.sql)
2. 导出多张表 -- mysqldump -uroot -p123456 school student result >D:/a.sql
　　mysqldump -u用户名 -p密码 库名 表1 表2 表3 > 文件名(D:/a.sql)
3. 导出所有表 -- mysqldump -uroot -p123456 school >D:/a.sql
　　mysqldump -u用户名 -p密码 库名 > 文件名(D:/a.sql)
4. 导出一个库 -- mysqldump -uroot -p123456 -B school >D:/a.sql
　　mysqldump -u用户名 -p密码 -B 库名 > 文件名(D:/a.sql)

可以-w携带备份条件

-- 导入
1. 在登录mysql的情况下：-- source D:/a.sql
　　source 备份文件
2. 在不登录的情况下
　　mysql -u用户名 -p密码 库名 < 备份文件
```

### 3.规范化数据库设计

**为什么需要数据库设计**

**当数据库比较复杂时我们需要设计数据库**

**糟糕的数据库设计 :**

- 数据冗余,存储空间浪费
- 数据更新和插入的异常
- 程序性能差

**良好的数据库设计 :**

- 节省数据的存储空间
- 能够保证数据的完整性
- 方便进行数据库应用系统的开发

     **软件项目开发周期中数据库设计 :**

- 需求分析阶段: 分析客户的业务和数据处理需求
- 概要设计阶段:设计数据库的 E-R 模型图 , 确认需求信息的正确和完整.

**设计数据库步骤**

- 收集信息

-    - 与该系统有关人员进行交流 , 座谈 , 充分了解用户需求 , 理解数据库需要完成的任务.

- 标识实体[Entity]

-

-    - 标识数据库要管理的关键对象或实体,实体一般是名词

- 标识每个实体需要存储的详细信息[Attribute]

- 标识实体之间的关系[Relationship]

### 4.三大范式

**问题 : 为什么需要数据规范化?**

不合规范的表设计会导致的问题：

- 信息重复

- 更新异常

- 插入异常

-    - 无法正确表示信息

- 删除异常

-    - 丢失有效信息

> 三大范式

**第一范式 (1st NF)**

第一范式的目标是确保每列的原子性,如果每列都是不可再分的最小数据单元,则满足第一范式

**第二范式(2nd NF)**

第二范式（2NF）是在第一范式（1NF）的基础上建立起来的，即满足第二范式（2NF）必须先满足第一范式（1NF）。

第二范式消除部分依赖，要求一张表中的每一列都完全依赖于主键（针对于组合主键）

**第三范式(3rd NF)**

如果一个关系满足第二范式,并且除了主键以外的其他列，都不传递依赖于主键列,则满足第三范式.

第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。

**规范化和性能的关系**

为满足某种商业目标 , 数据库性能比规范化数据库更重要

在数据规范化的同时 , 要综合考虑数据库的性能

通过在给定的表中添加额外的字段,以大量减少需要从中搜索信息所需的时间

通过在给定的表中插入计算列,以方便查询
