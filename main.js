// main.js
const { app, BrowserWindow } = require('electron') // 1. 导入必要的模块

// 3. 封装创建窗口的逻辑
const createWindow = () => {
  // 创建一个新的浏览器窗口实例
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // 将 index.html 文件加载到新创建的窗口中
  win.loadFile('index.html')
}

// 2. 监听应用的 ready 事件
// 只有在 app ready 之后才能创建窗口
app.whenReady().then(() => {
  createWindow()
})

// main.js (在 app.whenReady() 块的后面)

// 1. Windows 和 Linux 平台：关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  // macOS 应用通常即使所有窗口关闭，也会保持运行（在 Dock 栏上）
  // 只有非 macOS 平台 (win32, linux) 才应该在所有窗口关闭时退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 2. macOS 平台：在没有窗口时点击 Dock 图标重新打开窗口
app.on('activate', () => {
  // 在 macOS 上，如果应用没有打开任何窗口，但用户点击了 Dock 图标
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
