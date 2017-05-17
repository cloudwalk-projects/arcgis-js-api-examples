// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/promiseUtils"],function(e,b,c){b.loadImage=function(b){return c.create(function(c,d){var a=document.createElement("img");a.onload=function(){a.onload=a.onerror=null;c(a)};a.onerror=function(){a.onload=a.onerror=null;d()};a.src=b})}});