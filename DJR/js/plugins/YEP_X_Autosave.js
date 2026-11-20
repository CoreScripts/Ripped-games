//=============================================================================
// Yanfly Engine Plugins - Save Core Extension - Autosave
// YEP_X_Autosave.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_Autosave = true;

var Yanfly = Yanfly || {};
Yanfly.Autosave = Yanfly.Autosave || {};
Yanfly.Autosave.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Req YEP_SaveCore.js) Adds Autosave functionality to your
 * RPG Maker game.
 * @author Yanfly Engine Plugins - Modified by Rated Sim
 *
 * @help
 * ============================================================================
 * Introduction - Modified Version
 * ============================================================================
 *
 * This is a modified version of Yanfly's Autosave plugin.
 * Modifications by Rated Sim:
 * - Autosave always saves to fixed slot 12 (overwrites if exists).
 * - Autosave works immediately (no manual save required first).
 * - Automatic triggers (on map load / main menu) have been completely removed.
 * - Autosave is now only triggered via the "Autosave" plugin command.
 * - All original visual parameters are preserved (you can change icon/text in parameters).
 *
 * Use the plugin command: Autosave
 * to save to slot 12 from events.
 *
 * ============================================================================
 *
 * @param ---Option Menu---
 * @default
 *
 * @param Show Option
 * @parent ---Option Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Give player the option to enable or disable Autosave?
 * YES - true     NO - false
 * @default true
 *
 * @param Option Name
 * @parent ---Option Menu---
 * @desc The option command text used in-game.
 * @default Autosave
 *
 * @param Default
 * @text Default Setting
 * @parent ---Option Menu---
 * @desc Do you want Autosaving to be enabled by default?
 * YES - true     NO - false
 * @default true
 *
 * @param ---Visual---
 * @default
 *
 * @param ShowAutosave
 * @text Show Autosave Message
 * @parent ---Visual---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show a message when Autosave happens?
 * YES - true     NO - false
 * @default true
 *
 * @param AutosaveMsgSave
 * @text Autosave Message On Save
 * @parent ShowAutosave
 * @desc Text used for the auto save message.
 * Can use text codes.
 * @default \i[83]Autosave Complete!
 *
 * @param AutosaveMsgLoad
 * @text Autosave Message On Load
 * @parent ShowAutosave
 * @desc Text used for the auto save message when loading.
 * Can use text codes.
 * @default \i[83]Autosave Loaded!
 *
 * @param MsgGradient1
 * @text Message Gradient 1
 * @parent ShowAutosave
 * @desc Hex color for gradient (left side).
 * @default rgba(0, 0, 0, 0)
 *
 * @param MsgGradient2
 * @text Message Gradient 2
 * @parent ShowAutosave
 * @desc Hex color for gradient (right side).
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param MsgGradientCode
 * @text Message Gradient Code
 * @parent ShowAutosave
 * @type note
 * @desc Custom JS code for drawing the gradient background.
 * @default "var textWidth = this.textWidthEx(this.message());\nvar half = this.textPadding() + Math.ceil(textWidth / 2);\nvar height = this.lineHeight();\nvar color1 = Yanfly.Param.AutosaveMsgColor1;\nvar color2 = Yanfly.Param.AutosaveMsgColor2;\nthis.contents.gradientFillRect(0, 0, half, height, color1, color2);\nthis.contents.gradientFillRect(half, 0, this.width - half, height, color2, color1);"
 *
 * @param MsgX
 * @text Message X
 * @parent ShowAutosave
 * @desc X position of the message. Can use code.
 * @default Graphics.boxWidth - 180
 *
 * @param MsgY
 * @text Message Y
 * @parent ShowAutosave
 * @desc Y position of the message. Can use code.
 * @default Graphics.boxHeight - this.fittingHeight(1) * 2
 *
 * @param MsgDuration
 * @text Message Duration
 * @parent ShowAutosave
 * @type number
 * @desc How long the message stays on screen (frames).
 * @default 120
 *
 * @param FadeSpeed
 * @text Message Fade Speed
 * @parent ShowAutosave
 * @desc Fade in/out speed. Higher = faster.
 * @default 16
 *
 */
//=============================================================================

if (Imported.YEP_SaveCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_Autosave');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutosaveShowOpt = eval(String(Yanfly.Parameters['Show Option']));
Yanfly.Param.AutosaveOptionCmd = String(Yanfly.Parameters['Option Name']);
Yanfly.Param.AutosaveDefault = eval(String(Yanfly.Parameters['Default']));

Yanfly.Param.AutosaveShowMsg = eval(String(Yanfly.Parameters['ShowAutosave']));
Yanfly.Param.AutosaveMsgSave = String(Yanfly.Parameters['AutosaveMsgSave']);
Yanfly.Param.AutosaveMsgLoad = String(Yanfly.Parameters['AutosaveMsgLoad']);
Yanfly.Param.AutosaveMsgColor1 = String(Yanfly.Parameters['MsgGradient1']);
Yanfly.Param.AutosaveMsgColor2 = String(Yanfly.Parameters['MsgGradient2']);
Yanfly.Param.AutosaveMsgCode = JSON.parse(Yanfly.Parameters['MsgGradientCode']);
Yanfly.Param.AutosaveMsgX = String(Yanfly.Parameters['MsgX']);
Yanfly.Param.AutosaveMsgY = String(Yanfly.Parameters['MsgY']);
Yanfly.Param.AutosaveMsgDur = Number(Yanfly.Parameters['MsgDuration']) || 120;
Yanfly.Param.AutosaveMsgFade = Number(Yanfly.Parameters['FadeSpeed']) || 16;

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.autosave = Yanfly.Param.AutosaveDefault;

Yanfly.Autosave.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.Autosave.ConfigManager_makeData.call(this);
  config.autosave = this.autosave;
  return config;
};

