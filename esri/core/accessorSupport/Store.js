// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./PropertyOrigin"],function(c,d,e){c=function(){function a(){this._values={}}a.prototype.get=function(b){return this._values[b]};a.prototype.originOf=function(b){return e.OriginId.USER};a.prototype.keys=function(){return Object.keys(this._values)};a.prototype.set=function(b,a){this._values[b]=a};a.prototype.clear=function(a){delete this._values[a]};a.prototype.has=function(a){return a in this._values};return a}();Object.defineProperty(d,"__esModule",{value:!0});d.default=
c});