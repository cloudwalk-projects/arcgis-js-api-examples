// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ./Symbol3D ../core/accessorSupport/decorators".split(" "),function(h,k,f,c,d,g,b){return function(e){function a(a){e.call(this);this.type="mesh-symbol-3d"}f(a,e);a.prototype.clone=function(){return new a({styleOrigin:d.clone(this.styleOrigin),symbolLayers:d.clone(this.symbolLayers),thumbnail:d.clone(this.thumbnail)})};c([b.property()],a.prototype,"type",void 0);c([b.shared(["Fill"])],a.prototype,
"_allowedLayerTypes",void 0);return a=c([b.subclass("esri.symbols.MeshSymbol3D")],a)}(b.declared(g))});