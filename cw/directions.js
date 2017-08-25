/**
 * 地图操作工具辅助类
 */
define(["../../config.js",
  "../../util.js",
  "esri/Color",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "esri/tasks/RouteTask",
  "esri/tasks/RouteParameters",
  "esri/tasks/FeatureSet",
  "dojo/_base/array"
], function (
  config,
  util,
  Color,
  Graphic,
  Point,
  Polyline,
  FeatureLayer,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  PictureMarkerSymbol,
  TextSymbol,
  Font,
  RouteTask,
  RouteParameters,
  FeatureSet,
  array) {

    // 默认设置
    var defaults = {
      wkid: config.wkid,
      // 层唯一标识
      layerId: 'map-directions-layer',
      layerIndex: 5,
      // 查询 默认类型
      query: { type: 'polyline' },
      // 提示框
      tooltip: {
        // 提示框文本
        layerId: 'map-directions-tooltip-label-layer',
        layerIndex: 7,
        // 提示框底图
        // backgroundLayerId: 'map-directions-tooltip-background-layer',
        // backgroundLayerIndex: 6,
        //
        yoffset: 32,
        width: 150,
        height: 50
      },
      // 文字位置的
      text: {
        xoffset: -50,
        yoffset: 40
      }
    };

    var symbols = {
      'point': new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_CIRCLE, 10,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1),
        new Color([0, 255, 0, 0.25])),
      'line': new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        new Color([0, 200, 255, 0.5]),
        8),
      'tooltip': new PictureMarkerSymbol({
        "angle": 0,
        "xoffset": 0,
        "yoffset": defaults.tooltip.yoffset,
        "type": "esriPMS",
        "url": config.staticFileServer + 'images/tooltip.png',
        "contentType": "image/png",
        "width": defaults.tooltip.width,
        "height": defaults.tooltip.height
      })
    };

    // 设置线的样式
    // symbols['line'].setColor(new Color([0, 200, 255, 0.5])).setWidth(10);

    var font = new Font('12px');

    // create a feature collection
    var featureCollection = {
      "layerDefinition": {
        "geometryType": "esriGeometryPoint",
        "objectIdField": "objectId",
        //
        "drawingInfo": {
          "renderer": {
            "type": "simple",
            "symbol": {
              "type": "esriPMS",
              "url": "../images/ico_video_red.png",
              "contentType": "image/png",
              "width": 15,
              "height": 21,
              "yoffset": 10
            }
          }
        },
        // 字段
        "fields": [{
          "name": "objectId",
          "alias": "ObjectID",
          "type": "esriFieldTypeOID"
        },
        {
          "name": "name",
          "alias": "name",
          "type": "esriFieldTypeString"
        },
        {
          "name": "description",
          "alias": "Description",
          "type": "esriFieldTypeString"
        }]
      },
      "featureSet": {
        "features": [],
        "geometryType": "esriGeometryPoint"
      }
    };

    var initialized = false;

    var originalRoutes = [];

    var self = {
      /**
       * 初始化摄像头要素层
       */
      initLayer: function (options) {
        var map = options.map;
        var callback = options.callback;

        var layer = map.getLayer(defaults.layerId);

        if (layer == null) {

          layer = new FeatureLayer(featureCollection, { id: defaults.layerId });

          // layer = new FeatureLayer("http://192.168.10.35:6080/arcgis/rest/services/qz/QZFeatureService/FeatureServer/0", {
          //    id: defaults.layerId,
          //    mode: FeatureLayer.MODE_ONDEMAND,
          //    outFields: ["*"]
          // });

          tooltipLayer = new FeatureLayer(featureCollection, { id: defaults.tooltip.layerId });

          map.on("layers-add-result", function (results) {
            if (!initialized) {
              initialized = true;
              console.log('init directions:layer-add-result');
              callback({ layer: layer, tooltipLayer: tooltipLayer });
            }
          });

          map.addLayers([layer, tooltipLayer]);

          map.reorderLayer(layer, defaults.layerIndex)
          map.reorderLayer(tooltipLayer, defaults.tooltip.layerIndex);
        }
        else {
          console.log('init directions:initialized');
          callback({ layer: layer });
        }

        return layer;
      },

      /**
       * 查询路径信息
       */
      query: function (options) {
        // 地图对象
        var map = options.map;
        // 路由信息
        var routes = options.routes;
        // 查询类型
        var type = options.type || defaults.query.type;

        var wkid = options.wkid || defaults.wkid;

        var layer = map.getLayer(defaults.layerId);

        var tooltipLayer = map.getLayer(defaults.tooltip.layerId);

        if (layer == null) {
          layer = self.initLayer({
            map: map, callback: function (options) {
              self.displayRoutes({ layer: options.layer, tooltipLayer: options.tooltipLayer, routes: routes, type: type, wkid: wkid });
            }
          });
        }
        else {
          self.displayRoutes({ layer: layer, tooltipLayer: tooltipLayer, routes: routes, type: type, wkid: wkid });
        }
      },

      displayRoutes: function (options) {
        // 路径图层
        var layer = options.layer;
        // 提示图层
        var tooltipLayer = options.tooltipLayer;
        // 查询类型
        var type = options.type;
        // 网络分析服务地址
        var naServer = options.naServer || config.naServer;
        // 路径数据
        var routes = options.routes;

        var wkid = options.wkid || defaults.wkid;

        var routes = options.routes;

        var graphics = [];

        if (type == 'polyline') {
          var paths = [];

          array.forEach(routes, function (item) {
            paths.push([item.x, item.y]);
          });

          var polyline = new Polyline({ "paths": [paths], "spatialReference": { "wkid": wkid } });
          graphics = [new Graphic(polyline, symbols['line'])];

          layer.applyEdits(graphics, null, null);

          originalRoutes = graphics;
        }
        else {
          // type == road
          try {
            routeTask = new RouteTask(naServer);
            routeParams = new RouteParameters();
            routeParams.stops = new FeatureSet();
            routeParams.barriers = new FeatureSet();
            routeParams.outSpatialReference = { wkid: 102100 };

            routeTask.on("solve-complete", function (evt) {
              self.solveComplete(layer, evt.result)
            });
            routeTask.on("error", self.error);

            graphics = [];

            array.forEach(routes, function (node) {
              var graphic = new Graphic(new Point({
                'x': node.x,
                'y': node.y,
                'spatialReference': { 'wkid': wkid }
              }), symbols['point'])
              // paths.push([item.x, item.y]);
              routeParams.stops.features.push(graphic);

              graphics.push(graphic);
            });

            tooltipLayer.applyEdits(graphics, null, null);

            routeTask.solve(routeParams);
          }
          catch (ex) {
            console.log(ex);
          }
        }

        // 设置起点和终点的提示框
        if (routes.length > 1) {

          graphics = [];

          array.forEach([routes[0], routes[routes.length - 1]], function (item, index) {
            var attributes = {};

            var geometry = new Point(item);

            var graphic = new Graphic(geometry);

            graphic.setAttributes(attributes);
            graphic.setSymbol(symbols["tooltip"]);

            graphics.push(graphic);

            // 设置文字
            graphic = new Graphic(geometry);

            // 自定义数据
            var textSymbol = new TextSymbol({
              "text": (index == 0 ? '起点' : '终点') + ' ' + item.name,
              "align": TextSymbol.ALIGN_START,
              "font": font,
              "xoffset": defaults.text.xoffset,
              "yoffset": defaults.text.yoffset
            });

            textSymbol.setFont(font);
            textSymbol.setColor(new Color([255, 255, 255]));

            graphic.setSymbol(textSymbol);

            graphics.push(graphic);

            // 设置时间
            graphic = new Graphic(geometry);

            // 自定义数据
            var textSymbol = new TextSymbol({
              "text": '时间 ' + item.createdDate,
              "align": TextSymbol.ALIGN_START,
              "font": font,
              "xoffset": defaults.text.xoffset,
              "yoffset": defaults.text.yoffset - 20
            });

            textSymbol.setFont(font);
            textSymbol.setColor(new Color([255, 255, 255]));

            // textgraphic.setAttributes(attributes);
            graphic.setSymbol(textSymbol);
            graphics.push(graphic);
          });

          tooltipLayer.applyEdits(graphics, null, null);

          tooltipLayer.on('mouse-over', function (evt) {
            if (evt.graphic) {
              console.log(evt.graphic);
            }
          });
        }
      },

      //Clears all routes
      clearRoutes: function (layer) {
        layer.applyEdits(null, null, originalRoutes);
        originalRoutes = [];
      },

      // Draws the resulting routes on the map
      solveComplete: function (layer, result) {
        // 清理路径信息
        self.clearRoutes(layer);

        var graphics = [];

        array.forEach(result.routeResults, function (routeResult, i) {
          var graphic = routeResult.route.setSymbol(symbols['line']);
          graphics.push(graphic)
        });

        layer.applyEdits(graphics, null, null);

        originalRoutes = graphics;

        var messages = [];

        array.forEach(result.messages, function (message) {
          messages.push(message.type + " : " + message.description);
        });

        // 输出 message
      },

      /**
       * 通用错误处理方法
       */
      error: function (err) {
        console.error(err);
      }
    }

    return self;
  });
