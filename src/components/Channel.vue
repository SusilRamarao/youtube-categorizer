<script setup>

    import { reactive, computed, onMounted } from 'vue';
    import { ref, defineProps } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        channel: Object,
    });

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

            console.log("og response", response);

            imageUrl.value = response.data.image || ''; // Set the image URL
            
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            loading.value = false;
        }
    });


</script>

<template>
    <div class="grid grid-cols-6 gap-6">
        <div class="col-span-1">
            <!-- Show loading state -->
            <div v-if="loading" class="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>

            <!-- Show error state -->
            <div v-else-if="error" class="w-16 h-16 bg-red-100 rounded flex items-center justify-center">
                <span class="text-red-500 text-xs">Error</span>
            </div>

            <!-- Show image when loaded -->
            <img 
                v-else-if="imageUrl" 
                :src="imageUrl" 
                :alt="props.channel.name"
                class="w-16 h-16 rounded object-cover"
            />

            <!-- Show placeholder if no image -->
            <div v-else class="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                <span class="text-gray-500 text-xs">No img</span>
            </div>
        </div>
        <label class="col-span-5 text-center">{{ props.channel.name }}</label>
    </div>
    
</template>