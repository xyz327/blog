---
title: windows使用oh-my-zsh
date: 2017-04-22 20:49:51
tags: 
categories: [other]
keywords: [windows terminal zsh oh-my-zsh ]
---

开发有时候需要使用terminal,无奈家里电脑还是只能用Windows,但是感觉CMD真的很难用,就是是powershell也不太习惯

公司电脑用deepin oh-my-zsh不能更舒服，就想到能不能在windows上也能装上oh-my-zsh

于是开始一番baidu+google 

## 安装cywin

先装上[cywin](http://cywin.com) 网络太慢的话可以从迅雷下 [32位](http://www.cygwin.com/setup-x86.exe) [64位](http://www.cygwin.com/setup-x86_64.exe)

开始安装，选择从网络安装，太慢的话可以使用国内的源 `http://mirrors.ustc.edu.cn/cygwin/`

***记得安装zsh***

## 安装`oh-my-zsh` 

不知道为什么直接使用`oh-my-zsh`提供的从网络安装总是git clone失败. 于是先手动把`oh-my-zsh`clone到 `$HOME` 目录下 `$HOME`在 `cywin的安装目录/home/用户名`

`git clone https://github.com/robbyrussell/oh-my-zsh.git .oh-my-zsh` 

直接用`oh-my-zsh`提供的安装的文件是不能装上的,自己手动复制里面的命令一个个的在`cywin`的终端里执行

```bash
 # 先设置oh-my-zsh 的目录
 export ZSH=~/.oh-my-zsh
 # 生成zsh的配置文件
 cp $ZSH/templates/zshrc.zsh-template ~/.zshrc

```
此时zsh会报找不到env grep 之类的命令
修改`zsh`的配置文件 `.zshrc` 把第一行修改为下面的
```bash
# If you come from bash you might have to change your $PATH.
 export PATH=/bin:$HOME/bin:/usr/local/bin:$PATH
``` 
ok 打开cmd或者 cywin的终端 输入 `zsh` 

会有挺多bug的，比如有些字符不能显示，

我使用的`gnzh`主题 这是光标会有点bug 比正常的光标后大概3个字符

修改CMD字体  [http://jingyan.baidu.com/article/3a2f7c2e61ec5d26afd611c8.html](http://jingyan.baidu.com/article/3a2f7c2e61ec5d26afd611c8.html)

我使用的是 [dejavu](https://dejavu-fonts.github.io/)

在CMD输入 chcp 437 然后就多出几个可选择的字体了

## 修改HOME目录
此时zsh的用户根目录是在 `cywin安装目录/home/用户名`下的，修改到Windows的用户目录下去

在windows的环境变量设置里面新建一条记录
```
HOME=windows的用户目录
```
并把原来用户目录下的文件都copy到新的用户目录下

现在在cmd或者cywin的终端里面输入zsh. 

以后就win+R 输入zsh吧~

## 安装 `apt-cyg` 

cywin里面类似于`apt-get`的软件包安装工具。立马装上

```bash
wget https://raw.githubusercontent.com/transcode-open/apt-cyg/master/apt-cyg -O apt-cyg
install apt-cyg /bin
```

现在可以用`apt-cyg install vim`来在cywin上安装`vim`了~
