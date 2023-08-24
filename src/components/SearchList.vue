<template>
    <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                </div>
            </div>
            <ul class="list-group mt-4">
                <li class="list-group-item" v-for="(post,index) in this.$route.query.searchedPosts" :key="index" >
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
                            id : post.postData.keytotv },
                        query: {
                            category : post.postData.categoryKey
                        }
                        }">İncele</router-link>

                </li>
            </ul> 
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {


computed: {
...mapGetters(['getAllCategories','getAllPosts']),
filtredPosts(){
    return this.getAllPosts.filter((post)=>post.postData.category === this.category)
} 
},
created() {
        this.$store.dispatch('getPost'); 

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
</style>