Yanfly.Autosave.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.Autosave.ConfigManager_applyData.call(this, config);
  this.autosave = config['autosave'] || Yanfly.Param.AutosaveDefault;
};

//=============================================================================
// DataManager (restore loading flag for correct "Loaded" message)
//=============================================================================

Yanfly.Autosave.DataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue;
DataManager.loadGameWithoutRescue = function(savefileId) {
  var value = Yanfly.Autosave.DataManager_loadGameWithoutRescue.call(this, savefileId);
  $gameTemp._autosaveLoading = (savefileId === 12);  // Detect if loading our autosave slot
  return value;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Autosave.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Autosave.Game_System_initialize.call(this);
  this.initAutosave();
};

Game_System.prototype.initAutosave = function() {
  this._allowAutosave = true;
};

Game_System.prototype.canAutosave = function() {
  if (this._allowAutosave === undefined) this.initAutosave();
  return this._allowAutosave && ConfigManager.autosave;
};

Game_System.prototype.setAutosave = function(value) {
  if (this._allowAutosave === undefined) this.initAutosave();
  this._allowAutosave = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Autosave.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Autosave.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/EnableAutosave/i)) {
    $gameSystem.setAutosave(true);
  } else if (command.match(/DisableAutosave/i)) {
    $gameSystem.setAutosave(false);
  } else if (command.match(/Autosave/i)) {
    this.performAutosave();
  }
};

Game_Interpreter.prototype.performAutosave = function() {
  if ($gameMap.mapId() <= 0) return;
  if (!$gameSystem.canAutosave()) return;
  $gameSystem.onBeforeSave();
  var fixedSlot = 12;
  DataManager.saveGameWithoutRescue(fixedSlot);
  if (SceneManager._scene && SceneManager._scene._autosaveMsgWindow) {
    SceneManager._scene._autosaveMsgWindow.reveal();
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.Autosave.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.Autosave.Window_Options_addGeneralOptions.call(this);
  if (!Imported.YEP_OptionsCore && Yanfly.Param.AutosaveShowOpt) {
    this.addCommand(Yanfly.Param.AutosaveOptionCmd, 'autosave');
  }
};

//=============================================================================
// Window_Autosave
//=============================================================================

function Window_Autosave() {
  this.initialize.apply(this, arguments);
}

Window_Autosave.prototype = Object.create(Window_Base.prototype);
Window_Autosave.prototype.constructor = Window_Autosave;

Window_Autosave.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = eval(Yanfly.Param.AutosaveMsgX);
  var y = eval(Yanfly.Param.AutosaveMsgY);
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
  this.contentsOpacity = 0;
  this._showCount = 0;
  this.refresh();
  if ($gameTemp._autosaveLoading) {
    this.reveal();
    $gameTemp._autosaveLoading = false;
  }
};

Window_Autosave.prototype.standardPadding = function() {
  return 0;
};

Window_Autosave.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_Autosave.prototype.windowHeight = function() {
  return this.fittingHeight(1);
};

Window_Autosave.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this._showCount > 0) {
    this.updateFadeIn();
    this._showCount--;
  } else {
    this.updateFadeOut();
  }
};

Window_Autosave.prototype.updateFadeIn = function() {
  this.contentsOpacity += Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.updateFadeOut = function() {
  this.contentsOpacity -= Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.reveal = function() {
  if (!Yanfly.Param.AutosaveShowMsg) return;
  if (this._showCount > 0) return;
  this._showCount = Yanfly.Param.AutosaveMsgDur;
  this.refresh();
};

Window_Autosave.prototype.message = function() {
  if ($gameTemp._autosaveLoading) {
    return Yanfly.Param.AutosaveMsgLoad;
  } else {
    return Yanfly.Param.AutosaveMsgSave;
  }
};

Window_Autosave.prototype.refresh = function() {
  this.contents.clear();
  this.drawGradient();
  this.drawTextEx(this.message(), this.textPadding(), 0);
};

Window_Autosave.prototype.drawGradient = function() {
  eval(Yanfly.Param.AutosaveMsgCode);
};

Window_Autosave.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Autosave.Scene_Map_createAllWindows =
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.Autosave.Scene_Map_createAllWindows.call(this);
  this.createAutosaveMessageWindow();
};

Scene_Map.prototype.createAutosaveMessageWindow = function() {
  this._autosaveMsgWindow = new Window_Autosave();
  this.addChild(this._autosaveMsgWindow);
};

//=============================================================================
// End of File
//=============================================================================

} else {

Imported.YEP_X_Autosave = false;
var text = 'Error: YEP_X_Autosave requires YEP_SaveCore.js';
console.error(text);
alert(text);

}
//=============================================================================
// End of File
//=============================================================================