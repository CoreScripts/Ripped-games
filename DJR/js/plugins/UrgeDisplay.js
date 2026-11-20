/*:
 * @plugindesc Displays a chosen variable's value at the top-right corner of the screen with number changing animation. Appears below all images.
 * @author RatedSim
 *
 * @help
 * Plugin Commands:
 * ShowUrge    # Shows the urge variable display at the top right.
 * HideUrge    # Hides the urge variable display.
 *
 * @param Variable ID
 * @desc The ID of the game variable to display as Urge.
 * @default 50
 * @type variable
 *
 * @param Text Color
 * @desc The color of the displayed text. Use CSS color names or hex codes.
 * @default #ff0000
 *
 * @param Font Size
 * @desc Font size for the displayed text.
 * @default 48
 *
 * @param Offset X
 * @desc X-axis offset from the top right of the screen. Positive moves right, negative moves left.
 * @default 0
 *
 * @param Offset Y
 * @desc Y-axis offset from the top right of the screen. Positive moves down, negative moves up.
 * @default 0
 *
 * @param Show Label
 * @desc Whether to show a text label before the variable value (e.g., "Urge: 123").
 * @type boolean
 * @default false
 *
 * @param Label Text
 * @desc The text label to display before the variable value. Only used if 'Show Label' is true.
 * @default Urge:
 *
 * @param Fade Duration
 * @desc The duration of the fade-in/out effect in frames (60 frames = 1 second).
 * @default 30
 *
 * @param Number Animation Duration
 * @desc The duration of the number change animation in frames (60 frames = 1 second).
 * @default 60
 */

