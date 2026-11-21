/*:
 * @plugindesc Allows you to add/customize multiple layered backgrounds and change window opacity for all menu scenes.
 * @author SumRndmDde (modified by Rated Sim)
 *
 * @param == Main Menu ==
 * @default
 *
 * @param Menu Background 1
 * @desc The bottom layer background used for the main menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Menu X Offset 1
 * @desc The x offset for the first background in the main menu.
 * @default 0
 *
 * @param Menu Y Offset 1
 * @desc The y offset for the first background in the main menu.
 * @default 0
 *
 * @param Menu Move Frames 1
 * @desc The number of frames for movement of the first background in the main menu.
 * @default 0
 *
 * @param Menu Background 2
 * @desc The middle layer background used for the main menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Menu X Offset 2
 * @desc The x offset for the second background in the main menu.
 * @default 0
 *
 * @param Menu Y Offset 2
 * @desc The y offset for the second background in the main menu.
 * @default 0
 *
 * @param Menu Move Frames 2
 * @desc The number of frames for movement of the second background in the main menu.
 * @default 0
 *
 * @param Menu Background 3
 * @desc The top layer background used for the main menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Menu X Offset 3
 * @desc The x offset for the third background in the main menu.
 * @default 0
 *
 * @param Menu Y Offset 3
 * @desc The y offset for the third background in the main menu.
 * @default 0
 *
 * @param Menu Move Frames 3
 * @desc The number of frames for movement of the third background in the main menu.
 * @default 0
 *
 * @param Menu Opacity
 * @desc The opacity of the windows in the main menu screen.
 * Set to a number between 0 and 255
 * @default 255
 *
 * @param Menu Scale
 * @desc The base scale of the background images.
 * 1 is a normal scale; 0.5 is half; 2 is double; etc...
 * @default 1
 *
 * @param Menu Fade Frames
 * @desc The number of frames for fade-in in the main menu.
 * @default 25
 *
 * @param == Item Menu ==
 * @default
 *
 * @param Item Background 1
 * @desc The bottom layer background used for the item menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Item X Offset 1
 * @desc The x offset for the first background in the item menu.
 * @default 0
 *
 * @param Item Y Offset 1
 * @desc The y offset for the first background in the item menu.
 * @default 0
 *
 * @param Item Move Frames 1
 * @desc The number of frames for movement of the first background in the item menu.
 * @default 0
 *
 * @param Item Background 2
 * @desc The middle layer background used for the item menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Item X Offset 2
 * @desc The x offset for the second background in the item menu.
 * @default 0
 *
 * @param Item Y Offset 2
 * @desc The y offset for the second background in the item menu.
 * @default 0
 *
 * @param Item Move Frames 2
 * @desc The number of frames for movement of the second background in the item menu.
 * @default 0
 *
 * @param Item Background 3
 * @desc The top layer background used for the item menu screen.
 * Place it in img/SumRndmDde/menu/
 * @default
 *
 * @param Item X Offset 3
 * @desc The x offset for the third background in the item menu.
 * @default 0
 *
 * @param Item Y Offset 3
 * @desc The y offset for the third background in the item menu.
 * @default 0
 *
 * @param Item Move Frames 3
 * @desc The number of frames for movement of the third background in the item menu.
 * @default 0
 *
 * @param Item Opacity
 * @desc The opacity of the windows in the item menu screen.
 * Set to a number between 0 and 255
 * @default 255
 *
 * @param Item Scale
 * @desc The base scale of the background images.
 * 1 is a normal scale; 0.5 is half; 2 is double; etc...
 * @default 1
 *
 * @param Item Fade Frames
 * @desc The number of frames for fade-in in the item menu.
 * @default 25
 *
 * @help
 *
 * Menu Backgrounds
 * Version 2.05 (modified)
 * SumRndmDde
 *
 *
 * This allows you to give all the menu pages of your menu custom
 * layered backgrounds!
 *
 * You can control the scale of the background images, the opacity of the
 * windows in the menus, and the positions of the background images.
 *
 *
 * ==============================================================================
 *  How to set up the images
 * ==============================================================================
 *
 * Place all the background images you wish to use in:
 *
 * img/SumRndmDde/menu
 *
 * (this is so that when you export your game, all you have to do is copy
 * the SumRndmDde folder inside of the img folder to the exported game files)
 *
 * Anyway, simply input the picture's name without the file extension
 * into the Parameter of choice and it should work perfectly.
 *
 * Each menu can have up to 3 layered backgrounds, with 1 being the bottom layer.
 * You can set x and y offsets for each layer.
 *
 *
 * ==============================================================================
 *  End of Help File
 * ==============================================================================
 *
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 */

