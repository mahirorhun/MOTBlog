<template>
    <div>
        <app-home-header></app-home-header>
        <app-post-list></app-post-list>

    </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue"
import PostList from "../components/PostList.vue";

export default {
    components :{
        appHomeHeader : HomeHeader,
        appPostList : PostList
    }
}
</script>