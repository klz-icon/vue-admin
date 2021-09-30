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


### 导航

遍历路由的导航，下面的只是一种写法，根据需求去修改路由和路由的遍历，也可以在meta下自定义图标

![在这里插入图片描述](https://img-blog.csdnimg.cn/62b3e14ad67142e1a93b70cf93e40baf.png)



- router下的index.js下的路由

```js
const routes = [

  {
    path: "/",
    nmae: "Layout",
    redirect: "/home",
    meta: {
      name: "控制台"
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          name: "首页"
        },
        component: () => import("../views/home/index.vue"),
      }
    ]
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      name: '博客',
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: 'articleManage',
        component: () => import('@/views/blog/articleManage/index'),
        name: 'ArticleManage',
        meta: { name: '博客管理'}
      }, {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/blog/classify/index'),
        meta: { name: '分类管理'}
      }, {
        path: 'writeBlog',
        name: 'WriteBlog',
        component: () => import('@/views/blog/writeBlog/index'),
        meta: {name: '写博客'}
      },
    ]
  },
  // {
  //   path: "/",
  //   redirect: "login"
  // },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登录"
    },
    hidden: true,
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      name: "注册"
    },
    hidden: true,
    component: () => import("../views/register/index.vue")
  },
  {
    path: "/repassword",
    name: "RePassword",
    meta: {
      name: "重置密码"
    },
    hidden: true,
    component: () => import("../views/rePassword/index.vue")
  },

];
```



- 获取到路由的信息

```vue
  data() {
    return {
      routes: [],
    };
  },
  created() {
    let that = this;
    that.routes = that.$router.options.routes;
    console.log(that.routes);
  },
```

- 遍历路由

  - 需要的效果不一样遍历写的也不一样

  - 借助template进行遍历

```vue
        <el-menu
      default-active="1"
      background-color="transparent"
      active-text-color="#409EFF"
      class="el-menu-vertical-demo"
      router
    >
      <!-- 遍历路由 -->
      <template v-for="(item, index) in routes">
        <!-- 只遍历未隐藏并且有子路由不为空的的路由 -->
        <template v-if="!item.hidden && item.children">
          <!-- 判断子路由是否为1-->
          <el-menu-item
            v-if="item.children.length === 1"
            :key="item.children.id"
            :index="item.children[0].path"
          >
            <!-- 显示子路由的名称 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.children[0].meta.name }}</span>
            </template>
          </el-menu-item>

          <!-- 子路由不为1的路由 -->
          <el-submenu v-else :key="item.id" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.meta.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-menu-item
                v-if="!subItem.hidden"
                :key="subItem.id"
                :index="subItem.path"
                >{{ subItem.meta.name }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
```

- 在el-menu中启用router会按照路径(也就是倒焊组件上的index绑定的值)跳转到不同的路由

![在这里插入图片描述](https://img-blog.csdnimg.cn/8d406d886a9846e691ccafc555308f24.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)



- 当选中导航高亮，也就是修改导航的背景和文字颜色

- 需要将样式写到全局专门写一个element-ul.css来写全局element-ui的样式

```css
// 当子路由为1时就是用el-menu-item
// 样式
.el-menu-item {
    font-size: 14px;
    &.is-active { background-color: #c6c6c6 !important; }
}

// 子路由大于1时
// 修改一级菜单样式,可以不要
// li.el-submenu {
//     &.is-active.is-opened .el-submenu__title { background-color: hotpink !important; }
// }
// 子菜单的样式
.el-submenu .el-menu-item {
    font-size: 14px;
    padding-left: 50px !important;
    // &.is-active { background-color: rgba(245, 108, 108, 0.2) !important; }
    &.is-active { background-color: #c6c6c6 !important; }
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cd940477c088465aac7381435f64891c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/806307e8ee864acc94c13f80bca96e83.png)