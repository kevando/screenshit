const { app, Menu, Tray, dialog, nativeImage, clipboard } = require('electron')
const settings = require('electron-settings')
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const version = 'v1'

let watcher = null

// =====================================================
// 	Ready!
// =====================================================

export const ready = async () => {
  settings.set('version', version)

  // Defaults
  const path = settings.get('screenShotPath') || app.getPath('desktop')
  const moj = settings.get('mojave') || 'TRUE'

  // Settings
  setScreenShotPath(path)
  setMojave(moj)
  setPrompt(true)

  // Tray
  createTray()

  // Watcher
  watchFiles(path)

  return 'We are ready my dudes'
}

// =====================================================
// 	Settings!
// =====================================================

const setScreenShotPath = path => {
  exec(`defaults write com.apple.screencapture location ${path}`)
  settings.set('screenShotPath', path)
}

const setMojave = moj => {
  exec(`defaults write com.apple.screencapture show-thumbnail -bool ${moj}`)
  settings.set('mojave', moj)
}

const setPrompt = bool => {
  settings.set('prompt', bool)
}

// =====================================================
// 	Tray!
// =====================================================

let appIcon = null

const createTray = () => {
  // Default
  const iconName = '../assets/tray/icon-tray-idle-paperclip.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  // Pressed
  const iconNamePressed = '../assets/tray/icon-tray-pressed-paperclip.png'
  const iconPathPressed = path.join(__dirname, iconNamePressed)
  appIcon.setPressedImage(iconPathPressed)

  // Menu!
  // ------------------------------------------
  const header = {
    label: '💡 Screen Shit is running',
    sublabel: 'sub',
    enabled: false
  }
  // ------------------------------------------
  const divider = { type: 'separator' }
  // ------------------------------------------
  const mojave = {
    label: 'Disable Mojave utility',
    checked: settings.get('mojave') === 'FALSE',
    type: 'checkbox',
    click: function () {
      if (settings.get('mojave') === 'TRUE') {
        setMojave('FALSE')
      } else {
        setMojave('TRUE')
      }
    }
  }
  // ------------------------------------------
  const welcome = {
    label: 'Welcome',
    click: () => createWindow()
  }
  // ------------------------------------------
  const prompt = {
    label: 'Prompt before copying image',
    checked: settings.get('prompt'),
    type: 'checkbox',
    click: () => {
      const bool = settings.get('prompt')
      setPrompt(!bool)
    }
  }
  // ------------------------------------------
  const savePath = {
    label: settings.get('screenShotPath'),
    click: () => {
      choosePath()
    }
  }
  // ------------------------------------------
  const quit = {
    label: 'Quit',
    click: () => {
      app.quit()
    }
  }

  const template = [
    header,
    divider,
    mojave,
    prompt,
    divider,
    savePath,
    divider,
    quit
  ]
  const contextMenu = Menu.buildFromTemplate(template)

  appIcon.setToolTip('Settings')
  appIcon.setContextMenu(contextMenu)
}

// =====================================================
// 	Dialogs!
// =====================================================

const showPrompt = image => {
  const options = {
    type: 'warning',
    cancelId: 0,
    defaultId: 1,
    buttons: ['No, go away', 'Yes, copy to clipboard'],
    title: 'Question',
    message: 'Do you want to copy this image?'
    // detail: 'It does not really matter',
    // checkboxLabel: 'Remember my answer',
    // checkboxChecked: true,
  }
  dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    if (response === 1) {
      copyImage(image)
    } else {
      // console.log('do nothing')
    }
  })
}

const choosePath = () => {
  dialog.showOpenDialog(
    null,
    {
      title: 'Choose where to save screen shots',
      message: 'Choose where to save screen shots',
      properties: ['openDirectory'],
      buttonLabel: 'Choose'
    },
    directory => {
      const path = directory && directory[0]

      setScreenShotPath(path)

      // Important! Restart file watcher
      if (watcher) watcher.close()
      watchFiles(path)
      appIcon.destroy()
      createTray()
    }
  )
}

// =====================================================
// 	Screen Shots!
// =====================================================

const handleScreenshot = image => {
  if (settings.get('prompt')) {
    showPrompt(image)
  } else {
    copyImage(image)
  }
}

// =====================================================
// 	File Watcher!
// =====================================================

const watchFiles = path => {
  watcher = fs.watch(path, (eventType, filename) => {
    if (
      filename &&
      eventType === 'rename' &&
      filename.substring(0, 11) === 'Screen Shot'
    ) {
      const activeScreenShotPath = path + '/' + filename
      handleScreenshot(activeScreenShotPath)
    }
  })
}

// =====================================================
// 	Copy!
// =====================================================

const copyImage = activeScreenShotPath => {
  if (activeScreenShotPath) {
    const screenshotImage = nativeImage.createFromPath(activeScreenShotPath)
    clipboard.writeImage(screenshotImage)
    makeTray('cool')
  }
}

// =====================================================
// 	Be cool!
// =====================================================
const makeTray = option => {
  const idle = __dirname + '/../assets/tray/icon-tray-idle-paperclip.png'
  const cool = __dirname + '/../assets/tray/icon-tray-active-coolguy.png'

  appIcon.setImage(cool)
  setTimeout(() => appIcon.setImage(idle), 10000)
}
