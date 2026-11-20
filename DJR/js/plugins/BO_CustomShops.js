//=============================================================================
//  Burning Orca Plugins
//  BO_CustomShops.js
//  Version: 2.5
//=============================================================================
var Imported = Imported || {};
Imported.BO_Shops = true;

var BurningOrca = BurningOrca || {};
BurningOrca.Shops = BurningOrca.Shops || {};

/*~struct~ShopGoodItem:
 * @param Item
 * @type item
 * @desc The item to be sold
 * @default 1
 * 
 * @param UseCustomPrice
 * @text Use custom price
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Use custom price for this shop good.
 * 
 * @param Price
 * @type number
 * @min 0
 * @desc The custom price of the shop good.
 * @default 0
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable to be read.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 5000
 * @desc Maximum number of items of this kind sold by the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~ShopGoodWeapon:
 * @param Weapon
 * @type weapon
 * @desc The weapon to be sold
 * @default 1
 * 
 * @param UseCustomPrice
 * @text Use custom price
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Use custom price for this shop good.
 * 
 * @param Price
 * @type number
 * @min 0
 * @desc The custom price of the shop good.
 * @default 0
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable to be read.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 99
 * @desc Maximum number of weapons of this kind sold by the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~ShopGoodArmor:
 * @param Armor
 * @type armor
 * @desc The armor to be sold
 * @default 1
 * 
 * @param UseCustomPrice
 * @text Use custom price
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Use custom price for this shop good.
 * 
 * @param Price
 * @type number
 * @min 0
 * @desc The custom price of the shop good.
 * @default 0
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable to be read.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 99
 * @desc Maximum number of armors of this kind sold by the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the items availability.
 */

/*~struct~ShopGoodSwitch:
 * @param Switch
 * @type switch
 * @desc The switch to be sold
 * @default 1
 * 
 * @param DisplayText
 * @text Display Text
 * @type text
 * @desc Here you can enter a different name to be displayed in shop for the switch. Keep blank to use the switches name.
 * 
 * @param Price
 * @type number
 * @min 0
 * @desc The custom price of the shop good.
 * @default 0
 * 
 * @param Different Currency Price
 * @type note
 * @desc If you have installed YEP_X_MoreCurrencies you can enter here the notetags for item or variable prices
 * @default ""
 * 
 * @param Toggable
 * @type boolean
 * @desc Determines whether this switch can be toggled on/off after being bought
 * @default true
 * 
 * @param OnColor
 * @type text
 * @default #FFFFFF
 * @desc The color in which the switch should be displayed in the shop if turned on once purchased.
 * 
 * @param OffColor
 * @type text
 * @default #FFFFFF
 * @desc The color in which the switch should be displayed in the shop if turned off once purchased.
 *
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the items availability.
 */

/*~struct~Discount:
 * @param Condition
 * @type note
 * @desc Condition that must be fulfilled for the discount to be granted
 * 
 * @param Percentage
 * @type number
 * @min 0
 * @max 100
 * @desc Discount percentage granted
 */

/*~struct~ItemSellingPrices:
 * @param item
 * @type item
 * @default 1
 * @desc The item which should get a custom selling price specifically for this shop.
 * 
 * @param price
 * @type number
 * @min 0
 * @desc The custom selling price for this item
 */

/*~struct~WeaponSellingPrices:
 * @param weapon
 * @type weapon
 * @default 1
 * @desc The weapon which should get a custom selling price specifically for this shop.
 * 
 * @param price
 * @type number
 * @min 0
 * @desc The custom selling price for this weapon
 */

/*~struct~ArmorSellingPrices:
 * @param armor
 * @type armor
 * @default 1
 * @desc The armor which should get a custom selling price specifically for this shop.
 * 
 * @param price
 * @type number
 * @min 0
 * @desc The custom selling price for this armor
 */

/*~struct~Shop:
 * @param Name
 * @type text
 * @desc The name of the shop.
 * 
 * @param ShopType
 * @text Shop Type
 * @type select
 * @option Sell and Buy
 * @value SellAndBuy
 * @option Buy Only
 * @value BuyOnly
 * @option Sell Only
 * @value SellOnly
 * @desc The kind of shop.
 * @default SellAndBuy
 * 
 * @param Items
 * @type struct<ShopGoodItem>[]
 * @desc Collection of items sold by this shop.
 * @default []
 * 
 * @param Weapons
 * @type struct<ShopGoodWeapon>[]
 * @desc Collection of weapons sold by this shop.
 * @default []
 * 
 * @param Armor
 * @type struct<ShopGoodArmor>[]
 * @desc Collection of armors sold by this shop.
 * @default []
 * 
 * @param Switches
 * @type struct<ShopGoodSwitch>[]
 * @desc Collection of switches sold by this shop.
 * @default []
 * 
 * @param itemSellingPrices
 * @text Item Selling Prices
 * @type struct<ItemSellingPrices>[]
 * @desc Collection of custom selling prices for items
 * @default []
 * 
 * @param weaponSellingPrices
 * @text Weapon Selling Prices
 * @type struct<WeaponSellingPrices>[]
 * @desc Collection of custom selling prices for weapons
 * @default []
 * 
 * @param armorSellingPrices
 * @text Armor Selling Prices
 * @type struct<ArmorSellingPrices>[]
 * @desc Collection of custom selling prices for armors
 * @default []
 * 
 * @param sellableItems
 * @text Sellable Items
 * @type item[]
 * @desc Items that can be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default [] 
 *
 * @param sellableWeapons
 * @text Sellable Weapons
 * @type weapon[]
 * @type Weapons that can be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default [] 
 * 
 * @param sellableArmors
 * @text Sellable Armors
 * @type armor[]
 * @type Armors that can be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default []
 * 
 * @param nonSellableItems
 * @text Non Sellable Items
 * @type item[]
 * @desc Items that cannot be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default [] 
 *
 * @param nonSellableWeapons
 * @text Non Sellable Weapons
 * @type weapon[]
 * @type Weapons that cannot be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default [] 
 * 
 * @param nonSellableArmors
 * @text Non Sellable Armors
 * @type armor[]
 * @type Armors that cannot be sold at the shop. Keep empty to allow all items/weapons and armors to be sold at the shop.
 * @default [] 
 * 
 * @param StockRefillOption
 * @text Stock refill option
 * @type select
 * @option Never
 * @value Never
 * @option After time
 * @value After time
 * @option Custom
 * @value Custom
 * @desc Option to determine when the shop refills it's stock.
 * @default Never
 * 
 * @param StockRefillSeconds
 * @text Stock refill seconds
 * @type number
 * @default 7200
 * @desc Amount of seconds after the shop refills it's stock. Use when option is 'After time'.
 * 
 * @param RefillStockCond
 * @text Stock refill condition
 * @type note
 * @desc Javascript code that determines when the stock should be refilled when option is 'Custom'.
 * @default false
 * 
 * @param Discounts
 * @type struct<Discount>[]
 * @desc Define the discounts that are offered by the shop here.
 * @default []
 */

