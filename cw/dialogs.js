/**
 * 地图操作工具辅助类
 */
define(["cw/config", "cw/basemap", "cw/markers", "cw/util", "cw/dialogs/InfoWindow",
  "esri/Color", "esri/graphic", "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/symbols/Font",
  "esri/symbols/PictureMarkerSymbol", "esri/symbols/TextSymbol", "esri/symbols/PictureMarkerSymbol",
  "dojo/_base/array", "dojo/query", "dojo/on", "dojo/request/xhr"
], function (
  config, basemap, markers, util, InfoWindow,
  Color, Graphic, Point, GraphicsLayer, Font, PictureMarkerSymbol, TextSymbol, PictureMarkerSymbol,
  array, query, on, xhr) {

    // 默认设置
    var defaults = {
      layerId: '$$dialog_{0}',
      // 10
      layerIndex: 10
    };

    var self = {
      /**
       * 初始化摄像头要素层
       */
      initLayer: function (options) {
        // 地图对象
        var map = options.map;
        var data = options.data;

        // 设置字体的大小和颜色
        var font = new Font('12px');
        var fontColor = new Color([255, 255, 255]);

        var backgroundSymbol = new PictureMarkerSymbol({
          "angle": 0,
          "xoffset": 0,
          "yoffset": 68,
          "type": "esriPMS",
          "url": config.staticFileServer + 'images/tooltip_75x100.png',
          "contentType": "image/png",
          "width": 80,
          "height": 130,
        });

        layer = new GraphicsLayer({ id: 'my-marker-tooltip' });

        map.addLayer(layer);

        array.forEach(data, function (node, index) {
          console.log(node);
          var geometry = new Point({
            'x': node.x,
            'y': node.y,
            'spatialReference': {
              "wkid": config.wkid
            }
          });

          var attributes = node;

          // 设置背景
          var graphic = new Graphic(geometry);

          graphic.setAttributes(node);
          graphic.setSymbol(backgroundSymbol);

          layer.add(graphic);

          // 设置图片
          graphic = new Graphic(geometry);

          var pictureSymbol = new PictureMarkerSymbol({
            "angle": 0,
            "xoffset": 0,
            "yoffset": 80,
            "type": "esriPMS",
            "url": node.src,
            "contentType": "image/png",
            "width": 75,
            "height": 100,
          });

          graphic.setAttributes(attributes);
          graphic.setSymbol(pictureSymbol);

          layer.add(graphic);

          // 日期
          graphic = new Graphic(geometry);

          // 自定义数据
          var textSymbol = new TextSymbol({
            "text": node.createdDate || '',
            "align": TextSymbol.ALIGN_START,
            "font": font,
            "xoffset": -35,
            "yoffset": 20
          });

          textSymbol.setFont(font);
          textSymbol.setColor(fontColor);

          textgraphic.setAttributes(attributes);
          graphic.setSymbol(textSymbol);

          layer.add(graphic);

          // 设置时间
          graphic = new Graphic(geometry);

          // 自定义数据
          var textSymbol = new TextSymbol({
            "text": node.createdTime || '',
            "align": TextSymbol.ALIGN_START,
            "font": font,
            "xoffset": -35,
            "yoffset": 10
          });

          textSymbol.setFont(font);
          textSymbol.setColor(fontColor);

          textgraphic.setAttributes(attributes);
          graphic.setSymbol(textSymbol);

          layer.add(graphic);
        });

        return layer;
      }
    }

    return self;
  });
