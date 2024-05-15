<template>
    <div class="card hover:shadow-lg">
        <div class="header">
            <img :src="product?.images[0]" :alt="product?.title">
        </div>
        <div class="content">
            <div class="font-semibold text-xl text-ellipsis overflow-hidden whitespace-nowrap">{{ product?.title }}
            </div>
            <div class="font-thin">{{ product?.category?.name }}</div>
            <div class="description">{{ showText ? product?.description : formatText(product?.description, 25) }}
                <button @click="showDescription">
                    {{ showText ? 'ver menos' : 'ver mas' }}
                </button>
            </div>
            <div class="font-semibold text-3xl">${{ product?.price }}</div>
        </div>
        <div class="boton">
            <button @click="goToMasterProduct(product?.id)" class="font-medium">
                ver mas
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { formatText } from '@/utils/utils';
import router from '@/router';
const showText = ref(false)
const props = defineProps<{
    product: Record<string, any>;
}>();

const showDescription = () => {
    showText.value = !showText.value;
}

const goToMasterProduct = (idProduct: number) => {
    router.push(`/products/${idProduct}`);
}

</script>

<style scoped>
.card {
    background-color: grey;
    width: 300px;
    max-height: 650px;
    color: white;
    opacity: .8
}

.header {
    width: 300px;
    height: 300px;
}

.card:hover {
    outline: 1px solid grey;
    opacity: 1
}

.content,
.boton {
    padding: .5rem
}

.boton button {
    width: 100%;
    background-color: white;
    border-radius: 4px;
    font-weight: 500;
    color: black;
}
</style>