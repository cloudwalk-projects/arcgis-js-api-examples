// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["./core/declare","dojo/colors"],function(f,e){var b=f([e],{declaredClass:"esri.Color",toJSON:function(){return[this.r,this.g,this.b,1<this.a?this.a:Math.round(255*this.a)]},clone:function(){return new b(this.toRgba())}});b.toJSON=function(a){return a&&[a.r,a.g,a.b,1<a.a?a.a:Math.round(255*a.a)]};b.fromJSON=function(a){return a&&new b([a[0],a[1],a[2],a[3]/255])};b.toUnitRGB=function(a){return[a.r/255,a.g/255,a.b/255]};var c,d="named blendColors fromRgb fromHex fromArray fromString".split(" ");
for(c=0;c<d.length;c++)b[d[c]]=e[d[c]];b.named.rebeccapurple=[102,51,153];return b});