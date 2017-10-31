---
title: deepin添加开机启动脚本
date: 2017-10-31 15:24:23
tags: 
categories: [linux]
keywords: 
---

公司服务器ip网段与电脑网段不同。于是要通过配置路由去访问。

每次开机都要重新执行一遍添加路由的脚本，

```bash
sudo route add -net 192.168.103.0/24 gw 192.168.8.118
```

于是就把脚本放入开机启动自动执行


只需要在 `/etc/init.d/`文件夹下新建一个文件 

*** 添加执行权限 ***
*** 在文件开头添加 ***

``` bash
#!/bin/bash

### BEGIN INIT INFO
# Provides:          kiway.cn
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: static route service
# Description:       static route daemon
### END INIT INFO

```
*** 消除执行时的警告 ***
