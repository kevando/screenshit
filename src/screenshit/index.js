
const path = require('path')
const { ipcMain, app, Menu, MenuItem, Tray, dialog, nativeImage, clipboard, BrowserWindow } = require('electron')

const settings = require('electron-settings');

var fs = require('fs');

const { exec, spawn } = require('child_process');


let appIcon = null
let watcher = null
let mainWindow = null


app.on('ready', () => {
    createWindow()

    // do not show application in doc or tab
    app.dock.hide();

  })

app.on('before-quit', () => {
	// enable this because electron-settings isnt working good atm
	// wont pull right setting onload
	// exec('defaults write com.apple.screencapture show-thumbnail -bool TRUE');
	// console.log('done')
});

app.on('window-all-closed', () => {
	// the user closed the welcome window and is ready to go
})


// Window!
// ===============================================

function createWindow() {
	const windowOptions = {
		width: 800,
		// minWidth: 680,
		height: 440,
		title: app.getName()
	}

	mainWindow = new BrowserWindow(windowOptions)
	mainWindow.loadURL(path.join('file://', __dirname, '../welcome.html'))

	// Launch fullscreen with DevTools open, usage: npm run debug
	// if (debug) {
	//   mainWindow.webContents.openDevTools()
	//   mainWindow.maximize()
	//   require('devtron').install()
	// }

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

// Settings
// ===============================================

async function initSettings() {
	if (!settings.has('path')) {
		const path = app.getPath('desktop')
		setPath(path)
	}
	if (!settings.has('mojave')) { setMojave('TRUE') }
	if (!settings.has('openOnStart')) { setOpenOnStart(true) }
	if (!settings.has('prompt')) { togglePrompt() }
	return
}

function setPath(path) {
	exec(`defaults write com.apple.screencapture location ${path}`)
	settings.set('path', path)
	if (appIcon) appIcon.destroy()
	createTray()

	// also reboot the watcher
	if (watcher) watcher.close()
	startWatching()
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
function togglePrompt() {
	const bool = settings.get('prompt')
	settings.set('prompt', !bool)
}

// Tray
// ===============================================

async function createTray() {
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
	const iconPath = path.join(__dirname, iconName)
	appIcon = new Tray(iconPath)

	const contextMenu = Menu.buildFromTemplate([

		{
			label: 'screenshit settings',
			sublabel: 'sub',
			enabled: false,
		},
		{
			label: 'Welcome',
			click: () => createWindow()
		},
		{
			type: 'separator',

		},
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
		{
			label: 'Prompt Me before copying image',
			checked: settings.get('prompt'),
			type: 'checkbox',
			click: () => { togglePrompt() }
		},

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

		{
			type: 'separator',

		},
		{
			label: 'Directory where screen shots save',
			enabled: false,
		},


		{
			label: settings.get('path'),
			click: () => {choosePath()}
		},

		{ type: 'separator'},
		{
			label: 'Quit',
			click: () => { app.quit() }
		},



	])
	appIcon.setToolTip('Settings')
	appIcon.setContextMenu(contextMenu)

}


function choosePath() {
	// console.log('choosey')
	dialog.showOpenDialog(null, {
		title: 'Choose where to save screen shots',
		message: 'some',
		properties: ['openDirectory'],
		buttonLabel: 'Choose'
	}, (directory) => {
		if (directory && directory[0]) {
			setPath(directory[0])
		}
	})
}

// Screenshots
// ===============================================

function handleScreenshot(image) {
	if (settings.get('prompt')) {
		showPrompt(image)
	} else {

		// give tray some flair right after a screen shot
		appIcon.setHighlightMode('always')
		setTimeout(() => {
			copyActiveScreenShot(image)
			appIcon.setHighlightMode('selection')
		}, 500)
	}
}

function showPrompt(image) {

	const options = {
		type: 'warning',
		cancelId: 0,
		defaultId: 1,
		buttons: ['No, Close', 'Yes, Copy to Clipboard'],
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
			copyActiveScreenShot(image)
		} else {
			// console.log('do nothing')
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


function startWatching() {
	const path = settings.get('path')
	fs.watch(path, (eventType, filename) => {
		if (filename && eventType === 'rename') {
			if (filename.substring(0, 11) === "Screen Shot") {
				// We found a new file and yes it's a SCREEN SHOT!
				const activeScreenShotPath = path + '/' + filename;
				handleScreenshot(activeScreenShotPath)
			}
		}
	});

}


// Main Function!!
// ===============================================

app.on('ready', async () => {
	try {
		await initSettings()
		await createTray()
		startWatching()
	} catch (error) {
		console.log(error)
	}
})