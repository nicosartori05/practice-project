<script setup>
import Navbar from './components/Navbar.vue';
import { isAuthenticated } from './services/auth/auth.service';

const isAuthenticatedUser = isAuthenticated();
</script>

<template>
  <div class="layout">
    <header v-if="isAuthenticatedUser">
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer> &copy; Nicolas sartori 2024</footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  height: 60px;
  background-color: #f0f0f0;
}

main {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

footer {
  height: 40px;
  background-color: #f0f0f0;
  text-align: center;
}
</style>
