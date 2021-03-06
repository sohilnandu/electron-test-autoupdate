// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');
var autoUpdater = require('auto-updater');

autoUpdater.setFeedURL('http://localhost:6000/update/osx/' + app.getVersion());

autoUpdater.on('checking-for-update', function() {
    console.log("checking-for-update");
});

autoUpdater.on('update-available', function() {
    console.log("update-available");

});

autoUpdater.on('update-not-available', function() {
    console.log("update-not-available");

});

autoUpdater.on('update-downloaded', function() {
    console.log("update-downloaded");
    autoUpdater.quitAndInstall();
});
//autoUpdater.on('error', function(err){
//    console.log('auto-updater error: ' + err);
//
//});

autoUpdater.checkForUpdates();

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    if (env.name === 'test') {
        mainWindow.loadURL('file://' + __dirname + '/spec.html');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/app.html');
    }

    if (env.name !== 'production') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});
