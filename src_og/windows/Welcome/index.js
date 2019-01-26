'use strict';

const {
  app,
  BrowserWindow,
} = require('electron');

// import {
//   iconPath,
//   regularTrayIcon,
// } from './helpers';


// -----------------------------------------------------
// Onboarding Welcome Window
// -----------------------------------------------------

export const createWelcomeWindow = async () => {

  welcomeWindow = new BrowserWindow({
    width: 700,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
    toolbar: false,
    hasShadow: false
  });

  // console.log(`file://${__dirname}/../../index.html`)

  welcomeWindow.windowName = 'Welcome';
  welcomeWindow.loadURL(`file://${__dirname}/../../index.html`);

  welcomeWindow.on('closed', () => {
    welcomeWindow = null;
  });

  welcomeWindow.once('ready-to-show', () => {
    welcomeWindow.show();
    const windowPos = welcomeWindow.getPosition()
    welcomeWindow.setPosition(windowPos[0],windowPos[1]+20,true)
  })

  // setTimeout(() => {
  //   welcomeWindow.webContents.openDevTools();
  // },2000)

}
