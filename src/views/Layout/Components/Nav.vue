<template>
  <div id="navbar-wrap">导航</div>
</template>

<script>
export default {};
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
</style>