/**
 * 定义默认符号信息
 */
define([
    "cw/config", "esri/symbols/PictureMarkerSymbol"
], function (config, PictureMarkerSymbol) {
    return {
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
        // 视频(红)
        'camera-active': new PictureMarkerSymbol({
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriPMS",
            "url": config.staticFileServer + 'images/ico_video_red.png',
            "contentType": "image/png",
            "width": 15,
            "height": 21
        })
    }
});