import { app, BrowserWindow, Menu, Tray, nativeImage, clipboard, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import storage from 'electron-json-storage';

import {
  iconPath,
  regularTrayIcon,
  isDevMode,
  activeTrayIcon
} from './js/helpers';

import {
  createOnboardingWelcomeWindow,
  createOnboardingConfigWindow,
} from './js/windows';

import {
  startScreenShotWatcher,
} from './js/watcher';

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
global.watcher = null;
global.tray = null;

// App variables that should probly go somewhere else as this list grows
global.onboardingComplete = false;
global.copyImageByDefault = false;
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

  // Should we show onboarding????
  storage.get('onboarding', function(error, data) {
    if (error) throw error;
    if(data.completed) {
      onboardingComplete = true;
    } else {
      createOnboardingWelcomeWindow();
    }
  });

  // SECOND Create a new system tray icon
  tray = new Tray(activeTrayIcon);
  createTray();

  // THIRD start the file watcher
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
// ==============================================================



// -----------------------------------------------------
// Communicate with Renderer
// -----------------------------------------------------

// USER CLICKED DONE IN ONBOARDING
ipcMain.on('first-screen-shot-saved', (event, state) => {

  // If user checked Copy Image, lets copy that image!
  if(state.copyImage === true)
    copyActiveScreenShot();

  // Set this so user does not have to see it in the future
  storage.set('onboarding', { completed: true });
  onboardingComplete = true;

  // lets also send a response back to the onboarding window to close
  event.sender.send('image-process-complete', 'success');
});

// USER CLICKED DONE IN PROMPT
ipcMain.on('done-with-screen-shot', (event, state) => {

  // If user checked Copy Image, lets copy that image!
  if(state.copyImage === true)
    copyActiveScreenShot();

  // let window know that it can close
  event.sender.send('image-process-complete', 'success')
});


// -----------------------------------------------------
// Handle Screen shot.
// I expect this function to grow into the core application code
// -----------------------------------------------------

function copyActiveScreenShot() {
  if(activeScreenShotPath) {
    const screenshotImage = nativeImage.createFromPath(activeScreenShotPath);
    clipboard.writeImage(screenshotImage);
    activeScreenShotPath = null;
  } else {
    console.log('NO activeScreenShotPath');
  }

}
