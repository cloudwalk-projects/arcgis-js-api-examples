// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./tsSupport/extendsHelper","./tsSupport/decorateHelper","dojo/string"],function(e,f,g,h,d){return function(){function a(a,b,c){this.name=a;this.message=b&&d.substitute(b,c,function(a){return null==a?"":a})||"";this.details=c}a.prototype.toString=function(){return"["+this.name+"]: "+this.message};return a}()});