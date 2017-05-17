// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,f){var d=function(){};return function(){function b(a,b,c){void 0===a&&(a=new d);void 0===c&&(c=!0);this.cls=a;this.dispose=b;this.constructOnAcquire=c;this._pool=[]}b.prototype.acquire=function(){for(var a=0;a<arguments.length;a++);this._pool.length?(a=this._pool.pop(),this.constructOnAcquire&&this.cls.call(a)):a=new this.cls;return a};b.prototype.release=function(a){a&&(this.dispose?this.dispose.call(a):a&&(a.dispose&&"function"===typeof a.dispose)&&a.dispose(),
this._pool.push(a))};return b}()});