// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/core/tsSupport/extendsHelper",[],function(){return function(b,a){function d(){this.constructor=b}for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);b.prototype=null===a?Object.create(a):(d.prototype=a.prototype,new d)}});