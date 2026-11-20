//=============================================================================
// Yanfly Engine Plugins - FPS Synchronization Option
// YEP_FpsSynchOption.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SynchFpsOption = true;

var Yanfly = Yanfly || {};
Yanfly.FpsSynch = Yanfly.FpsSynch || {};
Yanfly.FpsSynch.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 Adds a new command to Options menu for synching
 * the FPS of monitors with higher FPS rates.
 * @author Yanfly Engine Plugins (Modified by RatedSim & Gemini)
 *
 * @param Command Name
 * @desc Command name used inside of the Options menu.
 * @default Synch Monitor FPS
 *
 * @param Default Setting
 * @type boolean
 * @on ON
 * @off OFF
 * @desc The default setting of the Synch Monitor FPS.
 * OFF - false (Original Behavior)  ON - true (60 FPS Fix)
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction (Optimized Logic)
 * ============================================================================
 *
 * This version uses a high-precision additive timer to cap the game logic
 * at 60 FPS while allowing the GPU to render at the monitor's native refresh 
 * rate, preventing the "fast-forward" effect on high-Hz screens.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Implemented additive time tracking to prevent micro-stutter.
 * - Restored logic accumulator to prevent slow-motion during lag.
 * - Switched to aliased methods for better plugin compatibility.
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0') {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FpsSynchOption');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FpsSynchCmd = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.FpsSDefault = eval(String(Yanfly.Parameters['Default Setting']));

//=============================================================================
// MainCode
//=============================================================================

ConfigManager.synchFps = Yanfly.Param.FpsSDefault;

Yanfly.FpsSynch.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.FpsSynch.ConfigManager_makeData.call(this);
    config.synchFps = this.synchFps;
    return config;
};

Yanfly.FpsSynch.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.FpsSynch.ConfigManager_applyData.call(this, config);
    this.synchFps = this.readConfigFpsSynch(config, 'synchFps');
};

ConfigManager.readConfigFpsSynch = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.FpsSDefault;
    }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager._fpsTargetTime = 1000 / 60;
SceneManager._fpsAccumulator = 0;
SceneManager._lastTimestamp = performance.now();

Yanfly.FpsSynch.SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
    if (ConfigManager.synchFps) {
        var newTimestamp = performance.now();
        var delta = newTimestamp - this._lastTimestamp;
        this._lastTimestamp = newTimestamp;
        
        // Cap delta to avoid spiral of death after tab-out
        if (delta > 500) delta = this._fpsTargetTime;
        
        this._fpsAccumulator += delta;

        while (this._fpsAccumulator >= this._fpsTargetTime) {
            this.updateInputData();
            this.changeScene();
            this.updateScene();
            this._fpsAccumulator -= this._fpsTargetTime;
        }
        this.renderScene();
        this.requestUpdate();
    } else {
        Yanfly.FpsSynch.SceneManager_updateMain.call(this);
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.FpsSynch.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.FpsSynch.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      var cmd = {
          name: Yanfly.Param.FpsSynchCmd,
          symbol: 'synchFps',
          enabled: true,
          ext: null
      };
      this._list.splice(1, 0, cmd);
    }
};

//=============================================================================
// Version Compatibility Update
//=============================================================================
} else {
    console.log('FPS Synch Options requires MV 1.1.0 or higher.');
} 

//=============================================================================
// End of File
//=============================================================================