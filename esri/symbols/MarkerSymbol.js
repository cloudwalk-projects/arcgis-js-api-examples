// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../core/declare","../core/screenUtils","./Symbol"],function(c,b,d){return c(d,{declaredClass:"esri.symbols.MarkerSymbol",properties:{angle:{value:0,json:{read:function(a){return a&&-1*a},write:function(a,b){b.angle=a&&-1*a}}},type:{},xoffset:{value:0,cast:b.toPt,json:{writable:!0}},yoffset:{value:0,cast:b.toPt,json:{writable:!0}},size:{value:9,cast:function(a){return"auto"===a?a:b.toPt(a)},json:{writable:!0}}}})});