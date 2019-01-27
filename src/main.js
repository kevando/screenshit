// only add update server if it's not being run from cli
if (require.main !== module) {
  require('update-electron-app')({
    logger: require('electron-log')
  })
}

const path = require('path')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

// screenshit
require('./screenshit')

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize () {
  makeSingleInstance()

  // loadDemos()


  // app.on('ready', () => {
  //   createWindow()

  //   // do not show application in doc or tab
  //   app.dock.hide();

  // })

  app.on('window-all-closed', () => {
    app.dock.hide();
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

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
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
// function loadDemos () {
//   const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
//   files.forEach((file) => { require(file) })
// }


initialize()
