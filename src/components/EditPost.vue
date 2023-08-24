<template>
  <div class="container pt-5">
    <h3>Yazı Düzenle</h3>
    <hr>
    <form @submit.prevent="onSubmitPost">
      <div class="form-group">
        <label>Başlık</label>
        <input v-model="editedPostData.title" type="text" class="form-control" placeholder="Yazının başlığını giriniz...">
      </div>
      <div class="form-group">
        <label>Açıklama</label>
        <input v-model="editedPostData.description" type="text" class="form-control" placeholder="Yazının önizleme metnini giriniz...">
      </div>
      <div class="form-group">
        <label>Yazı</label>
        <textarea v-model="editedPostData.content" cols="30" rows="5" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Görsel Bağlantısı</label>
        <input v-model="editedPostData.thumbnail" type="text" class="form-control" placeholder="Yazının görselini giriniz...">
      </div>
      <div class="form-group">
          <label>Kategori</label>
          <select v-model="editedPostData.categoryKey">
          <option v-for="(category, catId) in getAllCategories" :value="catId">
            {{ category.categoryData.categoryName }}</option>
        </select>
        </div>
      <button @click="$router.push('/')" class="btn btn-danger">İptal</button>
      <button type="submit" class="btn btn-info">Kaydet</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getAllPosts','getAllCategories']),
  },
  data() {
    return {
      editedPostData: {
        title: "",
        description: "",
        content: "", 
        thumbnail: "",
        categoryKey :""
      },
    };
  },
  created() {
    this.$store.dispatch('getCategories') 
    const postId = this.$route.params.postId;
    const post = this.getAllPosts[postId];
    this.editedPostData.title = post.postData.title;
    this.editedPostData.description = post.postData.description;
    this.editedPostData.content = post.postData.content;
    this.editedPostData.thumbnail = post.postData.thumbnail;
    this.editedPostData.categoryKey = post.postData.categoryKey;
  },
  methods: {
    onSubmitPost() {
    const updatedPost = {
      ...this.editedPostData,
      updatedDate: new Date(),
    };
    this.$store.dispatch("updatePost", {
        postId: this.$route.params.postId,
        updatedPostData: updatedPost, 
      })
      .then(() => {
        this.$router.push({ name: "post" });
      })
      .catch((error) => {
        console.error("Hata oluştu:", error);
      });
  },
},
};
</script>
