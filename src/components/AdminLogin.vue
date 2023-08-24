<template>
    <div>
        <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border">
                <h3 class="text-center mb-3 mt-3">Admin Panel Giriş</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta</label>
                        <input v-model="user.email" type="email" class="form-control"
                               placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Şifreniz">
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit"
                                class="btn btn-block btn-primary mt-2">
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null
                },
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("login",{...this.user})
                    .then(response=>{
                        this.$router.push("/admin/post")
                    })
                
            }
        }
    }
</script>

<style></style>