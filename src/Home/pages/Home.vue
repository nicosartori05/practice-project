<template>
    Welcome to Home
    <button @click="openModal">abrir modal</button>
</template>
<script setup lang="ts">
import modalService from '@/utils/openModal.service';
function openModal() {
    modalService.show({ title: 'pepe', bodyText: 'aaaaaaaaaa' })
}
</script>
<style scoped></style>