import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        daftarHariLibur: "harilibur.html",
        hariLiburBulan8: "harilibur8.html",
        hariLiburBulan825: "harilibur825.html",
        hariLiburCalendar: "hariliburcalendar.html",
      }
    }
  }
})
