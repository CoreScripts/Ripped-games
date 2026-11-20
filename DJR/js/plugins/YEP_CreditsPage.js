//=============================================================================
// Yanfly Engine Plugins (Modified)
// YEP_CreditsPage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CreditsPage = true;

var Yanfly = Yanfly || {};
Yanfly.Credits = Yanfly.Credits || {};
Yanfly.Credits.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 Adds 'Changelog', 'Credits', 'Join Patreon' commands to the title screen menu.
 * @author Yanfly Engine Plugins (Modified by RatedSim)
 *
 * @param ---General---
 * @default
 *
 * @param Command Name
 * @parent ---General---
 * @desc This is the command name that appears for the title
 * command menu.
 * @default Credits
 *
 * @param Show Patreon Button
 * @parent ---General---
 * @desc Show the Join Patreon button on the title screen?
 * @type boolean
 * @default true
 *
 * @param ---Credit Lines---
 * @default
 *
 * @param Line 1 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 1 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 2 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 2 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 3 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 3 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 4 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 4 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 5 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 5 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 6 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 6 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 7 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 7 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 8 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 8 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 9 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 9 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 10 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 10 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 11 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 11 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 12 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 12 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 13 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 13 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 14 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 14 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 15 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 15 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 16 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 16 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 17 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 17 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 18 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 18 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 19 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 19 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 20 Text
 * @parent ---Credit Lines---
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 20 URL
 * @parent ---Credit Lines---
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param ---Changelog---
 * @default
 *
 * @param Changelog Command Name
 * @parent ---Changelog---
 * @desc The command name for the changelog in the title screen.
 * @default Changelog
 *
 * @param Changelog Text
 * @parent ---Changelog---
 * @type note
 * @desc The text to be displayed in the changelog window. Supports text codes.
 * @default ""
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a 'Credits' command to the title screen that will bring up
 * a window of a credits page made the way you want. Text codes can be used
 * for the credits page to allow for more customization options. Furthermore,
 * specific entries can be tied to URL's so you can link back to those you've
 * provided credit for!
 *
 * This plugin also adds a 'Changelog' command to the title screen, displaying a
 * scrollable window with text defined in the 'Changelog Text' parameter,
 * supporting text codes and line breaks. Empty lines or spaces can be used to
 * create visual gaps between version entries.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the plugin's parameters, where it says Line x Text, this is how the text
 * will appear. Using text codes here will cause the credits page to write it
 * out with text code properties.
 *
 * If you provide a URL with the Line x URL entry, then this specific entry
 * will open up a new window that will link the player to the specified URL.
 * This is optional. If nothing is used, no linking will occur.
 *
 * If you wish to leave an empty line in the credits, provide at least one
 * space ' ' in the text entry.
 *
 * For the changelog, set the 'Changelog Command Name' to change the title screen
 * option name. Use the 'Changelog Text' parameter to input all changelog text in
 * a single field, supporting text codes (e.g., \c[1] for color, \n for new lines).
 * Use \n\n or an empty line in the text to create a visual gap between version
 * entries.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * For those who wish to display the credits or changelog window from the map
 * scene during the middle of your game, you can now do so with plugin commands!
 *
 * Plugin Commands:
 *   OpenCreditsWindow
 *   - Opens the credits window from in-game during the map scene. This will
 *   cause the player and events to be unable to move.
 *
 *   OpenChangelog
 *   - Opens the changelog window from in-game during the map scene.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Added 'Changelog' command with scrollable text and line break support.
 * - Added support for empty lines to create visual gaps in changelog.
 *
 * Version 1.02:
 * - Added new plugin command 'OpenCreditsWindow'.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CreditsPage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CreditsCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.ShowPatreonButton = String(Yanfly.Parameters['Show Patreon Button']) === 'true';
Yanfly.Param.CreditsLine = {};
Yanfly.Param.CreditsURL = {};
Yanfly.SetupParameters = function() {
  for (var i = 1; i < 21; ++i) {
    var tName = 'Line ' + i + ' Text';
    var uName = 'Line ' + i + ' URL';
    Yanfly.Param.CreditsLine[i] = String(Yanfly.Parameters[tName]);
    Yanfly.Param.CreditsURL[i] = String(Yanfly.Parameters[uName]);
  };
};
Yanfly.SetupParameters();

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.Credits.Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function() {
  if ($gameTemp._creditsWindowOpen) return true;
  return Yanfly.Credits.Game_Map_isEventRunning.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.Credits.Game_Event_updateSelfMovement =
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if ($gameTemp._creditsWindowOpen) return true;
  Yanfly.Credits.Game_Event_updateSelfMovement.call(this);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Credits.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Credits.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'OpenCreditsWindow') {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.openCreditsWindow();
      $gameTemp._creditsWindowOpen = true;
    }
  }
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
  if (en === undefined) enabled = true;
  if (ext === undefined) ext = null;
  var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
  this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.Credits.Window_TitleCommand_makeCommandList =
  Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
  Yanfly.Credits.Window_TitleCommand_makeCommandList.call(this);
  var text = Yanfly.Param.CreditsCmdName;
  var enabled = true;
  this.addCommand(text, 'credits', enabled);
  if (Yanfly.Param.ShowPatreonButton) {
    this.addCommand('Join Patreon', 'patreon', enabled);
  }
};

