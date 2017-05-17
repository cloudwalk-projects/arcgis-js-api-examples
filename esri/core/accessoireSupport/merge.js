// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["dojo/_base/lang"],function(h){var g=function(f,e){return!e?f:Object.keys(e).reduce(function(c,a){var d,b;if("value"===a)c[a]=e[a];else if(void 0===c[a])c[a]=h.clone(e[a]);else if(d=c[a],b=e[a],d!==b)if(Array.isArray(b)||Array.isArray(c))d=d?Array.isArray(d)?c[a]=d.concat():c[a]=[d]:c[a]=[],b&&(Array.isArray(b)||(b=[b]),c[a]=d.concat(b));else if(b&&"object"==typeof b)c[a]=g(d,b);else if(!d||b)c[a]=b;return c},f||{})};return g});