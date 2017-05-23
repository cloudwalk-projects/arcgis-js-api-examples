新手入门
===============

必要技能
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
此地图组件基于 ArcGIS Server 和 ArcGIS API for JavaScript 构建。所以需要对如下技能要求了解

================================  =========
组件                               要求
================================  =========
Dojo Toolkit                      了解
ArcGIS API for JavaScript         了解
================================  =========

设置配置
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
配置地图的参数信息

文件位置 cw/config.js, 根据实际情况将 {gis-server} 和 {static-files-server} 信息改为实际的服务器地址信息

.. code-block:: javascript

    {
      // 地图默认配置
      map: {
        // 地图的底图样式  "satellite", //实景图
        basemap: 'streets',
        // 地图中心坐标经纬度信息, 经度(longitude), 纬度(latitude)
        center: [106.55118727951862, 29.56397532484192],
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
        // 默认的 WKID
        wkid: 4326,
        // 静态资源服务器  
        staticFileServer: 'http://{static-files-server}/arcgis/',
        // 瓦片地图显示类型 tiled | dynamic
        tiledMapType: 'tiled',
        // 瓦片地图服务器
        tiledMapServer: 'http://{gis-server}/arcgis/rest/services/ChinaMap/MapServer',
        // 路径
        naServer: 'http://{gis-server}/arcgis/rest/services/ChinaMap/NAServer/路径',
        // 要素服务器
        featureServers: {
        // 摄像头
        cameraServer: 'http://{gis-server}/arcgis/rest/services/ChinaMap/NaServer',
        // 区域服务器
        pathServer: 'http://{gis-server}/arcgis/rest/services/ChinaMap/NaServer'
      }
    }

Hello Map
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
初始化一个地图

.. code-block:: javascript
 
    require(["cw/basemap", "dojo/domReady!"], function (basemap) {
      var map = basemap.create({ divId: "map" });
    }

获取地图中心点坐标
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
.. code-block:: javascript
 
    require(["cw/basemap", "cw/util",    
      "dojo/dom", "dojo/on", "esri/graphic", "esri/symbols/PictureMarkerSymbol", 
      "dojo/domReady!"], function (basemap, util, dom, on, Graphic, PictureMarkerSymbol) {
      var map = basemap.create({ divId: "map" });

      on.once(map, "load", function () {

        // 在地图上添加一个标记
        var symbol = new PictureMarkerSymbol({ 
          "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriPMS", 
          "url": "images/location.png", "contentType": "image/png", 
          "width": 36, "height": 36 });

        var geometry = map.extent.getCenter();

        var graphic = new Graphic(geometry);

        this.graphics.add(graphic);

        graphic.setSymbol(symbol);
        graphic.draw();

        this.graphics.add(sampleGraphic);
      }
    }

获取鼠标点击事件的坐标
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
.. code-block:: javascript
 
    require(["cw/basemap", "cw/util", "dojo/domReady!"], function (basemap, util) {
      var map = basemap.create({ divId: "map" });

      map.on('click', function (evt) {

        var point = evt.mapPoint;

        // 输出坐标信息
        console.log('x:' + point.x + ', y=' + point.y);
      });
    });

坐标转为经纬度
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: javascript
 
    require(["cw/basemap", "cw/util", "dojo/domReady!"], function (basemap, util) {
      var map = basemap.create({ divId: "map" });

      map.on('click', function (evt) {

        var point = evt.mapPoint;

        var lonlat = util.mercator2lonlat(evt.mapPoint);

        // 输出坐标信息
        console.log('x:' + lonlat.x + ', y=' + lonlat.y);
      });
    });
