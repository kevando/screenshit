

const { ipcMain, app, Menu, MenuItem, Tray, dialog, nativeImage, clipboard, BrowserWindow } = require('electron')

const settings = require('electron-settings');


export function showPrompt(image, callback) {

	const options = {
		type: 'warning',
		cancelId: 0,
		defaultId: 1,
		buttons: ['No, go away', 'Yes, copy to clipboard'],
		title: 'Question',
		message: 'Do you want to copy this image?',
		// detail: 'It does not really matter',
		// checkboxLabel: 'Remember my answer',
		// checkboxChecked: true,
	};

	dialog.showMessageBox(null, options, (response, checkboxChecked) => {
		// console.log(response);
		// console.log(checkboxChecked);
		if (response === 1) {
			// console.log('go copy')
			callback(image)
		} else {
			// console.log('do nothing')
		}
	});
}





export function choosePath() {
	// console.log('choosey')
	dialog.showOpenDialog(null, {
		title: 'Choose where to save screen shots',
		message: 'some',
		properties: ['openDirectory'],
		buttonLabel: 'Choose'
	}, (directory) => {
		if (directory && directory[0]) {
			setPath(directory[0])

			// also reboot file watcher here
			if (watcher) watcher.close()
			startWatching()

			// also restart tray to reflect new data
			createTray()
			// probly a better place for this
		}
	})
}