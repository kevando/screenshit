
const { ipcMain, app, Menu, MenuItem, Tray, dialog, nativeImage, clipboard, BrowserWindow } = require('electron')

const settings = require('electron-settings');

var fs = require('fs');
const { showPrompt } = require('./dialogs')

// Screenshots
// ===============================================

function handleScreenshot(image) {
	if (settings.get('prompt')) {
		showPrompt(image,copyActiveScreenShot)
	} else {

	  copyActiveScreenShot(image)
		// maybe flair the icon here
	}
}


export function startWatcher() {
	// console.log('start watcuibng')
	const path = settings.get('screenShotPath')
	fs.watch(path, (eventType, filename) => {
		if (filename && eventType === 'rename') {
			if (filename.substring(0, 11) === "Screen Shot") {
				// We found a new file and yes it's a SCREEN SHOT!
				// console.log('Found: ' + path+filename)
				const activeScreenShotPath = path + '/' + filename;
				handleScreenshot(activeScreenShotPath)
			}
		}
	});

}


function copyActiveScreenShot(activeScreenShotPath) {
	// console.log(activeScreenShotPath)
	if (activeScreenShotPath) {
		const screenshotImage = nativeImage.createFromPath(activeScreenShotPath);
		clipboard.writeImage(screenshotImage);
		// console.warn(activeScreenShotPath)
	}
}
