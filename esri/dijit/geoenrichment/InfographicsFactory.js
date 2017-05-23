// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/InfographicsFactory",["../../declare","./InfographicsOptions","./Geoenrichment","../../tasks/geoenrichment/GeoenrichmentTask","./config"],function(b,c,d,e,a){return b("esri.dijit.geoenrichment.InfographicsFactory",null,{_task:null,_options:null,getTask:function(){this._task||(this._task=new e(a.server),this._task.token=a.token);return this._task},createGeoenrichment:function(){return new d},getCountry:function(a){return this.getTask().getCountries(a.geometry).then(function(a){return a[0]})},
getOptions:function(){this._options||(this._options=new c);return this._options}})});