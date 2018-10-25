import { ipcMain } from 'electron';
var chokidar = require('chokidar');

import {
  createPromptWindow,
  createOnboardingConfigWindow
} from './windows';

// -----------------------------------------------------
// Watch Desktop for new screen shots
// -----------------------------------------------------



export function startScreenShotWatcher(path) {

  let scanComplete = false;

  // PATH WATCHER
  watcher = chokidar.watch(path, {
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

        // We found a new file and yes it's a SCREEN SHOT!
        activeScreenShotPath = screenShotPath;

        if(onboardingComplete === true)
          createPromptWindow(screenShotPath);
        else
          createOnboardingConfigWindow(screenShotPath);
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
