/*:
 * @plugindesc Mutes all sounds when minimized, unmutes on focus. Adds an option to toggle this feature.
 * @author Rated_Sim
 *
 * @help This plugin disables all sounds when the game window is minimized
 * and re-enables them when the window is brought back to the foreground.
 * 
 * Players can toggle this setting in the Options menu.
 * 
 * This plugin does not require any other plugins.
 * 
 * Credit is required for usage.
 * 
 * @param Option Name
 * @desc The name displayed in the Options menu.
 * @default Mute on Minimize
 *
 * @param Default Value
 * @desc Default setting for muting sound when minimized (true/false)
 * @default false
 */

(function() {
  var parameters = PluginManager.parameters('YourPluginName');
  var optionName = String(parameters['Option Name'] || "Mute on Minimize");
  var defaultValue = String(parameters['Default Value']).trim().toLowerCase() === 'true';

  // Add setting to ConfigManager
  ConfigManager.muteOnMinimize = defaultValue;

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    config.muteOnMinimize = this.muteOnMinimize;
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.muteOnMinimize = config.hasOwnProperty('muteOnMinimize') ? config.muteOnMinimize : defaultValue;
  };

  // Move option to the bottom
  var _Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
  Window_Options.prototype.addVolumeOptions = function() {
    _Window_Options_addVolumeOptions.call(this);
    this.addCommand(optionName, 'muteOnMinimize');
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(symbol) {
    if (symbol === "muteOnMinimize") {
      return this._pendingMuteState !== undefined 
        ? (this._pendingMuteState ? "ON" : "OFF") 
        : (ConfigManager.muteOnMinimize ? "ON" : "OFF");
    }
    return _Window_Options_statusText.call(this, symbol);
  };

  var _Window_Options_initialize = Window_Options.prototype.initialize;
  Window_Options.prototype.initialize = function() {
    _Window_Options_initialize.call(this);
    this._pendingMuteState = undefined;
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var symbol = this.commandSymbol(this.index());
    if (symbol === "muteOnMinimize") {
      this._pendingMuteState = !ConfigManager.muteOnMinimize;
    }
    _Window_Options_processOk.call(this);
  };

  var _Window_Options_update = Window_Options.prototype.update;
  Window_Options.prototype.update = function() {
    _Window_Options_update.call(this);

    if (this._pendingMuteState !== undefined) {
      ConfigManager.muteOnMinimize = this._pendingMuteState;
      SoundManager.playCursor();
    }
    this._pendingMuteState = undefined;
  };

  var soundsPaused = false;
  var _wasPlayingBgm = null;
  var _wasPlayingBgs = null;
  var _wasPlayingMe = null;

  function toggleSounds(pause) {
    if (!ConfigManager.muteOnMinimize) return;

    soundsPaused = pause;
    if (pause) {
      _wasPlayingBgm = AudioManager._currentBgm;
      _wasPlayingBgs = AudioManager._currentBgs;
      _wasPlayingMe = AudioManager._currentMe;
      AudioManager.stopBgm();
      AudioManager.stopBgs();
      AudioManager.stopMe();
      AudioManager.stopSe();
    } else {
      if (_wasPlayingBgm) AudioManager.playBgm(_wasPlayingBgm);
      if (_wasPlayingBgs) AudioManager.playBgs(_wasPlayingBgs);
      if (_wasPlayingMe) AudioManager.playMe(_wasPlayingMe);
    }
  }

  window.addEventListener('blur', function() {
    toggleSounds(true);
  });

  window.addEventListener('focus', function() {
    toggleSounds(false);
  });

})();
