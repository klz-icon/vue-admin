<template>
    <div id="layout">
        <Header/>
        <Main/>
        <Nav/>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Nav from './components/Nav.vue'
export default {
    name: "Layout",
    data(){
        return{}
    },
    components: {
        Header,
        Main,
        Nav
    }
}
</script>

<style lang="scss" scoped>
#layout{

}
</style>