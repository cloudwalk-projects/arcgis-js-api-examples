/**
 * 定义默认符号信息
 */
define([
  "cw/config", "esri/Color", "esri/symbols/PictureMarkerSymbol", "esri/symbols/PictureFillSymbol", "esri/symbols/SimpleLineSymbol"
], function (config, Color, PictureMarkerSymbol, PictureFillSymbol, SimpleLineSymbol) {
  // 图像符号设置
  return {
    // 选择图形
    'select-symbol': new PictureFillSymbol(
      config.staticFileServer + "images/select-background.png",
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('#000'), 1), 42, 42),
    // 地图标记(默认)
    'marker-default': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_blue.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 地图标记(蓝)
    'marker-deactive': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_blue.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 地图标记(红)
    'marker-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 摄像头(蓝)
    'camera-default': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 摄像头(激活)
    'camera-deactive': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 摄像头(红)
    'camera-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 酒店(默认)
    'hotel-default': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 酒店(未激活)
    'hotel-deactive': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 酒店(激活)
    'hotel-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),

    // 网吧(默认)
    'netbar-default': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 网吧(未激活)
    'netbar-deactive': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_blue.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 网吧(激活)
    'netbar-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 清真寺(默认)
    'mosque-default': new PictureMarkerSymbol({
      //"angle": 0,
      //"xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_red.png',
      "contentType": "image/png",
      // 图片原始大小为 20x28
      "width": 15,
      "height": 21
    }),
    // 清真寺(激活)
    'mosque-deactive': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),
    // 清真寺(红)
    'mosque-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_marker_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    })
  }
});
