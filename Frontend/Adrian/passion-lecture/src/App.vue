<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
  <div>
    <Header></Header>
    <router-view/>
    <Footer/>
  </div>

</template>

<style scoped>


</style>
