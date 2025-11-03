<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import axios from 'axios';

    const emit = defineEmits(['category-selected']);

    const selectCategory = (category) => {
        emit('category-selected', category)
    }
    
    const category_input = ref('');
    const category_list = ref([]);
    const category_selected = ref('');
    let categories_data = ref({});

    const addCategory = async () => {

        const add_category_result = await axios.post('http://localhost:3001/api/db', {

            category: category_input.value,
            channel: "",
            videos: "",
        });
        
        console.log(add_category_result);
        category_input.value = '';

        loadCategory();
      }; 
    

    const deleteTask = async(categoryName) =>{

        const delete_category_result = await axios.delete('http://localhost:3001/api/db', {

            data: {
                category: categoryName,
                channel: "",
                videos: ""
            }
        });
        
        console.log(delete_category_result);

        loadCategory();
    };

    const loadCategory = async() => {

        category_list.value = [];
        const category_query_result = await axios.get('http://localhost:3001/api/db', {
                params: {
                    category:"All",
                    channel: "",
                    videos: "",
                }
        });

        for(let category of category_query_result.data.results){

            category_list.value.push(category.name);
        }
    }

    onMounted(async () => {

        loadCategory();
    });
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div><h1 class="text-2xl text-center mb-2">Category</h1></div>
            <div class="border border-gray-100 mb-2"></div>
            <div>
                <form @submit.prevent="addCategory" class="grid grid-cols-4 gap-4">
                    <input placeholder="Electronics" class="ml-4 border rounded col-span-3 py-2 px-2 mr-2 mb-2" type="text" id="newTask" name="newTask" v-model="category_input"></input>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
                </form>
            </div>
            <div class="border border-gray-100 mb-2"></div>
            <ul>
                <li v-for="(category, index) in category_list" :key="task" class = "grid grid-cols-6 gap-6">
                    <button 
                    type="submit" 
                    @click="selectCategory(category)"
                    class="text-black border border-gray-300 hover:border-double hover:bg-gray-100  rounded-lg w-full text-center py-3 mb-3 col-span-5">
                        {{ category }}
                    </button>
                    <button class="col-span-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteTask(category)" >x</button>
                </li>
            </ul>

        </div>
    </div>
</template>