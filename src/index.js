import { app, BrowserWindow, Menu, Tray, nativeImage, clipboard, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import storage from 'electron-json-storage';
// const { exec, spawn } = require('child_process');
var fs = require('fs');

import {
  iconPath,
  regularTrayIcon,
  isDevMode,
  activeTrayIcon
} from './js/helpers';


import {
  createWelcomeWindow,
} from './windows/Welcome';

// import {
//   createPromptWindow,
// } from './windows/Prompt';


import {
  createTray,
  changeTrayImage
} from './js/tray';


// -----------------------------------------------------
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// electron stuff
global.welcomeWindow = null;
global.promptWindow = null;
global.mainWindow = null;
global.watcher = null;
global.tray = null;

// App variables that should probly go somewhere else as this list grows
global.activeScreenShotPath = null;
global.desktopPath = app.getPath('desktop');


// Development settings
if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });


// ==============================================================
// MAIN FUNCTION
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  // Load the Tray
  tray = new Tray(activeTrayIcon);
  createTray();

  // Start the file watcher
  startScreenShotWatcher(desktopPath);

  // Welcome new users

});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// ==============================================================


// -----------------------------------------------------
// Handle Screen shot.
// I expect this function to grow into the core application code
// -----------------------------------------------------

function copyActiveScreenShot() {
  // console.log(activeScreenShotPath)
  if(activeScreenShotPath) {
    const screenshotImage = nativeImage.createFromPath(activeScreenShotPath);
    clipboard.writeImage(screenshotImage);
    activeScreenShotPath = null;
  }
}

// ==============================================================

function startScreenShotWatcher(path) {
  fs.watch(path,  (eventType, filename) => {
  if (filename && eventType === 'rename') {
    if(filename.substring(0,11) === "Screen Shot") {
      // We found a new file and yes it's a SCREEN SHOT!
      activeScreenShotPath = path + '/' + filename;
        copyActiveScreenShot();
    }
  }
});

}

// ==============================================================

function _initializeUI() {
  app.dock.hide();
}

//   exec('defaults write com.apple.screencapture show-thumbnail -bool FALSE', function(error, stdout, stderr) {
//     console.log('exec')
//     console.log(error,stdout)
//   // work with result
// });


  // exec('defaults write com.apple.screencapture show-thumbnail -bool FALSE');
