// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/lang","./Domain"],function(c,d){return d.createSubclass({declaredClass:"esri.layers.support.RangeDomain",properties:{maxValue:{json:{readFrom:["range"],read:function(b,a){return a.range&&a.range[1]}}},minValue:{json:{readFrom:["range"],read:function(b,a){return a.range&&a.range[0]}}},type:{value:"range"}},toJSON:function(){var b=this.inherited(arguments);b.range=[this.minValue,this.maxValue];return c.fixJson(b)}})});