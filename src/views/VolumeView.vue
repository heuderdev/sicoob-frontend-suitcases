<template>
    <div class="row">
        <div class="col-md-3">
            <div class="panel panel-primary">
                <div class="panel-heading">Formulário para registrar novos volumes no sistema</div>
                <div class="panel-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="local">Favor, selecione um Tipo:</label>
                            <select class="form-control" v-model="STATE_FORM.typesId">
                                <option v-for="item in STATE_TIPOS" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="local">Favor, selecione uma Maleta:</label>
                            <select class="form-control" v-model="STATE_FORM.suitcasesId">
                                <option v-for="item in STATE_MALETAS" :key="item.id" :value="item.id">
                                    {{ item.protocol }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Preencha o nome do volume:</label>
                            <input type="protocol" class="form-control" placeholder="002153L2" v-model="STATE_FORM.name">
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
                <div class="panel-heading">Listagem de todos os volumes cadastrados</div>
                <div class="panel-body">
                    <div v-if="STATE_VOLUME_LOADING">Carregando...</div>
                    <table class="table" v-else>
                        <thead>
                            <tr>
                                <th>Volume</th>
                                <th>Protocolo</th>
                                <th>Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in STATE_VOLUME_ALL" :key="item.id">
                                <td>{{ item.name }}</td>
                                <td>{{ item.suitcases?.protocol }}</td>
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
// REF's

const STATE_TIPOS = ref([])
const STATE_MALETAS = ref([])
const STATE_VOLUME_ALL = ref([])
const STATE_VOLUME_LOADING = ref(true)
const STATE_FORM = ref({
    name: "", suitcasesId: "", typesId: ""
})

async function BuscarTodosOsTipos() {
    axios.get("/type")
        .then(r => {
            STATE_TIPOS.value = r.data
        })
}

async function BuscarTodasAsMaletas() {
    axios.get("/suitcase")
        .then(r => {
            console.log(r.data);
            STATE_MALETAS.value = r.data
        })
}
async function BuscarTodasOsVolumes() {
    axios.get("/volume")
        .then(r => {
            console.log(r.data);
            STATE_VOLUME_ALL.value = r.data
        })
    STATE_VOLUME_LOADING.value = false
}

onMounted(async () => {
    await BuscarTodosOsTipos()
    await BuscarTodasAsMaletas()
    await BuscarTodasOsVolumes()
})


async function handleSubmit() {
    axios.post("/volume", {
        name: STATE_FORM.value.name,
        suitcasesId: STATE_FORM.value.suitcasesId,
        typesId: STATE_FORM.value.typesId
    }).then(async (r) => {
        await BuscarTodasOsVolumes()
    })
}



</script>