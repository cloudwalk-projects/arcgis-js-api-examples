// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","dojo/_base/lang","../../core/Accessoire"],function(c,a,d){return c(d,{declaredClass:"esri.tasks.support.ClassificationDefinition",baseSymbol:null,colorRamp:null,type:null,toJSON:function(){var b={};this.baseSymbol&&a.mixin(b,{baseSymbol:this.baseSymbol.toJSON()});this.colorRamp&&!a.isString(this.colorRamp)&&a.mixin(b,{colorRamp:this.colorRamp.toJSON()});return b}})});