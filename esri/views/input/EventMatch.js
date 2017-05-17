// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(g,e){var f=function(){function a(c,b){void 0===b&&(b=[]);this.eventType=c;this.keyModifiers=b}a.prototype.matches=function(c,b){if(c.type!==this.eventType)return!1;if(0===this.keyModifiers.length)return!0;for(var d=0,a=this.keyModifiers;d<a.length;d++)if(!b.has(a[d]))return!1;return!0};return a}();e.EventMatch=f});