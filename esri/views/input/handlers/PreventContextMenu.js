// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","../InputHandler"],function(a,b,c,d){a=function(a){function b(){a.call(this,"PreventContextMenu",!0);this.registerIncoming("context-menu",function(a){a.data.native.preventDefault()})}c(b,a);return b}(d.InputHandler);b.PreventContextMenu=a;Object.defineProperty(b,"__esModule",{value:!0});b.default=a});