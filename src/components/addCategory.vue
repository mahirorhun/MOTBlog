<template>
    <div class="container">
        <h3>Kategori Ekle</h3>
        <form @submit.prevent="onSubmitCategory">
            <div class="form-group">
                <label>Eklemek İstediğiniz Kategoriyi Girin</label>
                <input v-model="categoryList.categoryName" type="text" class="form-control" placeholder="Kategori giriniz"> 
            </div>
            <div class="form-group">
                <label>Kategori Açıklaması</label>
                <input v-model="categoryList.categoryDesc" type="text" class="form-control" placeholder="Açıklama giriniz"> 
            </div>
            <button class="btn btn-md btn-success">Kategori Ekle</button>
        </form>
    </div>
</template>


<script>

export default {
    data(){
        return {
            categoryList : {
                categoryName: "",
                categoryDesc: "",
            }
        }
    },
    methods:{
        onSubmitCategory(){
            this.$store.dispatch("addCategory",{...this.categoryList})
                    .then(response=>{
                        console.log("kategori eklendi") 
                        this.$store.dispatch('getCategories'); 
                        this.categoryList={}
                    })

            
        }
    }

}
</script>