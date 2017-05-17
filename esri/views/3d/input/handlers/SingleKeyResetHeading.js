// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","./SingleKey"],function(a,c,e,f){a=function(a){function b(b,d,c){a.call(this,"esri.views.3d.input.handlers.SingleKeyResetHeading",d,c);this.view=b;this.key=d}e(b,a);b.prototype.activate=function(){this.view.goTo({heading:0})};return b}(f.SingleKey);c.SingleKeyResetHeading=a});