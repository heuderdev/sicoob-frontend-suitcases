<template>
  <div class="jumbotron">
    <h2>Backup Manager Sicoob</h2>
    <InformacaoJumbotronSuitCasesComponent />
  </div>

  <div class="row">
    <div class="col-md-3">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="radio-inline" v-for="item in STATE_LOCAIS" :key="item.id">
            <input type="radio" name="tipo" :value="item.id" v-model="STATE_FORM.tipo">
            <span>{{ item.name }}</span>
          </label>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Buscar por volume</label>
          <input type="text" class="form-control" id="exampleInputEmail1" placeholder="002153L2"
            v-model="STATE_FORM.name">
        </div>
        <div class="form-group">
          <button class="btn btn-success">Buscar</button>
        </div>
      </form>
    </div>
    <div class="col-md-9">
      <!-- conteudo -->
      <table class="table" v-if="STATE_TABLE_SEARCH">
        <thead>
          <tr>
            <th>#</th>
            <th>Volume</th>
            <th>Protocolo/Maleta</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ STATE_TABLE_SEARCH?.id }}</td>
            <td>{{ STATE_TABLE_SEARCH?.name }}</td>
            <td>{{ STATE_TABLE_SEARCH?.protocol }}</td>
            <td>{{ STATE_TABLE_SEARCH?.location_name }}</td>
          </tr>
        </tbody>
      </table>
      <!-- conteudo -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import InformacaoJumbotronSuitCasesComponent from "../components/InformacaoJumbotronSuitCasesComponent.vue"

// REF's
const STATE_LOCAIS = ref([])
const STATE_TABLE_SEARCH = ref()

const STATE_FORM = ref({
  tipo: "1",
  name: "002216L2"
})


onMounted(async () => {
  await BuscarTodosLocais()
})


async function BuscarTodosLocais() {
  axios.get("/location").then(response => {
    STATE_LOCAIS.value = response.data?.body?.location
  })
}

function handleSubmit() {
  axios.post("/search-custom", {
    tipo: STATE_FORM.value.tipo,
    name: STATE_FORM.value.name,
  }).then(s => {
    if (Object.keys(s.data).length === 0) {
      return STATE_TABLE_SEARCH.value = null
    }
    STATE_TABLE_SEARCH.value = s.data
  }).catch(e => {
    console.log(e);
  })
}

</script>

<!-- <script setup >
import axios from "axios"

import { useQuery } from "@tanstack/vue-query";

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['location'],
  queryFn: GetLocations(),
})

async function GetLocations() {
  return await axios.get("/location");
}

</script> -->