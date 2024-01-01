<template>
    <div id="dashboard"><div class="page-header">
    <h1 class="page-title">Hi Admin</h1>
</div>


<div class="row">
    
    <div class="col-sm-6 col-lg-3">
        <div class="card p-3">
            <div class="d-flex align-items-center">
                    <span class="stamp stamp-md bg-green mr-3">
                      <i class="fe fe-zap"></i>
                    </span>
                <div>
                    <h4 class="m-0"><a href="/nginx/proxy">23 <small>Proxy Hosts</small></a></h4>
                </div>
            </div>
        </div>
    </div>
    

    
    <div class="col-sm-6 col-lg-3">
        <div class="card p-3">
            <div class="d-flex align-items-center">
                    <span class="stamp stamp-md bg-yellow mr-3">
                      <i class="fe fe-shuffle"></i>
                    </span>
                <div>
                    <h4 class="m-0"><a href="/nginx/redirection">0 <small>Redirection Hosts</small></a></h4>
                </div>
            </div>
        </div>
    </div>
    

    
    <div class="col-sm-6 col-lg-3">
        <div class="card p-3">
            <div class="d-flex align-items-center">
                    <span class="stamp stamp-md bg-blue mr-3">
                      <i class="fe fe-radio"></i>
                    </span>
                <div>
                    <h4 class="m-0"><a href="/nginx/stream">1 <small> Streams</small></a></h4>
                </div>
            </div>
        </div>
    </div>
    

    
    <div class="col-sm-6 col-lg-3">
        <div class="card p-3">
            <div class="d-flex align-items-center">
                    <span class="stamp stamp-md bg-red mr-3">
                      <i class="fe fe-zap-off"></i>
                    </span>
                <div>
                    <h4 class="m-0"><a href="/nginx/404">0 <small>404 Hosts</small></a></h4>
                </div>
            </div>
        </div>
    </div>
    
</div>

</div>
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