# vue-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 介绍
vue: vue2.x
脚手架: vuecli4.x

### 目的

- 构建属于自己的vue项目

  - element ui组件的熟练使用
  - svg-icon的使用

  - vue路由的使用
  - vuex的熟练使用
  - axiaos请求的封装
  - vue-config.js的配置

- 表格插件

  - dashtable
  - jqgridr

- 编辑器
  - wangeditor

- 图表
  - echart


  ### Login下的index.vue
  - 基于邮箱的登录
  - 通过邮箱发送验证码
  - 校验、按钮的状态
  - 获取验证码的操作完善
  - 登录的操作未完善

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/636c5523689c4662a113c0ad59bb189e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)


  ### Register下的index.vue
  - 基于邮箱的注册  
  - 通过邮箱发送验证码
  - 校验、按钮的状态
  - 获取验证码的操作完善
  - 注册的操作未完善

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/fe32b44b871e48398f94b58f114fbd52.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)


  ### axios拦截器、跨域

```npm i -s axios```

- 在页面直接用axios发送请求(维护比较麻烦)
- 将axios进行封装配置拦截器和响应器

> 参考文档： http://axios-js.com/zh-cn/docs/

```
# 默认使用的development,可以在package.json中改"dev": "vue-cli-service serve --mode production",
# 此处的/dev-api对应代理的/dev-api
# 定义变量以VUE_APP开头
VUE_APP_BASE_API = /dev-api
```

```
 proxy: {
      //设置代理
      '/dev-api': {
        // target: `${VUE_APP_BASE_API}`,
        target: 'http://old.web-jshtml.cn/vue_admin_api',
        changeOrigin: true,
        ws: true,
        // secure: false, //如果是http接口，需要配置该参数
        //将上面的dev-api变成''
        pathRewrite: {
          '^/dev-api': ''
        }
      }
```

```
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API;
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://old.web-jshtml.cn/vue_admin_api
    timeout: 15000,   // 超时
    // 网络请求接口，假设 5000
    // 1000 2000，
});
```

接口是别人的验证码邮箱验证码接口，此处的axios没有对token进行处理，后续会加