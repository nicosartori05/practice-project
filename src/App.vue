<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { isAuthenticated, logout } from './services/auth/auth.service';
const isAuthenticatedUser = isAuthenticated();

const userAction = ref(null);
let timeoutId = null;

const handleGlobalAction = (event) => {
  console.log("Global action detected:", event);
  userAction.value = true;
  resetLogoutTimer();
};

const resetLogoutTimer = () => {
  console.log('se reinicio el tiempo del logout', timeoutId)
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (!userAction.value) {
      logout();
    } else {
      userAction.value = false;
      resetLogoutTimer();
    }
  }, 300000);
};

resetLogoutTimer();
</script>

<template>
  <div class="layout" @click="handleGlobalAction" @touchstart="handleGlobalAction">
    <header v-if="isAuthenticatedUser">
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer> &copy; Nicolas sartori 2024 </footer>
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
