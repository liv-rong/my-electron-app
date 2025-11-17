// renderer.js
const information = document.getElementById('info')

// 通过之前暴露的 versions 对象获取版本号
const chromeVersion = versions.chrome()
const nodeVersion = versions.node()
const electronVersion = versions.electron()

information.innerText = `本应用正在使用 Chrome (v${chromeVersion}), Node.js (v${nodeVersion}), 和 Electron (v${electronVersion})`

// ⚠️ 别忘了在 index.html 中引入 renderer.js，并添加 <p id="info"></p> 元素。

// renderer.js
const func = async () => {
  // 调用预加载脚本暴露的函数
  const response = await window.versions.ping()
  console.log(response, 'ro222wweeng') // 输出: 'pong'
}

func()
