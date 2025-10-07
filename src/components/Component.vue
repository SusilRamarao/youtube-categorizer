<script setup>
    import { onMounted, ref } from 'vue';
    const category_input = ref('');
    const category_list = ref(['Electronics', 'Music']);

    const category_selected = ref('');

    const addCategory = () =>{
        if(category_input.value.trim() !== ''){

          category_list.value.push(category_input.value);
          category_input.value = '';
        }
      }; 

    const listYtChannels = (category) =>{

        if(category.trim() !== ''){

            console.log(category);
        }
    }
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div><h1 class="text-2xl text-center mb-2">Category</h1></div>
            <div class="border border-gray-100 mb-2"></div>
            <div>
                <form @submit.prevent="addCategory" >
                    <input class="ml-4 border rounded w-3/4 py-2 px-3 mr-5" type="text" id="newTask" name="newTask" v-model="category_input"></input>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
                </form>
            </div>
            <div class="border border-gray-100 mb-2"></div>
            <ul>
                <li v-for="(category, index) in category_list" :key="task">
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