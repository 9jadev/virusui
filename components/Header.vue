<template>
    <div class="header">
        <div class="header-mobile">
            <div class="hamb float-left" v-b-toggle.sidebar-mobile>
                <span class="menuicon"></span>
                <span class="menuicon"></span>
                <span class="menuicon"></span>
            </div>
            <div class="float-right">
                <img src="@/static/Landscapelogo.png" alt="Billstonic" class="logoimage">
                <!-- <b-icon icon="chevron-down" variant="primary" aria-hidden="true"></b-icon> -->
                <b-dropdown size="lg"  variant="link" class="dropicon" toggle-class="text-decoration-none" no-caret>
                    <template #button-content>
                        <b-icon icon="chevron-down" variant="primary" aria-hidden="true"></b-icon>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <b-sidebar id="sidebar-mobile" width="180px" backdrop shadow>
            <div class="px-3 py-2">
                <Sidebarbox/>
            </div>
        </b-sidebar>
        <div class="header-full">
            <b-navbar toggleable="lg" type="dark" variant="white">
                <b-navbar-brand href="#">{{ $auth.user.name }} </b-navbar-brand>
                <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>                 -->
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <img src="@/static/icon.png" alt="Billstonic" class="profile-img">
                            <b-icon icon="chevron-down" variant="primary" aria-hidden="true"></b-icon>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-navbar>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .profile-img {
        width: 134px;
        height: 47px;
    }
    .logoimage {
        width: 50px;
        height: 50px;
        margin: 6px;
    }
    .navbar-brand {
        color: #000;
        font-size: 15px;
    }

</style>
<script>
    import swal from 'sweetalert';
    import Sidebarbox from "~/components/dashboard/Sidebarbox";
    export default {
        components: {
            Sidebarbox
        },
        methods: {
            logout() {
                swal({
                    title: "Confirm",
                    text: "Are you sure you want to Log out ?",
                    icon: "warning",
                    button: "Continue",
                }).then((res) => {
                    if (res == true) {
                    this.$auth.logout()
                    }
                });
            }
        }
    }
</script>