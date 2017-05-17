// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","./ClassificationDefinition"],function(a,b){return a.createSubclass({declaredClass:"esri.tasks.support.GenerateRendererParameters",properties:{classificationDefinition:{value:null,type:b},where:{value:null,type:String}},toJSON:function(){return{classificationDef:JSON.stringify(this.classificationDefinition.toJSON()),where:this.where}}})});