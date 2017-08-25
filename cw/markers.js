/**
 * 地图操作工具辅助类
 */
define(["x", "../../config.js", "../../symbols.js", "../../util.js",
  "esri/graphic", "esri/geometry/Point",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/toolbars/draw",
  "dojo/_base/array"
], function (
  x,
  config, symbols, util,
  Graphic, Point,
  FeatureLayer,
  PictureMarkerSymbol,
  Draw,
  array) {

    // 默认设置
    var defaults = {
      layerId: '$$graphic_{0}',
      // 10
      layerIndex: 10,
      markerName: '',
      markerType: 'marker',
      markerStatus: 'default',
      symbol: {
        defaultName: 'marker-default',
        yoffset: 10
      }
    };

    // 定义要数集合 a feature collection for the flickr photos
    var featureCollection = {
      "featureSet": {
        "features": [],
        "geometryType": "esriGeometryPoint"
      },
      "layerDefinition": {
        "geometryType": "esriGeometryPoint",
        "objectIdField": "ObjectID",
        "drawingInfo": {
          "renderer": {
            "type": "simple",
            "symbol": symbols[defaults.symbol.defaultName]
          }
        },
        "fields": [{
          "name": "ObjectID",
          "alias": "ObjectID",
          "type": "esriFieldTypeOID"
        },
        {
          "name": "description",
          "alias": "Description",
          "type": "esriFieldTypeString"
        },
        {
          "name": "title",
          "alias": "Title",
          "type": "esriFieldTypeString"
        }]
      }
    };

    var draw = null;

    var layers = {};

    var self = {
      /**
       * 初始化摄像头要素层
       */
      initLayer: function (options) {
        // 地图对象
        var map = options.map;
        // 标记类型
        var markerType = options.markerType || defaults.markerType;
        // 标记数据
        var markers = options.markers;
        // 特征数据地址
        var featureUrl = options.featureUrl;

        var layerId = x.string.format(defaults.layerId, markerType);

        var layer = map.getLayer(layerId);

        if (layer == null) {
          if (markers) {
            layer = new FeatureLayer(featureCollection, { id: layerId });
          }
          else {
            featureUrl = featureUrl || config.featureServers[markerType + 'Server'];

            layer = new FeatureLayer(featureUrl, { mode: FeatureLayer.MODE_SNAPSHOT, outFields: ["*"] });

            layer.on("update-end", function (evt) {
              array.forEach(layer.graphics, function (graphic, index) {
                var node = graphic.attributes;

                // 同步图标设置
                var symbolName = (node.markerType || node.MARKER_TYPE) + '-' + (node.markerStatus || node.MARKER_STATUS);

                if (symbols[symbolName]) {
                  graphic.setSymbol(symbols[symbolName]);
                } else {
                  // 默认图标
                  graphic.setSymbol(symbols[defaults.symbol.defaultName]);
                }
              });
              // self.initMarkers({ layer: layer, markers: markers });
            });
          }

          // 由于 layer-add-result 事件会执行多次，所以设置标识符号只加载一次
          layer.initialized = false;
          layer.markerType = markerType;
          layer.markers = markers;

          map.on("layer-add-result", function (results) {
            if (!results.layer.initialized && results.layer.id == layerId) {
              results.layer.initialized = true;
              console.log('init markers(' + markerType + '):layer-add-result');
              if (results.layer.markers) {
                self.initMarkers({ layer: results.layer, markerType: results.layer.markerType, markers: results.layer.markers });
              }
            }
          });

          map.addLayer(layer, defaults.layerIndex++);
        }
        else {
          console.log('init markers(' + markerType + '):initialized');
          if (markers) {
            self.initMarkers({ layer: layer, markerType: markerType, markers: markers });
          }
        }

        return layer;
      },

      /**
       * 初始化摄像头
       */
      initMarkers: function (options) {
        var layer = options.layer;
        var markerType = options.markerType || defaults.markerType;
        var markers = options.markers;

        var graphics = [];

        array.forEach(markers, function (node, index) {

          var graphic = new Graphic(new Point({
            'x': node.x,
            'y': node.y,
            'spatialReference': {
              "wkid": config.wkid
            }
          }));

          graphic.setAttributes(util.ext(node, {
            'markerStatus': node.markerStatus || defaults.markerStatus
          }));

          // 同步图标设置
          var symbolName = (node.markerType || markerType) + '-' + node.markerStatus;

          if (symbols[symbolName]) {
            graphic.setSymbol(symbols[symbolName]);
          } else {
            // 默认图标
            graphic.setSymbol(symbols[defaults.symbol.defaultName]);
          }

          if (!x.isUndefined(node.visible))
            graphic.visible = node.visible;

          graphics.push(graphic);
        });

        layer.applyEdits(graphics, null, null);
      },

      /**
       * 获取摄像头要素层
       */
      getLayer: function (options) {
        // 地图对象
        var map = options.map;
        // 标记类型
        var markerType = options.markerType || defaults.markerType;

        var layerId = x.string.format(defaults.layerId, markerType);

        return map.getLayer(layerId);
      },

      select: function (options) {
        // 地图对象
        var map = options.map;
        // 标记类型
        var markerType = options.markerType || defaults.markerType;
        // 选择方式
        var type = options.type;
        // 回调函数, 参数 graphics 为摄像头信息
        var callback = options.callback;

        var layerId = x.string.format(defaults.layerId, markerType);

        var layer = map.getLayer(layerId);

        if (layer == null) {
          return [];
        }

        if (!draw) {
          draw = new Draw(map);
        }

        map.disableMapNavigation();

        draw.activate(type);

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
            symbol = symbols['default-fill'];
          }

          var results = [];

          array.forEach(layer.graphics, function (node, index) {
            if (!!node.symbol) {
              if (evt.geometry.contains(node.geometry)) {
                if (node.symbol.type == 'picturemarkersymbol' && node.symbol.url.indexOf('images/ico_video_blue.png') > -1) {
                  results[results.length] = node.attributes;
                }
              }
            }
          });

          if (callback) {
            callback(results);
          }
        });
      },

      /**
       * 设置数据
       */
      data: function (options) {
        // 地图对象
        var map = options.map;
        // 标记类型
        var markerType = options.markerType || defaults.markerType;
        //
        var markerId = options.markerId;
        // 数据
        var data = options.data;

        var layerId = x.string.format(defaults.layerId, markerType);

        var layer = map.getLayer(layerId);

        var markerData = null;

        // 设置图形信息的数据
        array.forEach(layer.graphics, function (graphic, index) {
          if (graphic.attributes.id == markerId) {
            if (data) {
              graphic.setAttributes(util.ext(graphic.attributes, data));

              // 同步图标设置
              var symbolName = data.markerType + '-' + data.markerStatus;

              if (symbols[symbolName]) {
                graphic.setSymbol(symbols[symbolName]);
                graphic.draw();
              }

              if (!x.isUndefined(data.visible))
                graphic.visible = data.visible;
            }
            else {
              markerData = graphic.attributes;
            }
          }
        });

        return !options.data ? markerData : self;
      },

      /**
       * 绑定事件
       */
      on: function (options) {
        // event, map, markerType, handler
        // 事件类型
        var event = options.event;
        // 地图对象
        var map = options.map;
        // 标记类型
        var markerType = options.markerType || defaults.markerType;
        // 事件处理
        var handler = options.handler || x.noop;

        if (x.isString(options)) {
          if (arguments.length == 3) {
            event = arguments[0];
            map = arguments[1];
            handler = arguments[2];
          }
          else if (arguments.length == 4) {
            event = arguments[0];
            map = arguments[1];
            markerType = arguments[2];
            handler = arguments[3];
          }
        }

        var layerId = x.string.format(defaults.layerId, markerType);

        var layer = map.getLayer(layerId);

        layer.on(event, handler);
      }
    }

    return self;
  });
