/*:
 * @plugindesc Secure Gold and Day Tracking Plugin for RPG Maker MV
 * @author RatedSim
 *
 * @param EnableDebugLogs
 * @text Enable Debug Logs
 * @type boolean
 * @default true
 * @desc Enable console logs for debugging. Disable for production to reduce performance impact.
 *
 * @help
 * == Description ==
 * This plugin secures gold and the day counter (variable 0005) to prevent cheating in RPG Maker MV.
 * - Gold resets if changed outside in-game commands (events, battles, shops).
 * - Day counter (variable 0005) resets if changed outside Common Event 22.
 * - Tampered save files are detected, with older saves loading with defaults.
 *
 * == Compatibility ==
 * - Compatible with RPG Maker MV 1.0–1.6.2.
 * - Works with most event and variable systems. Test with plugins that modify:
 *   - Game_Variables (e.g., custom variable managers)
 *   - DataManager (e.g., Yanfly’s Save Engine)
 * - Minimizes conflicts by using unique method names and minimal overrides.
 *
 * == Setup ==
 * 1. Configure Common Event 22 to change variable 0005 (e.g., Control Variables: [0005] += 1).
 * 2. Add these script calls in Common Event 22:
 *    - Before changing variable 0005: `$gameSystem.allowDayChange(true)`
 *    - After changing variable 0005: `$gameSystem.allowDayChange(false)`
 *    Example:
 *      ◆ Script: $gameSystem.allowDayChange(true)
 *      ◆ Control Variables: [0005] += 1
 *      ◆ Script: $gameSystem.allowDayChange(false)
 * 3. Call Common Event 22 directly or via another event (e.g., sleep event with Common Event Call).
 * 4. For BO_CustomShop, ensure its purchase logic includes:
 *      ◆ Script: $gameSystem.allowShopPurchase(true)
 *      ◆ (Purchase logic)
 *      ◆ Script: $gameSystem.allowShopPurchase(false)
 * 5. Keep Debug Logs enabled during testing (F8 to view console).
 *
 * == Troubleshooting ==
 * - If variable 0005 doesn’t change:
 *   - Check console (F8) for logs like "Unauthorized day counter change" or "Authorized day change".
 *   - Verify Common Event 22 includes the script calls above.
 *   - Ensure Common Event 22 is called correctly (e.g., via event or script).
 *   - Share console logs, Common Event 22 setup, and calling event details with support.
 * - If gold doesn’t decrease in BO_CustomShop:
 *   - Check console for "Unauthorized gold change" logs.
 *   - Verify BO_CustomShop calls `$gameSystem.allowShopPurchase(true/false)` around purchase.
 *   - Share BO_CustomShop purchase logic and console logs.
 * - Disable Debug Logs in production for performance.
 *
 * == Notes ==
 * - Saves from before this plugin or with a different encryption key may load with default values.
 * - Report issues with console logs, event setup, and other plugins in use.
 */

