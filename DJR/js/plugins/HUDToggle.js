/*:
 * @plugindesc Toggles visibility of HUD pictures with a key or gamepad button, with fade and sound effects.
 * @author RatedSim
 *
 * @help
 * This plugin allows players to toggle the visibility of specified pictures
 * (e.g., HUD/UI elements) by pressing a configured key or gamepad button.
 *
 * Features:
 * - Toggle pictures with a keyboard key (default: 'h') or gamepad button (default: 'pageup').
 * - Specify picture IDs to include or exclude from toggling.
 * - Fade pictures in/out over a set duration.
 * - Play a sound effect when toggling.
 * - Debug mode to log issues to the console (F12).
 *
 * Plugin Commands:
 * ToggleHUD          # Toggles the visibility of the HUD.
 * ShowHUD            # Shows the HUD.
 * HideHUD            # Hides the HUD.
 *
 * Setup:
 * - Set 'Toggle Key' (e.g., 'h', 'z').
 * - Set 'Gamepad Button' to a gamepad button (default: 'pageup', which maps to R1/RB on most controllers).
 * Available gamepad buttons:
 * - 'pageup' (R1/RB on most controllers)
 * - 'pagedown' (L1/LB on most controllers)
 * - 'shift' (R2/RT on most controllers)
 * - 'control' (L2/LT on most controllers)
 * - 'tab' (Select/Share on most controllers)
 * - 'ok' (A/Cross on most controllers)
 * - 'cancel' (B/Circle on most controllers)
 * - List picture IDs in 'HUD Picture IDs' (e.g., '1,2,3').
 * - Set 'Exclude Mode' to true to toggle all pictures *except* those listed.
 * - Configure 'Fade Duration' (frames, e.g., 30 for 0.5 seconds at 60 FPS).
 * - Set 'Sound Effect' to an SE file (e.g., 'Switch1').
 * - Enable 'Debug Mode' to log debug info to console (F12).
 *
 * Notes:
 * - Pictures are toggled by opacity to avoid conflicts with parallel events.
 * - Use lowercase for key names (e.g., 'h').
 * - Test in Scene_Map. For other scenes, modifications might be needed.
 * - If pictures don't hide/show correctly, check the console (F12) for debug logs.
 * - If performance issues occur, check for parallel events frequently re-showing HUD pictures.
 *
 * @param Toggle Key
 * @desc The keyboard key to toggle picture visibility (e.g., 'h').
 * @default h
 *
 * @param Gamepad Button
 * @desc The gamepad button to toggle (e.g., 'pageup' for R1/RB, 'pagedown' for L1/LB).
 * @default pageup
 *
 * @param HUD Picture IDs
 * @desc Comma-separated picture IDs (e.g., '1,2,3'). Affects include/exclude mode.
 * @default 1,2,3
 *
 * @param Exclude Mode
 * @desc If true, toggle all pictures EXCEPT those in HUD Picture IDs. If false, toggle only listed IDs.
 * @type boolean
 * @default false
 *
 * @param Fade Duration
 * @desc Frames to fade in/out (e.g., 30 = 0.5 seconds at 60 FPS). 0 = instant.
 * @type number
 * @min 0
 * @default 30
 *
 * @param Sound Effect
 * @desc Sound effect to play when toggling (e.g., 'Switch1'). Leave blank for none.
 * @default Switch1
 *
 * @param Debug Mode
 * @desc Enable to log debug info to console (F12).
 * @type boolean
 * @default false
 */

