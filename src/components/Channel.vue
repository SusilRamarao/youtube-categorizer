<script setup>

import { defineProps } from 'vue';
import { Axios } from 'axios';
import { ogs } from 'open-graph-scraper';

    const props = defineProps({
        channel: Object,
    });
    /*
    const props = defineProps({
        url:{
            type: String
        },
        name:{type: String}
    });
*/
    const image = computed( async () => {

        try {  
            console.log("URL --->", props.channel.url)
            const response = await axios.get(props.channel.url);
            
            const options = { url: props.channel.url };
            ogs(options)
            .then((data) => {
                const { error, html, result, response } = data;
                console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the result object.
                console.log('html:', html); // This contains the HTML of page
                console.log('result:', result); // This contains all of the Open Graph results
                console.log('response:', response); // This contains response from the Fetch API
            })
            
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            state.isLoading = false;
        }
        return image_ref;
    });


</script>

<template>
    <div class="grid grid-cols-6 gap-6">
        <div class="col-span-1">
            
        </div>
        <label class="col-span-5 text-center">{{ props.channel.name }}</label>
    </div>
    
</template>