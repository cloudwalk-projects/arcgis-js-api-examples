/**
 * 统一加载包
 */
define(["cw/config",
    "cw/basemap",
    "cw/cameras",
    "cw/directions",
    "cw/util"
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