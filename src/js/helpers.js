
// var path = require('path'); // probly better to use this

// for  live reloader
export const isDevMode = process.execPath.match(/[\\/]electron/);

export const projectRootPath = __dirname + '/../../';

export const iconPath = __dirname + '/../../app/icon/';


// Tray Icons
// export const activeTrayIcon = iconPath + '16x16.png';
export const regularTrayIcon = iconPath + '16x16_bw.png';
export const activeTrayIcon = iconPath + '16x16.png';
