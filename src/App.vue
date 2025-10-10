<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Category from '@/components/Category.vue';
import Channels from './components/Channels.vue';
import Videos from './components/Videos.vue';
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    
    <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Category />
          <Channels />
          <Videos />
        </div>
    </div>
  </section>
  
  <RouterView />
</template>