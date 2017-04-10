/**
 * 地图操作工具辅助类
 */
define(["cw/config",
    "cw/util",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/layers/FeatureLayer",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/_base/array"
], function (
    config,
    util,
    Graphic,
    Point,
    FeatureLayer,
    PictureMarkerSymbol,
    array) {

        // 默认设置
        var defaults = {
            layerId: 'cameras-layer',
            layerIndex: 10,
            cameraName: '',
            cameraStatus: 'unkown',
            symbol: {
                defaultName: 'camera-unkown',
                yoffset: 10
            }
        };

        // 图像符号设置
        var symbols = {
            // 摄像头(默认)
            'camera-unkown': new PictureMarkerSymbol({
                //"angle": 0,
                //"xoffset": 0,
                "yoffset": defaults.symbol.yoffset,
                "type": "esriPMS",
                "url": config.staticFileServer + 'images/ico_video_blue.png',
                "contentType": "image/png",
                // 图片原始大小为 20x28
                "width": 15,
                "height": 21
            }),
            // 摄像头(蓝)
            'camera-deactive': new PictureMarkerSymbol({
                //"angle": 0,
                //"xoffset": 0,
                "yoffset": defaults.symbol.yoffset,
                "type": "esriPMS",
                "url": config.staticFileServer + 'images/ico_video_blue.png',
                "contentType": "image/png",
                // 图片原始大小为 20x28
                "width": 15,
                "height": 21
            }),
            // 摄像头(红)
            'camera-active': new PictureMarkerSymbol({
                "angle": 0,
                "xoffset": 0,
                "yoffset": defaults.symbol.yoffset,
                "type": "esriPMS",
                "url": config.staticFileServer + 'images/ico_video_red.png',
                "contentType": "image/png",
                "width": 15,
                "height": 21
            })
        }

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

        var self = {
            /**
             * 初始化摄像头要素层
             */
            initLayer: function (options) {
                var map = options.map;
                var cameras = options.cameras;

                var layer = map.getLayer(defaults.layerId);

                if (layer == null) {
                    layer = new FeatureLayer(featureCollection, { id: defaults.layerId });

                    map.on("layer-add-result", function (results) {
                        console.log('init cameras:layer-add-result');
                        self.initCameras({ layer: layer, cameras: cameras });
                    });

                    map.addLayer(layer, defaults.layerIndex);
                }
                else {
                    console.log('init cameras:added');
                    self.initCameras({ layer: layer, cameras: cameras });
                }

                return layer;
            },

            /**
             * 初始化摄像头
             */
            initCameras: function (options) {
                var layer = options.layer;
                var cameras = options.cameras;

                var graphics = [];

                array.forEach(cameras, function (node, index) {

                    var graphic = new Graphic(new Point({
                        'x': node.x,
                        'y': node.y,
                        'spatialReference': {
                            "wkid": 4326
                        }
                    }));

                    graphic.setAttributes(util.ext(node, {
                        'name': node.name || defaults.cameraName,
                        'status': node.status || defaults.cameraStatus
                    }));

                    graphic.setSymbol(symbols[defaults.symbol.defaultName]);

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

                return map.getLayer(defaults.layerId);
            },

            select: function (options) {
                // 地图对象
                var map = options.map;
                // 选择方式
                var type = options.type;
                // 回调函数, 参数 graphics 为摄像头信息
                var callback = options.callback;

                var layer = map.getLayer(defaults.layerId);

                if (layer == null) {
                    return [];
                }

                if (!draw) {
                    draw = new Draw(map);
                }

                map.disableMapNavigation();
                draw.activate(tool);

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
                                    results[results.length] = node;
                                }
                            }
                        }
                    });

                    if (callback) {
                        callback(results);
                    }
                });
            },

            status: function (options) {
                var map = options.map;
                var cameraId = options.cameraId;
                var status = options.status;

                var layer = map.getLayer(defaults.layerId);

                if (layer == null) {
                    return;
                }

                var cameraStatus = defaults.cameraStatus;

                array.forEach(layer.graphics, function (graphic, index) {
                    if (graphic.attributes.id == cameraId) {
                        if (status) {
                            graphic.attributes.status = status;
                            graphic.setSymbol(symbols["camera-" + status]);
                            graphic.draw();
                        }
                        else {
                            cameraStatus = graphic.attributes.status;
                        }
                    }
                });

                return cameraStatus;
            },

            /**
             * 设置数据
             */
            data: function (options) {
                var map = options.map;
                var cameraId = options.cameraId;
                var data = options.data || [];
                var override = options.override || 1;
            }
        }

        return self;
    });