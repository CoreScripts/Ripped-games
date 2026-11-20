/*:
 * @plugindesc Automatically sets the correct Greenworks path based on Engine Arch.
 * @author RatedSim
 * @help Ensure all .node and .dll/.so/.dylib files are inside the /lib folder.
 */

(function() {
    var path = require('path');
    var platform = require('os').platform();
    var arch = process.arch; 
    var base = process.cwd();
    var fileName = '';

    if (platform === 'win32') {
        fileName = (arch === 'x64') ? 'greenworks-win64.node' : 'greenworks-win32.node';
    } else if (platform === 'darwin') {
        fileName = 'greenworks-osx64.node';
    } else if (platform === 'linux') {
        fileName = (arch === 'x64') ? 'greenworks-linux64.node' : 'greenworks-linux32.node';
    }

    if (fileName) {
        process.env.GREENWORKS_BIN_PATH = path.join(base, 'lib', fileName);
        console.log("GreenCrossPlatform: Engine is " + arch + ". Loading: " + fileName);
    }
})();