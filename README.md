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


### 分支
- 该分支在导航的上使用了svg-icon

----------------------------------------------------


### svg的使用

#### 引入全局组件

Vue.component(‘组件名称’， ‘组件代码’)

- 两种编译方式

1、compiler（模板）模式

2、runtime模式（运行时），

vue模块的默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。

![在这里插入图片描述](https://img-blog.csdnimg.cn/7ae6699625eb4101affee5d128841079.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_19,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec198aab03e84306aabe7609bcc1f51c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)



#### icons文件夹

- 在src下创建icons文件夹并且创建两个文件

  - index.js (在该文件下使用全局组件,将SvgIcon.vue当作组件引入到该文件)
  - SvgIcon.vue

  ```js
  import Vue from 'vue';
  import SvgIcon from './SvgIcon.vue';
  Vue.component('svg-icon',SvgIcon)
  ```

- 将icons的index.js(icon的全局组件)引入到main.js文件

  *//引入icon的全局文件*

  ```import "./icons/index.js";``

  

#### 引入svg

- 在SvgIcon.vue引入

```vue
<svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="name"></use>
 </svg>
```

在index.js下引入

```js
//读取指定目录的所有文件,用来读取svg文件夹下存的图标
/**
第一个：目录
第二个：是否遍历子级目录
第三个：定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
```

- 在vue.config.js配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/f673b99ac35743b2824f602a9adf9a10.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)

```js
const svgRule = config.module.rule("svg");     
svgRule.uses.clear();     
svgRule       
  .use("svg-sprite-loader")       
  .loader("svg-sprite-loader")       
  .options({         
    symbolId: "icon-[name]",         
    include: ["./src/icons"]       
  });  
```

- 安装svg用的依赖

``` npm install svg-sprite-loader -S```



#### props

- 一般我们父组件向子组件传递数据，需要把子组件引入到父组件内，但是我们把关于icon的组件做成了全局组件，就不需要引入了

小试牛刀：

```vue
 //在el-menu 后加上
 <svg-icon iconClass="home" className="home"/>
```

SvgIcon.vue

```vue
<template>
  <div>
    <h3>{{ iconClass }}</h3>
  </div>
</template>

<script>
export default {
  name: "SvgIcon",
  props: ["iconClass", "className"],
  data() {
    return {

    };
  },
  created() {
    console.log(this.iconClass);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/801f14a9a5ae41ca910f6d823dfa412f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)

- 对传的数据进行了规定

```vue
props: {
      iconClass: {
          type: String,          //规定传入参数的类型
          default: '',           //默认值
        //   default: () => [],  //默认值是对象的写法
          required: true,         //必须传值进来
        //   validator: (value) => {       //校验
        //       return value >= 0;
        //   }
      },
      className: {
          type: String,
          default: '',
          required: true
      }
  },
```

#### computed

- 计算属性(监听属性变化)，当属性改变时，对属性进行操作有get、set方法，写一个按钮的事件看的很明显

> 参考：https://cn.vuejs.org/v2/api/#computed

> vue中computed(计算属性) 和 watch在实现父子组件props同步时的实际区分: https://blog.csdn.net/weixin_30851867/article/details/99581227?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link

> 子组件methods中获取props的值：https://blog.csdn.net/qq_44235822/article/details/97659201?utm_source=app&app_version=4.16.0&code=app_1562916241&uLinkId=usr1mkqgl919blen





#### svg-icon使用props和computed

- props从父组件获取icon的名称和样式
- computed拼接传过来的icon和名称和样式
- 遇到一个bug，图标和标题串行了

![在这里插入图片描述](https://img-blog.csdnimg.cn/eb8d49426d574962bb398d6f2f94de11.png)



强行设置了svg-icon样式，这个样式太难搞了，详情用浏览器查看源代码里面的样式，我感觉我配的有问题

```vue
<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  float: left;
  margin-top: 15px;
  margin-right: 10px;
  font-size: 20px;
}
</style>
```



#### 代码

SvgIcon.vue

```vue
<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String, //规定传入参数的类型
      default: "", //默认值
      //   default: () => [],  //默认值是对象的写法
      //   required: true, //必须传值进来
      //   validator: (value) => {       //校验
      //       return value >= 0;
      //   }
    },
    className: {
      type: String,
      default: "",
      //   required: true,
    },
  },
  data() {
    return {
      newIconClass: "",
      newClassName: "",
    };
  },
  computed: {
    iconName: {
      get() {
        return `#icon-${this.iconClass}`;       //${}是es6的语法
      },
    },
    svgClass: {
      get() {
        if (this.className) {
          return `svg-icon ${this.className}`;
        } else {
          return `svg-icon`;
        }
      },
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  float: left;
  margin-top: 15px;
  margin-right: 10px;
  font-size: 20px;
}
</style>
```

router的index.js的路由

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
          name: "首页",
          icon: "home"
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
      icon: 'blog'
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: 'articleManage',
        component: () => import('@/views/blog/articleManage/index'),
        name: 'ArticleManage',
        meta: { name: '博客管理', icon: 'blogManage'}
      }, {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/blog/classify/index'),
        meta: { name: '分类管理', icon: 'classify'}
      }, {
        path: 'writeBlog',
        name: 'WriteBlog',
        component: () => import('@/views/blog/writeBlog/index'),
        meta: {name: '写博客', icon: 'writeBlog'}
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

Nav.vue的遍历导航

```vue
 <el-menu
      default-active="1"
      background-color="transparent"
      active-text-color="#303133"
      class="el-menu-vertical-demo"
      router
    >
      <!-- 遍历路由 -->
      <template v-for="item in routes">
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
              <!-- <svg-icon iconClass="home" className="home"/> -->
              <!-- <i class="el-icon-location"></i> -->
              <svg-icon
                :iconClass="item.children[0].meta.icon"
                :className="item.children[0].meta.icon"
              />
              <span class="slot"> {{ item.children[0].meta.name }}</span>
            </template>
          </el-menu-item>

          <!-- 子路由不为1的路由 -->
          <el-submenu v-else :key="item.id" :index="item.path">
            <template slot="title">
              <svg-icon
                :iconClass="item.meta.icon"
                :className="item.meta.icon"
              />
              <span slot="title">{{ item.meta.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-menu-item
                v-if="!subItem.hidden"
                :key="subItem.id"
                :index="item.path + '/' + subItem.path"
              >
                <template slot="title">
                  <svg-icon
                    :iconClass="subItem.meta.icon"
                    :className="subItem.meta.icon"
                  />
                  <span class="slot"> {{ subItem.meta.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
```

element-ui.scss

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
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c8e8aab2cab74524b19e70964601c833.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_13,color_FFFFFF,t_70,g_se,x_16)