//=============================================================================
// Window_CreditsPage
//=============================================================================

function Window_CreditsPage() {
    this.initialize.apply(this, arguments);
}

Window_CreditsPage.prototype = Object.create(Window_Command.prototype);
Window_CreditsPage.prototype.constructor = Window_CreditsPage;

Window_CreditsPage.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.openness = 0;
};

Window_CreditsPage.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_CreditsPage.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_CreditsPage.prototype.makeCommandList = function() {
  for (var i = 1; i < 21; ++i) {
    var text = Yanfly.Param.CreditsLine[i];
    var url = Yanfly.Param.CreditsURL[i];
    if (!text) continue;
    if (text === '') continue;
    this.addCommand(text, 'credit', true, url);
  }
};

Window_CreditsPage.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  var text = this.commandName(index);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(text, rect.x, rect.y, rect.width, align);
};

Window_CreditsPage.prototype.playOkSound = function() {
  if (this.currentExt() !== '') SoundManager.playOk();
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Credits.Scene_Title_createCommandWindow =
  Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  Yanfly.Credits.Scene_Title_createCommandWindow.call(this);
  this.createCreditsWindow();
  this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
  if (Yanfly.Param.ShowPatreonButton) {
    this._commandWindow.setHandler('patreon', this.commandPatreon.bind(this));
  }
};

Scene_Title.prototype.createCreditsWindow = function() {
  this._creditsWindow = new Window_CreditsPage();
  this._creditsWindow.setHandler('cancel', this.onCreditsCancel.bind(this));
  this._creditsWindow.setHandler('ok', this.onCreditsOk.bind(this));
  this.addWindow(this._creditsWindow);
};

Scene_Title.prototype.commandCredits = function() {
  this._commandWindow.close();
  this._creditsWindow.select(0);
  this._creditsWindow.activate();
  this._creditsWindow.open();
};

Scene_Title.prototype.commandPatreon = function() {
  var url = 'https://www.patreon.com/RatedSim';
  if (url !== '') {
    if (Utils.isNwjs()) {
      require('nw.gui').Shell.openExternal(url);
    } else {
      var win = window.open(url, '_blank');
      if (win) {
        win.focus();
      } else if (Imported.YEP_ExternalLinks) {
        SceneManager.openPopupBlockerMessage();
      }
    }
  }
  this._commandWindow.activate();
};

Scene_Title.prototype.onCreditsCancel = function() {
  this._creditsWindow.close();
  this._commandWindow.activate();
  this._commandWindow.open();
};

Scene_Title.prototype.onCreditsOk = function() {
  this._creditsWindow.activate();
  var url = this._creditsWindow.currentExt();
  if (url === '') return;
  if (Utils.isNwjs()) {
      require('nw.gui').Shell.openExternal(url);
  } else {
      var win = window.open(url, '_blank');
      if (win) {
          win.focus();
      } else if (Imported.YEP_ExternalLinks) {
          SceneManager.openPopupBlockerMessage();
      }
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Credits.Scene_Map_createAllWindows =
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.Credits.Scene_Map_createAllWindows.call(this);
  this.createCreditsWindow();
};

Scene_Map.prototype.createCreditsWindow = function() {
  this._creditsWindow = new Window_CreditsPage();
  this._creditsWindow.setHandler('cancel', this.onCreditsCancel.bind(this));
  this._creditsWindow.setHandler('ok', this.onCreditsOk.bind(this));
  this.addWindow(this._creditsWindow);
};

Scene_Map.prototype.openCreditsWindow = function() {
  this._creditsWindow.select(0);
  this._creditsWindow.activate();
  this._creditsWindow.open();
};

Scene_Map.prototype.onCreditsCancel = function() {
  this._creditsWindow.close();
  $gameTemp._creditsWindowOpen = false;
};

Scene_Map.prototype.onCreditsOk = function() {
  this._creditsWindow.activate();
  var url = this._creditsWindow.currentExt();
  if (url === '') return;
  if (Utils.isNwjs()) {
      require('nw.gui').Shell.openExternal(url);
  } else {
      var win = window.open(url, '_blank');
      if (win) {
          win.focus();
      } else if (Imported.YEP_ExternalLinks) {
          SceneManager.openPopupBlockerMessage();
      }
  }
};

//=============================================================================
// Changelog Additions - DO NOT MODIFY ORIGINAL CODE ABOVE
//=============================================================================

// Parameter Variables for Changelog
Yanfly.Param.ChangelogCmdName = String(Yanfly.Parameters['Changelog Command Name']);
Yanfly.Param.ChangelogText = String(Yanfly.Parameters['Changelog Text'] || '').slice(1, -1).replace(/\\n/g, '\n');

// Game_Map - Prevent movement when changelog window is open
Yanfly.Credits.Game_Map_isEventRunning_Changelog = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function() {
    if ($gameTemp._changelogWindowOpen) return true;
    return Yanfly.Credits.Game_Map_isEventRunning_Changelog.call(this);
};

// Game_Event - Prevent event movement when changelog window is open
Yanfly.Credits.Game_Event_updateSelfMovement_Changelog = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if ($gameTemp._changelogWindowOpen) return true;
    return Yanfly.Credits.Game_Event_updateSelfMovement_Changelog.call(this);
};

