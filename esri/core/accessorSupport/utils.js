// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../lang"],function(p,d,n){function g(a){return!a?null:a.__accessor__?a.__accessor__:a._accessorProps?a._accessorProps:a.propertyInvalidated?a:null}function h(a,b){return!b?a:Object.keys(b).reduce(function(a,c){if("value"===c)return a[c]=b[c],a;if(void 0===a[c])return a[c]=n.clone(b[c]),a;var e=a[c],f=b[c];if(e===f)return a;if(Array.isArray(f)||Array.isArray(a))e=e?Array.isArray(e)?a[c]=e.concat():a[c]=[e]:a[c]=[],f&&(Array.isArray(f)||(f=[f]),f.forEach(function(a){-1===
e.indexOf(a)&&e.push(a)}));else if(f&&"object"===typeof f)a[c]=h(e,f);else if(!a.hasOwnProperty(c)||b.hasOwnProperty(c))a[c]=f;return a},a||{})}function k(a){if(Array.isArray(a)||-1<a.indexOf(",")){a=Array.isArray(a)?a:a.split(",");for(var b=0,d=a.length;b<d;b++)a[b]=a[b].trim();return 1===a.length?a[0]:a}return a.trim()}function l(a){var b=!1;return function(){b||(b=!0,a())}}d.getProperties=g;d.isPropertyDeclared=function(a,b){return a&&(a.metadatas&&null!=a.metadatas[b]||null!=a.properties)};d.merge=
h;d.pathToArray=function(a){return Array.isArray(a)?a:a.split(".")};d.splitPath=k;d.parse=function(a,b,d,c){b=k(b);if(Array.isArray(b)){var e=b.map(function(b){return c(a,b.trim(),d)});return{remove:l(function(){return e.forEach(function(a){return a.remove()})})}}return c(a,b.trim(),d)};d.once=l;var m=0;d.uid=function(a){if(null==a)return m++;a=g(a);null==a.uid&&(a.uid=m++);return a.uid}});