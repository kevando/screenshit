const path = require('path')
const {ipcMain, app, Menu, Tray} = require('electron')

const settings = require('electron-settings');

let appIcon = null

const { choosePath } = require('./dialogs')

// Tray
// ===============================================

export function createTray() {

	const iconName = '../../assets/tray/icon-tray-idle-paperclip.png'
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

		// {
		// 	label: 'Open on start up',
		// 	checked: settings.get('openOnStart'),
		// 	type: 'checkbox',
		// 	click: function () {
		// 		// Toggle Setting
		// 		const bool = settings.get('openOnStart')
		// 		setOpenOnStart(!bool)

		// 	}
		// },

		{
			type: 'separator',

		},
		{
			label: 'Oh Hello, there',
			enabled: false,
		},


		{
			label: settings.get('screenShotPath'),
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



// // give tray some flair right after a screen shot
// const iconName = 'icon-tray-active-coolguy.png'
// const iconPath = path.join(__dirname, iconName)
// appIcon.setImage(iconPath)
// setTimeout(() => {
	
// 	const iconName = 'icon-tray-idle-paperclip.png'
// 	const iconPath = path.join(__dirname, iconName)
// 	appIcon.setImage(iconPath)
// }, 1000)