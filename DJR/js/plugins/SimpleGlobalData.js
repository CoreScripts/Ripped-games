/*:
 * @plugindesc v1.1 Simple Global Data (Switches & Variables)
 * @author Rated Sim
 *
 * @param Global Switches
 * @desc A list of Switch IDs that will be permanent across all saves. Separate with commas (e.g., 10, 11, 12).
 * @default 
 *
 * @param Global Variables
 * @desc A list of Variable IDs that will be permanent across all saves. Separate with commas.
 * @default 
 *
 * @help
 * ============================================================================
 * Simple Global Data
 * ============================================================================
 * This plugin makes specific Switches and Variables "Global".
 * - They share the same value across ALL Save Files and New Games.
 * - They behave like "Options" (Volume, Always Dash, etc).
 * - Compatible with Yanfly Save Core & Autosave.
 * * HOW TO USE:
 * In the "Global Switches" parameter, type the IDs you want to use.
 * Example: 101, 102, 105
 */

(function() {

    // --- 1. SETUP PARAMETERS ---
    var parameters = PluginManager.parameters('SimpleGlobalData');
    
    function parseIds(param) {
        if (!param) return [];
        return param.split(',').map(function(id) { 
            return parseInt(id.trim()); 
        }).filter(function(id) { return !isNaN(id); });
    }

    var globalSwitchIds = parseIds(parameters['Global Switches']);
    var globalVariableIds = parseIds(parameters['Global Variables']);

    // Flag to prevent the game from saving to disk 100 times per second during sync
    var isSyncing = false;

    // --- 2. EXTEND CONFIG MANAGER ---
    ConfigManager.globalSwitches = {};
    ConfigManager.globalVariables = {};

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = _ConfigManager_makeData.call(this);
        config.globalSwitches = this.globalSwitches;
        config.globalVariables = this.globalVariables;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.globalSwitches = config.globalSwitches || {};
        this.globalVariables = config.globalVariables || {};
    };

    // --- 3. AUTO-SYNC ON CHANGE ---
    var _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value) {
        _Game_Switches_setValue.call(this, switchId, value);
        
        if (globalSwitchIds.contains(switchId)) {
            ConfigManager.globalSwitches[switchId] = value;
            // Only save to disk if we are NOT currently in a mass-sync loop
            if (!isSyncing) ConfigManager.save(); 
        }
    };

    var _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        _Game_Variables_setValue.call(this, variableId, value);
        
        if (globalVariableIds.contains(variableId)) {
            ConfigManager.globalVariables[variableId] = value;
            if (!isSyncing) ConfigManager.save();
        }
    };

    // --- 4. APPLY GLOBALS ---
    function applyGlobals() {
        isSyncing = true; // Lock file-writing

        // Sync Switches
        globalSwitchIds.forEach(function(id) {
            if (ConfigManager.globalSwitches[id] !== undefined) {
                $gameSwitches.setValue(id, ConfigManager.globalSwitches[id]);
            }
        });
        
        // Sync Variables
        globalVariableIds.forEach(function(id) {
            if (ConfigManager.globalVariables[id] !== undefined) {
                $gameVariables.setValue(id, ConfigManager.globalVariables[id]);
            }
        });

        isSyncing = false; // Unlock file-writing
        ConfigManager.save(); // Save once at the end of the process
    }

    var _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        applyGlobals();
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        applyGlobals();
    };

})();