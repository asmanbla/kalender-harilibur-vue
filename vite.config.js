import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', 
    rollupOptions: {
      input: {
        daftarHariLibur: 'harilibur.html',
        hariLiburBulan8: 'harilibur8.html',
        hariLiburCalendar: 'hariliburcalendar.html',
      }
    }
  }
})
