// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/JSONSupporter","../../geometry/Extent"],function(a,b){return a.createSubclass({declaredClass:"esri.layers.support.MapImage",_extentReader:function(a){return b.fromJSON(a)},height:null,href:null,scale:null,width:null,visible:!0,opacity:1})});