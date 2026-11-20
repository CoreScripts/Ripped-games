/*:
 * @plugindesc (v1.1) Custom Memory Management for Galv_ImageCache
 * @author Rated Sim
 * * @help 
 * ----------------------------------------------------------------------------
 * This plugin adds a 'Temporary Bucket' to Galv_ImageCache to prevent 
 * memory leaks and crashes during long play sessions.
 * ----------------------------------------------------------------------------
 * SCRIPT CALLS:
 * * 1. LOAD TEMPORARY ASSET:
 * Galv.CACHE.loadTemp('folder', 'filename');
 * ['PicA', 'PicB'].forEach(img => Galv.CACHE.loadTemp('pictures', img));
 * 
 * * 2. CLEAR TEMPORARY ASSETS:
 * Galv.CACHE.clearTemp();
 * - This clears only 'loadTemp' images and forces RAM cleanup.
 * - It leaves your Galv Plugin Parameter images safely in RAM.
 * ----------------------------------------------------------------------------
 */

(function() {
    Galv.CACHE.tempBucketId = 999;
    Galv.CACHE._tempKeys = {}; 

    // 1. Load Temp: Tracks the path
    Galv.CACHE.loadTemp = function(folder, img) {
        var path = 'img/' + (folder ? folder + '/' : '') + img + '.png';
        this._tempKeys[path] = true;
        
        if (ImageManager.reserveSpecific) {
            ImageManager.reserveSpecific(img, folder, 0, this.tempBucketId);
        }
    };

    // 2. THE FIX: Surgical Purge with Safety Checks
    Galv.CACHE.clearTemp = function() {
        // Safety check for the reservation system
        if (ImageManager.releaseReservation) {
            ImageManager.releaseReservation(this.tempBucketId);
        }
        
        for (var key in this._tempKeys) {
            // Layer 1 Safety: Standard Cache
            if (ImageManager._cache && ImageManager._cache[key]) {
                delete ImageManager._cache[key];
            }
            
            // Layer 2 Safety: 1.6.1 ImageCache (Handles the flickering fix)
            // Added check for .cache and ._items to prevent undefined errors
            if (ImageManager.cache && ImageManager.cache._items && ImageManager.cache._items[key]) {
                delete ImageManager.cache._items[key];
            }
        }

        // Reset tracker
        this._tempKeys = {};
        
        // Final memory cleanup
        if (window.gc) {
            window.gc();
        }
        
        console.log("Memory Purge Complete: Selective layers cleared safely.");
    };

    // 3. Debug Audit
    Galv.CACHE.debugMemory = function() {
        var cacheSize = ImageManager._cache ? Object.keys(ImageManager._cache).length : 0;
        var internalSize = (ImageManager.cache && ImageManager.cache._items) ? Object.keys(ImageManager.cache._items).length : 0;
        var tempCount = Object.keys(this._tempKeys).length;

        console.log("--- 1.6.1 Safe Audit ---");
        console.log("Temp Tracker: " + tempCount);
        console.log("Standard Cache: " + cacheSize);
        console.log("Internal ImageCache: " + internalSize);
        console.log("--------------------------");
    };

})();