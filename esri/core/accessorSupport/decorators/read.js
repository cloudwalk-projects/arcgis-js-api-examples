// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./property"],function(l,g,h){g.read=function(a,b,d){var e,f;void 0===b||Array.isArray(b)?(f=a,d=b,e=[void 0]):(f=b,e=Array.isArray(a)?a:[a]);return function(a,b,g){var k=a.constructor.prototype;e.forEach(function(c){c=h.propertyJSONMeta(a,c,f);c.read=k[b];d&&(c.readFrom=(c.readFrom||[]).concat(d))})}}});