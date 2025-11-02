<script setup>
    import { ref, defineProps, onMounted, watch } from 'vue';
    import axios from 'axios';
    import Channel from './Channel.vue';

    /*PROPS*/
    const props = defineProps({
        category:{
            type: String
        }
    });

    /*EMITS*/
    
    const emit = defineEmits(['channel-data']);

    const emitChannelIndex = (index) => {

        console.log(`channel index selected`, channel_data.value[index]);
        emit('channel-data', channel_data.value[index]);
    }

    //Common variables
    let category_selected = ref('');
    const channel_data = ref([]); // Make this reactive
    const category_input = ref(''); // Add missing ref

    // Watch a single prop
    watch(() => props.category, (newValue, oldValue) => {
        if (newValue) { // Check that the prop has a value
            
            category_selected = newValue;
            get_channel_data(newValue);
        }
    });


    function get_channel_data(value) {
        
        channel_data.value = [];
        let yt_data = ref('');

        try{
            // Try to load from localStorage first
            const savedData = localStorage.getItem('categoriesData');
            
            if (savedData) {
                yt_data.value = JSON.parse(savedData);
            }

            // Populate category list
            for(let category of yt_data.value.categories){

                if(category["name"] === category_selected)
                {
                    for(let channel of category["channels"]){

                        channel_data.value.push(channel);
                    }
                }
            }

        }catch(error){
            console.error("Error fetching jobs", error);
        }
    }

    const addChannel = (channel_link) =>{

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
            <div><h1 class="text-2xl text-center mb-2">Channels ({{ category_selected }})</h1></div>
            
            <div class="border border-gray-100 mb-2"></div>
            
            <div>
                <form @submit.prevent="addChannel" class="grid grid-cols-4 gap-4">
                    <input class="ml-4 border rounded col-span-3 py-2 px-2 mr-2 mb-2" type="text" id="newTask" name="newTask" v-model="category_input"></input>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
                </form>
            </div>
            <div class="border border-gray-100 mb-2"></div>
            <ul>
                <li v-for="(channel, index) in channel_data" :key="channel">
                    <div class="grid grid-cols-6 gap-6">

                        <Channel :channel="channel" :index="index" @selected_index="emitChannelIndex" class="text-black border border-gray-300 hover:border-double hover:bg-gray-100  rounded-lg w-full text-center py-3 mb-3  col-span-5"/>
                        
                        <button class="col-span-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteTask(index)" >x</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<!--div class="grid grid-cols-6 gap-6">
                <Channel v-for="(channel, index) in channel_data" :key="channel" :channel="channel" class="text-black border border-gray-300 hover:border-double hover:bg-gray-100  rounded-lg w-full text-center py-3 mb-3 col-span-5">
                    <button 
                        type="submit" 
                        @click="selectChannel(channel)"
                        >
                    </button>
                </Channel>
                <button class="col-span-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteTask(index)" >x</button>
            </div-->