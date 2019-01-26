'use strict';

const {
  app,
  BrowserWindow,
} = require('electron');


// -----------------------------------------------------
// Onboarding Welcome Window
// -----------------------------------------------------

export const createPromptWindow = async () => {

  welcomeWindow = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    resizable: false,
    show: false,
  });

  welcomeWindow.windowName = 'Prompt';
  welcomeWindow.loadURL(`file://${__dirname}/../../index.html`);

  welcomeWindow.on('closed', () => {
    welcomeWindow = null;
  });

  welcomeWindow.once('ready-to-show', () => {
    welcomeWindow.show();
    const windowPos = welcomeWindow.getPosition()
    welcomeWindow.setPosition(windowPos[0],windowPos[1]-40,true)
  })

  // setTimeout(() => {
    // welcomeWindow.webContents.openDevTools();
  // },2000)

}
