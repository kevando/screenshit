
const path = require('path')
const { ipcMain, app, Menu, MenuItem, Tray, dialog, nativeImage, clipboard, } = require('electron')

const settings = require('electron-settings');

var fs = require('fs');

const { exec, spawn } = require('child_process');


let appIcon = null


// ipcMain.on('remove-tray', () => {
// 	appIcon.destroy()
// })

app.on('window-all-closed', () => {
	if (appIcon) appIcon.destroy()
})


// screenshit
app.on('ready', async () => {

	try {

		console.log('1. Settings')
		await getSettings()

		console.log('2. Create Tray')
		await createTray()

		console.log('3. Start Watching')
		startWatching()

	} catch (error) {
		console.log(error)
	}
})

async function getSettings() {

	if (!settings.has('path')) {
		// Force it to be desktop
		const path = app.getPath('desktop')
		setPath(path)
	}

	if (!settings.has('mojave')) {
		// Force it to be enabled
		setMojave('TRUE')
	}

	if (!settings.has('openOnStart')) {
		setOpenOnStart(true)
	}

	return
}

function setPath(path) {
	exec(`defaults write com.apple.screencapture location ${path}`)
	settings.set('path', path)
	appIcon.destroy()
	createTray()
}

function setMojave(bool) {
	exec(`defaults write com.apple.screencapture show-thumbnail -bool ${bool}`)
	settings.set('mojave', bool)
}

function setOpenOnStart(bool) {
	app.setLoginItemSettings({
		openAtLogin: bool,
	})
	settings.set('openOnStart', bool)
}

// Create Tray
async function createTray() {
	console.log('createTray', settings.get('mojave'))
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
	const iconPath = path.join(__dirname, iconName)
	appIcon = new Tray(iconPath)

	const contextMenu = Menu.buildFromTemplate([

		{
			label: 'Quit', click: function () {
				app.quit();
			}
		},


	])

	appIcon.setToolTip('Settings')
	appIcon.setContextMenu(contextMenu)


	contextMenu.append(new MenuItem(
		{
			label: settings.get('path'),
			click: function () {
				choosePath()

			}
		},
	));

	contextMenu.append(new MenuItem(
		{
			label: 'Disable Mojave Screen Shot Utility',
			checked: settings.get('mojave') === 'FALSE',
			type: 'checkbox',
			click: function () {
				// Toggle Setting
				if (settings.get('mojave') === 'TRUE') {
					setMojave('FALSE')
				} else {
					setMojave('TRUE')
				}

			}
		},
	));

	contextMenu.append(new MenuItem(
		{
			label: 'Open on start up',
			checked: settings.get('openOnStart'),
			type: 'checkbox',
			click: function () {
				// Toggle Setting
				const bool = settings.get('openOnStart')
				setOpenOnStart(!bool)

			}
		},
	));


	appIcon.setContextMenu(contextMenu);
}


function choosePath() {
	dialog.showOpenDialog({
		properties: ['openDirectory']
	}, (directory) => {
		if (directory && directory[0]) {
			setPath(directory[0])
		}
	})
}


function copyActiveScreenShot(activeScreenShotPath) {
	// console.log(activeScreenShotPath)
	if (activeScreenShotPath) {
		const screenshotImage = nativeImage.createFromPath(activeScreenShotPath);
		//   clipboard.writeImage(screenshotImage);
		console.warn(activeScreenShotPath)
	}
}

// ==============================================================

function startWatching() {
	const path = settings.get('path')
	fs.watch(path, (eventType, filename) => {
		if (filename && eventType === 'rename') {
			if (filename.substring(0, 11) === "Screen Shot") {
				// We found a new file and yes it's a SCREEN SHOT!
				activeScreenShotPath = path + '/' + filename;
				copyActiveScreenShot(activeScreenShotPath);
			}
		}
	});

}
