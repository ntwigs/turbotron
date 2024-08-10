import { app, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import { fileURLToPath } from 'url'

const getUrl = (): string => {
  if (isDev) return 'http://localhost:3000/'

  return fileURLToPath(
    new URL(/* @vite-ignore */ '../../dist-web/index.html', import.meta.url)
  )
}

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Turbotron',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: fileURLToPath(
        new URL(/* @vite-ignore */ '../preload/index.mjs', import.meta.url)
      ),
    },
  })

  const url = getUrl()
  isDev ? win.loadURL(url) : win.loadFile(url)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    const hasNoWindows = BrowserWindow.getAllWindows().length === 0
    if (hasNoWindows) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
