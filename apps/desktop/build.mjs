process.env.NODE_ENV = process.argv.includes('--dev')
  ? 'development'
  : 'production'

import { build, startup } from 'vite-plugin-electron'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

build({
  entry: 'src/preload/index.ts',
  vite: {
    mode: process.env.NODE_ENV,
    build: {
      outDir: 'dist/preload',
      minify: isProd,
      watch: isDev ? {} : null,
      lib: {
        fileName: () => '[name].mjs',
      },
    },
    plugins: [
      {
        name: 'plugin-start-electron',
        closeBundle() {
          if (isDev) {
            // Startup Electron App
            startup()
          }
        },
      },
    ],
  },
})

build({
  entry: 'src/main/index.ts',
  vite: {
    mode: process.env.NODE_ENV,
    build: {
      outDir: 'dist/main',
      minify: isProd,
      watch: isDev ? {} : null,
    },
    plugins: [
      {
        name: 'plugin-start-electron',
        closeBundle() {
          if (isDev) {
            // Startup Electron App
            startup()
          }
        },
      },
    ],
  },
})
