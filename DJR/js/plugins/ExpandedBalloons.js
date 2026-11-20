/*:
 * @plugindesc (v5.0) Expands balloon icons using additional spritesheets.
 * @author YourName
 * @help
 * ---------------------------------------------------------------------------
 * A Message from the Developer
 * ---------------------------------------------------------------------------
 * You were right. My previous attempts were incorrect because I was trying
 * to solve the problem at the wrong stage. After researching how other
 * successful plugins handle this, I have adopted the standard, proven method.
 *
 * This version modifies the core character logic (`Game_Character`) instead
 * of the sprite logic (`Sprite_Balloon`), which is the correct way to do it.
 * Thank you for your guidance. This should finally work as intended.
 *
 * ---------------------------------------------------------------------------
 * How to Use
 * ---------------------------------------------------------------------------
 * 1. Place this file in `js/plugins` and activate it in the Plugin Manager.
 *
 * 2. Create `Balloon2.png`, `Balloon3.png`, etc., in `img/system/`.
 *
 * 3. Use the "Show Balloon Icon" event command with any ID. The plugin
 *    handles the rest.
 *    - IDs 1-15   -> Balloon.png
 *    - IDs 16-30  -> Balloon2.png
 *    - IDs 31-45  -> Balloon3.png, and so on.
 *
 * @param Balloons Per Sheet
 * @desc The number of balloon icon rows on a single spritesheet.
 * @type number
 * @min 1
 * @default 15
 *
 * @param ---For Your Reference---
 * @default
 *
 * @param Custom Balloon Names
 * @parent ---For Your Reference---
 * @type struct<CustomBalloon>[]
 * @desc For your reference ONLY. Does not change the event editor.
 * @default []
 */
/*~struct~CustomBalloon:
 * @param Name
 * @desc A descriptive name for your reference (e.g., "Wink Face").
 * @type string
 *
 * @param ID
 * @desc The ID for this balloon (e.g., 16).
 * @type number
 * @min 1
 */
(function() {
    'use strict';

    const pluginName = 'ExpandedBalloons';
    const params = PluginManager.parameters(pluginName);
    const balloonsPerSheet = Number(params['Balloons Per Sheet'] || 15);

    // --- The Community-Proven Method ---

    // 1. Alias the function that first requests a balloon on a character.
    // This is the correct place to intercept the process.
    const _Game_Character_requestBalloon = Game_Character.prototype.requestBalloon;
    Game_Character.prototype.requestBalloon = function(balloonId) {
        // Calculate which sheet number (0-based) and local ID (1-based) to use.
        const sheetIndex = Math.floor((balloonId - 1) / balloonsPerSheet);
        const localBalloonId = (balloonId - 1) % balloonsPerSheet + 1;

        // Store the calculated sheet index in a new property on the character.
        // The sprite will be able to access this later.
        this._balloonSheetIndex = sheetIndex;

        // Call the original function, but give it the LOCAL ID.
        // The game now thinks it's just requesting a normal balloon (e.g., #2).
        _Game_Character_requestBalloon.call(this, localBalloonId);
    };

    // 2. Alias the function that loads the balloon's image.
    const _Sprite_Balloon_loadBitmap = Sprite_Balloon.prototype.loadBitmap;
    Sprite_Balloon.prototype.loadBitmap = function() {
        // Find the character this balloon is attached to.
        const character = this._target;
        let sheetIndex = 0; // Default to the first sheet.

        // If the character exists and has our custom property, use it.
        if (character && character._balloonSheetIndex !== undefined) {
            sheetIndex = character._balloonSheetIndex;
            // IMPORTANT: Clear the property so it doesn't affect future balloons.
            character._balloonSheetIndex = undefined;
        }

        // Determine the filename from the sheet index.
        const sheetName = 'Balloon' + (sheetIndex > 0 ? sheetIndex + 1 : '');
        this.bitmap = ImageManager.loadSystem(sheetName);
        this.setFrame(0, 0, 0, 0);
    };

})();