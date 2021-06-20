---
title: sentinel学习笔记-1

date: 2018-12-27 22:19:40
tags: sentinel
categories: sentinel
keywords: sentinel
---

# Sentinel

## Sentinel入门

Sentinel 是面向分布式服务架构的轻量级流量控制框架，主要以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度来帮助您保护服务的稳定性。

### 主要特性 
![主要特性](主要特性.png)
<!---more--->

### 开始使用
1. 引入sentinel依赖
```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
    <version>1.4.1</version>
</dependency>
```
2. 定义资源
```java
public static void main(String[] args) {
    // 配置规则.
    initFlowRules();

    while (true) {
        Entry entry = null;
        try {
	    entry = SphU.entry("HelloWorld");
            // 资源中的逻辑.
            // TODO something
            System.out.println("hello world");
	} catch (BlockException e1) {
	    System.out.println("blocked!");
	} finally {
	   if (entry != null) {
	       entry.exit();
	   }
	}
    }
}
```
3. 定义规则
```java
/**
 *  每秒最多只能通过 20 个请求。
 */
private static void initFlowRules(){
    List<FlowRule> rules = new ArrayList<>();
    FlowRule rule = new FlowRule();
    rule.setResource("HelloWorld");
    rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
    // Set limit QPS to 20.
    rule.setCount(20);
    rules.add(rule);
    FlowRuleManager.loadRules(rules);
}
```

4. 注解支持
 在开发时一般不会去写sentinel的控制资源的逻辑,都是由AOP拦截来实现,所以sentinel提供了注解方式`@SentinelResource`的支持  
 **需要添加注解依赖**
 ```xml
 <dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-annotation-aspectj</artifactId>
    <version>x.y.z</version>
</dependency>
 ```
```java
public class TestService {

    // 对应的 `handleException` 函数需要位于 `ExceptionUtil` 类中，并且必须为 static 函数.
    @SentinelResource(value = "test", blockHandler = "handleException", blockHandlerClass = {ExceptionUtil.class})
    public void test() {
        System.out.println("Test");
    }

    // 原函数
    @SentinelResource(value = "hello", blockHandler = "exceptionHandler", fallback = "helloFallback")
    public String hello(long s) {
        return String.format("Hello at %d", s);
    }
    
    // Fallback 函数，函数签名与原函数一致或加一个 Throwable 类型的参数.
    public String helloFallback(long s) {
        return String.format("Halooooo %d", s);
    }

    // Block 异常处理函数，参数最后多一个 BlockException，其余与原函数一致.
    public String exceptionHandler(long s, BlockException ex) {
        // Do some log here.
        ex.printStackTrace();
        return "Oops, error occurred at " + s;
    }
}
```

 ```java
 public @interface SentinelResource {
    /**
     * 资源名称，必需项（不能为空）
     */
    String value() default "";

    /**
     * 入口类型，可选项（默认为 EntryType.OUT）
     */
    EntryType entryType() default EntryType.OUT;

    /**
     * 对应处理 BlockException 的函数名称，可选项。若未配置，
     * 则将 BlockException 直接抛出。blockHandler 函数访问范围需要是 public，
     * 返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外
     * 的参数，类型为 BlockException
     */
    String blockHandler() default "";

    /**
     * blockHandler 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，
     * 则可以指定 blockHandlerClass 为对应的类的 Class 对象，注意对应的函数
     * 必需为 static 函数，否则无法解析。
     */
    Class<?>[] blockHandlerClass() default {};

    /**
     * fallback 函数名称，可选项，仅针对降级功能生效（DegradeException）。
     * fallback 函数的访问范围需要是 public，参数类型和返回类型都需要与原方法相
     * 匹配，并且需要和原方法在同一个类中。业务异常不会进入 fallback 逻辑。
     * 
     * 若 blockHandler 和 fallback 都进行了配置，则遇到降级的时候首先选择 
     * fallback 函数进行处理
     */
    String fallback() default "";
}
 ```