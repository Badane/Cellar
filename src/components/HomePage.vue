<script>
  // external
  import { ContentLoader } from 'vue-content-loader'
  // internal
  import Dinosaurs from './Dinos.vue'

  export default {
    components:{
      Dinosaurs,
      ContentLoader
    }
  }
</script>

<template>
  <div>
    
  </div>
  <Suspense>
    <template #default>
      <Dinosaurs/>
    </template>
    <template #fallback>
      <content-loader
        width="200"
        height="100"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#9e9e9e">
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="20" cy="20" r="20" />
      </content-loader>
    </template>
  </Suspense>
</template>

<style scoped>
</style>