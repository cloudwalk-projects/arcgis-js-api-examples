// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define([],function(){return{updateSupportFromPoint:function(d,c,e){var b=d.hasZ,a=d.hasM;Array.isArray(c)?4===c.length&&!a&&!b?b=a=!0:3===c.length&&e&&!a?(b=!0,a=!1):3===c.length&&(a&&b)&&(b=a=!1):(b=!(!b&&c.hasZ&&(!a||c.hasM)),a=!(!a&&c.hasM&&(!b||c.hasZ)));d.hasZ=b;d.hasM=a}}});