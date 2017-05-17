// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/JSONSupport ../core/accessorSupport/decorators ./Lighting".split(" "),function(h,k,f,d,g,c,b){return function(e){function a(a){e.call(this,a);this.lighting=new b}f(a,e);a.prototype.clone=function(){return new a({lighting:b.prototype.clone.call(this.lighting)})};a.sanitizeJSON=function(a){return{lighting:a.lighting?b.sanitizeJSON(a.lighting):(new b).toJSON()}};d([c.property({type:b,json:{writable:!0}})],
a.prototype,"lighting",void 0);return a=d([c.subclass("esri.webscene.Environment")],a)}(c.declared(g))});