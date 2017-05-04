/**
 * 地图操作工具辅助类
 */
define(["x", "cw/config", "cw/util",
  "esri/graphic", "esri/geometry/Point",
  "esri/layers/FeatureLayer", "esri/symbols/PictureMarkerSymbol",
  "esri/toolbars/draw",
  "dojo/_base/array",
  "dijit/Menu",
  "dijit/MenuItem",
  "dijit/MenuSeparator"
], function (
  x, config, util,
  Graphic, Point,
  FeatureLayer, PictureMarkerSymbol,
  Draw,
  array,
  Menu, MenuItem, MenuSeparator) {

    var self = {
      /**
       * 初始化摄像头要素层
       */
      bind: function (options) {
        // 目标
        var target = options.target;
        // 菜单项
        var items = options.items;

        var selected;

        // Creates right-click context menu for map
        var menu = new Menu({
          onOpen: function (box) {
            // Lets calculate the map coordinates where user right clicked.
            // We'll use this to create the graphic when the user clicks
            // on the menu item to "Add Point"
            // currentLocation = getMapPointFromMenuPosition(box);
            // editToolbar.deactivate();
          }
        });

        for (var i = 0; i < items.length; i++) {
          menu.addChild(new MenuItem(items[i]));
        }

        menu.startup();

        if (target.declaredClass == "esri.Map") {
          menu.bindDomNode(target.container);
        }
        else if (target.declaredClass == "esri.layers.FeatureLayer") {

          target.on("mouse-over", function (evt) {
            // We'll use this "selected" graphic to enable editing tools
            // on this graphic when the user click on one of the tools
            // listed in the menu.
            selected = evt.graphic;

            // Let's bind to the graphic underneath the mouse cursor
            menu.bindDomNode(evt.graphic.getDojoShape().getNode());
          });

          target.on("mouse-out", function (evt) {
            menu.unBindDomNode(evt.graphic.getDojoShape().getNode());
          });

          menu.getSelected = function () {
              return selected;
          }
        }

        return menu;
      }
    }

    return self;
  });
