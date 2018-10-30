

import { app, Menu, Tray, } from 'electron';
import storage  from 'electron-json-storage';

// -----------------------------------------------------
// Create tray here so it doesnt get garbage collected
// -----------------------------------------------------

export function createTray() {

  var contextMenu = Menu.buildFromTemplate([

    // SETTING: Copy image by default
    { label: 'Copy Image by Default',
      checked: copyImageByDefault,
      type: 'checkbox',
      click:  function(){
        // Toggle Setting
        copyImageByDefault = !copyImageByDefault;
        contextMenu.items[0].checked = copyImageByDefault;
        tray.setContextMenu(contextMenu);
    } },

    // SETTING: Clear any json storage data
    { label: 'Clear Cache',
      click:  function(){
        storage.clear();
    } },

    // Quit App Completely
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
