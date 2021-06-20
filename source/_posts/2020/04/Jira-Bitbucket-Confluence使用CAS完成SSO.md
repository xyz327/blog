---
title: Jira/Bitbucket/Confluence使用CAS完成SSO

date: 2020-04-29 21:35:29
tags:
categories:
keywords: [Jira,SSO,CAS,Bitbucket,Confluence]
---

## [Jira/Bitbucket/Confluence](https://www.atlassian.com/software)

项目代码托管，协作，问题追踪三件套。这三个软件同时使用时可以将用户统一托管给`Jira`管理.  
但是一般公司会有自己的账户体系并且使用了 `CAS` 作为统一登录管理.
这个时候就可以将这三个系统的登录以及用户管理交由`CAS`来完成

## [CAS](https://apereo.github.io/cas)

由耶鲁大学开源的一套单点登录系统  
基于`SAML`协议来做SSO认证. CAS 可以支持多种认证协议.只需要做下简单的配置就行

<!--more-->

## 开始配置(以Jira为例)

> 假设jira的url为 http://jira.xyz327.cn
> CAS的url为 http://cas.xyz327.cn

### 配置CAS支持SAML协议

CAS 支持 `SAML` 具体请参考[官方文档](https://apereo.github.io/cas/5.3.x/installation/Configuring-SAML2-Authentication.html)

#### 增加SAML协议相关依赖

给CAS添加saml相关依赖

```xml
<!--saml 协议-->
<dependency>
    <groupId>org.apereo.cas</groupId>
    <artifactId>cas-server-support-saml-idp-metadata-rest</artifactId>
    <version>${cas.version}</version>
</dependency>
<dependency>
    <groupId>org.apereo.cas</groupId>
    <artifactId>cas-server-support-saml-idp</artifactId>
    <version>${cas.version}</version>
</dependency>
```
#### 给CAS增加IDP的描述文件

SAML默认配置是在 `/etc/cas/saml` 目录下,也可以使用 来手动指定 SAML配置目录
在spring-boot配置文件中增加以下配置

```yml
cas:
  authn:
    saml-idp:
      metadata:
        location: saml
      entity-id: http://cas.xyz327.cn/idp
      scope: http://cas.xyz327.cn
      response:
        credential-type: x509
      attribute-query-profile-enabled: true
  server:
    prefix: http://cas.xyz327.cn
```

> 此时访问 http://cas.xyz327.cn/idp/metadata 就可以看到`CAS`作为`SAML`的`Identity Provider`的metaData信息

### 配置Jira

#### 给Jira安装SSO插件

插件管理里面搜索`SAML Single Sign On`  
[SAML Single Sign On (SSO) Jira SAML SSO](https://marketplace.atlassian.com/apps/1212130/saml-single-sign-on-sso-jira-saml-sso?hosting=server&tab=overview)  
其他两个系统的插件也叫这个名字

#### 配置SSO插件信息

1. 点击页面左边菜单的`SAML Single Sign On`
2. 在弹出框中`Idp Type`选择 `Other SAML Identity Provider`, `Name`和`Description`按自己需求填写.点击下一步
3. 显示Jira作为`SP(Service Provide)`的相关配置,记录好`Metadata URL`的地址.在这里应该是`http://jira.xyz327.cn/plugins/servlet/samlsso/metadata`。点击下一步
4. 下拉选择`I have a metadata URL`，然后填入配置`CAS`的地址`http://cas.xyz327.cn/idp/metadata`,点击`Accpet all`，点击`import`,点击下一步
5. 选择匹配`Jira`userId的属性.使用默认的，点击下一步
6. 选择同步用户到jira的方式,我这边选择`Update Form SAML-Attributes`,从登陆用户的信息中创建用户
7. 勾选`create New User`和`Update non-SAML Provisioned Users`,`Directory for New Users`一栏选择`Jira Internal Directory`, `Full Name Attribute`输入`{username}`,`Email Attribute`输入`{email}`.下拉到`Group Settings`->`User Groups` 点击`Add one` 输入`jira-software-users`.  点击下一步
8. 点击`Skip test & configure manually`
9. 点击`Redirection`并勾选上`Enable SSO Redirect`
10. 点击右上角的`Save Settings`

### 给CAS添加 Jira 服务

```json
{
    "@class": "org.apereo.cas.support.saml.services.SamlRegisteredService",
    "serviceId": "http://jira\\.xyz327\\.cn.*",
    "name": "JIRASAMLService",
    "id": 3,
    "evaluationOrder": 10,
    "metadataLocation": "http://jira.xyz327.cn/plugins/servlet/samlsso/metadata",
    "attributeReleasePolicy": {
        "@class": "org.apereo.cas.services.ReturnAllowedAttributeReleasePolicy",
        "allowedAttributes": [
            "username",
            "email"
        ]
    }
}
```

### 完成配置

此时访问 http://jira.xyz327.cn 就会自动跳转到 http://cas.xyz327.cn   
完成登陆后，如果是第一次登陆就会自动创建用户

### 后记
> 对于Bitbucket 在`Directory for New Users`无法选择`Jira Internal Directory`.多以对于Bitbucket 可以选择不同用户信息.这样就会导致如果用户第一次登陆是登陆bitbucket的话那就会出现找不到用户的错误。可以在PageTemplate里面增加错误提示要求用户第一次登陆时需要先登录Jira/Confluence

贴一个错误的 errorPageTemplate
```
<html>
 <head>
  <title>SAML Single Sign On failed</title>
  $webResourceManager.requireResource("$pluginproperties.pluginkey:resources")
  <meta name="decorator" content="atl.general">
 </head>
  <body class="aui-page-focused aui-page-medium" >
   <div class="aui-page-panel">
    <div class="aui-page-panel-inner">
     <section class="aui-page-panel-content">
      <h1>SAML Single Sign On failed</h1>
      <div>Please contact your administrator       #if($tracker) and provide the tracker-id <b>$tracker</b> #end      or log in at the <a href="$loginurl">login page</a>.</div>
      #if($userid)
       <div class="aui-message error">$userid could not be authorized. This userid is unknown or the user does not have sufficient permissions.</div>
      #end
      #if($message)
       <div class="aui-message error">$message</div>
       <!-- 这里提示用户需要先登录jira -->
       <div class="aui-message error">如果提示找不到用户请先登录<a href="http://jira.xyz327.cn/"><b>jira</b></a></div>
      #end
      #if($stacktrace)
      <a id="show-stacktrace-trigger" data-replace-text="Hide Stack Trace" class="aui-expander-trigger button" aria-controls="stacktrace">Show Stack Trace</a>
      <div class="aui-expander-content" id="stacktrace">$stacktrace</div>
      #end
     </section>
    </div>
   </div>
 </body>
</html>
```