<template>
    <div>
        <app-home-header></app-home-header>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                </div>
            </div>
            <ul class="list-group mt-4">
                <li class="list-group-item" v-for="(post, postId) in getAllPosts" :key="postId" >
                <div v-if="post.postData.categoryKey === $route.params.id ">
                <p>Başlık : {{ post.postData.title }}</p>
                <p>Kategori : {{ getAllCategories[post.postData.categoryKey].categoryData.categoryName }}</p>
                <p>Açıklama : {{ post.postData.description }}</p>
                <small>Güncelleme Tarihi : {{ formatDateTime(post.postData.updatedDate) }}</small>
                <br>
                <img class="card-img-top img-fluid" id="img" :src="post.postData.thumbnail" :alt="post.title">
                    <router-link 
                    tag="button"
                    class="btn btn-md btn-success"
                    :to="{
                        name: 'postdetail', 
                        params: {
                            id : postId },
                        query: {
                            category : post.postData.categoryKey
                        }
                        }">İncele</router-link>
                </div>
                </li>
            </ul> 
        </div>
    </div>
</template>


<script>
import HomeHeader from '../components/HomeHeader.vue';
import { mapGetters } from 'vuex';

export default {

    components : {
        appHomeHeader : HomeHeader,

    },

    computed: {
    ...mapGetters(['getAllPosts','getAllCategories']),
    filtredPosts(){
        return this.getAllPosts.filter((post)=>post.postData.category === this.category)
    } 
    },
    created() {
        this.$store.dispatch('getPost'); 
        this.$store.dispatch('getCategories');

    },
    methods: {
        formatDateTime(dateTime) {
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            };
            return new Date(dateTime).toLocaleString("tr-TR", options);
        },
    }
    
}

</script>

<style>
#img{
    width: 50%;
    height: 50%;
}
.list-group-item:empty{
    display:none !important;
}
</style>