/**
 * 地图操作工具辅助类
 */
define(["cw/config",
    "esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer"
], function (
    config,
    Map,
    ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer) {

        var self = {
            /**
             * 初始化地图
             */
            create: function (options) {

                self.util.ext(options, { tiledMapServer: config.tiledMapServer });

                self.util.ext(options.map, config.map);

                map = new Map(options.divId, options.map);

                // 加载地图服务
                var layer = new ArcGISDynamicMapServiceLayer(options.tiledMapServer);

                map.addLayer(layer);

                return map;
            },

            util: {
                /**
                * 将原始对象的属性和方法扩展至目标对象
                * @method ext
                * @memberof x
                * @param destination 目标对象
                * @param source 原始对象
                */
                ext: function (destination, source) {
                    /*
                    for (var property in source)
                    {
                    destination[property] = source[property];
                    }
                    return destination;
                    */

                    var result = arguments[0] || {};

                    if (arguments.length > 1) {
                        for (var i = 1; i < arguments.length; i++) {
                            for (var property in arguments[i]) {
                                result[property] = arguments[i][property];
                            }
                        }
                    }

                    return result;
                },

                /**
                 * 墨卡托转经纬度
                 */
                mercator2lonlat: function (mercator) {
                    var lonlat = { x: 0, y: 0, "spatialReference": { "wkid": 4326 } };
                    var x = mercator.x / 20037508.34 * 180;
                    var y = mercator.y / 20037508.34 * 180;

                    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
                    lonlat.x = x;
                    lonlat.y = y;

                    return lonlat;
                },

                /**
                * 经纬度转墨卡托 
                */
                lonlat2mercator: function (lonlat) {
                    var mercator = { x: 0, y: 0, "spatialReference": { "wkid": 102100 } };
                    var x = lonlat.x * 20037508.34 / 180;
                    var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180);
                    y = y * 20037508.34 / 180;
                    mercator.x = x;
                    mercator.y = y;
                    return mercator;
                }
            }
        }

        return self;
    });