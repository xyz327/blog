---
title: 基于spring的类扫描器
date: 2017-05-18 19:28:29
tags:
categories: [spring ]
keywords: spring
---
有时候想要扫描某一个包下的类，spring提供一个一扫描的类，
`org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider`

这个类的`findCandidateComponents`就是扫描的方法。通过自己继承这个类，再提供类的过滤条件。就可以了

还可以继承它的子类`org.springframework.context.annotation.ClassPathBeanDefinitionScanner`

需要两个过滤设置。因为扫描的时候会过滤两次
第一次是`addIncludeFilter` 添加的条件
第二次是调用`isCandidateComponent(AnnotatedBeanDefinition)`方法

```java
/**
 * Entity的扫描类，提供entity的包
 * 扫描包下 {@link Entity}或{@link Table} 标注的类
 * Created by xyz327 on 17-5-15.
 */
public class ClassPathCacheEntityScanner extends ClassPathScanningCandidateComponentProvider {
    private Logger logger = LoggerFactory.getLogger(getClass());

    ClassPathCacheEntityScanner(BeanDefinitionRegistry registry) {
        super(false);//不使用默认的过滤器
        //添加自己的过滤器
         addIncludeFilter(new AnnotationTypeFilter(Entity.class));
         addIncludeFilter(new AnnotationTypeFilter(Table.class));
    }

    public Set<Class> doScan(String... basePackages) throws ClassNotFoundException {
        Assert.notEmpty(basePackages, "At least one base package must be specified");
        Set<Class> entitySet = new HashSet<>();

        for (String basePackage : basePackages) {
            Set<BeanDefinition> candidates = findCandidateComponents(basePackage);

            for (BeanDefinition candidate : candidates) {
                Class entityClass = ClassUtils.forName(candidate.getBeanClassName(), null);
                entitySet.add(entityClass);
            }
        }
        return entitySet;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected boolean isCandidateComponent(AnnotatedBeanDefinition beanDefinition) {
        return beanDefinition.getMetadata().isConcrete() //是否为具体的类 (非抽象和接口)
            && (beanDefinition.getMetadata().hasAnnotation(Entity.class.getName()) //需要标记 @Entity
            || beanDefinition.getMetadata().hasAnnotation(Table.class.getName())); // 或者标记 @Table
    }

}
```
