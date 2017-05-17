// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","dojo/_base/array","../../Graphic","../../core/JSONSupporter","./DirectionsFeatureSet"],function(b,f,d,g,h){return b(g,{declaredClass:"esri.tasks.support.RouteResult",directions:null,_directionsReader:function(a){return h.fromJSON(a)},route:null,_routeReader:function(a,c){a.geometry&&(a.geometry.spatialReference=c.spatialReference);return d.fromJSON(a)},routeName:null,stops:null,_stopsReader:function(a,c){var e=[],b=c.spatialReference;f.forEach(a,function(a){a.geometry&&
(a.geometry.spatialReference=b);e[a.attributes.Sequence-1]=d.fromJSON(a)});return e}})});