var SRD = SRD || {};
SRD.MenuBackgrounds = SRD.MenuBackgrounds || {};

var Imported = Imported || {};
Imported["SumRndmDde Menu Backgrounds"] = 2.05;

(function(_) {

"use strict";

//-----------------------------------------------------------------------------
// SRD.MenuBackgrounds
//-----------------------------------------------------------------------------

const params = PluginManager.parameters('SRD_MenuBackgrounds');

_.backgrounds = {};
_.backgrounds["Scene_Menu_1"] = String(params['Menu Background 1']);
_.backgrounds["Scene_Menu_2"] = String(params['Menu Background 2']);
_.backgrounds["Scene_Menu_3"] = String(params['Menu Background 3']);
_.backgrounds["Scene_Item_1"] = String(params['Item Background 1']);
_.backgrounds["Scene_Item_2"] = String(params['Item Background 2']);
_.backgrounds["Scene_Item_3"] = String(params['Item Background 3']);

_.xOffsets = {};
_.xOffsets["Scene_Menu_1"] = parseInt(params['Menu X Offset 1']);
_.xOffsets["Scene_Menu_2"] = parseInt(params['Menu X Offset 2']);
_.xOffsets["Scene_Menu_3"] = parseInt(params['Menu X Offset 3']);
_.xOffsets["Scene_Item_1"] = parseInt(params['Item X Offset 1']);
_.xOffsets["Scene_Item_2"] = parseInt(params['Item X Offset 2']);
_.xOffsets["Scene_Item_3"] = parseInt(params['Item X Offset 3']);

_.yOffsets = {};
_.yOffsets["Scene_Menu_1"] = parseInt(params['Menu Y Offset 1']);
_.yOffsets["Scene_Menu_2"] = parseInt(params['Menu Y Offset 2']);
_.yOffsets["Scene_Menu_3"] = parseInt(params['Menu Y Offset 3']);
_.yOffsets["Scene_Item_1"] = parseInt(params['Item Y Offset 1']);
_.yOffsets["Scene_Item_2"] = parseInt(params['Item Y Offset 2']);
_.yOffsets["Scene_Item_3"] = parseInt(params['Item Y Offset 3']);

_.moveFrames = {};
_.moveFrames["Scene_Menu_1"] = parseInt(params['Menu Move Frames 1']);
_.moveFrames["Scene_Menu_2"] = parseInt(params['Menu Move Frames 2']);
_.moveFrames["Scene_Menu_3"] = parseInt(params['Menu Move Frames 3']);
_.moveFrames["Scene_Item_1"] = parseInt(params['Item Move Frames 1']);
_.moveFrames["Scene_Item_2"] = parseInt(params['Item Move Frames 2']);
_.moveFrames["Scene_Item_3"] = parseInt(params['Item Move Frames 3']);

_.opacity = {};
_.opacity["Scene_Menu"] = parseInt(params['Menu Opacity']);
_.opacity["Scene_Item"] = parseInt(params['Item Opacity']);

_.scales = {};
_.scales["Scene_Menu"] = parseFloat(params['Menu Scale']);
_.scales["Scene_Item"] = parseFloat(params['Item Scale']);

_.fadeFrames = {};
_.fadeFrames["Scene_Menu"] = parseInt(params['Menu Fade Frames']);
_.fadeFrames["Scene_Item"] = parseInt(params['Item Fade Frames']);

_.loadImage = function(filename, hue) {
    return ImageManager.loadBitmap('img/SumRndmDde/menu/', filename, hue, true);
};

_.loadAllImages = function() {
    for (let property in _.backgrounds) {
        if (_.backgrounds.hasOwnProperty(property)) {
            const name = _.backgrounds[property];
            if(name.trim().length > 0) {
                _.loadImage(name);
            }
        }
    }
};

// Load only after the database exists, so Decrypter.hasEncryptedImages is set.
// Loading this early requests .png paths and caches a failed (empty) bitmap.
_.preloadAfterBoot = function() {
    if (window.$dataSystem) {
        _.loadAllImages();
    }
};

if (window.$dataSystem) {
    _.preloadAfterBoot();
} else {
    var _SRD_MenuBackgrounds_bootStart = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _SRD_MenuBackgrounds_bootStart.apply(this, arguments);
        _.preloadAfterBoot();
    };
}

//-----------------------------------------------------------------------------
// Scene_MenuBase
//-----------------------------------------------------------------------------

_.Scene_MenuBase_create = Scene_MenuBase.prototype.create;
Scene_MenuBase.prototype.create = function() {
    this._menuBackgroundConstructorName = String(this.constructor.name);
    _.Scene_MenuBase_create.apply(this, arguments);
};

_.Scene_MenuBase_start = Scene_MenuBase.prototype.start;
Scene_MenuBase.prototype.start = function() {
    _.Scene_MenuBase_start.apply(this, arguments);
    this.setupWindowOpacities();
};

Scene_MenuBase.prototype.setupWindowOpacities = function() {
    if(!this._windowLayer) return;
    const opac = _.opacity[this._menuBackgroundConstructorName];
    const childs = this._windowLayer.children;
    if((opac || opac === 0) && childs) {
        for(let i = 0; i < childs.length; i++) {
            const win = childs[i];
            if(win._isWindow) {
                win.opacity = opac;
            }
        }
    }
};

_.Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
    const sceneName = this._menuBackgroundConstructorName;
    const scale = _.scales[sceneName] || 1;
    const fadeDuration = _.fadeFrames[sceneName] || 0;
    let hasBackground = false;
    for(let i = 1; i <= 3; i++) {
        const bgKey = sceneName + '_' + i;
        const name = _.backgrounds[bgKey];
        if(name && name.trim().length > 0) {
            hasBackground = true;
            const bit = _.loadImage(name);
            const sprite = new Sprite();
            const baseWidth = Graphics.boxWidth;
            const baseHeight = Graphics.boxHeight;
            sprite.bitmap = new Bitmap(baseWidth, baseHeight);
            sprite.bitmap.blt(bit, 0, 0, bit.width, bit.height, 0, 0, baseWidth, baseHeight);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.scale.x = scale;
            sprite.scale.y = scale;
            sprite._fadeDuration = fadeDuration;
            sprite._moveDuration = _.moveFrames[bgKey] || 0;
            sprite._currentFadeFrame = 0;
            sprite._currentMoveFrame = 0;
            sprite._startX = Graphics.boxWidth / 2;
            sprite._startY = Graphics.boxHeight / 2;
            sprite._targetX = sprite._startX + (_.xOffsets[bgKey] || 0);
            sprite._targetY = sprite._startY + (_.yOffsets[bgKey] || 0);
            if(sprite._moveDuration === 0) {
                sprite.x = sprite._targetX;
                sprite.y = sprite._targetY;
            } else {
                sprite.x = sprite._startX;
                sprite.y = sprite._startY;
            }
            if(sprite._fadeDuration === 0) {
                sprite.opacity = 255;
            } else {
                sprite.opacity = 0;
            }
            this.addChild(sprite);
        }
    }
    if(!hasBackground) {
        _.Scene_MenuBase_createBackground.call(this);
    }
};

_.Scene_MenuBase_update = Scene_MenuBase.prototype.update || Scene_Base.prototype.update;
Scene_MenuBase.prototype.update = function() {
    _.Scene_MenuBase_update.apply(this, arguments);
    this.updateBackgroundAnimations();
};

Scene_MenuBase.prototype.updateBackgroundAnimations = function() {
    this.children.forEach(function(child) {
        if (child instanceof Sprite && child._fadeDuration !== undefined) {
            if (child._fadeDuration > 0 && child._currentFadeFrame < child._fadeDuration) {
                child._currentFadeFrame++;
                child.opacity = 255 * (child._currentFadeFrame / child._fadeDuration);
            }
            if (child._moveDuration > 0 && child._currentMoveFrame < child._moveDuration) {
                child._currentMoveFrame++;
                let t = child._currentMoveFrame / child._moveDuration;
                child.x = child._startX + (child._targetX - child._startX) * t;
                child.y = child._startY + (child._targetY - child._startY) * t;
            }
        }
    }, this);
};

})(SRD.MenuBackgrounds);