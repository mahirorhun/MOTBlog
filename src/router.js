import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./pages/Home.vue"
import Admin from "./pages/Admin.vue"
import Post from "./pages/Post.vue"
import Search from './pages/Search.vue'
import Category from "./pages/Category.vue"
import AddPost from "./components/AddPost.vue"
import EditPost from "./components/EditPost.vue"
import PostDetail from "./pages/PostDetail.vue"
import HomeCategoryView from "./pages/HomeCategoryView.vue"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "/search",
          name: "search",
          component: Search,
        },
        {
          path: "/category/:id",
          name: "homeId",
          component: Home,
        },
        {
          path :"/category/:id",
          name: "homeCatId",
          component: HomeCategoryView,
        },
        {
          path: "/post/detail/:id",
          name : "postdetail",
          component : PostDetail
        },
        {
          path: "/admin",
          name: "admin",
          component: Admin,
         
        },
        {
          path: "/admin/post",
          name: "post",
          component: Post,
          beforeEnter(to, from, next){
            if(store.getters.isAuth){
              next()
              
            }else{
              next("/admin")
            }
          }
        
        },
        {
          path: "/admin/category",
          name: "category",
          component: Category,
          beforeEnter(to, from, next){
            if(store.getters.isAuth){
              next()
              
            }else{
              next("/admin")
            }
          }
        },
        {
          path: "/addpost",
          name: "addpost",
          component: AddPost,
          
        },
        {
          path: "/editpost",
          name: "editpost",
          component: EditPost,
        },
        {
          path: "/post",
          name: "homepost",
          component: Post,
         
        },  
      ],
    mode : "history",
})