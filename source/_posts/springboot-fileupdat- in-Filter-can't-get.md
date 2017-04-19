---
title: springboot文件上传Filter获取不到文件
date: 2017-04-19 10:51:49
tags: [springboot]
categories: [springboot]
keywords: [springboot filter multipart/form-data]
---

项目需要实现类似nginx反向代理的功能，于是就采用Filter+HttpClient去实现请求转发。

为了开发方便就采用的springboot做测试项目。
```java
@SpringBootApplication
//@ServletComponentScan
@Controller
public class AppTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppTestApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean indexFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(new TestFilter());
        registration.addUrlPatterns("/*");
        return registration;
    }
}
```
Filter里面做匹配Uri后获取`request.getInputStream()`用httpClient转发请求

但是在转发`Content-Type=multipart/form-data`文件上传时，转发后目标服务器总是获取不到正常的payload的请求体

在Filter里面debug发现压根就获取不到文件...

**经过各种google/baidu以及debug后，发现需要在`application.properties`里面添加文件上传的临时路径..**

```
spring.http.multipart.location= /tmp # 上传文件的临时目录
```
