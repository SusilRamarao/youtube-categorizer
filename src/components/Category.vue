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
        if(category_input.value.trim() !== ''){
            const new_category = {
                id: category_input.value.toLowerCase().replace(/\s+/g, '-'),
                name: category_input.value,
                channels: []
            };
            
            // Check if category already exists
            const exists = categories_data.value.categories.find(cat => 
                cat.name.toLowerCase() === category_input.value.toLowerCase()
            );
            
            if (!exists) {
                categories_data.value.categories.push(new_category);
                category_list.value.push(new_category.name);
                
                // Save to localStorage
                localStorage.setItem('categoriesData', JSON.stringify(categories_data.value));
            }
            
            category_input.value = '';
        }
      }; 

    const deleteTask = async(categoryName) =>{

        // Remove from categories_data
        categories_data.value.categories = categories_data.value.categories.filter(
            cat => cat.name !== categoryName
        );
        
        // Remove from category_list
        const index = category_list.value.indexOf(categoryName);
        if (index > -1) {
            category_list.value.splice(index, 1);
        }
        
        // Update localStorage
        localStorage.setItem('categoriesData', JSON.stringify(categories_data.value));
    };

    onMounted(async () => {

        //console.log("onMounted");
        localStorage.removeItem('categoriesData');
        try{
            // Try to load from localStorage first
            const savedData = localStorage.getItem('categoriesData');
            
            if (savedData) {
                categories_data.value = JSON.parse(savedData);
            } else {

                const response = await axios.get('/test.json');
                categories_data.value = response.data;

                localStorage.setItem('categoriesData', JSON.stringify(categories_data.value));
            }
            
            // Populate category list
            for(let category of categories_data.value.categories){
                category_list.value.push(category.name);
            }

            console.log("Loaded categories:", categories_data.value);

        }catch(error){
            console.error("Error fetching jobs", error);
        }
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