import { defineConfig, type UserConfigFn } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { rmSync } from 'node:fs'

// @ts-ignore - spreading lies
export default defineConfig(() => {
  rmSync('dist', { recursive: true, force: true })
  
  return {
    build: {
      lib: {
        entry: 'src/main/index.ts',
        name: "iife"
      },
    },
    plugins: [
      electron([
        {
          entry: 'src/main/index.ts',
          vite: {
            build: {
              outDir: 'dist/main',
            },
          },
        },
        {
          entry: 'src/preload/index.ts',
          vite: {
            build: {
              outDir: 'dist/preload',
            },
          },
        },
      ]),
      renderer({
        nodeIntegration: true,
      }),
    ],
  }
})
