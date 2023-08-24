<template>
    <div class="container">
        <h3>Kategori Listesi</h3>
        <ul class="list-group">
            <li class="list-group-item" 
            v-for="(category, categoryId) in getAllCategories" 
>
            <strong>{{ category.categoryData.categoryName }}</strong>
            <br>
            <label>Kategori Adı</label><br>
            <input v-model="category.categoryData.categoryName" type="text">
            <br>
            <label>Açıklama</label><br>
            <input v-model="category.categoryData.categoryDesc" type="text">
            <br>
            <button @click="editPost(category.categoryData.categoryName,category.categoryData.categoryDesc,categoryId)" class="btn btn-md btn-primary">Düzenle</button> 
            <button class="btn btn-md btn-danger" @click="deleteCat(categoryId)">Sil</button></li>
        </ul>
    </div>
        
    
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return{
            categoryData: {
            }

        }
    },

    computed: {
    ...mapGetters(['getAllCategories']), 
    
    },
    created() {
        this.$store.dispatch('getCategories'); 
        console.log(this.getAllCategories)
    },
    methods:{
        editPost(categoryName,categoryDesc,categoryId){
            this.categoryData.categoryName = categoryName;
            this.categoryData.categoryDesc = categoryDesc;
            const updatedCategory = {...this.categoryData, categoryId};
            console.log(updatedCategory)
            console.log(categoryId)
            this.$store.dispatch("updateCategories",{catId: categoryId, updatedCatData :updatedCategory })
            .then(()=>{

            })
            .catch((error) => {
        console.error("Hata oluştu:", error);
      });
        },
    deleteCat(categoryId){
        this.$store.dispatch("deletedCategory", {catId: categoryId})
        .then(()=>{
            this.$store.dispatch('getCategories'); 
        })
        .catch((e)=>{
            console.log(e) 
        })
    

    }
    }
}
</script>