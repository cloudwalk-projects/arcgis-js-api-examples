// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["dojo/_base/kernel","../../core/declare","dojo/_base/array","dojo/io/script"],function(l,m,h,f){return m(null,{declaredClass:"esri.layers.support.RenderMode",constructor:function(){this._prefix="jsonp_"+(l._scopeName||"dojo")+"IoScript"},initialize:function(a){this.map=a;this._init=!0},startup:function(){},propertyChangeHandler:function(a){},destroy:function(){this._init=!1},drawFeature:function(a){},suspend:function(){},resume:function(){},refresh:function(){},_incRefCount:function(a){(a=
this._featureMap[a])&&a._count++},_decRefCount:function(a){(a=this._featureMap[a])&&a._count--},_getFeature:function(a){return this._featureMap[a]},_addFeatureIIf:function(a,b){var c=this._featureMap,e=c[a],d=this.featureLayer;e||(c[a]=b,d._add(b),b._count=0);return e||b},_removeFeatureIIf:function(a){var b=this._featureMap[a],c=this.featureLayer;if(b){if(b._count)return;delete this._featureMap[a];c._remove(b)}return b},_clearIIf:function(){var a;a=this.featureLayer;var b=a.graphics,c=a._selectedFeatures,
e=a.objectIdField;for(a=b.length-1;0<=a;a--){var d=b[a],g=d.attributes[e];g in c?d._count=1:(d._count=0,this._removeFeatureIIf(g))}},_isPending:function(a){return f[this._prefix+a]?!0:!1},_cancelPendingRequest:function(a,b){if(a=a||f[this._prefix+b])try{a.cancel(),f._validCheck(a)}catch(c){}},_purgeRequests:function(){f._validCheck(null)},_toggleVisibility:function(a){var b=this.featureLayer,c=b.graphics,e=a?"show":"hide",d,g=c.length;a=a&&b._ager;for(d=0;d<g;d++){var k=c[d];k[e]();a&&b._repaint(k)}},
_applyTimeFilter:function(a){var b=this.featureLayer;if(b.timeInfo&&!b.suspended){a||b._fireUpdateStart();var c=b._trackManager;c&&c.clearTracks();var e=b.getTimeDefinition(),d=b._getOffsettedTE(b._mapTimeExtent);d?(d=b._getTimeOverlap(e,d))?(e=b._filterByTime(b.graphics,d.startTime,d.endTime),c&&c.addFeatures(e.match),h.forEach(e.match,function(a){var c=a._shape;a.visible||(a.show(),(c=a._shape)&&c._moveToFront());b._ager&&c&&b._repaint(a)}),h.forEach(e.noMatch,function(a){a.visible&&a.hide()})):
this._toggleVisibility(!1):(c&&c.addFeatures(b.graphics),this._toggleVisibility(!0));c&&(c.moveLatestToFront(),c.drawTracks());a||b._fireUpdateEnd()}}})});