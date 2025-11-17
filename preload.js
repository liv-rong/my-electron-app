// preload.js
const { contextBridge, ipcRenderer } = require('electron') // 1. 导入 contextBridge 模块

contextBridge.exposeInMainWorld('versions', {
  // 暴露一个名为 'versions' 的全局对象到渲染器
  // 在渲染器中可以通过 window.versions 访问
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // 注意：我们暴露的是返回值的函数，而不是直接暴露 process 对象
})
