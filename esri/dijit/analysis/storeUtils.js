// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/storeUtils","dojo/_base/declare dojo/_base/lang dojo/has dstore/Memory dstore/Trackable dstore/Tree ../../kernel".split(" "),function(d,c,f,b,g,h,k){var e=d([b,g]);b={createHierarchicalStore:function(a){a=this.createSyncStore(a,h);a.getRootCollection=function(){return this.root.filter({parent:void 0})};return a.getRootCollection()},createSyncStore:function(a,b){a=a||{};a.data&&(a=c.mixin({},a,{data:c.clone(a.data)}));return new (b?d([e,b]):e)(a)}};f("extend-esri")&&c.setObject("dijit.analysis.storeUtils",
b,k);return b});