import { build, startup } from 'vite-plugin-electron'

const ENV_DEVELOPMENT = 'development'
const ENV_PRODUCTION = 'production'

const environment = process.argv.includes('--dev')
  ? ENV_DEVELOPMENT
  : ENV_PRODUCTION

const isDev = environment === ENV_DEVELOPMENT
const isProd = environment === ENV_PRODUCTION

const reloadElectronPlugin = {
  name: 'plugin-reload-electron',
  closeBundle() {
    if (isDev) {
      startup()
    }
  },
}

const getBuildConfig = (outDir) => {
  return {
    outDir,
    minify: isProd,
    watch: isDev ? {} : null,
  }
}

const buildPreload = () => {
  build({
    entry: 'src/preload/index.ts',
    vite: {
      mode: process.env.NODE_ENV,
      build: {
        ...getBuildConfig('dist/preload'),
        lib: {
          fileName: () => '[name].mjs',
        },
      },
      plugins: [reloadElectronPlugin],
    },
  }).catch((error) => console.error(`PRELOAD ERROR:\n${error}\n`))
}

const buildMain = () => {
  build({
    entry: 'src/main/index.ts',
    vite: {
      mode: process.env.NODE_ENV,
      build: getBuildConfig('dist/main'),
      plugins: [reloadElectronPlugin],
    },
  }).catch((error) => console.error(`MAIN ERROR:\n${error}\n`))
}

buildPreload()
buildMain()
