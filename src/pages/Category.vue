<template>
    <div>
        <app-admin-header></app-admin-header>
        <app-add-category></app-add-category>
        <hr>
        <app-edit-category></app-edit-category>

    </div>
</template>


<script>
import AdminHeader from "../components/AdminHeader.vue"
import addCategory from "../components/addCategory.vue";
import EditCategory from "../components/EditCategory.vue";

export default {
    components :{
        AppAdminHeader : AdminHeader,
        AppAddCategory : addCategory,
        AppEditCategory : EditCategory
    }
}
</script>