// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler","../../../input/handlers/support"],function(a,d,e,f,g){a=function(a){function b(h,c){var b=this;a.call(this,"esri.views.2d.input.handlers.DoubleClickZoom",!0);this.view=h;this.registerIncoming("double-click",c,function(a){return b._handleDoubleClick(a,c)})}e(b,a);b.prototype._handleDoubleClick=function(a,b){g.eventMatchesPointerType(a.data.native,"primary")&&(this.view.navigation.zoom.stepScreen(this.view,
a,b?0.5:2),a.stopPropagation())};return b}(f.InputHandler);d.DoubleClickZoom=a});