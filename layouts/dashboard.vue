<template>
    <div class="container-fluid">
        <div class="sidebar">
            <Sidebar />
        </div>
        <div class="mainbar">
            <Header />
            <Nuxt />
         </div>
    </div>
</template>
<script>

import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
export default {
    components: {
        Header,
        Sidebar
    }
}
</script>
<style lang="scss" scoped>
    .sidebar {
        height: 100%;
        width: 20%;
        background: $tablecolor;
        display: block;
        position: fixed;
        @media (max-width: 600px) {
            display: none;
        }
    }
    .container-fluid {
        position: fixed;
        height: 100%;
        padding-left: 0px;
        padding-right: 0px;
    }
    .mainbar {
        width: 80%;
        margin-left: 20%;
        position: fixed;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        @media (max-width: 600px) {
            margin-left: 0px;
            width: 100%;
        }
    }
</style>