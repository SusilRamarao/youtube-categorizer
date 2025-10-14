<script setup>
    import { ref, defineProps, onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        category:{
            type: String
        }
    });

    const channel_input = ref('');
    const channel_list = ref([]);
    const category_selected = ref(props.category); //get from other view
    let channel_data = ref({});

    const addChannels = (channel_link) =>{

        /*
        1. Get the channel youtube link
        2. Using website parser get the og tag icon and on the right side print the name of the channel

        -------------------------------
        | ----                        |
        | |___| Channel name          |
        -------------------------------
        */ 
    }

    onMounted( async => {

        console.log('category', props.category);
    }); 

</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div><h1 class="text-2xl text-center mb-2">Channels</h1></div>
            
            <div class="border border-gray-100 mb-2"></div>
            
            <div>
                <form @submit.prevent="addChannels" class="grid grid-cols-4 gap-4">
                    <input class="ml-4 border rounded col-span-3 py-2 px-2 mr-2 mb-2" type="text" id="newTask" name="newTask" v-model="category_input"></input>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
                </form>
            </div>
            <div><h2 class="text-2xl text-center mb-2 my-2"> {{ category }}</h2></div>
            <div class="border border-gray-100 mb-2"></div>
            <ul>
                <li v-for="(channel, index) in channel_list" :key="task">
                    <button 
                    type="submit" 
                    @click="listYtChannels(category)"
                    class="text-black border border-gray-300 hover:border-double hover:bg-gray-100  rounded-lg w-full text-center py-3 mb-3">
                        {{ category }}
                    </button>
                <!--button @click="deleteTask(index)">x</button-->
                </li>
            </ul>

        </div>
    </div>
</template>