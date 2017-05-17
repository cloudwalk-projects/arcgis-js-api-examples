// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["./TerrainConst","./TileBase"],function(d,h){var a=function(b){this.lij=b;this.layerInfo=Array(d.LayerClass.LAYER_CLASS_COUNT)};a.prototype.tileDataAvailable=h.prototype.tileDataAvailable;a.prototype.modifyLayers=function(b,a,e){b=a.length;for(var d=this.layerInfo[e],f=Array(b),c=0;c<b;c++){var g=a[c];f[c]=-1<g?d[g]:{tilemap:null,tilemapRequest:null,pendingUpdates:0}}this.layerInfo[e]=f};return a});