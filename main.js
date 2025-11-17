// main.js
// 主进程入口文件
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// 只在开发环境启用热重载，避免打包后报错
if (process.env.NODE_ENV !== 'production') {
  try {
    // 对整个项目目录做文件监听
    // 注意：这里 electron 可执行文件指向项目下的 node_modules/.bin/electron
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit',
      ignored: /node_modules|[/\\]\./
    })
  } catch (e) {
    console.warn('electron-reload 加载失败：', e.message)
  }
}

// 创建浏览器窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // 开发阶段默认打开 DevTools
  if (process.env.NODE_ENV !== 'production') {
    win.webContents.openDevTools()
  }
}

// 应用准备就绪后创建窗口，并注册主进程 IPC
app.whenReady().then(() => {
  ipcMain.handle('ping', () => {
    return 'pong'
  })
  createWindow()
})

// 所有窗口关闭时退出（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// macOS 上点击 Dock 图标时，如果没有窗口则重新创建
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
