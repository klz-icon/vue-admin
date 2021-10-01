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
- 导航折叠、header的编写
![在这里插入图片描述](https://img-blog.csdnimg.cn/b51fb76334484d2699d939641c47512f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)
----------------------------------------------------



### 导航折叠

- 导航折叠
- 左侧栏折叠
- header折叠
- 主面板折叠

#### store存折叠按钮的状态

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
/**
 别的文件调用store
    this.$store.state.isCollapse      //获取原值
    this.$store.getters.isCollapse    //获取处理过的值
    this.$store.commit('SET_ISCOLLAPSE',true) //修改state里面参数的值
 */
export default new Vuex.Store({
  //state用来存储参数
  state: {
    isCollapse: false
  },
  mutations: {      //修改state里面参数的值
    //函数名以SET_参数名大写
    SET_ISCOLLAPSE(state, value) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {},
  getters: {    //相当于computed
    isCollapse: () => !state.isCollapse
  }
});

```

#### Header.vue中给折叠按钮添加事件

```
  //添加事件
   <div class="pull-left header-icon" v-on:click="toggleMenu">
      <svg-icon  :iconClass="foldMenu" :className="foldMenu" />
    </div>
    
    //修改isCollapse的值而修改折叠按钮的方向
      methods: {
      toggleMenu(){
          this.$store.commit('SET_ISCOLLAPSE')
         //  console.log("foldmenu:"+this.$store.state.isCollapse)
          if(this.$store.state.isCollapse){
              this.foldMenu = 'fold-right'
          }else{
              this.foldMenu = 'fold-left'
          }
      }
  },
```



#### Nav.vue中el-menu上添加 :*collapse*="isCollapse"

```vue
 computed: {
    isCollapse: {
      get() {
        return this.$store.state.isCollapse;
      },
    },
  },
```

导航折叠完成了



#### 左侧栏、header、main折叠

在index.vue添加menuState通过isCollapse的值控制样式

```vue
<template>
    <div id="layout" :class="[menuState? 'close': 'open']">
        <Header/>
        <Main/>
        <Nav/>
    </div>
</template>


  computed: {
        menuState: {
            get(){
                return this.$store.state.isCollapse;
            }
        }
    }
```

在Nav.vue添加

```
.open {
    .main-content { padding-left: $navMenu + 30; }
}
.close {
    .main-content { padding-left: $navMenuMin + 30; }
}
```

在Header.vue添加

```
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: 64px;
  }
}
```

在Main.vue添加

```
.open {
    .main-content { padding-left: $navMenu + 30; }
}
.close {
    .main-content { padding-left: $navMenuMin + 30; }
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b51fb76334484d2699d939641c47512f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e14f1ecb50004ed69ba91a790ec6d455.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IeqJuWmgg==,size_20,color_FFFFFF,t_70,g_se,x_16)

每当我们刷新时，初始的isCollapse总是未折叠状态，可以用cookie存isCollpase,怎么操作





