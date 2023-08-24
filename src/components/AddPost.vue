<template>
    <div class="container pt-5">
      <h3>Yazı Ekle</h3>
      <hr>
      <form @submit.prevent="onSubmitPost">
        <div class="form-group">
          <label>Başlık</label>
          <input v-model="post.title" type="text" class="form-control" placeholder="Yazının başlığını giriniz...">
        </div>
        <div class="form-group">
          <label>Açıklama</label>
          <input v-model="post.description" type="text" class="form-control" placeholder="Yazının önizleme metnini giriniz...">
        </div>
        <div class="form-group">
          <label>Yazı</label>
          <textarea v-model="post.content" cols="30" rows="5" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Görsel Bağlantısı</label>
          <input v-model="post.thumbnail" type="text" class="form-control" placeholder="Yazının görselini giriniz...">
        </div>
        <div class="form-group">
          <label>Kategori</label>
          <select v-model="post.categoryKey">
          <option v-for="(category, catId) in getAllCategories" :value="catId" >
            {{ category.categoryData.categoryName }}</option>
        </select>
        </div>
        <button @click="$router.push('/admin/post')" class="btn btn-danger">İptal</button>
        <button type="submit" class="btn btn-info">Kaydet</button>
      </form>
    </div>
  </template>
  <script>
import { mapGetters } from 'vuex';

export default {
    computed: {
    ...mapGetters(['getAllCategories']), 
    
    },
      data(){
        return {
          post : {
            content : "",
            description : "",
            thumbnail : "",
            title : "",
            updatedDate : "",
            categoryKey :""
          }
        }
      },
      methods : {
        onSubmitPost(){
          this.$store.dispatch("addPost",{...this.post, updatedDate : new Date ()})
                    .then(response=>{
                        this.$store.dispatch('getPost');
                        this.$router.push("/admin/post");

                    })
            console.log({...this.post, updatedDate : new Date()}); 
        }
      },
      created(){
        this.$store.dispatch('getCategories') 
      }
    }
  </script>
  