(function() {
    // Get plugin parameters
    var parameters = PluginManager.parameters('HUDTOGGLE');
    var toggleKeyParam = String(parameters['Toggle Key'] || 'h').toLowerCase();
    var gamepadButtonParam = String(parameters['Gamepad Button'] || 'pageup').toLowerCase();
    var hudPictureIds = String(parameters['HUD Picture IDs'] || '1,2,3')
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => id > 0);
    var excludeMode = parameters['Exclude Mode'] === 'true';
    var fadeDuration = Number(parameters['Fade Duration'] || 30);
    var soundEffectName = String(parameters['Sound Effect'] || 'Switch1');
    var debugMode = parameters['Debug Mode'] === 'true';

    // Store state
    var toggleState = 'visible'; // 'visible', 'hiding', 'hidden', 'showing'
    var fadeCounter = 0;
    var picturesToFadeIDs = []; // Stores IDs of pictures currently being faded
    var lastKeyState = false; // Track the last state of the keyboard key to detect "triggered" events
    var keyTriggered = false;
    var toggledPictureStates = {}; // Track the intended state of toggled pictures

    // Debug logging
    function debugLog(message) {
        if (debugMode) console.log('[HUDTOGGLE] ' + message);
    }

    if (debugMode) {
        debugLog('Plugin loaded. Key: ' + toggleKeyParam + ', Gamepad: ' + gamepadButtonParam + ', IDs: ' + hudPictureIds.join(','));
        debugLog('Exclude Mode: ' + excludeMode + ', Fade: ' + fadeDuration + 'frames, SE: ' + soundEffectName);
    }

    // Direct keyboard event listener for toggleKeyParam
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === toggleKeyParam && !lastKeyState) {
            keyTriggered = true;
            if (debugMode) debugLog('Keyboard key "' + toggleKeyParam + '" pressed via document event');
            lastKeyState = true;
        }
    });
    document.addEventListener('keyup', function(event) {
        if (event.key.toLowerCase() === toggleKeyParam) {
            lastKeyState = false;
        }
    });

    function shouldTogglePicture(pictureId) {
        return excludeMode ? !hudPictureIds.includes(pictureId) : hudPictureIds.includes(pictureId);
    }

    var _Game_Picture_initBasic_HUDToggle = Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function() {
        _Game_Picture_initBasic_HUDToggle.call(this);
        this._customOpacity = null; // Only use custom opacity for toggled pictures
        this._isToggledPicture = false;
    };

    Game_Picture.prototype.opacity = function() {
        if (this._isToggledPicture && this._customOpacity !== null) {
            return this._customOpacity;
        }
        return this._opacity !== undefined ? this._opacity : 255;
    };

    Game_Picture.prototype.setOpacity = function(opacity) {
        if (this._isToggledPicture) {
            this._customOpacity = Math.round(Math.max(0, Math.min(255, opacity)));
            this._opacity = this._customOpacity;
        } else {
            this._opacity = Math.round(Math.max(0, Math.min(255, opacity)));
        }
    };

    var _Game_Screen_showPicture_HUDToggle = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
        _Game_Screen_showPicture_HUDToggle.call(this, pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
        var picture = this.picture(pictureId);
        if (picture) {
            picture._isToggledPicture = shouldTogglePicture(pictureId);
            
            if (picture._isToggledPicture) {
                // Initialize custom opacity for toggled pictures
                if (picture._customOpacity === null) {
                    picture._customOpacity = opacity;
                }
                // If the HUD is hidden, ensure the picture stays hidden
                if (toggleState === 'hidden' && picture.opacity() !== 0) {
                    picture.setOpacity(0);
                    toggledPictureStates[pictureId] = 0; // Track that this picture should be hidden
                    if (debugMode) debugLog('Picture ID ' + pictureId + ' (re)shown while HUD is hidden. Forcing opacity to 0.');
                } else if (toggleState === 'visible' && picture.opacity() !== 255) {
                    picture.setOpacity(255);
                    toggledPictureStates[pictureId] = 255; // Track that this picture should be visible
                    if (debugMode) debugLog('Picture ID ' + pictureId + ' (re)shown while HUD is visible. Forcing opacity to 255.');
                }
            }
            // Non-toggled pictures will use the engine's default opacity and fading
        }
    };

    // Monitor pictures to prevent re-showing of hidden HUD pictures
    var _Scene_Map_update_HUDToggle = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update_HUDToggle.call(this);
        if (SceneManager._scene === this) {
            // Ensure hidden HUD pictures stay hidden
            if (toggleState === 'hidden') {
                for (let pictureId in toggledPictureStates) {
                    let pic = $gameScreen.picture(pictureId);
                    if (pic && pic.opacity() !== 0) {
                        pic.setOpacity(0);
                        if (debugMode) debugLog('Picture ID ' + pictureId + ' attempted to re-show while HUD is hidden. Forced opacity to 0.');
                    }
                }
            }
            updateToggleInputAndFade();
        }
    };

    function updateToggleInputAndFade() {
        // Check inputs only when not fading
        if (toggleState !== 'hiding' && toggleState !== 'showing') {
            let gamepadPressed = Input.isTriggered(gamepadButtonParam);

            if (debugMode) {
                if (keyTriggered) debugLog('"' + toggleKeyParam + '" key detected!');
                if (gamepadPressed) debugLog('"' + gamepadButtonParam + '" button detected!');
            }

            if (keyTriggered || gamepadPressed) {
                if (toggleState === 'visible' || toggleState === 'hidden') {
                    if (debugMode) debugLog('Toggle triggered. Current state: ' + toggleState);
                    picturesToFadeIDs = [];

                    toggleState = toggleState === 'visible' ? 'hiding' : 'showing';
                    fadeCounter = fadeDuration;
                    playSoundEffect();

                    if (fadeDuration <= 0) {
                        var instantTargetOpacity = toggleState === 'hiding' ? 0 : 255;
                        applyOpacityToAllManagedPictures(instantTargetOpacity);
                        toggleState = toggleState === 'hiding' ? 'hidden' : 'visible';
                        // Update tracked states
                        for (let j = 1; j <= $gameScreen.maxPictures(); j++) {
                            if (shouldTogglePicture(j)) {
                                toggledPictureStates[j] = instantTargetOpacity;
                            }
                        }
                        if (debugMode) debugLog('Instant toggle complete. New state: ' + toggleState);
                    } else {
                        for (let j = 1; j <= $gameScreen.maxPictures(); j++) {
                            const pic = $gameScreen.picture(j);
                            if (pic && pic.name() && shouldTogglePicture(j)) {
                                picturesToFadeIDs.push(j);
                            }
                        }
                        if (debugMode) debugLog("Fade started. Picture IDs to fade: " + picturesToFadeIDs.join(', '));
                    }
                }
            }
        }

        // Reset keyTriggered after processing
        keyTriggered = false;

        // Handle fading only when necessary
        if (toggleState === 'hiding' || toggleState === 'showing') {
            fadeCounter--;
            var targetOpacityValue = toggleState === 'hiding' ? 0 : 255;

            for (const picId of picturesToFadeIDs) {
                const pic = $gameScreen.picture(picId);
                if (pic) {
                    let currentOpacity = pic.opacity();
                    let newOpacity = currentOpacity + (targetOpacityValue - currentOpacity) * (1 / (fadeCounter + 1));
                    pic.setOpacity(newOpacity);
                }
            }

            if (fadeCounter <= 0) {
                applyOpacityToAllManagedPictures(targetOpacityValue);
                toggleState = toggleState === 'hiding' ? 'hidden' : 'visible';
                // Update tracked states
                for (const picId of picturesToFadeIDs) {
                    toggledPictureStates[picId] = targetOpacityValue;
                }
                picturesToFadeIDs = [];
                if (debugMode) debugLog('Fade complete. New state: ' + toggleState);
            }
        }
    }

    function applyOpacityToAllManagedPictures(opacityValue) {
        for (let j = 1; j <= $gameScreen.maxPictures(); j++) {
            const pic = $gameScreen.picture(j);
            if (pic && pic.name() && shouldTogglePicture(j)) {
                pic.setOpacity(opacityValue);
            }
        }
        if (window._urgeDisplaySprite && window._setUrgeDisplayVisible) { window._urgeDisplaySprite.opacity = opacityValue; window._setUrgeDisplayVisible(opacityValue > 0); }
    }

    function playSoundEffect() {
        if (soundEffectName) {
            var se = { name: soundEffectName, volume: AudioManager.seVolume, pitch: 100, pan: 0 };
            AudioManager.playSe(se);
            if (debugMode) debugLog('Playing SE: ' + soundEffectName);
        }
    }

    // --- RPG Maker MV Plugin Commands ---
    // Override the default pluginCommand to handle our custom commands
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        const lowerCommand = command.toLowerCase();

        if (lowerCommand === 'togglehud') {
            if (debugMode) debugLog('Plugin Command: ToggleHUD detected.');
            processHudVisibility('toggle');
        } else if (lowerCommand === 'showhud') {
            if (debugMode) debugLog('Plugin Command: ShowHUD detected.');
            processHudVisibility('show');
        } else if (lowerCommand === 'hidehud') {
            if (debugMode) debugLog('Plugin Command: HideHUD detected.');
            processHudVisibility('hide');
        }
    };

    // New function to handle the core logic for toggling, showing, and hiding
    function processHudVisibility(targetCommand) {
        if (debugMode) debugLog('Processing HUD visibility with command: ' + targetCommand);
        
        let newToggleState;
        if (targetCommand === 'toggle') {
            newToggleState = (toggleState === 'visible' || toggleState === 'showing') ? 'hiding' : 'showing';
        } else if (targetCommand === 'show') {
            newToggleState = 'showing';
        } else if (targetCommand === 'hide') {
            newToggleState = 'hiding';
        }

        // Only proceed if a state change is actually needed or a fade is in progress
        const isCurrentlyFading = (toggleState === 'hiding' || toggleState === 'showing');
        const isTargetStateVisible = (newToggleState === 'showing' || newToggleState === 'visible');
        const isTargetStateHidden = (newToggleState === 'hiding' || newToggleState === 'hidden');

        if (
            (isTargetStateVisible && (toggleState === 'hidden' || toggleState === 'hiding')) ||
            (isTargetStateHidden && (toggleState === 'visible' || toggleState === 'showing')) ||
            isCurrentlyFading // Allow command to re-evaluate and potentially override an ongoing fade
        ) {
            toggleState = newToggleState;
            fadeCounter = fadeDuration;
            playSoundEffect();
            picturesToFadeIDs = []; // Clear previous fade targets

            if (fadeDuration <= 0) {
                var instantTargetOpacity = (toggleState === 'hiding' || toggleState === 'hidden') ? 0 : 255;
                applyOpacityToAllManagedPictures(instantTargetOpacity);
                toggleState = (toggleState === 'hiding' || toggleState === 'hidden') ? 'hidden' : 'visible';
                for (let j = 1; j <= $gameScreen.maxPictures(); j++) {
                    if (shouldTogglePicture(j)) {
                        toggledPictureStates[j] = instantTargetOpacity;
                    }
                }
                if (debugMode) debugLog('Instant command complete. New state: ' + toggleState);
            } else {
                for (let j = 1; j <= $gameScreen.maxPictures(); j++) {
                    const pic = $gameScreen.picture(j);
                    if (pic && pic.name() && shouldTogglePicture(j)) {
                        picturesToFadeIDs.push(j);
                    }
                }
                if (debugMode) debugLog("Fade started by command. Picture IDs to fade: " + picturesToFadeIDs.join(', '));
            }
        } else {
            if (debugMode) debugLog('Command ' + targetCommand + ' had no effect (already in target state). Current state: ' + toggleState);
        }
    }
})();