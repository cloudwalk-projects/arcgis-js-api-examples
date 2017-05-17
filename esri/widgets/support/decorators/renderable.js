// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./propUtils"],function(g,f,c){f.renderable=function(a){var d="string"===typeof a?c.splitProps(a):a;return function(a,e){a._renderableProps||(a._renderableProps=[]);var b=a._renderableProps;d?b.push.apply(b,c.normalizePropNames(d,e)):b.push(e)}}});