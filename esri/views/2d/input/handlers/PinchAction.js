// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(a,d,e,f){a=function(a){function b(g){var c=this;a.call(this,"esri.views.2d.input.handlers.PinchZoom",!0);this.view=g;this.registerIncoming("drag",function(a){return c._handleDrag(a)})}e(b,a);b.prototype._handleDrag=function(a){var c=a.data;if(!(2>c.pointers.length)){var b=c.currentState;this.view.navigation.zoom.pinchRotateZoom(this.view,b.center,b.radius-c.previousState.radius,b.angle);
a.stopPropagation()}};return b}(f.InputHandler);d.PinchRotateAndZoom=a});