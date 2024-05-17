<template>
    <div class="carousel sm:w-full lg:w-full">
        <div class="flex flex-cols gap-2">
            <div class="w-1/2 hover:border-2 border-grey-400 cursor-pointer" v-for="(image, index) in images"
                :key="index">
                <img :src="`${image}`" :alt="`Slide ${index + 1}`" @click="toggleImage(`${image}`)">
            </div>
        </div>
    </div>
    <div class="modal-container" v-show="imageToggle != ''" @click="imageToggle = ''">
        <div class="modal sm:w-1/2 sm:mx-5 md:w-1/2 lg:w-1/3">
            <button @click="imageToggle = ''" class="shadow-xl">X</button>
            <img :src="imageToggle" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const imageToggle = ref('');

const props = defineProps({
    images: Array
});

const toggleImage = (image: string) => {

    console.log(image)
    imageToggle.value = image;
    console.log(imageToggle.value)
}
</script>

<style scoped>
.modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.modal {
    display: block;
    position: relative;
    text-align: center;
    z-index: 12;
}

.modal button {
    position: absolute;
    right: 1rem;
    top: .5rem;
    font-weight: 800;
}
</style>
