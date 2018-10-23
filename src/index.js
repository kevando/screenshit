import { app, BrowserWindow, Menu, Tray, nativeImage, clipboard, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
const storage = require('electron-json-storage');

import {
  iconPath,
  regularTrayIcon,
} from './helpers';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let promptWindow;
let tray;
let watcher;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });


// -----------------------------------------------------
// Create windows
// -----------------------------------------------------

const _createWelcomeWindow = async () => {

  mainWindow = new BrowserWindow({
    width: 900,
    height: 450,
    frame: false,
    resizable: false,
  });

  mainWindow.windowContainer = 'Welcome';

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};


// -----------------------------------------------------
// Prompt Window
// -----------------------------------------------------

function _createPromptWindow(screenShotPath) {

  // this might get garbage collected
  promptWindow = new BrowserWindow({
    width: 350,
    height: 180,
    backgroundColor: '#ddd',
    frame: false,
  });

  // set variable before rendering
  promptWindow.screenShotPath = screenShotPath

  promptWindow.windowContainer = 'Prompt';

  promptWindow.loadURL(`file://${__dirname}/index.html`);

  // Debug
  // promptWindow.webContents.openDevTools();

  promptWindow.on('minimize',function(event){
    event.preventDefault();
    promptWindow.hide();
  });

  // Emitted when the window is closed.
  // promptWindow.on('closed', function() {
  //   changeTrayImage(regularTrayIcon);
  //   promptWindow = null;
  // });
}


const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  // const defaultDataPath = storage.getDefaultDataPath()
  // console.log(defaultDataPath)

  // storage.getAll((error, data) => {
  //   if (error) throw error;
  //   console.log('data',data);
  // });

  // is app enabled does data persist?
  // storage.get('settings', function(error, data) {
  //   if (error) throw error;
  //
  //   console.log(data);
  //   if(Object.keys(data).length === 0) {
  //     console.log('no settings ever saved')
  //
  //     storage.set('settings', { foo: 'bar' }, function(error) {
  //       if (error) throw error;
  //     });
  //
  //   }
  // });

  // show welcome window every time app loads.
  _createWelcomeWindow();

  // DEBUG
  // _createPromptWindow('file/imagepage')

  // Create system tray every time app loads
  tray = new Tray(regularTrayIcon);
  _createTray(tray);


  _startScreenShotWatcher();

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// -----------------------------------------------------
// Communicate with Renderer
// -----------------------------------------------------

ipcMain.on('start-screen-shot-watcher', (event, desktopPath) => {
  console.log('?',desktopPath)
});

ipcMain.on('copy-image', (event, screenShotPath) => {
  // let screenshotImage = nativeImage.createFromPath(screenShotPath);
  // clipboard.writeImage(screenshotImage);
  // changeTrayImage(regularTrayIcon);
});


// -----------------------------------------------------
// Create tray here so it doesnt get garbage collected
// -----------------------------------------------------

function _createTray(tray) {

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Quit ScreenShit', click:  function(){
      app.isQuiting = true;
      app.quit();
    } }
  ]);

  tray.setToolTip('ScreenShit')
  tray.setContextMenu(contextMenu)
}

// changes when user takes screenshot
export function changeTrayImage(trayIcon) {
  tray.setImage(trayIcon);
}


// -----------------------------------------------------
// Watch Desktop for new screen shots
// -----------------------------------------------------

var chokidar = require('chokidar');

function _startScreenShotWatcher() {

  const desktopPath = app.getPath('desktop');

  let scanComplete = false;

  // PATH WATCHER
  watcher = chokidar.watch(desktopPath, {
    ignored: /[\/\\]\./,
    persistent: true
  });

  function onWatcherReady(){
    console.info('From here can you check for real changes, the initial scan has been completed.');
    scanComplete = true;
  }

  function onAdd(screenShotPath){
    if(scanComplete) {
      if(screenShotPath.includes("Screen Shot")) {
        _createPromptWindow(screenShotPath);
        // changeTrayImage(activeTrayIcon);
      }
    }
  }

  function onRaw(event, path, details) {
    // This event should be triggered everytime something happens.
    // console.log('Raw event info:', event, path, details);
  }

  // PATH WATCHER LISTENERS
  watcher
    .on('add', onAdd)
    .on('ready', onWatcherReady)
    .on('raw', onRaw);
}
