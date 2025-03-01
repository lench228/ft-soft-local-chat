import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import tailwindcss from "@tailwindcss/vite"

import path from 'node:path'
import { packageDirectorySync } from 'pkg-dir'

const packageRoot = packageDirectorySync()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'features': path.resolve(packageRoot, './src/features'),

      'pages': path.resolve(packageRoot, './src/pages'),
      'entities': path.resolve(packageRoot, './src/entities'),
      'shared': path.resolve(packageRoot, './src/shared'),
      'app': path.resolve(packageRoot, './src/app'),
      'widgets': path.resolve(packageRoot, './src/widgets'),
    },
  },
})