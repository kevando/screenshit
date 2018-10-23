'use strict';

const {
  app,
  BrowserWindow,
} = require('electron');

import {
  iconPath,
  regularTrayIcon
} from './helpers';

import {
  changeTrayImage,
} from './index';


// -----------------------------------------------------
// Welcome Window
// -----------------------------------------------------

export function createWelcomeWindow(mainWindow) {

  // mainWindow = new BrowserWindow({
  //   width: 900,
  //   height: 450,
  //   // skipTaskbar: true,
  //   // autoHideMenuBar: true,
  //   frame: false,
  // });
  //
  // // Debug
  // promptWindow.webContents.openDevTools();
  //
  // // and load the index.html of the app.
  // mainWindow.loadURL('file://' + __dirname + '/html/welcome.html');
  //
  // mainWindow.on('minimize',function(event){
  //   event.preventDefault();
  //   mainWindow.hide();
  // });
  //
  // // Emitted when the window is closed.
  // mainWindow.on('closed', function() {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   mainWindow = null;
  // });
}

// -----------------------------------------------------
// Prompt Window
// -----------------------------------------------------

export function createPromptWindow(screenShotPath) {

  // this might get garbage collected
  let promptWindow = new BrowserWindow({
    width: 350,
    height: 150,
    backgroundColor: '#ddd',
    frame: false,
  });

  // set variable before rendering
  promptWindow.screenShotPath = screenShotPath

  // Debug
  // promptWindow.webContents.openDevTools();

  // load html
  promptWindow.loadURL('file://' + __dirname + '/html/prompt.html');

  promptWindow.on('minimize',function(event){
    event.preventDefault();
    promptWindow.hide();
  });

  // Emitted when the window is closed.
  promptWindow.on('closed', function() {
    changeTrayImage(regularTrayIcon);
    promptWindow = null;
  });
}
