---
title: k8s-初始化集群
#permalink: k8s-初始化集群
tags:
  - k8s
  - kubernetes
categories: []
keywords: 'null'
toc: false
date: 2021-11-14 22:15:22
---

## 初始化机器

VMware 使用[`Centos7`](http://mirrors.ustc.edu.cn/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso)初始化四台机器(2C4G)

```
192.168.1.101 k8s.master01 
192.168.1.111 k8s.node01
192.168.1.112 k8s.node02
192.168.1.199 k8s.base # docker私服加速k8s相关镜像
```

### 设置机器配置(一下使用root用户登录)

#### 允许 iptables 检查桥接流量

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

sudo sysctl --system
```

#### 关闭交换内存

```bash
swapoff -a

# 注释掉 /etc/fstab 中的 #/dev/mapper/centos-swap swap  swap    defaults        0 0
vi /etc/fstab
```

#### 设置centos源

```
sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-Base.repo
```
#### 设置时间同步
```
yum install ntp
# 修改时区
cp -y /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 同步时间
ntpdate ntp.aliyun.com
```
#### 关闭防火墙
```
systemctl stop firewalld.service
```
#### 安装docker

1. 更新包

```
yum install -y yum-utils
```

2. 添加docker 仓库

```
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```



3.设置docker镜像源加速

```
sed -e 's|download.docker.com|mirrors.ustc.edu.cn/docker-ce|g' -i.bak  docker-ce.repo
```

4. 安装docker

```
yum install docker-ce docker-ce-cli containerd.io
```

5. 启动docker

```
systemctl start docker
```

### 安装kubeadmin和kubernetes

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
#
setenforce 0
# 安装 kubelet 和 kubeadm
yum install -y kubelet kubeadm kubectl
# 启动 kubelet 和kubeadm
systemctl enable kubelet && systemctl start kubelet
```

### 准备k8s所需镜像
1. 在每台k8s机器上手动从阿里云拉取然后修改tag
2. 搭建docker私服，把所需镜像上传到私服中。然后修改k8s机器的hosts。把k8s.gcr.io 的域名修改为私服的ip

> 下面使用在每台机器上拉取镜像的操作，每台k8s机器上都要执行以下操作
#### 拉取阿里云镜像并修改为kubeadm所需的镜像
> 在每台k8s机器上都执行这条命令
```shell
for imageName in $(kubeadm config images list); do
    image=${imageName/k8s.gcr.io\//}
    image=${image/coredns\//}
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$image
    docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$image $imageName
    docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$image
done
```
#### 准备网络所需镜像(flannel)
**下载 [kube-flannel.yml](https://raw.githubusercontent.com/flannel-io/flannel/v015.0-rc1/Documentation/kube-flannel.yml)**
默认的flannel镜像地址是`quay.io/coreos/flannel:v0.15.1` 这个地址也是你懂的
所以一样从别的地方拉取然后tag
```
# hub.docker.com 中现在只有015.0-rc1 所以先用这个版本
docker pull flannelcni/flannel:v0.15.0-rc1
docker tag flannelcni/flannel:v0.15.0-rc1 quay.io/coreos/flannel:v0.15.0-rc1
```
###  检查k8s相关镜像是否能够正常拉取 `kubeadm config images pull`
> 现在应该能够正确输出以下内容
```bash
[root@k8s ~]# kubeadm config images pull
[config/images] Pulled k8s.gcr.io/kube-apiserver:v1.22.3
[config/images] Pulled k8s.gcr.io/kube-controller-manager:v1.22.3
[config/images] Pulled k8s.gcr.io/kube-scheduler:v1.22.3
[config/images] Pulled k8s.gcr.io/kube-proxy:v1.22.3
[config/images] Pulled k8s.gcr.io/pause:3.5
[config/images] Pulled k8s.gcr.io/etcd:3.5.0-0
[config/images] Pulled k8s.gcr.io/coredns/coredns:v1.8.4
```

### 修改 cgroup 
kubeadm 推荐使用`systemd` 作为 cgroupdriver ， docker 默认的 cgroupdriver 为 `cgroupfs`
### 修改docker的 cgroupdriver 
> 在 `/etc/docker/daemon.json` 中增加以下内容
```
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
```

### 使用kudeadm初始化k8s集群

#### 初始化`master`节点
```
kubeadm init --pod-network-cidr=10.244.0.0/16
```
#### 添加kubectl认证信息
```
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config 
  # 如果是root 用户
  export KUBECONFIG=/etc/kubernetes/admin.conf
```
#### 初始化网络插件
> 使用flannel  用上面准备好的`kube-flannel.yml`
```
kubectl apply -f kube-flannel.yml
```
#### 初始化worker节点
> 在执行完`kubeadm init`之后控制台会输出以下命令.将以下命令复制到node节点上执行
![image.png](http://cdn.xyz327.cn/FjaY6l99xwPJssBPTcqVENIKv7pv)

#### 验证
```
kubectl get nodes
```
![image.png](http://cdn.xyz327.cn/FgWR9bBOWaOgQ42mB98l5Hy1QDdi)

> 到此k8s集群就已经创建完成了


#### 额外
```
yum remove -y kubeadm kubectl kubelet
```

```
yum install -y kubelet-1.21.7-0 kubeadm-1.21.7-0  kubectl-1.21.7-0 --disableexcludes=kubernetes
```