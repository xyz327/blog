---
title: springmvc学习
date: 2018-03-20 12:18:39
tags:
categories: [springmvc]
keywords: spring springmvc
---
# SpringMvc初始化

Springmvc的入口是`DispatcherServlet`，先从这里看起
`DispatcherServlet`的继承关系图
 ![dispatcherServlet继承图](http://cdn.xyz327.cn/images/post/spring/dispatcher-servlet.png)
<!--more-->

## 初始化

### `DispatchServlet`中的`static`块

在`static`块中加载了一个与`DispatcherServlet`同包下的名为`DispatcherServlet.properties`的配置文件，使用配置文件中的配置作为`DispatcherServlet`运行时的默认策略组件

### init方法

`DispatcherServlet`继承了`HttpServlet`,在web容器初始化后会调用`Servlet#init(ServletConfig)`方法进行初始化

#### 初始化调用流程

1. `javax.servlet.GenericServlet#init(javax.servlet.ServletConfig)`
    将ServletConfig赋值给自身的config属性，使子类可以通过`javax.servlet.GenericServlet#getServletConfig()`获取
2. `org.springframework.web.servlet.HttpServletBean#init()`
    将配置信息设置到`DispatcherServlet`中
    ```java
    //获得web.xml中的contextConfigLocation配置属性，就是spring MVC的配置文件
    PropertyValues pvs = new ServletConfigPropertyValues(getServletConfig(), this.requiredProperties);
    BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
    //获取服务器的各种信息
    ResourceLoader resourceLoader = new ServletContextResourceLoader(getServletContext());
    bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader, getEnvironment()));
    //模板方法，可以在子类中调用(DispatcherServlet没有)，做一些初始化工作，bw代表DispatcherServelt
    initBeanWrapper(bw);
    //将配置的初始化值设置到DispatcherServlet中
    bw.setPropertyValues(pvs, true);

    ```
3. `org.springframework.web.servlet.FrameworkServlet#initServletBean()`
    初始化SpringMvc的Ioc容器
4. `org.springframework.web.servlet.DispatcherServlet#onRefresh()`
    初始化`DispatcherServlet`的各个组件
    ```java
    protected void initStrategies(ApplicationContext context) {
        // 文件上传请求的解析器
        initMultipartResolver(context);
        // 本地化解析器
        initLocaleResolver(context);
        // 主题解析器
        initThemeResolver(context);
        // 通过HandlerMapping，将请求映射到处理器
        initHandlerMappings(context);
        // 通过HandlerAdapter支持多种类型的处理器
        initHandlerAdapters(context);
        // 如果执行过程中遇到异常，将交给HandlerExceptionResolver来解析
        initHandlerExceptionResolvers(context);
        // 直接解析请求到视图名
        initRequestToViewNameTranslator(context);
        // 通过viewResolver解析逻辑视图到具体视图实现
        initViewResolvers(context);
        // FlashMapManager请求重定向数据管理器
        initFlashMapManager(context);
    }
    ```