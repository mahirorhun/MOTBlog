<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
      <div class="container">
        <a class="navbar-brand" href="#">Admin Panel</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link
            class="nav-item" 
            tag="li"
            to="/admin/post">
            <a class="nav-link" href="#">POST</a>
          </router-link>
          <router-link
            class="nav-item" 
            tag="li"
            to="/admin/category">
            <a class="nav-link" href="#">CATEGORY</a>
          </router-link>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
          <li class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  </template>
  <script>
    export default {
      methods: {
        logout() {
            this.$store.dispatch("logout")
        }
      },
      computed: {
        logoutClass() {
          return {
            'd-none': !this.$store.getters.isAuth 
          }
        }
      }
    }
  </script>
  