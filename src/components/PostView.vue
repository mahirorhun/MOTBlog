<template>
    <div class="my-5">
        <h1>{{ getAllPosts[Id].postData.title }}</h1>
        <hr>
        <p>{{ getAllPosts[Id].postData.description }}</p>
        <hr>
        <small>{{ getAllCategories[getAllPosts[Id].postData.categoryKey].categoryData.categoryName }}</small>
        <small>{{ getAllPosts[Id].postData.updatedDate }}</small>
        <hr>
        <img class="img-fluid" :src="getAllPosts[Id].postData.thumbnail" :alt="getAllPosts[Id].postData.title">
        <hr>
        <article>{{ getAllPosts[Id].postData.content }}</article>
        

    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
    props : ["Id"],
    computed: {
    ...mapGetters(['getAllPosts','getAllCategories']), 
    }, 
    created() {
        this.$store.dispatch('getPost'); 
    },
}
</script>

<style>
#img{
    height: auto;
    width: auto;
}
</style>