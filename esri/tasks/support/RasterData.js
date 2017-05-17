// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","../../core/JSONSupporter"],function(b,c){return b(c,{declaredClass:"esri.tasks.support.RasterData",classMetadata:{reader:{add:["itemId"],exclude:["itemID"]}},format:null,itemId:null,_itemIdReader:function(a,b){return b.itemId},url:null,toJSON:function(){var a={};this.url&&(a.url=this.url);this.format&&(a.format=this.format);this.itemId&&(a.itemID=this.itemId);return a}})});