//=============================================================================
/*:
 * @plugindesc v2.5 Various functionality around shops. Define custom shops
 * via the plugin parameters.
 * @author BurningOrca
 *
 * @param Shops
 * @type struct<Shop>[]
 * 
 * @param StockQuantityText
 * @text Stock Quantity Text
 * @type text
 * @desc The text to be shown on the shop buy number input window for the stock quantity
 * @default Available Items:
 * 
 * @param InfinityText
 * @text Infinity Text
 * @type text
 * @desc Text that should be disabled for infinite amount of available stock items
 * @default Infinite
 * 
 * @param SoldOutText
 * @text Sold out text
 * @type text
 * @desc Text to be displayed in the shops helpwindow, when it is completely sold out
 * @default Sold out
 * 
 * @param SwitchOnText
 * @text Switch on text
 * @type text
 * @default On
 * @desc The text to be displayed for a switch that is set to on
 * 
 * @param SwitchOffText
 * @text Switch off text
 * @type text
 * @default Off
 * @desc The text to be displayed for a switch that is set to off
 * 
 * @param DisplaySoldOutItems
 * @text Display sold out items in shop
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param GroupItemsWithLimitedStock
 * @text Group Items with limited stock
 * @type boolean
 * @on Yes
 * @off No
 * @desc If set to no, the items sold in the shop are independent items (Requires YEP_ItemCore).
 * @default true
 * 
 * @param UseYanflyEquipCommand
 * @text Use Equip Command in shop (requires YEP_ShopMenuCore)
 * @type boolean
 * @on Yes
 * @off No
 * @desc Set whether the equip command from YEP_ShopMenuCore plugin should be used by the custom shops
 *       from this plugin.
 * @default true
 * 
 * @param UseNPCDialogueShopEventCommand
 * @text Use Event Command in shop (requires NPCDialogueShop)
 * @type boolean
 * @on Yes
 * @off No
 * @desc Set whether the event command from NPCDialogueShop plugin should be used by the custom shops
 *       from this plugin.
 * @default true
 * 
 * @param StockQuantityDisplayType
 * @text Stock Quantity Display Type
 * @type select
 * @option Current Stock
 * @value Current Stock
 * @option Current Stock - Amount to be bought
 * @value Current Stock - Amount to be bought
 * @default Current Stock - Amount to be bought
 * @desc Determines what is shown as the stock quantity on the number window
 * 
 * @param DrawStockInBuyWindow
 * @text Draw Stock in buy window
 * @type boolean
 * @on Yes
 * @off No
 * @desc Set whether stock quantity should be displayed in the shop buy window.
 * @default false
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to define shops directly in the plugin parameters.
 * These changes various aspects around the shops.
 * 
 * A shop has the following attributes:
 * 
 *       - Name: Name of the shop used to access the shop with the plugin commands.
 *       - ShopType: Determines whether you can buy and sell items in the shop
 *       - Items: The items sold by the shop
 *       - Weapons: The weapons sold by the shop
 *       - Armor: The armors sold by the shop
 *       - Switches: Switches that can be sold at the shop and then be activated/deactivated from
 *                   the shop menu.
 *       - Item Selling Prices: Collection of custom selling prices only active at this particular
 *                              shop for certain items.
 *       - Weapon Selling Prices: Collection of custom selling prices only active at this particular
 *                                shop for certain weapons.
 *       - Armor Selling Prices: Collection of custom selling prices only active at this particular
 *                               shop for certain armors.
 *       - Sellable Items: Limit the shop to only accept these particular items in the sell menu.
 *                         If anything is added here any other items/weapons or armors cannot be sold
 *                         to the shop.
 *       - Sellable Weapons: Limit the shop to only accept these particular weapons in the sell menu.
 *                           If anything is added here any other items/weapons or armors cannot be sold
 *                           to the shop.
 *       - Sellable Armors: Limit the shop to only accept these particular armors in the sell menu.
 *                          If anything is added here any other items/weapons or armors cannot be sold
 *                          to the shop.
 *       - Non Sellable Items: Set restrictions so that the shop won't accept these particular items in the sell menu.
 *                             If anything is added here any other items/weapons or armors can still be sold
 *                             to the shop.
 *       - Non Sellable Weapons: Set restrictions so that the shop won't accept these particular weapons in the sell menu.
 *                               If anything is added here any other items/weapons or armors can still be sold
 *                               to the shop.
 *       - Non Sellable Armors: Set restrictions so that the shop won't accept these particular armors in the sell menu.
 *                              If anything is added here any other items/weapons or armors can still be sold
 *                              to the shop.
 *       - StockRefillOption: Determines how the shop refills it's stock if it has
 *         limited stock
 *       - StockRefillSeconds: The number of seconds in playtime after shop
 *         refills it's stock when StockRefillOption is 'After time'
 *       - RefillStockCond: The condition that must be met for the shop
 *         to refill it's stock when StockRefillOption is 'Custom'. This needs
 *         to be javascript code.
 *       - Discounts: The discounts the shop has to offer under certain conditions.
 *         
 *  Each item/weapon/armor has the following attributes:
 *       - Item/Armor/Weapon: The Id of the item in the database
 *       - UseCustomPrice: Determines whether the items uses the default price from
 *         the database or a custom entered price
 *       - Price: The custom price of the item/weapon/armor
 *       - StockQuantityType: Determines whether the stock quantity is an amount or
 *         a variable id.
 *       - StockQuantity: The amount of this item available on stock or id of a variable.
 *       - AvailabilityCond: Condition that must be fulfilled for item to be available
 *         in the shop. This needs to be javascript code.
 *         
 *  Switches have the following attributes and always a stock quantity of 1:
 *    -  Switch:                 The id of the switch to be bought.
 *    -  Display Text:           A text that should be displayed for the switch in the shop instead of the switches database name.
 *    -  Custom Price:           Same as for items/weapons/armor.
 *    -  Toggable:               Boolean value. If set to false, switch will always be on after having been bought. Otherwise it can
 *                               be toggled on/off at the shop.
 *    -  OnColor:                The color in which the switch should be displayed in the shop if turned on once purchased.
 *    -  OffColor:               The color in which the switch should be displayed in the shop if turned off once purchased.
 *    -  Availability condition: Same as for items/weapons/armor.
 *         
 *  The plugin has the following plugin commands:
 *    OpenShop <Name>: Will display the shop processing scene for the selected shop.
 *    RefillShopStock <Name>: Will refill the stock of the selected shop.
 *    CloseShop <Name>: Will remove the selected shop from your game.
 *    Refill<Kind>Stock "<Name>" Id Quantity: Refills the stock of a single shop good of
 *                                            the given kind, by the given quantity, but
 *                                            does not exceed the maximum. Does not work
 *                                            if independend items are not grouped together.
 *    
 *  - This plugin requires RMMV Version 1.5.0 or higher
 *  - This plugin is not compatible to Himeworks Shopmanager
 *  - You can define multiple of the same item/weapon/armor in one shop, but they
 *    are merged together when the shop is processed. The Stock Quantity will be
 *    the sum of the stock quantities or infiinte. In case of custom prices the
 *    most expensive will be chosen.
 *  - Any Stock that becomes available because the conditions, e.g. variables have
 *    changed will become available immediately and not just after the next
 *    stock refill.
 *    
 *  Each discount entry consists of the following attributes:
 *     - Condition: The condition that must be met for the discount to be offered.
 *     - Percentage: The percentage of the original price granted as discount.
 *       Discount percentages stack. They are multiplied with each other, e.g.
 *       If the conditions for granting 10% and another 20% are met, the user pays
 *       not 70%, but 72% of the original price, because the 20% are calculated on
 *       the already by 10% reduced price. The new price is rounded down.
 *      
 * ============================================================================
 * Further plugin parameters
 * ============================================================================
 * StockQuantityText: Text displayed the ShopNumber-Window of the available quantity description.
 * InfinityText: Text to be displayed, when available stock quantity is infinite.
 * SoldOutText: Text to be displayed, when available stock quantity for item is zero.
 * DisplaySoldOutItems: Determines if sold out items will be displayed in the shop buy window
 * the next time you visit the shop. If an items gets sold out while the shop window is still
 * active it will just be grayed out.
 * 
 * ============================================================================
 * Plugin position
 * ============================================================================
 * Please place this plugin under any other shop related plugins.
 *      
 * ============================================================================
 * History
 * ============================================================================
 *    v0.9: First version
 *    v1.0: Fixed a bug around limited stock
 *    v1.1: Fixed an compatibility issue with Yanflys ShopMenuCore
 *          Help windows displayes shop name instead of blank when no item description is
 *          shown.
 *    v1.2: Show names are now allowed to contain whitespace, but only the space-character ' ' (32).
 *          Two new plugin parameters: 
 *               - Sold Out Text
 *               - Display sold out items in shops.
 *    v1.3: Added Compatibility to mjshi NPCDialogueShop.
 *    v1.3: Shops now keep track of 
 *               - #Total Items sold, 
 *               - #Individual Items Sold, 
 *               - #Times visited
 *          Added discounts
 *    v1.4: Fixed very big bug, that plugin command parameters are not passed to other plugins.
 *    v1.5: Custom selling price added,
 *          Normal Shops are not opened endlessly anymore.
 *    v1.6: Issue with YEP_X_MoreCurrencies not displaying my 'sold out' text anymore.
 *    v1.7: The Notetag <Sell Price: x> from YEP_ShopMenuCore was ignored by this plugin
 *          when it defined a shop good's selling price.
 *    v1.8: A shop good with a buying price of 0 can now always be sold in case it has
 *          specified a custom selling price either via the plugin parameters of this
 *          plugin or via Yanfly Notetag <Sell Price: x> as long as the Yanfly Notetag
 *          <Cannot Sell> has not been specified on the item without the need to specify
 *          the <Cann Sell> notetag on this item.
 *    v1.9: If Buying Price is zero and any different buying currency is set in YEP_moreCurrencies
 *          then the ShopNumber Window would have not displayed anything in selling mode.
 *    v2.0: Added functionality for switch shops.
 *    v2.1: Removed calls to Yanfly.Util.toGroup, because function may not be available always.
 *          Added functionality to buy independent items if YEP_ItemCore is installed too.
 *    v2.1.1: Small fixes around empty shops and the default shop.
 *    v2.1.2: Updated help section, with correct plugin command names. Fixed bug around
 *            independend shop items after refill.
 *    v2.2.0  Added refill of single item, weapon, armor. Works only if independend items are
 *            grouped.
 *    v2.2.1  A lot of rework done in order to avoid copying parts of Yanfly code to solve
 *            the compatibility issues.
 *            Added an option to allow adding Yanfly's Equip Command to the shop even if
 *            NPCDialogueShop is installed.
 *    v2.2.2  Added small little option to configure what is shown as the stock quantity in
 *            the numbers window.
 *    v2.3    Moved custom selling prices out of the shop good definition and made them there
 *            own plugin parameters.
 *            New plugin parameter UseNPCDialogueShopEventCommand to prevent the event command
 *            from NPC dialogue shop to be added to the custom shop in case YEP_ShopMenuCore
 *            is installed as well.
 *    v2.4    Added the option to define sellable and non-sellable items/weapons/armors at each shop.
 *            Therefore Removed plugin parameter SellOnlyGoodsThatCanBeBought
 *    v2.4.1  Fixed a bug with YEP More Currency that only one additional currency is displayed
 *            when my plugin is used aswell.
 *    v2.5    Added parameter to display stock quantity next to price in buy window.
 *            
 * ============================================================================
 * Terms of use
 * ============================================================================
 *    - Free to use for non-commercial and commercial use.
 *    - You do not need to credit me.
 */
