import { defineConfig } from 'npm:vite@^4.3.9'
import vue from 'npm:@vitejs/plugin-vue@^4.2.3'

import 'npm:vue@^3.3.4'
import 'npm:vue-router'

import "npm:pinia"
import "npm:vue-content-loader"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
