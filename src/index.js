'use strict';

const {
  app,
  Tray,
  Menu,
  nativeImage,
  clipboard,
  ipcMain,
} = require('electron');

import {
  createWelcomeWindow,
  createPromptWindow,
} from './windows';

import {
  startScreenShotWatcher,
} from './watchers';

import {
  iconPath,
  regularTrayIcon,
} from './helpers';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray = null;
let watcher = null;


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWelcomeWindow(mainWindow);
  // createPromptWindow('TEST');
  tray = new Tray(regularTrayIcon);
  _createTray(tray);
});



// -----------------------------------------------------
// Communicate with Renderer
// -----------------------------------------------------

// fired from welcome.html
ipcMain.on('start-screen-shot-watcher', (event, desktopPath) => {
  startScreenShotWatcher(watcher, desktopPath);

  // This lets us run the app in the background,
  // otherwise it closes with no window.
  app.dock.hide();
  // TODO this should get handled differently
  // works for now. puts app in dock during set up
});


// fired from prompt.html
ipcMain.on('copy-image', (event, screenShotPath) => {
  let screenshotImage = nativeImage.createFromPath(screenShotPath);
  clipboard.writeImage(screenshotImage);
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
