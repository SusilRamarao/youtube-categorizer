<script setup>

    import { reactive, computed, onMounted } from 'vue';
    import { ref, defineProps } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        channel: Object,
        index: Number
    });

    const emit = defineEmits(['selected_index']);

    const channelSelect = () =>{
        console.log("Channel select funct", props.index);
        emit('selected_index', props.index);
    }

    const loading = ref(false);
    const error = ref('');
    const imageUrl = ref(''); // Store the image URL

    onMounted( async () => {

        if (!props.channel?.url) return;
        
        loading.value = true;

        try {  
            const response = await axios.get('http://localhost:3001/api/og-data', {
                params: {
                    url: props.channel.url,
                }
            });
            //console.log("Channel response", response.data);
            imageUrl.value = response.data.image || ''; // Set the image URL
            
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            loading.value = false;
        }
    });


</script>

<template>

        <button type="submit" @click="channelSelect()" class="grid grid-cols-6 gap-6">
                <!-- Image loading states and logic START -->
                <!-- Show loading state -->
                <div v-if="loading" class="w-16 h-16 bg-gray-200 rounded animate-pulse col-span-2"></div>
                <!-- Show error state -->
                <div v-else-if="error" class="w-16 h-16 bg-red-100 rounded flex items-center justify-center col-span-2">
                    <span class="text-red-500 text-xs">Error</span>
                </div>
                <!-- Show image when loaded -->
                <img 
                    v-else-if="imageUrl" 
                    :src="imageUrl" 
                    :alt="props.channel.name"
                    class="mx-4 w-16 h-16 rounded object-cover col-span-2"
                />
                <!-- Show placeholder if no image -->
                <div v-else class="w-16 h-16 bg-gray-300 rounded flex items-center justify-center col-span-2">
                    <span class="text-gray-500 text-xs">No img</span>
                </div>
                <!-- Image loading states and logic ENDS -->
                 <div class="text-justify py-3 mb-3 col-span-4">{{ props.channel.name }}</div>
                 
        </button>
    
</template>