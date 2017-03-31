/**
 * 默认配置信息
 */
define([], function () {
  return {
    // 地图默认配置
    map: {
      // 地图的底图样式 "satellite", //实景图
      basemap: '',
      // 地图中心坐标经纬度信息, 经度(longitude), 维度(latitude)
      center: [106.49990342832321, 29.460281009528018],
      // 地图默认放大级别
      zoom: 15,
      // 地图最大缩放级别
      maxZoom: 20,
      // 地图最小缩放级别
      minZoom: 1,
      // 是否显示地图缩放按钮
      slider: false,
      // 是否显示 Esri 的标识
      logo: false
    },
    // 静态资源服务器  
    staticFileServer: 'http://192.168.10.222:8080/static/',
    // 瓦片地图显示类型 tiled | dynamic
    tiledMapType:'dynamic',
    // 瓦片地图服务器
    // 重庆地图 'http://192.168.10.35:6080/arcgis/rest/services/重庆地图/MapServer'    
    // 重庆地图 'http://192.168.10.35:6080/arcgis/rest/services/Baidu_ChongQing/MapServer'
    // 泉州地图 'http://192.168.10.35:6080/arcgis/rest/services/qz/QZMapService/MapServer'
    tiledMapServer: 'http://192.168.10.35:6080/arcgis/rest/services/Baidu_ChongQing/MapServer',
    // 路径
    // 重庆地图 'http://192.168.10.35:6080/arcgis/rest/services/重庆地图/NAServer/路径'
    naServer: 'http://192.168.10.35:6080/arcgis/rest/services/重庆地图/NAServer/路径',
    // 要素服务器
    featureServers: {
      // 摄像头
      // 泉州 http://192.168.10.35:6080/arcgis/rest/services/qz/QZFeatureService/FeatureServer/0
      cameraServer: 'http://192.168.10.35:6080/arcgis/rest/services/重庆地图/NaServer',
      // 区域服务器
      // 泉州 http://192.168.10.35:6080/arcgis/rest/services/qz/QZFeatureService/FeatureServer/0
      pathServer: 'http://192.168.10.35:6080/arcgis/rest/services/重庆地图/NaServer'
    }
  };
});