

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
