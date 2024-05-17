<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <div class="modal-header">
                <h2>{{ title }}</h2>
                <button @click="closeModal" class="close-button">X</button>
            </div>
            <div class="modal-body">
                <p>{{ bodyText }}</p>
            </div>
            <div class="modal-footer">
                <button @click="handleAction" class="action-button">Perform Action</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    title: string;
    bodyText: string;
    action?: () => void;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};

const handleAction = () => {
    if (props.action) {
        props.action();
    }
    closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.modal {
    display: block;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 80%;
    /* max-width: 500px; */
    max-height: 90%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
}

.modal-body {
    text-align: center;
}

.modal-footer {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.action-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>