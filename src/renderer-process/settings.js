
// Settings
// ===============================================

const {ipcRenderer} = require('electron')
const  settings = require('electron-settings');

document.getElementById('settings-path').innerHTML = settings.get('screenShotPath')


ipcRenderer.on('settings-path', (event, arg) => {
  const message = `Your screen shot path is: ${arg}`
  document.getElementById('settings-path').innerHTML = message
})
