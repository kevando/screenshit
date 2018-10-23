'use strict';

const {
  app,
  BrowserWindow,
} = require('electron');

import {
  iconPath,
  regularTrayIcon,
} from './helpers';


// -----------------------------------------------------
// Welcome Window
// -----------------------------------------------------

export const createWelcomeWindow = async () => {
  // console.log('welcomeWindow',welcomeWindow);

  welcomeWindow = new BrowserWindow({
    width: 900,
    height: 450,
    frame: false,
    resizable: false,
  });

  welcomeWindow.windowContainer = 'Welcome';

  welcomeWindow.loadURL(`file://${__dirname}/../index.html`);

  // if (isDevMode) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  //   welcomeWindow.webContents.openDevTools();
  // }

  welcomeWindow.on('closed', () => {
    welcomeWindow = null;
  });
}

// -----------------------------------------------------
// Prompt Window
// -----------------------------------------------------

export const createPromptWindow = async (screenShotPath) => {

  promptWindow = new BrowserWindow({
    width: 350,
    height: 180,
    backgroundColor: '#ddd',
    frame: false,
  });

  // set variable before rendering
  promptWindow.screenShotPath = screenShotPath

  promptWindow.windowContainer = 'Prompt';

  promptWindow.loadURL(`file://${__dirname}/../index.html`);

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