if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.5.0") 
{

BurningOrca.Shops.Parameters = PluginManager.parameters('BO_CustomShops');
BurningOrca.Shops.StockQuantityText = BurningOrca.Shops.Parameters['StockQuantityText'];
BurningOrca.Shops.InfinityText = BurningOrca.Shops.Parameters['InfinityText'];
BurningOrca.Shops.SoldOutText = BurningOrca.Shops.Parameters['SoldOutText'];
BurningOrca.Shops.SwitchOnText = BurningOrca.Shops.Parameters['SwitchOnText'];
BurningOrca.Shops.SwitchOffText = BurningOrca.Shops.Parameters['SwitchOffText'];
BurningOrca.Shops.DisplaySoldOutItems = BurningOrca.Shops.Parameters['DisplaySoldOutItems'];
BurningOrca.Shops.DisplaySoldOutItems = eval(BurningOrca.Shops.DisplaySoldOutItems);
BurningOrca.Shops.GroupItemsWithLimitedStock = BurningOrca.Shops.Parameters['GroupItemsWithLimitedStock'];
BurningOrca.Shops.UseYanflyEquipCommand = eval(BurningOrca.Shops.Parameters['UseYanflyEquipCommand']);
BurningOrca.Shops.UseNPCDialogueShopEventCommand = eval(BurningOrca.Shops.Parameters['UseNPCDialogueShopEventCommand']);
BurningOrca.Shops.GroupItemsWithLimitedStock = eval(BurningOrca.Shops.GroupItemsWithLimitedStock);
BurningOrca.Shops.StockQuantityDisplayType = BurningOrca.Shops.Parameters['StockQuantityDisplayType'];
BurningOrca.Shops.DrawStockInBuyWindow = BurningOrca.Shops.Parameters['DrawStockInBuyWindow'];
BurningOrca.Shops.DrawStockInBuyWindow = eval(BurningOrca.Shops.DrawStockInBuyWindow);

$dataShops = null;
$gameShops = null;

//////////////////////////////////////////////////////////////////////////////////
// DataManager
//////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    if( !BurningOrca.Shops.isDatabaseLoaded.call(this) ) return false;
    if( !$dataShops)
    {
        $dataShops = new Data_Shops();
    }
    return true;
}

BurningOrca.Shops.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() 
{
    BurningOrca.Shops.createGameObjects.call(this);
    $gameShops = new Game_Shops();
}

BurningOrca.Shops.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = BurningOrca.Shops.makeSaveContents.call(this);
    contents.gameShops = $gameShops;
    return contents;
};

BurningOrca.Shops.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    BurningOrca.Shops.extractSaveContents.call(this, contents);
    if( contents.gameShops )
    {
        $gameShops = contents.gameShops;
    }
    else
    {
        $gameShops = new Game_Shops();
    }
};

///////////////////////////////////////////////////////////////////////////////////
// Data_Shops
///////////////////////////////////////////////////////////////////////////////////
Data_Shops = function()
{
    this.initialize.apply(this, arguments);
}

Data_Shops.prototype = Object.create(Object.prototype);
Data_Shops.prototype.constructor = Data_Shops;

