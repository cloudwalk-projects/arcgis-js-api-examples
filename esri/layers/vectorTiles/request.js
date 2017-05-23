// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/request",["require","exports","esri/request","dojo/_base/lang"],function(f,g,c,d){return function(e,b){var a=d.mixin({},{url:e,failOk:!0},b);"array-buffer"===b.responseType?(a.handleAs="arraybuffer",delete a.responseType):b.responseType&&(a.handleAs=b.responseType,delete a.responseType);null!==b.query&&(a.content=a.query,delete a.query);return c(a).then(function(a){return{data:a}})}});