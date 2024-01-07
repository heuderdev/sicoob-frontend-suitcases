<template>
    <div class="row">
        <div class="col-md-3">
            <div class="panel panel-primary">
                <div class="panel-heading">Formulário para registrar novas maletas no sistema</div>
                <div class="panel-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="local">Selecione um Local:</label>
                            <select class="form-control" v-model="STATE_FORM.locationsId">
                                <option :value="item.id" selected v-for="item in STATE_LOCAIS" :key="item.id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Preencha com o nº da maleta:</label>
                            <input type="protocol" class="form-control" placeholder="SIG-0198"
                                v-model="STATE_FORM.protocol">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">Listagem de todas as maletas cadastradas</div>
                <div class="panel-body">
                    <div v-if="STATE_SUITCASE_LOADING">Carregando...</div>
                    <table class="table" v-else>
                        <thead>
                            <tr>
                                <th>Volume</th>
                                <th>Protocolo</th>
                                <th>Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in STATE_SUITCASE" :key="item.id">
                                <td>{{ item.locations.name }}</td>
                                <td>{{ item.protocol }}</td>
                                <td>{{ formatDateHours(item.created_at) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import { formatDateHours } from "../lib/formatDateHours"
// Ref's

const STATE_LOCAIS = ref([])
const STATE_SUITCASE = ref([])
const STATE_SUITCASE_LOADING = ref(true)
const STATE_FORM = ref({
    protocol: '',
    locationsId: ''
})



onMounted(async () => {
    await BuscarTodosLocais()
    await BuscarTodasMaletasAssociadasLocais()
})


async function BuscarTodosLocais() {
    axios.get("/location").then(response => {
        STATE_LOCAIS.value = response.data?.body?.location
    })
}

async function BuscarTodasMaletasAssociadasLocais() {
    axios.get("/suitcase").then(response => {
        STATE_SUITCASE.value = response.data
        STATE_SUITCASE_LOADING.value = false
    }).catch(error => {
        STATE_SUITCASE_LOADING.value = false
    })
}



async function handleSubmit() {
    axios.post("/suitcase", {
        protocol: STATE_FORM.value.protocol,
        locationsId: STATE_FORM.value.locationsId
    }).then(async (r) => {
        console.log(r);
        if (r.statusText == "OK") {
            await BuscarTodasMaletasAssociadasLocais()
            STATE_FORM.value.protocol = ''
            STATE_FORM.value.locationsId = ''
        }
    })
}

</script>
