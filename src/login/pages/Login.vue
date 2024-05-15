<template>
    <div style="display: flex; align-items: center; height: 100%; flex-direction: column">
        <div style="height: 250px; width: 250px; background-color: red; margin-bottom: 2rem; opacity: .5;">
            LOGO
        </div>
        <form @submit.prevent="">
            <div class="field">
                <label for="username">
                    username:
                </label>
                <input type="text" name="username">
            </div>
            <div class="field">
                <label for="password">
                    password:
                </label>
                <input type="password" name="password">
            </div>
            <button class="login">Log in</button>
            <button class="register">register now</button>
        </form>
    </div>
</template>
<style scoped>
form {
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
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
</style>