/*:
 * @plugindesc v1.10 Allows you to reposition, resize, and style the main Title Command Window.
 * @author RatedSim
 *
 * @param == Positioning ==
 * @default
 *
 * @param Window X
 * @desc The X (horizontal) position of the menu. You can use exact numbers (e.g., 20) or code.
 * @default (Graphics.boxWidth - this.width) / 2
 *
 * @param Window Y
 * @desc The Y (vertical) position of the menu. You can use exact numbers (e.g., 20) or code.
 * @default Graphics.boxHeight - this.height - 96
 *
 * @param Window Width
 * @desc The width of the menu box. The MV default is 240.
 * @type number
 * @default 240
 *
 * @param == Text Styling ==
 * @default
 *
 * @param Text Alignment
 * @desc How the text is aligned inside the menu buttons.
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 *
 * @param Font Size
 * @desc The size of the text. The MV default is 28.
 * @type number
 * @default 28
 *
 * @param Line Spacing
 * @desc The height of each selectable row. Increase to space out the buttons more. MV default is 36.
 * @type number
 * @default 36
 *
 * @param == Window Opacity ==
 * @default
 *
 * @param Frame Opacity
 * @desc Opacity of the outer window border/frame (0 to 255). 0 removes the border completely.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Background Opacity
 * @desc Opacity of the dark background inside the box (0 to 255). MV default is 192.
 * @type number
 * @min 0
 * @max 255
 * @default 192
 *
 * @help
 * ============================================================================
 * Title Menu Reposition & Style
 * ============================================================================
 *
 * This plugin allows you to easily move and style the main title screen 
 * menu window without needing to dig into the core scripts.
 *
 * Because this plugin only adjusts the visual rendering of the box,
 * it is 100% compatible with plugins that add new options to your title 
 * screen (like Credits, Exit Game, Settings, etc.).
 *
 * ----------------------------------------------------------------------------
 * Tips on Styling
 * ----------------------------------------------------------------------------
 * 1. Invisible Box, Just Text: 
 *    Set both 'Frame Opacity' and 'Background Opacity' to 0. 
 *    This will make the text float directly on your background image!
 *
 * 2. Taller Menu:
 *    If you increase the 'Line Spacing', the overall height of the box 
 *    will automatically grow to fit your buttons. You may need to adjust 
 *    your 'Window Y' parameter so it doesn't clip off the bottom of the screen.
 */

(function() {

    var parameters = PluginManager.parameters('TitleMenuReposition');
    
    // Position parameters
    var winX = String(parameters['Window X'] || '(Graphics.boxWidth - this.width) / 2');
    var winY = String(parameters['Window Y'] || 'Graphics.boxHeight - this.height - 96');
    var winWidth = Number(parameters['Window Width'] || 240);
    
    // Style parameters
    var align = String(parameters['Text Alignment'] || 'center');
    var fontSize = Number(parameters['Font Size'] || 28);
    var lineHeight = Number(parameters['Line Spacing'] || 36);
    
    // Opacity parameters
    var frameOpacity = Number(parameters['Frame Opacity'] !== undefined ? parameters['Frame Opacity'] : 255);
    var backOpacity = Number(parameters['Background Opacity'] !== undefined ? parameters['Background Opacity'] : 192);

    // Overrides the width of the title command window
    var _Window_TitleCommand_windowWidth = Window_TitleCommand.prototype.windowWidth;
    Window_TitleCommand.prototype.windowWidth = function() {
        return winWidth;
    };

    // Overrides the text alignment
    Window_TitleCommand.prototype.itemTextAlign = function() {
        return align;
    };

    // Overrides the line height/spacing of each item
    var _Window_TitleCommand_lineHeight = Window_TitleCommand.prototype.lineHeight;
    Window_TitleCommand.prototype.lineHeight = function() {
        return lineHeight;
    };

    // Overrides the font size
    var _Window_TitleCommand_standardFontSize = Window_TitleCommand.prototype.standardFontSize;
    Window_TitleCommand.prototype.standardFontSize = function() {
        return fontSize;
    };

    // Hooks into the placement function to apply our custom coordinates and opacity
    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        // Run the original function first so the game registers it properly
        _Window_TitleCommand_updatePlacement.call(this); 
        
        // Apply custom opacities (frame vs background)
        this.opacity = frameOpacity;
        this.backOpacity = backOpacity;

        // Apply custom coordinates
        this.x = eval(winX);
        this.y = eval(winY);
    };

})();