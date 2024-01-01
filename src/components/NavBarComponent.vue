<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link aria-current="page" class="navbar-brand" to="home">
                <img src="/backup.png" width="30" height="24" /> - backup
            </router-link>
            <button v-if="props.isAuth" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav" v-if="props.isAuth">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link aria-current="page" class="nav-link active" to="location">
                            Localização
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
            <div v-if="props.isAuth">
                <img v-on:click="logout" src="/box-arrow-in-left.svg" class="exit-button" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { watch } from "vue"
const props = defineProps(['isAuth']);
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';
const route = useRouter()
const cookies = useCookies(['token']);


const logout = () => {
    cookies.remove('token');
    route.push("/")
}


</script>

<style scoped>
.exit-button {
    cursor: pointer;

}
</style>