(function() {

    var pluginName = 'UrgeDisplay';
    var parameters = PluginManager.parameters(pluginName);

    // Parse parameters
    var variableId = Number(parameters['Variable ID'] || 50);
    var textColor = String(parameters['Text Color'] || '#ff0000');
    var fontSize = Number(parameters['Font Size'] || 48);
    var offsetX = Number(parameters['Offset X'] || 0);
    var offsetY = Number(parameters['Offset Y'] || 0);
    var showLabel = String(parameters['Show Label'] || 'false') === 'true';
    var labelText = String(parameters['Label Text'] || 'Urge:');
    var fadeDuration = Number(parameters['Fade Duration'] || 30);
    var numberAnimationDuration = Number(parameters['Number Animation Duration'] || 60);

    // Store state globally
    var _urgeDisplayVisible = false; // Start hidden
    var _lastVariableValue = null; // To detect value changes
    var _displayedValue = 0; // Current displayed value
    var _targetValue = 0; // Target value for animation
    var _animationCounter = 0; // Animation counter
    var _lastDrawnText = null; // Cache last drawn text
    var _lastOpacity = null; // Cache last opacity
    var _maxTextWidth = 0; // Cache max text width
    var _urgeDisplaySprite = null; // Global sprite reference

    // Expose visibility state for HUDTOGGLE
    window._urgeDisplayVisible = function() { return _urgeDisplayVisible; };
    window._setUrgeDisplayVisible = function(value) { _urgeDisplayVisible = value; };
    window._urgeDisplaySprite = function() { return _urgeDisplaySprite; };

    //=============================================================================
    // DataManager
    //=============================================================================
    // Save and load _urgeDisplayVisible state
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _DataManager_makeSaveContents.call(this);
        contents.urgeDisplayVisible = _urgeDisplayVisible;
        return contents;
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        _urgeDisplayVisible = contents.urgeDisplayVisible || false;
    };

    // Create and initialize the urge display sprite
    function createUrgeDisplaySprite() {
        if (!_urgeDisplaySprite) {
            _urgeDisplaySprite = new Sprite();
            // Initialize with fixed size based on max text width
            var tempBitmap = new Bitmap(100, fontSize);
            tempBitmap.fontSize = fontSize;
            tempBitmap.textColor = textColor;
            for (var i = 0; i <= 100; i++) { // Up to 100 for max urge value
                var text = showLabel ? labelText + " " + i : String(i);
                _maxTextWidth = Math.max(_maxTextWidth, tempBitmap.measureTextWidth(text));
            }
            _urgeDisplaySprite.bitmap = new Bitmap(_maxTextWidth + 30, fontSize + 30); // Fixed size with padding
            _urgeDisplaySprite.x = 0;
            _urgeDisplaySprite.y = 0;
            _urgeDisplaySprite.opacity = _urgeDisplayVisible ? 255 : 0; // Set initial opacity based on visibility
        }
        return _urgeDisplaySprite;
    }

    //=============================================================================
    // Game_Interpreter
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ShowUrge') {
            _urgeDisplayVisible = true;
        }
        if (command === 'HideUrge') {
            _urgeDisplayVisible = false;
        }
    };

    //=============================================================================
    // Spriteset_Base
    //=============================================================================
    var _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function() {
        _Spriteset_Base_createPictures.call(this);
        this.addUrgeDisplaySprite();
    };

    Spriteset_Base.prototype.addUrgeDisplaySprite = function() {
        var sprite = createUrgeDisplaySprite();
        if (!this._pictureContainer.children.includes(sprite)) {
            this._pictureContainer.addChildAt(sprite, 0); // Below pictures
        }
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================
    var _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
        if (this._spriteset && _urgeDisplaySprite) {
            this.updateUrgeDisplay();
        }
    };

    Scene_Base.prototype.updateUrgeDisplay = function() {
        var sprite = _urgeDisplaySprite;
        if (!_urgeDisplayVisible && _animationCounter === 0 && sprite.opacity === 0 && _lastOpacity === 0) {
            return;
        }

        var currentValue = $gameVariables.value(variableId);
        var valueChanged = (_lastVariableValue !== currentValue);
        if (valueChanged) {
            _targetValue = currentValue;
            _animationCounter = numberAnimationDuration;
            _lastVariableValue = currentValue;
        }

        // Animate the displayed value
        if (_animationCounter > 0) {
            var t = 1 - (_animationCounter / numberAnimationDuration);
            _displayedValue += (_targetValue - _displayedValue) * t;
            _animationCounter--;
        } else if (!valueChanged) {
            _displayedValue = _targetValue;
        }

        // Calculate target opacity (0 at 0, 255 at 50, stays 255 up to 100)
        var targetOpacity = Math.round((Math.min(Math.max(_displayedValue, 0), 50) / 50) * 255);

        // Update only if necessary
        var text = showLabel ? labelText + " " + Math.round(_displayedValue) : String(Math.round(_displayedValue));
        if (_urgeDisplayVisible && (_lastDrawnText !== text || _lastOpacity !== targetOpacity)) {
            sprite.opacity = targetOpacity;
            sprite.bitmap.clear();
            this.drawUrgeDisplay(sprite.bitmap, text);
            _lastDrawnText = text;
            _lastOpacity = targetOpacity;
        } else if (!_urgeDisplayVisible && _lastOpacity !== 0) {
            sprite.opacity = 0;
            sprite.bitmap.clear();
            _lastOpacity = 0;
            _lastDrawnText = null;
        }
    };

    Scene_Base.prototype.drawUrgeDisplay = function(bitmap, text) {
        bitmap.fontSize = fontSize;
        bitmap.textColor = textColor;

        // Ensure high-quality rendering
        bitmap.fontFace = 'GameFont'; // Use default RPG Maker font
        bitmap.fontBold = false; // Disable bold to avoid distortion
        bitmap.clear();

        // Use pre-calculated max text width for positioning
        var textWidth = Math.min(bitmap.measureTextWidth(text), _maxTextWidth);
        var screenWidth = Graphics.width;
        var x = screenWidth - textWidth + offsetX;
        var y = offsetY;

        // Update sprite position
        _urgeDisplaySprite.x = x;
        _urgeDisplaySprite.y = y;

        // Draw text with anti-aliasing
        bitmap.drawText(text, 0, 0, _maxTextWidth, fontSize, 'left');
    };

})();