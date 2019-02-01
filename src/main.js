const { app, BrowserWindow } = require('electron')
const path = require('path')
const ready = require('./system')

let mainWindow = null

// =====================================================
// 	Initialize!
// =====================================================

function initialize() {

  function createWindow() {
    const windowOptions = {
      width: 800,
      height: 440,
      title: app.getName()
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, './welcome.html'))
    mainWindow.on('closed', () => {
      mainWindow = null
    });
  }

  // --------------------------
  // It all starts here baby
  // --------------------------
  app.on('ready', async () => {
    ready().then(createWindow)
  })

  app.on('before-quit', () => {
    // Maybe we need this one day.
  });

  app.on('window-all-closed', () => {
    // the user closed the welcome window and is ready to go!
    app.dock.hide()
  });

  app.on('window-all-closed', () => {
    // could be fun
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow(mainWindow)
    }
  })
}

// God bless
initialize()