(function() {
    var parameters = PluginManager.parameters('SecureGoldAndDayTracking');
    var enableDebugLogs = parameters['EnableDebugLogs'] === 'true';
    var SecureTracking = SecureTracking || {};

    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._goldTransactionLog = [];
        this._lastValidGold = 0;
        this._isProcessingAuthorizedGoldChange = false;
        this._isProcessingShopPurchase = false;
        this._dayTransactionLog = [];
        this._lastValidDay = 0;
        this._isProcessingAuthorizedDayChange = false;
        this._allowDayChange = false;
    };

    Game_System.prototype.allowDayChange = function(allow) {
        this._allowDayChange = !!allow;
        if (enableDebugLogs) console.log("Day change authorization set to: " + this._allowDayChange);
    };

    Game_System.prototype.allowShopPurchase = function(allow) {
        this._isProcessingShopPurchase = !!allow;
        if (enableDebugLogs) console.log("Shop purchase authorization set to: " + this._isProcessingShopPurchase);
    };

    var _Game_Party_gainGold = Game_Party.prototype.gainGold;
    Game_Party.prototype.gainGold = function(amount) {
        if (this.isAuthorizedGoldChange() || $gameSystem._isProcessingAuthorizedGoldChange) {
            $gameSystem._isProcessingAuthorizedGoldChange = true;
            _Game_Party_gainGold.call(this, amount);
            this.logGoldTransaction(amount);
            $gameSystem._lastValidGold = this.gold();
            $gameSystem._isProcessingAuthorizedGoldChange = false;
            if (enableDebugLogs) console.log("Authorized gold change: " + amount + ", New gold: " + this.gold());
        } else {
            if (enableDebugLogs) console.warn("Unauthorized gold change detected. Amount: " + amount + ", Stack: " + (new Error().stack));
            var currentGold = this.gold();
            var difference = $gameSystem._lastValidGold - currentGold;
            $gameSystem._isProcessingAuthorizedGoldChange = true;
            _Game_Party_gainGold.call(this, difference);
            $gameSystem._isProcessingAuthorizedGoldChange = false;
        }
    };

    // Decided from engine state rather than Error.stack: Safari/WebKit does not
    // include function names in stack traces, which made every in-game gold
    // change look unauthorized on iOS.
    Game_Party.prototype.isAuthorizedGoldChange = function() {
        if ($gameSystem && $gameSystem._isProcessingShopPurchase) return true;
        var scene = typeof SceneManager !== 'undefined' ? SceneManager._scene : null;
        if (scene && ((typeof Scene_Battle !== 'undefined' && scene instanceof Scene_Battle) ||
                      (typeof Scene_Shop !== 'undefined' && scene instanceof Scene_Shop))) {
            return true;
        }
        if (typeof $gameMap !== 'undefined' && $gameMap) {
            var interpreter = $gameMap._interpreter;
            while (interpreter) {
                if (interpreter.isRunning && interpreter.isRunning()) return true;
                interpreter = interpreter._childInterpreter;
            }
        }
        if (enableDebugLogs) console.log("Gold change is not from an event, shop or battle.");
        return false;
    };

    Game_Party.prototype.logGoldTransaction = function(amount) {
        var transaction = {
            amount: amount,
            goldAfter: $gameParty.gold(),
            timestamp: Date.now()
        };
        $gameSystem._goldTransactionLog.push(transaction);
        if ($gameSystem._goldTransactionLog.length > 500) {
            $gameSystem._goldTransactionLog.shift();
        }
    };

    var _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        if (variableId === 5) {
            if (this.isAuthorizedDayChange() || $gameSystem._isProcessingAuthorizedDayChange) {
                if (enableDebugLogs) console.log("Authorized day change: Setting variable 0005 to " + value);
                $gameSystem._isProcessingAuthorizedDayChange = true;
                _Game_Variables_setValue.call(this, variableId, value);
                this.logDayTransaction(value);
                $gameSystem._lastValidDay = this.value(5);
                $gameSystem._isProcessingAuthorizedDayChange = false;
            } else {
                if (enableDebugLogs) console.warn("Unauthorized day counter change detected. Current: " + this.value(5) + ", Attempted: " + value + ", Reverting to: " + $gameSystem._lastValidDay + ", AllowDayChange: " + $gameSystem._allowDayChange);
                $gameSystem._isProcessingAuthorizedDayChange = true;
                _Game_Variables_setValue.call(this, variableId, $gameSystem._lastValidDay);
                $gameSystem._isProcessingAuthorizedDayChange = false;
            }
        } else {
            _Game_Variables_setValue.call(this, variableId, value);
        }
    };

    Game_Variables.prototype.isAuthorizedDayChange = function() {
        var isAuthorized = $gameSystem._allowDayChange;
        if (enableDebugLogs) console.log("Checking day change authorization: AllowDayChange=" + isAuthorized);
        return isAuthorized;
    };

    Game_Variables.prototype.logDayTransaction = function(value) {
        var transaction = {
            value: value,
            dayAfter: $gameVariables.value(5),
            timestamp: Date.now()
        };
        $gameSystem._dayTransactionLog.push(transaction);
        if ($gameSystem._dayTransactionLog.length > 500) {
            $gameSystem._dayTransactionLog.shift();
        }
    };

    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _DataManager_makeSaveContents.call(this);
        contents.validationHash = SecureTracking.encryptString(
            JSON.stringify({
                gold: $gameParty.gold(),
                lastValidGold: $gameSystem._lastValidGold,
                goldTransactionLog: $gameSystem._goldTransactionLog,
                day: $gameVariables.value(5),
                lastValidDay: $gameSystem._lastValidDay,
                dayTransactionLog: $gameSystem._dayTransactionLog
            })
        );
        return contents;
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if (contents.validationHash) {
            try {
                var decrypted = SecureTracking.decryptString(contents.validationHash);
                var validationData = JSON.parse(decrypted);
                if (
                    validationData.gold !== $gameParty.gold() ||
                    validationData.lastValidGold !== $gameSystem._lastValidGold ||
                    validationData.day !== $gameVariables.value(5) ||
                    validationData.lastValidDay !== $gameSystem._lastValidDay
                ) {
                    if (enableDebugLogs) console.warn("Tampered save detected. Using last valid values.");
                    $gameParty.gainGold(validationData.lastValidGold - $gameParty.gold());
                    $gameVariables.setValue(5, validationData.lastValidDay);
                }
            } catch (e) {
                if (enableDebugLogs) console.warn("Invalid validation hash. Using current values.");
            }
        } else {
            if (enableDebugLogs) console.warn("No validation data in save. Using defaults.");
        }
    };

    SecureTracking.encryptString = function(str) {
        var key = "HeyHacker";
        var result = "";
        for (var i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result);
    };

    SecureTracking.decryptString = function(str) {
        var decoded = atob(str);
        var key = "HeyHacker";
        var result = "";
        for (var i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    };

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._frameCount % 60 === 0) {
            var currentGold = $gameParty.gold();
            if (
                currentGold !== $gameSystem._lastValidGold &&
                !$gameSystem._isProcessingAuthorizedGoldChange
            ) {
                var goldDifference = $gameSystem._lastValidGold - currentGold;
                $gameSystem._isProcessingAuthorizedGoldChange = true;
                $gameParty.gainGold(goldDifference);
                $gameSystem._isProcessingAuthorizedGoldChange = false;
            }
            var currentDay = $gameVariables.value(5);
            if (
                currentDay !== $gameSystem._lastValidDay &&
                !$gameSystem._isProcessingAuthorizedDayChange
            ) {
                if (enableDebugLogs) console.warn("Periodic check: Unauthorized day change. Reverting to: " + $gameSystem._lastValidDay);
                $gameSystem._isProcessingAuthorizedDayChange = true;
                $gameVariables.setValue(5, $gameSystem._lastValidDay);
                $gameSystem._isProcessingAuthorizedDayChange = false;
            }
        }
        this._frameCount = (this._frameCount || 0) + 1;
    };
})();