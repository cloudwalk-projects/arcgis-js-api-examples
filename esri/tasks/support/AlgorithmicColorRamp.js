// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","../../Color","./ColorRamp"],function(c,b,d){return c(d,{declaredClass:"esri.tasks.support.AlgorithmicColorRamp",algorithm:null,fromColor:null,_fromColorSetter:function(a){return new b(a)},toColor:null,_toColorSetter:function(a){return new b(a)},type:"algorithmic",toJSON:function(){var a;switch(this.algorithm.toLowerCase()){case "cie-lab":a="esriCIELabAlgorithm";break;case "hsv":a="esriHSVAlgorithm";break;case "lab-lch":a="esriLabLChAlgorithm"}a={type:"algorithmic",algorithm:a};
a.fromColor=b.toJSON(this.fromColor);a.toColor=b.toJSON(this.toColor);return a}})});