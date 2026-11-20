/*:
 * @plugindesc Displays a chosen game variable's value at the center of the screen with fade effect.
 * @author RatedSim
 *
 * @help
 * Plugin Commands:
 * ShowScore    # Shows the centered variable display.
 * HideScore    # Hides the centered variable display.
 *
 * @param Variable ID
 * @desc The ID of the game variable to display.
 * @default 53
 * @type variable
 *
 * @param Text Color
 * @desc The color of the displayed text. Use CSS color names or hex codes.
 * @default #FFFFFF
 *
 * @param Font Size
 * @desc Font size for the displayed text.
 * @default 48
 *
 * @param Offset X
 * @desc X-axis offset from the center of the screen. Positive moves right, negative moves left.
 * @default 0
 *
 * @param Offset Y
 * @desc Y-axis offset from the center of the screen. Positive moves down, negative moves up.
 * @default 0
 *
 * @param Show Label
 * @desc Whether to show a text label before the variable value (e.g., "Score: 123").
 * @type boolean
 * @default false
 *
 * @param Label Text
 * @desc The text label to display before the variable value. Only used if 'Show Label' is true.
 * @default Value:
 *
 * @param Fade Duration
 * @desc The duration of the fade-in effect in frames (60 frames = 1 second).
 * @default 30
 */

(function() {

    var pluginName = 'ArcadeScore';
    var parameters = PluginManager.parameters(pluginName);

    // Correctly parse parameters with default values and types
    var variableId = Number(parameters['Variable ID'] || 53);
    var textColor = String(parameters['Text Color'] || '#FFFFFF');
    var fontSize = Number(parameters['Font Size'] || 48);
    var offsetX = Number(parameters['Offset X'] || 0);
    var offsetY = Number(parameters['Offset Y'] || 0);
    var showLabel = String(parameters['Show Label'] || 'false') === 'true';
    var labelText = String(parameters['Label Text'] || 'Value:');
    var fadeDuration = Number(parameters['Fade Duration'] || 30);

    // Store visibility state globally. Initial visibility is now always false.
    var _arcadeScoreVisible = false;
    var _lastVariableValue = null; // To detect changes for fade effect

    //=============================================================================
    // Game_Interpreter
    //=============================================================================
    // Add plugin commands for showing/hiding the score.

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ShowScore') {
            _arcadeScoreVisible = true;
        }
        if (command === 'HideScore') {
            _arcadeScoreVisible = false;
        }
    };

    //=============================================================================
    // Spriteset_Base
    //=============================================================================
    // Create the sprite on the base spriteset.

    var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        _Spriteset_Base_createUpperLayer.call(this);
        this.createArcadeScoreSprite();
    };

    Spriteset_Base.prototype.createArcadeScoreSprite = function() {
        if (!this._arcadeScoreSprite) {
            this._arcadeScoreSprite = new Sprite();
            this.addChild(this._arcadeScoreSprite);
            this._arcadeScoreSprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this._arcadeScoreSprite.x = 0;
            this._arcadeScoreSprite.y = 0;
            this._arcadeScoreSprite.opacity = 0; // Start invisible for fade-in
        }
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================
    // Common update and drawing logic for all scenes.

    var _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
        if (this._spriteset && this._spriteset._arcadeScoreSprite) {
            this.updateArcadeScoreDisplay();
        }
    };

    Scene_Base.prototype.updateArcadeScoreDisplay = function() {
        var sprite = this._spriteset._arcadeScoreSprite;
        var currentValue = $gameVariables.value(variableId);

        // Check if the variable value has changed
        var valueChanged = (_lastVariableValue !== currentValue);
        _lastVariableValue = currentValue;

        if (_arcadeScoreVisible) {
            // If visible, fade in or maintain full opacity
            if (sprite.opacity < 255 && (valueChanged || sprite.opacity === 0)) {
                sprite.opacity += (255 / fadeDuration);
                if (sprite.opacity > 255) sprite.opacity = 255;
            } else if (!valueChanged && sprite.opacity > 255) {
                sprite.opacity = 255; // Ensure it stays opaque after fade-in
            }

            // Always clear and redraw to handle changes and centering
            sprite.bitmap.clear();
            this.drawArcadeScore(sprite.bitmap);
        } else {
            // If not visible, fade out
            if (sprite.opacity > 0) {
                sprite.opacity -= (255 / fadeDuration);
                if (sprite.opacity < 0) sprite.opacity = 0;
            } else {
                sprite.bitmap.clear(); // Clear bitmap when fully invisible
            }
        }
    };

    Scene_Base.prototype.drawArcadeScore = function(bitmap) {
        // Retrieve the variable value
        var value = $gameVariables.value(variableId);
        var text = showLabel ? labelText + " " + value : String(value);

        bitmap.fontSize = fontSize;
        bitmap.textColor = textColor;

        // Calculate center coordinates for text
        var screenWidth = Graphics.width;
        var screenHeight = Graphics.height;
        var textWidth = bitmap.measureTextWidth(text);

        // Calculate position to center the text, then apply offsets
        var x = (screenWidth - textWidth) / 2 + offsetX;
        var y = (screenHeight - fontSize) / 2 + offsetY; // fontSize is a good approximation for text height

        // Draw the text onto the bitmap
        bitmap.drawText(text, x, y, textWidth, fontSize, 'left');
    };

})();