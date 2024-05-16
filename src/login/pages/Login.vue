<template>
    <div style="display: flex; align-items: center; height: 100%; flex-direction: column">
        <div style="height: 250px; width: 250px; margin: 2rem 0 .5rem 0; ">
            <img src="../../assets/logo.svg" alt="LOGO">
        </div>
        <!-- <form @submit.prevent="userLogIn" v-show="!register">
            <div class="field">
                <label for="email">
                    Email:
                </label>
                <input type="text" name="email" v-model="user.email">
            </div>
            <div class="field">
                <label for="password">
                    Password:
                </label>
                <input type="password" name="password" v-model="user.password">
            </div>
            <button class="login">Log in</button>
            <button class="register" @click="register = !register">register now</button>
        </form> -->
        <form @submit.prevent="register ? newUser : userLogIn">
            <div class="field" v-show="register">
                <label for="username">
                    Username:
                </label>
                <input type="text" name="username" v-model="user.name">
            </div>
            <div class="field">
                <label for="email">
                    Email:
                </label>
                <input type="email" name="email" v-model="user.email">
            </div>
            <div class="field">
                <label for="password">
                    Password:
                </label>
                <input type="password" name="password" v-model="user.password">
            </div>
            <div class="field" v-show="register">
                <label for="file">
                    Photo:
                </label>
                <input type="file" name="file">
            </div>
            <button class="login" v-show="!register" @click="userLogIn">Log in</button>
            <button class="register" @click="register = !register" v-show="!register">register now</button>
            <button class="registerUser" v-show="register" @click="newUser">sign in</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createUser, getAllUsers, logIn } from '@/services/auth/auth.service';
import router from '@/router';

const register = ref(false);
const user = ref({
    name: '',
    email: '',
    password: '',
    avatar: 'https://picsum.photos/800',
})

onMounted(async () => {
    await getAllUsers();
})

const newUser = async () => {
    try {
        const userData = {
            name: user.value.name,
            email: user.value.email,
            password: user.value.password,
            avatar: 'https://picsum.photos/800',
        }
        await createUser(userData);
        console.log('Usuario creado exitosamente');
        register.value = false;
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}

const userLogIn = async () => {
    debugger
    try {
        const userData = {
            email: user.value.email,
            password: user.value.password,
        }
        await logIn(userData);
        console.log('Usuario logeado exitosamente');
        register.value = false;
        router.push('/')
        setTimeout(() => {
            location.reload();
        }, 200);
    } catch (error) {
        console.error('Error al logear usuario:', error);
    }
}
</script>

<style scoped>
form {
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
    margin: .5rem 0;
}

input {
    border: 1px solid black;
    border-radius: 4px;
}

.login {
    background-color: black;
    color: white;
    border-radius: 4px;
    padding: .2rem;
    margin: .5rem 0;
    width: 100%;
}

.register {
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 4px;
    padding: .2rem;
    width: 100%;
}

.registerUser {
    background-color: black;
    color: white;
    font-weight: 500;
    border: 1px solid black;
    border-radius: 4px;
    padding: .2rem;
    width: 100%;
    margin-top: .5rem;
}
</style>