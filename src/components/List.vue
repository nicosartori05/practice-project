<template>
    <div class="list">
        <slot name="card" class="cards"></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    data: any[]; // La matriz de datos que recibe el componente List
}>();
</script>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    column-gap: 10px;
}

.filters {
    border: 1px solid grey;
    border-radius: 4px;
    width: 250px;
    max-height: 900px;
}

.list {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: flex-start;
}

@media screen and (min-width: 320px) and (max-width: 996px) {
    .list {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        justify-content: center;
    }
}
</style>