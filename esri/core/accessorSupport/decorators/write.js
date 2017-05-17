// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./property"],function(e,c,f){c.write=function(a,d){var b;void 0===d?(d=a,b=[void 0]):b=Array.isArray(a)?a:[a];return function(a,c,e){var g=a.constructor.prototype;b.forEach(function(b){f.propertyJSONMeta(a,b,d).write=g[c]})}}});