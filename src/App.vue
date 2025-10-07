<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Component from '@/components/Component.vue';
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    
    <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Component />
          <Component />
          <Component />
        </div>
    </div>
  </section>
  
  <RouterView />
</template>