<template>
    <div>
        <Header/>
        <Main/>
        <Nav/>
    </div>
</template>

<script>
import Header from './Components/Header.vue'
import Main from './Components/Main.vue'
import Nav from './Components/Nav.vue'
export default {
    name: "Layout",
    data(){

    },
    components: {
        Header,
        Main,
        Nav
    }
}
</script>

<style lang="scss" scoped>

</style>