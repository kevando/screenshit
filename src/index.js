import { app, BrowserWindow, Menu, Tray, nativeImage, clipboard, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
const storage = require('electron-json-storage');

import {
  iconPath,
  regularTrayIcon,
  isDevMode
} from './js/helpers';

import {
  createWelcomeWindow,
} from './js/windows';

import {
  startScreenShotWatcher,
} from './js/watcher';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let tray;


// Trying to use a global var
global.welcomeWindow = null;
global.promptWindow = null;
global.watcher = null;
// used in watcher for chokidar.
// scanComplete also tells us if watcher is enabled or not.
// global.scanComplete = false;


// Development settings
if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });






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
  createWelcomeWindow();

  // DEBUG
  // _createPromptWindow('file/imagepage')

  // Create system tray every time app loads
  tray = new Tray(regularTrayIcon);
  _createTray(tray);

  const desktopPath = app.getPath('desktop');
  startScreenShotWatcher(desktopPath);

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
