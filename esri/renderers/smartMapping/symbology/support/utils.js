// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../../../../Basemap ../../../../support/basemapUtils ../../../../geometry/ScreenPoint ../../../../core/screenUtils".split(" "),function(l,c,h,k,e,f){function g(a){var b=a.width,c=a.height,d=a.pixelSizeAt(new e(0.5*b,0.5*c));0>=d&&(d=a.pixelSizeAt(new e(0.5*b,0.95*c)),0>=d&&(b=a.camera.position.clone(),b.z=0,d=2*a.pixelSizeAt(b)));return d}c.normalizedBasemapId=function(a){var b=null;"string"===typeof a?b=a:a instanceof h&&(b=k.wellKnownBasemapId(a));return(a=b)&&a.replace("-vector",
"")};c.getPixelSize=g;c.toWorldScale=function(a,b){return Math.ceil(g(b)*f.pt2px(f.toPt(a)))}});