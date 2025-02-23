import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,     // Tu peux ajuster ce port si nécessaire
    host: '0.0.0.0' // Cela permet à Vite d'écouter sur toutes les interfaces réseau
  }
})
