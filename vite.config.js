import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ShopMe_Ecommerce/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
})
