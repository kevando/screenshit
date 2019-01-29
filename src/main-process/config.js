
// Settings
// ===============================================

const { app, ipcMain, ipcRenderer } = require('electron')
const  settings = require('electron-settings');
const { exec, spawn } = require('child_process');


export async function initialConfig() {

	// Screen Shot Save Path
	const path = settings.get('screenShotPath') || app.getPath('desktop')
	setScreenShotPath(path)
	// ipcRenderer.send('settings-path')

	console.log(path)

	// Mojave Utility
	const mojave = settings.get('mojave') || 'TRUE'
	setMojave(mojave)
	
	// Prompt user? Always on start up
	// const prompt = settings.has('prompt') && || 'TRUE'
	setPrompt(true)

	// setOpenOnStart()
}

function setScreenShotPath(path) {
	exec(`defaults write com.apple.screencapture location ${path}`)
	settings.set('screenShotPath', path)
}

function setMojave(bool) {
	exec(`defaults write com.apple.screencapture show-thumbnail -bool ${bool}`)
	settings.set('mojave', bool)
}


function setPrompt(bool) {
	settings.set('prompt', !bool)
}


// function setOpenOnStart(bool) {
// 	app.setLoginItemSettings({
// 		openAtLogin: bool,
// 	})
// 	settings.set('openOnStart', bool)
// }