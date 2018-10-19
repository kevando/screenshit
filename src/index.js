'use strict';

const {app, Menu, Tray, BrowserWindow, Notification} = require('electron');

var chokidar = require('chokidar');
var fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray = null;
let watcher = null;


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// app.dock.hide();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createTray();
  createBrowserWindow();

  var screenshotPath = app.getPath('desktop');
  console.log('screenshotPath',screenshotPath)

  startWatcher(screenshotPath);


});

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


function createBrowserWindow() {


  console.log('CREATE')
  var notif = new Notification('New Screenshot!', {
    'body':  'native html5 notif',
    'icon': __dirname + '/assets/notificationIcon.png'
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
    // skipTaskbar: true,
    // autoHideMenuBar: true,
    // backgroundColor: '#66CD00',
    // show: false
    // icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    icon: __dirname + '/assets/icons/png/64x64.png'
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  // i think this prevents the user from quitting the app
  // mainWindow.on('close', function (event) {
  //   if(!app.isQuiting){
  //       event.preventDefault();
  //       mainWindow.hide();
  //   }
  //   return false;
  // });


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });



}


// WATCHER

function startWatcher(path){
  let scanComplete = false;
    // document.getElementById("start").disabled = true;
    // document.getElementById("messageLogger").innerHTML = "Scanning the path, please wait ...";
    watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
    });
    function onWatcherReady(){
        console.info('From here can you check for real changes, the initial scan has been completed.');
        scanComplete = true;
        // document.getElementById("stop").style.display = "block";
        // document.getElementById("messageLogger").innerHTML = "The path is now being watched";
    }
    watcher
    .on('add', function(path) {

      if(scanComplete) {
        if(path.includes("Screen Shot")) {
          console.log("SCREEN SHOT",path);
          var notif = new Notification({
            'title': 'New Screenshot',
            // 'body':  'native html5 notif',
            'icon': __dirname + '/assets/notificationIcon.png'
          });
          notif.show();
        }
      }

    })
    // .on('addDir', function(path) {
    //      console.log('Directory', path, 'has been added');
    //      if(showInLogFlag){
    //          addLog("Folder added : "+path,"new");
    //      }
    //  })
    // .on('change', function(path) {
    //     console.log('File', path, 'has been changed');
    //     if(showInLogFlag){
    //         addLog("A change ocurred : "+path,"change");
    //     }
    // })
    // .on('unlink', function(path) {
    //     console.log('File', path, 'has been removed');
    //     if(showInLogFlag){
    //         addLog("A file was deleted : "+path,"delete");
    //     }
    // })
    // .on('unlinkDir', function(path) {
    //     console.log('Directory', path, 'has been removed');
    //     if(showInLogFlag){
    //         addLog("A folder was deleted : "+path,"delete");
    //     }
    // })
    // .on('error', function(error) {
    //     console.log('Error happened', error);
    //     if(showInLogFlag){
    //         addLog("An error ocurred: ","delete");
    //         console.log(error);
    //     }
    // })
    .on('ready', onWatcherReady)
    .on('raw', function(event, path, details) {
        // This event should be triggered everytime something happens.
        console.log('Raw event info:', event, path, details);
    });
}
