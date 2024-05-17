<template>
    <Loading :isLoading="loading" />
    <div class="layout">
        <Filters :categories="categories"></Filters>
        <List :data="products">
            <template #card>
                <CardProduct v-for="(product, index) in products" :key="index" :product="product" />
            </template>
        </List>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/products.service';
import List from '@/components/List.vue';
import Loading from '@/components/Loading.vue';
import CardProduct from '../components/CardProduct.vue';
import Filters from '../components/Filters.vue';

const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
    const data = await getProducts();
    if (data) {
        products.value = data;
        loading.value = false;
        categories.value = getCategories(products.value);
    }
});

const getCategories = (productos: any[]) => {
    const uniqueCategories: any[] = [];

    productos.forEach((producto) => {
        const category = {
            id: producto.category.id,
            name: producto.category.name
        };
        const exists = uniqueCategories.some((c) => c.id === category.id);

        if (!exists) {
            uniqueCategories.push(category);
        }
    });

    return uniqueCategories;
}

</script>

<style scoped>
@media screen and (min-width: 997px) {
    .layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 10px;
    }
}
</style>