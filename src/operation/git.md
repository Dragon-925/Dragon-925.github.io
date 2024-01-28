---
icon: /icons/git.svg
date: 2020-03-15
category:
  - 分布式版本管理工具
  - git
tag:
  - git
---

# 《Git》

### 查看本地分支
`git branch`

### 创建新分支
`git branch ${branch_name}`

### 切换分支
`git checkout ${branch_name}`

### 创建远程分支
`git push -u origin ${branch_name}`
    
将 <branch_name> 分支的代码推送到 origin 远程仓库中。
如果 origin 远程仓库中不存在同名分支，则在 origin 中创建一个新的同名分支。
建立本地分支 <branch_name> 与远程分支 origin/<branch_name> 之间的跟踪关系。这意味着，在以后的推送和拉取操作中，Git 会自动将本地分支与远程分支同步，从而方便你进行协作开发。
-u 参数是 --set-upstream 的简写形式，它告诉 Git 将本地分支与远程分支建立跟踪关系。一旦建立了跟踪关系，你就可以使用 git pull 或 git push 命令来自动拉取或推送与远程分支同步的代码。
总之，git push -u origin <branch_name> 命令是将本地分支的代码推送到远程仓库，并建立分支之间的跟踪关系的缩写形式。

### 从主分支更新当前分支内容
`git pull origin master`

### 删除分支
本地删除：`git branch -D ${branch_name}`

远程删除：`git push origin --delete ${branch_name}`

### 日志
查看：`git log`

退出：`q或者:q`

### 回滚

> reset

1. git reset --sort：回退到某一个版本，保留暂存区和工作区的修改内容
2. git reset --hard【不推荐】：回退到某一个版本，丢弃暂存区和工作区的修改内容
3. git reset --mixed：回退到某一个版本，保留工作区内容丢失暂存区的修改内容

命令使用： git reset --sort/hard/mixed ${hash值}

### 备份回滚

要在Git中进行远程回滚操作，可以按照以下步骤进行：

首先，使用`git log`命令查看提交记录的完整列表。确定需要回滚到的特定提交的`commit ID`（或者称为SHA值）。

然后，运行以下命令来创建一个新分支并切换到该分支上：

`git checkout -b <new_branch> <commit_id>`

其中，`<new_branch>`是你想要创建的新分支名字，而 `<commit_id>` 则是你希望回滚到的特定提交的 `commit ID`。

接下来，将这个新分支推送到远程仓库：

`git push origin <new_branch>`

最后，如果你认为这次回滚没有问题，可以删除原始分支：

`git branch -D <original_branch>`

注意，`-D`选项会永久性地删除分支，所以请小心使用。

现在，你已经成功地通过远程回滚了指定的提交。

### 操作回溯

git中所有的操作都可以进行回溯，命令如下：

`git reflog` 查看操作的步骤值

然后使用`git reset --hard ${回退值}`