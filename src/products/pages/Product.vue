<template>
    <div class="md:flex flex-row lg:flex flex-cols ">
        <!-- header -->
        <div class="header">
            <img class="w-full" :src="product?.images[0]" :alt="product?.title">
        </div>
        <!--content -->
        <div class="md:flex flex-col justify-evenly md:mx-5 ">
            <h2 class="font-semibold text-xl">{{ product?.title }}</h2>
            <p class="font-thin text-sm mb-3 border-b-2 pb-1">{{ product?.category?.name }}</p>
            <p class="font-normal">{{ product?.description }}</p>
            <h3 class="font-bold text-4xl mt-3">${{ product?.price }}</h3>
            <button class="bg-black text-white rounded py-1 mt-5 w-full lg:w-1/2">SUMAR AL CARRITO</button>
        </div>
    </div>
    <hr class="my-5" />
    <Carrousel :images="product?.images" />
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