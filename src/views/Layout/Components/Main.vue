<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
   position: fixed;
   left: $navMenu;
   top: 60px;
   right: 0;
   bottom: 0;
   padding: 30px;
   padding-left: 30px;
   border: 30px solid #f7f7f7;
   background-color: #fff;
   border-bottom: none;
   -webkit-box-sizing: border;
}
</style>