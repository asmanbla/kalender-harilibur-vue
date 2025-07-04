<script setup>

import { ref, onMounted } from 'vue'

const harilibur8 = ref([])
const loading = ref(true)

// class css 
const styledata = ["left", "font"]
const array = ["font", "center"];
const stylebutton = ["font", "button-style"]

onMounted(async () => {
  try {
    const response = await fetch('https://api-harilibur.vercel.app/api?month=8&year=2020')
    const data = await response.json()
    harilibur8.value = data

    harilibur8.value = data.filter(item => item.is_national_holiday == true)

  } catch (error) {
    console.error('Gagal fetch data:', error)
  } finally {
    loading.value = false
  }
})

</script>

<template>

<h1 :class="array">Hari Libur Bulan Agustus tahun 2020</h1>

<div>
    <p v-if="loading">Loading...</p>
    <ul v-else>
      <li v-for="harilibur8 in harilibur8" :key="harilibur8.id" :class="styledata">
        {{ harilibur8.holiday_date }} - {{ harilibur8.holiday_name }}
      </li>
    </ul>
  </div>
<a href="/harilibur.html" :class="stylebutton" type="button">Kembali</a>

</template>

<style scoped>

.font {
    font-family: Poppins, sans-serif;
}

.center {
    text-align: center;
}

.left {
    text-align: left;
}

.button-style {
  border: none; /* atau border: 2px solid white; */
  box-shadow: 1px 1px 3px rgba(99, 98, 98, 0.3);
  background-color: rgb(46, 201, 51);
  border-radius: 6px;
  cursor: pointer;
  width: 190px;
  height: 35px;
  color: white;
  margin-left: 30px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

</style>