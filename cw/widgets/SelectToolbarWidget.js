define(["x", "cw/symbols", "esri/toolbars/draw",
  "dojo/_base/array", "dojo/_base/declare", "dijit/_WidgetBase", "dojo/text!./SelectToolbarWidget.html",
  "dojo/query", "dojo/dom-style", "dojo/dom-construct", "dojo/on", "dojo/_base/lang", "dojo/_base/connect",
  "xstyle/css!./SelectToolbarWidget.css", "dojo/domReady!"],
  function (x, symbols, Draw, array, declare, WidgetBase, template, query, domStyle, domConstruct, on, lang, connect) {

    var draw = null;

    // cw/widgets/MapTypeWidget
    return declare([WidgetBase], {
      image: '',
      label: '',
      onclick: '',
      constructor: function (params, node) {
        // image = params.image;
        console.log('constructor');

        var callback;

        if (params.callback != undefined) {
          callback = params.callback;
        }

        if (params.map != undefined) {
          this.map = params.map;

          if (!draw) {
            var map = this.map;

            draw = new Draw(map);

            draw.on("draw-end", function (evt) {

              //deactivate the toolbar and clear existing graphics
              draw.deactivate();
              map.enableMapNavigation();

              // figure out which symbol to use
              var symbol;
              if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                symbol = markerSymbol;
              } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                symbol = lineSymbol;
              }
              else {
                symbol = symbols['select-symbol'];
              }

              var results = [];

              for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                array.forEach(map.getLayer(map.graphicsLayerIds[i]).graphics, function (node, index) {
                  if (!!node.symbol) {
                    if (evt.geometry.contains(node.geometry)) {
                      if (node.symbol.type == 'picturemarkersymbol') {
                        results[results.length] = node.attributes;
                      }
                    }
                  }
                });
              }

              if (callback) {
                callback(results);
              }
            });
          }
        }
      },
      postCreate: function () {
        var innerHTML = template;

        var outString = '';

        this.domNode.innerHTML = innerHTML.replace('{widget-map-type-items}', outString);

        this.placeAt(this.map.container, "last");

        // -------------------------------------------------------
        // 绑定事件
        // -------------------------------------------------------

        for (var i = 0, l = this.domNode.childNodes[0].childNodes.length; i < l; i++) {
          on(this.domNode.childNodes[0].childNodes[i], 'click', (function (evt) {
            var target = evt.currentTarget;
            console.log(target)
            // evt.currentTarget.attributes["value"];
            this.select(target.attributes["value"].value);
          }).bind(this));
        }
      },

      select: function (type) {
        this.map.disableMapNavigation();
        draw.activate(type);
      }
    });
  });
