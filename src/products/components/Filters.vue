<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';
import type { Category } from '../interfaces/category.interface';
const categorySelected = ref(0);
const minPrice = ref(0);
const maxPrice = ref(0);
const priceRange = ref(0)
const props = defineProps<{
    categories: Category[];
}>();

const emit = defineEmits(["categorySelected"])
watch(categorySelected, (newValue, oldValue) => {
    emit('categorySelected', newValue);
});

</script>

<template>
    <form @submit.prevent="">
        <div class="field">
            <label for="name">Filtrar por nombre:</label>
            <input type="text" name="name" </div>
            <div class="field">
                <label for="category">Filtrar por categoria: </label>
                <select v-model="categorySelected">
                    <option value="0" disabled selected>Selecciona una categoría</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name
                        }}
                    </option>
                </select>
                <p v-show="categorySelected != 0">{{ categorySelected }} <button
                        @click="categorySelected = 0">X</button>
                </p>
            </div>
            <!-- 
            <div class="field">
                <label for="price">Rango de precio:</label>
                <div>
                    <input type="number" v-model.number="minPrice" placeholder="Mínimo">
                    <span>-</span>
                    <input type="number" v-model.number="maxPrice" placeholder="Máximo">
                </div>
            </div> -->
            <!-- <div class="field">
                <button class="boton_filtrar"> FILTRAR </button>
            </div> -->
    </form>
</template>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 996px) {
    form {
        display: none;
    }
}

@media screen and (min-width: 997px) {
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid grey;
        border-radius: 4px;
        padding: 15px;
        height: 300px;
    }

    .field {
        display: flex;
        flex-direction: column;

    }

    .field label {
        font-weight: 500;
    }

    .field input,
    select,
    textarea {
        border: 1px solid grey;
        border-radius: 4px;
        padding: .5rem;
    }
}

.boton_filtrar {
    width: 100%;
    background-color: black;
    color: white;
    border-radius: 4px;
    font-weight: 500;
}
</style>