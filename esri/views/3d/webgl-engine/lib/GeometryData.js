// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,f){return function(){function a(d,b){this.id=a.getNewId();this.faces=d;this.vertexAttributes=b}a.prototype.estimateGpuMemoryUsage=function(){for(var a=0,b=0;b<this.faces.length;b++){var c=3;this.faces[b].indices.normal&&(c+=3);this.faces[b].indices.uv0&&(c+=2);this.faces[b].indices.color&&c++;a+=4*this.faces[b].indices.position.length*c}return a};a.prototype.getId=function(){return this.id};a.prototype.getFaces=function(){return this.faces};a.prototype.getVertexAttr=
function(){return this.vertexAttributes};a.getNewId=function(){return a._id++};a._id=0;a.AxisOrder={CG:0,GIS:1};return a}()});