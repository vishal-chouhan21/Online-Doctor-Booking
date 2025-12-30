import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",   // ← FIXES QUIRKS MODE for deep routes like /dashboard
  server: {
    port: 5173,
  }
})
