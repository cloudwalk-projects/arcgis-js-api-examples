// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../core/declare","../core/Accessoire","../core/Collection"],function(b,d,c){return b([d],{declaredClass:"esri.processors.Filter",_changeHandler:null,input:null,_inputSetter:function(a,b){Array.isArray(a)&&(a=new c(a));this._changeHandler&&(this._changeHandler.remove(),this._changeHandler=null);return a&&a.isInstanceOf(c)?(this._changeHandler=a.on("change",this.run.bind(this)),a):a?b:null},output:null,run:function(a){this.output&&(a.added.length&&this.output.addMany(a.added.slice()),a.removed.length&&
this.output.removeMany(a.removed.slice()))}})});