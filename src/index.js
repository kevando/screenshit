'use strict';

const {
  app,
  Menu,
  Tray,
  BrowserWindow,
  Notification,
  dialog,
  clipboard,
  nativeImage
} = require('electron');

var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');

// const iconPath = path.join(___dirname, '')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray = null;
let watcher = null;

let desktopPath = null;



// app.dock.hide();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // createTray();
  createBrowserWindow();

  var screenshotPath = app.getPath('desktop');
  console.log('screenshotPath',screenshotPath)
  //
  startWatcher(screenshotPath);


});


// -----------------------------------------------------
// -----------------------------------------------------

function createBrowserWindow() {

  mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
    // skipTaskbar: true,
    // autoHideMenuBar: true,
    // backgroundColor: '#66CD00',
    // show: false
    // icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    // icon: __dirname + '/assets/icons/png/64x64.png'
  });

  // desktopPath = app.getPath('desktop')
  //
  // console.log('desktopPath',desktopPath);


  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // now send the html some data
  mainWindow.webContents.send('desktop-path', desktopPath);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();


  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });



}

// -----------------------------------------------------
// -----------------------------------------------------

function createTray() {


  tray = new Tray(__dirname + '/assets/trayIcon.png');

  // const contextMenu = Menu.buildFromTemplate([
  //     {label: 'Item1', type: 'radio'},
  //     {label: 'Item2', type: 'radio'},
  //     {label: 'Item3', type: 'radio', checked: true},
  //     {label: 'Item4', type: 'radio'}
  //   ])

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        mainWindow.show();
    } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
]);
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)




}

// WATCHER

function startWatcher(path) {

  let scanComplete = false;

  watcher = chokidar.watch(path, {
      ignored: /[\/\\]\./,
      persistent: true
  });

  function onWatcherReady(){
      console.info('From here can you check for real changes, the initial scan has been completed.');
      scanComplete = true;
  }

    watcher
    .on('add', function(path) {

      if(scanComplete) {
        if(path.includes("Screen Shot")) {
          console.log("SCREEN SHOT",path);

          const dialogOptions = {type: 'info', buttons: ['OK', 'Cancel'], message: 'Copy image to clipboard?'}

          dialog.showMessageBox(dialogOptions, i => {

            let screenshotImage = nativeImage.createFromPath(path)
            console.log(screenshotImage)

            if(i === 0) {
              clipboard.writeImage(screenshotImage)
            }

          })

          // var notif = new Notification({
          //   'title': 'New Screenshot',
          //   // 'body':  'native html5 notif',
          //   'icon': __dirname + '/assets/notificationIcon.png'
          // });
          // notif.show();
        }
      }

    })

    .on('ready', onWatcherReady)
    .on('raw', function(event, path, details) {
        // This event should be triggered everytime something happens.
        console.log('Raw event info:', event, path, details);
    });
}
