// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../geometry/ScreenPoint"],function(d){return{toScreenPoint:function(b,a,c){c||(c=new d);Array.isArray(b)?(a=b,b=a[0],a=a[1]):"object"===typeof b&&(a=b,b=a.x,a=a.y);c.x=b;c.y=a;return c}}});