<script setup>

import {ref, onMounted} from "vue"

const harilibur825 = ref([])
const loading = ref(true)

onMounted (async () => {
    try{
        const response = await fetch('https://api-harilibur.vercel.app/api?month=8')
        const data = response.json()
        harilibur825 = data
        
        //ambil true 
        harilibur825.value = data.filter(item => item.is_national_holiday === true)
    } catch (error){
        console.log('Gagal fetch data: ', error)
    } finally {
        loading.value = false
    }
})

</script>

<template> 

<h1> Hari Libur Dilbulan Agustus tahun 2025</h1>

</template>