// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../core/declare","../core/lang","../symbols/support/jsonUtils","./Renderer"],function(b,d,c,e){var a=b(e,{declaredClass:"esri.renderer.SimpleRenderer",properties:{description:{value:null,json:{writable:!0}},label:{value:null,json:{writable:!0}},symbol:{value:null,json:{read:c.read,write:function(a,f,b){f.symbol=c.write(a,{},b)}}},type:"simple"},getSymbol:function(a,b){return this.symbol},clone:function(){return new a({description:this.description,label:this.label,symbol:this.symbol&&this.symbol.clone(),
visualVariables:d.clone(this.visualVariables)})}});return a});