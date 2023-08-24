<template>
    <div>
        <app-home-header></app-home-header>
        <appSearchList/>

    </div>
</template>


<script>
import SearchList from '../components/SearchList.vue';
import HomeHeader from "../components/HomeHeader.vue"


export default {
    components :{
        appSearchList : SearchList,
        appHomeHeader : HomeHeader,
        
    }
}
</script>