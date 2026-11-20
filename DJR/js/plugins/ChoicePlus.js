/*:
 * @plugindesc (v1.3) Merges consecutive Show Choices. Supports nesting and complex branches.
 * @author Rated Sim
 * @help 
 * ============================================================================
 * Usage:
 * ChoicePlus start
 * [Show Choices 1]
 * [Show Choices 2]
 * ...
 * ChoicePlus end
 * ============================================================================
 */

(function() {
    'use strict';

    // 1. Plugin Commands
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'choiceplus') {
            $gameSystem._choicePlusEnabled = (args[0].toLowerCase() === 'start');
        }
    };

    // 2. Initialize storage on the Interpreter
    var _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.call(this);
        this._cpData = {}; // Stores choice data per indent level
    };

    // 3. The Main Logic
    var _Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
    Game_Interpreter.prototype.command102 = function() {
        if (!$gameSystem._choicePlusEnabled) return _Game_Interpreter_command102.call(this);

        var depth = this._indent;
        var state = this._cpData[depth];

        // --- STEP 2: The player has made a choice, now resolving branches ---
        if (state && state.resolved) {
            this.executeCpBranch(state);
            
            // If this is the last command in the merge group, clean up this depth
            if (this._index === state.lastIdx) {
                delete this._cpData[depth];
            }
            return true; 
        }

        // --- STEP 1: First time hitting this choice group, start the merge ---
        var list = [], map = [], scan = this._index;
        var firstParams = this._params;

        while (scan < this._list.length) {
            var cmd = this._list[scan];
            // If indent drops, we exited a block. If it's higher, it's a nested command (ignore here).
            if (cmd.indent < depth) break; 

            if (cmd.indent === depth) {
                if (cmd.code === 102) {
                    // Map the global choice index to this specific command and local index
                    cmd.parameters[0].forEach(function(text, i) {
                        map.push({ cmdIdx: scan, localIdx: i });
                    });
                    list = list.concat(cmd.parameters[0]);
                    this._cpData[depth] = { lastIdx: scan, map: map, resolved: false, selection: null };
                } else if (cmd.code !== 402 && cmd.code !== 404) {
                    break; // Hit something that isn't choice related
                }
            }
            scan++;
        }

        // Setup Message Window
        $gameMessage.setChoices(list, firstParams[2], firstParams[1]);
        $gameMessage.setChoiceBackground(firstParams[4]);
        $gameMessage.setChoicePositionType(firstParams[3]);
        
        $gameMessage.setChoiceCallback(function(n) {
            this._cpData[depth].selection = n;
            this._cpData[depth].resolved = true;
        }.bind(this));

        this.setWaitMode('message');
        return false;
    };

    // Helper: Logic to determine if this command should "fire" or "skip"
    Game_Interpreter.prototype.executeCpBranch = function(state) {
        this._branch[this._indent] = -1; // Default to skip
        var sel = state.selection;

        // Handle Cancel
        if (sel === -2) {
            if (this._params[1] === -2) this._branch[this._indent] = -2;
            return;
        }

        // Handle normal selection: 
        // We look through the map to see if the chosen index belongs to THIS command index
        var match = state.map[sel];
        if (match && match.cmdIdx === this._index) {
            this._branch[this._indent] = match.localIdx;
        }
    };

    // 4. Scrolling Window (Capped at 8 choices)
    var _Window_ChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
    Window_ChoiceList.prototype.numVisibleRows = function() {
        if ($gameMessage.choices().length > 0) {
            return Math.min($gameMessage.choices().length, 8);
        }
        return _Window_ChoiceList_numVisibleRows.call(this);
    };

})();