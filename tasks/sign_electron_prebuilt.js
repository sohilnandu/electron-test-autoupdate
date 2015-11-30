/**
 * THIS WILL SIGN THE DEV ELECTRON PREBUILT APP IN NODE MODULES
 * This is for signing on osx. Will not work for windows or linux
 */

var childProcess = require('child_process');
var electron = require('electron-prebuilt');

var codeSigningID = 'E4FYDUKE2V'l

var sign = childProcess.spawn('codesign', ['--deep', '--force', '--sign', codeSigningID, electron]);

sign.on('close', function(code){
    console.log('Singing closed. Code: ' + code);
});