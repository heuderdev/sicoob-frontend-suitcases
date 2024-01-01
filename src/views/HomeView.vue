<template>

</template>

<script setup >
import axios from "axios"

import { useQuery } from "@tanstack/vue-query";

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['location'],
  queryFn: GetLocations(),
})

async function GetLocations() {
    return await axios.get("/location");
}

</script>