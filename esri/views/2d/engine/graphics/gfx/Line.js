// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../../core/tsSupport/extendsHelper","dojox/gfx/_base","./Shape"],function(b,d,e,f,g){b=function(b){function c(a){b.call(this);this.shape=f.getDefault("Line");this.rawNode=a}e(c,b);c.prototype.getBoundingBox=function(){if(!this.bbox){var a=this.shape;this.bbox={x:Math.min(a.x1,a.x2),y:Math.min(a.y1,a.y2),width:Math.abs(a.x2-a.x1),height:Math.abs(a.y2-a.y1)}}return this.bbox};c.nodeType="line";return c}(g.default);Object.defineProperty(d,"__esModule",{value:!0});
d.default=b});