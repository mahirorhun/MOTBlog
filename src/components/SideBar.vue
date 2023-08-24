<template>
    <div class="card shadow"> 
        <!-- <p>{{ this.category }} {{ this.Id }}</p> -->
        <ul class="list-group mt-4 text-center">
            <h3 class="text-center">Benzer Postlar</h3>
                <li class="list-group-item" v-for="(post, postId) in getAllPosts" :key="postId" >
                <div v-if="post.postData.categoryKey === category && postId !== Id">
                <h5>{{ post.postData.title }}</h5>
                <p><strong>Kategori :</strong> {{ getAllCategories[post.postData.categoryKey].categoryData.categoryName }}</p>
                <p>{{ post.postData.description }}</p>
                <small><strong>Güncelleme Tarihi :</strong> {{ post.postData.updatedDate }}</small>
                <br>
                <img class="img-fluid" id="img" :src="post.postData.thumbnail" :alt="post.title">
                    <router-link 
                    tag="button"
                    class="btn btn-md btn-success "
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
</template>




<script>
import { mapGetters } from 'vuex';

export default {  
    
    props : ["category", "Id"],
    computed: {
        ...mapGetters(['getAllPosts','getAllCategories']),
        // filtredData(){
        //     const allPostsArray = Object.values(this.getAllPosts);
        //     return allPostsArray.filter(post=>post.postData.categoryKey === this.category && this.postId !== this.Id );
        // }

 
    },
    created() {
        this.$store.dispatch('getPost');

       

      
       
    },
    
}

</script>

<style>
.list-group-item:empty{
    display:none !important;
}
</style>