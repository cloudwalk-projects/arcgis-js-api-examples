// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./extensions/aliasedProperty","./extensions/computedProperty","./extensions/serializableProperty"],function(q,l,m,n,p){var e=[m.default,n.default,p.default];l.processPrototypeMetadatas=function(b,f){for(var g=Object.getOwnPropertyNames(b),a=0;a<e.length;a++){var c=e[a];if(c.processPrototypePropertyMetadata)for(var d=0,h=g;d<h.length;d++){var k=h[d];c.processPrototypePropertyMetadata(k,b[k],b,f)}}};l.processClassMetadatas=function(b,f){for(var g=Object.getOwnPropertyNames(b),
a=0;a<e.length;a++){var c=e[a];if(c.processClassPropertyMetadata)for(var d=0,h=g;d<h.length;d++){var k=h[d];c.processClassPropertyMetadata(k,b[k],b,f)}}};l.instanceCreated=function(b,f){for(var g=Object.getOwnPropertyNames(f),a=0;a<e.length;a++){var c=e[a];c.instanceCreated&&c.instanceCreated(b,f,g)}}});