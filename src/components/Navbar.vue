<template>
  <div class="navbar">
    <div class="logo">
      <img src="../assets/logo.svg" alt="logo platzi">
    </div>
    <!-- <div class="space"></div> -->
    <button class="open_menu" @click="showMenu = !showMenu">
      <i class="fi fi-br-menu-burger"></i>
    </button>
    <ul class="menu_desktop">
      <li v-for="(menuItem, index) in menuItems" :key="index">
        <router-link :to="menuItem.route" @click="showMenu = !showMenu">{{ menuItem.label }}</router-link>
      </li>
    </ul>
  </div>
  <div class="background" v-show="showMenu" @click="showMenu = !showMenu">
  </div>
  <div class="menu_lateral" v-show="showMenu">
    <ul class="menu">
      <li v-for="(menuItem, index) in menuItems" :key="index">
        <router-link :to="menuItem.route" @click="showMenu = !showMenu">{{ menuItem.label }}</router-link>
      </li>
    </ul>
    <button class="cerrar_sesion" @click="logoutSession">cerrar sesion</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { logout } from '@/services/auth/auth.service';

const showMenu = ref(false);

const menuItems = [
  { label: 'Home', route: '/' },
  { label: 'Products', route: '/products' },
];

const logoutSession = async () => {
  try {
    await logout();
  } catch (error) {

  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 .9rem;
}

.logo {
  width: 60px;
  height: 60px;
  margin: 0;
  padding: 0;

  img {
    width: 90%;
    margin-top: .5rem
  }
}

.cerrar_sesion {
  background-color: white;
  color: black;
  width: 100%;
  border-radius: 4px;
  font-weight: 500;
}

.open_menu {
  font-size: 1.5rem;
}

.background {
  background-color: black;
  position: absolute;
  width: 100vw;
  height: calc(100% - 60px);
  opacity: .5;
  z-index: 1;
}

.menu_lateral {
  position: absolute;
  top: 0;
  right: 0;
  /* margin-top: 60px; */
  background-color: black;
  color: white;
  width: 90vw;
  height: calc(100%);
  padding: 1rem;
  z-index: 2;
  display: grid;
  grid-template-rows: calc(100% - 30px) 1fr;
  transition: 0.5s;
}

.menu {
  color: white;
  z-index: 3;

  li {
    margin-top: 1rem;
  }

}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .open_menu {
    display: block;
  }

  .menu_desktop {
    display: none;
  }
}

@media screen and (min-width: 769px) {
  .open_menu {
    display: none;
  }

  .menu_lateral {
    display: none;
  }

  .background {
    display: none;
  }

  .menu_desktop {
    display: flex;

    li {
      margin-right: 1rem;
    }

    li:hover {
      border-bottom: 1px solid white;
    }
  }
}
</style>