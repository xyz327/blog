---
title: Sentine默认slot说明
permalink: Sentine默认slot说明
date: 2019-01-13 10:39:23
tags: sentinel
categories: sentinel
keywords: sentinel
---

sentinel是通过slot来实现限流降级等功能，所以slot是sentinel的核心  

sentinel使用`com.alibaba.csp.sentinel.slotchain.SlotChainBuilder`去构建slot的调用链  
默认是使用`com.alibaba.csp.sentinel.slots.DefaultSlotChainBuilder`  
在`com.alibaba.csp.sentinel.slotchain.SlotChainProvider`中使用serviceLoader去加载`slotChianBulder`的实现.有自定义实现就使用自定义实现，没有就使用默认的`DefaultSlotChainBuilder`  
<!--more-->
DefaultSlotChainBuilder中构建的默认slot
```java
public class DefaultSlotChainBuilder implements SlotChainBuilder {
    @Override
    public ProcessorSlotChain build() {
        ProcessorSlotChain chain = new DefaultProcessorSlotChain();
        chain.addLast(new NodeSelectorSlot());
        chain.addLast(new ClusterBuilderSlot());
        chain.addLast(new LogSlot());
        chain.addLast(new StatisticSlot());
        chain.addLast(new SystemSlot());
        chain.addLast(new AuthoritySlot());
        chain.addLast(new FlowSlot());
        chain.addLast(new DegradeSlot());

        return chain;
    }
}
```
DefaultProcessorSlotChain类似链表，所以会按添加顺序依次调用这些slot
## slot作用说明
### NodeSelectorSlot
负责收集资源的路径，并将这些资源的调用路径，以树状结构存储起来，用于根据调用路径来限流降级
### ClusterBuilderSlot
用于构建资源的 ClusterNode 以及调用来源节点。ClusterNode 保持资源运行统计信息（响应时间、QPS、block 数目、线程数、异常数等）以及原始调用者统计信息列表。来源调用者的名字由 Context.enter(contextName，origin) 中的 origin 标记。
### LogSlot
在接下来的插槽链中发生BlockException异常的话,LogSlot会记录日志信息。
### StatisticSlot
是sentienl的指标数据统计插槽，也是sentienl种非常重要的一个模块，sentienl后续的限流，降级，熔断都是根据这一阶段的统计数据进行
统计的数据
1. clusterNode：资源唯一标识的 ClusterNode 的 runtime 统计
2. origin：根据来自不同调用者的统计信息
3. defaultnode: 根据上下文条目名称和资源 ID 的 runtime 统计
4. 入口的统计  
执行过程
先继续执行后面的slot，如果执行成功就增加node的线程数，通过请求数，并依次执行在`StatisticSlotCallbackRegistry`中注册的`ProcessorSlotEntryCallback`的`onPass`回调。
如果执行触发`BlockException`失败就设置错误并新增被拦截的Qps数量，并依次执行`ProcessorSlotEntryCallback`的`onBlocked`
如果其他异常就增加错误的Qps数量

在exit退出时：
成功执行时根据当前时间和entry的createTime计算出rt(response time)，减少node的线程计数
### SystemSlot
SystemSlot主要是用来系统规则的检查，包括平均RT，qps，线程数，系统负载（只是针对linux系统）    
会根据对于当前系统的整体情况，对入口的资源进行调配。其原理是让入口的流量和当前系统的 load 达到一个动态平衡。  
**注意这个功能的两个限制:**

1. 只对入口流量起作用（调用类型为EntryType.IN），对出口流量无效。可通过 SphU.entry() 指定调用类型，如果不指定，默认是EntryType.OUT。
 ```java
 Entry entry = SphU.entry("resourceName"，EntryType.IN);
 ```
2. 只在 Unix-like 的操作系统上生效   

SystemSlot插槽是整个插槽链规则校验的第一个，用于系统规则设置的校验。
检验流程
1. 是否设置了检验规则. 只有设置了规则才会开启检验
2. 检验资源是不是入境`resource`的type为`IN`。不是就不做检验
3. 检查Qps是否超过配置的qps数
4. 检查当初线程数是否超过配置最大线程数
5. 检查响应时间是否超过配置的最大响应时间
6. 检查系统负载是否超标(BBR算法)
### AuthoritySlot
根据配置的黑白名单和调用来源信息，来做黑白名单控制
### FlowSlot
根据预设的限流规则以及前面 slot 统计的状态，来进行流量控制；
主要根据预设的资源的统计信息，按照固定的次序，依次生效。如果一个资源对应两条或者多条流控规则，则会根据如下次序依次检验，直到全部通过或者有一个规则生效为止:

指定应用生效的规则，即针对调用方限流的；
调用方为 other 的规则；
调用方为 default 的规则。
### DegradeSlot
通过统计信息以及预设的规则，来做熔断降级；
从clusterNode中获取信息判断是否熔断降级
判断的类型有三种
1. DEGRADE_GRADE_RT 根据响应时间
2. DEGRADE_GRADE_EXCEPTION_RATIO 根据时间间隔(默认一秒钟)内业务异常比例
3. DEGRADE_GRADE_EXCEPTION_COUNT 根据前一分钟的业务异常的数量