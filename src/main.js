
const { app, BrowserWindow } = require('electron')


const path = require('path')


const {initialConfig} = require('./main-process/config')
const {startWatcher} = require('./main-process/file-handler')
const { createTray } = require('./main-process/tray')

let mainWindow = null

function initialize() {
  makeSingleInstance(); // why?

  function createWindow() {
    const windowOptions = {
      width: 800,
      // minWidth: 680,
      height: 440,
      title: app.getName()
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, './sections/welcome.html'))
    mainWindow.on('closed', () => {
      mainWindow = null
    });
  }

  app.on('ready', async () => {
    await initialConfig()
    await startWatcher()
    createWindow()
    createTray()
  })

  app.on('before-quit', () => {
    // Maybe we need this one day.
  });

  app.on('window-all-closed', () => {
    // the user closed the welcome window and is ready to go!
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

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {


  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    console.log('SECOND INSTANCE???????')
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}


initialize()
