/**
 * 地图操作工具辅助类
 */
define(["cw/config",
  "cw/util",
  "cw/mapLayer/TDTLayer",
  "cw/mapLayer/TDTAnnoLayer",
  "cw/mapLayer/ArcTiledLayer",
  "esri/map",
  "esri/geometry/Point",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/layers/ArcGISDynamicMapServiceLayer"
], function (
  config, util,TDTLayer,TDTAnnoLayer,ArcTiledLayer,
  Map, Point,
  ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer) {

    var self = {
      /**
       * 初始化地图
       */
      create: function (options) {

        options = self.util.ext({tiledMapServer: config.tiledMapServer}, options);

        options.map = self.util.ext(config.map, options.map);

        var map = new Map(options.divId, options.map);

        // 加载地图服务
        var layer = null;

        if (config.tiledMapType == 'tiled') {
          layer = new ArcGISTiledMapServiceLayer(options.tiledMapServer, {id: 'basemap-layer'});
          map.addLayer(layer);
        }
        else if (config.tiledMapType == 'dynamic') {
          layer = new ArcGISDynamicMapServiceLayer(options.tiledMapServer, {id: 'basemap-layer'});
          map.addLayer(layer);
        }//天地图WMTS服务加载
        else if (config.tiledMapType == 'tianditu') {
          var basemap = new TDTLayer(config.tiandituWMTSServer);
          map.addLayer(basemap);
          var annolayer = new TDTAnnoLayer(config.tiandituWMTSServer);
          map.addLayer(annolayer);
        }//ArcGIS瓦片包
        else if (config.tiledMapType == 'arctiled') {
          var basemap = new ArcTiledLayer(config.tiledMapServer);
          map.addLayer(basemap);
        }

        return map;
      },

      /**
       * 设置地图参数
       */
      edit: function (options) {
        // 地图对象
        var map = options.map;
        // 中心点坐标
        var center = options.center;
        // 缩放比例
        var zoom = options.zoom;

        if (center) {
          var point = new Point({
            'x': center[0],
            'y': center[1],
            'spatialReference': { "wkid": config.wkid }
          });

          map.centerAt(point);
        }

        if (zoom) {
          map.setZoom(zoom);
        }

        // 不支持
      },

      util: util
    }

    return self;
  });
