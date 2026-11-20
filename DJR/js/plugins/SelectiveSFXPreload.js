/*:
 * @plugindesc (v1.1) Selective SFX Pre-cache
 * @author Rated Sim
 *
 * @param SFX List
 * @desc List the filenames of the SE files you want to cache (separated by commas). Do not include extensions.
 * @default Cursor1, Cancel1, Decision1, Equip1
 *
 * @help 
 * This plugin preloads only the specific .ogg/.m4a files listed in 
 * the 'SFX List' parameter from your audio/se/ folder.
 *
 * Use this to keep your RAM usage low by only caching essential
 * or frequently used sounds (like menu clicks or footsteps).
 */

(function() {
    var params = PluginManager.parameters('SelectiveSFXPreload');
    var sfxListRaw = String(params['SFX List'] || "");
    
    // Convert comma-separated string into a clean array
    var sfxToCache = sfxListRaw.split(',').map(function(name) {
        return name.trim();
    }).filter(function(name) {
        return name.length > 0;
    });

    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        preloadSpecificSFX();
    };

    function preloadSpecificSFX() {
        if (sfxToCache.length === 0) return;

        console.log("Selective SFX Preload: Starting for " + sfxToCache.length + " files.");

        sfxToCache.forEach(function(sfxName) {
            var audio = { name: sfxName, volume: 0, pitch: 100, pan: 0 };
            try {
                AudioManager.loadStaticSe(audio);
            } catch (e) {
                console.error('Error preloading SFX: ' + sfxName, e);
            }
        });
    }
})();