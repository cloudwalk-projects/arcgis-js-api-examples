// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(g,h){return function(){function b(a,b,c,d){this.level=a;this.row=b;this.col=c;this.world=d}b.from=function(a,e,c,d){var f=typeof a;return"object"===f?a:"string"===f?b.fromId(a):new b(a,e,c,d)};b.fromId=function(a){a=a.split("/");var e=a[1],c=a[2],d=a[3];return new b(parseFloat(a[0]),parseFloat(e),parseFloat(c),parseFloat(d))};b.getId=function(a,b,c,d){return"object"===typeof a?a.level+"/"+a.row+"/"+a.col+"/"+a.world:a+"/"+b+"/"+c+"/"+d};Object.defineProperty(b.prototype,
"id",{get:function(){return b.getId(this)},enumerable:!0,configurable:!0});return b}()});