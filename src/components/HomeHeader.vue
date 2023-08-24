<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <div class="container">
      <router-link
      class="navbar-brand"
      tag="a"
      :to="{name:'home'}" 
      >MOT Blog</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link 
        v-for="(cat, catId) in getAllCategories"
        class="nav-item text-white px-2"
        tag="a"
        :to="{
          name : 'homeCatId',
          params : {
            id : catId
          }}">{{ cat.categoryData.categoryName}}</router-link>
        <!-- <li class="nav-item" v-for="cat in getAllCategories">{{ cat.categoryData.categoryName}}</li> -->
      </ul>
    </div>
      <input minlength="3" v-model="searchText" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-success my-2 my-sm-0" @click="search()" type="submit">Search</button>
    </div>

  </nav>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data(){
      return {
        searchText:""
      }
    },
    computed: {
    ...mapGetters(['getAllCategories', 'getAllPosts']), 
      
    },

    methods: {
      filter(array,gelenarama){
        let filteredData;
        filteredData = array.filter(item => {
            return item.postData.content.toLowerCase().indexOf(gelenarama.toLowerCase()) != -1
            })
              this.$router.push({name:'search', query: {searchedPosts : filteredData}}) 
      },
      search(){
        const entries = Object.entries(this.getAllPosts)
          for (let index = 0; index < entries.length; index++) {
              entries[index][1].postData.keytotv = entries[index][0];
            }
        const allPostsArray = Object.values(this.getAllPosts);
        this.filter(allPostsArray,this.searchText)
      }
    },
    created(){
        this.$store.dispatch('getCategories') 
        this.$store.dispatch('getAllPosts')
    }
  }
</script>