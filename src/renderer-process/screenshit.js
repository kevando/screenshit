const {ipcRenderer} = require('electron')

var settings = require('electron-settings');

// const asyncMsgBtn = document.getElementById('async-msg')

// asyncMsgBtn.addEventListener('click', () => {
//   ipcRenderer.send('asynchronous-message', 'ping')
// })

document.getElementById('settings-path').innerHTML = settings.get('path')


ipcRenderer.on('settings-path', (event, arg) => {
  const message = `Your screen shot path is: ${arg}`
  document.getElementById('settings-path').innerHTML = message
})
