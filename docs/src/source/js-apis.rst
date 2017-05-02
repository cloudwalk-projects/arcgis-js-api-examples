应用接口
===============

通用规则
------------------------------------------------------------

参数规则
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
所有输入参数统一为 options, 格式为 JSON 对象。

模块加载规则
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
所有模块加载方式基于 AMD 规则， 具体代码如下：

.. code-block:: javascript
    :emphasize-lines: 1-3

    require([
        "cw/basemap","cw/cameras", ...
    ], function(basemap, cameras, ... ) {

        var map = basemap.create({ divId:'map' });
        
        var data = [...];

        cameras.initLayer({
            // 显示地图的容器标识
            map:map,
            // 摄像头数据
            cameras:data 
        });	
    ...
    });

cw
------------------------------------------------------------

basemap 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
基本地图

create - 创建地图
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // (必填)显示地图的容器标识
        divId:'map',
        // 自定义地图瓦片服务地址
        tiledMapServer:'http://localhost:6080/arcgis/rest/services/ChinaMap/MapServer',
        // 地图选项
        map:{
            // 中心点坐标
            center:[106.551187, 29.563975],
            // 默认缩放比例
            zoom:16,
            // 最小缩放比例
            minZoom:15,
            // 最大缩放比例
            maxZoom:19 
        }
    }

**输出参数**

esri.Map 对象

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap", ...
    ], function(basemap, ... ) {

        var map = basemap.create({
            // 显示地图的容器标识
            divId:'map',
            // 地图选项
            map:{
                // 中心点坐标
                center:[106.551187, 29.563975],
                // 默认缩放比例
                zoom:16,
                // 最小缩放比例
                minZoom:15,
                // 最大缩放比例
                maxZoom:19 
            }
        });
    ...
    });


markers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
通用标记层

initLayer - 初始化标记图层
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // (必填)显示地图的容器标识
        divId:'map',
        // 中心点坐标
        center:[],
        // 默认缩放比例
        zoom:16,
        // 最小缩放比例
        minZoom:15,
        // 最大缩放比例
        maxZoom:19 
    }

**输出参数**

esri.Map 对象

**示例代码**

.. code-block:: javascript

    markers.initLayer({
        // 显示地图的容器标识
        map:map,
        // 坐标点数据
        points:[] 
    });	

cameras 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
摄像头管理

initLayer - 初始化摄像头图层
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // 地图对象
        map:map,
        // 摄像头数据信息
        cameras:[{
            // 唯一标识
            "id": "0001",
            // 名称
            "name": "摄像头 1",
            // 描述
            "description": "",
            // IP
            "ip": "192.168.0.1",
            // 经度
            "x": "106.55097271762801",
            // 纬度
            "y": "29.563900672574004"
        },
        {
            "id": "0002",
            "name": "摄像头 2",
            "description": "",
            "ip": "192.168.0.2",
            "x": "106.54717470966243",
            "y": "29.560709076232932"
        }
        ...
        ]
    }

**输出参数**

esri.layers.FeatureLayer 对象

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap","cw/cameras", ...
    ], function(basemap, cameras, ... ) {

        var map = basemap.create({ divId:'map' });
        
        var data = [];

        cameras.initLayer({
            // 显示地图的容器标识
            map:map,
            // 摄像头数据
            cameras:data 
        });	
    ...
    });

getLayer - 获取摄像头图层
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // 地图对象
        map:map
    }

**输出参数**

esri.layers.FeatureLayer 对象

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap","cw/cameras", ...
    ], function(basemap, cameras, ... ) {

        var map = basemap.create({ divId:'map' });
        
        var layer = cameras.getLayer({ map:map });	
    ...
    });

select - 选择摄像头数据
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // (必填)地图对象
        map:map,
        // 选择方式
        type:'extent',
        // 回调函数, 参数 results 为摄像头信息
        callback:function(results){ }
    }

status - 设置摄像头状态数据
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // (必填)地图对象
        map:map,
        // (必填)摄像头标识
        cameraId:'0001',
        // 摄像头状态
        status:'active'
    }

**输出参数**

摄像头状态

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap","cw/cameras", ... 
    ], function(basemap, cameras, ... ) {

        var map = basemap.create({divId:'map'});

        cameras.status({
            // 地图对象
            map:map,
            // 摄像头标识
            cameraId:'001',
            // 摄像头状态
            status:'active' 
        });
    ...
    });	

data - 设置摄像头状态数据
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // (必填)地图对象
        map:map,
        // 摄像头唯一标识
        cameraId:'0001',
        // 摄像头相关的数据
        data:data
    }

**输出参数**

摄像头数据

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap","cw/cameras", ... 
    ], function(basemap, cameras, ... ) {

        var map = basemap.create({divId:'map'});

        var data = cameras.data({map:map, cameraId:'001'});

        cameras.data({
            // 地图对象
            map:map,
            // 摄像头标识
            cameraId:'001',
            // 摄像头状态
            data:x.ext(data, {name:'abc', count:100}) 
        });
    ...
    });	

directions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
路线查询

query - 查询
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

.. _directions-query:

directions.query()

**输入参数**

.. code-block:: javascript

   {
        // 类型 polyline(默认) | road
        type: 'road',
        // 路径服务器，type=road 必须填写路径服务器地址
        naServer: "http://localhost:6080/arcgis/rest/services/ChinaMap/NAServer/路径",          
        // (必填)显示地图的容器标识
        map:'map',
        // (必填)路径信息
        routes:[
        {
            // 节点名称  
            "name": "1",
            // X坐标
            "x": "106.55101563297185",
            // Y坐标
            "y": "29.563546055738094",
            // 创建时间
            "createdDate": "2017-03-15 12:00:00"
        },
        {
            // 节点名称 
            "name": "2",
            // X坐标
            "x": "106.54717470966243",
            // Y坐标
            "y": "29.560709076232932",
            // 创建时间
            "createdDate": "2017-03-15 12:00:00"
        }
        ...
        ]
    }

**输出参数**

无

**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap","cw/directions", ... 
    ], function(basemap, directions, ... ) {

        var map = basemap.create({ divId:'map' });

        directions.query({
            // 类型
            type: 'road',
            // 路径服务器
            naServer: "http://192.168.10.35:6080/arcgis/rest/services/重庆地图/NAServer/路径",
            // 地图对象
            map:map,
            // 路径信息
            routes: routes
        });
    ...
    });	

util
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
常用工具函数

lonat - 获取地图经纬度
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

evt 地图上的点击事件  

**输出参数**

经纬度信息  

{x:106.33, y:29.35}


**示例代码**

.. code-block:: javascript

    require([
        "cw/basemap", "cw/util", ...
    ], function(basemap, util, ... ) {

        var map = basemap.create({ divId:'map' });

        map.on('click', function(evt){

            var lonlat = util.lonlat(evt);
            
            // 输出经纬度信息
            console.log('lonlat(x:' + lonlat.x + ', y=' + lonlat.y + ')');
        });
    ...
    });

mercator2lonlat - 墨卡托坐标转经纬度坐标
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // 纬度
        x:106.33,
        // 经度
        y:29.35
    }

**输出参数**

.. code-block:: javascript

    // 墨卡托投影信息  
    {
        x:11861235.85466021,
        y:3447577.3923047883
    }

mercator2lonlat - 墨卡托坐标转经纬度坐标
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

**输入参数**

.. code-block:: javascript

   {
        // 纬度
        x:11861235.85466021,
        // 经度
        y:3447577.3923047883
    }

**输出参数**

.. code-block:: javascript

    // 经纬度信息  
    {
        x:29.35, 
        y:106.33
    }
