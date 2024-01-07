<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item dark" aria-current="true">Olá, Boas-vindas</li>
            <li class="list-group-item">
                <form @submit.prevent="handleLogin">
                    <div class="form-group">

                        <input class="form-control form-control-sm" v-model="loginForm.username" type="text"
                            placeholder="usuário">
                    </div>
                    <div class="form-group">

                        <input class="form-control form-control-sm mt-2" v-model="loginForm.password" type="password"
                            placeholder="senha">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-sm">Entrar</button>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';

import axios from 'axios';
const route = useRouter()
const cookies = useCookies(['token']);

const loginForm = ref({
    username: 'heuder.sena',
    password: '123456'
});


const handleLogin = async () => {
    try {
        const response = await axios.post('/session/login', {
            username: loginForm.value.username,
            password: loginForm.value.password
        });

        if (response.status == 201) {
            cookies.set('token', response.data.body.token);
            route.push("/home")
        }

    } catch (error) {
        toast("usuário ou senhá inválidos!", {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
        })
    }
};
</script>

<style scoped>
.mt-4 {
    margin-top: 8px;
}
</style>