<template>
    <div>
        <app-admin-header></app-admin-header>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                <router-link 
                    tag="button" 
                    class="btn btn-lg btn-success"    
                    :to="{name: 'addpost',
                    }">Post Ekle
                </router-link>
                </div>
            </div>
                <ul class="list-group mt-4">
                    <li class="list-group-item"  v-for="(post, postId) in getAllPosts" :key="postId" >
                        <p>Başlık : {{ post.postData.title }}</p>
                        <p>Kategori : {{ getAllCategories[post.postData.categoryKey].categoryData.categoryName }}</p>
                        <p>Açıklama : {{ post.postData.description }}</p>
                        <small>Güncelleme Tarihi : {{ formatDateTime(post.postData.updatedDate) }}</small>
                        <br>
                        <img class="card-img-top" id="img" :src="post.postData.thumbnail" :alt="post.title">
                        <router-link 
                            tag="button" 
                            class="btn btn-md btn-primary ms-5" 
                            :to="{name: 'editpost', params :{postId :postId}}"
                            >Düzenle</router-link> 
                        <button class="btn btn-md btn-danger ms-4" @click="deletePost(postId)">Sil</button>
                    </li>

                </ul> 
        </div>
    </div>
</template>


<script>
import AdminHeader from "../components/AdminHeader.vue"


import { mapGetters } from 'vuex';

export default {

    components :{
        AppAdminHeader : AdminHeader,
    },
    computed: {
    ...mapGetters(['getAllPosts','getAllCategories']), 
    
    },
    created() {
        this.$store.dispatch('getPost');
        this.$store.dispatch('getCategories'); 
        console.log(this.getAllPosts)
    },
    methods : {
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
        deletePost(value) {
        this.$store.dispatch("deletePost", value)
            .then(response => {
            console.log("Post silindi:", response);
            this.$store.dispatch('getPost'); // Verileri güncellemek için tekrar çekin
        })
        .catch(error => {
          console.error("Hata oluştu:", error);
        });
        }
    }
}

</script>

<style>
#img{
    width: auto;
    height: 100px;
}
</style>