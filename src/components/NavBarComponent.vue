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
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-accent btn-xs drawer-button m-2">MENU</label>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>

            </ul>
        </div>
    </div>
    <span class="dark:text-white">
          {{ isDark ? "Dark" : "Light" }} Mode
        </span>
    <button
        @click="toggleDark()"
        class="py-2 px-4 bg-black text-white rounded-md dark:bg-white dark:text-black"
      >
        Learn More!
      </button>
</template>


<script setup>
import { watch } from "vue"
const props = defineProps(['isAuth']);
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';
const route = useRouter()
const cookies = useCookies(['token']);

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

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