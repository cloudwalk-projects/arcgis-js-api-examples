// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../core/Accessor","../core/Collection","../core/watchUtils"],function(b,a,c){return b.createSubclass({declaredClass:"esri.views.BasemapView",properties:{view:{},baseLayerViews:{type:a},referenceLayerViews:{type:a}},getDefaults:function(){return{baseLayerViews:[],referenceLayerViews:[]}},initialize:function(){this._loadingHdl=c.init(this,"view.map.basemap",this._loadBasemap)},destroy:function(){this.view=null;this._loadingHdl.remove();this._loadingHdl=null},_suspendedGetter:function(){return this.view?
this.view.suspended:!0},_loadBasemap:function(a){a&&a.load()}})});