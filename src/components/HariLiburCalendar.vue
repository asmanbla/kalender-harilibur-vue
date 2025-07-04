<script setup>
import { TableRows } from '@fullcalendar/daygrid/internal.js'
import { ref, computed, watchEffect } from 'vue'

const harilibur = ref([])
const filteredLibur = ref([])
const loading = ref(true)

const tahun = ref(new Date().getFullYear())
const bulan = ref('')
const searchTerm = ref('')

const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

watchEffect(async () => {
  loading.value = true
  try {
    const response = await fetch(`https://api-harilibur.vercel.app/api?year=${tahun.value}`)
    const data = await response.json()
    harilibur.value = data.filter(item => item.is_national_holiday === true)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

watchEffect(() => {
  filteredLibur.value = harilibur.value.filter(item => {
    const date = new Date(item.holiday_date)
    const matchBulan = bulan.value ? date.getMonth() + 1 === Number(bulan.value) : true
    const matchCari = item.holiday_name.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchBulan && matchCari
  })
})

function getTotalHariDalamBulan(tahun, bulan) {
  return new Date(tahun, bulan, 0).getDate()
}

function getHariKe(dateStr) {
  return new Date(dateStr).getDay()
}

const calendarCells = computed(() => {
  if (!bulan.value) return []
  const totalHari = getTotalHariDalamBulan(tahun.value, bulan.value)
  const startDate = new Date(tahun.value, bulan.value - 1, 1)
  const startDay = startDate.getDay()
  const cells = []

  for (let i = 0; i < startDay; i++) {
    cells.push({ tanggal: '', libur: false })
  }

  for (let d = 1; d <= totalHari; d++) {
    const dateStr = `${tahun.value}-${String(bulan.value).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const liburData = filteredLibur.value.find(h => h.holiday_date === dateStr)
    cells.push({
      tanggal: d,
      libur: !!liburData,
      nama: liburData ? liburData.holiday_name : ''
    })
  }

  return cells
})
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
      <select v-model="bulan" class="form-select style-select-bulan">
        <option v-for="(nama, index) in bulanList" :key="index + 1" :value="index + 1">{{ nama }}</option>
      </select>
    </label>
  </div>

  <p v-if="loading">Loading...</p>

  <div class="grid-calendar">
    <div class="month-header">{{ bulanList[bulan - 1] || 'Semua Bulan' }} {{ tahun }}</div>
    <div class="day-name" v-for="day in hariList" :key="day">{{ day }}</div>

    <template v-if="calendarCells.length">
      <div
        v-for="(cell, index) in calendarCells"
        :key="index"
        class="calendar-cell"
        :class="{ 'libur': cell.libur }"
      >
        <div class="tanggal">{{ cell.tanggal }}</div>
        <div class="nama" v-if="cell.libur">{{ cell.nama }}</div>
      </div>
    </template>
  </div>

  <p v-if="!loading && filteredLibur.length === 0" class="ifnotfound">Data Libur Tidak Ditemukan</p>

  <a href="harilibur.html" class="button-to-calendar">Kembali</a>
</template>

<style scoped>
.grid-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin: 40px;
}
.day-name {
  font-weight: bold;
  text-align: center;
  padding: 6px;
  background-color: #53ada6;
}
.calendar-cell {
  border: 1px solid #ccc;
  min-height: 80px;
  padding: 6px;
  position: relative;
  background-color: #dcf4f2;
}
.calendar-cell.libur {
  background-color: rgb(212, 5, 5);
  color: white;
}
.tanggal {
  font-weight: bold;
  font-size: 14px;
}
.nama {
  font-size: 12px;
  color: white;
  margin-top: 4px;
}
.month-header {
  grid-column: span 7;
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
}

.main-title {
    font-style: Poppins, sans-serif;
    font-size: 24px;
    text-align: center;
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

.option-text-style {
  font-family: Poppins, sans-serif;
  font-size: 16px;
  margin-left: 15px;
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

.style-select-bulan {
  padding: 8px;
  font-size: 16px;
  margin-top: 6px;
  border-radius: 6px;
  width: 150px;
  margin-left: 5px;
}

.subtitle {
    text-align: center;
    font-size: 18px;
    margin-top: 5px;
}

.main-header {
  background-color: #49b490;
  color: white;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 0px;
}

* {
    font-family: Poppins, sans-serif;
}

.button-to-calendar {
  border: none; /* atau border: 2px solid white; */
  box-shadow: 1px 1px 3px rgba(99, 98, 98, 0.3);
  background-color: #5bab90;
  border-radius: 6px;
  cursor: pointer;
  width: 210px;
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
  background: #85cdb5;
}


</style>
