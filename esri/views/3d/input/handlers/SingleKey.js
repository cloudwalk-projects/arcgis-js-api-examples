// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(a,c,d,e){a=function(a){function b(f,b,c){var d=this;a.call(this,f,!0);this.key=b;this.registerIncoming("key-down",c,function(a){return d._handleKeyDown(a)})}d(b,a);b.prototype._handleKeyDown=function(a){a.data.key===this.key&&(this.activate(),a.stopPropagation())};return b}(e.InputHandler);c.SingleKey=a});