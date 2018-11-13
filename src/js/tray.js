import { app, Menu, Tray, MenuItem } from 'electron';
import storage  from 'electron-json-storage';
const settings = require('electron-settings');
const os = require('os');
const { exec  } = require('child_process');

// -----------------------------------------------------
// Create tray here so it doesnt get garbage collected
// -----------------------------------------------------

export function createTray() {

  var contextMenu = Menu.buildFromTemplate([

    // Quit App Completely
    { label: 'Quit ScreenShit', click:  function(){
      app.isQuiting = true;
      app.quit();
    } }
  ]);

  tray.setToolTip('ScreenShit')
  tray.setContextMenu(contextMenu)

  // console.log(os.platform())


  contextMenu.append(new MenuItem(
    { label: 'Disable Mojave Screen Shot Utility',
      checked: settings.get('mojaveUtility'),
      type: 'checkbox',
      click:  function() {
        // Toggle Setting
        if(settings.get('mojaveUtility.disabled') === true) {
          exec('defaults write com.apple.screencapture show-thumbnail -bool TRUE');
          settings.set('mojaveUtility',{disabled: false});
        } else {
          exec('defaults write com.apple.screencapture show-thumbnail -bool FALSE');
          settings.set('mojaveUtility',{disabled: true});
        }

    } },
  ));


  tray.setContextMenu(contextMenu);

}

// changes when user takes screenshot
export function changeTrayImage(trayIcon) {
  tray.setImage(trayIcon);
}
