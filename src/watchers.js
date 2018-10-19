'use strict';

var chokidar = require('chokidar');

import {
  createPromptWindow,
} from './windows';

import {
  changeTrayImage,
} from './index';

import {
  activeTrayIcon,
} from './helpers';


// -----------------------------------------------------
// Watch Desktop for new screen shots
// -----------------------------------------------------

export function startScreenShotWatcher(watcher, desktopPath) {

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
        createPromptWindow(screenShotPath);
        changeTrayImage(activeTrayIcon);
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
