import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'
import isDev from 'electron-is-dev'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Main window',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  isDev
    ? win.loadURL('http://localhost:3000/')
    : win.loadFile(join(__dirname, '../../dist-web/index.html'))
})
