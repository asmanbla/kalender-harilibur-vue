<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <h1>Hello</h1>
  <h4>Selamat datang di website kalender Hari Libur Nasional!</h4>
  <a href="harilibur.html" class="button-harilibur" type="button">Klik Disini untuk mengakses website hari Libur</a>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.button-harilibur {
  border: none; /* atau border: 2px solid white; */
  box-shadow: 1px 1px 3px rgba(99, 98, 98, 0.3);
  background-color: rgb(46, 201, 51);
  border-radius: 6px;
  cursor: pointer;
  width: 380px;
  height: 50px;
  color: white;
  margin-left: 30px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: 30px;
}

.button-harilibur:hover {
  background: rgb(116, 206, 80);
}
</style>
