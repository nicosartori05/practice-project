<template>
    <div class="md:flex flex-row lg:flex flex-cols max-w-screen-xl mx-auto">
        <!-- header -->
        <div class="header lg:w-5/6 xl:w-2/4">
            <img class="w-full mb-2" :src="product?.images[0]" :alt="product?.title">
            <Carrousel :images="product?.images" />
        </div>

        <!--content -->
        <div class="md:flex flex-col justify-evenly md:mx-5 mt-2">
            <h2 class="font-semibold text-xl">{{ product?.title }}</h2>
            <p class="font-thin text-sm mb-3 border-b-2 pb-1">{{ product?.category?.name }}</p>
            <p class="font-normal">{{ product?.description }}</p>
            <h3 class="font-bold text-4xl mt-3">${{ product?.price }}</h3>
            <button class="bg-black font-semibold text-white rounded py-1 mt-5 w-full lg:w-1/2">ADD TO CART</button>
        </div>
    </div>
    <hr class="my-5" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProduct } from '../services/products.service';
import Carrousel from '@/components/Carrousel.vue';

const route = useRoute();
const productId = ref();
const product = ref();

onMounted(async () => {
    if (route.params && route.params.id) {
        productId.value = route?.params?.id;
        const data = await getProduct(productId.value);
        product.value = data;

    }
});
</script>
<style scoped>
/* .header img {
    width: 300px;
} */
</style>