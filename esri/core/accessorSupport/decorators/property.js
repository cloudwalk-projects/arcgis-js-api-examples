// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../lang","../metadata"],function(l,g,k,h){g.property=function(a){void 0===a&&(a={});return function(c,f){var d=c.constructor.prototype,b=Object.getOwnPropertyDescriptor(c,f);if(b&&(b.get||b.set))a=k.clone(a),b.set&&(a.set=b.set),b.get&&(a.get=b.get);var d=h.getPropertyMetadata(d,f),e;for(e in a)b=a[e],Array.isArray(b)?d[e]=(d[e]||[]).concat(b):d[e]=b}};g.propertyJSONMeta=function(a,c,f){a=h.getPropertyMetadata(a.constructor.prototype,f);a.json||(a.json={});a=a.json;
void 0!==c&&(a.origins||(a.origins={}),a.origins[c]||(a.origins[c]={}),a=a.origins[c]);return a}});