// Game_Interpreter - Add OpenChangelog plugin command
Yanfly.Credits.Game_Interpreter_pluginCommand_Changelog = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Credits.Game_Interpreter_pluginCommand_Changelog.call(this, command, args);
    if (command === 'OpenChangelog') {
        if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.openChangelogWindow();
            $gameTemp._changelogWindowOpen = true;
        }
    }
};

// Window_TitleCommand - Add Changelog before Credits
Yanfly.Credits.Window_TitleCommand_makeCommandList_Changelog = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Yanfly.Credits.Window_TitleCommand_makeCommandList_Changelog.call(this);
    var index = this.findSymbol('credits');
    if (index < 0) index = this._list.length - (Yanfly.Param.ShowPatreonButton ? 1 : 0);
    this.addCommandAt(index, Yanfly.Param.ChangelogCmdName, 'changelog', true);
};

// Window_Changelog - Mirror Window_CreditsPage without URL
function Window_Changelog() {
    this.initialize.apply(this, arguments);
}

Window_Changelog.prototype = Object.create(Window_Command.prototype);
Window_Changelog.prototype.constructor = Window_Changelog;

Window_Changelog.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_Changelog.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_Changelog.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_Changelog.prototype.makeCommandList = function() {
    if (Yanfly.Param.ChangelogText) {
        var lines = Yanfly.Param.ChangelogText.split('\n');
        for (var i = 0; i < lines.length; ++i) {
            this.addCommand(lines[i] || ' ', 'changelog', true);
        }
    }
};

Window_Changelog.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this.commandName(index);
    var lines = text.split('\n');
    var y = rect.y;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    for (var i = 0; i < lines.length; ++i) {
        this.drawTextEx(lines[i], rect.x, y, rect.width);
        y += this.lineHeight();
    }
};

Window_Changelog.prototype.itemRectForText = function(index) {
    var rect = Window_Command.prototype.itemRectForText.call(this, index);
    var text = this.commandName(index);
    var lines = text.split('\n');
    rect.height = this.lineHeight() * lines.length;
    return rect;
};

Window_Changelog.prototype.itemRect = function(index) {
    var rect = Window_Command.prototype.itemRect.call(this, index);
    var text = this.commandName(index);
    var lines = text.split('\n');
    rect.height = this.lineHeight() * lines.length;
    return rect;
};

// Scene_Title - Add Changelog Window and Handlers
Yanfly.Credits.Scene_Title_createCommandWindow_Changelog = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Yanfly.Credits.Scene_Title_createCommandWindow_Changelog.call(this);
    this.createChangelogWindow();
    this._commandWindow.setHandler('changelog', this.commandChangelog.bind(this));
};

Scene_Title.prototype.createChangelogWindow = function() {
    this._changelogWindow = new Window_Changelog();
    this._changelogWindow.setHandler('cancel', this.onChangelogCancel.bind(this));
    this.addWindow(this._changelogWindow);
};

Scene_Title.prototype.commandChangelog = function() {
    this._commandWindow.close();
    this._changelogWindow.select(0);
    this._changelogWindow.activate();
    this._changelogWindow.open();
};

Scene_Title.prototype.onChangelogCancel = function() {
    this._changelogWindow.close();
    this._commandWindow.activate();
    this._commandWindow.open();
};

// Scene_Map - Add Changelog Window and Handlers
Yanfly.Credits.Scene_Map_createAllWindows_Changelog = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.Credits.Scene_Map_createAllWindows_Changelog.call(this);
    this.createChangelogWindow();
};

Scene_Map.prototype.createChangelogWindow = function() {
    this._changelogWindow = new Window_Changelog();
    this._changelogWindow.setHandler('cancel', this.onChangelogCancel.bind(this));
    this.addWindow(this._changelogWindow);
};

Scene_Map.prototype.openChangelogWindow = function() {
    this._changelogWindow.select(0);
    this._changelogWindow.activate();
    this._changelogWindow.open();
};

Scene_Map.prototype.onChangelogCancel = function() {
    this._changelogWindow.close();
    $gameTemp._changelogWindowOpen = false;
};