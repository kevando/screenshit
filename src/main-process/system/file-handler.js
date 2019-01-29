

// Screenshots
// ===============================================

function handleScreenshot(image) {
	if (settings.get('prompt')) {
		showPrompt(image)
	} else {

		// give tray some flair right after a screen shot
		const iconName = 'icon-tray-active-coolguy.png'
		const iconPath = path.join(__dirname, iconName)
		appIcon.setImage(iconPath)
		setTimeout(() => {
			copyActiveScreenShot(image)
			const iconName = 'icon-tray-idle-paperclip.png'
			const iconPath = path.join(__dirname, iconName)
			appIcon.setImage(iconPath)
		}, 1000)
	}
}


function startWatching() {
	// console.log('start watcuibng')
	const path = settings.get('path')
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
