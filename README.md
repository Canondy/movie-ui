# Vue 3 + Vite

# vant_test-master（是Vue移动端教程）

## 运行项目
```nodemon
npm run dev
```

## 项目概要：使用Python的scrapy框架从豆瓣评分前250名的电影进行数据采集，存入到Mysql数据库，使用Java提供后端接口，前端使用Vue3

### 使用的编程语言：Python + Java + JavaScript

### 框架：Python(scrapy)  Java(SpringBoot)  JavaScript(Vue3)

### 这里只是电影项目的前端代码，手机端h5页面，使用Vite+Vue3脚手架构建


# 电影应用前端项目检查报告
## 1. 项目概览
这是一个基于Vue 3 + Vite + Vant开发的移动端电影应用前端项目，主要功能包括电影列表展示、电影详情查看、用户登录注册等。

## 2. 项目结构分析
项目采用标准的Vue 3 + Vite脚手架结构，包含以下主要模块：

- src/api/ : 网络请求接口
- src/components/ : 可复用组件
- src/views/ : 页面视图组件
- src/router/ : 路由配置
- src/store/ : Vuex状态管理
- src/utils/ : 工具函数
- src/assets/ : 静态资源文件
## 3. 核心技术栈
- 前端框架 : Vue 3
- 构建工具 : Vite
- UI组件库 : Vant 3.x
- 路由管理 : Vue Router 4.x
- 状态管理 : Vuex 4.x
- HTTP客户端 : Axios
- 移动端适配 : amfe-flexible + postcss-pxtorem
## 4. 主要功能模块
### 4.1 首页 (Home)
- 实现了电影列表展示功能
- 支持下拉加载更多数据
- 包含空状态和加载状态处理
- 点击电影卡片可跳转到详情页
### 4.2 我的页面 (My)
- 包含用户登录/注册功能
- 支持手机号验证码登录
- 登录后显示用户信息和功能菜单
- 实现了退出登录功能
### 4.3 订单页面 (Order)
- 当前为简单的占位页面
- 未实现具体的订单功能
### 4.4 电影详情页 (MovieDetail)
- 展示电影的详细信息
- 包含海报、评分、描述、演员、导演等信息
- 支持返回上一页功能
## 5. 网络请求模块
- 使用axios进行HTTP请求
- 配置了请求拦截器，处理Token认证
- 配置了响应拦截器，统一处理错误
- 支持代理转发到后端服务
## 6. 路由配置
- 使用Vue Router 4.x
- 实现了嵌套路由结构
- 包含首页、我的页面、订单页面和电影详情页路由
- 全局导航守卫被注释，未启用权限控制
## 7. Vuex状态管理
- 实现了基础的用户状态管理
- 包含用户信息的存储和读取
- 数据持久化存储在localStorage