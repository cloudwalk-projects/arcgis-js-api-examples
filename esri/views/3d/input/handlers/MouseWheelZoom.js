// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(a,c,d,e){a=function(a){function b(f,g){var b=this;a.call(this,"esri.views.3d.input.handlers.MouseWheelZoom",!0);this.view=f;this.registerIncoming("mouse-wheel",g,function(a){return b._handleMouseWheel(a)})}d(b,a);b.prototype._handleMouseWheel=function(a){var b=a.data;this.view.navigation.zoom.stepScreen(-1/60*b.deltaY,[b.x,this.view.height-b.y]);a.stopPropagation()};return b}(e.InputHandler);
c.MouseWheelZoom=a});