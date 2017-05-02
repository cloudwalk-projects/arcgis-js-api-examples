/**
 * 定义默认符号信息
 */
define([
  "cw/config", "esri/symbols/PictureMarkerSymbol"
], function (config, PictureMarkerSymbol) {
  // 图像符号设置
  return {
    // 摄像头(默认)
    'marker-default': new PictureMarkerSymbol({
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
    // 摄像头(蓝)
    'marker-deactive': new PictureMarkerSymbol({
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
    // 摄像头(红)
    'marker-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    }),

    // 视频(蓝)
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
    // 视频(红)
    'camera-active': new PictureMarkerSymbol({
      "angle": 0,
      "xoffset": 0,
      "yoffset": -10,
      "type": "esriPMS",
      "url": config.staticFileServer + 'images/ico_video_red.png',
      "contentType": "image/png",
      "width": 15,
      "height": 21
    })
  }
});
