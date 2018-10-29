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
// Onboarding Welcome Window
// -----------------------------------------------------

export const createOnboardingWelcomeWindow = async () => {

  welcomeWindow = new BrowserWindow({
    width: 700,
    height: 350,
    frame: false,
    resizable: false,
  });

  welcomeWindow.windowContainer = 'OnboardingWelcome';
  welcomeWindow.loadURL(`file://${__dirname}/../index.html`);

  welcomeWindow.on('closed', () => {
    welcomeWindow = null;
  });
  // welcomeWindow.webContents.openDevTools();
}

// -----------------------------------------------------
// Onboarding Config Window
// -----------------------------------------------------

export const createOnboardingConfigWindow = async () => {

  // close the first onboarding window
  welcomeWindow.close();


  welcomeWindow = new BrowserWindow({
    width: 700,
    height: 350,
    frame: false,
    resizable: false,
  });

  welcomeWindow.windowContainer = 'OnboardingConfig';
  welcomeWindow.loadURL(`file://${__dirname}/../index.html`);

  welcomeWindow.on('closed', () => {
    welcomeWindow = null;
  });
  // welcomeWindow.webContents.openDevTools();
}

// -----------------------------------------------------
// Onboarding Complete Window
// -----------------------------------------------------

export const createOnboardingCompleteWindow = async () => {
  // console.log('welcomeWindow',welcomeWindow);

  // welcomeWindow = new BrowserWindow({
  //   width: 700,
  //   height: 350,
  //   frame: false,
  //   resizable: false,
  // });
  //
  // welcomeWindow.windowContainer = 'OnboardingComplete';
  //
  // welcomeWindow.loadURL(`file://${__dirname}/../index.html`);
  //
  // // if (isDevMode) {
  // //   await installExtension(REACT_DEVELOPER_TOOLS);
  //   // welcomeWindow.webContents.openDevTools();
  // // }
  //
  // welcomeWindow.on('closed', () => {
  //   welcomeWindow = null;
  // });
}

// -----------------------------------------------------
// Prompt Window
// -----------------------------------------------------

export const createPromptWindow = async () => {

  promptWindow = new BrowserWindow({
    width: 400,
    height: 220,
    backgroundColor: '#ddd',
    frame: false,
  });

  promptWindow.screenShotPath = activeScreenShotPath;
  promptWindow.copyImageByDefault = copyImageByDefault;
  promptWindow.windowContainer = 'Prompt';

  promptWindow.loadURL(`file://${__dirname}/../index.html`);

  // Emitted when the window is closed.
  // promptWindow.on('closed', function() {
  //   changeTrayImage(regularTrayIcon);
  //   promptWindow = null;
  // });
    // promptWindow.webContents.openDevTools();
}
