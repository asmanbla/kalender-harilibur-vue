<script setup>
import { ref, watchEffect } from 'vue'

const harilibur = ref([])
const filteredLibur = ref([])
const loading = ref(true)

const tahun = ref(new Date().getFullYear())
const bulan = ref('')
const searchTerm = ref('')

// Sorting
const sortKey = ref('holiday_date')
const sortAsc = ref(true)

//class 
const judulkalender = ['main-title', 'text-center' ]


// Ambil data setiap kali tahun berubah
watchEffect(async () => {
  loading.value = true
  try {
    const response = await fetch(`https://api-harilibur.vercel.app/api?year=${tahun.value}`)
    const data = await response.json()

    harilibur.value = data.filter(item => item.is_national_holiday === true)
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  } finally {
    loading.value = false
  }
})

// Filter dan sort berdasarkan bulan, pencarian, dan sortKey
watchEffect(() => {
  let filtered = harilibur.value.filter(item => {
    const date = new Date(item.holiday_date)
    const matchBulan = bulan.value ? date.getMonth() + 1 === Number(bulan.value) : true
    const matchCari = item.holiday_name.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchBulan && matchCari
  })

  // Sort
  filtered.sort((a, b) => {
    let key = sortKey.value
    let aVal = key === 'hari' ? getHari(a.holiday_date) : a[key]
    let bVal = key === 'hari' ? getHari(b.holiday_date) : b[key]

    if (aVal < bVal) return sortAsc.value ? -1 : 1
    if (aVal > bVal) return sortAsc.value ? 1 : -1
    return 0
  })

  filteredLibur.value = filtered
})

function getHari(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { weekday: 'long' })
}

function toggleSort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
</script>

<template>
  <header class="main-header">
    <h1 class="main-title">Informasi Hari Libur Nasional Indonesia</h1>
    <p class="subtitle">Pilih tahun dan bulan untuk melihat hari libur nasional</p>
  </header>

  <div>
    <label class="option-text-style">
      Pilih Tahun:
      <select v-model="tahun" class="form-select style-select">
        <option v-for="y in [2020, 2021, 2022, 2023, 2024, 2025, 2026]" :key="y" :value="y">{{ y }}</option>
      </select>
    </label>

    <label class="option-text-style">
      Pilih Bulan:
      <select v-model="bulan" class="form-select style-select">
        <option value="">Semua</option>
        <option v-for="(nama, index) in bulanList" :key="index + 1" :value="index + 1">{{ nama }}</option>
      </select>
    </label>

    <input type="text" v-model="searchTerm" placeholder="Cari Nama Hari Libur..." class="search-input" />
  </div>

  <p v-if="loading">Loading...</p>

  <table v-else class="table table-striped table-bordered">
    <thead>
      <tr>
        <th @click="toggleSort('holiday_date')" style="cursor: pointer">
          Tanggal
          <span v-if="sortKey === 'holiday_date'">{{ sortAsc ? '↑' : '↓' }}</span>
        </th>
        <th @click="toggleSort('hari')" style="cursor: pointer">
          Hari
          <span v-if="sortKey === 'hari'">{{ sortAsc ? '↑' : '↓' }}</span>
        </th>
        <th @click="toggleSort('holiday_name')" style="cursor: pointer">
          Nama Hari Libur
          <span v-if="sortKey === 'holiday_name'">{{ sortAsc ? '↑' : '↓' }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hari in filteredLibur" :key="hari.holiday_date">
        <td>{{ hari.holiday_date }}</td>
        <td>{{ getHari(hari.holiday_date) }}</td>
        <td>{{ hari.holiday_name }}</td>
      </tr>
    </tbody>
  </table>

  <p v-if="!loading && filteredLibur.length === 0" class="ifnotfound">Data Libur Tidak Ditemukan</p>
  <a href="hariliburcalendar.html" class="button-to-calendar">Lihat Versi Calendar</a>

</template>

<style scoped>
.font {
  font-family: 'Poppins', sans-serif;
}
.text-center {
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
.main-header {
  background-color: #5b5c5e;
  color: white;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 0px;
}
.main-title {
  font-size: 22px;
  margin: 0;
  font-weight: bold;
}
.subtitle {
  font-size: 14px;
  margin-top: 8px;
}
.option-text-style {
  font-family: Poppins, sans-serif;
  font-size: 16px;
  margin-left: 50px;
  margin-top: 20px;
  text-align: left;
}
.style-select {
  padding: 8px;
  font-size: 16px;
  margin-top: 6px;
  border-radius: 6px;
  width: 150px;
}
.search-input {
  padding: 8px 12px;
  font-size: 16px;
  width: 250px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 15px;
  font-family: 'Poppins', sans-serif;
}
.table {
  margin: 50px;
  width: 93%;
}
.ifnotfound {
  text-align: left;
  margin-left: 47px;
}

* {
  font-family: Poppins, sans-serif;
}

/* style kalender */
.calendar-style {
  width: 92%;
  border-collapse: collapse;
  margin: 60px;
}

.calendar-style th,
.calendar-style td {
  border: 1px solid #ccc;
  width: 14.28%; /* 100% ÷ 7 hari */
  vertical-align: top;
  height: 100px;
  padding: 8px;
}

.cell {
  background-color: #f9f9f9;
}

.tanggal {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.nama {
  font-size: 0.85em;
  color: #555;
}

.button-to-index {
  border: none; /* atau border: 2px solid white; */
  box-shadow: 1px 1px 3px rgba(99, 98, 98, 0.3);
  background-color: rgb(53, 36, 160);
  border-radius: 6px;
  cursor: pointer;
  width: 280px;
  height: 45px;
  color: white;
  margin-left: 50px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-bottom: 20px;
}

.button-to-index:hover {
  background: rgb(116, 113, 218);
}

.button-to-calendar {
  border: none; /* atau border: 2px solid white; */
  box-shadow: 1px 1px 3px rgba(99, 98, 98, 0.3);
  background-color: rgb(160, 36, 100);
  border-radius: 6px;
  cursor: pointer;
  width: 280px;
  height: 45px;
  color: white;
  margin-left: 50px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-bottom: 20px;
}

.button-to-calendar:hover {
  background: rgb(218, 113, 181);
}

</style>
