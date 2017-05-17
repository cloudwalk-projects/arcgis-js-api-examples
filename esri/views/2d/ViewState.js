// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor ../../geometry/Extent ./viewpointUtils ./math/vec2 ./math/mat2d".split(" "),function(m,n,k,c,b,l,g,d,e,f){return function(h){function a(){h.apply(this,arguments);this.size=[0,0]}k(a,h);Object.defineProperty(a.prototype,"center",{get:function(){var a=this.viewpoint.targetGeometry;return e.set(e.create(),a.x,a.y)},enumerable:!0,configurable:!0});
Object.defineProperty(a.prototype,"extent",{get:function(){return d.getExtent(new g,this.viewpoint,this.size)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"height",{get:function(){return this.size?this.size[1]:0},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"id",{get:function(){return this._get("id")+1},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"inverseTransform",{get:function(){return f.invert(f.create(),this.transform)},enumerable:!0,
configurable:!0});Object.defineProperty(a.prototype,"latitude",{get:function(){return this.viewpoint.targetGeometry.latitude},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"longitude",{get:function(){return this.viewpoint.targetGeometry.longitude},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"resolution",{get:function(){return d.getResolution(this.viewpoint)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"rotation",{get:function(){return this.viewpoint.rotation},
enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"scale",{get:function(){return this.viewpoint.scale},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"screenCenter",{get:function(){return e.scale(e.create(),this.size,0.5)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"spatialReference",{get:function(){return this.viewpoint.targetGeometry.spatialReference},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"transform",{get:function(){return d.getTransform(f.create(),
this.viewpoint,this.size)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"transformNoRotation",{get:function(){return d.getTransformNoRotation(f.create(),this.viewpoint,this.size)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"clippedExtent",{get:function(){return d.getClippedExtent(new g,this.viewpoint,this.size)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"width",{get:function(){return this.size?this.size[0]:0},enumerable:!0,configurable:!0});
Object.defineProperty(a.prototype,"worldScreenWidth",{get:function(){return d.getWorldScreenWidth(this.spatialReference,this.resolution)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"worldWidth",{get:function(){return d.getWorldWidth(this.spatialReference)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"wrappable",{get:function(){return!!this.spatialReference&&this.spatialReference.isWrappable},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"x",{get:function(){return this.center[0]},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"y",{get:function(){return this.center[1]},enumerable:!0,configurable:!0});a.prototype.copy=function(a){!this.viewpoint||!this.size?(this.viewpoint=a.viewpoint.clone(),e.copy(this.size,a.size)):(this._set("viewpoint",d.copy(this.viewpoint,a.viewpoint)),this._set("size",e.copy(this.size,a.size)))};a.prototype.clone=function(){return new a({viewpoint:this.viewpoint.clone(),size:e.clone(this.size)})};
a.prototype.toMap=function(a,b){return e.transformMat2d(a,b,this.inverseTransform)};a.prototype.toScreen=function(a,b){return e.transformMat2d(a,b,this.transform)};a.prototype.pixelSizeAt=function(a){return d.pixelSizeAt(a,this.viewpoint,this.size)};c([b.property({dependsOn:["viewpoint"]})],a.prototype,"center",null);c([b.property({readOnly:!0,dependsOn:["viewpoint","size"]})],a.prototype,"extent",null);c([b.property({readOnly:!0,dependsOn:["size"]})],a.prototype,"height",null);c([b.property({value:0,
readOnly:!0,dependsOn:["transform"]})],a.prototype,"id",null);c([b.property({readOnly:!0,dependsOn:["transform"]})],a.prototype,"inverseTransform",null);c([b.property({readOnly:!0,dependsOn:["viewpoint"]})],a.prototype,"latitude",null);c([b.property({readOnly:!0,dependsOn:["viewpoint"]})],a.prototype,"longitude",null);c([b.property({readOnly:!0,dependsOn:["viewpoint"]})],a.prototype,"resolution",null);c([b.property({readOnly:!0,dependsOn:["viewpoint"]})],a.prototype,"rotation",null);c([b.property({readOnly:!0,
dependsOn:["viewpoint"]})],a.prototype,"scale",null);c([b.property({readOnly:!0,dependsOn:["size"]})],a.prototype,"screenCenter",null);c([b.property()],a.prototype,"size",void 0);c([b.property({readOnly:!0,dependsOn:["viewpoint"]})],a.prototype,"spatialReference",null);c([b.property({readOnly:!0,dependsOn:["viewpoint","size"]})],a.prototype,"transform",null);c([b.property({readOnly:!0,dependsOn:["viewpoint","size"]})],a.prototype,"transformNoRotation",null);c([b.property()],a.prototype,"viewpoint",
void 0);c([b.property({readOnly:!0,dependsOn:["viewpoint","size"]})],a.prototype,"clippedExtent",null);c([b.property({readOnly:!0,dependsOn:["size"]})],a.prototype,"width",null);c([b.property({readOnly:!0,dependsOn:["worldWidth","resolution"]})],a.prototype,"worldScreenWidth",null);c([b.property({readOnly:!0,dependsOn:["spatialReference"]})],a.prototype,"worldWidth",null);c([b.property({readOnly:!0,dependsOn:["spatialReference"]})],a.prototype,"wrappable",null);c([b.property({readOnly:!0,dependsOn:["center"]})],
a.prototype,"x",null);c([b.property({readOnly:!0,dependsOn:["center"]})],a.prototype,"y",null);return a=c([b.subclass("esri.views.2d.ViewState")],a)}(b.declared(l))});