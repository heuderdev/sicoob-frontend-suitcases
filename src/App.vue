<script setup>
import { watch, ref } from 'vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies';

import NavBarComponent from './components/NavBarComponent.vue';
const isLoggedIn = ref(false);
const cookies = useCookies(['token']);

watch(
  () => cookies.get('token'),
  (newToken, oldToken) => {
    if (newToken) {
      isLoggedIn.value = !!newToken
    } else {
      isLoggedIn.value = !!newToken
    }
  },
  { immediate: true }
);

</script>

<template>
  <!-- <VueQueryDevtools /> -->
  <NavBarComponent :isAuth="isLoggedIn" />
  <div class="container mt-4">
    <RouterView />
  </div>
</template>