Data_Shops.prototype.initialize = function()
{
    var shops = BurningOrca.Shops.Parameters["Shops"];
    if( shops !== "" )
    {
        shops = JSON.parse(shops);

        for( var i = 0; i < shops.length; i++ )
        {
            var paramShop = JSON.parse(shops[i]);
            this[paramShop.Name] = new Data_Shop(paramShop);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_Shop
///////////////////////////////////////////////////////////////////////////////////
Data_Shop = function()
{
    this.initialize.apply(this, arguments);
}

Data_Shop.prototype = Object.create(Object.prototype);
Data_Shop.prototype.constructor = Data_Shop;

Data_Shop.prototype.initialize = function(paramShop)
{
    this.Name = paramShop.Name;
    this.ShopType = paramShop.ShopType;
    this.StockRefillOption = paramShop.StockRefillOption;
    this.StockRefillSeconds = Number(paramShop.StockRefillSeconds);
    this.RefillStockCond = JSON.parse(paramShop.RefillStockCond);
    this.itemSellingPrices = JSON.parse(paramShop.itemSellingPrices);
    this.weaponSellingPrices = JSON.parse(paramShop.armorSellingPrices);
    this.armorSellingPrices = JSON.parse(paramShop.armorSellingPrices);

    this.sellableItems = JSON.parse(paramShop.sellableItems);
    this.sellableWeapons = JSON.parse(paramShop.sellableWeapons);
    this.sellableArmors = JSON.parse(paramShop.sellableArmors);
    this.nonSellableItems = JSON.parse(paramShop.nonSellableItems);
    this.nonSellableWeapons = JSON.parse(paramShop.nonSellableWeapons);
    this.nonSellableArmors = JSON.parse(paramShop.nonSellableArmors);

    this._allGoods = [];

    if( paramShop.Items !== "" )
    {
        var goods = JSON.parse(paramShop.Items);
        for( var i = 0; i < goods.length; i++ )
        {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Item'));
        }
    }
    if( paramShop.Weapons !== "" )
    {
        var goods = JSON.parse(paramShop.Weapons);
        for( var i = 0; i < goods.length; i++ )
        {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Weapon'));
        }
    }
    if( paramShop.Armor !== "" )
    {
        var goods = JSON.parse(paramShop.Armor);
        for( var i = 0; i < goods.length; i++ )
        {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Armor'));
        }
    }

    if( paramShop.Switches !== "" 
     && paramShop.Switches !== undefined )
    {
        var goods = JSON.parse(paramShop.Switches);
        for( var i = 0; i < goods.length; i++ )
        {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Switch'));
        }
    }
    
    for( let i = 0; i < this.itemSellingPrices.length; i++ )
    {
        this.itemSellingPrices[i] = JSON.parse(this.itemSellingPrices[i]);
        this.itemSellingPrices[i].item = Number(this.itemSellingPrices[i].item);
        this.itemSellingPrices[i].price = Number(this.itemSellingPrices[i].price);
    }
    
    for( let i = 0; i < this.weaponSellingPrices.length; i++ )
    {
        this.weaponSellingPrices[i] = JSON.parse(this.weaponSellingPrices[i]);
        this.weaponSellingPrices[i].weapon = Number(this.weaponSellingPrices[i].weapon);
        this.weaponSellingPrices[i].price = Number(this.weaponSellingPrices[i].price);
    }
    
    for( let i = 0; i < this.armorSellingPrices.length; i++ )
    {
        this.armorSellingPrices[i] = JSON.parse(this.armorSellingPrices[i]);
        this.armorSellingPrices[i].armor = Number(this.armorSellingPrices[i].armor);
        this.armorSellingPrices[i].price = Number(this.armorSellingPrices[i].price);
    }

    for( let i = 0; i < this.sellableItems.length; i++ )
    {
        this.sellableItems[i] = Number(this.sellableItems[i]);
    }
    for( let i = 0; i < this.sellableWeapons.length; i++ )
    {
        this.sellableWeapons[i] = Number(this.sellableWeapons[i]);
    }
    for( let i = 0; i < this.sellableArmors.length; i++ )
    {
        this.sellableArmors[i] = Number(this.sellableArmors[i]);
    }

    for( let i = 0; i < this.nonSellableItems.length; i++ )
    {
        this.nonSellableItems[i] = Number(this.nonSellableItems[i]);
    }
    for( let i = 0; i < this.nonSellableWeapons.length; i++ )
    {
        this.nonSellableWeapons[i] = Number(this.nonSellableWeapons[i]);
    }
    for( let i = 0; i < this.nonSellableArmors.length; i++ )
    {
        this.nonSellableArmors[i] = Number(this.nonSellableArmors[i]);
    }

    this._discounts = [];
    if( paramShop.Discounts !== "" )
    {
        var discounts = JSON.parse(paramShop.Discounts);
        for( var i = 0; i < discounts.length; i++ )
        {
            var discount = JSON.parse(discounts[i]);
            this._discounts.push(new Data_ShopDiscount(discount));
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_ShopGood
///////////////////////////////////////////////////////////////////////////////////
Data_ShopGood = function()
{
    this.initialize.apply(this, arguments);
}

Data_ShopGood.prototype = Object.create(Object.prototype);
Data_ShopGood.prototype.constructor = Data_ShopGood;

Data_ShopGood.prototype.initialize = function(paramShopGood, kind)
{
    this.kind = kind;

    switch( kind )
    {
        case "Item":
            this.id = Number(paramShopGood.Item);
            this.name = $dataItems[this.id].name;
            break;
        case "Weapon":
            this.id = Number(paramShopGood.Weapon);
            this.name = $dataWeapons[this.id].name;
            break;
        case "Armor":
            this.id = Number(paramShopGood.Armor);
            this.name = $dataArmors[this.id].name;
            break;
        case "Switch":
            this.id = Number(paramShopGood.Switch);
            if( paramShopGood.DisplayText === "" )
            {
                this.name = $dataSystem.switches[this.id];
            }
            else
            {
                this.name = paramShopGood.DisplayText;
            }
            break;
        default:
            throw new Error("Kind of shop good defined in the plugin parameters unknown!");
    }

    if( this.kind === 'Switch' )
    {
        this.price = Number(paramShopGood.Price);
        this.AvailabilityCond = JSON.parse(paramShopGood.AvailabilityCond);
        this.OnColor = paramShopGood.OnColor;
        this.OffColor = paramShopGood.OffColor;
        this.StockQuantity = 1;
        this.UseCustomPrice = true;
        this.StockQuantityType = "Amount";
        this.isToggable = eval(paramShopGood.Toggable);
        
        if( Imported.YEP_X_MoreCurrencies )
        {
            this.note = JSON.parse(paramShopGood["Different Currency Price"]);

            var dummyGroup = [];
            dummyGroup.push(null);
            dummyGroup.push(this);

            DataManager.processMCNotetags1(dummyGroup, 0);

            // Switches don't have proxies and can never be sold.
            delete this.proxyBuy;
            delete this.variableSellPrices;
            delete this.variableSellPrice;
            delete this.itemSellPrice;
            delete this.itemSellPrices;
            delete this.weaponSellPrice;
            delete this.weaponSellPrices;
            delete this.armorSellPrice;
            delete this.armorSellPrices;
            delete this.note;
        }
    }
    else
    {
        this.UseCustomPrice = eval(paramShopGood.UseCustomPrice);
        this.price = Number(paramShopGood.Price);
        this.StockQuantityType = paramShopGood.StockQuantityType;
        this.StockQuantity = Number(paramShopGood.StockQuantity);
        this.AvailabilityCond = JSON.parse(paramShopGood.AvailabilityCond);
    }
}

Data_ShopGood.prototype.isIndependentAndHasLimitedStock = function()
{
   if( !Imported.YEP_ItemCore ) return false;
   if( this.StockQuantity <= 0 ) return false;

   var dataObj = null;

   switch( this.kind )
   {
       case 'Item':
           dataObj = $dataItems[this.id];
           break;
       case 'Weapon':
           dataObj = $dataWeapons[this.id];
           break;
       case 'Armor':
           dataObj = $dataArmors[this.id].id;
           break;
       default:
           return false;
   }

   if( dataObj.proxyBuy ) return false;
   return DataManager.isIndependent(dataObj);
}

///////////////////////////////////////////////////////////////////////////////////
// Data_ShopDiscount
///////////////////////////////////////////////////////////////////////////////////
Data_ShopDiscount = function()
{
    this.initialize.apply(this, arguments);
}

Data_ShopDiscount.prototype = Object.create(Object.prototype);
Data_ShopDiscount.prototype.constructor = Data_ShopDiscount;

Data_ShopDiscount.prototype.initialize = function(discount)
{
    this._condition = JSON.parse(discount.Condition);
    this._percentage = discount.Percentage;
}

/////////////////////////////////////////////////////////////////////////////////////////
// Game_Shops
/////////////////////////////////////////////////////////////////////////////////////////
function Game_Shops()
{
    this.initialize.apply(this, arguments);
}

Game_Shops.prototype = Object.create(Object.prototype);
Game_Shops.prototype.constructor = Game_Shops;

Game_Shops.prototype.initialize = function()
{
}

Game_Shops.prototype.getShop = function(shopName)
{
    if( this[shopName] )
        return this[shopName];

    return this.openNewShop(shopName);
}

Game_Shops.prototype.deleteShop = function(shopName)
{
    delete this[shopName];
}

Game_Shops.prototype.openNewShop = function(shopName)
{
    this[shopName] = new Game_Shop($dataShops[shopName]);
    return this[shopName];
}

/////////////////////////////////////////////////////////////////////////////////////////
// Game_Shop
/////////////////////////////////////////////////////////////////////////////////////////
function Game_Shop()
{
    this.initialize.apply(this, arguments);
}

Game_Shop.prototype = Object.create(Object.prototype);
Game_Shop.prototype.constructor = Game_Shop;

Game_Shop.prototype.initialize = function(dataShop)
{
    this.Name = dataShop.Name;
    this.ShopType = dataShop.ShopType;
    this.StockRefillOption = dataShop.StockRefillOption;
    this.StockRefillSeconds = dataShop.StockRefillSeconds;
    this.RefillStockCond = dataShop.RefillStockCond;
    this._discounts = dataShop._discounts;
    this._totalItemsBought = 0;
    this._itemsBought = {};
    this._weaponsBought = {};
    this._armorBought = {};
    this._switchBought = {};
    this._nrOfVisits = 0;
    this._customItemSellingPrices = dataShop.itemSellingPrices;
    this._customWeaponSellingPrices = dataShop.weaponSellingPrices;
    this._customArmorSellingPrices = dataShop.armorSellingPrices;
    this.sellableItems = dataShop.sellableItems;
    this.sellableWeapons = dataShop.sellableWeapons;
    this.sellableArmors = dataShop.sellableArmors;
    this.nonSellableItems = dataShop.nonSellableItems;
    this.nonSellableWeapons = dataShop.nonSellableWeapons;
    this.nonSellableArmors = dataShop.nonSellableArmors;

    this._allGoods = [];
    this._goods = [];
    this.refillStock();
}

Game_Shop.prototype.refillStock = function()
{
    this.lastStockRefillTime = $gameSystem.playtime();

    if( !BurningOrca.Shops.GroupItemsWithLimitedStock )
    {
        for( var i = 0; i < this._allGoods.length; i++ )
        {
            this.removeIfIndendentItem(this._allGoods[i]);
        }
    }

    this._allGoods = [];
    for( var i = 0; i < $dataShops[this.Name]._allGoods.length; i++ )
    {
        if( !BurningOrca.Shops.GroupItemsWithLimitedStock
         && Imported.YEP_ItemCore
         && $dataShops[this.Name]._allGoods[i].isIndependentAndHasLimitedStock() )
        {
            for( var q = 0; q < $dataShops[this.Name]._allGoods[i].StockQuantity; q++ )
            {
                this._allGoods.push(new Game_ShopGood($dataShops[this.Name]._allGoods[i]));
            }
        }
        else
        {
            this._allGoods.push(new Game_ShopGood($dataShops[this.Name]._allGoods[i]));

            if( this._allGoods[i].isSwitch && this.getNumberBoughtOf(3, this._allGoods[i].id) )
                this._allGoods[i].StockQuantity = 0;
        }
    }
}

Game_Shop.prototype.refillGood = function(kind, id, quantity)
{
    for( var i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i].kind.toLowerCase() == kind.toLowerCase()
         && this._allGoods[i].id == id )
        {
            var maxStockQuantity;

            if( $dataShops[this.Name]._allGoods[i].StockQuantityType === "Amount" )
            {
                maxStockQuantity = $dataShops[this.Name]._allGoods[i].StockQuantity;
                if( maxStockQuantity === 0 )
                    maxStockQuantity = -1; // For endless stock
            }
            else
            {
                maxStockQuantity = $gameVariables.value($dataShops[this.Name]._allGoods[i].StockQuantity);
                if( maxStockQuantity < 0 )
                    maxStockQuantity = -1; // For endless stock
            }

            if( maxStockQuantity >= 0 )
            {
                this._allGoods[i].StockQuantity += quantity;
                this._allGoods[i].StockQuantity = this._allGoods[i].StockQuantity.clamp(0, maxStockQuantity);
            }
        }
    }
}

Game_Shop.prototype.setActualGoods = function()
{
    this._goods = [];
    for( var i = 0; i < this._allGoods.length; i++ )
    {
        var shopGood = this._allGoods[i];

        if( eval(shopGood.AvailabilityCond)
         && (BurningOrca.Shops.DisplaySoldOutItems || Math.abs(shopGood.StockQuantity) > 0 || shopGood.kind === "Switch") )
        {
            for( var g = 0; g < this._goods.length; g++ )
            {
                if( this._goods[g][0] === shopGood.getShopGoodKind()
                 && this._goods[g][1] === shopGood.id )
                    break;
            }
            if( g === this._goods.length )
            {
                this._goods.push([shopGood.getShopGoodKind(), shopGood.id, shopGood.UseCustomPrice ? 1 : 0, shopGood.price, shopGood.StockQuantity, shopGood]);
            }
            else
            {
                this._goods[g][2]  = this._goods[g][2] || shopGood.UseCustomPrice;
                this._goods[g][3]  = Math.max(this._goods[g][3], shopGood.price);
                if( this._goods[g][4] >= 0 )
                {
                    if( shopGood.StockQuantity >= 0 )
                    {
                        this._goods[g][4] += shopGood.StockQuantity;
                    }
                    else
                    {
                        this._goods[g][4] = shopGood.StockQuantity;
                    }
                }
            }
        }
    }

    for( var g = 0; g < this._goods.length; g++ )
    {
        var kind = this._goods[g][0];
        var id = this._goods[g][1];
        var discountFact = 1.0;
        for( var d = 0; d < this._discounts.length; d++ )
        {
            if( eval(this._discounts[d]._condition) )
            {
                discountFact *= (1.0 - this._discounts[d]._percentage / 100.0);
            }
        }
        if( discountFact != 1.0 )
        {
            var customPrice = this._goods[g][2];
            var price = 0;

            if( customPrice == 1 )
            {
                price = this._goods[g][3];
            }
            else
            {
                if( kind == 0 ) price = $dataItems[id].price;
                else if( kind == 1 ) price = $dataWeapons[id].price;
                else if( kind == 2 ) price = $dataArmors[id].price;
                else if( kind == 3 ) price = 0;
                else price = NaN;
            }
            this._goods[g][2] = 1;
            this._goods[g][3] = Math.floor(price * discountFact);
        }
     }
}

Game_Shop.prototype.OpenShop = function()
{
    if( this.StockRefillOption == "After time" && $gameSystem.playtime() - this.lastStockRefillTime >= this.StockRefillSeconds )
        this.refillStock();
    if( this.StockRefillOption == "Custom" && eval(this.RefillStockCond) )
        this.refillStock();
    this._nrOfVisits++;
    this.setActualGoods();
}

Game_Shop.prototype.removeIfIndendentItem = function(shopGood)
{
    if( !Imported.YEP_ItemCore ) return;

    var dataObj = this.getDataObject(shopGood);

    if( dataObj 
     && DataManager.isIndependent(dataObj)
     && !$gameParty.hasItem(dataObj, true) )
    {
        DataManager.removeIndependentItem(dataObj);
    }
}

Game_Shop.prototype.getDataObject = function(shopGood)
{
    var dataObj = null;

    switch( shopGood.getShopGoodKind() )
    {
        case 0:
            dataObj = $dataItems[shopGood.id];
            break;
        case 1:
            dataObj = $dataWeapons[shopGood.id];
            break;
        case 2:
            dataObj = $dataArmors[shopGood.id];
            break;
    }

    return dataObj;
}

Game_Shop.prototype.getStockQuantity = function(item)
{
    if( !item ) return -1;

    var kind = 0;
    if( DataManager.isWeapon(item) ) kind = 1;
    else if( DataManager.isArmor(item) ) kind = 2;
    else if( item.isSwitch ) kind = 3;

    for( var i = 0; i < this._goods.length; i++ )
    {
        if( this._goods[i][0] === kind
         && this._goods[i][1] === item.id )
            return this._goods[i][4];
    }
    return -1; // Endless stock
}

Game_Shop.prototype.getBuyWindowStockQuantityText = function(item)
{
    let qty = this.getStockQuantity(item);
    
    if( qty === -1 )
        return BurningOrca.Shops.InfinityText;
    if( qty === 0 )
        return BurningOrca.Shops.SoldOutText;

    return qty.toString();
}

Game_Shop.prototype.getSellingPrice = function(item)
{
    if( !item ) return -1;

    var kind = 0;
    if( DataManager.isWeapon(item) ) kind = 1;
    else if( DataManager.isArmor(item) ) kind = 2;
    else if( item.isSwitch ) return 0;

    const array = (kind === 0 ? this._customItemSellingPrices : kind === 2 ? this._customWeaponSellingPrices : this._customArmorSellingPrices);

    if( array )
    {
        for( var i = 0; i < array.length; i++ )
        {
            if( kind === 0 && array[i].item === item.id )
                return array[i].price;
            if( kind === 1 && array[i].weapon === item.id )
                return array[i].price;
            if( kind === 2 && array[i].armor === item.id )
                return array[i].price;
        }
    }

    if( item.sellPrice ) return item.sellPrice;
    return Math.floor(item.price / 2);
 }

Game_Shop.prototype.getNumberBoughtOf = function(kind, id)
{
    if( kind === 0 ) return this._itemsBought[id];
    else if( kind === 1 ) return this._weaponsBought[id];
    else if( kind === 2 ) return this._armorBought[id];
    else if( kind === 3 ) return this._switchBought[id];
    else return null;
}

Game_Shop.prototype.loseStock = function(item, number)
{
    if( !item ) return;

    var kind = 0;
    if( DataManager.isWeapon(item) ) kind = 1;
    else if( DataManager.isArmor(item) ) kind = 2;
    else if( item.isSwitch ) kind = 3;

    this._totalItemsBought += number;

    if( kind == 0 ) 
    {
        this._itemsBought[item.id] = (this._itemsBought[item.id] || 0) + number;
    }
    else if( kind == 1 ) 
    {
        this._weaponsBought[item.id] = (this._weaponsBought[item.id] || 0) + number;
    }
    else if( kind == 2 )
    {
        this._armorBought[item.id] = (this._armorBought[item.id] || 0) + number;
    }
    else
    {
        this._switchBought[item.id] = 1;
        $gameSwitches.setValue(item.id, true);
    }

    for( var i = 0; i < this._goods.length; i++ )
    {
        if( this._goods[i][0] === kind
         && this._goods[i][1] === item.id )
        {
            if( this._goods[i][4] > 0 )
            {
                this._goods[i][4] -= number;
            }
            break;
        }
    }

    for( var i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i].getShopGoodKind() === kind
         && this._allGoods[i].id === item.id )
        {
            if( this._allGoods[i].StockQuantity > 0 )
            {
                if( number >= this._allGoods[i].StockQuantity )
                {
                    number -= this._allGoods[i].StockQuantity;
                    this._allGoods[i].StockQuantity = 0;
                }
                else
                {
                    this._allGoods[i].StockQuantity -= number;
                    break;
                }
            }
            if( number === 0 )
                break;
        }
    }
}

Game_Shop.prototype.offers = function(item)
{
    if( !item ) return true;

    var kind = 0;
    if( DataManager.isWeapon(item) ) kind = 1;
    else if( DataManager.isArmor(item) ) kind = 2;
    else if( item.isSwitch ) kind = 3;

    for( var i = 0; i < this._goods.length; i++ )
    {
        if( this._goods[i][0] === kind
         && this._goods[i][1] === item.id )
           return true;

        if( Imported.YEP_ItemCore
         && this._goods[i][0] === kind
         && this._goods[i][1] === item.baseItemId )
            return true;
    }
    return false;
}

Game_Shop.prototype.accepts = function(item)
{
    if( !item ) return true;

    let sellableCount = this.sellableItems.length + this.sellableWeapons.length + this.sellableArmors.length;
    let unsellableCount = this.nonSellableItems.length + this.nonSellableWeapons.length + this.nonSellableArmors.length;

    if( sellableCount + unsellableCount == 0 ) return true;
    
    if( DataManager.isItem(item) )
    {
        for(let sellItem of this.sellableItems )
            if( sellItem === item.id )
                return true;

        for(let sellItem of this.nonSellableItems )
            if( sellItem === item.id )
                return false;
    }
    else if( DataManager.isWeapon(item) )
    {
        for(let sellItem of this.sellableWeapons )
            if( sellItem === item.id )
                return true;

        for(let sellItem of this.nonSellableWeapons )
            if( sellItem === item.id )
                return false;
    }
    else if( DataManager.isItem(item) )
    {
        for(let sellItem of this.sellableArmors )
            if( sellItem === item.id )
                return true;

        for(let sellItem of this.nonSellableArmors )
            if( sellItem === item.id )
                return false;
    }

    if( sellableCount !== 0 )
        return false;
    if( unsellableCount !== 0 )
        return true;

    return false;
}

Game_Shop.prototype.GetHelpDisplayString = function()
{
    var helpDisplayString = this.Name;
    var totalAvailQty = 0;
    for( var i = 0; i < this._goods.length; i++ )
    {
        if( this._goods[i][5].isSwitch )
        {
            totalAvailQty += 1;
        }
        else
        {
            totalAvailQty += this._goods[i][4];
        }
    }
    if( totalAvailQty === 0 )
    {
        helpDisplayString =  helpDisplayString + " (" + BurningOrca.Shops.SoldOutText + ")";
    }
    return helpDisplayString;
}

///////////////////////////////////////////////////////////////////////////////////
// Game_ShopGood
///////////////////////////////////////////////////////////////////////////////////
function Game_ShopGood()
{
    this.initialize.apply(this, arguments);
}

Game_ShopGood.prototype = Object.create(Object.prototype);
Game_ShopGood.prototype.constructor = Game_ShopGood;

Game_ShopGood.prototype.initialize = function(dataShopGood)
{
    this.kind = dataShopGood.kind;
    this.id = dataShopGood.id;
    this.name = dataShopGood.name;
    this.UseCustomPrice = dataShopGood.UseCustomPrice;
    this.price = dataShopGood.price;
    
    if( dataShopGood.StockQuantityType === "Amount" )
    {
        this.StockQuantity = dataShopGood.StockQuantity;
        if( this.StockQuantity === 0 )
            this.StockQuantity = -1; // For endless stock
    }
    else
    {
        this.StockQuantity = $gameVariables.value(dataShopGood.StockQuantity);
        if( this.StockQuantity < 0 )
            this.StockQuantity = -1; // For endless stock
    }

    this.AvailabilityCond = dataShopGood.AvailabilityCond;

    if( this.kind === "Switch" )
    {
        this.OnColor = dataShopGood.OnColor;
        this.OffColor = dataShopGood.OffColor;
        this.isSwitch = true;
        this.isToggable =  dataShopGood.isToggable;

        if( Imported.YEP_X_MoreCurrencies )
        {
             this.variableBuyPrice      = dataShopGood.variableBuyPrice;
             this.variableBuyPrices     = dataShopGood.variableBuyPrices;
             this.itemBuyPrice          = dataShopGood.itemBuyPrice;
             this.itemBuyPrices         = dataShopGood.itemBuyPrices;
             this.weaponBuyPrice        = dataShopGood.weaponBuyPrice;
             this.weaponBuyPrices       = dataShopGood.weaponBuyPrices;
             this.armorBuyPrice         = dataShopGood.armorBuyPrice;
             this.armorBuyPrices        = dataShopGood.armorBuyPrices;
        }
        this.meta = {};
        this.description = "";
    }

    if( !BurningOrca.Shops.GroupItemsWithLimitedStock
     && dataShopGood.isIndependentAndHasLimitedStock() )
    {
        this.makeIndepent();
    }
}

Game_ShopGood.prototype.getShopGoodKind = function()
{
    if( this.kind === "Item" ) return 0;
    if( this.kind === "Weapon" ) return 1;
    if( this.kind === "Armor" ) return 2;
    if( this.kind === "Switch" ) return 3;
    return null;
}

Game_ShopGood.prototype.makeIndepent = function() 
{
    var baseItem = null;

    if( this.kind === 'Item' )
    {
        baseItem = $dataItems[this.id];
    }
    else if( this.kind === 'Weapon' )
    {
        baseItem = $dataWeapons[this.id];
    }
    else
    {
        baseItem = $dataArmors[this.id];
    }

    var newItem = DataManager.registerNewItem(baseItem);

    this.id = newItem.id;
    this.StockQuantity = 1;
    
    var boost = 0.0;

    if (DataManager.isItem(baseItem)) 
    {
        for( var i = 0; i < newItem.effects.length; i++ )
        {
            var effect = newItem.effects[i];

            if( [Game_Action.EFFECT_RECOVER_HP, Game_Action.EFFECT_RECOVER_MP].contains(effect.code)
             && baseItem.effects.length >= i
             && baseItem.effects[i].code === effect.code )
            {
                var origEffect = baseItem.effects[i];
                if( origEffect.value1 !== 0 && effect.value1 > 0 )
                {
                    boost += (effect.value1 - origEffect.value1) / origEffect.value1;
                }
                if( origEffect.value2 !== 0 && effect.value2 > 0 )
                {
                    boost += (effect.value2 - origEffect.value2) / origEffect.value2;
                }
            }
        }
    }
    else
    {
        for (var i = 0; i < 8; ++i) 
        {
            if( baseItem.params[i] !== 0 )
            {
                boost += (newItem.params[i] - baseItem.params[i]) / baseItem.params[i];
            }
        }
    }

    if( boost !== 0 )
    {
        newItem.price += (newItem.price * boost);
        newItem.price = Math.round(Math.max(newItem.price, 0));

        if( this.UseCustomPrice )
        {
            this.price += (this.price * boost);
            this.price = Math.round(Math.max(this.price, 0));
        }

        if( newItem.sellPrice !== undefined )
        {
            newItem.sellPrice += (newItem.sellPrice * boost);
            newItem.sellPrice = Math.round(Math.max(newItem.sellPrice, 0));
        }

        if( Imported.YEP_X_MoreCurrencies )
        {
            BurningOrca.Shops.AlterPrices(newItem.variableBuyPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.itemBuyPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.armorBuyPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.weaponBuyPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.variableSellPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.armorSellPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.weaponSellPrice, boost);
            BurningOrca.Shops.AlterPrices(newItem.itemSellPrice, boost);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Game_Temp
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function()
{
    BurningOrca.Shops.Game_Temp_initialize.call(this);
    this._activeShop = null;
}

Game_Temp.prototype.setActiveShop = function(shop)
{
    this._activeShop = shop;
}

Game_Temp.prototype.getActiveShop = function(shop)
{
    return this._activeShop;
}

///////////////////////////////////////////////////////////////////////////////////
// Game_Interpreter
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.processShopCommand = Game_Interpreter.prototype.command302;
Game_Interpreter.prototype.command302 = function() 
{
    $gameTemp.setActiveShop(null);
    return BurningOrca.Shops.processShopCommand.call(this);
}

BurningOrca.Shops.pluginCommand =  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) 
{
    BurningOrca.Shops.pluginCommand.call(this, command, args);
    var shopName = "";
    if( command === "OpenShop" || command === "RefillShopStock" || command === "CloseShop" )
    {
        if( args.length > 1 ) shopName = args.join(' ');
        else shopName = args;
    }
    if( command === "OpenShop" )
    {
        var shop = $gameShops.getShop(shopName);
        if( shop ) $gameTemp.setActiveShop(shop);
        shop.OpenShop();
        SceneManager.push(Scene_Shop);
        SceneManager.prepareNextScene(shop._goods, shop.ShopType === "BuyOnly");
    }
    if( command === "RefillShopStock" )
    {
        var shop = $gameShops.getShop(shopName);
        shop.refillStock();
    }
    if( command === "CloseShop" )
    {
        var shop = $gameShops.deleteShop(shopName);
    }
    if( BurningOrca.Shops.GroupItemsWithLimitedStock )
    {
        if( args.length > 1
         && command === "RefillItemStock" || command === "RefillArmorStock" || command === "RefillWeaponStock" )
        {
            var kind = "";
            var id = -1;
            var quantity = -1;

            command = command + ' ' + args.join(' ');

            if( command.match(/Refill(.*?)Stock[ ]\"(.*?)\"[ ](\d+)[ ](\d+)/gi) )
            {
                kind = RegExp.$1;
                shopName = RegExp.$2;
                id = Number(RegExp.$3);
                quantity = Number(RegExp.$4);
            }

            var shop = $gameShops.getShop(shopName);
            shop.refillGood(kind, id, quantity);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Scene_Shop
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.popShopScene = Scene_Shop.prototype.popScene;
Scene_Shop.prototype.popScene = function()
{
    $gameTemp.setActiveShop(null);
    BurningOrca.Shops.popShopScene.call(this);
}

BurningOrca.Shops.Scene_Shop_createHelpWindow = Scene_Shop.prototype.createHelpWindow;
Scene_Shop.prototype.createHelpWindow = function()
{
    BurningOrca.Shops.Scene_Shop_createHelpWindow.call(this);
    if( $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
}

BurningOrca.Shops.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() 
{
    if( this._item.isSwitch )
    {
        return 1;
    }

    var maxBuy = BurningOrca.Shops.Scene_Shop_maxBuy.call(this);
    if( $gameTemp.getActiveShop() !== null )
    {
        var stock = $gameTemp.getActiveShop().getStockQuantity(this._item);
        if( stock < 0 )
            return maxBuy;
        else
            return Math.min(maxBuy, stock);
    }
    return maxBuy;
}

BurningOrca.Shops.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    if ($gameSystem.allowShopPurchase) $gameSystem.allowShopPurchase(true);
    BurningOrca.Shops.Scene_Shop_doBuy.call(this, number);
    if ($gameTemp.getActiveShop()) {
        $gameTemp.getActiveShop().loseStock(this._item, number);
    }
    if ($gameSystem.allowShopPurchase) $gameSystem.allowShopPurchase(false);
}

BurningOrca.Shops.Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    if( this._item.isSwitch )
    {
        if( $gameTemp.getActiveShop().getNumberBoughtOf(3, this._item.id) === 1 )
        {
            $gameSwitches.setValue(this._item.id, !$gameSwitches.value(this._item.id));
            this._buyWindow.refresh();
            this._buyWindow.activate();
            this._goldWindow.refresh();
            this._statusWindow.refresh();
        }
        else
        {
            BurningOrca.Shops.Scene_Shop_onBuyOk.call(this);
        }
    }
    else
    {
        BurningOrca.Shops.Scene_Shop_onBuyOk.call(this);
    }
}

BurningOrca.Shops.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() {
    BurningOrca.Shops.Scene_Shop_onBuyCancel.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
};

BurningOrca.Shops.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
    BurningOrca.Shops.Scene_Shop_onSellCancel.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
};

BurningOrca.Shops.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() 
{
    if( $gameTemp.getActiveShop() )
    {
        return $gameTemp.getActiveShop().getSellingPrice(this._item);
    }
    else
    {
        return BurningOrca.Shops.Scene_Shop_sellingPrice.call(this);
    }
}

BurningOrca.Shops.createShopsCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function()
{
    BurningOrca.Shops.createShopsCommandWindow.call(this);
    if( Imported.YEP_ShopMenuCore && Imported.NPCDialogueShop )
    {
        Scene_Shop.prototype.setCommandWindowHandlers.call(this);
    }
}

if( Imported.YEP_ShopMenuCore 
 && Imported.NPCDialogueShop )
{
    BurningOrca.Shops.createShopScene = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() 
    {
        this.failSafeGoods();
        BurningOrca.Shops.createShopScene.call(this);
        this.createActorWindow();
        this._sellWindow.setStatusWindow(this._statusWindow);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopCommand
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
Window_ShopCommand.prototype.makeCommandList = function() 
{
    var activeShop = $gameTemp.getActiveShop();
    if( !activeShop )
    {
        BurningOrca.Shops.Window_ShopCommand_makeCommandList.call(this);
    }
    else if( Imported.YEP_ShopMenuCore
          && !Imported.NPCDialogueShop )
    {
        BurningOrca.Shops.Window_ShopCommand_makeCommandList.call(this);
    }
    else // Special treatment if both YEP_ShopMenuCore & NPCDialogueShop are installed as they are usually overwrite each others functionality.
    {
        if( activeShop.ShopType !== "SellOnly" )
        {
            this.addCommand(TextManager.buy, 'buy');
        }
        if( activeShop.ShopType !== "BuyOnly" )
        {
            this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
        }
        if( Imported.YEP_ShopMenuCore
         && BurningOrca.Shops.UseYanflyEquipCommand )
        {
            this.createCommand('Equip');
        }
        this.addCustomCommands();
        this.addCommand(TextManager.cancel, 'cancel');
    }
};

BurningOrca.Shops.Window_ShopCommand_addCustomCommands = Window_ShopCommand.prototype.addCustomCommands;
Window_ShopCommand.prototype.addCustomCommands = function() 
{
    if( BurningOrca.Shops.Window_ShopCommand_addCustomCommands !== undefined ) 
        BurningOrca.Shops.Window_ShopCommand_addCustomCommands.call(this);
    
    if( Imported.NPCDialogueShop
     && BurningOrca.Shops.UseNPCDialogueShopEventCommand )
    {
        var params = PluginManager.parameters('NPCDialogueShop');
        var commonEventName = params['Common Event Name'];
        this.addCommand(commonEventName, 'event');
    }
}

if( Imported.NPCDialogueShop ) // NPCDialogueShop limits maxItems to exactly 4 for some reason. However this will not work with my use plugin parameters.
{
    Window_ShopCommand.prototype.maxItems = function() 
    {
        return this._list.length;
    }
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopCommand_createCommand = Window_ShopCommand.prototype.createCommand;
    Window_ShopCommand.prototype.createCommand = function(command) 
    {
        if( $gameTemp.getActiveShop() !== null )
        {
            var activeShop = $gameTemp.getActiveShop();

            command = command.toUpperCase();
            if( ['CUSTOM', 'ORIGINAL'].contains(command) ) 
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( command === 'EQUIP' && BurningOrca.Shops.UseYanflyEquipCommand )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( command === 'BUY' && activeShop.ShopType !== "SellOnly" )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( command === 'SELL' && activeShop.ShopType !== "BuyOnly" )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( !['BUY', 'SELL'].contains(command) )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
        }
        else
        {
            BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopBuy
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopBuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function()
{
    BurningOrca.Shops.Window_ShopBuy_makeItemList.call(this);
    this._shopGoods.forEach(function(goods) {
        var item = null;
        if( goods[0] === 3 ) 
        {
            this._data.push(goods[5]);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }, this);
}

BurningOrca.Shops.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) 
{
    var enabled = BurningOrca.Shops.Window_ShopBuy_isEnabled.call(this, item);
    
    if( enabled 
     && $gameTemp.getActiveShop() !== null )
    {
       enabled = Math.abs($gameTemp.getActiveShop().getStockQuantity(item)) > 0;
    }

    if( item
     && item.isSwitch
     && $gameTemp.getActiveShop().getNumberBoughtOf(3, item.id) === 1 )
    {
        enabled = item.isToggable;
    }

    return enabled;
}

BurningOrca.Shops.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function() {
    BurningOrca.Shops.Window_ShopBuy_updateHelp.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
};

BurningOrca.Shops.Window_ShopBuy_price = Window_ShopBuy.prototype.price
Window_ShopBuy.prototype.price = function(item) 
{
    var price = BurningOrca.Shops.Window_ShopBuy_price.call(this, item);
    if( $gameTemp.getActiveShop() === null )
    {
        return price;
    }
    else
    {
        var stockQuantity = $gameTemp.getActiveShop().getStockQuantity(item);
        if( Math.abs(stockQuantity) > 0 )
            return price;

        if( item.isSwitch )
        {
            return $gameSwitches.value(item.id) ? BurningOrca.Shops.SwitchOnText : BurningOrca.Shops.SwitchOffText;
        }

        if( BurningOrca.Shops.DrawStockInBuyWindow )
            return price;

        return BurningOrca.Shops.SoldOutText;
    }
};

BurningOrca.Shops.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) 
{
    var item       = this._data[index];

    if( item.isSwitch )
    {
        var value = $gameSwitches.value(item.id);
        var rect = this.itemRect(index);
        var priceWidth = 96;
        rect.width -= this.textPadding();

        this.changePaintOpacity(this.isEnabled(item));
        if( $gameTemp.getActiveShop().getNumberBoughtOf(3, item.id) === 1 )
        {
            if( value )
            {
                this.changeTextColor(item.OnColor);
            }
            else
            {
                this.changeTextColor(item.OffColor);
            }
        }

        this.drawText(item.name, rect.x, rect.y, rect.width - priceWidth);

        this.resetTextColor();
        if( Imported.YEP_ShopMenuCore )
        {
            this.drawBuyPrice(item, rect);
        }
        else
        {
            this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
        }

        this.changePaintOpacity(true);
    }
    else
    {
        if( !BurningOrca.Shops.DrawStockInBuyWindow || Imported.YEP_ShopMenuCore || !$gameTemp.getActiveShop() )
        {
            BurningOrca.Shops.Window_ShopBuy_drawItem.call(this, index);
        }
        else
        {
            var rect = this.itemRect(index);
            var stockWidth = 144;
            var priceWidth = 96;
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth - stockWidth);
            this.drawText(this.price(item), rect.x + rect.width - priceWidth - stockWidth, rect.y, priceWidth, 'right');
            this.drawText($gameTemp.getActiveShop().getBuyWindowStockQuantityText(item), rect.x + rect.width - stockWidth, rect.y, stockWidth, 'right');
            this.changePaintOpacity(true);
        }
    }
};

if( Imported.YEP_X_CondShopPrices )
{
    BurningOrca.Shops.processConditionalShopPrices = Window_ShopBuy.prototype.processConditionalShopPrices;
    Window_ShopBuy.prototype.processConditionalShopPrices = function(item, price) 
    {
        if( !item || item.isSwitch ) return price;
        return BurningOrca.Shops.processConditionalShopPrices.call(this, item, price);
    }
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopBuy_currencyUnit = Window_ShopBuy.prototype.currencyUnit;
    Window_ShopBuy.prototype.currencyUnit = function()
    {
        if( this._isSpecialCurrencyText ) return '';
        return BurningOrca.Shops.Window_ShopBuy_currencyUnit.call(this);
    }

    BurningOrca.Shops.Window_ShopBuy_usingGoldIcon = Window_ShopBuy.prototype.usingGoldIcon;
    Window_ShopBuy.prototype.usingGoldIcon = function(unit) 
    {
        if( this._isSpecialCurrencyText ) return false;
        return BurningOrca.Shops.Window_ShopBuy_usingGoldIcon.call(this, unit);
    }

    if( BurningOrca.Shops.DrawStockInBuyWindow )
    {
        BurningOrca.Shops.Window_ShopBuy_drawBuyItem = Window_ShopBuy.prototype.drawBuyItem;
        Window_ShopBuy.prototype.drawBuyItem = function(item, rect)
        {
            if( $gameTemp.getActiveShop() && !item.isSwitch )
            {
                var newRect = JsonEx.makeDeepCopy(rect);
                newRect.width -= 240;
                BurningOrca.Shops.Window_ShopBuy_drawBuyItem.call(this, item, newRect);
            }
            else
            {
                BurningOrca.Shops.Window_ShopBuy_drawBuyItem.call(this, item, rect);
            }
        }
    }

    BurningOrca.Shops.Window_ShopBuy_drawBuyPrice = Window_ShopBuy.prototype.drawBuyPrice
    Window_ShopBuy.prototype.drawBuyPrice = function(item, rect) 
    {
        var price = this.price(item);
        let priceRect = JsonEx.makeDeepCopy(rect);

        if( BurningOrca.Shops.DrawStockInBuyWindow && $gameTemp.getActiveShop() && !item.isSwitch )
        {
            priceRect.width -= 144;
        }

        if( price === BurningOrca.Shops.SoldOutText
         || price === BurningOrca.Shops.SwitchOnText
         || price === BurningOrca.Shops.SwitchOffText )
        {
            this._isSpecialCurrencyText = true;
            if( Imported.YEP_X_MoreCurrencies )
            {
                Yanfly.MC.Window_ShopBuy_drawBuyPrice.call(this, item, priceRect);
            }
            else
            {
                BurningOrca.Shops.Window_ShopBuy_drawBuyPrice.call(this, item, priceRect);
            }
            delete this._isSpecialCurrencyText;
        }
        else
        {
            BurningOrca.Shops.Window_ShopBuy_drawBuyPrice.call(this, item, priceRect);
        }

        if( BurningOrca.Shops.DrawStockInBuyWindow && $gameTemp.getActiveShop() && !item.isSwitch )
        {
            this.drawText($gameTemp.getActiveShop().getBuyWindowStockQuantityText(item), priceRect.x, priceRect.y, priceRect.width + 144, 'right');
        }
    }
}

// YEP_X_MoreCurrencies does destroy my functionality of displaying the sold out text.
if( Imported.YEP_X_MoreCurrencies )
{
    Window_ShopBuy.prototype.hasDifferentBuyPrices = function(item)
    {
        return item.variableBuyPrices.length > 0
            || item.itemBuyPrices.length > 0
            || item.weaponBuyPrices.length > 0
            || item.armorBuyPrices.length > 0;
    }

    BurningOrca.Shops.Window_Base_drawAltCurrency = Window_Base.prototype.drawAltCurrency;
    Window_Base.prototype.drawAltCurrency = function(value, unit, wx, wy, ww) 
    {
        if( this._isSpecialCurrencyText ) return ww;
        if( value === BurningOrca.Shops.SoldOutText ) return ww; // Otherwise sold out is written twice if item has only different currencies.
        if( value === BurningOrca.Shops.SwitchOnText) return ww;
        if( value === BurningOrca.Shops.SwitchOffText ) return ww;
        return BurningOrca.Shops.Window_Base_drawAltCurrency.call(this, value, unit, wx, wy, ww);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopSell
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopSell_includes = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function(item) 
{
    var includes = BurningOrca.Shops.Window_ShopSell_includes.call(this, item);

    if( includes
     && $gameTemp.getActiveShop() )
    {
        includes = $gameTemp.getActiveShop().accepts(item);
    }

    return includes;
}

BurningOrca.Shops.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function() {
    BurningOrca.Shops.Window_ShopSell_updateHelp.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
}

BurningOrca.Shops.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function(item) {
    var enabled = BurningOrca.Shops.Window_ShopSell_isEnabled.call(this, item);

    // Enable to sell the item even it is has a buying price of zero, as long as the
    // selling price is not zero.
    if( !enabled && item ) 
    {
        var sellingPrice = 0;
        if( $gameTemp.getActiveShop() )
        {
            sellingPrice = $gameTemp.getActiveShop().getSellingPrice(item);
        }
        else if( item.sellPrice !== undefined )
        {
            sellingPrice = item.sellPrice;
        }
    
        if( Imported.YEP_ShopMenuCore && item.cannotSell ) return enabled;
        return sellingPrice > 0;
    }
    return enabled;
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopNumber
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh
Window_ShopNumber.prototype.refresh = function() 
{
    if( this._item && this._item.isSwitch )
    {
        this.contents.clear();
        this._index = 0;
        this.resetFontSettings();
        this.drawText(this._item.name, 0, this.lineHeight(), this.contents.width);
        this.drawMultiplicationSign();
        this.drawNumber();
        this.drawTotalPrice();
    }
    else
    {
        BurningOrca.Shops.Window_ShopNumber_refresh.call(this);
        if( $gameTemp.getActiveShop() 
         && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
        {
            this.drawAvailableStock();
        }
    }
}

Window_ShopNumber.prototype.drawAvailableStock = function()
{
    var shop = $gameTemp.getActiveShop();
    var stock = shop.getStockQuantity(this._item);
    var x = this.textPadding();
    var y = 0;
    var amountText = "";
    if( stock < 0 )
    {
        amountText = BurningOrca.Shops.InfinityText;
    }
    else if( BurningOrca.Shops.StockQuantityDisplayType === 'Current Stock' ) 
    {
        amountText = String(stock);
    }
    else
    {
       amountText = String(stock - this._number);
    }
    this.changeTextColor(this.systemColor());
    this.contents.drawText(BurningOrca.Shops.StockQuantityText, x, y, this.contents.width - this.textPadding() - this.textWidth(BurningOrca.Shops.InfinityText), this.lineHeight(), 'left');
    this.resetTextColor();
    this.contents.drawText(amountText, this.contents.width -  this.textPadding() - this.textWidth(BurningOrca.Shops.InfinityText), y, this.textWidth(BurningOrca.Shops.InfinityText), this.lineHeight(), 'right');
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopNumber_cursorWidth = Window_ShopNumber.prototype.cursorWidth;
    Window_ShopNumber.prototype.cursorWidth = function() 
    {
        if( this._item
         && this._item.isSwitch )
        {
            this.resetFontSettings();
            var digitWidth = this.textWidth(1);
            return digitWidth + this.textPadding() * 2;
        }
        else
        {
            return BurningOrca.Shops.Window_ShopNumber_cursorWidth.call(this);
        }
    }
}

if( Imported.YEP_X_MoreCurrencies )
{
    BurningOrca.Shops.Window_ShopNumber_isDrawGoldCurrency = Window_ShopNumber.prototype.isDrawGoldCurrency;
    Window_ShopNumber.prototype.isDrawGoldCurrency = function() 
    {
        if( this.isSelling() )
        {
            var item = this._item;
            if( item.variableSellPrices && item.variableSellPrices.length > 0 )
                return this._price > 0;
            if( item.itemSellPrices && item.itemSellPrices.length > 0 )
                return this._price > 0;
            return true;
        }
        return BurningOrca.Shops.Window_ShopNumber_isDrawGoldCurrency.call(this);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopCategory
///////////////////////////////////////////////////////////////////////////////////
if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopCategory_updateHelp = Window_ShopCategory.prototype.updateHelp;
    Window_ShopCategory.prototype.updateHelp = function() {
        BurningOrca.Shops.Window_ShopCategory_updateHelp.call(this);
        if( this._helpWindow._text == ""
         && $gameTemp.getActiveShop() )
        {
            this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ItemCategory
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ItemCategory_updateHelp = Window_ItemCategory.prototype.updateHelp;
Window_ItemCategory.prototype.updateHelp = function() {
    BurningOrca.Shops.Window_ItemCategory_updateHelp.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
};

///////////////////////////////////////////////////////////////////////////////////
// Utility Functions
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.AlterPrices = function(prices, variance)
{
    if( prices === undefined ) return;
    for( var pr in prices )
    {
        prices[pr] = Math.round(Math.max(prices[pr] * (1 + variance), 0));
    }
}

} 
else 
{
    var text = '';
    text += 'You are getting this error because you are trying to run ';
    text += 'BO_Shops while your project files are lower than version ';
    text += '1.5.0.\n\nPlease visit this thread for instructions on how to update ';
    text += 'your project files to 1.5.0 or higher: \n\n';
    text += 'https://forums.rpgmakerweb.com/index.php?threads/';
    text += 'rpg-maker-mv-1-5-0-update.79677/';
    console.log(text);
    require('nw.gui').Window.get().showDevTools();
}