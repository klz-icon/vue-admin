<template>
  <div id="navbar-wrap">
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
        <template v-if="!item.hidden && item.children" >
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
                :index="item.path+'/'+subItem.path"
                >{{ subItem.meta.name }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>


<script>
export default {
  name: "Nav",
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
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#navbar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  // vh是基于屏幕算的50vh是半个屏幕
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
}

.el-menu-vertical-demo {
  text-align: left;
}

.el-menu-item is-active{
  background-color: lightpink;
}
</style>