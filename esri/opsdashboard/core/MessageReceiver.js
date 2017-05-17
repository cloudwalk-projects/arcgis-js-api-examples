// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ../../core/typescript dojo/_base/lang ../../core/Evented ./messageHandler".split(" "),function(k,l,c,d,e,f,g,h){return function(b){function a(){b.apply(this,arguments)}c(a,b);a.prototype.dojoConstructor=function(a){var b=this;this._setConfig(a);h.on("message-received",function(a){b.__messageReceived(a)})};a.prototype._setConfig=function(a){a&&f.mixin(this,a)};a.prototype.__messageReceived=function(a){this._messageReceived(a)};
a.prototype._messageReceived=function(a){};return a=d([e.subclass()],a)}(g)});