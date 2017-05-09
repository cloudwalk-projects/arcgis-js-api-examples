define(["x", "dojo/_base/declare", "dijit/_WidgetBase", "dojo/text!./MapTypeWidget.html",
  "dojo/query", "dojo/dom-style", "dojo/dom-construct", "dojo/on", "dojo/_base/lang", "dojo/_base/connect",
  "xstyle/css!./MapTypeWidget.css", "dojo/domReady!"],
  function (x, declare, WidgetBase, template, query, domStyle, domConstruct, on, lang, connect) {

    // cw/widgets/MapTypeWidget
    return declare([WidgetBase], {
      image: '',
      width: '200px',
      height: '160px',
      margin_left: '10px',
      label: '',
      onclick: '',
      constructor: function (params, node) {
        // image = params.image;
        console.log('constructor');

        if (params.map != undefined) {
          this.map = params.map;
        }

        if (params.data != undefined) {
          this.data = params.data;
        }

        /*
        if (params.height != undefined) {
            this.height = params.height;
        }
        if (params.margin != undefined) {
            this.margin_left = params.marginLeft;
        }

        if (params.action != undefined) {
            this.onclick = params.action;
        }*/
        if (params.label != undefined) {
          this.label = params.label;
        }
      },
      postCreate: function () {
        var innerHTML = template;

        var outString = '';

        var defaultMapType;

        x.each(this.data, function (index, node) {
          if (node.default) {
            defaultMapType = node.value;
          }
          outString += '<div class="widget-map-type-item" value="' + node.value + '">' + node.name + '</div>';
        });

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
            this.map.setBasemap(target.attributes["value"].value);
          }).bind(this));
        }

        /*
        d.onmouseover = function () {
            dojo.animateProperty({
                node: this,
                duration: 1000,
                properties: {
                    opacity: 0.5
                }
            }).play();
        };
        d.onmouseout = function () {
            dojo.animateProperty({
                node: this,
                duration: 1000,
                properties: {
                    opacity: 0
                }
            }).play();
        };*/
      }
    });
  });
