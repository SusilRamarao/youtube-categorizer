<script setup>
  import {ref, watch} from 'vue';
  import { RouterLink, RouterView } from 'vue-router'
  import Category from '@/components/Category.vue';
  import Channels from './components/Channels.vue';
  import Videos from './components/Videos.vue';

  const category_selected = ref('');
  const channel_selected = ref('');
  const video_selected = ref('');

  watch(() => category_selected.value, (newValue, oldValue) => {
    if (newValue) { // Check that the prop has a value
        
        console.log("Category changed");
        channel_selected.value = ' ';
        //get_videos_data(newValue["videos"]);
    }
});


</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    
    <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Category @category-selected="category_selected = $event"/>
          <Channels :category="category_selected" @channel-data="channel_selected = $event"/>
          <Videos :channel_data="channel_selected"/>
        </div>
    </div>
  </section>
</template>