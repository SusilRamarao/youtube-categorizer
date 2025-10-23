<script setup>

import { ref, defineProps, onMounted, watch } from 'vue';
import Video from './Video.vue';

/*PROPS*/
const props = defineProps({
    channel_data :{
        type: Object
    }
});

let video_data = ref([]);

watch(() => props.channel_data, (newValue, oldValue) => {
    if (newValue) { // Check that the prop has a value
        
        video_data.value = [];
        video_data.value = newValue["videos"];
        console.log("channel data in videos ", newValue);
        //get_videos_data(newValue["videos"]);
    }
});

let video_input = ref('');

const addVideo = (video_input) =>{

        /*
        1. Get the channel youtube link
        2. Using website parser get the og tag icon and on the right side print the name of the channel

        -------------------------------
        | ----                        |
        | |___| Channel name          |
        -------------------------------
        */    
    }


 
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div><h1 class="text-2xl text-center mb-2">Videos </h1></div>
            <div class="border border-gray-100 mb-2"></div>

            <div>
                <form @submit.prevent="addVideo" class="grid grid-cols-4 gap-4">
                    <input class="ml-4 border rounded col-span-3 py-2 px-2 mr-2 mb-2" type="text" id="newTask" name="newTask" v-model="video_input"></input>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
                </form>
            </div>
            <div class="border border-gray-100 mb-2"></div>
                <ul>
                    <li v-for="(video, index) in video_data" :key="video">
                        <div class="grid grid-cols-6 gap-6">

                            <Video :video="video" class="text-black border border-gray-300 hover:border-double hover:bg-gray-100  rounded-lg w-full text-center py-3 mb-3  col-span-5" />
                            
                            <button class="col-span-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteTask(index)" >x</button>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
</template>