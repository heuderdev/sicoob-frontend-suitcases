<!-- <template>
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
</template> -->


<template>
    <!-- <div class="navbar bg-base-100" v-if="Authorization.isAuth">
        <div class="navbar-start">
            <div class="dropdown">
            </div>
            <router-link to="/home" class="text-xl cursor-pointer">
                <div class="flex gap-2 items-center justify-center">
                    <img src="/sicoob.png" width="35">
                    <div class="text-sm">BACKUP</div>
                </div>
            </router-link>
        </div>
        <div class="navbar-end hidden lg:flex">
            <div v-if="Authorization.isAuth" class="cursor-pointer" @click="Logoff">
                <img src="/logount.png" width="20">
            </div>
            <ul class="menu menu-horizontal px-4 z-[5]">
                <li>
                    <details>
                        <summary class="">MENU</summary>
                        <ul class="p-1">

                            <li><router-link to="/home">Início</router-link></li>
                            <li><router-link to="/location">Maleta</router-link></li>
                            <li><router-link to="/location">Localização</router-link></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    </div> -->

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/home" class="navbar-brand"> <img src="/sicoob.png" width="20"></router-link>

            </div>
            <div id="navbar" class="navbar-collapse collapse" v-if="Authorization.isAuth">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <router-link to="/home">Início</router-link>
                    </li>
                    <li><router-link to="/new-briefcase">Maletas</router-link></li>
                    <li><router-link to="/volume">Volumes</router-link></li>
                    <!-- <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                            aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li class="dropdown-header">Nav header</li>
                            <li><a href="#">Separated link</a></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li> -->
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" @click="Logoff">Logoff</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
    </nav>
</template>


<script setup>
import { PxLogout } from "oh-vue-icons/icons";

import axios from 'axios';
import { onMounted, ref, watch } from "vue"

const Authorization = defineProps(['isAuth']);
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';
const route = useRouter()
const cookies = useCookies(['token']);

const Logoff = () => {
    BOOLEAN_TOKEN.value = false
    cookies.remove('token');
    route.push("/")
}


const BOOLEAN_TOKEN = ref(false)


onMounted(() => {
    verifyToken()
})


async function verifyToken() {
    axios.get("/verify-token").then(response => {
        if (response) {
            return BOOLEAN_TOKEN.value = response.data
        }
        return BOOLEAN_TOKEN.value = false
    }).catch(error => {
        return BOOLEAN_TOKEN.value = false
    })
}




</script>