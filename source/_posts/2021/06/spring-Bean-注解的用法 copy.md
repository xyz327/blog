---
title: spring @Bean 注解的用法
#permalink: spring @Bean 注解的用法
tags:
  - spring
categories:
  - spring
keywords: 'null'
toc: false
date: 2021-06-17 23:48:47
---

最原始的spring配置都是使用xml文件来作为配置(像下面这样)，但是xml 写起来还是比较繁琐的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="testBean" class="cn.xz.spring.TestBean"/>
</beans>
```

所以在spring 3的时候引入了基于java注解的配置方式，让我们可以使用java类来配置spring的Bean

> @Configuration @Bean @Lazy @DependsOn 等一系列注解

所以上面的xml翻译成java配置的话就像下面这样

```
@Configuration
public static class BeanConfig {

    @Bean
    public TestBean testBean(){
        return new TestBean();
    }
}
```

今天来说一下`@Bean`注解

#### @Bean 使用

1. `@Configuration` 标记的类

> 参考[spring-boot中@Configuration是怎么实现@Bean方法注入的](/2021/06/03/spring-boot中@Configuration是怎么实现@Bean方法注入的/)

2. `@Component`标记的类或普通java类中(称为`Lite Mode`)

> 此时`@Bean`标记的方法将作为一个 `Factory Method`. 但是是不支持在`@Configuration`类中那样的内部`@Bean`方法调用的

```
@Component
    public class BeanConfig {

        @Bean
        public TestBeanA testBeanA() {
            return new TestBeanA();
        }

        @Bean
        public TestBeanB testBeanB() {
            // 在 @Component 类中这样是不支持的! 
            return new TestBeanB(testBeanA());
        }
    }
```

3. 当使用`@Bean`方法返回`org.springframework.beans.factory.config.BeanFactoryPostProcessor`时需要把方法标记为`static`

> 由于`BeanFactoryPostProcessor`在spring的启动时机需要非常的早。所以可能会对当前`@Configuration`类中的`@Autowired`, `@Value`,`@PostConstruct` 等注解产生冲突。
> 如果把返回`BeanFactoryPostProcessor`的`@Bean` 方法设为`static` 那么不需要实例化类就可以调用方法了。这样就能避免上面提到的冲突

```
@Configuration
    public class BeanConfig {

        @Bean
        public static BeanFactoryPostProcessor testBeanFactoryPostProcessor() {
            return new BeanFactoryPostProcessor() {
                public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
                    
                }
            };
        }
    }
```





