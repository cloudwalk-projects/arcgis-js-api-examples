// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler","../../../input/handlers/support"],function(a,c,d,e,f){a=function(a){function b(g,h){var b=this;a.call(this,"esri.views.3d.input.handlers.DoubleClickZoom",!0);this.view=g;this.registerIncoming("double-click",h,function(a){return b._handleDoubleClick(a)})}d(b,a);b.prototype._handleDoubleClick=function(a){var b=a.data;f.eventMatchesPointerType(b.native,"primary")&&(this.view.navigation.zoom.stepScreen(Math.log(0.5)/
Math.log(0.6),[b.x,this.view.height-b.y]),a.stopPropagation())};return b}(e.InputHandler);c.DoubleClickZoom=a});