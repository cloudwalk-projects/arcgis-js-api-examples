# arcgis-js-api-examples
基于 ArgGIS for JavaScript 的示例

环境: Arcgis v3.19
 
安装方法

## 1.文件部署到一台 HTTP 服务器 

下载项目代码部署到如下位置 (此处以 Tomcat 为例)

<apache_tomcat_home>\webapps\arcgis\3.19\

## 2.配置 dojo 位置

在文本编辑器中打开 <apache_tomcat_home>\webapps\arcgis\3.19\init.js, 然后搜索 'ditu.fuwu.io:7020/arcgis/3.19/', 将值替换为 "<your_server>:8080/arcgis/3.19/"

在文本编辑器中打开 <apache_tomcat_home>\webapps\arcgis\3.19\dojo\dojo.js, 然后搜索 'ditu.fuwu.io:7020/arcgis/3.19/', 将值替换为 "<your_server>:8080/arcgis/3.19/"

## 3.引用地址 

样式引用  
```HTML
<link rel="stylesheet" href="http://<your_server>:8080/arcgis/3.19/dijit/themes/claro/claro.css">  
<link rel="stylesheet" href="http://<your_server>:8080/arcgis/3.19/esri/css/esri.css">
```

脚本引用  
```HTML
<script src="http://<your_server>:8080/arcgis/3.19/init.js" data-dojo-config="parseOnLoad:true, locale:'zh-cn'"></script>
```

## 4.演示地址 

如果部署成功 可以在 http://<your_server>:8080/arcgis/3.19/index.html 看看示例

在线演示 http://map.x3platform.com
