// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/executeAsync",["require","exports","dojo/Deferred","./now"],function(k,l,c,f){return function(h,a){var b;if(!a||0>=a)a=500;var d=new c(function(){b&&clearTimeout(b)}),g=function(){if(!d.isFulfilled()){for(var c=f(),e=!1;!e&&f()-c<a;)e=!0===h();e?d.resolve():b=setTimeout(g,0)}};b=setTimeout(g,0);return d.promise}});