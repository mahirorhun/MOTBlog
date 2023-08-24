import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { router } from "./router"

Vue.use(Vuex);

const store =new Vuex.Store({
    state : {
      timeOutTime : 1200000, 
      token : "",
      apiKey: "AIzaSyCBkMLls85By-93AXL6Fe9C9qexq7Rjz7I",
      baseURL : "https://mot-blog-default-rtdb.europe-west1.firebasedatabase.app",
      posts : {},
      categories : {},

    },



    mutations : {
      setToken(state,idToken){
        state.token = idToken
      },
      clearToken(state){
        state.token = ""
      },
      setPosts(state,posts){
        state.posts = posts
      },
      updatePostData(state, payload) {
        const { postId, updatedPostData } = payload;
        state.posts[postId].postData = { ...updatedPostData };
      },
      setCategories(state, categories){
        state.categories = categories
      },
      updateCatData(state, payload) {
        const { catId, updatedCatData } = payload;
        state.categories[catId].categoryData = { ...updatedCatData };
      },

    },


    actions : {
      initAuth({commit,dispatch}){
        let token = localStorage.getItem("token")
        if(token){
          commit("setToken", token)
          router.push("/admin/post")  //düzenlenmesi lazım
          dispatch("timeOut")
        }else{
          return false
        }
      },

      login({commit, dispatch, state}, authData){
        return Axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + state.apiKey, 
        {email : authData.email, password : authData.password})
        .then((response) => {
          commit("setToken", response.data.idToken)
          localStorage.setItem("token", response.data.idToken)
          dispatch("timeOut")
        })
        .catch((error) => {
          console.error(error);
        });
      },
      logout({commit, dispatch, state}){
        commit("clearToken")
        localStorage.removeItem("token")
        router.replace("/admin")
      },
      timeOut({dispatch, state}){
        setTimeout(()=>{
          dispatch("logout")
        },state.timeOutTime)
      },


       addPost({dispatch,state,commit},postData){
         Axios.post(state.baseURL + "/posts.json", {postData})
         .then(response=>{
           console.log("Gönderi Eklendi:",response);

         })
         .catch(e=>console.log(e))
       },
       getPost({dispatch,state,commit}){
        Axios.get(state.baseURL + "/posts.json")
        .then(response => {
        const posts = response.data;
        commit("setPosts", posts);
      })
      .catch(error => {
        console.error(error);
      });
       },
    
      updatePost({ dispatch, state, commit }, payload) {
        const { postId, updatedPostData } = payload; 
        return Axios.put(state.baseURL + "/posts/" + postId + ".json", {postData : updatedPostData}) 
          .then(response => {
            console.log("Gönderi güncellendi:", response);
            commit("updatePostData", payload);
            dispatch("getPost");
          })
          .catch(error => {
            console.error("Hata oluştu:", error);
            throw error;
          });
      },
      deletePost({ dispatch, state, commit }, postId) {
        Axios.delete(state.baseURL + "/posts/" + postId + ".json")
          .then((response) => {
            console.log("Post silindi:", response);
            dispatch("getPost"); 
          })
          .catch((error) => {
            console.error("Hata oluştu:", error);
          });
      },


      addCategory({state, dispatch, commit}, categoryData){
        Axios.post(state.baseURL +"/categories.json", {categoryData})
        .then(response=>{
          console.log(response) 
          dispatch("getCategories");
        })
        .catch(e=>console.log(e))
      },
      getCategories({dispatch,state,commit}){
        Axios.get(state.baseURL + "/categories.json")
        .then(response => {
        const categories = response.data;
        commit("setCategories", categories);
      })
      .catch(error => {
        console.error(error);
      });
    },
    updateCategories({dispatch,commit,state},payload){
      const { catId, updatedCatData } = payload; 
      return Axios.put(state.baseURL + "/categories/" + catId + ".json", {categoryData : updatedCatData}) 
        .then(response => {
          console.log("Kategori güncellendi:", response);
          commit("updateCatData", payload);
          dispatch("getCategories");
        })
        .catch(error => {
          console.error("Hata oluştu:", error);
          throw error;
        });
    },
    
    deletedCategory({dispatch, commit,state},catId){
      Axios.delete(state.baseURL + "/categories/" + catId.catId + ".json")
          .then((response) => {
            console.log("Cat silindi:", response);
            dispatch("getCategories"); 
          })
          .catch((error) => {
            console.error("Hata oluştu:", error);
          });
    }
  },
    getters : {
      isAuth(state){
        return state.token !== ""
      },
      getAllPosts: state => state.posts,
      getAllCategories : state => state.categories,

    }
  });
  export default store