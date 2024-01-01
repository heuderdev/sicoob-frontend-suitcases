<template>
    <div class="row">
        <div class="col col-4">
            <table class="table table-bordered table-sm" v-if="!!_STATE_LOCATIONS_LOADING">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in _STATE_LOCATIONS" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.name }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-else>Carregando...</div>
        </div>
        <div class="col col-6">
            <form @submit.prevent="handleFormCreate">
                <input class="form-control form-control-sm" v-model="_FORM.name" type="text" placeholder="NOME">
                <div class="mt-4">
                    <button type="submit" class="btn btn-secondary btn-sm">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from "vue"


// STATES
const _STATE_LOCATIONS = ref([])
const _STATE_LOCATIONS_LOADING = ref(true)
onMounted(() => {
    getAllLocations()
})

async function getAllLocations() {
    axios.get("/location").then(response => {
        _STATE_LOCATIONS.value = response.data.body.location
        const _STATE_LOCATIONS_LOADING = ref(false)
    })
}

// FORMULARIOS
const _FORM = ref({
    name: ''
});


const handleFormCreate = async () => {
    if (!_FORM.value.name) {
        return
    }
    await axios.post("/location", {
        name: _FORM.value.name
    }).then(() => {
        _FORM.value.name = ""
    })
    getAllLocations()
}

</script>