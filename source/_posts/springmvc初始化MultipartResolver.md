---
title: springmvc初始化MultipartResolver
date: 2018-04-07 09:47:24
tags: springmvc
categories: [springmvc]
keywords: springmvc spring
---

springmvc 在容器初始化后使用监听ContextRefreshedEvent事件来初始化`DispatcherServlet`中的各种属性
`MultipartResolver`就是其中一个
初始化`MultipartResolver`是从IOC容器里面获取一个名为`multipartResolver`的`MultipartResolver`的Bean

`MultipartResolver`是用于处理HTTP上传文件的请求处理器
springmvc在处理文件上传时,使用`MultipartResolver`把`HttpServletRequest`解析包装成`MultipartHttpServletRequest`对象
`MultipartHttpServletRequest`提供了获取`MultipartFile`的方法

`MultipartHttpServletRequest`接口继承了`HttpServletRequest`
`MultipartFile`提供了获取上传的文件相关属性以及文件流的方法
在Controller中使用`MultipartHttpServletRequest`更方便的处理上传文件

## MultipartResolver

```java
public interface MultipartResolver {
    /**
     * 判断给定的请求是否包含 multipart 内容
     * 通常是检查request的Content-Type是否是 "multipart/form-data" 
     * 实际还是依赖解析器自己的实现
     */
    boolean isMultipart(HttpServletRequest request);

    /**
     * 解析HTTP request 包含的文件和参数并把它们包装到 
     * {@link org.springframework.web.multipart.MultipartHttpServletRequest}对象中
     * 这个接口实现了{@link javax.servlet.http.HttpServletRequest}
     */
    MultipartHttpServletRequest resolveMultipart(HttpServletRequest request) throws MultipartException;

    /**
     * 清理资源，例如存储的上传文件
     */
    void cleanupMultipart(MultipartHttpServletRequest request);
}
```
springmvc为`MultipartResolver`提供了两种实现
 1. `StandardServletMultipartResolver`
    使用HTTPServletRequest自带的解析文件
 2. `CommonsMultipartResolver`
    使用apache commons-io 处理上传的文件
![MultipartResolver实现类](http://7xrv3c.com1.z0.glb.clouddn.com/images/post/springmvc/multipartResolver.png)

## MultipartHttpServletRequest

```java
public interface MultipartHttpServletRequest extends HttpServletRequest, MultipartRequest {
	HttpMethod getRequestMethod();

	HttpHeaders getRequestHeaders();

	HttpHeaders getMultipartHeaders(String paramOrFileName);
}
```
```java
public interface MultipartRequest {
	Iterator<String> getFileNames();

	MultipartFile getFile(String name);

	List<MultipartFile> getFiles(String name);

	Map<String, MultipartFile> getFileMap();

	MultiValueMap<String, MultipartFile> getMultiFileMap();

	String getMultipartContentType(String paramOrFileName);
}
```
`MultipartHttpServletRequest`提供了对于上传文件的快捷访问的方法

springmvc对于`MultipartHttpServletRequest`同样提供了两种实现
 1. `StandardMultipartHttpServletRequest`
 2. `DefaultMultipartHttpServletRequest`
![MultipartHttpServletRequest实现类](http://7xrv3c.com1.z0.glb.clouddn.com/images/post/springmvc/multiparHttpServletRequest.png)

## MultipartFile

```java
public interface MultipartFile extends InputStreamSource {

	/**
     * 返回参数中的文件名(不会为null或空)
	 */
	String getName();

	/**
	 * 返回客户端原来的文件名(没有文件时为空字符串，未定义或不可用时返回null) 
	 */
	String getOriginalFilename();

	/**
	 * 返回Content-Type(没有文件时返回null)
	 */
	String getContentType();

	/**
	 * 是否上传了文件
	 */
	boolean isEmpty();

	/**
	 * 文件大小
	 */
	long getSize();

	/**
	 * 文件的字节数组
	 */
	byte[] getBytes() throws IOException;

	/**
	 * 文件流
	 */
	@Override
	InputStream getInputStream() throws IOException;

	/**
	 * 保存文件
	 */
	void transferTo(File dest) throws IOException, IllegalStateException;

```

springmvc同样提供了两种实现
 1. `StandardMultipartFile`
 2. `CommonsMultipartFile`

 ![MultipartFile实现类](http://7xrv3c.com1.z0.glb.clouddn.com/images/post/springmvc/multipartFile.png)
