---
title: k8s-搭建docker私服用于加速镜像访问
#permalink: k8s-搭建docker私服用于加速镜像访问
tags: []
categories: []
keywords: 'null'
toc: false
date: 2021-11-16 22:45:11
---

### 搭建docker私服

> 推荐直接本地从阿里云pull 然后重新tag 

在`k8s.base(192.168.1.199)` 上也安装并启动docker

#### 启动nexus3

```
# 以root用户启动(需要开启80端口)
# 除8081外，再暴露 80(docker pull) 和9001(docker push) 两个端口
docker run -u root -d -p 8081:8081 -p 9001:9001 -p 80:80 --name nexus sonatype/nexus3
```

#### 配置nexus

1. 获取密码
   
   ```
   docker exec nexus cat /nexus-data/admin.password
   ```
2. 访问[192.168.1.199:8081](192.168.1.199:8081)并登录
3. 开启docker访问
  ![image.png](http://cdn.xyz327.cn/Fuev5YOCzBBBzAIUOupP2HeuELNX)
5. 创建docker hosted 仓库 并设置9001端口
  ![image.png](http://cdn.xyz327.cn/FnNPUHq6v9t_kxC0am37s78WQB_N)
6. 创建docker group 仓库 设置端口并加入docker hosted仓库
  ![image.png](http://cdn.xyz327.cn/Fqt86oAYZps7qKsygt3_PXfH3JPi)

### docker配置私服地址 (所有k8s和私服机器上都执行)
在 `/etc/docker/daemon.json` 中增加以下内容(没有就新建文件)
```json
{
  "insecure-registries" : ["192.168.1.199:9001", "192.168.1.199"]
}
```

### 准备k8s所需镜像(上传到docker私服中)
1. 在 k8s.master01上执行` kubeadm config images list` 获取所需镜像

> 把以下shell命令写入shell文件中再执行。就可以上传所需镜像到私服中
```shell
echo '输入私服地址'
read registryAddr
images=$(kubeadm config images list);
for imageName in $images; do
    image=${imageName/k8s.gcr.io\//}
    image2=${image/coredns\//}
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$image2
    docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$image2 $registryAddr/$image
    docker push $registryAddr/$image
    docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$image2
done
```
### 配置k8s机器的hosts
```bash
vi /etc/hosts
```
```
# 增加以下内容
192.168.1.101 k8s.master01
192.168.1.111 k8s.node01
192.168.1.112 k8s.node02
192.168.1.199 k8s.base k8s.gcr.io gcr.io quay.io
```