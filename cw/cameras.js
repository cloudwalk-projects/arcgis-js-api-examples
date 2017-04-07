/**
 * 地图操作工具辅助类
 */
define(["cw/config",
    "cw/util",
    "esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer"
], function (
    config,
    util,
    Map,
    ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer) {

        var self = {
            /**
             * 初始化地图
             */
            create: function (options) {

                options = self.util.ext(options, { tiledMapServer: config.tiledMapServer });

                options.map = self.util.ext(options.map, config.map);

                var map = new Map(options.divId, options.map);

                // 加载地图服务
                var layer = null;

                if (config.tiledMapType == 'tiled') {
                    layer = new ArcGISTiledMapServiceLayer(options.tiledMapServer);
                }
                else {
                    layer = new ArcGISDynamicMapServiceLayer(options.tiledMapServer);
                }

                map.addLayer(layer);

                return map;
            },

            util: util
        }

        return self;
    });