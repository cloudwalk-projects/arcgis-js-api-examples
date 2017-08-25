/**
 * 统一加载包
 */
define(["../../config.js",
    "../../basemap.js",
    "../../cameras.js",
    "../../directions.js",
    "../../util.js"
], function (
    config,
    basemap,
    util) {

        return {
            config: config,
            symbols: symbols,
            basemap: basemap,
            cameras: cameras,
            directions: directions,
            util: util
        };
    });
