// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/requireUtils",["require","exports","dojo/Deferred"],function(g,d,f){function e(a,b){if(Array.isArray(b)){var c=new f;a(b,function(){for(var b=[],a=0;a<arguments.length;a++)b[a-0]=arguments[a];c.resolve(b)});return c.promise}return e(a,[b]).then(function(a){return a[0]})}d.when=e;d.getAbsMid=function(a,b,c){return b.toAbsMid?b.toAbsMid(a):c.id.replace(/\/[^\/]*$/ig,"/")+a}});