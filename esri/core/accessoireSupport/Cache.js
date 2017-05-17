// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["./dictionary"],function(b){var d=Object.prototype.hasOwnProperty,c=function(){this.dirty=b();this.values=b()};c.prototype={destroy:function(){this.values=this.dirty=null},has:function(a){return d.call(this.values,a)},get:function(a){return this.values[a]},remove:function(a){delete this.values[a];delete this.dirty[a]},keys:function(){return Object.keys(this.values)},set:function(a,b){this.dirty[a]=!1;this.values[a]=b},setDirty:function(a){this.dirty[a]=!0},isDirty:function(a){return!0===this.dirty[a]}};
return c});