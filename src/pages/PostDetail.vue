<template>
    <div>
        <app-home-header></app-home-header>
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                <app-post-view :Id="this.$route.params.id" ></app-post-view>
            </div>
            <div class="col-sm-4">
                <app-side-bar :category="this.$route.query.category" :Id="this.$route.params.id"></app-side-bar>
            </div>
            </div>
            
            
        </div>
        
    </div>
</template>


<script>
import HomeHeader from '../components/HomeHeader.vue';
import PostView from '../components/PostView.vue';
import SideBar from '../components/SideBar.vue';

export default {
    components : {
        appHomeHeader : HomeHeader,
        appPostView : PostView,
        appSideBar : SideBar
    },
    
}

</script>

