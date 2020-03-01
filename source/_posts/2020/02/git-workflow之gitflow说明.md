---
title: git-workflow之gitflow说明
permalink: git-workflow之gitflow说明
tags:
  - git
  - git-flow
categories:
  - git
keywords: git
toc: true
date: 2020-02-26 16:16:34
---

gitflow规定一个项目有
两个长期存在的分支 **master**, **develop** 
三种临时分支 **feature** ,**hotfix**, **release**  
ps:还可能会有 **bugfix**分支 bugfix 属于一种特殊的 feature 分支

## Git Flow常用的分支

### Production 分支

也就是我们经常使用的Master分支，这个分支最近发布到生产环境的代码，最近发布的Release， 这个分支只能从其他分支合并，不能在这个分支直接修改,每次提交都需要打上对应的**tag**

### Develop 分支

这个分支是我们是我们的主开发分支，包含所有要发布到下一个Release的代码，这个主要合并与其他分支，比如Feature分支

![o_git-workflow-release-cycle-1historical.png](o_git-workflow-release-cycle-1historical.png)

### Feature 分支

这个分支主要是用来开发一个新的功能，一旦开发完成，我们合并回Develop分支进入下一个Release
Feature分支做完后，必须合并回Develop分支, 合并完分支后一般会删点这个Feature分支，但是我们也可以保留

![o_git-workflow-release-cycle-2feature.png](o_git-workflow-release-cycle-2feature.png)

### Release分支

Release分支基于Develop分支创建，打完Release分支后，我们可以在这个Release分支上测试，修改Bug等。同时，其它开发人员可以基于开发新的Feature (记住：**一旦打了Release分支之后不要从Develop分支上合并新的改动到Release分支**)

发布Release分支时，合并Release到Master和Develop， 同时在Master分支上打个Tag记住Release版本号，然后可以删除Release分支了。

![o_git-workflow-release-cycle-3release.png](o_git-workflow-release-cycle-3release.png)

### Hotfix分支

当我们在Production发现新的Bug时候，我们需要创建一个Hotfix, 完成Hotfix后，我们合并回Master和Develop分支，同时在Master上打一个tag,所以Hotfix的改动会进入下一个Release

![o_git-workflow-release-cycle-4maintenance.png](o_git-workflow-release-cycle-4maintenance.png)



