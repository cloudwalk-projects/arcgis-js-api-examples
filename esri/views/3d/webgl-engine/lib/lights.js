// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,d){var c=function(){function b(a,b){this.color=a;this.intensity=b}b.prototype.set=function(a){void 0!==a.color&&(this.color=a.color);void 0!==a.intensity&&(this.intensity=a.intensity)};return b}();d.AmbientLight=c;c=function(){function b(a,b,c){this.color=a;this.intensity=b;this.direction=c}b.prototype.set=function(a){void 0!==a.color&&(this.color=a.color);void 0!==a.intensity&&(this.intensity=a.intensity);void 0!==a.direction&&(this.direction=a.direction)};
return b}();d.DirectionalLight=c});