import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    base: "/wastego/",
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: "#003539", // warna utama (teal gelap)
              dark: "#002A2E", // versi lebih gelap
              light: "#004A4F", // versi lebih terang
            },
            secondary: {
              DEFAULT: "#AFEE00", // warna kedua (hijau terang)
              dark: "#8CBE00", // versi lebih gelap
              light: "#C5FF20", // versi lebih terang
            },
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})