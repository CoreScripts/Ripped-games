/*:
 * @plugindesc Hides mouse clicks and hides cursor.
 * @author RatedSim
 *
 * @param CursorHideDelay
 * @desc Delay in seconds before hiding the cursor (default: 2)
 * @type number
 * @min 0
 * @default 2
 *
 * @help
 * This plugin completely disables mouse clicks in the game.
 * Also hides the mouse cursor after a specified delay, shows it when the mouse moves.
 * 
 * Compatible with Windows, Linux, Mac, and web.
 */

(function() {
    // Import flag for compatibility
    var Imported = Imported || {};
    Imported.Galv_NoMouse = true;

    // Get plugin parameters
    var parameters = PluginManager.parameters('CursorHideNoMouse');
    var cursorHideDelay = Number(parameters['CursorHideDelay'] || 2) * 1000; // Convert to milliseconds

    // Store the last mouse position
    var lastMouseX = -1;
    var lastMouseY = -1;
    var hideCursorTimeout = null;

    // Function to show cursor
    function showCursor() {
        document.body.style.cursor = 'auto';
    }

    // Function to hide cursor
    function hideCursor() {
        document.body.style.cursor = 'none';
    }

    // Function to reset the hide timer
    function resetHideTimer() {
        clearTimeout(hideCursorTimeout);
        hideCursorTimeout = setTimeout(hideCursor, cursorHideDelay);
    }

    // Alias Scene_Boot start for cursor handling
    var Alias_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        Alias_Scene_Boot_start.call(this);
        
        // Initialize cursor state
        showCursor();
        resetHideTimer();

        // Add mousemove event listener
        document.addEventListener('mousemove', function(event) {
            // Check if mouse actually moved
            if (event.clientX !== lastMouseX || event.clientY !== lastMouseY) {
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
                
                showCursor();
                resetHideTimer();
            }
        });
    };

    // Disable mouse clicks by overwriting TouchInput._onMouseDown
    TouchInput._onMouseDown = function(event) {
        // Overwrite to do nothing
    };
})();