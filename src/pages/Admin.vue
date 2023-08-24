<template>
    <div>
        <app-admin-header></app-admin-header>
        <app-admin-login></app-admin-login>
    </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue"
import AdminLogin from "../components/AdminLogin.vue"
export default {
    components : {
        AppAdminHeader : AdminHeader,
        AppAdminLogin : AdminLogin
    }

}
</script>