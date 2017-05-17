// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","dojo/_base/array","./ColorRamp"],function(a,b,c){return a(c,{declaredClass:"esri.tasks.support.MultipartColorRamp",colorRamps:[],type:"multipart",toJSON:function(){return{type:"multipart",colorRamps:b.map(this.colorRamps,function(a){return a.toJSON()})}}})});